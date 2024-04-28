const amqp = require('amqplib');

async function connectQueue(queueName) {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  await channel.assertQueue(String(queueName));
  return { connection, channel };
}

module.exports = {
  connectQueue,
};
