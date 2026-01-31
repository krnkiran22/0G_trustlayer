import express from 'express';
import {
  analyzeContractHandler,
  getAnalysisHistoryHandler,
  getAnalysisByIdHandler,
  getAnalysisByAddressHandler,
  getStatsHandler,
} from '../controllers/analysisController';
import { validateAnalysisRequest, validateQueryParams } from '../middleware/validators';
import { analysisLimiter, statsLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// POST /api/analyze - Analyze a contract (with rate limiting and validation)
router.post('/analyze', analysisLimiter, validateAnalysisRequest, analyzeContractHandler);

// GET /api/history - Get analysis history (with validation)
router.get('/history', validateQueryParams, getAnalysisHistoryHandler);

// GET /api/analysis/:id - Get analysis by ID
router.get('/analysis/:id', getAnalysisByIdHandler);

// GET /api/analysis/address/:address - Get analysis by address
router.get('/analysis/address/:address', getAnalysisByAddressHandler);

// GET /api/stats - Get platform stats (with rate limiting)
router.get('/stats', statsLimiter, getStatsHandler);

export default router;
