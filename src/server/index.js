// @flow

import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import socketIO from 'socket.io';
import redisAdapter from 'socket.io-redis';
import Redis from 'ioredis';

import routing from './routing';
import { STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import setUpSocket from './socket';
import { redisEndpoint } from '../shared/config-redis';

const app = express();
/*
 for Socket.IO to work,
 need to use Server from http to listen
 and not the Express app
 */
// flow-disable-next-line
const http = Server(app);
const io = socketIO(http);
io.adapter(redisAdapter({
  pubClient: new Redis(redisEndpoint),
  subClient: new Redis(redisEndpoint),
}));
setUpSocket(io);
io.of('/').adapter.clients((err, clients) => {
  console.log(clients); // an array containing all connected socket ids
});

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json());

routing(app);

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development). \nKeep "yarn dev:wds" running in an other terminal'}.`);
});
