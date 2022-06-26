import express from 'express';
import path from 'path';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { clientConfig } from '../webpack';
import { dbConnect } from './init';
import { serverRenderMiddleware, webpackMiddleware, authMiddleware } from './middlewares';
import { topicsRouter } from './controllers';

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/topics', topicsRouter);

app.get('/*', [...webpackMiddleware(clientConfig)], authMiddleware, serverRenderMiddleware);

const startApp = async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
};

startApp();
