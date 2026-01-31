'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateAddress } from '@/lib/blockchain';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface AddressInputProps {
  onSubmit: (address: string) => void;
  isLoading?: boolean;
}

export default function AddressInput({ onSubmit, isLoading = false }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('📝 Form submitted:', { address, isLoading });

    if (!address.trim()) {
      setError('Please enter a contract address');
      return;
    }

    if (!validateAddress(address)) {
      setError('Invalid Ethereum address format');
      return;
    }

    console.log('✅ Validation passed, calling onSubmit...');
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="0x... (Contract Address)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
          className={cn(
            'pl-10 pr-4 h-14 text-base font-medium bg-slate-800/50 border-primary-700/40 text-white placeholder:text-slate-400 focus:bg-slate-800/70',
            error && 'border-danger-500 focus-visible:ring-danger-500'
          )}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      </div>
      {error && <p className="text-sm font-medium text-danger-400">{error}</p>}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-base font-semibold shadow-glow-purple"
        size="lg"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Risk'}
      </Button>
    </form>
  );
}
