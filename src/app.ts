import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = config.port ?? 3000;

app.listen(PORT, () => {
  console.log(`server opened at ${PORT}`);
});
