import { createClient } from 'redis';
import redis from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

function createHash(callback) {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
  callback();
}

function displayHashedValues(callback) {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error('Error getting hashed values:', err.message);
      callback(err);
    } else {
      console.log('Reply:', reply);
      callback(null);
    }
  });
}

createHash(() => {
  displayHashedValues((err) => {
    if (err) {
      console.error('Error displaying hashed values:', err);
    } else {
      client.quit();
    }
  });
});
