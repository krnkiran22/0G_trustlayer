import axios from 'axios';
import { AnalysisResult, Analysis, Stats } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 120 seconds (2 minutes) for 0G analysis
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🌐 Axios Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('❌ Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Axios Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ Axios Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export async function analyzeContract(
  address: string,
  network: string
): Promise<AnalysisResult> {
  try {
    console.log('📤 API Request:', { url: `${API_BASE_URL}/analyze`, address, network });
    const response = await api.post('/analyze', { address, network });
    console.log('📥 API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ API Error:', error);
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
