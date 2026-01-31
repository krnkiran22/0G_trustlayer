import { Wallet, JsonRpcProvider } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const provider = new JsonRpcProvider('https://evmrpc-testnet.0g.ai');
const wallet = new Wallet(process.env.ZEROG_PRIVATE_KEY, provider);

console.log('🔍 Checking 0G Testnet Balance...\n');
console.log('Wallet Address:', wallet.address);

try {
  const balance = await provider.getBalance(wallet.address);
  const balanceInA0GI = parseFloat(balance.toString()) / 1e18;
  
  console.log('Balance:', balanceInA0GI, 'A0GI');
  
  if (balanceInA0GI === 0) {
    console.log('\n❌ ERROR: Your wallet has 0 A0GI tokens!');
    console.log('\n🎯 SOLUTION:');
    console.log('1. Visit: https://faucet.0g.ai');
    console.log('2. Enter your address:', wallet.address);
    console.log('3. Request testnet tokens');
    console.log('4. Wait 1-2 minutes');
    console.log('5. Run this script again to verify');
  } else if (balanceInA0GI < 1) {
    console.log('\n⚠️  WARNING: Low balance! You have', balanceInA0GI, 'A0GI');
    console.log('Recommended: At least 5 A0GI for smooth operation');
  } else {
    console.log('\n✅ Good! You have enough A0GI tokens');
    console.log('\nYou can now create a ledger account:');
    console.log('cd /Users/kiran/Desktop/0G_trustlayer/0g_backend && ./create-account.sh');
  }
  
} catch (error) {
  console.error('Error checking balance:', error.message);
}
