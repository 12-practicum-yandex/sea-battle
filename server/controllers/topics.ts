import { Router, Request, Response } from 'express';
import { TopicModel, UserModel } from '../models';

export const topicsRouter = Router();

const addTopic = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { title, description, userId, userLogin } = body;

    await UserModel.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        id: userId,
        login: userLogin,
      },
    });

    await TopicModel.create({
      title,
      description,
      user_id: userId,
    });

    res.send('OK');
  } catch (error) {
    console.log(error);

    res.status(400).send();
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await TopicModel.findAll();
    res.send({
      topics: data,
    });
  } catch (error) {
    res.status(400).send();
  }
};

topicsRouter.route('/add').post(addTopic);
topicsRouter.route('/all').get(getAll);
