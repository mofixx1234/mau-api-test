import { ErrorRequestHandler } from 'express';

import { HttpException } from '../errors/http.exception';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpException) {
    response.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      details: error.details,
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
  });
};
