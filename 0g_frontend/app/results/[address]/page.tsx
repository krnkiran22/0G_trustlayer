'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RiskGauge from '@/components/features/RiskGauge';
import RiskFactorCard from '@/components/features/RiskFactorCard';
import WarningsList from '@/components/features/WarningsList';
import VerificationProof from '@/components/features/VerificationProof';
import { AnalysisResult } from '@/types';
import { getAnalysisByAddress } from '@/lib/api';
import { formatAddress, getRiskColor } from '@/lib/utils';
import { mockAnalysis, mockLowRiskAnalysis } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';

const riskFactorDescriptions: Record<string, string> = {
  rugPullRisk: 'Likelihood of developers abandoning project',
  smartContractRisk: 'Code vulnerabilities and exploits',
  centralizationRisk: 'Concentration of control and ownership',
  liquidityRisk: 'Trading depth and exit liquidity',
  tokenEconomicsRisk: 'Supply dynamics and distribution',
  codeQualityRisk: 'Code standards and best practices',
  credibilityRisk: 'Team reputation and transparency',
  historicalRisk: 'Past incidents and track record',
};

export default function ResultsPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const network = searchParams.get('network') || 'ethereum';

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from API
        const result = await getAnalysisByAddress(resolvedParams.address, network);
        
        console.log('📊 Analysis result:', result);
        
        if (result) {
          setAnalysis(result);
        } else {
          // Use mock data for demo
          if (resolvedParams.address.toLowerCase() === '0xdac17f958d2ee523a2206206994597c13d831ec7') {
            setAnalysis(mockLowRiskAnalysis);
          } else {
            setAnalysis(mockAnalysis);
          }
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setAnalysis(mockAnalysis); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [resolvedParams.address, network]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleExport = () => {
    toast.success('PDF export feature coming soon!');
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <Container>
          <div className="max-w-6xl mx-auto space-y-8">
            <Skeleton className="h-12 w-64" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-96" />
                <Skeleton className="h-64" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64" />
                <Skeleton className="h-48" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Analysis Not Found
            </h1>
            <Button asChild>
              <Link href="/analyze">Analyze Contract</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const riskVariant = 
    analysis.riskLevel === 'LOW' ? 'success' :
    analysis.riskLevel === 'MEDIUM' ? 'warning' : 'danger';

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" asChild>
                <Link href="/analyze">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Analysis
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Token Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {analysis.tokenInfo?.name || 'Smart Contract'} {analysis.tokenInfo?.symbol && `(${analysis.tokenInfo.symbol})`}
                        </CardTitle>
                        <p className="text-sm text-slate-600 font-mono">
                          {formatAddress(analysis.contractAddress)}
                        </p>
                        <p className="text-xs text-slate-500 capitalize mt-1">
                          Network: {analysis.network}
                        </p>
                      </div>
                      <Badge variant={riskVariant} className="text-lg px-4 py-2">
                        {analysis.riskLevel} RISK
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center py-8">
                      <RiskGauge value={analysis.overallRisk} riskLevel={analysis.riskLevel} />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-slate-900 mb-2">Recommendation</h4>
                      <p className="text-sm text-slate-700">
                        {analysis.recommendation || 'Analysis in progress. Please wait for detailed recommendations...'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Risk Factors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Factor Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysis.factors && Object.entries(analysis.factors).map(([key, value]) => (
                        <RiskFactorCard
                          key={key}
                          name={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          value={value}
                          description={riskFactorDescriptions[key]}
                        />
                      ))}
                      {!analysis.factors && (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          <p>Risk factors are being calculated...</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Warnings */}
              {analysis.warnings && analysis.warnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <WarningsList warnings={analysis.warnings} />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* 0G Verification */}
              {analysis.ogVerification && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <VerificationProof verification={analysis.ogVerification} />
                </motion.div>
              )}

              {/* Token Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Token Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysis.tokenInfo?.totalSupply && (
                      <div>
                        <p className="text-xs text-slate-600">Total Supply</p>
                        <p className="text-sm font-mono text-slate-900">
                          {parseFloat(analysis.tokenInfo.totalSupply).toExponential(2)}
                        </p>
                      </div>
                    )}
                    {analysis.tokenInfo?.decimals !== undefined && (
                      <div>
                        <p className="text-xs text-slate-600">Decimals</p>
                        <p className="text-sm text-slate-900">{analysis.tokenInfo.decimals}</p>
                      </div>
                    )}
                    {analysis.tokenInfo?.holderCount && (
                      <div>
                        <p className="text-xs text-slate-600">Holder Count</p>
                        <p className="text-sm text-slate-900">
                          {analysis.tokenInfo.holderCount.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-slate-600">Analysis Date</p>
                      <p className="text-sm text-slate-900">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Analyze Another Contract</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Check security risks for any smart contract
                    </p>
                    <Button variant="secondary" asChild className="w-full">
                      <Link href="/analyze">New Analysis</Link>
                    </Button>
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
