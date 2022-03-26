import 'reflect-metadata';

import { Request, Response } from 'express';

import Consents from '../consents';
import Id from '../infrastructure/id';
import EventCreateRequest from '../features/event-create/event-create-request';

import Mediator from '../infrastructure/mediator';
import EventsController from './events-controller';

describe('EventsController', () => {
  const body = {
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
  };

  describe('create', () => {
    describe('success', () => {
      let mockedResponseEnd: jest.Mock;
      let mockedResponseStatus: jest.Mock;
      let createRequest: EventCreateRequest;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve(true)
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new EventsController(
          mediator as unknown as Mediator
        );

        const req = {
          body
        };

        mockedResponseEnd = jest.fn();
        mockedResponseStatus = jest.fn(() => ({ end: mockedResponseEnd }));

        const res = {
          status: mockedResponseStatus
        };

        await controller.create(
          req as unknown as Request,
          res as unknown as Response
        );

        createRequest = mockedMediatorSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(createRequest).toBeInstanceOf(EventCreateRequest);
      });

      it('returns http status code created', () => {
        expect(mockedResponseStatus).toHaveBeenCalledWith(201);
      });

      it('sends no response', () => {
        expect(mockedResponseEnd).toHaveBeenCalled();
      });
    });

    describe('fail', () => {
      let mockedResponseEnd: jest.Mock;
      let mockedResponseStatus: jest.Mock;
      let createRequest: EventCreateRequest;

      beforeAll(async () => {
        const mockedMediatorSend: jest.Mock = jest.fn(async () =>
          Promise.resolve(false)
        );

        const mediator = {
          send: mockedMediatorSend
        };

        const controller = new EventsController(
          mediator as unknown as Mediator
        );

        const req = {
          body
        };

        mockedResponseEnd = jest.fn();
        mockedResponseStatus = jest.fn(() => ({ end: mockedResponseEnd }));

        const res = {
          status: mockedResponseStatus
        };

        await controller.create(
          req as unknown as Request,
          res as unknown as Response
        );

        createRequest = mockedMediatorSend.mock.calls[0][0];
      });

      it('uses mediator', () => {
        expect(createRequest).toBeInstanceOf(EventCreateRequest);
      });

      it('returns http status code unprocessable entity', () => {
        expect(mockedResponseStatus).toHaveBeenCalledWith(422);
      });

      it('sends no response', () => {
        expect(mockedResponseEnd).toHaveBeenCalled();
      });
    });
  });
});
