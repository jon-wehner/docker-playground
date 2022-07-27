const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  legacyMode: true,
  socket: {
    port: 6379,
    host: 'redis-server',
  },
});
client.connect();
client.set('visits', 0);

client.on('error', (err) => {
  console.log('Error ' + err);
});

app.get('/', async (req, res) => {
  await client.get('visits', (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
