import { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    statusCode: 404,
    message: `Cannot ${request.method} ${request.originalUrl}`,
  });
};
