import { injectAll, injectable, registry } from 'tsyringe';

import Handler from './handler';
import Request from './request';

import UserCreateHandler from '../features/user-create/user-create-handler';
import UserDeleteHandler from '../features/user-delete/user-delete-handler';
import UserGetHandler from '../features/user-get/user-get-handler';
import EventCreateHandler from '../features/event-create/event-create-handler';

const registrations = [
  UserCreateHandler,
  UserDeleteHandler,
  UserGetHandler,
  EventCreateHandler
].map((c) => ({
  token: 'Handler',
  useClass: c
}));

@injectable()
@registry(registrations)
export default class Mediator {
  private readonly _map = new Map<string, Handler<unknown, unknown>>();

  constructor(@injectAll('Handler') handlers: Handler<unknown, unknown>[]) {
    for (const handler of handlers) {
      const type = handler.constructor.prototype.__REQUEST_TYPE__;
      this._map.set(type, handler);
    }
  }

  async send<TResult, TRequest extends Request>(
    request: TRequest
  ): Promise<TResult> {
    const handler = this._map.get(request.constructor.name);

    const res = await handler.handle(request);

    return res as TResult;
  }
}
