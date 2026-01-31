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

const networks: { id: Network; name: string }[] = [
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'bsc', name: 'BSC' },
  { id: 'polygon', name: 'Polygon' },
];

export default function NetworkSelector({ selected, onSelect, disabled = false }: NetworkSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">Network</label>
      <div className="flex space-x-2">
        {networks.map((network) => (
          <Button
            key={network.id}
            type="button"
            variant={selected === network.id ? 'default' : 'outline'}
            onClick={() => onSelect(network.id)}
            disabled={disabled}
            className={cn(
              'flex-1',
              selected === network.id && 'bg-blue-600 hover:bg-blue-700'
            )}
          >
            {network.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
