import { Router } from 'express';
import auth from './routes/auth';
import users from './routes/users';
import flag from './routes/flag';

const api = () => {
  const router = Router();
  auth(router);
  users(router);
  flag(router);
  return router;
};

export default api;
