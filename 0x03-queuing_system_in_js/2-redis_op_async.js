import { createClient } from 'redis';
import redis from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

function setNewSchool(schoolName, value, callback) {
  client.set(schoolName, value, (err, reply) =>{
    if (err) {
      console.error(`Error setting ${schoolName}: ${err.messsage}`);
      callback(err);
    } else {
      redis.print(`Reply: ${reply}`);
      callback(null);
    }
  });
}

async function displaySchoolValue(schoolName) {
  const getClientAsync = promisify(client.get).bind(client);
  try {
    const reply = await getClientAsync(schoolName);
    console.log(`${schoolName}: ${reply}`);
  } catch (err) {
    console.error(`Error getting ${schoolName}: ${err.message}`);
  }
}

displaySchoolValue('Holberton')
  .then(() => {
    setNewSchool('HolbertonSanFrancisco', '100', (err) => {
      if (err) {
        console.error('Error setting HolbertonSanFrancisco value:', err);
      } else {
        displaySchoolValue('HolbertonSanFrancisco');
      }
    });
  })
  .catch((err) => {
    console.error('Error displaying Holberton value:', err);
  });
