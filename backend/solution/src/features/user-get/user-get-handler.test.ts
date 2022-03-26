import 'reflect-metadata';

import UserGetRequest from './user-get-request';
import Id from '../../infrastructure/id';
import PostgreSQL from '../../infrastructure/postgre-sql';
import { IUser } from '../user';
import Consents from '../../consents';
import UserGetHandler from './user-get-handler';

describe('UserGetHandler', () => {
  describe('handle', () => {
    let getRequest: UserGetRequest;

    beforeAll(() => {
      getRequest = new UserGetRequest({
        id: Id.generate()
      });
    });

    describe('existent', () => {
      const EMAIL = 'user@example.com';

      let res: IUser;

      beforeAll(async () => {
        const mockedPostgreQuery = jest.fn();

        mockedPostgreQuery.mockReturnValueOnce(
          Promise.resolve({
            rows: [
              {
                id: getRequest.id,
                email: EMAIL
              }
            ]
          })
        );

        mockedPostgreQuery.mockReturnValueOnce(
          Promise.resolve({
            rows: [
              {
                // eslint-disable-next-line camelcase
                consent_id: Consents.email,
                enabled: true
              },
              {
                // eslint-disable-next-line camelcase
                consent_id: Consents.sms,
                enabled: false
              }
            ]
          })
        );

        const postGre = {
          query: mockedPostgreQuery
        };

        const handler = new UserGetHandler(postGre as unknown as PostgreSQL);

        res = await handler.handle(getRequest);
      });

      it('returns matching user', () => {
        expect(res.id).toBeDefined();
        expect(res.email).toBe(EMAIL);
        expect(res.consents[0].id).toEqual(Consents.email);
        expect(res.consents[0].enabled).toEqual(true);
        expect(res.consents[1].id).toEqual(Consents.sms);
        expect(res.consents[1].enabled).toEqual(false);
      });
    });

    describe('non-existent', () => {
      let res: IUser;

      beforeAll(async () => {
        const mockedPostgreQuery = jest.fn();

        mockedPostgreQuery.mockReturnValueOnce(
          Promise.resolve({
            rows: []
          })
        );

        const postGre = {
          query: mockedPostgreQuery
        };

        const handler = new UserGetHandler(postGre as unknown as PostgreSQL);

        res = await handler.handle(getRequest);
      });

      it('returns nothing', () => {
        expect(res).toBeUndefined();
      });
    });
  });
});
