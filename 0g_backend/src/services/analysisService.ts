import { Network, RiskFactors } from '../types';
import { getContractCode, isContract } from '../utils/blockchain';
import { analyzeContractWithOG } from './ogService';
import logger from '../utils/logger';

export async function analyzeContract(
  address: string,
  network: Network
): Promise<{ factors: RiskFactors; code: string; ogVerification: any; analysisId: string }> {
  // Check if address is a contract
  const isContractAddress = await isContract(address, network);
  if (!isContractAddress) {
    throw new Error('Address is not a contract');
  }

  // Get contract code
  const code = await getContractCode(address, network);

  // Use ONLY real 0G analysis - NO FALLBACKS
  logger.info('🔐 Using 0G Compute Layer for analysis', { address, network });
  const ogResult = await analyzeContractWithOG(address, code);
  
  // Map 0G risk factors to our RiskFactors format
  const factors: RiskFactors = {
    rugPullRisk: ogResult.riskFactors.reentrancy || 5,
    smartContractRisk: ogResult.riskFactors.accessControl || 5,
    centralizationRisk: ogResult.riskFactors.arithmetic || 5,
    liquidityRisk: ogResult.riskFactors.uncheckedCalls || 5,
    tokenEconomicsRisk: ogResult.riskFactors.delegateCalls || 5,
    codeQualityRisk: ogResult.riskFactors.timestamp || 5,
    credibilityRisk: ogResult.riskFactors.gasIssues || 5,
    historicalRisk: ogResult.riskFactors.historical || 5,
  };

  logger.info('✅ 0G analysis successful', { 
    address,
    teeVerified: ogResult.ogVerification.teeVerified,
    cost: ogResult.ogVerification.cost
  });

  return { 
    factors, 
    code,
    ogVerification: ogResult.ogVerification,
    analysisId: ogResult.analysisId,
  };
}
