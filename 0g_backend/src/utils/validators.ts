import { ethers } from 'ethers';
import { Network } from '../types';

export function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function isValidNetwork(network: string): network is Network {
  const validNetworks: Network[] = ['ethereum', 'bsc', 'polygon'];
  return validNetworks.includes(network as Network);
}

export function validateContractAddress(address: string): {
  valid: boolean;
  error?: string;
} {
  if (!address) {
    return { valid: false, error: 'Address is required' };
  }

  if (!isValidAddress(address)) {
    return { valid: false, error: 'Invalid Ethereum address format' };
  }

  return { valid: true };
}

export function validateNetwork(network: string): {
  valid: boolean;
  error?: string;
} {
  if (!network) {
    return { valid: false, error: 'Network is required' };
  }

  if (!isValidNetwork(network)) {
    return {
      valid: false,
      error: 'Invalid network. Must be: ethereum, bsc, or polygon',
    };
  }

  return { valid: true };
}

export function sanitizeInput(input: string): string {
  return input.trim().toLowerCase();
}
