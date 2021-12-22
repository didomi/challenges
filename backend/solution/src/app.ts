import { resolve } from 'path';
import { readFileSync } from 'fs';

import 'reflect-metadata';
import Pino from 'pino';

import * as pg from 'pg';
import { container } from 'tsyringe';
import express from 'express';

import UsersController from './controllers/users-controller';
import EventsController from './controllers/events-controller';

import userRouter from './routes/users-router';
import eventsRouter from './routes/events-router';
import PostgreSQL from './infrastructure/postgre-sql';

const logger = Pino();

(() => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    require('dotenv').config();
  }

  const pool = new pg.Pool();
  container.register('PGPool', { useValue: pool });

  container.register('Logger', { useValue: logger });
})();

const app = express();
app.disable('x-powered-by');

app.use(
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  require('express-pino-logger')({
    logger
  })
);

app.use(express.json());

app.use('/users', userRouter(container.resolve(UsersController)));
app.use('/events', eventsRouter(container.resolve(EventsController)));

app.get('/', (_, res) => {
  res.send({
    result: 'ok',
    timestamp: new Date().toISOString()
  });
});

(async () => {
  const start = Date.now();
  let check = true;

  while (check) {
    try {
      const c = new pg.Client();
      await c.connect();
      await c.end();
      check = false;
    } catch (e) {
      if (Date.now() - start >= 1000 * 10) {
        logger.fatal(
          'failed to connect to postgres server even after retrying for 10 seconds'
        );
        process.exit(1);
      }
    }
  }

  const schema = readFileSync(resolve(__dirname, 'schema.sql'), 'utf-8');
  await container.resolve(PostgreSQL).query(schema);

  app.listen(process.env.PORT, () => {
    logger.info('API Started');
  });
})();
