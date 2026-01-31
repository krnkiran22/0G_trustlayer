'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getRiskColorRaw } from '@/lib/utils';

interface RiskGaugeProps {
  value: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function RiskGauge({ value, riskLevel }: RiskGaugeProps) {
  // Safe fallback for undefined value
  const safeValue = value ?? 0;
  const circumference = 2 * Math.PI * 90;
  const progress = (safeValue / 10) * circumference;
  
  // Semantic colors with glow - with safe fallback
  const riskConfig = {
    LOW: { color: '#10b981', glow: 'shadow-glow-success', bgClass: 'bg-success-50' },
    MEDIUM: { color: '#f59e0b', glow: 'shadow-glow-warning', bgClass: 'bg-warning-50' },
    HIGH: { color: '#ef4444', glow: 'shadow-glow-danger', bgClass: 'bg-danger-50' }
  };
  
  // Safe fallback if riskLevel is undefined or invalid
  const config = riskConfig[riskLevel] || riskConfig.MEDIUM;
  const color = config.color;

  return (
    <div className={cn("relative w-64 h-64 rounded-full p-4", config.bgClass, config.glow)}>
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
          stroke={config.color}
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
          style={{ color: config.color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {safeValue.toFixed(1)}
        </motion.span>
        <span className="text-sm text-slate-600 mt-2">Risk Score</span>
        <motion.span
          className={cn(
            'text-lg font-semibold mt-2 px-4 py-1 rounded-full',
            riskLevel === 'LOW' && 'text-success-700 bg-success-100',
            riskLevel === 'MEDIUM' && 'text-warning-700 bg-warning-100',
            riskLevel === 'HIGH' && 'text-danger-700 bg-danger-100',
            !riskLevel && 'text-slate-700 bg-slate-100'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {riskLevel || 'UNKNOWN'} RISK
        </motion.span>
      </div>
    </div>
  );
}
