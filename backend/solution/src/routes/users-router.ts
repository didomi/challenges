import express, { Request, Response, Router } from 'express';

import UsersController from '../controllers/users-controller';
import { userCreateRequestSchema } from '../features/user-create/user-create-request';
import validate from '../middlewares/validate';

export default function usersRouter(controller: UsersController): Router {
  const router = express.Router();

  router.post(
    '/',
    validate(userCreateRequestSchema),
    async (req: Request, res: Response) => controller.create(req, res)
  );

  router.delete('/:id', async (req: Request, res: Response) =>
    controller.delete(req, res)
  );

  router.get('/:id', async (req: Request, res: Response) =>
    controller.detail(req, res)
  );

  return router;
}
