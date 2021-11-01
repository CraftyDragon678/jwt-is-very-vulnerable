import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(config.port ?? 3000);
