import { ethers } from 'ethers';
import { Network, TokenInfo } from '@/types';

const NETWORK_CONFIGS = {
  ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC || 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
  },
  bsc: {
    name: 'BSC',
    chainId: 56,
    rpcUrl: process.env.NEXT_PUBLIC_BSC_RPC || 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
  },
};

export function validateAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function getProvider(network: Network): ethers.JsonRpcProvider {
  const config = NETWORK_CONFIGS[network];
  return new ethers.JsonRpcProvider(config.rpcUrl);
}

export async function getContractCode(
  address: string,
  network: Network
): Promise<string> {
  try {
    const provider = getProvider(network);
    const code = await provider.getCode(address);
    return code;
  } catch (error) {
    console.error('Error fetching contract code:', error);
    throw new Error('Failed to fetch contract code');
  }
}

export async function getTokenInfo(
  address: string,
  network: Network
): Promise<TokenInfo> {
  try {
    const provider = getProvider(network);
    
    // ERC20 ABI for basic token info
    const erc20Abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)',
    ];

    const contract = new ethers.Contract(address, erc20Abi, provider);

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
    ]);

    return {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: totalSupply.toString(),
    };
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw new Error('Failed to fetch token information');
  }
}

export async function resolveENS(name: string): Promise<string> {
  try {
    const provider = getProvider('ethereum');
    const address = await provider.resolveName(name);
    if (!address) {
      throw new Error('ENS name not found');
    }
    return address;
  } catch (error) {
    console.error('Error resolving ENS:', error);
    throw new Error('Failed to resolve ENS name');
  }
}

export function getExplorerUrl(address: string, network: Network): string {
  const config = NETWORK_CONFIGS[network];
  return `${config.explorer}/address/${address}`;
}

export function getNetworkName(network: Network): string {
  return NETWORK_CONFIGS[network].name;
}

export { NETWORK_CONFIGS };
