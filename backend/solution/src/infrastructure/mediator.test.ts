import 'reflect-metadata';
import { injectable } from 'tsyringe';

import Mediator from './mediator';
import Request from './request';
import Handler from './handler';
import handles from './handles';

interface ITestResult {
  attr: string;
}

class TestRequest extends Request {
  attr: string;
}

@injectable()
@handles(TestRequest)
class TestHandler extends Handler<TestRequest, ITestResult> {
  async handle(request: TestRequest): Promise<ITestResult> {
    return Promise.resolve({ attr: request.attr });
  }
}

describe('Mediator', () => {
  describe('send', () => {
    let request: TestRequest;
    let result: ITestResult;

    beforeAll(async () => {
      const handler = new TestHandler();

      request = new TestRequest({
        attr: 'foo'
      });

      const mediator = new Mediator([handler]);
      result = await mediator.send(request);
    });

    it('executes matching handler', () => {
      expect(result.attr).toBe(request.attr);
    });
  });
});
