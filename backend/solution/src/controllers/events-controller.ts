import { injectable } from 'tsyringe';

import { Request, Response } from 'express';

import Mediator from '../infrastructure/mediator';
import EventCreateRequest from '../features/event-create/event-create-request';

@injectable()
export default class EventsController {
  constructor(private readonly _mediator: Mediator) {}

  async create(req: Request, res: Response): Promise<void> {
    const request = new EventCreateRequest(req.body);

    const success = await this._mediator.send<boolean, EventCreateRequest>(
      request
    );

    res.status(success ? 201 : 422).end();
  }
}
