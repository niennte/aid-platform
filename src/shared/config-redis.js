import Redis from 'ioredis';

import isProd from './util';

export const redisEndpoint = isProd ? process.env.REDISCLOUD_URL : 'redis://rediscloud:sa2i4e2yPzmf6bHXjUxBGpW2r9RLA9eg@redis-12376.c12.us-east-1-4.ec2.cloud.redislabs.com:12376';
const client = new Redis(redisEndpoint, { no_ready_check: true });

export const pub = new Redis(redisEndpoint, { no_ready_check: true });
const sub = new Redis(redisEndpoint, { no_ready_check: true });
sub.subscribe('news', 'music', 'online', (err, count) => {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.
  pub.publish('news', JSON.stringify('Hello world!'));
  pub.publish('music', JSON.stringify('Hello again!'));
  console.log(count);
});

sub.on('message', (channel, message) => {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log('Receive message %s from channel %s', message, channel);
  console.dir(JSON.parse(message));
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
// sub.on('messageBuffer', (channel, message) => {
  // Both `channel` and `message` are buffers.
  // console.log('Receive message %s from channel %s', message, channel);
  // console.dir(message);
// });


export default client;
