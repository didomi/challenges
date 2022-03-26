import { injectable } from 'tsyringe';

import handles from '../../infrastructure/handles';
import Handler from '../../infrastructure/handler';
import UserGetRequest from './user-get-request';
import { IConsent, IUser } from '../user';
import PostgreSQL from '../../infrastructure/postgre-sql';
import Consents from '../../consents';

@injectable()
@handles(UserGetRequest)
export default class UserGetHandler extends Handler<UserGetRequest, IUser> {
  constructor(private readonly _db: PostgreSQL) {
    super();
  }

  async handle(request: UserGetRequest): Promise<IUser> {
    const usersResult = await this._db.query(
      'SELECT id, email from "public"."users" WHERE id = $1',
      [request.id]
    );

    if (!usersResult.rows.length) {
      return undefined;
    }

    const user: IUser = {
      id: usersResult.rows[0]['id'],
      email: usersResult.rows[0]['email'],
      consents: []
    };

    const consents = Object.values(Consents);

    const consentSQL = consents
      .map(
        (_, index: number) =>
          `SELECT consent_id, enabled FROM "public"."events" WHERE user_id = $1 AND consent_id = $${
            index + 2
          } ORDER BY created_at DESC LIMIT 1`
      )
      .reduce((a, c) => {
        if (!a) {
          return `(${c})`;
        }

        return `${a} UNION ALL (${c})`;
      }, '');

    const eventsResult = await this._db.query(consentSQL, [
      request.id,
      ...consents
    ]);

    user.consents = eventsResult.rows.map((row) => {
      return {
        id: row['consent_id'] as string,
        enabled: row['enabled'] as boolean
      } as IConsent;
    });

    return user;
  }
}
