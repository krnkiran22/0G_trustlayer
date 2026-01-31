import { Wallet, JsonRpcProvider } from 'ethers';
import { createBroker } from '@0gfoundation/0g-cc';
import dotenv from 'dotenv';

dotenv.config();

async function createLedgerAccount() {
  try {
    console.log('🔧 Creating 0G Ledger Account...\n');
    
    const provider = new JsonRpcProvider('https://evmrpc-testnet.0g.ai');
    const wallet = new Wallet(process.env.ZEROG_PRIVATE_KEY, provider);
    
    console.log('📋 Wallet Address:', wallet.address);
    
    // Check balance first
    const balance = await provider.getBalance(wallet.address);
    const balanceInA0GI = parseFloat(balance.toString()) / 1e18;
    console.log('💰 Balance:', balanceInA0GI, 'A0GI\n');
    
    if (balanceInA0GI < 5) {
      console.log('❌ ERROR: Insufficient balance. Need at least 5 A0GI');
      console.log('Get tokens from: https://faucet.0g.ai');
      process.exit(1);
    }
    
    console.log('🚀 Creating broker instance...');
    
    // Create broker - this should create the ledger automatically
    const broker = await createBroker(
      wallet,
      undefined, // ledger CA (uses default for testnet)
      undefined, // inference CA (uses default for testnet)
      undefined, // fine-tuning CA (uses default for testnet)
      undefined, // gas price
      undefined, // max gas price
      undefined  // step
    );
    
    console.log('✅ Broker created successfully!\n');
    
    // Try to add ledger with initial deposit
    console.log('💵 Adding ledger with 5 A0GI initial deposit...');
    await broker.ledger.addLedger(5);
    
    console.log('✅ Ledger created!\n');
    
    // Verify ledger exists
    console.log('🔍 Verifying ledger...');
    const ledgerInfo = await broker.ledger.getLedger();
    
    console.log('✅ SUCCESS! Ledger Information:');
    console.log(JSON.stringify(ledgerInfo, null, 2));
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

createLedgerAccount();
