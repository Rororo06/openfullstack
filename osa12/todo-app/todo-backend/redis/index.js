const redis = require('redis');

const { REDIS_URL } = require('../util/config');

let getAsync = async () => null;
let setAsync = async () => null;

if (REDIS_URL) {
  const client = redis.createClient({ url: REDIS_URL });

  client.on('error', error => console.log('redis error', error.message));
  client.connect().then(() => console.log('connected to redis'));

  getAsync = key => client.get(key);
  setAsync = (key, value) => client.set(key, value);
} else {
  console.log('REDIS_URL not set, counters are disabled');
}

module.exports = { getAsync, setAsync };
