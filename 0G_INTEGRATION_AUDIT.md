# 🔍 COMPLETE SYSTEM AUDIT & 0G INTEGRATION CHECKLIST

**Date**: January 31, 2026  
**Auditor**: AI System Analysis  
**Project**: SafeGuard AI - DeFi Risk Analysis Platform  
**Current Status**: 95% Complete - Mock Data Implementation  
**Required**: Real 0G Network Integration

---

## SECTION A: MOCK DATA LOCATIONS

### 🚨 CRITICAL MOCK DATA POINTS IDENTIFIED

#### **1. Risk Analysis Service - Complete Mock Implementation**

**File**: `/0g_backend/src/services/analysisService.ts`  
**Function**: `performRiskAnalysis()`  
**Lines**: 20-59  
**Current**: Uses basic heuristics and pattern matching on contract code
- Searches for keywords: 'owner', 'mint', 'burn', 'pause', 'renounce', 'timelock'
- Calculates risk based on code length and simple boolean flags
- No AI/ML model involved
- No 0G Compute API calls

**Required**: 
- Call 0G Compute Layer with AI model
- Submit contract code to TEE for secure analysis
- Receive AI-generated risk assessment
- Parse and validate 0G Compute response

**0G Method**: `0g.compute.analyze()` or equivalent  
**Priority**: **CRITICAL** - Core functionality

---

**File**: `/0g_backend/src/services/analysisService.ts`  
**Function**: `calculateRugPullRisk()`  
**Lines**: 62-74  
**Current**: Simple arithmetic based on boolean flags
```typescript
let risk = 5; // Base risk
if (hasOwner && hasMint) risk += 2;
if (hasOwner && !hasRenounce) risk += 1.5;
// etc.
```

**Required**: AI-powered analysis from 0G Compute  
**0G Method**: Should be part of overall compute response  
**Priority**: **CRITICAL**

---

**File**: `/0g_backend/src/services/analysisService.ts`  
**Function**: `calculateSmartContractRisk()`  
**Lines**: 76-90  
**Current**: Checks for keywords like 'delegatecall', 'selfdestruct', 'SafeMath'
```typescript
if (code.includes('delegatecall')) risk += 1.5;
if (code.includes('selfdestruct')) risk += 1;
```

**Required**: Deep AI analysis of vulnerability patterns  
**0G Method**: Part of 0G Compute analysis response  
**Priority**: **CRITICAL**

---

**File**: `/0g_backend/src/services/analysisService.ts`  
**Functions**: `calculateCentralizationRisk()`, `calculateLiquidityRisk()`, `calculateTokenEconomicsRisk()`, `calculateCodeQualityRisk()`, `calculateCredibilityRisk()`, `calculateHistoricalRisk()`  
**Lines**: 92-156  
**Current**: All using simple heuristics, keyword matching, or hardcoded values
```typescript
function calculateHistoricalRisk(): number {
  // In production, this would check historical data
  // For now, return a neutral value
  return 5; // ⚠️ HARDCODED
}
```

**Required**: Replace entire analysis pipeline with 0G Compute  
**0G Method**: Single comprehensive AI analysis call  
**Priority**: **CRITICAL**

---

#### **2. 0G Verification - Complete Mock**

**File**: `/0g_backend/src/utils/riskAnalysis.ts`  
**Function**: `simulateOGVerification()`  
**Lines**: 63-77  
**Current**: Completely fabricated 0G verification data
```typescript
export async function simulateOGVerification(): Promise<OGVerification> {
  const cost = 0.002; // ⚠️ STATIC VALUE
  const cloudCost = 0.05; // ⚠️ STATIC VALUE
  const savingsPercentage = ((cloudCost - cost) / cloudCost) * 100;

  return {
    teeVerified: true, // ⚠️ ALWAYS TRUE - NO REAL VERIFICATION
    storageId: `0g_${Date.now()}_${Math.random().toString(36).substring(7)}`, // ⚠️ FAKE ID
    analysisTimestamp: new Date().toISOString(),
    cost,
    cloudCost,
    savingsPercentage: Math.round(savingsPercentage),
  };
}
```

**Required**:
- Real TEE attestation verification
- Actual storage ID from 0G Storage network
- Dynamic cost calculation from 0G pricing
- Proof of TEE execution
- Storage proof/receipt

**0G Methods Needed**:
- `0g.tee.verify()` - Verify TEE attestation
- `0g.storage.store()` - Store analysis on 0G Storage
- `0g.storage.getProof()` - Get storage proof
- `0g.pricing.calculate()` - Get real-time pricing

**Priority**: **CRITICAL**

---

#### **3. Analysis ID Generation - Using Random**

**File**: `/0g_backend/src/utils/riskAnalysis.ts`  
**Function**: `generateAnalysisId()`  
**Lines**: 79-81  
**Current**: Uses timestamp + random string
```typescript
return `analysis_${Date.now()}_${Math.random().toString(36).substring(7)}`;
```

**Required**: Should use 0G transaction hash or storage proof hash  
**0G Method**: Use response from 0G Storage as ID  
**Priority**: **MEDIUM** - Works but not blockchain-native

---

#### **4. Controller Layer - Mock Integration**

**File**: `/0g_backend/src/controllers/analysisController.ts`  
**Function**: `analyzeContractHandler()`  
**Lines**: 56  
**Current**: Calls `simulateOGVerification()` which returns fake data

**Required**: Replace with real 0G verification after analysis  
**0G Method**: Await real verification response  
**Priority**: **CRITICAL**

---

### 📊 MOCK DATA SUMMARY

| Component | File | Lines | Status | Priority |
|-----------|------|-------|--------|----------|
| Risk Analysis Algorithm | analysisService.ts | 20-156 | 100% Mock | CRITICAL |
| Rug Pull Risk | analysisService.ts | 62-74 | Mock Heuristic | CRITICAL |
| Smart Contract Risk | analysisService.ts | 76-90 | Mock Heuristic | CRITICAL |
| Centralization Risk | analysisService.ts | 92-99 | Mock Heuristic | CRITICAL |
| Liquidity Risk | analysisService.ts | 101-110 | Mock Heuristic | CRITICAL |
| Token Economics Risk | analysisService.ts | 112-120 | Mock Heuristic | CRITICAL |
| Code Quality Risk | analysisService.ts | 122-135 | Mock Heuristic | CRITICAL |
| Credibility Risk | analysisService.ts | 137-147 | Mock Heuristic | CRITICAL |
| Historical Risk | analysisService.ts | 149-153 | Hardcoded | CRITICAL |
| TEE Verification | riskAnalysis.ts | 71 | Fake Boolean | CRITICAL |
| Storage ID | riskAnalysis.ts | 71 | Random String | CRITICAL |
| Cost Calculation | riskAnalysis.ts | 64-66 | Static Values | HIGH |
| Analysis ID | riskAnalysis.ts | 79-81 | Random | MEDIUM |

**Total Mock Functions**: 13  
**Lines of Mock Code**: ~150 lines  
**Real 0G Integration**: 0%

---

## SECTION B: MISSING DEPENDENCIES

### **1. 0G SDK - NOT INSTALLED**

**Package**: `@0gfoundation/0g-cc` or `@0g/sdk` (exact package name unknown)  
**Status**: ❌ **NOT INSTALLED**  
**Current Dependencies** (from package.json):
```json
{
  "compression": "^1.8.1",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "ethers": "^6.16.0",
  "express": "^5.2.1",
  "express-rate-limit": "^8.2.1",
  "helmet": "^8.1.0",
  "node-cache": "^5.1.2",
  "winston": "^3.19.0"
}
```

**Missing**: 0G Network SDK  
**Required Version**: Unknown - need to confirm latest stable version  
**Install Command**: 
```bash
cd /Users/kiran/Desktop/0G_trustlayer/0g_backend
npm install @0gfoundation/0g-cc
# OR
npm install @0g/sdk
# OR
npm install 0g-chain
```

**🚨 BLOCKER**: Cannot proceed without knowing correct package name

---

### **2. Additional Dependencies (Potential)**

**May Need**:
- `@0g/compute` - If compute layer is separate package
- `@0g/storage` - If storage is separate package
- `@0g/tee` - If TEE verification is separate
- `crypto` / `buffer` - For signature verification (might already be in Node.js)

**Status**: UNKNOWN - depends on 0G SDK structure

---

## SECTION C: ENVIRONMENT VARIABLES CHECKLIST

### **Current .env File**

```bash
# Environment
NODE_ENV=development
PORT=4000

# RPC URLs
ETHEREUM_RPC=https://eth.llamarpc.com
BSC_RPC=https://bsc-dataseed.binance.org
POLYGON_RPC=https://polygon-rpc.com

# 0G Network Configuration
OG_STORAGE_ENDPOINT=https://storage.0g.ai  # ✅ Present but not used
OG_TEE_ENDPOINT=https://tee.0g.ai          # ✅ Present but not used

# API Keys (optional)
ETHERSCAN_API_KEY=
BSCSCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

---

### **MISSING 0G ENVIRONMENT VARIABLES**

#### **CRITICAL - Must Have**

| Variable Name | Required | Current | Description | How to Get |
|---------------|----------|---------|-------------|------------|
| `OG_API_KEY` | ✅ YES | ❌ MISSING | Authentication for 0G API | Get from 0G dashboard |
| `OG_PRIVATE_KEY` | ✅ YES | ❌ MISSING | Wallet private key for 0G transactions | Your wallet |
| `OG_COMPUTE_ENDPOINT` | ✅ YES | ❌ MISSING | 0G Compute API endpoint | 0G documentation |
| `OG_CHAIN_ID` | ✅ YES | ❌ MISSING | 0G blockchain network ID | 0G docs (testnet/mainnet) |
| `OG_RPC_URL` | ✅ YES | ❌ MISSING | 0G Chain RPC endpoint | 0G infrastructure docs |

#### **HIGH Priority**

| Variable Name | Required | Current | Description | How to Get |
|---------------|----------|---------|-------------|------------|
| `OG_WALLET_ADDRESS` | 🔶 MAYBE | ❌ MISSING | Your 0G wallet address | Derived from private key |
| `OG_MODEL_ID` | 🔶 MAYBE | ❌ MISSING | Specific AI model to use | 0G Compute docs |
| `OG_NETWORK` | 🔶 MAYBE | ❌ MISSING | testnet or mainnet | Your choice |
| `OG_GAS_LIMIT` | 🟡 NO | ❌ MISSING | Max gas for transactions | 0G docs or auto |
| `OG_TIMEOUT` | 🟡 NO | ❌ MISSING | API timeout in ms | Default 30000 |

#### **MEDIUM Priority**

| Variable Name | Required | Current | Description | How to Get |
|---------------|----------|---------|-------------|------------|
| `OG_STORAGE_API_KEY` | 🟡 MAYBE | ❌ MISSING | Separate storage API key | Might be same as OG_API_KEY |
| `OG_TEE_API_KEY` | 🟡 MAYBE | ❌ MISSING | Separate TEE API key | Might be same as OG_API_KEY |
| `OG_PRICING_ENDPOINT` | 🟡 NO | ❌ MISSING | Real-time pricing API | 0G pricing service |
| `OG_CACHE_TTL` | 🟡 NO | ❌ MISSING | How long to cache 0G results | Your preference |

#### **OPTIONAL**

| Variable Name | Required | Current | Description |
|---------------|----------|---------|-------------|
| `OG_DEBUG_MODE` | 🟡 NO | ❌ MISSING | Enable verbose logging |
| `OG_WEBHOOK_URL` | 🟡 NO | ❌ MISSING | Webhook for async results |
| `OG_RETRY_COUNT` | 🟡 NO | ❌ MISSING | Number of retries on failure |
| `OG_FALLBACK_ENABLED` | 🟡 NO | ❌ MISSING | Use mock data if 0G fails |

---

### **Updated .env Template Needed**

```bash
# ============================================
# 0G NETWORK CONFIGURATION (REQUIRED)
# ============================================

# 0G API Authentication
OG_API_KEY=your_api_key_here                    # Get from: https://app.0g.ai
OG_PRIVATE_KEY=your_private_key_here            # Your wallet private key (KEEP SECRET!)

# 0G Network Endpoints
OG_COMPUTE_ENDPOINT=https://compute.0g.ai       # 0G Compute service
OG_STORAGE_ENDPOINT=https://storage.0g.ai       # 0G Storage service
OG_TEE_ENDPOINT=https://tee.0g.ai               # TEE verification
OG_RPC_URL=https://rpc.0g.ai                    # 0G Chain RPC

# 0G Network Configuration
OG_CHAIN_ID=16600                               # 0G testnet=16600, mainnet=TBD
OG_NETWORK=testnet                              # testnet or mainnet
OG_WALLET_ADDRESS=f17153a9fd37828d507699cd962e9e25d189f59a22411386fd7aa8e6a92c95b1                         # Your 0G wallet address

# 0G Compute Settings
OG_MODEL_ID=contract-analyzer-v1                # AI model identifier
OG_TIMEOUT=60000                                # API timeout (ms)
OG_GAS_LIMIT=1000000                            # Max gas for transactions

# Optional
OG_DEBUG_MODE=false
OG_FALLBACK_ENABLED=true                        # Use mock if 0G unavailable
```

---

## SECTION D: CODE CHANGES REQUIRED

### **File 1: `/0g_backend/src/services/analysisService.ts`**

#### **COMPLETE FILE REPLACEMENT NEEDED**

**Lines to Replace**: **ENTIRE FILE** (1-156)  
**Reason**: Current implementation is 100% mock heuristics

**Current Code** (simplified):
```typescript
async function performRiskAnalysis(
  code: string,
  address: string,
  network: Network
): Promise<RiskFactors> {
  // Mock keyword searches
  const hasOwner = code.toLowerCase().includes('owner');
  const hasMint = code.toLowerCase().includes('mint');
  
  // Mock calculations
  const rugPullRisk = calculateRugPullRisk(hasOwner, hasMint, ...);
  const smartContractRisk = calculateSmartContractRisk(codeLength, code);
  // ... more mock functions
  
  return { rugPullRisk, smartContractRisk, ... };
}
```

**New Code** (with 0G integration):
```typescript
import { ZeroGClient } from '@0gfoundation/0g-cc'; // Import 0G SDK
import { config } from '../config';
import logger from '../utils/logger';

// Initialize 0G client (singleton pattern)
let ogClient: ZeroGClient | null = null;

function getOGClient(): ZeroGClient {
  if (!ogClient) {
    ogClient = new ZeroGClient({
      apiKey: config.og.apiKey,
      privateKey: config.og.privateKey,
      computeEndpoint: config.og.computeEndpoint,
      storageEndpoint: config.og.storageEndpoint,
      teeEndpoint: config.og.teeEndpoint,
      chainId: config.og.chainId,
      network: config.og.network,
    });
  }
  return ogClient;
}

export async function analyzeContract(
  address: string,
  network: Network
): Promise<{ factors: RiskFactors; code: string }> {
  // Check if address is a contract
  const isContractAddress = await isContract(address, network);
  if (!isContractAddress) {
    throw new Error('Address is not a contract');
  }

  // Get contract code
  const code = await getContractCode(address, network);

  // ✅ REAL 0G COMPUTE INTEGRATION
  const factors = await performRealRiskAnalysis(code, address, network);

  return { factors, code };
}

async function performRealRiskAnalysis(
  code: string,
  address: string,
  network: Network
): Promise<RiskFactors> {
  try {
    const client = getOGClient();
    
    // Prepare AI analysis prompt
    const prompt = constructAnalysisPrompt(code, address, network);
    
    logger.info('Sending contract to 0G Compute for analysis', { 
      address, 
      network,
      codeLength: code.length 
    });
    
    // ✅ CALL 0G COMPUTE WITH TEE VERIFICATION
    const response = await client.compute.analyze({
      contractCode: code,
      contractAddress: address,
      network: network,
      prompt: prompt,
      model: config.og.modelId || 'contract-analyzer-v1',
      teeVerified: true, // Require TEE execution
      timeout: config.og.timeout || 60000,
    });
    
    // Parse 0G response
    if (!response.success) {
      throw new Error(`0G Compute failed: ${response.error}`);
    }
    
    logger.info('Received analysis from 0G Compute', {
      address,
      transactionHash: response.txHash,
      teeAttested: response.teeAttested,
    });
    
    // Extract risk factors from AI response
    const factors: RiskFactors = {
      rugPullRisk: response.analysis.rugPullRisk || 5,
      smartContractRisk: response.analysis.smartContractRisk || 5,
      centralizationRisk: response.analysis.centralizationRisk || 5,
      liquidityRisk: response.analysis.liquidityRisk || 5,
      tokenEconomicsRisk: response.analysis.tokenEconomicsRisk || 5,
      codeQualityRisk: response.analysis.codeQualityRisk || 5,
      credibilityRisk: response.analysis.credibilityRisk || 5,
      historicalRisk: response.analysis.historicalRisk || 5,
    };
    
    // Validate risk scores are in range 0-10
    Object.keys(factors).forEach(key => {
      const value = factors[key as keyof RiskFactors];
      if (value < 0 || value > 10) {
        logger.warn('Invalid risk score from 0G', { key, value });
        factors[key as keyof RiskFactors] = Math.min(10, Math.max(0, value));
      }
    });
    
    return factors;
    
  } catch (error) {
    logger.error('0G Compute analysis failed', { 
      error: error.message, 
      address, 
      network 
    });
    
    // Fallback behavior based on config
    if (config.og.fallbackEnabled) {
      logger.warn('Falling back to mock analysis');
      return performMockAnalysis(code); // Keep old mock as fallback
    }
    
    throw error;
  }
}

function constructAnalysisPrompt(
  code: string, 
  address: string, 
  network: Network
): string {
  return `
You are a smart contract security expert. Analyze the following Solidity contract and provide risk scores (0-10 scale) for each category:

Contract Address: ${address}
Network: ${network}
Code Length: ${code.length} characters

CONTRACT CODE:
${code}

Please analyze and provide scores (0=safest, 10=most risky) for:
1. rugPullRisk - Likelihood of rug pull (owner can drain funds, unlimited minting, etc.)
2. smartContractRisk - Code vulnerabilities (reentrancy, overflow, access control issues)
3. centralizationRisk - Centralization of control (single owner, no timelock, no multisig)
4. liquidityRisk - Liquidity concerns (locked liquidity, pool depth, withdrawal restrictions)
5. tokenEconomicsRisk - Token economics issues (supply distribution, inflation, burning)
6. codeQualityRisk - Code quality (verification, comments, standards compliance)
7. credibilityRisk - Project credibility (known team, audits, community)
8. historicalRisk - Historical behavior (past exploits, updates, governance)

Return JSON format:
{
  "rugPullRisk": 0-10,
  "smartContractRisk": 0-10,
  "centralizationRisk": 0-10,
  "liquidityRisk": 0-10,
  "tokenEconomicsRisk": 0-10,
  "codeQualityRisk": 0-10,
  "credibilityRisk": 0-10,
  "historicalRisk": 0-10,
  "reasoning": "Brief explanation of major concerns"
}
`.trim();
}

// Keep mock implementation as fallback
async function performMockAnalysis(code: string): Promise<RiskFactors> {
  // Original mock implementation here as backup
  logger.warn('Using MOCK analysis - 0G integration not available');
  
  return {
    rugPullRisk: 5,
    smartContractRisk: 5,
    centralizationRisk: 5,
    liquidityRisk: 5,
    tokenEconomicsRisk: 5,
    codeQualityRisk: 5,
    credibilityRisk: 5,
    historicalRisk: 5,
  };
}
```

**Imports Needed**:
```typescript
import { ZeroGClient } from '@0gfoundation/0g-cc'; // Main 0G SDK
```

**Dependencies**: 
- 0G SDK must be installed first
- Config must have 0G credentials
- Error handling for 0G failures

---

### **File 2: `/0g_backend/src/utils/riskAnalysis.ts`**

**Function to Replace**: `simulateOGVerification()`  
**Lines**: 63-77

**Current Code**:
```typescript
export async function simulateOGVerification(): Promise<OGVerification> {
  const cost = 0.002;
  const cloudCost = 0.05;
  const savingsPercentage = ((cloudCost - cost) / cloudCost) * 100;

  return {
    teeVerified: true, // FAKE
    storageId: `0g_${Date.now()}_${Math.random().toString(36).substring(7)}`, // FAKE
    analysisTimestamp: new Date().toISOString(),
    cost,
    cloudCost,
    savingsPercentage: Math.round(savingsPercentage),
  };
}
```

**New Code**:
```typescript
import { ZeroGClient } from '@0gfoundation/0g-cc';
import { config } from '../config';
import logger from './logger';

export async function performRealOGVerification(
  analysisData: any,
  computeResponse: any
): Promise<OGVerification> {
  try {
    const client = new ZeroGClient({
      apiKey: config.og.apiKey,
      storageEndpoint: config.og.storageEndpoint,
      teeEndpoint: config.og.teeEndpoint,
    });
    
    // ✅ STORE ANALYSIS ON 0G STORAGE NETWORK
    logger.info('Storing analysis on 0G Storage Network');
    const storageResult = await client.storage.store({
      data: JSON.stringify(analysisData),
      encrypt: true, // Encrypt before storing
      metadata: {
        contractAddress: analysisData.contractAddress,
        network: analysisData.network,
        timestamp: new Date().toISOString(),
      },
    });
    
    if (!storageResult.success) {
      throw new Error(`0G Storage failed: ${storageResult.error}`);
    }
    
    // ✅ VERIFY TEE ATTESTATION
    logger.info('Verifying TEE attestation', { 
      txHash: computeResponse.txHash 
    });
    const teeVerification = await client.tee.verify({
      transactionHash: computeResponse.txHash,
      attestation: computeResponse.attestation,
    });
    
    if (!teeVerification.valid) {
      logger.error('TEE verification failed', {
        txHash: computeResponse.txHash,
        reason: teeVerification.reason,
      });
    }
    
    // ✅ GET REAL PRICING
    const pricing = await client.pricing.calculate({
      operation: 'contract_analysis',
      dataSize: JSON.stringify(analysisData).length,
      computeUnits: computeResponse.computeUnits || 1,
    });
    
    // Calculate savings vs traditional cloud
    const cloudCost = 0.05; // Traditional cloud cost (could be dynamic)
    const savingsPercentage = ((cloudCost - pricing.cost) / cloudCost) * 100;
    
    logger.info('0G verification complete', {
      storageId: storageResult.storageId,
      teeVerified: teeVerification.valid,
      cost: pricing.cost,
      savings: savingsPercentage,
    });
    
    return {
      teeVerified: teeVerification.valid, // ✅ REAL VERIFICATION
      storageId: storageResult.storageId, // ✅ REAL STORAGE ID
      analysisTimestamp: new Date().toISOString(),
      cost: pricing.cost, // ✅ REAL COST
      cloudCost: cloudCost,
      savingsPercentage: Math.round(savingsPercentage),
      // Additional fields from 0G
      transactionHash: computeResponse.txHash,
      attestationProof: teeVerification.proof,
      storageProof: storageResult.proof,
    };
    
  } catch (error) {
    logger.error('0G verification failed', { error: error.message });
    
    // Return partial verification on error
    return {
      teeVerified: false,
      storageId: `error_${Date.now()}`,
      analysisTimestamp: new Date().toISOString(),
      cost: 0,
      cloudCost: 0.05,
      savingsPercentage: 0,
      error: error.message,
    };
  }
}

// Keep old function renamed for fallback
export async function simulateOGVerification(): Promise<OGVerification> {
  logger.warn('Using SIMULATED 0G verification - not real!');
  // ... original mock code ...
}
```

**Type Updates Needed** in `/0g_backend/src/types/index.ts`:
```typescript
export interface OGVerification {
  teeVerified: boolean;
  storageId: string;
  analysisTimestamp: string;
  cost: number;
  cloudCost: number;
  savingsPercentage: number;
  // Add new optional fields
  transactionHash?: string;
  attestationProof?: string;
  storageProof?: string;
  error?: string;
}
```

---

### **File 3: `/0g_backend/src/config/index.ts`**

**Lines to Add**: After line 29 (in `og` section)

**Current Code**:
```typescript
og: {
  storageEndpoint: process.env.OG_STORAGE_ENDPOINT || 'https://storage.0g.ai',
  teeEndpoint: process.env.OG_TEE_ENDPOINT || 'https://tee.0g.ai',
},
```

**New Code**:
```typescript
og: {
  // API Authentication
  apiKey: process.env.OG_API_KEY || '',
  privateKey: process.env.OG_PRIVATE_KEY || '',
  walletAddress: process.env.OG_WALLET_ADDRESS || '',
  
  // Endpoints
  computeEndpoint: process.env.OG_COMPUTE_ENDPOINT || 'https://compute.0g.ai',
  storageEndpoint: process.env.OG_STORAGE_ENDPOINT || 'https://storage.0g.ai',
  teeEndpoint: process.env.OG_TEE_ENDPOINT || 'https://tee.0g.ai',
  rpcUrl: process.env.OG_RPC_URL || 'https://rpc.0g.ai',
  
  // Network Configuration
  chainId: parseInt(process.env.OG_CHAIN_ID || '16600'), // 0G testnet
  network: process.env.OG_NETWORK || 'testnet',
  
  // Compute Settings
  modelId: process.env.OG_MODEL_ID || 'contract-analyzer-v1',
  timeout: parseInt(process.env.OG_TIMEOUT || '60000'),
  gasLimit: parseInt(process.env.OG_GAS_LIMIT || '1000000'),
  
  // Optional Settings
  debugMode: process.env.OG_DEBUG_MODE === 'true',
  fallbackEnabled: process.env.OG_FALLBACK_ENABLED !== 'false', // true by default
},
```

**Validation to Add**:
```typescript
// After config object definition
if (!config.og.apiKey && config.nodeEnv === 'production') {
  console.error('❌ FATAL: OG_API_KEY is required in production!');
  process.exit(1);
}

if (!config.og.privateKey && config.nodeEnv === 'production') {
  console.error('❌ FATAL: OG_PRIVATE_KEY is required in production!');
  process.exit(1);
}
```

---

### **File 4: `/0g_backend/src/controllers/analysisController.ts`**

**Lines to Replace**: 56

**Current Code**:
```typescript
// Simulate 0G verification
const ogVerification = await simulateOGVerification();
```

**New Code**:
```typescript
// ✅ REAL 0G verification with storage and TEE attestation
const ogVerification = await performRealOGVerification(
  analysis, // The analysis data to store
  computeResponse // Response from 0G Compute (if available)
);
```

**Import Update** (line 10):
```typescript
// OLD
import {
  calculateOverallRisk,
  determineRiskLevel,
  generateWarnings,
  generateRecommendation,
  simulateOGVerification, // ❌ REMOVE
  generateAnalysisId,
} from '../utils/riskAnalysis';

// NEW
import {
  calculateOverallRisk,
  determineRiskLevel,
  generateWarnings,
  generateRecommendation,
  performRealOGVerification, // ✅ ADD
  generateAnalysisId,
} from '../utils/riskAnalysis';
```

**Additional Changes Needed**:
The `analyzeContract()` function needs to return the 0G compute response so we can pass it to verification. Update the service layer to return this data.

---

### **File 5: `/0g_backend/.env`**

**Complete Replacement**:

```bash
# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=development
PORT=4000

# ============================================
# BLOCKCHAIN RPC ENDPOINTS
# ============================================
ETHEREUM_RPC=https://eth.llamarpc.com
BSC_RPC=https://bsc-dataseed.binance.org
POLYGON_RPC=https://polygon-rpc.com

# ============================================
# 0G NETWORK CONFIGURATION (REQUIRED)
# ============================================

# 🔐 API Authentication (REQUIRED - Get from https://app.0g.ai)
OG_API_KEY=your_api_key_here_CHANGEME
OG_PRIVATE_KEY=your_wallet_private_key_here_CHANGEME
OG_WALLET_ADDRESS=0x_your_wallet_address_CHANGEME

# 🌐 0G Network Endpoints
OG_COMPUTE_ENDPOINT=https://compute.0g.ai
OG_STORAGE_ENDPOINT=https://storage.0g.ai
OG_TEE_ENDPOINT=https://tee.0g.ai
OG_RPC_URL=https://rpc.0g.ai

# ⚙️ Network Configuration
OG_CHAIN_ID=16600
OG_NETWORK=testnet

# 🤖 Compute Settings
OG_MODEL_ID=contract-analyzer-v1
OG_TIMEOUT=60000
OG_GAS_LIMIT=1000000

# 🐛 Debug & Fallback
OG_DEBUG_MODE=false
OG_FALLBACK_ENABLED=true

# ============================================
# BLOCKCHAIN EXPLORER API KEYS (OPTIONAL)
# ============================================
ETHERSCAN_API_KEY=
BSCSCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

---

## SECTION E: INTEGRATION STEPS

### **🚀 STEP-BY-STEP IMPLEMENTATION GUIDE**

#### **PHASE 1: Prerequisites & Setup (15 minutes)**

**Step 1: Get 0G Credentials**
```bash
# 1. Go to https://app.0g.ai (or wherever 0G credentials are obtained)
# 2. Create account / Sign in
# 3. Generate API key
# 4. Note your wallet address and private key
# 5. Ensure you have testnet tokens for gas fees
```

**Step 2: Install 0G SDK**
```bash
cd /Users/kiran/Desktop/0G_trustlayer/0g_backend

# Install 0G SDK (CONFIRM EXACT PACKAGE NAME FIRST!)
npm install @0gfoundation/0g-cc

# If package name is different:
# npm install @0g/sdk
# OR
# npm install 0g-chain

# Verify installation
npm list | grep "0g"
```

**Step 3: Configure Environment**
```bash
# Backup current .env
cp .env .env.backup

# Update .env with 0G credentials
nano .env

# Add:
OG_API_KEY=your_actual_api_key
OG_PRIVATE_KEY=your_actual_private_key
OG_WALLET_ADDRESS=0xyour_actual_address

# Save and exit (Ctrl+O, Ctrl+X)

# Verify env vars loaded
node -e "require('dotenv').config(); console.log(process.env.OG_API_KEY)"
```

---

#### **PHASE 2: Code Updates (2 hours)**

**Step 4: Update Config File**
```bash
# Open config
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/config/index.ts

# Replace the 'og' section with new config (see File 3 above)
# Add validation checks
# Save
```

**Step 5: Create New 0G Service Module**
```bash
# Create new file for 0G integration
touch /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/services/ogService.ts
```

Add this content:
```typescript
// /0g_backend/src/services/ogService.ts
import { ZeroGClient } from '@0gfoundation/0g-cc';
import { config } from '../config';
import logger from '../utils/logger';

let ogClient: ZeroGClient | null = null;

export function initializeOGClient(): ZeroGClient {
  if (!ogClient) {
    logger.info('Initializing 0G Client', {
      computeEndpoint: config.og.computeEndpoint,
      network: config.og.network,
    });
    
    ogClient = new ZeroGClient({
      apiKey: config.og.apiKey,
      privateKey: config.og.privateKey,
      computeEndpoint: config.og.computeEndpoint,
      storageEndpoint: config.og.storageEndpoint,
      teeEndpoint: config.og.teeEndpoint,
      chainId: config.og.chainId,
      rpcUrl: config.og.rpcUrl,
    });
    
    logger.info('✅ 0G Client initialized successfully');
  }
  return ogClient;
}

export function getOGClient(): ZeroGClient {
  if (!ogClient) {
    return initializeOGClient();
  }
  return ogClient;
}

export async function testOGConnection(): Promise<boolean> {
  try {
    const client = getOGClient();
    // Test connection with a simple API call
    const status = await client.getStatus();
    logger.info('0G connection test successful', { status });
    return true;
  } catch (error) {
    logger.error('0G connection test failed', { error: error.message });
    return false;
  }
}
```

**Step 6: Update Analysis Service**
```bash
# Backup current file
cp /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/services/analysisService.ts \
   /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/services/analysisService.ts.backup

# Edit file
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/services/analysisService.ts

# Replace with new implementation (see File 1 above)
# Save
```

**Step 7: Update Risk Analysis Utils**
```bash
# Backup
cp /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/utils/riskAnalysis.ts \
   /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/utils/riskAnalysis.ts.backup

# Edit
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/utils/riskAnalysis.ts

# Replace simulateOGVerification with performRealOGVerification
# Keep old function as fallback
# Save
```

**Step 8: Update Controller**
```bash
# Edit controller
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/controllers/analysisController.ts

# Update line 56 to call performRealOGVerification
# Update imports
# Save
```

**Step 9: Update Types**
```bash
# Edit types
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/types/index.ts

# Add new optional fields to OGVerification interface:
# - transactionHash?: string
# - attestationProof?: string
# - storageProof?: string
# - error?: string

# Save
```

---

#### **PHASE 3: Testing (1 hour)**

**Step 10: Test 0G Connection**
```bash
# Create test script
cat > /Users/kiran/Desktop/0G_trustlayer/0g_backend/test-og.js << 'EOF'
require('dotenv').config();
const { initializeOGClient, testOGConnection } = require('./dist/services/ogService');

async function test() {
  console.log('Testing 0G connection...');
  const connected = await testOGConnection();
  if (connected) {
    console.log('✅ 0G connection successful!');
  } else {
    console.log('❌ 0G connection failed!');
    process.exit(1);
  }
}

test();
EOF

# Build TypeScript
npm run build

# Run test
node test-og.js
```

**Step 11: Test Analysis with 0G**
```bash
# Start server
npm run dev

# In another terminal, test analysis
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "network": "ethereum"
  }'

# Check logs for:
# - "Sending contract to 0G Compute"
# - "Received analysis from 0G Compute"
# - "Storing analysis on 0G Storage"
# - "Verifying TEE attestation"
# - Real storageId (not random string)
# - Real cost values
```

**Step 12: Verify TEE Attestation**
```bash
# Check response includes:
# - teeVerified: true (from real verification, not hardcoded)
# - storageId: "0g_..." (real ID from storage network)
# - transactionHash: "0x..." (transaction hash from 0G)
# - attestationProof: present
# - cost: actual cost from 0G pricing

# If teeVerified is false, check logs for error
```

---

#### **PHASE 4: Error Handling (30 minutes)**

**Step 13: Add Error Recovery**
```typescript
// In analysisService.ts, wrap 0G calls with try-catch
try {
  const result = await client.compute.analyze(...);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    throw new Error('Insufficient 0G tokens for analysis');
  } else if (error.code === 'TIMEOUT') {
    throw new Error('0G Compute request timed out');
  } else if (error.code === 'UNAUTHORIZED') {
    throw new Error('Invalid 0G API key');
  }
  // Fallback or rethrow
  if (config.og.fallbackEnabled) {
    return performMockAnalysis(code);
  }
  throw error;
}
```

**Step 14: Add Health Check for 0G**
```bash
# Edit index.ts
nano /Users/kiran/Desktop/0G_trustlayer/0g_backend/src/index.ts

# Update health endpoint
```

```typescript
app.get('/health', async (req: Request, res: Response) => {
  const cacheStats = cache.getStats();
  
  // Check 0G status
  let ogStatus = 'unknown';
  try {
    const ogConnected = await testOGConnection();
    ogStatus = ogConnected ? 'connected' : 'disconnected';
  } catch (error) {
    ogStatus = 'error';
  }
  
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      uptime: process.uptime(),
      cache: cacheStats,
      og: {
        status: ogStatus,
        endpoint: config.og.computeEndpoint,
        network: config.og.network,
      },
    },
  });
});
```

---

#### **PHASE 5: Deployment Preparation (30 minutes)**

**Step 15: Update Documentation**
```bash
# Update PROJECT_STATUS.md with real integration status
# Update DOCUMENTATION.md with 0G setup instructions
# Create CHANGELOG.md
```

**Step 16: Add Environment Validation**
```bash
# Create env validation script
cat > /Users/kiran/Desktop/0G_trustlayer/0g_backend/validate-env.js << 'EOF'
require('dotenv').config();

const required = [
  'OG_API_KEY',
  'OG_PRIVATE_KEY',
  'OG_WALLET_ADDRESS',
  'OG_COMPUTE_ENDPOINT',
];

const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.error(`   - ${key}`));
  process.exit(1);
}

console.log('✅ All required environment variables present');
EOF

# Run before starting server
node validate-env.js && npm run dev
```

**Step 17: Update package.json Scripts**
```json
{
  "scripts": {
    "dev": "node validate-env.js && nodemon --watch src --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node validate-env.js && node dist/index.js",
    "test": "jest",
    "test:og": "node test-og.js",
    "validate:env": "node validate-env.js"
  }
}
```

---

## SECTION F: TESTING CHECKLIST

### **Pre-Integration Tests**

- [x] Backend compiles without TypeScript errors
- [x] Frontend loads successfully
- [x] Mock analysis works with USDT contract
- [x] Cache system operational
- [x] Health endpoint returns 200

### **0G SDK Installation Tests**

- [ ] 0G SDK package installed successfully
- [ ] No dependency conflicts
- [ ] TypeScript recognizes 0G types
- [ ] Can import `ZeroGClient`
- [ ] No build errors after installation

### **Configuration Tests**

- [ ] All environment variables loaded
- [ ] `OG_API_KEY` is valid (not empty)
- [ ] `OG_PRIVATE_KEY` is valid format
- [ ] `OG_WALLET_ADDRESS` matches private key
- [ ] Endpoints are reachable (curl test)
- [ ] Config validation passes
- [ ] Server starts without errors

### **Connection Tests**

- [ ] Can initialize 0G client
- [ ] `testOGConnection()` returns true
- [ ] Can query 0G network status
- [ ] API authentication successful
- [ ] Wallet has sufficient balance
- [ ] No rate limit errors

### **Compute Layer Tests**

- [ ] Can send contract code to 0G Compute
- [ ] Receives AI analysis response
- [ ] Response includes all 8 risk factors
- [ ] Risk scores are in 0-10 range
- [ ] TEE attestation included in response
- [ ] Transaction hash received
- [ ] Compute units calculated

### **Storage Layer Tests**

- [ ] Can store analysis on 0G Storage
- [ ] Receives real storage ID
- [ ] Storage proof returned
- [ ] Data can be retrieved from storage
- [ ] Encryption working (if enabled)
- [ ] Metadata stored correctly

### **TEE Verification Tests**

- [ ] TEE attestation can be verified
- [ ] `teeVerified` is boolean (not always true)
- [ ] Attestation proof is valid format
- [ ] Invalid attestations rejected
- [ ] Verification logs to console

### **Pricing Tests**

- [ ] Real-time pricing works
- [ ] Cost returned in correct currency
- [ ] Savings percentage calculated correctly
- [ ] Cost is non-zero
- [ ] Cloud cost comparison reasonable

### **End-to-End Tests**

- [ ] Full analysis flow works with real 0G
- [ ] USDT contract analyzed successfully
- [ ] DAI contract analyzed successfully
- [ ] Unknown contract analyzed
- [ ] Invalid address handled gracefully
- [ ] Network errors handled
- [ ] Results cached properly

### **Error Handling Tests**

- [ ] Invalid API key triggers error
- [ ] Insufficient funds detected
- [ ] Timeout errors handled
- [ ] Network errors logged
- [ ] Fallback to mock works (if enabled)
- [ ] Error messages are clear

### **Performance Tests**

- [ ] Analysis completes in <60 seconds
- [ ] No memory leaks
- [ ] Concurrent requests handled
- [ ] Rate limiting respected
- [ ] Cache reduces duplicate 0G calls

### **Security Tests**

- [ ] Private keys not logged
- [ ] API keys not exposed in errors
- [ ] Sensitive data encrypted
- [ ] CORS working
- [ ] Rate limiting preventing abuse

---

## SECTION G: RISK ASSESSMENT

### **🔴 BLOCKER Issues (Must Fix Before Launch)**

1. **0G SDK Package Name Unknown**
   - **Impact**: Cannot install SDK
   - **Risk**: Project cannot proceed
   - **Mitigation**: Get exact package name from 0G documentation
   - **Priority**: P0 - CRITICAL

2. **No 0G API Credentials**
   - **Impact**: Cannot authenticate with 0G
   - **Risk**: All 0G calls will fail
   - **Mitigation**: Obtain API key and wallet credentials
   - **Priority**: P0 - CRITICAL

3. **0G SDK API Documentation Missing**
   - **Impact**: Don't know exact method signatures
   - **Risk**: Code won't work without correct API calls
   - **Mitigation**: Review 0G SDK documentation thoroughly
   - **Priority**: P0 - CRITICAL

4. **Insufficient 0G Tokens**
   - **Impact**: Cannot pay for compute/storage
   - **Risk**: Transactions will fail
   - **Mitigation**: Fund wallet with testnet tokens
   - **Priority**: P0 - CRITICAL

---

### **🟠 HIGH Priority Issues**

5. **Error Handling Incomplete**
   - **Impact**: Crashes on 0G failures
   - **Risk**: Service downtime
   - **Mitigation**: Add comprehensive try-catch blocks
   - **Priority**: P1 - HIGH

6. **No Fallback Strategy Defined**
   - **Impact**: Total failure if 0G down
   - **Risk**: Service unavailability
   - **Mitigation**: Implement mock fallback or queue system
   - **Priority**: P1 - HIGH

7. **TEE Verification Not Tested**
   - **Impact**: May accept invalid attestations
   - **Risk**: Security vulnerability
   - **Mitigation**: Test with known good/bad attestations
   - **Priority**: P1 - HIGH

8. **Cost Calculation May Be Wrong**
   - **Impact**: Incorrect cost reporting
   - **Risk**: User confusion
   - **Mitigation**: Verify pricing API returns correct format
   - **Priority**: P1 - HIGH

---

### **🟡 MEDIUM Priority Issues**

9. **No Rate Limiting on 0G Side**
   - **Impact**: May hit 0G rate limits
   - **Risk**: Temporary service degradation
   - **Mitigation**: Add rate limiting awareness
   - **Priority**: P2 - MEDIUM

10. **Storage Retrieval Not Implemented**
    - **Impact**: Cannot retrieve stored analyses
    - **Risk**: Feature incomplete
    - **Mitigation**: Add retrieval endpoint
    - **Priority**: P2 - MEDIUM

11. **No Monitoring/Alerting**
    - **Impact**: Won't know if 0G fails
    - **Risk**: Silent failures
    - **Mitigation**: Add health checks and alerts
    - **Priority**: P2 - MEDIUM

12. **Prompt Engineering Not Optimized**
    - **Impact**: AI analysis may be suboptimal
    - **Risk**: Inaccurate risk scores
    - **Mitigation**: Test and iterate on prompts
    - **Priority**: P2 - MEDIUM

---

### **🟢 NICE TO HAVE Issues**

13. **No Batch Analysis Support**
    - **Impact**: One contract at a time
    - **Risk**: Slower for power users
    - **Mitigation**: Add batch endpoint later
    - **Priority**: P3 - LOW

14. **Cache TTL Not Configurable**
    - **Impact**: Fixed 1-hour cache
    - **Risk**: Minor UX issue
    - **Mitigation**: Make configurable
    - **Priority**: P3 - LOW

15. **No Historical Data from 0G**
    - **Impact**: `historicalRisk` still mocked
    - **Risk**: Less accurate analysis
    - **Mitigation**: Add historical data API
    - **Priority**: P3 - LOW

16. **No Webhook Support**
    - **Impact**: Async results not supported
    - **Risk**: Long waits for users
    - **Mitigation**: Add webhook option
    - **Priority**: P3 - LOW

---

## SECTION H: ESTIMATED EFFORT

### **Task Breakdown with Time Estimates**

| Task | Estimated Time | Complexity | Dependencies |
|------|----------------|------------|--------------|
| **Research 0G SDK documentation** | 1 hour | Medium | None |
| **Get 0G API credentials** | 30 minutes | Low | 0G account |
| **Fund wallet with testnet tokens** | 15 minutes | Low | Wallet setup |
| **Install 0G SDK** | 5 minutes | Low | Package name |
| **Update config file** | 15 minutes | Low | Env vars |
| **Create ogService.ts** | 30 minutes | Medium | SDK installed |
| **Update analysisService.ts** | 2 hours | High | SDK + Config |
| **Update riskAnalysis.ts** | 1 hour | Medium | SDK + Config |
| **Update controllers** | 30 minutes | Low | Service changes |
| **Update types** | 15 minutes | Low | 0G response format |
| **Test 0G connection** | 30 minutes | Medium | Everything above |
| **Test contract analysis** | 1 hour | High | Connection works |
| **Test TEE verification** | 45 minutes | Medium | Analysis works |
| **Test storage** | 45 minutes | Medium | Analysis works |
| **Add error handling** | 1 hour | Medium | Basic integration done |
| **Add health checks** | 30 minutes | Low | Basic integration done |
| **Write tests** | 2 hours | High | Everything working |
| **Documentation updates** | 1 hour | Low | Everything done |
| **Deployment preparation** | 1 hour | Medium | Tests passing |

---

### **TOTAL ESTIMATED TIME**

| Phase | Optimistic | Realistic | Pessimistic |
|-------|-----------|-----------|-------------|
| Research & Setup | 1.5 hours | 2 hours | 4 hours |
| Core Integration | 4 hours | 6 hours | 10 hours |
| Testing | 2 hours | 4 hours | 8 hours |
| Error Handling | 1 hour | 2 hours | 4 hours |
| Documentation | 1 hour | 1.5 hours | 2 hours |
| **TOTAL** | **9.5 hours** | **15.5 hours** | **28 hours** |

**Recommended Timeline**: Plan for **2-3 working days** (assuming 6-8 hours/day)

---

## FINAL DELIVERABLES

### **📋 PRIORITY 1 CHECKLIST** (Must-Do - 6 hours)

```
CRITICAL PATH TO BASIC 0G INTEGRATION:

[ ] 1. Get 0G SDK package name from documentation
[ ] 2. Obtain 0G API key from https://app.0g.ai
[ ] 3. Get/create wallet with private key for 0G network
[ ] 4. Fund wallet with testnet tokens
[ ] 5. Install 0G SDK: npm install @0gfoundation/0g-cc
[ ] 6. Add environment variables to .env
[ ] 7. Update config/index.ts with 0G config
[ ] 8. Create services/ogService.ts with client initialization
[ ] 9. Replace analysisService.ts with 0G Compute integration
[ ] 10. Replace simulateOGVerification with real verification
[ ] 11. Update controller to call real verification
[ ] 12. Test connection: node test-og.js
[ ] 13. Test one contract analysis end-to-end
[ ] 14. Verify TEE attestation is real (not hardcoded true)
[ ] 15. Verify storage ID is real (not random string)

SUCCESS CRITERIA:
✅ Backend starts without errors
✅ Health check shows og.status = 'connected'
✅ Can analyze USDT contract
✅ Response includes real storageId from 0G
✅ teeVerified is based on actual verification
✅ Logs show "Sending contract to 0G Compute"
✅ Logs show "Received analysis from 0G Compute"
```

---

### **📋 PRIORITY 2 CHECKLIST** (Should-Do - 4 hours)

```
PRODUCTION READINESS:

[ ] 16. Add comprehensive error handling for all 0G calls
[ ] 17. Implement fallback to mock if 0G unavailable
[ ] 18. Add retry logic for transient failures
[ ] 19. Validate all 0G responses before using
[ ] 20. Add timeout handling (60s max)
[ ] 21. Update health endpoint with 0G status
[ ] 22. Add monitoring for 0G failures
[ ] 23. Test with invalid API key (should fail gracefully)
[ ] 24. Test with insufficient funds (should show clear error)
[ ] 25. Test with network timeout (should handle)
[ ] 26. Test with malformed contract (should handle)
[ ] 27. Add logging for all 0G interactions
[ ] 28. Update PROJECT_STATUS.md to reflect real integration
[ ] 29. Update DOCUMENTATION.md with 0G setup guide
[ ] 30. Create troubleshooting guide

SUCCESS CRITERIA:
✅ Service stays up even if 0G fails
✅ Error messages are user-friendly
✅ All edge cases handled
✅ Logs provide debugging info
✅ Documentation complete
```

---

### **📋 PRIORITY 3 CHECKLIST** (Nice-to-Have - 5 hours)

```
ENHANCEMENTS:

[ ] 31. Add storage retrieval endpoint
[ ] 32. Implement batch analysis
[ ] 33. Add webhook support for async results
[ ] 34. Make cache TTL configurable
[ ] 35. Add historical data integration
[ ] 36. Optimize AI prompts for better accuracy
[ ] 37. Add rate limiting awareness for 0G
[ ] 38. Implement request queuing
[ ] 39. Add analytics dashboard for 0G usage
[ ] 40. Create admin panel for monitoring
[ ] 41. Add unit tests
[ ] 42. Add integration tests
[ ] 43. Add E2E tests
[ ] 44. Performance optimization
[ ] 45. Cost optimization

SUCCESS CRITERIA:
✅ Advanced features working
✅ Test coverage >80%
✅ Performance benchmarks met
✅ Cost per analysis optimized
```

---

### **⚡ QUICK START COMMAND LIST**

```bash
# ============================================
# PHASE 1: SETUP (15 minutes)
# ============================================

# Step 1: Navigate to backend
cd /Users/kiran/Desktop/0G_trustlayer/0g_backend

# Step 2: Install 0G SDK (CONFIRM PACKAGE NAME FIRST!)
npm install @0gfoundation/0g-cc
# If that fails, try:
# npm install @0g/sdk
# OR check 0G documentation for correct package

# Step 3: Backup .env
cp .env .env.backup

# Step 4: Edit .env and add 0G credentials
nano .env
# Add:
# OG_API_KEY=your_key_here
# OG_PRIVATE_KEY=your_private_key
# OG_WALLET_ADDRESS=0x...
# (Save: Ctrl+O, Exit: Ctrl+X)

# Step 5: Validate environment
cat > validate-env.js << 'EOF'
require('dotenv').config();
const required = ['OG_API_KEY', 'OG_PRIVATE_KEY'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing:', missing);
  process.exit(1);
}
console.log('✅ Environment OK');
EOF
node validate-env.js

# ============================================
# PHASE 2: CODE UPDATES (2 hours)
# ============================================

# Step 6: Backup current files
cp src/services/analysisService.ts src/services/analysisService.ts.backup
cp src/utils/riskAnalysis.ts src/utils/riskAnalysis.ts.backup
cp src/config/index.ts src/config/index.ts.backup

# Step 7: Create new 0G service
touch src/services/ogService.ts
# (Copy content from SECTION D - File "ogService.ts")

# Step 8: Update config
nano src/config/index.ts
# (Add 0G config from SECTION D - File 3)

# Step 9: Update analysis service
nano src/services/analysisService.ts
# (Replace with code from SECTION D - File 1)

# Step 10: Update risk analysis utils
nano src/utils/riskAnalysis.ts
# (Replace simulateOGVerification from SECTION D - File 2)

# Step 11: Update controller
nano src/controllers/analysisController.ts
# (Update imports and verification call from SECTION D - File 4)

# Step 12: Update types
nano src/types/index.ts
# (Add optional fields to OGVerification interface)

# ============================================
# PHASE 3: TESTING (1 hour)
# ============================================

# Step 13: Create test script
cat > test-og.js << 'EOF'
require('dotenv').config();
const { initializeOGClient, testOGConnection } = require('./dist/services/ogService');
async function test() {
  console.log('Testing 0G...');
  const ok = await testOGConnection();
  console.log(ok ? '✅ Connected' : '❌ Failed');
  process.exit(ok ? 0 : 1);
}
test();
EOF

# Step 14: Build TypeScript
npm run build

# Step 15: Test 0G connection
node test-og.js
# Should output: "✅ Connected"

# Step 16: Start development server
npm run dev
# Should start without errors
# Look for: "✅ 0G Client initialized successfully"

# Step 17: Test health endpoint (in new terminal)
curl http://localhost:4000/health | jq '.data.og'
# Should show: "status": "connected"

# Step 18: Test contract analysis
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"0xdAC17F958D2ee523a2206206994597C13D831ec7","network":"ethereum"}' \
  | jq '.data.ogVerification'

# Step 19: Verify response has REAL data:
# - storageId should NOT contain "Math.random"
# - teeVerified should be actual boolean from verification
# - Should include transactionHash
# - Should include attestationProof
# - cost should be non-zero

# ============================================
# PHASE 4: VERIFICATION (30 minutes)
# ============================================

# Step 20: Check backend logs
# Should see:
# - "Sending contract to 0G Compute"
# - "Received analysis from 0G Compute"
# - "Storing analysis on 0G Storage"
# - "Verifying TEE attestation"
# - "0G verification complete"

# Step 21: Test error handling
# (Temporarily set wrong API key)
OG_API_KEY=invalid npm run dev
# Should fail with clear error message

# Step 22: Test fallback (if enabled)
OG_FALLBACK_ENABLED=true npm run dev
# Should fall back to mock if 0G fails

# Step 23: Monitor 0G usage
# Check 0G dashboard for:
# - Transaction history
# - Token usage
# - Storage usage

# ============================================
# SUCCESS INDICATORS
# ============================================

# ✅ "npm run build" completes without errors
# ✅ "node test-og.js" returns success
# ✅ "npm run dev" starts without errors
# ✅ Health endpoint shows og.status = 'connected'
# ✅ Analysis returns real storageId (not random)
# ✅ Logs show 0G Compute and Storage interactions
# ✅ TEE verification is real (not hardcoded)
# ✅ Cost calculation is dynamic (not static 0.002)

# ============================================
# IF SOMETHING FAILS
# ============================================

# 1. Check logs: tail -f logs/combined.log
# 2. Verify env vars: node -e "require('dotenv').config(); console.log(process.env.OG_API_KEY)"
# 3. Check 0G status: curl https://compute.0g.ai/health
# 4. Verify wallet balance: node check-balance.js
# 5. Review 0G docs: https://docs.0g.ai
# 6. Enable debug mode: OG_DEBUG_MODE=true npm run dev
# 7. Test with mock: OG_FALLBACK_ENABLED=true npm run dev

# ============================================
# ROLLBACK (IF NEEDED)
# ============================================

# Restore backups:
cp src/services/analysisService.ts.backup src/services/analysisService.ts
cp src/utils/riskAnalysis.ts.backup src/utils/riskAnalysis.ts
cp src/config/index.ts.backup src/config/index.ts
cp .env.backup .env

# Remove 0G SDK:
npm uninstall @0gfoundation/0g-cc

# Restart:
npm run dev
```

---

## 🚨 MISSING INFORMATION REQUEST

### **CRITICAL INFORMATION NEEDED FROM YOU:**

#### **1. 0G SDK Package Details** ⚠️ BLOCKER

**Question**: What is the exact npm package name for the 0G SDK?

**Options I've Seen**:
- `@0gfoundation/0g-cc`
- `@0g/sdk`
- `0g-chain`
- Something else?

**Need**:
- Exact package name
- Latest version number
- npm registry link
- Installation command

**Where to Find**:
- 0G developer documentation
- 0G GitHub repository
- npm search: https://www.npmjs.com/search?q=0g

---

#### **2. 0G API Credentials** ⚠️ BLOCKER

**Question**: Where do I get 0G API credentials?

**Need**:
- API key
- Private key / wallet
- Wallet address

**Where to Get**:
- 0G dashboard URL: `https://app.0g.ai`? (confirm)
- Sign-up process
- How to generate API key
- Testnet vs mainnet credentials

---

#### **3. 0G Network Configuration** ⚠️ BLOCKER

**Questions**:
- What is the testnet chain ID? (I assumed 16600)
- What is the testnet RPC URL?
- What is the mainnet chain ID?
- What is the compute endpoint URL?
- What is the storage endpoint URL?
- What is the TEE endpoint URL?

**Example**:
```bash
OG_CHAIN_ID=16600                           # Testnet
OG_RPC_URL=https://rpc-testnet.0g.ai        # Testnet RPC
OG_COMPUTE_ENDPOINT=https://compute.0g.ai   # Compute API
OG_STORAGE_ENDPOINT=https://storage.0g.ai   # Storage API
OG_TEE_ENDPOINT=https://tee.0g.ai           # TEE verification
```

**Where to Find**: 0G network documentation

---

#### **4. 0G SDK API Methods** ⚠️ BLOCKER

**Question**: What are the exact method signatures for:

**Compute API**:
```typescript
// Is it like this?
await client.compute.analyze({
  contractCode: string,
  prompt: string,
  model: string,
  teeVerified: boolean,
});

// Or different?
```

**Storage API**:
```typescript
// Is it like this?
await client.storage.store({
  data: string | Buffer,
  encrypt: boolean,
  metadata: object,
});

// Or different?
```

**TEE Verification**:
```typescript
// Is it like this?
await client.tee.verify({
  transactionHash: string,
  attestation: string,
});

// Or different?
```

**Where to Find**: 0G SDK documentation / TypeScript types

---

#### **5. Wallet Funding** 🔶 HIGH PRIORITY

**Questions**:
- How do I get testnet tokens?
- Is there a faucet?
- How much do I need for testing?
- What token is used for gas? (0G token?)

**Need**:
- Faucet URL
- Minimum balance required
- Token decimals

---

#### **6. 0G SDK Initialization** 🔶 HIGH PRIORITY

**Question**: What parameters does `ZeroGClient` constructor accept?

**Example**:
```typescript
const client = new ZeroGClient({
  apiKey: string,
  privateKey: string,
  // What else?
  rpcUrl?: string,
  chainId?: number,
  computeEndpoint?: string,
  storageEndpoint?: string,
  teeEndpoint?: string,
  // More?
});
```

**Where to Find**: 0G SDK documentation

---

#### **7. Response Formats** 🟡 MEDIUM PRIORITY

**Question**: What do 0G API responses look like?

**Compute Response**:
```typescript
{
  success: boolean;
  analysis: {
    rugPullRisk: number;
    smartContractRisk: number;
    // ... other risks
  };
  txHash: string;
  attestation: string;
  computeUnits: number;
  // What else?
}
```

**Storage Response**:
```typescript
{
  success: boolean;
  storageId: string;
  proof: string;
  // What else?
}
```

**TEE Verification Response**:
```typescript
{
  valid: boolean;
  proof: string;
  reason?: string;
  // What else?
}
```

---

#### **8. Error Codes** 🟡 MEDIUM PRIORITY

**Question**: What error codes can 0G API return?

**Examples**:
- `INSUFFICIENT_FUNDS`
- `UNAUTHORIZED`
- `TIMEOUT`
- `RATE_LIMIT_EXCEEDED`
- Others?

---

#### **9. Rate Limits** 🟡 MEDIUM PRIORITY

**Questions**:
- What are the rate limits for 0G Compute?
- What are the rate limits for 0G Storage?
- Are they per API key or per wallet?
- What happens when exceeded?

---

#### **10. Cost Structure** 🟡 MEDIUM PRIORITY

**Questions**:
- How much does one contract analysis cost?
- Is it per byte, per compute unit, or flat fee?
- How is cost calculated?
- Is there a pricing API?

---

### **📄 DOCUMENTATION LINKS NEEDED:**

Please provide links to:

1. **0G SDK Documentation**: Installation, API reference, examples
2. **0G Network Documentation**: Chain IDs, RPCs, endpoints
3. **0G Getting Started Guide**: Account creation, API keys
4. **0G Testnet Faucet**: To get test tokens
5. **0G SDK GitHub**: Source code, issues, examples
6. **0G Discord/Telegram**: For support
7. **0G Dashboard**: To manage API keys and view usage

---

### **✅ ONCE YOU PROVIDE THE ABOVE:**

I can:
1. ✅ Update all code with correct imports and method calls
2. ✅ Provide exact installation commands
3. ✅ Write accurate test scripts
4. ✅ Create proper error handling
5. ✅ Implement real 0G integration
6. ✅ Test end-to-end flow
7. ✅ Deploy to production

---

## 📊 SUMMARY

**Current State**:
- ✅ Complete infrastructure built and working
- ✅ All endpoints operational with mock data
- ✅ Frontend-backend integration tested
- ⚠️ 0% real 0G integration

**Blockers**:
1. 0G SDK package name unknown
2. 0G API credentials not provided
3. 0G API method signatures unknown
4. 0G network configuration unclear

**Next Steps**:
1. You provide the missing information above
2. I implement 0G integration using correct API calls
3. We test with real 0G Compute and Storage
4. We verify TEE attestation works
5. We deploy to production

**Estimated Time After Info Provided**: 1-2 days

---

**Ready to proceed once you provide:**
1. ✅ 0G SDK package name
2. ✅ 0G API credentials
3. ✅ 0G documentation links
4. ✅ Network configuration
5. ✅ API method signatures

