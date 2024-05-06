import { createClient } from 'redis';

const subscriber = createClient();

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

subscriber.subscribe('holberton school channel');
subscriber.on('message', (channel, msg) => {
  console.log(`Received ${msg} on ${channel}`);
  if (msg === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
  }
});
