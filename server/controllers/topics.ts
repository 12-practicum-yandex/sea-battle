import { Router, Request, Response } from 'express';
import { TopicModel } from '../models';

export const topicsRouter = Router();

const addTopic = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { title, description, userId } = body;

    await TopicModel.create({
      title,
      description,
      user_id: userId,
    });

    res.send('OK');
  } catch (error) {
    res.status(400).send();
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    await TopicModel.findAll();
    res.send('OK');
  } catch (error) {
    res.status(400).send();
  }
};

topicsRouter.route('/add').post(addTopic);
topicsRouter.route('/all').post(getAll);
