import { Router } from 'express';
import auth from './routes/auth';
import users from './routes/users';

const api = () => {
  const router = Router();
  auth(router);
  users(router);
  return router;
};

export default api;
