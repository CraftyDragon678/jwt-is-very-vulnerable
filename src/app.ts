import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import bearerToken from 'express-bearer-token';
import config from './config';
import morgan from './api/middleware/morgan';
import api from './api';
import logger from './logger';
import HttpException from './exceptions/HttpException';

const app = express();

app.use(morgan);
app.use(bearerToken());
app.use(express.json());
app.use('/', api());
app.use(errors());
app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    err.status ??= 500;
    res.status(err.status).json({
      message: err.status === 500 ? 'unknown server error' : err.message,
    });
    if (err.status === 500) {
      logger.error(err.stack);
    }
  },
);

const PORT = config.port ?? 3000;

app.listen(PORT, () => {
  console.log(`server opened at ${PORT}`);
});
