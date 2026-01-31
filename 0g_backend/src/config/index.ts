import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  networks: {
    ethereum: {
      name: 'Ethereum',
      chainId: 1,
      rpcUrl: process.env.ETHEREUM_RPC || 'https://eth.llamarpc.com',
      explorer: 'https://etherscan.io',
    },
    bsc: {
      name: 'BSC',
      chainId: 56,
      rpcUrl: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org',
      explorer: 'https://bscscan.com',
    },
    polygon: {
      name: 'Polygon',
      chainId: 137,
      rpcUrl: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
      explorer: 'https://polygonscan.com',
    },
    '0g': {
      name: '0G Mainnet',
      chainId: 16600,
      rpcUrl: process.env.ZEROG_RPC || 'https://evmrpc-testnet.0g.ai',
      explorer: 'https://chainscan-newton.0g.ai',
    },
  },
  
  og: {
    network: process.env.ZEROG_NETWORK || 'testnet',
    privateKey: process.env.ZEROG_PRIVATE_KEY || '',
    model: process.env.ZEROG_MODEL || 'deepseek/deepseek-chat',
    storageEndpoint: process.env.OG_STORAGE_ENDPOINT || 'https://storage.0g.ai',
    teeEndpoint: process.env.OG_TEE_ENDPOINT || 'https://tee.0g.ai',
  },
  
  apiKeys: {
    etherscan: process.env.ETHERSCAN_API_KEY || '',
    bscscan: process.env.BSCSCAN_API_KEY || '',
    polygonscan: process.env.POLYGONSCAN_API_KEY || '',
  },
};
