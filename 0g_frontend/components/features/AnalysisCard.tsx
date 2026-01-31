'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Analysis } from '@/types';
import { formatAddress, formatDate, getRiskColor } from '@/lib/utils';

interface AnalysisCardProps {
  analysis: Analysis;
}

export default function AnalysisCard({ analysis }: AnalysisCardProps) {
  const riskVariant = 
    analysis.riskLevel === 'LOW' ? 'success' :
    analysis.riskLevel === 'MEDIUM' ? 'warning' : 'danger';

  return (
    <Link href={`/results/${analysis.contractAddress}?network=${analysis.network}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-mono">
                {formatAddress(analysis.contractAddress)}
              </CardTitle>
              <p className="text-xs text-slate-600 mt-1 capitalize">{analysis.network}</p>
            </div>
            <Badge variant={riskVariant}>
              {analysis.riskLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-600">Risk Score</p>
              <p className="text-2xl font-bold text-slate-900">{analysis.overallRisk.toFixed(1)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600">Analyzed</p>
              <p className="text-xs text-slate-900">{formatDate(analysis.timestamp)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
