import redis from 'redis';

import isProd from './util';

const redisEndpoint = isProd ? process.env.REDISCLOUD_URL : 'redis://rediscloud:sa2i4e2yPzmf6bHXjUxBGpW2r9RLA9eg@redis-12376.c12.us-east-1-4.ec2.cloud.redislabs.com:12376';
const client = redis.createClient(redisEndpoint, { no_ready_check: true });

export const sub = redis.createClient(redisEndpoint, { no_ready_check: true });
// subscribe to redis notifications
sub.psubscribe('__key*__:*');

export const pub = redis.createClient(redisEndpoint, { no_ready_check: true });

export default client;
