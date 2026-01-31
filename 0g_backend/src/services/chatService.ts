/**
 * Interactive Contract Analysis Chat Service
 * Uses 0G Compute with MCP for context-aware conversations about smart contracts
 */

import { ZeroGBrokerService } from '@0gfoundation/0g-cc/dist/services/zerog/broker.js';
import { config } from '../config';
import logger from '../utils/logger';
import { getContractCode } from '../utils/blockchain';
import { Network } from '../types';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatSession {
  id: string;
  contractAddress?: string;
  network?: Network;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// In-memory chat sessions (in production, use Redis or database)
const chatSessions = new Map<string, ChatSession>();

let chatBroker: ZeroGBrokerService | null = null;

/**
 * Initialize chat broker service
 */
async function getChatBroker(): Promise<ZeroGBrokerService> {
  if (!chatBroker) {
    chatBroker = new ZeroGBrokerService({
      network: config.og.network as 'testnet' | 'mainnet',
      privateKey: config.og.privateKey,
      minBalance: 0.1,
      initialDeposit: 3,
      disableFallback: true,
      disableSimulation: true,
    });

    await chatBroker.initialize();
    
    // Ensure account is ready
    const accountReady = await chatBroker.ensureAccountReady();
    if (!accountReady) {
      // Try to deposit funds
      try {
        await chatBroker.depositFunds(3);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        logger.error('Failed to prepare chat broker account', { error });
      }
    }

    logger.info('✅ Chat broker initialized', {
      walletAddress: chatBroker.getWalletAddress()
    });
  }
  
  return chatBroker;
}

/**
 * Create a new chat session
 */
export async function createChatSession(
  contractAddress?: string,
  network?: Network
): Promise<string> {
  const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session: ChatSession = {
    id: sessionId,
    contractAddress,
    network,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add system context if contract is provided
  if (contractAddress && network) {
    try {
      const code = await getContractCode(contractAddress, network);
      const codePreview = code.substring(0, 2000); // First 2000 chars
      
      session.messages.push({
        role: 'system',
        content: `You are an expert smart contract security analyst. The user is asking about a smart contract deployed at ${contractAddress} on ${network} network. Here's a preview of the contract code:\n\n${codePreview}\n\nProvide helpful, accurate analysis and answer questions about this contract's security, functionality, and risks.`
      });
    } catch (error) {
      logger.warn('Could not fetch contract code for chat context', { contractAddress, error });
    }
  } else {
    session.messages.push({
      role: 'system',
      content: 'You are an expert DeFi and smart contract security analyst. Help users understand smart contract risks, analyze contracts, and answer questions about blockchain security.'
    });
  }

  chatSessions.set(sessionId, session);
  
  logger.info('Created chat session', { sessionId, contractAddress, network });
  
  return sessionId;
}

/**
 * Send a message in a chat session
 */
export async function sendChatMessage(
  sessionId: string,
  userMessage: string
): Promise<{ reply: string; messageCount: number }> {
  const session = chatSessions.get(sessionId);
  
  if (!session) {
    throw new Error('Chat session not found');
  }

  // Add user message to session
  session.messages.push({
    role: 'user',
    content: userMessage
  });
  session.updatedAt = new Date();

  logger.info('User message', { sessionId, message: userMessage });

  // Get AI response using 0G Compute
  const broker = await getChatBroker();
  
  // List available providers
  const services = await broker.listServices();
  const chatProviders = services.filter(s => 
    s.serviceType === 'chatbot' && s.verifiability === 'TeeML'
  );

  if (chatProviders.length === 0) {
    throw new Error('No chat providers available');
  }

  // Select provider (prefer DeepSeek or GPT)
  let selectedService = chatProviders.find(s => 
    s.model.toLowerCase().includes('deepseek') || s.model.toLowerCase().includes('gpt')
  ) || chatProviders[0];

  logger.info('Selected chat provider', {
    provider: selectedService.providerAddress,
    model: selectedService.model
  });

  // Acknowledge provider
  await broker.acknowledgeProvider(selectedService.providerAddress);

  // Prepare messages (last 10 to keep context manageable)
  const contextMessages = session.messages.slice(-10).map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // Send inference request
  const response = await broker.inference(
    selectedService.providerAddress,
    contextMessages,
    {
      maxTokens: 1000,
      temperature: 0.7,
    }
  );

  const assistantReply = response.content;

  // Add assistant response to session
  session.messages.push({
    role: 'assistant',
    content: assistantReply
  });
  session.updatedAt = new Date();

  logger.info('AI response generated', { 
    sessionId, 
    messageCount: session.messages.length,
    replyLength: assistantReply.length 
  });

  return {
    reply: assistantReply,
    messageCount: session.messages.length
  };
}

/**
 * Get chat session history
 */
export function getChatHistory(sessionId: string): ChatMessage[] {
  const session = chatSessions.get(sessionId);
  
  if (!session) {
    throw new Error('Chat session not found');
  }

  // Return all messages except system messages
  return session.messages.filter(msg => msg.role !== 'system');
}

/**
 * Delete a chat session
 */
export function deleteChatSession(sessionId: string): boolean {
  return chatSessions.delete(sessionId);
}

/**
 * Get all active chat sessions (for admin/debugging)
 */
export function getActiveSessions(): Array<{
  id: string;
  contractAddress?: string;
  network?: Network;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}> {
  return Array.from(chatSessions.values()).map(session => ({
    id: session.id,
    contractAddress: session.contractAddress,
    network: session.network,
    messageCount: session.messages.filter(m => m.role !== 'system').length,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  }));
}
