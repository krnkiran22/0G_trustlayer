# SafeGuard AI - DeFi Risk Analysis Platform

A decentralized DeFi risk analysis platform powered by 0G Network. Analyze smart contracts for security risks, rug pulls, and vulnerabilities with 96% cost savings compared to traditional cloud solutions.

## 🌟 Features

- **Comprehensive Risk Analysis**: 8-factor risk assessment including rug pull detection, smart contract vulnerabilities, and more
- **Multi-Chain Support**: Analyze contracts on Ethereum, BSC, and Polygon
- **TEE Verified**: All analyses run in Trusted Execution Environments for integrity
- **Cost Efficient**: 96% cost savings through 0G's decentralized infrastructure
- **Real-Time Results**: Instant analysis with beautiful visualizations
- **Historical Tracking**: Dashboard to track all your analyses

## 📁 Project Structure

```
0G_trustlayer/
├── 0g_frontend/         # Next.js 14 + TypeScript + Tailwind CSS
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── lib/           # Utilities and API functions
│   └── types/         # TypeScript type definitions
├── 0g_backend/         # Node.js + TypeScript + Express
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   ├── routes/       # API routes
│   │   ├── config/       # Configuration
│   │   └── types/        # TypeScript types
│   └── dist/            # Compiled JavaScript
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Frontend Setup

```bash
cd 0g_frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd 0g_backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:4000`

## 🔧 Configuration

### Frontend Environment Variables

Create `.env.local` in `0g_frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_ETHEREUM_RPC=your_ethereum_rpc_url
NEXT_PUBLIC_BSC_RPC=your_bsc_rpc_url
NEXT_PUBLIC_POLYGON_RPC=your_polygon_rpc_url
```

### Backend Environment Variables

Create `.env` in `0g_backend/`:

```env
NODE_ENV=development
PORT=4000
ETHEREUM_RPC=https://eth.llamarpc.com
BSC_RPC=https://bsc-dataseed.binance.org
POLYGON_RPC=https://polygon-rpc.com
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Blockchain**: ethers.js v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Blockchain**: ethers.js v6
- **CORS**: Enabled for frontend

## 📖 API Documentation

### Endpoints

#### POST `/api/analyze`
Analyze a smart contract for risks.

**Request Body:**
```json
{
  "address": "0x...",
  "network": "ethereum"
}
```

**Response:**
```json
{
  "id": "analysis_...",
  "contractAddress": "0x...",
  "network": "ethereum",
  "tokenInfo": { ... },
  "overallRisk": 7.5,
  "riskLevel": "HIGH",
  "factors": { ... },
  "warnings": [...],
  "recommendation": "...",
  "ogVerification": { ... },
  "timestamp": "2026-01-31T..."
}
```

#### GET `/api/history?limit=10`
Get analysis history.

#### GET `/api/analysis/:id`
Get specific analysis by ID.

#### GET `/api/analysis/address/:address?network=ethereum`
Get analysis by contract address.

#### GET `/api/stats`
Get platform statistics.

## 🎨 Features Breakdown

### Risk Factors Analyzed

1. **Rug Pull Risk**: Detects potential exit scam indicators
2. **Smart Contract Risk**: Identifies code vulnerabilities
3. **Centralization Risk**: Analyzes ownership structure
4. **Liquidity Risk**: Checks trading depth and locks
5. **Token Economics Risk**: Evaluates supply dynamics
6. **Code Quality Risk**: Assesses development standards
7. **Credibility Risk**: Verifies team and documentation
8. **Historical Risk**: Reviews past incidents

### 0G Network Integration

- **TEE Verification**: All analyses verified in Trusted Execution Environments
- **Decentralized Storage**: Results stored on 0G's censorship-resistant network
- **Cost Optimization**: 96% reduction vs traditional cloud infrastructure

## 🛠️ Development

### Run Frontend in Development
```bash
cd 0g_frontend
npm run dev
```

### Run Backend in Development
```bash
cd 0g_backend
npm run dev
```

### Build for Production

**Frontend:**
```bash
cd 0g_frontend
npm run build
npm start
```

**Backend:**
```bash
cd 0g_backend
npm run build
npm start
```

## 🧪 Testing

Test the application by:
1. Navigate to `http://localhost:3000/analyze`
2. Enter a contract address (try example contracts provided)
3. Select network (Ethereum, BSC, or Polygon)
4. Click "Analyze Risk"
5. View comprehensive risk analysis results

### Example Contracts for Testing

- **USDT**: `0xdAC17F958D2ee523a2206206994597C13D831ec7` (Ethereum - Low Risk)
- **DAI**: `0x6B175474E89094C44Da98b954EedeAC495271d0F` (Ethereum - Low Risk)

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- **0G Network**: [https://0g.ai](https://0g.ai)

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using 0G Network - Decentralized AI Infrastructure**

# SafeGuard AI

SafeGuard AI is a decentralized DeFi risk analysis platform that protects investors from rug pulls and scams using 0G's AI infrastructure. By leveraging 0G Compute for TEE-verified AI inference and 0G Storage for transparent audit trails, SafeGuard delivers real-time smart contract risk assessments at 96% lower cost than traditional cloud AI.

## 🔍 Key Features

- **AI-powered smart contract vulnerability scanning** using 0G DeepSeek V3
- **TEE-verified analysis** ensuring cryptographic proof of results
- **Decentralized storage** of risk scores on 0G Chain for transparency
- **Pattern matching** against known rug pulls and scam indicators
- **Real-time risk scoring** across multiple factors (contract security, token distribution, liquidity, team transparency)

## 💡 Why SafeGuard AI?

Traditional DeFi audits are expensive ($10K-$50K) and slow. SafeGuard AI democratizes security by providing instant, AI-powered risk analysis powered by 0G's decentralized infrastructure at a fraction of the cost.

## 🛠️ Built With

- `@0gfoundation/0g-cc` for decentralized AI inference & storage
- **0G Compute (DeepSeek V3)** for smart contract analysis
- **0G Storage** for permanent, verifiable audit records
- **TEE verification** for trusted execution
- **React + Tailwind** for responsive UI

## 🎯 Impact

Helps DeFi users make informed decisions, reduces fraud in the ecosystem, and showcases 0G's capabilities as the infrastructure layer for decentralized AI applications. This project demonstrates the full 0G stack: Compute, Storage, and TEE security.

## 💰 Business Model

Freemium with basic scans, premium real-time monitoring alerts, and future VIBEZ token integration for community-driven risk reporting.
