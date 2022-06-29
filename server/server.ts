import express from 'express';
import path from 'path';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { clientConfig } from '../webpack';
import { dbConnect } from './init';
import { serverRenderMiddleware, webpackMiddleware, cspMiddleware } from './middlewares';
import {
  authRouter,
  leaderBoardRouter,
  profileRouter,
  topicsRouter,
  themeRouter,
} from './controllers';

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(cspMiddleware());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/auth', authRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/leaderboard', leaderBoardRouter);
app.use('/api/profile', profileRouter);
app.use('/api/theme', themeRouter);

app.get('/*', [...webpackMiddleware(clientConfig)], serverRenderMiddleware);

const startApp = async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
};

startApp();
