import 'reflect-metadata';

import { Request, Response } from 'express';

import Id from '../infrastructure/id';
import { IUser } from '../features/user';
import UserCreateRequest from '../features/user-create/user-create-request';
import UserDeleteRequest from '../features/user-delete/user-delete-request';
import UserGetRequest from '../features/user-get/user-get-request';

import Mediator from '../infrastructure/mediator';
import UsersController from './users-controller';

describe('UsersController', () => {
  const EMAIL = 'user@example.com';

  describe('create', () => {
    describe('new', () => {
      const user: IUser = {
        id: Id.generate(),
        email: EMAIL,
        consents: []
      };

      let mockedResponseSend: jest.Mock;
      let mockedResponseStatus: jest.Mock;
      let createRequest: UserCreateRequest;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve(user)
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new UsersController(mediator as unknown as Mediator);

        const req = {
          body: {
            email: EMAIL
          }
        };

        mockedResponseSend = jest.fn();
        mockedResponseStatus = jest.fn(() => ({ send: mockedResponseSend }));

        const res = {
          status: mockedResponseStatus,
          send: mockedResponseSend
        };

        await controller.create(req as Request, res as unknown as Response);
        createRequest = mockedMediatorSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(createRequest).toBeInstanceOf(UserCreateRequest);
      });

      it('returns created', () => {
        expect(mockedResponseStatus).toHaveBeenCalledWith(201);
      });

      it('sends user', () => {
        expect(mockedResponseSend).toHaveBeenCalledWith(user);
      });
    });

    describe('existent', () => {
      let mockedResponseSend: jest.Mock;
      let mockedResponseStatus: jest.Mock;
      let createRequest: UserCreateRequest;
      let response;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve()
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new UsersController(mediator as unknown as Mediator);

        const req = {
          body: {
            email: EMAIL
          }
        };

        mockedResponseSend = jest.fn();
        mockedResponseStatus = jest.fn(() => ({ send: mockedResponseSend }));

        const res = {
          status: mockedResponseStatus,
          send: mockedResponseSend
        };

        await controller.create(req as Request, res as unknown as Response);
        createRequest = mockedMediatorSend.mock.calls[0][0];
        response = mockedResponseSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(createRequest).toBeInstanceOf(UserCreateRequest);
      });

      it('returns unprocessable entity', () => {
        expect(mockedResponseStatus).toHaveBeenCalledWith(422);
      });

      it('sends error', () => {
        expect(response.errors).toBeDefined();
      });
    });
  });

  describe('delete', () => {
    let mockedResponseEnd: jest.Mock;
    let mockedResponseStatus: jest.Mock;
    let deleteRequest: UserDeleteRequest;

    beforeAll(async () => {
      const mockedMediatorSend: jest.Mock = jest.fn(async () =>
        Promise.resolve()
      );

      const mediator = {
        send: mockedMediatorSend
      };

      const controller = new UsersController(mediator as unknown as Mediator);

      const req = {
        params: {
          id: Id.generate()
        }
      };

      mockedResponseEnd = jest.fn();
      mockedResponseStatus = jest.fn(() => ({ end: mockedResponseEnd }));

      const res = {
        status: mockedResponseStatus,
        end: mockedResponseEnd
      };

      await controller.delete(
        req as unknown as Request,
        res as unknown as Response
      );
      deleteRequest = mockedMediatorSend.mock.calls[0][0];
    });

    it('uses mediator', () => {
      expect(deleteRequest).toBeInstanceOf(UserDeleteRequest);
    });

    it('returns no content', () => {
      expect(mockedResponseStatus).toHaveBeenCalledWith(204);
    });

    it('sends no response', () => {
      expect(mockedResponseEnd).toHaveBeenCalled();
    });
  });

  describe('detail', () => {
    describe('existent', () => {
      const user: IUser = {
        id: Id.generate(),
        email: EMAIL,
        consents: []
      };

      let mockedResponseSend: jest.Mock;
      let getRequest: UserGetRequest;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve(user)
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new UsersController(mediator as unknown as Mediator);

        const req = {
          params: {
            id: Id.generate()
          }
        };

        mockedResponseSend = jest.fn();

        const res = {
          send: mockedResponseSend
        };

        await controller.detail(
          req as unknown as Request,
          res as unknown as Response
        );
        getRequest = mockedMediatorSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(getRequest).toBeInstanceOf(UserGetRequest);
      });

      it('sends user', () => {
        expect(mockedResponseSend).toHaveBeenCalledWith(user);
      });
    });

    describe('non-existent', () => {
      let mockedResponseEnd: jest.Mock;
      let mockedResponseStatus: jest.Mock;
      let getRequest: UserGetRequest;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve()
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new UsersController(mediator as unknown as Mediator);

        const req = {
          params: {
            id: Id.generate()
          }
        };

        mockedResponseEnd = jest.fn();
        mockedResponseStatus = jest.fn(() => ({ end: mockedResponseEnd }));

        const res = {
          status: mockedResponseStatus,
          end: mockedResponseEnd
        };

        await controller.detail(
          req as unknown as Request,
          res as unknown as Response
        );
        getRequest = mockedMediatorSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(getRequest).toBeInstanceOf(UserGetRequest);
      });

      it('returns not found', () => {
        expect(mockedResponseStatus).toHaveBeenCalledWith(404);
      });

      it('sends no response', () => {
        expect(mockedResponseEnd).toHaveBeenCalled();
      });
    });
  });
});
