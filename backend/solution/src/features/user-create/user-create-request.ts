import Joi from 'joi';

import Request from '../../infrastructure/request';

export default class UserCreateRequest extends Request {
  email: string;
}

export const userCreateRequestSchema = Joi.object({
  email: Joi.string().required().email().max(128).lowercase().trim()
});
