// @flow

import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import socketIO from 'socket.io';
import fileUpload from 'express-fileupload';

import routing from './routing';
import { STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import setUpSocket from './socket';

const app = express();
/*
 for Socket.IO to work,
 need to use Server from http to listen
 and not the Express app
 */
// flow-disable-next-line
const http = Server(app);
const io = socketIO(http);
setUpSocket(io);

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json());
app.use(fileUpload());

routing(app);

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development). \nKeep "yarn dev:wds" running in an other terminal'}.`);
});
