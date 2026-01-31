'use client';

import { useState } from 'react';
import { Network } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NetworkSelectorProps {
  selected: Network;
  onSelect: (network: Network) => void;
  disabled?: boolean;
}

const networks: { id: Network; name: string; badge?: string }[] = [
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'bsc', name: 'BSC' },
  { id: 'polygon', name: 'Polygon' },
  { id: '0g', name: '0G Mainnet', badge: 'NEW' },
];

export default function NetworkSelector({ selected, onSelect, disabled = false }: NetworkSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-white">Network</label>
      <div className="grid grid-cols-2 gap-3">
        {networks.map((network) => (
          <Button
            key={network.id}
            type="button"
            variant={selected === network.id ? 'default' : 'outline'}
            onClick={() => onSelect(network.id)}
            disabled={disabled}
            className={cn(
              'relative h-12 font-semibold',
              selected === network.id && 'shadow-glow-purple'
            )}
          >
            {network.name}
            {network.badge && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {network.badge}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
