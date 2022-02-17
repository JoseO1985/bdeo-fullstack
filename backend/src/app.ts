import { json, urlencoded } from 'body-parser';
import express from 'express';
import cors from 'cors';
import { mainRouter } from './routes/main';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(mainRouter);

export default app;
