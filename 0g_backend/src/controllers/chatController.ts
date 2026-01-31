/**
 * Chat Controller
 * Handles HTTP requests for interactive contract analysis chat
 */

import { Request, Response, NextFunction } from 'express';
import {
  createChatSession,
  sendChatMessage,
  getChatHistory,
  deleteChatSession,
  getActiveSessions
} from '../services/chatService';
import { Network } from '../types';
import logger from '../utils/logger';

/**
 * Create a new chat session
 * POST /api/chat/session
 */
export async function createSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { contractAddress, network } = req.body;

    // Validate network if provided
    if (network && !['ethereum', 'bsc', 'polygon'].includes(network)) {
      res.status(400).json({
        success: false,
        error: 'Invalid network. Must be ethereum, bsc, or polygon'
      });
      return;
    }

    const sessionId = await createChatSession(
      contractAddress,
      network as Network
    );

    res.status(201).json({
      success: true,
      data: {
        sessionId,
        contractAddress,
        network
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Send a message in a chat session
 * POST /api/chat/message
 */
export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      res.status(400).json({
        success: false,
        error: 'sessionId and message are required'
      });
      return;
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'message must be a non-empty string'
      });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({
        success: false,
        error: 'message too long (max 2000 characters)'
      });
      return;
    }

    const result = await sendChatMessage(sessionId, message.trim());

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        reply: result.reply,
        messageCount: result.messageCount
      }
    });
  } catch (error: any) {
    if (error.message === 'Chat session not found') {
      res.status(404).json({
        success: false,
        error: 'Chat session not found'
      });
      return;
    }
    next(error);
  }
}

/**
 * Get chat session history
 * GET /api/chat/history/:sessionId
 */
export async function getHistory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        error: 'sessionId is required'
      });
      return;
    }

    const history = getChatHistory(sessionId);

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        messages: history
      }
    });
  } catch (error: any) {
    if (error.message === 'Chat session not found') {
      res.status(404).json({
        success: false,
        error: 'Chat session not found'
      });
      return;
    }
    next(error);
  }
}

/**
 * Delete a chat session
 * DELETE /api/chat/session/:sessionId
 */
export async function deleteSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        error: 'sessionId is required'
      });
      return;
    }

    const deleted = deleteChatSession(sessionId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Chat session not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        message: 'Chat session deleted',
        sessionId
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all active sessions (admin/debug)
 * GET /api/chat/sessions
 */
export async function getSessions(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessions = getActiveSessions();

    res.status(200).json({
      success: true,
      data: {
        sessions,
        count: sessions.length
      }
    });
  } catch (error) {
    next(error);
  }
}
