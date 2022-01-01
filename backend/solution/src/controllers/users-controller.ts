import { injectable } from 'tsyringe';

import { Request, Response } from 'express';

import Mediator from '../infrastructure/mediator';
import UserCreateRequest from '../features/user-create/user-create-request';
import UserDeleteRequest from '../features/user-delete/user-delete-request';
import UserGetRequest from '../features/user-get/user-get-request';
import { IUser } from '../features/user';

@injectable()
export default class UsersController {
  constructor(private readonly _mediator: Mediator) {}

  async create(req: Request, res: Response): Promise<void> {
    const request = new UserCreateRequest(req.body);

    const result = await this._mediator.send<IUser, UserCreateRequest>(request);

    if (!result) {
      res.status(422).json({ errors: ['Email already exists!'] });
      return;
    }

    res.status(201).json(result);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const request = new UserDeleteRequest({
      id: req.params.id
    });

    await this._mediator.send<void, UserDeleteRequest>(request);

    res.status(204).end();
  }

  async detail(req: Request, res: Response): Promise<void> {
    const request = new UserGetRequest({
      id: req.params.id
    });

    const result = await this._mediator.send<IUser, UserGetRequest>(request);

    if (!result) {
      res.status(404).end();
      return;
    }

    res.json(result);
  }
}
