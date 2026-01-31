import { ethers } from 'ethers';
import { Network, NetworkConfig, TokenInfo } from '../types';
import { config } from '../config';

export function getProvider(network: Network): ethers.JsonRpcProvider {
  const networkConfig = config.networks[network];
  return new ethers.JsonRpcProvider(networkConfig.rpcUrl);
}

export function validateAddress(address: string): boolean {
  return ethers.isAddress(address);
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
      contract.name().catch(() => 'Unknown Token'),
      contract.symbol().catch(() => 'UNKNOWN'),
      contract.decimals().catch(() => 18),
      contract.totalSupply().catch(() => BigInt(0)),
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

export async function isContract(address: string, network: Network): Promise<boolean> {
  try {
    const code = await getContractCode(address, network);
    return code !== '0x' && code !== '0x0';
  } catch (error) {
    return false;
  }
}

export function getExplorerUrl(address: string, network: Network): string {
  const networkConfig = config.networks[network];
  return `${networkConfig.explorer}/address/${address}`;
}
