import express from 'express';
import config from './config';
import morgan from './api/middleware/morgan';

const app = express();

app.use(morgan);

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = config.port ?? 3000;

app.listen(PORT, () => {
  console.log(`server opened at ${PORT}`);
});
