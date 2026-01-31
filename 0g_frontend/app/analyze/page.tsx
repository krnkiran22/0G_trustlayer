'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddressInput from '@/components/features/AddressInput';
import NetworkSelector from '@/components/features/NetworkSelector';
import LoadingAnalysis from '@/components/features/LoadingAnalysis';
import AnalysisCard from '@/components/features/AnalysisCard';
import { Network, Analysis } from '@/types';
import { analyzeContract, getAnalysisHistory } from '@/lib/api';
import { exampleContracts } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function AnalyzePage() {
  const router = useRouter();
  const [network, setNetwork] = useState<Network>('ethereum');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentAnalyses, setRecentAnalyses] = useState<Analysis[]>([]);

  const handleAnalyze = async (address: string) => {
    setIsAnalyzing(true);
    console.log('🚀 Starting analysis:', { address, network });
    
    try {
      console.log('📡 Calling API...');
      const result = await analyzeContract(address, network);
      console.log('✅ Analysis result:', result);
      toast.success('Analysis complete!');
      router.push(`/results/${address}?network=${network}`);
    } catch (error) {
      console.error('❌ Analysis error:', error);
      toast.error('Failed to analyze contract. Please try again.');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (address: string, exampleNetwork: Network) => {
    setNetwork(exampleNetwork);
    router.push(`/results/${address}?network=${exampleNetwork}`);
  };

  return (
    <div className="bg-gradient-hero min-h-screen py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
              Smart Contract Risk Analysis
            </h1>
            <p className="text-xl font-medium text-slate-300 max-w-2xl mx-auto">
              Analyze any ERC-20 token contract for security risks, rug pulls, and vulnerabilities
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Analysis Form */}
            <div className="lg:col-span-2">
              {isAnalyzing ? (
                <Card>
                  <CardContent className="p-0">
                    <LoadingAnalysis />
                  </CardContent>
                </Card>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="bg-slate-900/80 backdrop-blur-lg border-primary-700/50">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-white">Analyze Contract</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8">
                      <NetworkSelector
                        selected={network}
                        onSelect={setNetwork}
                        disabled={isAnalyzing}
                      />
                      <AddressInput
                        onSubmit={handleAnalyze}
                        isLoading={isAnalyzing}
                      />
                      <div className="pt-6 border-t border-primary-700/30">
                        <p className="text-sm font-semibold text-slate-300 mb-4">
                          Try these example contracts:
                        </p>
                        <div className="space-y-3">
                          {exampleContracts.map((example) => (
                            <button
                              key={example.address}
                              onClick={() => handleExampleClick(example.address, example.network)}
                              className="w-full text-left p-4 rounded-lg border border-primary-700/40 hover:border-primary-500 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-glow-purple"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {example.name}
                                  </p>
                                  <p className="text-xs text-slate-400 font-mono mt-1">
                                    {example.address.slice(0, 20)}...
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    example.risk === 'LOW' ? 'success' :
                                    example.risk === 'MEDIUM' ? 'warning' : 'danger'
                                  }
                                  className="font-semibold"
                                >
                                  {example.risk}
                                </Badge>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Info Cards */}
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <Card className="bg-gradient-card border-primary-700/30">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-white mb-3 text-base">
                          8 Risk Factors Analyzed
                        </h3>
                        <ul className="text-sm text-slate-300 space-y-1.5 font-medium">
                          <li>• Rug Pull Risk</li>
                          <li>• Smart Contract Security</li>
                          <li>• Centralization</li>
                          <li>• Liquidity Analysis</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          Powered by 0G
                        </h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• TEE Verified Results</li>
                          <li>• 96% Cost Savings</li>
                          <li>• Decentralized AI</li>
                          <li>• Instant Analysis</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Recent Analyses */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-slate-900/80 backdrop-blur-lg border-primary-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-white">
                      <ClockIcon className="h-6 w-6 text-accent-400" />
                      <span>Recent Analyses</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exampleContracts.slice(0, 3).map((example, index) => {
                        const mockAnalysis: Analysis = {
                          id: `recent-${index}`,
                          contractAddress: example.address,
                          network: example.network,
                          riskLevel: example.risk,
                          overallRisk: example.risk === 'LOW' ? 2.1 : example.risk === 'MEDIUM' ? 5.5 : 7.5,
                          timestamp: new Date(Date.now() - index * 3600000).toISOString(),
                        };
                        return (
                          <AnalysisCard key={example.address} analysis={mockAnalysis} />
                        );
                      })}
                    </div>
                    {recentAnalyses.length === 0 && (
                      <p className="text-sm font-medium text-slate-400 text-center py-8">
                        No recent analyses yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="mt-6 bg-gradient-card border-accent-700/40">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-3 text-base">
                      Need Help?
                    </h3>
                    <p className="text-sm text-slate-300 mb-4 font-medium">
                      Enter any ERC-20 token contract address to analyze. We support Ethereum, BSC, Polygon, and 0G networks.
                    </p>
                    <a
                      href="/about"
                      className="text-sm text-accent-400 hover:text-accent-300 font-semibold hover:underline"
                    >
                      Learn more about our analysis →
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
