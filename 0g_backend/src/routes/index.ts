import express from 'express';
import {
  analyzeContractHandler,
  getAnalysisHistoryHandler,
  getAnalysisByIdHandler,
  getAnalysisByAddressHandler,
  getStatsHandler,
} from '../controllers/analysisController';
import {
  createSession,
  sendMessage,
  getHistory,
  deleteSession,
  getSessions
} from '../controllers/chatController';
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

// ====== CHAT ENDPOINTS ======
// POST /api/chat/session - Create new chat session
router.post('/chat/session', createSession);

// POST /api/chat/message - Send message in chat session
router.post('/chat/message', sendMessage);

// GET /api/chat/history/:sessionId - Get chat history
router.get('/chat/history/:sessionId', getHistory);

// DELETE /api/chat/session/:sessionId - Delete chat session
router.delete('/chat/session/:sessionId', deleteSession);

// GET /api/chat/sessions - Get all active sessions (admin)
router.get('/chat/sessions', getSessions);

export default router;
