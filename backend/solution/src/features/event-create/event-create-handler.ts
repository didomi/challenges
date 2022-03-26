import { inject, injectable } from 'tsyringe';
import { Logger } from 'pino';

import handles from '../../infrastructure/handles';
import Handler from '../../infrastructure/handler';
import EventCreateRequest from './event-create-request';
import PostgreSQL from '../../infrastructure/postgre-sql';
import Id from '../../infrastructure/id';

@injectable()
@handles(EventCreateRequest)
export default class EventCreateHandler extends Handler<
  EventCreateRequest,
  boolean
> {
  constructor(
    private readonly _db: PostgreSQL,
    @inject('Logger') private readonly _logger: Logger
  ) {
    super();
  }

  async handle(request: EventCreateRequest): Promise<boolean> {
    return this._db.unit(async (unit) => {
      await unit.query('BEGIN');

      for (const consent of request.consents) {
        const id = Id.generate();

        try {
          await unit.query(
            'INSERT INTO "public"."events"(id, user_id, consent_id, created_at, enabled) VALUES($1, $2, $3, $4, $5)',
            [
              id,
              request.user.id,
              consent.id,
              new Date().toISOString(),
              consent.enabled
            ]
          );
        } catch (e) {
          this._logger.error(
            { error: e, event: request },
            // eslint-disable-next-line i18n-text/no-en
            'Event create error'
          );

          await unit.query('ROLLBACK');

          return false;
        }
      }

      await unit.query('COMMIT');

      return true;
    });
  }
}
