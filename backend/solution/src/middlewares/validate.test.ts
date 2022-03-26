import Joi from 'joi';

import { Request, Response } from 'express';

import validate from './validate';

describe('validate', () => {
  const schema = Joi.object({
    attr: Joi.string().required()
  });

  const func = validate(schema);

  describe('passes', () => {
    let mockedNext: jest.Mock;

    beforeAll(() => {
      mockedNext = jest.fn();

      const req = {
        body: { attr: 'an attribute' }
      };

      func(req as Request, {} as Response, mockedNext);
    });

    it('calls next', () => {
      expect(mockedNext).toHaveBeenCalled();
    });
  });

  describe('fails', () => {
    let mockedResponseSend: jest.Mock;
    let mockedResponseStatus: jest.Mock;

    beforeAll(() => {
      mockedResponseSend = jest.fn();
      mockedResponseStatus = jest.fn(() => ({ send: mockedResponseSend }));

      const res = {
        status: mockedResponseStatus,
        send: mockedResponseSend
      };

      const req = {
        body: {}
      };

      func(req as Request, res as unknown as Response, undefined);
    });

    it('sends error', () => {
      expect(mockedResponseStatus).toHaveBeenCalledWith(422);
      expect(mockedResponseSend).toHaveBeenCalled();
    });
  });
});
