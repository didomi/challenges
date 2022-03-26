import { Schema } from 'joi';

import { NextFunction, Request, Response } from 'express';

export default function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { value, error } = schema.validate(req.body);

    if (error) {
      res.status(422).send({
        errors: error.details.map((d) => d.message)
      });
      return;
    }

    req.body = value;
    next();
  };
}
