import 'express-async-errors';
import express from 'express';
import { readdirSync } from 'fs';
import path from 'path';

import { GeneralError } from '@/errors';

export class App {
  private readonly app: express.Express;

  constructor() {
    this.app = express();
  }

  setupEnvironment(): App {
    this.app.use(express.json());
    return this;
  }

  errorHandler(
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): express.Response {
    if (error instanceof GeneralError) {
      return res
        .status(error?.statusCode || 500)
        .json({ message: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  setupRoutes(): App {
    const router = express.Router();

    router.get('/', (_, res) => res.status(200).send(':)'));

    const routesPath = path.resolve(__dirname, './routes');
    readdirSync(routesPath).map(async file => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        (await import(`${routesPath}/${file}`)).default(router);
      }
    });

    this.app.use(router);
    this.app.use(this.errorHandler.bind(this));
    return this;
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      // TODO: create a json logger instance.
      console.log(`app listen on port ${port}`); // eslint-disable-line no-console
    });
  }
}

export default new App().setupEnvironment().setupRoutes();
