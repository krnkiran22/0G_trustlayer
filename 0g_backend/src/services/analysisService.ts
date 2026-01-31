import { Network, RiskFactors } from '../types';
import { getContractCode, getTokenInfo, isContract } from '../utils/blockchain';
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

async function performRiskAnalysis(
  code: string,
  address: string,
  network: Network
): Promise<RiskFactors> {
  // This is a simplified risk analysis
  // In production, you would use more sophisticated AI/ML models

  const codeLength = code.length;
  const hasOwner = code.toLowerCase().includes('owner');
  const hasMint = code.toLowerCase().includes('mint');
  const hasBurn = code.toLowerCase().includes('burn');
  const hasPause = code.toLowerCase().includes('pause');
  const hasRenounce = code.toLowerCase().includes('renounceownership');
  const hasTimelock = code.toLowerCase().includes('timelock');

  // Calculate risk factors (0-10 scale)
  const rugPullRisk = calculateRugPullRisk(hasOwner, hasMint, hasRenounce, hasTimelock);
  const smartContractRisk = calculateSmartContractRisk(codeLength, code);
  const centralizationRisk = calculateCentralizationRisk(hasOwner, hasRenounce);
  const liquidityRisk = calculateLiquidityRisk(code);
  const tokenEconomicsRisk = calculateTokenEconomicsRisk(hasMint, hasBurn);
  const codeQualityRisk = calculateCodeQualityRisk(codeLength, code);
  const credibilityRisk = calculateCredibilityRisk(code);
  const historicalRisk = calculateHistoricalRisk();

  return {
    rugPullRisk,
    smartContractRisk,
    centralizationRisk,
    liquidityRisk,
    tokenEconomicsRisk,
    codeQualityRisk,
    credibilityRisk,
    historicalRisk,
  };
}

function calculateRugPullRisk(
  hasOwner: boolean,
  hasMint: boolean,
  hasRenounce: boolean,
  hasTimelock: boolean
): number {
  let risk = 5; // Base risk

  if (hasOwner && hasMint) risk += 2;
  if (hasOwner && !hasRenounce) risk += 1.5;
  if (!hasTimelock) risk += 1;
  if (hasOwner && hasMint && !hasRenounce) risk += 1;

  return Math.min(10, Math.max(0, risk));
}

function calculateSmartContractRisk(codeLength: number, code: string): number {
  let risk = 5;

  // Very short code might be suspicious
  if (codeLength < 1000) risk += 2;
  
  // Check for known vulnerable patterns
  if (code.includes('delegatecall')) risk += 1.5;
  if (code.includes('selfdestruct')) risk += 1;
  
  // Well-structured code reduces risk
  if (code.includes('require(') && code.includes('revert(')) risk -= 1;
  if (code.includes('SafeMath') || code.includes('safeTransfer')) risk -= 0.5;

  return Math.min(10, Math.max(0, risk));
}

function calculateCentralizationRisk(hasOwner: boolean, hasRenounce: boolean): number {
  let risk = 3;

  if (hasOwner) risk += 3;
  if (hasOwner && !hasRenounce) risk += 2;

  return Math.min(10, Math.max(0, risk));
}

function calculateLiquidityRisk(code: string): number {
  let risk = 5;

  // Check for liquidity-related functions
  if (code.includes('addLiquidity')) risk -= 1;
  if (code.includes('lock')) risk -= 1;
  if (!code.includes('liquidity')) risk += 1.5;

  return Math.min(10, Math.max(0, risk));
}

function calculateTokenEconomicsRisk(hasMint: boolean, hasBurn: boolean): number {
  let risk = 4;

  if (hasMint) risk += 2;
  if (!hasBurn) risk += 1;
  if (hasMint && !hasBurn) risk += 1;

  return Math.min(10, Math.max(0, risk));
}

function calculateCodeQualityRisk(codeLength: number, code: string): number {
  let risk = 5;

  // Check code organization
  if (codeLength < 500) risk += 2;
  if (codeLength > 10000) risk += 1;
  
  // Check for comments and documentation
  if (code.includes('//') || code.includes('/*')) risk -= 0.5;
  
  // Check for modifiers
  if (code.includes('modifier')) risk -= 0.5;

  return Math.min(10, Math.max(0, risk));
}

function calculateCredibilityRisk(code: string): number {
  let risk = 5;

  // Check for verification indicators
  if (code.includes('SPDX-License-Identifier')) risk -= 1;
  if (code.includes('OpenZeppelin')) risk -= 1.5;
  if (code.includes('@notice') || code.includes('@dev')) risk -= 0.5;

  return Math.min(10, Math.max(0, risk));
}

function calculateHistoricalRisk(): number {
  // In production, this would check historical data
  // For now, return a neutral value
  return 5;
}
