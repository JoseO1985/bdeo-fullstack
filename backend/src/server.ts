import express from 'express';
import { json, urlencoded } from 'body-parser';
import { mainRouter } from './routes/main';
import environment from './config/environment';
import db from './db/mongoose';

const app = express();

// middleware setup
app.use(urlencoded({ extended: false }));
app.use(json());
// routes setup
app.use(mainRouter);

const startServer = () =>
  app.listen(environment.port, () => {
    console.log(`App listening on http://localhost:${environment.port}`);
  });

db.connect(startServer);
