import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index.js';

const server = express();

dotenv.config();

server.use(
  express.urlencoded({
      extended: true,
  }),
  express.json(), cors()
);
server.use(router);

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

export default server;