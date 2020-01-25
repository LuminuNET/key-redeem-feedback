import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = (router: Router) => void;

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: Handler | Handler[];
}

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    (handler as Handler[]).unshift(setJson);
    router[method](path, handler);
  }
};

const setJson = async (req: Request, res: Response, next: NextFunction) => {
  res.type('application/json');
  next();
};
