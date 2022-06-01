const cron = require('node-cron');

cron.schedule('45 * * * * *', function() {
  const currentTime = Date.now();
  console.log(currentTime.getHours());
  console.log('---------------------');
  console.log('Running Cron Job');
});