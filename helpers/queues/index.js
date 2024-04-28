const { publish } = require('./publish.queue.function');
const { subscribe } = require('./subscribe.queue.function');

module.exports = {
  publish,
  subscribe,
};
