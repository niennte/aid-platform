import redis from 'redis';

// const client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });
const client = redis.createClient('redis://rediscloud:sa2i4e2yPzmf6bHXjUxBGpW2r9RLA9eg@redis-12376.c12.us-east-1-4.ec2.cloud.redislabs.com:12376', { no_ready_check: true });

export default client;
