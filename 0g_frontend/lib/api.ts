import axios from 'axios';
import { AnalysisResult, Analysis, Stats } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function analyzeContract(
  address: string,
  network: string
): Promise<AnalysisResult> {
  try {
    const response = await api.post('/analyze', { address, network });
    return response.data;
  } catch (error) {
    console.error('Error analyzing contract:', error);
    throw new Error('Failed to analyze contract');
  }
}

export async function getAnalysisHistory(limit: number = 10): Promise<Analysis[]> {
  try {
    const response = await api.get(`/history?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    return [];
  }
}

export async function getAnalysisById(id: string): Promise<AnalysisResult> {
  try {
    const response = await api.get(`/analysis/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw new Error('Failed to fetch analysis');
  }
}

export async function getStats(): Promise<Stats> {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalAnalyses: 0,
      scamsDetected: 0,
      totalSavings: 0,
      avgRiskScore: 0,
    };
  }
}

export async function getAnalysisByAddress(
  address: string,
  network: string
): Promise<AnalysisResult | null> {
  try {
    const response = await api.get(`/analysis/address/${address}?network=${network}`);
    return response.data;
  } catch (error) {
    return null;
  }
}
