import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import HttpException from '../../exceptions/HttpException';
import jwt from 'jsonwebtoken';
import config from '../../config';

const route = Router();

const users: Record<string, string> = {
  admin: '######adminP@ssw0rd#####',
  guest: 'guest',
};

route.post<never, { token: string }, { id: string; password: string }>(
  '/login',
  celebrate({
    body: Joi.object({
      id: Joi.string(),
      password: Joi.string(),
    }),
  }),
  (req, res) => {
    const pw = users[req.body.id];
    if (!pw || pw !== req.body.password)
      throw new HttpException(404, 'id or password is incorrect');
    res.json({
      token: jwt.sign(
        { id: req.body.id, admin: req.body.id === 'admin' },
        config.jwtSecret,
      ),
    });
  },
);

const auth = (app: Router) => {
  app.use('/auth', route);
};

export default auth;
