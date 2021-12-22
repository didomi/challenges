import { inject, injectable } from 'tsyringe';
import { Logger } from 'pino';

import handles from '../../infrastructure/handles';
import Handler from '../../infrastructure/handler';
import UserCreateRequest from './user-create-request';
import { IUser } from '../user';
import PostgreSQL from '../../infrastructure/postgre-sql';
import Id from '../../infrastructure/id';

@injectable()
@handles(UserCreateRequest)
export default class UserCreateHandler extends Handler<
  UserCreateRequest,
  IUser
> {
  constructor(
    private readonly _db: PostgreSQL,
    @inject('Logger') private readonly _logger: Logger
  ) {
    super();
  }

  async handle(request: UserCreateRequest): Promise<IUser> {
    const id = Id.generate();

    try {
      await this._db.query(
        'INSERT INTO "public"."users"(id, email) VALUES($1, $2)',
        [id, request.email]
      );

      return {
        id,
        email: request.email,
        consents: []
      };
    } catch (e) {
      this._logger.error(
        { error: e, email: request.email },
        // eslint-disable-next-line i18n-text/no-en
        'User create error'
      );
      return undefined;
    }
  }
}
