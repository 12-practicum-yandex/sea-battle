import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import { baseUrl } from '@constants/base-url';
import { UserModel } from '../models';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { cookies, signedCookies } = req;

  console.log(cookies, signedCookies);

  if (!cookies || req.path !== '/sign-in') {
    next();
    return;
    // res.redirect(302, '/sign-in');
  }

  try {
    const response = await axios.get(`${baseUrl}/auth/user`, {
      headers: {
        cookie: `authCookie=${cookies.authCookie}; uuid=${cookies.uuid}`,
      },
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
  } catch (err) {
    // res.redirect(302, '/sign-in');
    console.log(err);
  }

  next();
};
