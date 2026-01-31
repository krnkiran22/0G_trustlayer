# SafeGuard AI - Complete Project Documentation

## 📋 Project Overview

**SafeGuard AI** is a decentralized DeFi risk analysis platform that helps users identify security risks, rug pulls, and vulnerabilities in smart contracts. Built on 0G Network's decentralized AI infrastructure, it provides comprehensive risk analysis at 96% lower cost than traditional cloud solutions.

---

## 🏗️ Architecture

### System Components

```
┌─────────────────┐
│   Frontend      │ Next.js 14 + TypeScript + Tailwind
│  (Port 3000)    │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│   Backend       │ Node.js + Express + TypeScript
│  (Port 4000)    │
└────────┬────────┘
         │
         ├─────────► Blockchain RPC (ethers.js)
         │
         ├─────────► 0G Network (TEE + Storage)
         │
         └─────────► Cache (node-cache)
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom (shadcn/ui inspired)
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Blockchain**: ethers.js v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Notifications**: React Hot Toast

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Language**: TypeScript 5+
- **Blockchain**: ethers.js v6
- **Security**: Helmet.js
- **Rate Limiting**: express-rate-limit
- **Logging**: Winston
- **Caching**: node-cache
- **Compression**: compression

---

## 📁 Project Structure

```
0G_trustlayer/
├── 0g_frontend/                    # Frontend application
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx               # Home page
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles
│   │   ├── analyze/               # Analysis page
│   │   │   └── page.tsx
│   │   ├── results/[address]/     # Dynamic results page
│   │   │   └── page.tsx
│   │   ├── dashboard/             # Dashboard page
│   │   │   └── page.tsx
│   │   └── about/                 # About page
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── ui/                    # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── alert.tsx
│   │   └── features/              # Feature components
│   │       ├── AddressInput.tsx
│   │       ├── NetworkSelector.tsx
│   │       ├── RiskGauge.tsx
│   │       ├── RiskFactorCard.tsx
│   │       ├── WarningsList.tsx
│   │       ├── VerificationProof.tsx
│   │       ├── AnalysisCard.tsx
│   │       ├── StatsCounter.tsx
│   │       └── LoadingAnalysis.tsx
│   ├── lib/                       # Utility libraries
│   │   ├── api.ts                # API client functions
│   │   ├── blockchain.ts         # Blockchain utilities
│   │   ├── utils.ts              # Helper functions
│   │   └── mockData.ts           # Mock data for development
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── public/                    # Static assets
│   ├── .env.local                # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── 0g_backend/                     # Backend API
│   ├── src/
│   │   ├── index.ts              # Entry point
│   │   ├── config/
│   │   │   └── index.ts          # Configuration
│   │   ├── controllers/
│   │   │   └── analysisController.ts
│   │   ├── services/
│   │   │   └── analysisService.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   ├── validators.ts
│   │   │   └── requestLogger.ts
│   │   ├── utils/
│   │   │   ├── blockchain.ts
│   │   │   ├── riskAnalysis.ts
│   │   │   ├── logger.ts
│   │   │   ├── errors.ts
│   │   │   ├── validators.ts
│   │   │   └── cache.ts
│   │   └── types/
│   │       └── index.ts
│   ├── dist/                      # Compiled JavaScript
│   ├── logs/                      # Log files (production)
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                       # Main documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Installation Steps

#### 1. Clone Repository
```bash
git clone <repository-url>
cd 0G_trustlayer
```

#### 2. Frontend Setup
```bash
cd 0g_frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your configuration
npm run dev
```

Frontend will be available at `http://localhost:3000`

#### 3. Backend Setup
```bash
cd 0g_backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Backend API will be available at `http://localhost:4000`

### Environment Variables

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_ETHEREUM_RPC=https://eth.llamarpc.com
NEXT_PUBLIC_BSC_RPC=https://bsc-dataseed.binance.org
NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com
```

#### Backend (`.env`)
```env
# Server Configuration
NODE_ENV=development
PORT=4000

# Blockchain RPC URLs
ETHEREUM_RPC=https://eth.llamarpc.com
BSC_RPC=https://bsc-dataseed.binance.org
POLYGON_RPC=https://polygon-rpc.com

# 0G Network Configuration
OG_STORAGE_ENDPOINT=https://storage.0g.ai
OG_TEE_ENDPOINT=https://tee.0g.ai

# Optional: API Keys for explorers
ETHERSCAN_API_KEY=
BSCSCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### 1. Analyze Contract
Analyze a smart contract for security risks.

**Endpoint**: `POST /api/analyze`

**Rate Limit**: 10 requests per hour per IP

**Request Body**:
```json
{
  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "network": "ethereum"
}
```

**Response** (Success):
```json
{
  "success": true,
  "data": {
    "id": "analysis_1738334567_abc123",
    "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "network": "ethereum",
    "tokenInfo": {
      "name": "Tether USD",
      "symbol": "USDT",
      "totalSupply": "95000000000000000",
      "decimals": 6
    },
    "overallRisk": 2.1,
    "riskLevel": "LOW",
    "factors": {
      "rugPullRisk": 1,
      "smartContractRisk": 2,
      "centralizationRisk": 3,
      "liquidityRisk": 1,
      "tokenEconomicsRisk": 2,
      "codeQualityRisk": 3,
      "credibilityRisk": 2,
      "historicalRisk": 1
    },
    "warnings": [
      "Centralized control (expected for stablecoin)"
    ],
    "recommendation": "LOW RISK - This contract appears to be relatively safe...",
    "ogVerification": {
      "teeVerified": true,
      "storageId": "0g_1738334567_abc123",
      "analysisTimestamp": "2026-01-31T10:30:00Z",
      "cost": 0.002,
      "cloudCost": 0.05,
      "savingsPercentage": 96
    },
    "timestamp": "2026-01-31T10:30:00Z"
  },
  "cached": false,
  "timestamp": "2026-01-31T10:30:00Z"
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": {
    "message": "Invalid address format",
    "code": "VALIDATION_ERROR"
  },
  "timestamp": "2026-01-31T10:30:00Z"
}
```

#### 2. Get Analysis History
Retrieve recent analyses.

**Endpoint**: `GET /api/history?limit=10`

**Query Parameters**:
- `limit` (optional): Number of results (1-100, default: 10)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "analysis_1738334567_abc123",
      "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "network": "ethereum",
      "riskLevel": "LOW",
      "overallRisk": 2.1,
      "timestamp": "2026-01-31T10:30:00Z"
    }
  ],
  "total": 15,
  "timestamp": "2026-01-31T10:30:00Z"
}
```

#### 3. Get Analysis by ID
Retrieve a specific analysis by its ID.

**Endpoint**: `GET /api/analysis/:id`

**Response**: Same as analyze endpoint

#### 4. Get Analysis by Address
Retrieve cached analysis for a specific contract address.

**Endpoint**: `GET /api/analysis/address/:address?network=ethereum`

**Query Parameters**:
- `network` (required): blockchain network

**Response**: Same as analyze endpoint or 404 if not cached

#### 5. Get Platform Statistics
Get aggregated platform statistics.

**Endpoint**: `GET /api/stats`

**Rate Limit**: 30 requests per minute

**Response**:
```json
{
  "success": true,
  "data": {
    "totalAnalyses": 15249,
    "scamsDetected": 895,
    "totalSavings": 732.75,
    "avgRiskScore": 5.2,
    "cache": {
      "keys": 42,
      "hits": 156,
      "misses": 89,
      "ksize": 42000,
      "vsize": 450000
    }
  },
  "timestamp": "2026-01-31T10:30:00Z"
}
```

#### 6. Health Check
Check API health and status.

**Endpoint**: `GET /health`

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-01-31T10:30:00Z",
    "environment": "development",
    "uptime": 12345.67,
    "cache": {
      "keys": 42,
      "hits": 156,
      "misses": 89
    }
  }
}
```

---

## 🎯 Features

### Risk Analysis
The system analyzes 8 key risk factors:

1. **Rug Pull Risk** (0-10)
   - Owner/admin privileges
   - Mint/burn capabilities
   - Ownership renouncement
   - Hidden backdoors

2. **Smart Contract Risk** (0-10)
   - Code vulnerabilities
   - Reentrancy issues
   - Integer overflow/underflow
   - Access control problems

3. **Centralization Risk** (0-10)
   - Single owner control
   - Multi-sig requirements
   - Governance structure

4. **Liquidity Risk** (0-10)
   - Pool depth
   - Liquidity locks
   - Withdrawal patterns

5. **Token Economics Risk** (0-10)
   - Supply distribution
   - Holder concentration
   - Inflation mechanics

6. **Code Quality Risk** (0-10)
   - Verification status
   - Code complexity
   - Development activity

7. **Credibility Risk** (0-10)
   - Team transparency
   - Project age
   - Community size

8. **Historical Risk** (0-10)
   - Past incidents
   - Behavior patterns

### Risk Levels
- **LOW RISK**: Overall score 0-3.5
- **MEDIUM RISK**: Overall score 3.6-6.5
- **HIGH RISK**: Overall score 6.6-10

### 0G Network Integration
- **TEE Verification**: All analyses verified in Trusted Execution Environments
- **Decentralized Storage**: Results stored on 0G's censorship-resistant network
- **Cost Optimization**: 96% cost reduction vs traditional cloud

---

## 🔒 Security Features

### Backend Security
- **Helmet.js**: HTTP security headers
- **CORS**: Whitelist frontend domains
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: All inputs sanitized
- **Error Handling**: No sensitive data exposure
- **Logging**: All requests logged

### Rate Limits
- General API: 100 requests / 15 minutes
- Analysis: 10 requests / 1 hour
- Stats: 30 requests / 1 minute

---

## 📊 Performance

### Caching Strategy
- **In-Memory Cache**: node-cache with 1-hour TTL
- **Cache Key**: `{address}_{network}`
- **Benefits**: Reduced blockchain calls, faster responses

### Optimization
- **Compression**: Gzip responses
- **Parallel Processing**: Concurrent blockchain calls
- **Connection Pooling**: Reuse RPC connections

---

## 🧪 Testing

### Test Example Contracts

**Low Risk**:
- USDT: `0xdAC17F958D2ee523a2206206994597C13D831ec7` (Ethereum)
- DAI: `0x6B175474E89094C44Da98b954EedeAC495271d0F` (Ethereum)

**High Risk** (for testing):
- Use any unverified or suspicious contract

### Manual Testing Steps
1. Start backend: `cd 0g_backend && npm run dev`
2. Start frontend: `cd 0g_frontend && npm run dev`
3. Navigate to `http://localhost:3000/analyze`
4. Enter contract address and network
5. Click "Analyze Risk"
6. View results on results page

---

## 🚢 Deployment

### Frontend Deployment (Vercel)
```bash
cd 0g_frontend
vercel --prod
```

### Backend Deployment (Railway/Render)
```bash
cd 0g_backend
npm run build
# Deploy dist/ folder
```

### Production Environment Variables
Update `.env` files with production values:
- RPC URLs (use paid providers)
- CORS origins (your frontend domain)
- NODE_ENV=production

---

## 📝 Development Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm run start    # Start production server
npm run test     # Run tests (when implemented)
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Frontend can't connect to backend
- **Solution**: Check CORS settings in backend
- **Solution**: Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**Issue**: "Invalid address" error
- **Solution**: Ensure address is valid Ethereum format (0x + 40 hex chars)

**Issue**: Rate limit errors
- **Solution**: Wait for rate limit window to reset
- **Solution**: Use cached results

**Issue**: RPC errors
- **Solution**: Check RPC URL configuration
- **Solution**: Try alternative RPC provider

---

## 📖 Code Examples

### Frontend: Making API Call
```typescript
import { analyzeContract } from '@/lib/api';

const result = await analyzeContract(
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  'ethereum'
);
console.log(result);
```

### Backend: Adding New Endpoint
```typescript
// routes/index.ts
router.get('/new-endpoint', newEndpointHandler);

// controllers/analysisController.ts
export function newEndpointHandler(req: Request, res: Response) {
  res.json({
    success: true,
    data: { message: 'Hello World' },
    timestamp: new Date().toISOString(),
  });
}
```

---

## 🎨 UI Components

### Available Components
- `Button` - Various styles (primary, secondary, outline, ghost)
- `Card` - Container for content blocks
- `Input` - Text input with validation
- `Badge` - Risk level indicators
- `Progress` - Progress bars
- `Skeleton` - Loading states
- `Alert` - Notifications

### Example Usage
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Analyze Contract
</Button>
```

---

## 📈 Future Enhancements

### Planned Features
- [ ] User authentication
- [ ] Saved analyses dashboard
- [ ] Watchlist functionality
- [ ] Email alerts for monitored contracts
- [ ] PDF report generation
- [ ] More blockchain networks
- [ ] Advanced AI models
- [ ] Real-time updates

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🔗 Links

- **0G Network**: https://0g.ai
- **Documentation**: This file
- **GitHub**: [Repository URL]
- **Demo**: [Live Demo URL]

---

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [Your Email]

---

## ✅ Project Status

### Completed Features
✅ Frontend (Next.js 14 + TypeScript + Tailwind)
✅ Backend (Node.js + Express + TypeScript)
✅ Risk Analysis (8 factors)
✅ Multi-chain support (Ethereum, BSC, Polygon)
✅ Caching system
✅ Rate limiting
✅ Error handling
✅ Logging
✅ API documentation
✅ Security middleware
✅ Responsive design
✅ Loading states & animations

### Production Ready
- ✅ TypeScript strict mode
- ✅ Error boundaries
- ✅ Input validation
- ✅ Security headers
- ✅ Rate limiting
- ✅ Structured logging
- ✅ Environment configuration
- ✅ CORS setup

---

**Built with ❤️ using 0G Network - Decentralized AI Infrastructure**

Last Updated: January 31, 2026
