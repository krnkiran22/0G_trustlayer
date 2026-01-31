import express from 'express';
import {
  analyzeContractHandler,
  getAnalysisHistoryHandler,
  getAnalysisByIdHandler,
  getAnalysisByAddressHandler,
  getStatsHandler,
} from '../controllers/analysisController';

const router = express.Router();

// POST /api/analyze - Analyze a contract
router.post('/analyze', analyzeContractHandler);

// GET /api/history - Get analysis history
router.get('/history', getAnalysisHistoryHandler);

// GET /api/analysis/:id - Get analysis by ID
router.get('/analysis/:id', getAnalysisByIdHandler);

// GET /api/analysis/address/:address - Get analysis by address
router.get('/analysis/address/:address', getAnalysisByAddressHandler);

// GET /api/stats - Get platform stats
router.get('/stats', getStatsHandler);

export default router;
