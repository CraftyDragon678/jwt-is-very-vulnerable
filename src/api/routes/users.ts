import { Router } from 'express';
import attachUserInfo from '../middleware/attachUserInfo';

const route = Router();

route.get<never, { id: string; admin: boolean }>(
  '/me',
  attachUserInfo,
  (req, res) => {
    res.json(req.user);
  },
);

const users = (app: Router) => {
  app.use('/users', route);
};

export default users;
