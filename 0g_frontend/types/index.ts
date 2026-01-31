export interface TokenInfo {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: number;
  holderCount?: number;
}

export interface RiskFactors {
  rugPullRisk: number;
  smartContractRisk: number;
  centralizationRisk: number;
  liquidityRisk: number;
  tokenEconomicsRisk: number;
  codeQualityRisk: number;
  credibilityRisk: number;
  historicalRisk: number;
}

export interface OGVerification {
  teeVerified: boolean;
  storageId: string;
  analysisTimestamp: string;
  cost: number;
  cloudCost: number;
  savingsPercentage: number;
}

export interface AnalysisResult {
  id: string;
  contractAddress: string;
  network: string;
  tokenInfo: TokenInfo;
  overallRisk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  factors: RiskFactors;
  warnings: string[];
  recommendation: string;
  ogVerification: OGVerification;
  timestamp: string;
}

export interface Stats {
  totalAnalyses: number;
  scamsDetected: number;
  totalSavings: number;
  avgRiskScore: number;
}

export interface Analysis {
  id: string;
  contractAddress: string;
  network: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  overallRisk: number;
  timestamp: string;
}

export type Network = 'ethereum' | 'bsc' | 'polygon' | '0g';

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorer: string;
}
