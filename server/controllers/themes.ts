import { Request, Response, Router } from 'express';
import { SiteTheme } from '../models';

export const themeRouter = Router();

const findTheme = async (req: Request, res: Response) => {
  try {
    const themes = await SiteTheme.findAll({
      where: {
        theme: ['blue', 'dark'],
      },
    });

    res.send({ themes });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const createTheme = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const { id, theme } = await SiteTheme.create(body);

    res.send({ id, theme });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

themeRouter.route('/').get(findTheme);
themeRouter.route('/').post(createTheme);
