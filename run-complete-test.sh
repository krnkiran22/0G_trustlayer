#!/bin/bash

# SafeGuard AI - Complete System Test Suite
# This script performs comprehensive end-to-end testing

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 SAFEGUARD AI - COMPLETE SYSTEM TEST SUITE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Date: $(date)"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Results directory
RESULTS_DIR="/tmp/safeguard-test-results"
mkdir -p "$RESULTS_DIR"

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_output="$3"
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔍 Test: $test_name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    local output
    if output=$(eval "$test_command" 2>&1); then
        if [[ -n "$expected_output" ]] && ! echo "$output" | grep -q "$expected_output"; then
            echo -e "${RED}❌ FAILED${NC}: Expected output not found"
            echo "Expected: $expected_output"
            echo "Got: $output"
            ((TESTS_FAILED++))
            return 1
        else
            echo -e "${GREEN}✅ PASSED${NC}"
            echo "$output"
            ((TESTS_PASSED++))
            return 0
        fi
    else
        echo -e "${RED}❌ FAILED${NC}: Command failed"
        echo "$output"
        ((TESTS_FAILED++))
        return 1
    fi
    echo ""
}

echo "═══════════════════════════════════════════════════════════════"
echo "PART 1: BACKEND API TESTS"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 1: Health Check
run_test "Health Check Endpoint" \
    'curl -s http://localhost:4000/health | jq -r ".status"' \
    "ok"

# Test 2: Stats Endpoint
run_test "Platform Stats Endpoint" \
    'curl -s http://localhost:4000/api/stats | jq -r ".success"' \
    "true"

# Test 3: Full Analysis (USDT)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Full Contract Analysis (USDT) - This will take 15-30 seconds..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

START_TIME=$(date +%s)
USDT_RESULT=$(curl -s -X POST http://localhost:4000/api/analyze \
    -H "Content-Type: application/json" \
    -d '{"address":"0xdac17f958d2ee523a2206206994597c13d831ec7","network":"ethereum"}')
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo "Duration: ${DURATION} seconds"
echo "$USDT_RESULT" > "$RESULTS_DIR/usdt-analysis.json"

# Verify USDT analysis
USDT_SUCCESS=$(echo "$USDT_RESULT" | jq -r '.success')
USDT_TEE=$(echo "$USDT_RESULT" | jq -r '.data.ogVerification.teeVerified')
USDT_RISK=$(echo "$USDT_RESULT" | jq -r '.data.overallRisk')
USDT_STORAGE=$(echo "$USDT_RESULT" | jq -r '.data.ogVerification.storageId')

echo "  Success: $USDT_SUCCESS"
echo "  TEE Verified: $USDT_TEE"
echo "  Risk Score: $USDT_RISK"
echo "  Storage ID: $USDT_STORAGE"

if [[ "$USDT_SUCCESS" == "true" ]] && [[ "$USDT_TEE" == "true" ]] && [[ "$DURATION" -ge 10 ]]; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi
echo ""

# Test 4: Different Contract (DAI)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Different Contract Analysis (DAI) - Testing real AI variation..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DAI_RESULT=$(curl -s -X POST http://localhost:4000/api/analyze \
    -H "Content-Type: application/json" \
    -d '{"address":"0x6b175474e89094c44da98b954eedeac495271d0f","network":"ethereum"}')

echo "$DAI_RESULT" > "$RESULTS_DIR/dai-analysis.json"

DAI_SUCCESS=$(echo "$DAI_RESULT" | jq -r '.success')
DAI_TEE=$(echo "$DAI_RESULT" | jq -r '.data.ogVerification.teeVerified')
DAI_RISK=$(echo "$DAI_RESULT" | jq -r '.data.overallRisk')

echo "  DAI Risk: $DAI_RISK"
echo "  USDT Risk: $USDT_RISK"

if [[ "$DAI_SUCCESS" == "true" ]] && [[ "$DAI_TEE" == "true" ]] && [[ "$DAI_RISK" != "$USDT_RISK" ]]; then
    echo -e "${GREEN}✅ PASSED${NC}: Different contracts return different risk scores (Real AI!)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: Contracts return same risk (Mock data detected!)"
    ((TESTS_FAILED++))
fi
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "PART 2: 0G COMPUTE VERIFICATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 5: TEE Verification
run_test "TEE Verification Status" \
    "echo '$USDT_RESULT' | jq -r '.data.ogVerification.teeVerified'" \
    "true"

# Test 6: Storage ID Format
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Storage ID Format Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$USDT_STORAGE" =~ ^chatcmpl- ]]; then
    echo -e "${GREEN}✅ PASSED${NC}: Storage ID has correct format: $USDT_STORAGE"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: Invalid storage ID format: $USDT_STORAGE"
    ((TESTS_FAILED++))
fi
echo ""

# Test 7: Token Info Retrieval
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Token Information Retrieval"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TOKEN_NAME=$(echo "$USDT_RESULT" | jq -r '.data.tokenInfo.name')
TOKEN_SYMBOL=$(echo "$USDT_RESULT" | jq -r '.data.tokenInfo.symbol')

echo "  Token: $TOKEN_NAME ($TOKEN_SYMBOL)"

if [[ "$TOKEN_NAME" == "Tether USD" ]] && [[ "$TOKEN_SYMBOL" == "USDT" ]]; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi
echo ""

# Test 8: Risk Factors
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Risk Factors Completeness"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

FACTORS=$(echo "$USDT_RESULT" | jq '.data.factors | keys | length')
echo "  Risk factors found: $FACTORS"

REQUIRED_FACTORS=("rugPullRisk" "smartContractRisk" "centralizationRisk" "liquidityRisk" 
                  "tokenEconomicsRisk" "codeQualityRisk" "credibilityRisk" "historicalRisk")

ALL_PRESENT=true
for factor in "${REQUIRED_FACTORS[@]}"; do
    if ! echo "$USDT_RESULT" | jq -e ".data.factors.$factor" > /dev/null 2>&1; then
        echo "  Missing: $factor"
        ALL_PRESENT=false
    fi
done

if [[ "$ALL_PRESENT" == true ]] && [[ "$FACTORS" -eq 8 ]]; then
    echo -e "${GREEN}✅ PASSED${NC}: All 8 risk factors present"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: Missing risk factors"
    ((TESTS_FAILED++))
fi
echo ""

# Test 9: Warnings
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Warnings Generation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

WARNINGS_COUNT=$(echo "$USDT_RESULT" | jq '.data.warnings | length')
echo "  Warnings found: $WARNINGS_COUNT"
echo "$USDT_RESULT" | jq -r '.data.warnings[]' | sed 's/^/    - /'

if [[ "$WARNINGS_COUNT" -ge 2 ]]; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "PART 3: PERFORMANCE & INTEGRATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 10: Response Time
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: Response Time (Real Compute Verification)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ "$DURATION" -ge 10 ]] && [[ "$DURATION" -le 60 ]]; then
    echo -e "${GREEN}✅ PASSED${NC}: Duration ${DURATION}s is within expected range (10-60s for real compute)"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️  WARNING${NC}: Duration ${DURATION}s is outside typical range"
    if [[ "$DURATION" -lt 10 ]]; then
        echo "  Suspiciously fast - may be using cache or mock data"
    fi
    ((TESTS_FAILED++))
fi
echo ""

# Test 11: Frontend Accessibility
run_test "Frontend Server Accessibility" \
    'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000' \
    "200"

# Test 12: API CORS Configuration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Test: CORS Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CORS_HEADER=$(curl -s -I -H "Origin: http://localhost:3000" http://localhost:4000/health | grep -i "access-control-allow-origin")

if [[ -n "$CORS_HEADER" ]]; then
    echo -e "${GREEN}✅ PASSED${NC}: CORS headers present"
    echo "  $CORS_HEADER"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}: CORS headers missing"
    ((TESTS_FAILED++))
fi
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

# Save test report
cat > "$RESULTS_DIR/test-report.txt" << EOF
SafeGuard AI - System Test Report
==================================
Date: $(date)

Backend Tests:
- Health Check: $([ $TESTS_PASSED -gt 0 ] && echo "✅" || echo "❌")
- Stats Endpoint: $([ $TESTS_PASSED -gt 1 ] && echo "✅" || echo "❌")
- Full Analysis: $([ $TESTS_PASSED -gt 2 ] && echo "✅" || echo "❌")
- Different Contracts: $([ $TESTS_PASSED -gt 3 ] && echo "✅" || echo "❌")

0G Integration:
- TEE Verification: $USDT_TEE
- Storage ID: $USDT_STORAGE
- Real AI Variation: $([ "$DAI_RISK" != "$USDT_RISK" ] && echo "✅ Yes" || echo "❌ No")

Performance:
- Analysis Duration: ${DURATION}s
- Risk Score (USDT): $USDT_RISK
- Risk Score (DAI): $DAI_RISK

Results:
- Total: $((TESTS_PASSED + TESTS_FAILED))
- Passed: $TESTS_PASSED
- Failed: $TESTS_FAILED
- Status: $([ $TESTS_FAILED -eq 0 ] && echo "✅ ALL TESTS PASSED" || echo "⚠️ SOME TESTS FAILED")

Detailed results saved to: $RESULTS_DIR
EOF

echo "📄 Full report saved to: $RESULTS_DIR/test-report.txt"
echo ""

if [[ $TESTS_FAILED -eq 0 ]]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 ALL TESTS PASSED - SYSTEM FULLY OPERATIONAL! 🎉${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 0
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}⚠️  SOME TESTS FAILED - PLEASE REVIEW LOGS ⚠️${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 1
fi
