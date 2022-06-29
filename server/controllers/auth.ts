import { Router, Request, Response } from 'express';
import { serverHelpers } from '../helpers';
import { UserModel } from '../models';
import { yandexApi } from '../axios';

export const authRouter = Router();

type AuthRequestBody = {
  login: string;
  password: string;
};

const findOrCreateUser = async (authCookie: string, uuid: string) => {
  const response = await yandexApi.get('/api/v2/auth/user', {
    withCredentials: true,
    headers: serverHelpers.setAuthCookies(authCookie, uuid),
  });
  await UserModel.findOrCreate({
    where: {
      id: response.data.id,
    },
    defaults: {
      id: response.data.id,
      login: response.data.login,
    },
  });
};

const signIn = async (req: Request<null, any, AuthRequestBody>, res: Response) => {
  try {
    const { body } = req;

    if (!body.login || !body.password) {
      res.sendStatus(400);
      return;
    }

    const response = await yandexApi.post('/api/v2/auth/signin', body);
    const cookies = serverHelpers.parseResponseCookies(response.headers);

    const { uuid, authCookie } = cookies;
    await findOrCreateUser(authCookie.value, uuid.value);

    serverHelpers.setResAuthCookies(res, cookies);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const signUp = async (req: Request<null, any, AuthRequestBody>, res: Response) => {
  try {
    const { body } = req;
    const response = await yandexApi.post('/api/v2/auth/signup', body);
    const cookies = serverHelpers.parseResponseCookies(response.headers);

    const { uuid, authCookie } = cookies;
    await findOrCreateUser(authCookie.value, uuid.value);

    serverHelpers.setResAuthCookies(res, cookies);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { cookies } = req;

    const response = await yandexApi.post(
      '/api/v2/auth/logout',
      {},
      {
        headers: serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
        withCredentials: true,
      },
    );

    const yandexCookies = serverHelpers.parseResponseCookies(response.headers);
    serverHelpers.setResAuthCookies(res, yandexCookies);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { cookies } = req;

    const response = await yandexApi.get('/api/v2/auth/user', {
      headers: serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
    });

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

authRouter.route('/sign-in').post(signIn);
authRouter.route('/sign-up').post(signUp);
authRouter.route('/user').get(getUser);
authRouter.route('/logout').post(logout);
