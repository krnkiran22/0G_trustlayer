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
    
    try {
      const result = await analyzeContract(address, network);
      toast.success('Analysis complete!');
      router.push(`/results/${address}?network=${network}`);
    } catch (error) {
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
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Smart Contract Risk Analysis
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Analyze any ERC-20 token contract for security risks, rug pulls, and vulnerabilities
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Analyze Contract</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <NetworkSelector
                        selected={network}
                        onSelect={setNetwork}
                        disabled={isAnalyzing}
                      />
                      <AddressInput
                        onSubmit={handleAnalyze}
                        isLoading={isAnalyzing}
                      />
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm text-slate-600 mb-3">
                          Try these example contracts:
                        </p>
                        <div className="space-y-2">
                          {exampleContracts.map((example) => (
                            <button
                              key={example.address}
                              onClick={() => handleExampleClick(example.address, example.network)}
                              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-slate-900">
                                    {example.name}
                                  </p>
                                  <p className="text-xs text-slate-600 font-mono">
                                    {example.address.slice(0, 20)}...
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    example.risk === 'LOW' ? 'success' :
                                    example.risk === 'MEDIUM' ? 'warning' : 'danger'
                                  }
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
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          8 Risk Factors Analyzed
                        </h3>
                        <ul className="text-sm text-slate-600 space-y-1">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <ClockIcon className="h-5 w-5" />
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
                      <p className="text-sm text-slate-500 text-center py-8">
                        No recent analyses yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="mt-6 bg-slate-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Need Help?
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Enter any ERC-20 token contract address to analyze. We support Ethereum, BSC, and Polygon networks.
                    </p>
                    <a
                      href="/about"
                      className="text-sm text-blue-600 hover:underline"
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
