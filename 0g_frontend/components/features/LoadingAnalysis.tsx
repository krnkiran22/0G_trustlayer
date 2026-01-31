'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const steps = [
    { text: 'Fetching contract data', duration: 3 },
    { text: 'Connecting to 0G Network', duration: 5 },
    { text: 'Initializing TEE verification', duration: 8 },
    { text: 'Running AI analysis with 0G Compute', duration: 15 },
    { text: 'Processing results', duration: 3 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let accumulatedTime = 0;
    for (let i = 0; i < steps.length; i++) {
      accumulatedTime += steps[i].duration;
      if (elapsedTime < accumulatedTime) {
        setCurrentStep(i);
        break;
      }
    }
    if (elapsedTime >= accumulatedTime) {
      setCurrentStep(steps.length - 1);
    }
  }, [elapsedTime]);

  const estimatedTotal = steps.reduce((sum, step) => sum + step.duration, 0);
  const progress = Math.min((elapsedTime / estimatedTotal) * 100, 95);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-12 bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-primary-700/50">
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary-900/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent shadow-glow-purple"></div>
      </motion.div>

      <div className="text-center space-y-3">
        <motion.h3
          className="text-2xl font-semibold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Analyzing with 0G...
        </motion.h3>
        <motion.p
          className="text-base text-slate-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Performing decentralized risk analysis
        </motion.p>
        <motion.div
          className="text-sm text-accent-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {elapsedTime}s / ~{estimatedTotal}s
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.text}
            className={`flex items-center space-x-3 text-sm transition-all duration-300 ${
              index === currentStep
                ? 'text-accent-400 font-semibold'
                : index < currentStep
                ? 'text-success-400'
                : 'text-slate-500'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            {index < currentStep ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : index === currentStep ? (
              <motion.div
                className="w-5 h-5 border-2 border-accent-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
            )}
            <span>{step.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-xs text-slate-400 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        ⚡ Analysis uses 0G's decentralized compute with TEE verification
      </motion.div>
    </div>
  );
}
