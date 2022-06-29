import { Router, Request, Response } from 'express';
import { serverHelpers } from '../helpers';
import { yandexApi } from '../axios';

export const leaderBoardRouter = Router();

const getByTeam = async (req: Request, res: Response) => {
  try {
    const { cookies, body } = req;

    const response = await yandexApi.post('/api/v2/leaderboard/atlantida', body, {
      headers: serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
    });

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const { cookies, body } = req;
    const response = await yandexApi.post('/api/v2/leaderboard', body, {
      headers: serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    res.status(200).send({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

leaderBoardRouter.post('/all', getByTeam);
leaderBoardRouter.post('/add', add);
