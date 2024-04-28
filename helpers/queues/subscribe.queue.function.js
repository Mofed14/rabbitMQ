const { connectQueue } = require('./connect.mq.function');

async function subscribe(queueName) {
  try {
    const queueConnection = await connectQueue(queueName).catch((err) => {
      console.error(err);
      throw err;
    });

    if (!queueConnection) {
      throw new Error('Failed to establish queue connection');
    }

    const { channel } = queueConnection;

    channel.consume(queueName, (data) => {
      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  subscribe,
};
