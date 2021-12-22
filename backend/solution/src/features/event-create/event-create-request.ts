import Joi from 'joi';

import Request from '../../infrastructure/request';
import Consents from '../../consents';

export default class EventCreateRequest extends Request {
  user: {
    id: string;
  };
  consents: {
    id: string;
    enabled: boolean;
  }[];
}

export const eventCreateRequestSchema = Joi.object({
  user: Joi.object({
    id: Joi.string().required().uuid()
  }).required(),
  consents: Joi.array()
    .items(
      Joi.object({
        id: Joi.string()
          .required()
          .valid(...Object.values(Consents)),
        enabled: Joi.bool().required()
      })
    )
    .required()
    .min(1)
});
