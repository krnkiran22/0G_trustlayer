#!/bin/bash
# 0G Integration Verification Test Suite
# Run this to verify 100% real 0G integration

set -e

echo "🧪 0G INTEGRATION VERIFICATION TEST SUITE"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0
WARNINGS=0

# Navigate to backend
cd "$(dirname "$0")/0g_backend"

echo "📍 Working directory: $(pwd)"
echo ""

# Test 1: Check Installation
echo "Test 1: Verifying Installation..."
echo "-----------------------------------"

if npm list @0gfoundation/0g-cc 2>&1 | grep -q "@0gfoundation/0g-cc@"; then
    echo -e "${GREEN}✅ @0gfoundation/0g-cc is installed${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ @0gfoundation/0g-cc NOT installed${NC}"
    echo "   Run: npm install @0gfoundation/0g-cc"
    ((FAILED++))
fi

if npm list tsx 2>&1 | grep -q "tsx@"; then
    echo -e "${GREEN}✅ tsx is installed${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ tsx NOT installed${NC}"
    echo "   Run: npm install --save-dev tsx"
    ((FAILED++))
fi

if grep -q '"type": "module"' package.json; then
    echo -e "${GREEN}✅ package.json has type: module${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ package.json missing type: module${NC}"
    ((FAILED++))
fi

echo ""

# Test 2: Check Environment
echo "Test 2: Verifying Environment Configuration..."
echo "------------------------------------------------"

if [ -f .env ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    ((PASSED++))
    
    if grep -q "ZEROG_PRIVATE_KEY=" .env; then
        echo -e "${GREEN}✅ ZEROG_PRIVATE_KEY is set${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ ZEROG_PRIVATE_KEY not found in .env${NC}"
        ((FAILED++))
    fi
    
    if grep -q "ZEROG_NETWORK=" .env; then
        NETWORK=$(grep "ZEROG_NETWORK=" .env | cut -d'=' -f2)
        echo -e "${GREEN}✅ ZEROG_NETWORK is set to: $NETWORK${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ ZEROG_NETWORK not found in .env${NC}"
        ((FAILED++))
    fi
else
    echo -e "${RED}❌ .env file does not exist${NC}"
    echo "   Run: cp .env.example .env"
    ((FAILED++))
fi

echo ""

# Test 3: Check TypeScript Compilation
echo "Test 3: Verifying TypeScript Compilation..."
echo "--------------------------------------------"

if [ -d dist ]; then
    rm -rf dist/
    echo "Cleaned dist/ directory"
fi

if npm run build 2>&1 | tee /tmp/build.log | grep -q "Successfully"; then
    echo -e "${GREEN}✅ TypeScript compilation successful${NC}"
    ((PASSED++))
elif [ ! -s /tmp/build.log ] && [ -d dist ]; then
    echo -e "${GREEN}✅ TypeScript compilation successful (no output)${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ TypeScript compilation failed${NC}"
    cat /tmp/build.log
    ((FAILED++))
fi

echo ""

# Test 4: Check for Mock Code
echo "Test 4: Verifying Mock Code Removal..."
echo "---------------------------------------"

if grep -r "performRiskAnalysis" src/ 2>/dev/null | grep -v "Binary"; then
    echo -e "${RED}❌ performRiskAnalysis() still exists (MOCK CODE)${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✅ performRiskAnalysis() removed${NC}"
    ((PASSED++))
fi

MOCK_COUNT=$(grep -r "MOCK" src/ 2>/dev/null | grep -v "NO MOCK" | wc -l)
if [ "$MOCK_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $MOCK_COUNT instances of 'MOCK' in code${NC}"
    ((WARNINGS++))
else
    echo -e "${GREEN}✅ No MOCK strings in code${NC}"
    ((PASSED++))
fi

if grep -r "fallback" src/ 2>/dev/null | grep -v "disableFallback\|NO FALLBACK" | grep -v "Binary"; then
    echo -e "${YELLOW}⚠️  Fallback code might still exist${NC}"
    ((WARNINGS++))
else
    echo -e "${GREEN}✅ Fallback code removed${NC}"
    ((PASSED++))
fi

echo ""

# Test 5: Verify Real 0G Code
echo "Test 5: Verifying Real 0G Integration Code..."
echo "----------------------------------------------"

if grep -q "ZeroGBrokerService" src/services/ogService.ts 2>/dev/null; then
    echo -e "${GREEN}✅ ZeroGBrokerService imported${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ ZeroGBrokerService NOT found in ogService.ts${NC}"
    ((FAILED++))
fi

if grep -q "disableFallback: true" src/services/ogService.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Fallback disabled in broker config${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Fallback not disabled${NC}"
    ((FAILED++))
fi

if grep -q "disableSimulation: true" src/services/ogService.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Simulation disabled in broker config${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Simulation not disabled${NC}"
    ((FAILED++))
fi

if grep -q "broker.inference" src/services/ogService.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Real inference call implemented${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Real inference call NOT found${NC}"
    ((FAILED++))
fi

if grep -q "processResponse" src/services/ogService.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Fee settlement (processResponse) implemented${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Fee settlement NOT implemented${NC}"
    ((FAILED++))
fi

echo ""

# Test 6: Configuration Check
echo "Test 6: Verifying Configuration Files..."
echo "-----------------------------------------"

if grep -q '"module": "ES2020"' tsconfig.json; then
    echo -e "${GREEN}✅ tsconfig.json uses ES2020 modules${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ tsconfig.json not configured for ES modules${NC}"
    ((FAILED++))
fi

if grep -q "tsx" package.json; then
    echo -e "${GREEN}✅ tsx configured in package.json${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠️  tsx might not be configured${NC}"
    ((WARNINGS++))
fi

echo ""

# Summary
echo "========================================"
echo "📊 TEST SUMMARY"
echo "========================================"
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All critical tests passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Ensure you have testnet tokens (https://faucet.0g.ai)"
    echo "2. Start the server: npm run dev"
    echo "3. Test the analysis endpoint (see TESTING_GUIDE.md)"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please fix the issues above.${NC}"
    exit 1
fi
