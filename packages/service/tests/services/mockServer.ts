import express, { Express } from 'express';
import { applyMiddleware, applyRoutes, Route } from '../../src/utils';
import middleware from '../../src/middleware';
import routes from '../../src/services/sample/routes';
import errorHandlers from '../../src/middleware/errorHandlers';

export const mockServer = (): Express => {
  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes as Route[], router);
  applyMiddleware(errorHandlers, router);

  return router;
};
