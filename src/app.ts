import express from 'express';
import config from './config';
import morgan from './api/middleware/morgan';
import api from './api';

const app = express();

app.use(morgan);
app.use('/', api());

const PORT = config.port ?? 3000;

app.listen(PORT, () => {
  console.log(`server opened at ${PORT}`);
});
