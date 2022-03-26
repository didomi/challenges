import 'reflect-metadata';
import { Logger } from 'pino';

import EventCreateRequest from './event-create-request';
import Id from '../../infrastructure/id';
import Consents from '../../consents';
import PostgreSQL from '../../infrastructure/postgre-sql';
import EventCreateHandler from './event-create-handler';

describe('EventCreateHandler', () => {
  describe('handle', () => {
    let createRequest: EventCreateRequest;

    beforeAll(() => {
      createRequest = new EventCreateRequest({
        user: {
          id: Id.generate()
        },
        consents: [
          {
            id: Consents.email,
            enabled: true
          },
          {
            id: Consents.sms,
            enabled: false
          }
        ]
      });
    });

    describe('success', () => {
      let mockedPostgreQuery: jest.Mock;
      let res: boolean;

      beforeAll(async () => {
        mockedPostgreQuery = jest.fn(async () => Promise.resolve());

        const postGre = {
          unit: (func) => func({ query: mockedPostgreQuery })
        };

        const handler = new EventCreateHandler(
          postGre as unknown as PostgreSQL,
          jest.fn() as unknown as Logger
        );

        res = await handler.handle(createRequest);
      });

      it('begins transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('BEGIN');
      });

      it('commits transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('COMMIT');
      });

      it('returns success', () => {
        expect(res).toEqual(true);
      });
    });

    describe('fail', () => {
      let mockedPostgreQuery: jest.Mock;
      let loggerError: jest.Mock;
      let res: boolean;

      beforeAll(async () => {
        mockedPostgreQuery = jest.fn();

        mockedPostgreQuery
          .mockReturnValueOnce(Promise.resolve())
          .mockReturnValueOnce(Promise.resolve())
          .mockReturnValueOnce(Promise.reject(new Error('ERROR')))
          .mockReturnValueOnce(Promise.resolve());

        const postGre = {
          unit: (func) => func({ query: mockedPostgreQuery })
        };

        loggerError = jest.fn();

        const logger = {
          error: loggerError
        };

        const handler = new EventCreateHandler(
          postGre as unknown as PostgreSQL,
          logger as unknown as Logger
        );

        res = await handler.handle(createRequest);
      });

      it('begins transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('BEGIN');
      });

      it('rollbacks transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('ROLLBACK');
      });

      it('logs error', () => {
        expect(loggerError).toHaveBeenCalled();
      });

      it('returns fail', () => {
        expect(res).toEqual(false);
      });
    });
  });
});
