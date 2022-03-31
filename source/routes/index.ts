import express, { Express } from 'express';
import userRouter from './userRoutes'

const app: Express = express();

app.use('/user', userRouter);

export default app;
