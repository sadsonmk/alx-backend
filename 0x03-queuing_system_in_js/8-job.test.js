import kue from 'kue';
import chai from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;
  
  before(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should create jobs in queue', () => {
    const jobs = [
     {
       phoneNumber: '4153518780',
       message: 'This is the code 1234 to verify your account'
     },
     {
       phoneNumber: '4153518781',
       message: 'This is the code 4562 to verify your account'
     },
     {
       phoneNumber: '4153518743',
       message: 'This is the code 4321 to verify your account'
     }
   ];

   createPushNotificationsJobs(jobs, queue);
   const jobsQueue = queue.testMode.jobs.get('push_notification_code_3');
   chai.expect(jobsQueue).to.have.lengthOf(3);
   chai.expect(jobsQueue[0].data).to.deep.equal(jobs[0]);
   chai.expect(jobsQueue[1].data).to.deep.equal(jobs[1]);
   chai.expect(jobsQueue[2].data).to.deep.equal(jobs[2]);
  });

  it('should throw an error if jobs is not an array', () => {
    const jobs = {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
    };
   chai.expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
  });
});
