import 'reflect-metadata';
import { Logger } from 'pino';

import UserDeleteRequest from './user-delete-request';
import Id from '../../infrastructure/id';
import PostgreSQL from '../../infrastructure/postgre-sql';
import UserDeleteHandler from './user-delete-handler';

describe('UserDeleteHandler', () => {
  describe('handle', () => {
    let deleteRequest: UserDeleteRequest;

    beforeAll(() => {
      deleteRequest = new UserDeleteRequest({
        id: Id.generate()
      });
    });

    describe('success', () => {
      let mockedPostgreQuery: jest.Mock;

      beforeAll(async () => {
        mockedPostgreQuery = jest.fn(async () => Promise.resolve());

        const postGre = {
          unit: (func) => func({ query: mockedPostgreQuery })
        };

        const handler = new UserDeleteHandler(
          postGre as unknown as PostgreSQL,
          jest.fn() as unknown as Logger
        );

        await handler.handle(deleteRequest);
      });

      it('begins transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('BEGIN');
      });

      it('commits transaction', () => {
        expect(mockedPostgreQuery).toHaveBeenCalledWith('COMMIT');
      });
    });

    describe('fail', () => {
      let mockedPostgreQuery: jest.Mock;
      let loggerError: jest.Mock;

      beforeAll(async () => {
        mockedPostgreQuery = jest.fn();

        mockedPostgreQuery
          .mockReturnValueOnce(Promise.resolve())
          .mockReturnValueOnce(Promise.resolve())
          .mockReturnValueOnce(Promise.reject(new Error('ERROR')));

        const postGre = {
          unit: (func) => func({ query: mockedPostgreQuery })
        };

        loggerError = jest.fn();

        const logger = {
          error: loggerError
        };

        const handler = new UserDeleteHandler(
          postGre as unknown as PostgreSQL,
          logger as unknown as Logger
        );

        await handler.handle(deleteRequest);
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
    });
  });
});
