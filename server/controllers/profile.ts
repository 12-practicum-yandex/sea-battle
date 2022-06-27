import { Router, Request, Response } from 'express';
import { serverHelpers } from '../helpers';
import { yandexApi } from '../axios';
import multipart from 'connect-multiparty';
import fs from 'fs';
import FormData from 'form-data';

export const profileRouter = Router();

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { cookies, body } = req;

    const response = await yandexApi.put('/api/v2/user/profile', body, {
      headers: serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
    });

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const form = new FormData();
    const { cookies } = req;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const image = fs.createReadStream(req.files.avatar.path);
    form.append('avatar', image);
    const response = await yandexApi.put('/api/v2/user/profile/avatar', form, {
      headers: {
        ...serverHelpers.setAuthCookies(cookies.authCookie, cookies.uuid),
        ...form.getHeaders(),
      },
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

profileRouter.put('/', updateProfile);
profileRouter.put('/avatar', [multipart(), updateAvatar]);
