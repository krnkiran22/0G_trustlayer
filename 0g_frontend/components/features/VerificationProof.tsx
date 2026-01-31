'use client';

import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OGVerification } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface VerificationProofProps {
  verification: OGVerification;
}

export default function VerificationProof({ verification }: VerificationProofProps) {
  return (
    <Card className="border-accent-400/30 bg-gradient-to-br from-primary-900/20 to-accent-900/20 shadow-glow-cyan">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-accent-400">
          <ShieldCheckIcon className="h-6 w-6" />
          <span>0G Verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm">
          <CheckCircleIcon className="h-5 w-5 text-success-500 animate-pulse-slow" />
          <span className="font-medium text-white">TEE Verified Analysis</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400">Storage ID</p>
            <p className="text-sm font-mono text-accent-300 truncate">
              {verification.storageId}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Timestamp</p>
            <p className="text-sm text-slate-200">
              {formatDate(verification.analysisTimestamp)}
            </p>
          </div>
        </div>

        <div className="bg-gradient-card rounded-lg p-4 space-y-3 border border-primary-700/30">
          <h4 className="text-sm font-semibold text-white">Cost Savings</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">0G Cost:</span>
              <span className="font-medium text-success-400">
                {formatCurrency(verification.cost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Traditional Cloud:</span>
              <span className="font-medium text-slate-200">
                {formatCurrency(verification.cloudCost)}
              </span>
            </div>
            <div className="pt-2 border-t border-primary-700/30">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Savings:</span>
                <span className="text-2xl font-bold text-success-400 shadow-glow-success">
                  {verification.savingsPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
