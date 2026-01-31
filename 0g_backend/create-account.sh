#!/bin/bash

# 0G Account Creation Script
# This creates an account on 0G Serving Ledger for AI inference

set -e

echo "🔧 Creating 0G Serving Ledger Account..."
echo ""

# Load environment variables
source .env

# Check if private key exists
if [ -z "$ZEROG_PRIVATE_KEY" ]; then
    echo "❌ Error: ZEROG_PRIVATE_KEY not found in .env"
    exit 1
fi

echo "📋 Configuration:"
echo "   Network: $ZEROG_NETWORK"
echo "   Private Key: ${ZEROG_PRIVATE_KEY:0:10}..."
echo ""

# Find the 0G CLI tool
CLI_PATH=$(find node_modules/@0gfoundation/0g-cc -name "cli.commonjs" -type d | head -1)

if [ -z "$CLI_PATH" ]; then
    echo "❌ Error: Could not find 0G CLI tool"
    exit 1
fi

echo "✅ Found CLI at: $CLI_PATH"
echo ""

# Run the add-account command
echo "🚀 Creating account with 5 A0GI initial deposit..."
echo ""

cd "$CLI_PATH"

# Execute the CLI command
node cli/ledger.js add-account \
    --network testnet \
    --private-key "$ZEROG_PRIVATE_KEY" \
    --amount 5

echo ""
echo "✅ Account creation complete!"
echo ""
echo "🔍 Verify your account:"
echo "   node cli/ledger.js get-ledger --network testnet --private-key $ZEROG_PRIVATE_KEY"
echo ""
echo "🚀 Now restart your server and try the analysis again!"
