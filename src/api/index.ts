import { Router } from 'express';
import auth from './routes/auth';

const api = () => {
  const router = Router();
  auth(router);
  return router;
};

export default api;
