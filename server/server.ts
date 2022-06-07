import express from 'express';
import path from 'path';

import { serverConfig } from '../webpack';
import { dbConnect } from './init';
import { serverRenderMiddleware, webpackMiddleware } from './middlewares';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', [...webpackMiddleware(serverConfig)], serverRenderMiddleware);

const startApp = async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
};

startApp();
