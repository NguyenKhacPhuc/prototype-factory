import { startPolling, startHealthServer } from './job-poller';

console.log('=== Prototype Factory Worker ===');
console.log(`Mode: ${process.env.MOCK_MODE === 'true' ? 'MOCK (no API costs)' : 'LIVE'}`);

startHealthServer();
startPolling();
