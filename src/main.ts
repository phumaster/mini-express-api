import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

import ErrorHandler from './middleware/ErrorHandler';
import NotFoundHandler from './middleware/NotFoundHandler';
import AppRouter from './router';

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
const keyGenerator = function (req: any) {
  try {
    return req.headers['x-forwarded-for'] || req.body?.publicIp; // or whatever we end up with
  } catch (e) {
    return undefined;
  }
};
// app.set('trust proxy', 1);
const corsOptions = {
  origin: '*',
};

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 1000 requests per windowMs
  keyGenerator: keyGenerator,
});

app.use(apiLimiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppRouter(app);

app.use(ErrorHandler);
app.use(NotFoundHandler);

const server = app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
