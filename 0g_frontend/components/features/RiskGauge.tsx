'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getRiskColorRaw } from '@/lib/utils';

interface RiskGaugeProps {
  value: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function RiskGauge({ value, riskLevel }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 90;
  const progress = (value / 10) * circumference;
  const color = getRiskColorRaw(riskLevel);

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold"
          style={{ color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {value.toFixed(1)}
        </motion.span>
        <span className="text-sm text-slate-600 mt-2">Risk Score</span>
        <motion.span
          className={cn(
            'text-lg font-semibold mt-2',
            riskLevel === 'LOW' && 'text-green-600',
            riskLevel === 'MEDIUM' && 'text-yellow-600',
            riskLevel === 'HIGH' && 'text-red-600'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {riskLevel} RISK
        </motion.span>
      </div>
    </div>
  );
}
