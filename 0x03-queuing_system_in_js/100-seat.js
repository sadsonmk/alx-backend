const redis = require('redis');
import kue from 'kue';

const express = require('express');

const app = express();
const port = 1245;

const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

let reservationEnabled = true;

const queue = kue.createQueue;

async function reserveSeat(number = 50) {
  await setAsync('available_seats', number);
  const seats = getAsync('available_seats');
  if (seats === 0) {
    reservationEnabled = false;
  }
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return seats;
}

reserveSeat(50);

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ getCurrentAvailableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }
  const job = queue.create('reserve_seat', {}).save((err) => {
    if (!err) {
      console.log(`Seat reservation job ${job.id} created`);
      res.json({ status:"Reservation in process" });
    } else {
      res.json({ status: "Reservation failed" });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process('reserve_seat', async (job, done) => {
    const availSeats = await getCurrentAvailableSeats();
    const newSeats = availSeats - 1;
    
    if (newSeats === 0) {
      reservationEnabled = false;
    }

    if (newSeats >= 0) {
      reserveSeat(newSeats);
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  reserveSeat(availSeats);
});

