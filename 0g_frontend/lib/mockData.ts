import { AnalysisResult } from '@/types';

export const mockAnalysis: AnalysisResult = {
  id: 'mock-1',
  contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  network: 'ethereum',
  tokenInfo: {
    name: 'Example Token',
    symbol: 'EXMP',
    totalSupply: '1000000000000000000000000',
    decimals: 18,
    holderCount: 1250,
  },
  overallRisk: 7.5,
  riskLevel: 'HIGH',
  factors: {
    rugPullRisk: 8,
    smartContractRisk: 7,
    centralizationRisk: 8,
    liquidityRisk: 6,
    tokenEconomicsRisk: 7,
    codeQualityRisk: 6,
    credibilityRisk: 8,
    historicalRisk: 7,
  },
  warnings: [
    'Owner has unlimited mint capability',
    'No liquidity lock detected',
    'Centralized ownership structure',
    'Contract not verified on Etherscan',
    'High concentration in top 10 holders',
  ],
  recommendation: 'HIGH RISK - Exercise extreme caution. This contract exhibits multiple red flags.',
  ogVerification: {
    teeVerified: true,
    storageId: '0g_1738332000_0x742d35',
    analysisTimestamp: '2026-01-31T10:30:00Z',
    cost: 0.002,
    cloudCost: 0.05,
    savingsPercentage: 96,
  },
  timestamp: '2026-01-31T10:30:00Z',
};

export const mockLowRiskAnalysis: AnalysisResult = {
  id: 'mock-2',
  contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  network: 'ethereum',
  tokenInfo: {
    name: 'Tether USD',
    symbol: 'USDT',
    totalSupply: '95000000000000000',
    decimals: 6,
    holderCount: 5420000,
  },
  overallRisk: 2.1,
  riskLevel: 'LOW',
  factors: {
    rugPullRisk: 1,
    smartContractRisk: 2,
    centralizationRisk: 3,
    liquidityRisk: 1,
    tokenEconomicsRisk: 2,
    codeQualityRisk: 3,
    credibilityRisk: 2,
    historicalRisk: 1,
  },
  warnings: [
    'Centralized control (expected for stablecoin)',
  ],
  recommendation: 'LOW RISK - Well-established token with proven track record.',
  ogVerification: {
    teeVerified: true,
    storageId: '0g_1738332100_0xdAC17F',
    analysisTimestamp: '2026-01-31T10:35:00Z',
    cost: 0.002,
    cloudCost: 0.05,
    savingsPercentage: 96,
  },
  timestamp: '2026-01-31T10:35:00Z',
};

export const exampleContracts = [
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'USDT (Tether)',
    network: 'ethereum' as const,
    risk: 'LOW' as const,
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'DAI (MakerDAO)',
    network: 'ethereum' as const,
    risk: 'LOW' as const,
  },
  {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    name: 'High Risk Example',
    network: 'ethereum' as const,
    risk: 'HIGH' as const,
  },
];
