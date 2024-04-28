const { connectQueue } = require('./connect.mq.function');

async function publish({ data, queueName }) {
  const queueConnection = await connectQueue(queueName).catch((err) => {
    console.error(err);
    throw err;
  });

  if (!queueConnection) {
    throw new Error('Failed to establish queue connection');
  }

  const { connection, channel } = queueConnection;
  await sendDataToQueue({ data, channel, queueName, connection }).catch(
    (err) => {
      console.error(err);
      throw err;
    }
  );
}

module.exports = { publish };

async function sendDataToQueue({ data, channel, queueName, connection }) {
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  await channel.close();
  await connection.close();
}
