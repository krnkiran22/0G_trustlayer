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
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-indigo-600">
          <ShieldCheckIcon className="h-6 w-6" />
          <span>0G Verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span className="font-medium text-slate-900">TEE Verified Analysis</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-600">Storage ID</p>
            <p className="text-sm font-mono text-slate-900 truncate">
              {verification.storageId}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Timestamp</p>
            <p className="text-sm text-slate-900">
              {formatDate(verification.analysisTimestamp)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-900">Cost Savings</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">0G Cost:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(verification.cost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Traditional Cloud:</span>
              <span className="font-medium text-slate-900">
                {formatCurrency(verification.cloudCost)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-900">Savings:</span>
                <span className="text-2xl font-bold text-green-600">
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
