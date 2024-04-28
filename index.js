const express = require('express');
const processQueue = require('./helpers/queues/index');

const app = express();
const PORT = 4001;

app.use(express.json());

app.post('/send-msg', (req, res) => {
  processQueue.publish({ data: req.body, queueName: 'test-queue-mofed' });
  res.send('Message Sent');
});

app.get('/get-msg', (req, res) => {
  processQueue.subscribe('test-queue-mofed');
  res.send('Message Got');
});

app.listen(PORT, () => console.log('Server running at port ' + PORT));
