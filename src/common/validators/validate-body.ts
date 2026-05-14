import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';

import { BadRequestException } from '../errors/http.exception';

export const validateBody = (schema: ZodTypeAny): RequestHandler => {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      next(new BadRequestException('Validation failed', result.error.flatten()));
      return;
    }

    request.body = result.data;
    next();
  };
};
