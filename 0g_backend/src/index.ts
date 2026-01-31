import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import routes from './routes';
import logger from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { apiLimiter } from './middleware/rateLimiter';
import cache from './utils/cache';

const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.nodeEnv === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Rate limiting
app.use('/api', apiLimiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    success: true,
    data: {
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      uptime: process.uptime(),
      cache: cache.getStats(),
    }
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Uncaught exception handler
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Unhandled rejection handler
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  logger.info(`🚀 SafeGuard AI Backend started successfully`);
  logger.info(`📊 Environment: ${config.nodeEnv}`);
  logger.info(`🔗 API: http://localhost:${PORT}/api`);
  logger.info(`❤️  Health: http://localhost:${PORT}/health`);
  logger.info(`🔐 Security: Helmet enabled, CORS configured`);
  logger.info(`⚡ Performance: Compression enabled, Caching ready`);
});

export default app;
