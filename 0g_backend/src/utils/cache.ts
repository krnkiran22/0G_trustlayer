import NodeCache from 'node-cache';
import { AnalysisResult } from '../types';
import logger from './logger';

// Cache TTL: 1 hour (3600 seconds)
const CACHE_TTL = 3600;

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: CACHE_TTL,
      checkperiod: 600, // Check for expired keys every 10 minutes
      useClones: false,
    });

    // Log cache statistics periodically
    this.cache.on('expired', (key, value) => {
      logger.debug('Cache key expired', { key });
    });
  }

  /**
   * Generate cache key for contract analysis
   */
  private generateKey(address: string, network: string): string {
    return `${address.toLowerCase()}_${network}`;
  }

  /**
   * Store analysis result in cache
   */
  setAnalysis(address: string, network: string, analysis: AnalysisResult): void {
    const key = this.generateKey(address, network);
    this.cache.set(key, analysis);
    logger.debug('Analysis cached', { address, network, key });
  }

  /**
   * Get analysis result from cache
   */
  getAnalysis(address: string, network: string): AnalysisResult | undefined {
    const key = this.generateKey(address, network);
    const result = this.cache.get<AnalysisResult>(key);
    
    if (result) {
      logger.debug('Cache hit', { address, network });
    } else {
      logger.debug('Cache miss', { address, network });
    }

    return result;
  }

  /**
   * Check if analysis exists in cache
   */
  hasAnalysis(address: string, network: string): boolean {
    const key = this.generateKey(address, network);
    return this.cache.has(key);
  }

  /**
   * Delete analysis from cache
   */
  deleteAnalysis(address: string, network: string): void {
    const key = this.generateKey(address, network);
    this.cache.del(key);
    logger.debug('Analysis deleted from cache', { address, network });
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.flushAll();
    logger.info('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      keys: this.cache.keys().length,
      hits: this.cache.getStats().hits,
      misses: this.cache.getStats().misses,
      ksize: this.cache.getStats().ksize,
      vsize: this.cache.getStats().vsize,
    };
  }
}

// Export singleton instance
export default new CacheService();
