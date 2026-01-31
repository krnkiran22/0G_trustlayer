import { RiskFactors, OGVerification } from '../types';

export function calculateOverallRisk(factors: RiskFactors): number {
  const values = Object.values(factors);
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

export function determineRiskLevel(overallRisk: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (overallRisk <= 3.5) return 'LOW';
  if (overallRisk <= 6.5) return 'MEDIUM';
  return 'HIGH';
}

export function generateWarnings(factors: RiskFactors, code: string): string[] {
  const warnings: string[] = [];

  if (factors.rugPullRisk >= 7) {
    warnings.push('High rug pull risk detected');
  }
  
  if (factors.centralizationRisk >= 7) {
    warnings.push('Centralized ownership structure detected');
  }
  
  if (factors.liquidityRisk >= 7) {
    warnings.push('Low liquidity or no liquidity lock detected');
  }
  
  if (factors.smartContractRisk >= 7) {
    warnings.push('Potential smart contract vulnerabilities identified');
  }
  
  if (factors.tokenEconomicsRisk >= 7) {
    warnings.push('Concerning token distribution or supply dynamics');
  }

  // Check for dangerous functions in code
  if (code.includes('mint') && factors.rugPullRisk >= 6) {
    warnings.push('Owner has unlimited mint capability');
  }

  if (!code.includes('renounceOwnership') && factors.centralizationRisk >= 6) {
    warnings.push('Ownership cannot be renounced');
  }

  return warnings;
}

export function generateRecommendation(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return 'LOW RISK - This contract appears to be relatively safe, but always do your own research.';
    case 'MEDIUM':
      return 'MEDIUM RISK - Exercise caution and verify all information before interacting with this contract.';
    case 'HIGH':
      return 'HIGH RISK - Exercise extreme caution. This contract exhibits multiple red flags that suggest it may be unsafe.';
    default:
      return 'Unable to determine risk level.';
  }
}

export async function simulateOGVerification(): Promise<OGVerification> {
  // Simulate TEE verification and storage on 0G Network
  const cost = 0.002; // 0G cost in USD
  const cloudCost = 0.05; // Traditional cloud cost in USD
  const savingsPercentage = ((cloudCost - cost) / cloudCost) * 100;

  return {
    teeVerified: true,
    storageId: `0g_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    analysisTimestamp: new Date().toISOString(),
    cost,
    cloudCost,
    savingsPercentage: Math.round(savingsPercentage),
  };
}

export function generateAnalysisId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}
