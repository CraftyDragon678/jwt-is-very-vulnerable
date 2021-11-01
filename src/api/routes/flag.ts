import { Router } from 'express';
import HttpException from '../../exceptions/HttpException';
import attachUserInfo from '../middleware/attachUserInfo';

const route = Router();

route.get('/', attachUserInfo, (req, res) => {
  if (!req.user.admin) throw new HttpException(403, 'be admin');
  res.send('FLAG{jwt-is-very-vulnerable}');
});

const flag = (app: Router) => {
  app.use('/flag', route);
};

export default flag;
