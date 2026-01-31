import { ZeroGBrokerService } from '@0gfoundation/0g-cc/dist/services/zerog/broker.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('\n📦 ZeroGBrokerService available methods:\n');
console.log(Object.getOwnPropertyNames(ZeroGBrokerService.prototype).filter(m => m !== 'constructor'));

// Try to initialize and see what methods exist
try {
  const broker = new ZeroGBrokerService({
    network: 'testnet',
    privateKey: process.env.ZEROG_PRIVATE_KEY,
    disableFallback: true,
    disableSimulation: true,
    minBalance: 0.1,
    initialDeposit: 3
  });

  await broker.initialize();

  console.log('\n🔍 Initialized broker instance methods:\n');
  const proto = Object.getPrototypeOf(broker);
  const methods = [];
  let obj = proto;
  while (obj && obj !== Object.prototype) {
    methods.push(...Object.getOwnPropertyNames(obj).filter(m => m !== 'constructor' && typeof broker[m] === 'function'));
    obj = Object.getPrototypeOf(obj);
  }
  console.log([...new Set(methods)].sort());

  console.log('\n🔑 Checking ledger property:\n');
  if (broker.ledger) {
    console.log('✅ broker.ledger exists');
    console.log('Ledger methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(broker.ledger)).filter(m => m !== 'constructor' && typeof broker.ledger[m] === 'function'));
  } else {
    console.log('❌ broker.ledger does NOT exist');
  }

  console.log('\n💰 Checking balance:\n');
  try {
    const balance = await broker.getBalance();
    console.log('Balance:', balance);
  } catch (e) {
    console.log('Error getting balance:', e.message);
  }

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
