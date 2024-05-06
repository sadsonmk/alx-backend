import { createClient } from 'redis';
import redis from 'redis';

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

function displaySchoolValue(schoolName, callback) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(`Error getting ${schoolName}: ${err.message}`);
      callback(err);
    } else {
      console.log(`${schoolName}: ${reply}`);
      callback(null);
    }
  });
}

displaySchoolValue('Holberton', (err) => {
  if (err) {
    console.error('Error displaying Holberton value:', err);
  } else {
    setNewSchool('HolbertonSanFrancisco', '100', (err) => {
      if (err) {
        console.error('Error setting HolbertonSanFrancisco value:', err);
      } else {
        displaySchoolValue('HolbertonSanFrancisco', (err) => {
	  if (err) {
	    console.error('Error displaying HolbertonSanFrancisco value:', err);
	  }
	});
      }
    });
  }
});
