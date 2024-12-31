/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/middleware';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://assignmen-5-client.vercel.app',
    credentials: true,
  }),
);

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server.');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
