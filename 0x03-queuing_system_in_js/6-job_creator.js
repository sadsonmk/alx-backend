import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '13031108355',
  message: 'code for verifying your account',
};

const job = queue.create('push_notification_code', jobData)
  .save((err) = {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.log('Notification job failed');
    }
  });

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
