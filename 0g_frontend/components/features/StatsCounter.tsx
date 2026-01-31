'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function StatsCounter({ end, duration = 2, prefix = '', suffix = '' }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
