#!/bin/bash

# Test Chat Functionality

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTING INTERACTIVE CHAT ASSISTANT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

API_URL="http://localhost:4000/api"

# Test 1: Create General Chat Session
echo "📝 Test 1: Create General Chat Session"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
GENERAL_SESSION=$(curl -s -X POST "$API_URL/chat/session" \
  -H "Content-Type: application/json" \
  -d '{}' | jq -r '.data.sessionId')

echo "Session ID: $GENERAL_SESSION"
echo ""

# Test 2: Send Message in General Chat
echo "📬 Test 2: Send Message in General Chat"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Question: What is a reentrancy attack?"
echo ""
REPLY=$(curl -s -X POST "$API_URL/chat/message" \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\":\"$GENERAL_SESSION\",\"message\":\"What is a reentrancy attack? Explain in 2 sentences.\"}")

echo "$REPLY" | jq '.'
echo ""

# Test 3: Create Contract-Specific Chat Session
echo "📝 Test 3: Create Contract-Specific Chat Session (USDT)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
CONTRACT_SESSION=$(curl -s -X POST "$API_URL/chat/session" \
  -H "Content-Type: application/json" \
  -d '{
    "contractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7",
    "network":"ethereum"
  }' | jq -r '.data.sessionId')

echo "Session ID: $CONTRACT_SESSION"
echo ""

# Test 4: Ask About Specific Contract
echo "📬 Test 4: Ask About USDT Contract"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Question: What are the main risks in this contract?"
echo ""
CONTRACT_REPLY=$(curl -s -X POST "$API_URL/chat/message" \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\":\"$CONTRACT_SESSION\",\"message\":\"What are the top 2 risks in this contract?\"}")

echo "$CONTRACT_REPLY" | jq '.'
echo ""

# Test 5: Get Chat History
echo "📚 Test 5: Get Chat History"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s "$API_URL/chat/history/$GENERAL_SESSION" | jq '.data.messages | length'
echo "messages in general session"
echo ""

# Test 6: Get All Active Sessions
echo "📋 Test 6: Get All Active Sessions"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s "$API_URL/chat/sessions" | jq '.data.count'
echo "active sessions"
echo ""

# Test 7: Delete Session
echo "🗑️  Test 7: Delete Chat Session"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s -X DELETE "$API_URL/chat/session/$GENERAL_SESSION" | jq '.success'
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CHAT TESTS COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
