import 'reflect-metadata';
import { Logger } from 'pino';

import UserCreateRequest from './user-create-request';
import PostgreSQL from '../../infrastructure/postgre-sql';
import { IUser } from '../user';
import UserCreateHandler from './user-create-handler';

describe('UserCreateHandler', () => {
  describe('handle', () => {
    let createRequest: UserCreateRequest;

    beforeAll(() => {
      createRequest = new UserCreateRequest({
        email: 'user@example.com'
      });
    });

    describe('success', () => {
      let res: IUser;

      beforeAll(async () => {
        const mockedPostgreQuery = jest.fn(async () => Promise.resolve());

        const postGre = {
          query: mockedPostgreQuery
        };

        const handler = new UserCreateHandler(
          postGre as unknown as PostgreSQL,
          jest.fn() as unknown as Logger
        );

        res = await handler.handle(createRequest);
      });

      it('returns new user', () => {
        expect(res.id).toBeDefined();
        expect(res.email).toBe(createRequest.email);
        expect(res.consents.length).toEqual(0);
      });
    });

    describe('fail', () => {
      let loggerError: jest.Mock;
      let res: IUser;

      beforeAll(async () => {
        const mockedPostgreQuery = jest.fn(async () =>
          Promise.reject(new Error('duplicate email.'))
        );

        const postGre = {
          query: mockedPostgreQuery
        };

        loggerError = jest.fn();

        const logger = {
          error: loggerError
        };

        const handler = new UserCreateHandler(
          postGre as unknown as PostgreSQL,
          logger as unknown as Logger
        );

        res = await handler.handle(createRequest);
      });

      it('returns nothing', () => {
        expect(res).toBeUndefined();
      });

      it('logs error', () => {
        expect(loggerError).toHaveBeenCalled();
      });
    });
  });
});
