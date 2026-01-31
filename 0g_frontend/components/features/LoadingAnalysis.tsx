'use client';

import { motion } from 'framer-motion';

export default function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-12">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </motion.div>

      <div className="text-center space-y-2">
        <motion.h3
          className="text-xl font-semibold text-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Analyzing with 0G...
        </motion.h3>
        <motion.p
          className="text-sm text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Performing decentralized risk analysis
        </motion.p>
      </div>

      <div className="w-full max-w-md space-y-2">
        {['Fetching contract data', 'Running TEE verification', 'Calculating risk factors'].map(
          (step, index) => (
            <motion.div
              key={step}
              className="flex items-center space-x-2 text-sm text-slate-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span>{step}</span>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
