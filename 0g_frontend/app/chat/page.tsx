'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import { ChatInterface } from '@/components/features/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showContractChat, setShowContractChat] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<'ethereum' | 'bsc' | 'polygon'>('ethereum');

  const startNewChat = () => {
    setSessionId(null);
    setShowContractChat(false);
    setContractAddress('');
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-primary-400/30">
            <svg className="w-14 h-14 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent tracking-tight">
            AI Contract Assistant
          </h1>
          <p className="text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Chat with an AI powered by 0G Compute to analyze smart contracts and get instant answers about DeFi security
          </p>
        </div>

        {/* Chat Mode Selection */}
        {!sessionId && (
          <div className="max-w-5xl mx-auto mb-8">
            <Card className="p-10 bg-slate-900/80 backdrop-blur-lg border-primary-700/50 shadow-glow-purple">
              <h2 className="text-3xl font-semibold mb-8 text-white tracking-tight">Choose Chat Mode</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* General Chat */}
                <button
                  onClick={() => setShowContractChat(false)}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left group ${
                    !showContractChat
                      ? 'border-primary-500 bg-gradient-to-br from-primary-900/50 to-accent-900/30 shadow-glow-purple'
                      : 'border-primary-700/40 bg-slate-800/50 hover:border-primary-600 hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">General Q&A</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Ask general questions about DeFi, smart contracts, and blockchain security
                  </p>
                  {!showContractChat && (
                    <div className="mt-4 text-sm font-semibold text-accent-400 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </div>
                  )}
                </button>

                {/* Contract-Specific Chat */}
                <button
                  onClick={() => setShowContractChat(true)}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left group ${
                    showContractChat
                      ? 'border-primary-500 bg-gradient-to-br from-primary-900/50 to-accent-900/30 shadow-glow-purple'
                      : 'border-primary-700/40 bg-slate-800/50 hover:border-primary-600 hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">Contract Analysis</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    Analyze a specific contract and ask detailed questions about it
                  </p>
                  {showContractChat && (
                    <div className="mt-4 text-sm font-semibold text-accent-400 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </div>
                  )}
                </button>
              </div>

              {/* Contract Input (if contract mode selected) */}
              {showContractChat && (
                <div className="mt-8 p-8 bg-gradient-card rounded-2xl border-2 border-primary-700/40 backdrop-blur-sm">
                  <label className="block text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Contract Address
                  </label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-4 bg-slate-800/50 border-2 border-primary-700/40 text-white placeholder:text-slate-400 rounded-xl mb-6 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
                  />
                  
                  <label className="block text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Network
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value as any)}
                    className="w-full p-4 bg-slate-800/50 border-2 border-primary-700/40 text-white rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="bsc">BSC</option>
                    <option value="polygon">Polygon</option>
                    <option value="0g">0G Mainnet</option>
                  </select>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Chat Interface */}
        <div className="max-w-5xl mx-auto">
          <ChatInterface
            sessionId={sessionId}
            contractAddress={showContractChat ? contractAddress : undefined}
            network={showContractChat ? selectedNetwork : undefined}
            onSessionCreate={setSessionId}
          />
          
          {sessionId && (
            <div className="mt-6 text-center">
              <Button
                onClick={startNewChat}
                variant="outline"
                className="text-gray-600 border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 px-6 py-3 rounded-xl transition-all"
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start New Chat
              </Button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-8 text-center border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-xl transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔐</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">TEE Verified</h3>
            <p className="text-gray-600 leading-relaxed">
              All responses generated in Trusted Execution Environment
            </p>
          </Card>

          <Card className="p-8 text-center border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant answers powered by decentralized AI
            </p>
          </Card>

          <Card className="p-8 text-center border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Context-Aware</h3>
            <p className="text-gray-600 leading-relaxed">
              AI understands your contract's code and history
            </p>
          </Card>
        </div>

        {/* Example Questions */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Example Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-indigo-600">General Questions</h4>
              </div>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>What are the most common smart contract vulnerabilities?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>How do reentrancy attacks work?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>What should I check before investing in a DeFi protocol?</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-600">Contract-Specific</h4>
              </div>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>What are the main risks in this contract?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Can the owner pause transfers?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Is this contract upgradeable?</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
