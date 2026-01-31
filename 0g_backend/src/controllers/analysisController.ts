import { Request, Response } from 'express';
import { Network, AnalysisResult } from '../types';
import { validateAddress, getTokenInfo } from '../utils/blockchain';
import { analyzeContract } from '../services/analysisService';
import {
  calculateOverallRisk,
  determineRiskLevel,
  generateWarnings,
  generateRecommendation,
  simulateOGVerification,
  generateAnalysisId,
} from '../utils/riskAnalysis';

// In-memory storage (in production, use a database)
const analysisCache = new Map<string, AnalysisResult>();
const analysisHistory: AnalysisResult[] = [];

export async function analyzeContractHandler(req: Request, res: Response) {
  try {
    const { address, network } = req.body;

    // Validate input
    if (!address || !network) {
      return res.status(400).json({ error: 'Address and network are required' });
    }

    if (!validateAddress(address)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    const validNetworks: Network[] = ['ethereum', 'bsc', 'polygon'];
    if (!validNetworks.includes(network)) {
      return res.status(400).json({ error: 'Invalid network' });
    }

    // Check cache
    const cacheKey = `${address}_${network}`.toLowerCase();
    if (analysisCache.has(cacheKey)) {
      return res.json(analysisCache.get(cacheKey));
    }

    // Get token info
    const tokenInfo = await getTokenInfo(address, network);

    // Analyze contract
    const { factors, code } = await analyzeContract(address, network);

    // Calculate overall risk
    const overallRisk = calculateOverallRisk(factors);
    const riskLevel = determineRiskLevel(overallRisk);

    // Generate warnings and recommendation
    const warnings = generateWarnings(factors, code);
    const recommendation = generateRecommendation(riskLevel);

    // Simulate 0G verification
    const ogVerification = await simulateOGVerification();

    // Create analysis result
    const analysis: AnalysisResult = {
      id: generateAnalysisId(),
      contractAddress: address,
      network,
      tokenInfo,
      overallRisk: Math.round(overallRisk * 10) / 10,
      riskLevel,
      factors,
      warnings,
      recommendation,
      ogVerification,
      timestamp: new Date().toISOString(),
    };

    // Store in cache and history
    analysisCache.set(cacheKey, analysis);
    analysisHistory.unshift(analysis);
    
    // Keep only last 100 analyses
    if (analysisHistory.length > 100) {
      analysisHistory.pop();
    }

    res.json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze contract' 
    });
  }
}

export function getAnalysisHistoryHandler(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const history = analysisHistory.slice(0, limit).map(a => ({
      id: a.id,
      contractAddress: a.contractAddress,
      network: a.network,
      riskLevel: a.riskLevel,
      overallRisk: a.overallRisk,
      timestamp: a.timestamp,
    }));

    res.json(history);
  } catch (error: any) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis history' });
  }
}

export function getAnalysisByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const analysis = analysisHistory.find(a => a.id === id);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(analysis);
  } catch (error: any) {
    console.error('Get analysis error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
}

export function getAnalysisByAddressHandler(req: Request, res: Response) {
  try {
    const { address } = req.params;
    const { network } = req.query;

    const cacheKey = `${address}_${network}`.toLowerCase();
    const analysis = analysisCache.get(cacheKey);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(analysis);
  } catch (error: any) {
    console.error('Get analysis by address error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
}

export function getStatsHandler(req: Request, res: Response) {
  try {
    const totalAnalyses = analysisHistory.length;
    const scamsDetected = analysisHistory.filter(a => a.riskLevel === 'HIGH').length;
    const totalSavings = totalAnalyses * 0.048; // $0.048 saved per analysis
    const avgRiskScore = analysisHistory.length > 0
      ? analysisHistory.reduce((sum, a) => sum + a.overallRisk, 0) / analysisHistory.length
      : 0;

    res.json({
      totalAnalyses: totalAnalyses + 15234, // Add base count for demo
      scamsDetected: scamsDetected + 892,
      totalSavings: totalSavings + 730.03,
      avgRiskScore: Math.round(avgRiskScore * 10) / 10 || 5.2,
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
