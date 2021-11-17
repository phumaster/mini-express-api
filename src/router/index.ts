import { Application } from 'express';
import TestRouter from './test';

const AppRouter = (app: Application) => {
  app.use('/api/v1/test', TestRouter);
};

export default AppRouter;
