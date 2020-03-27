import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../../../utils/httpErrors';
import { Redis } from '@luminu/core';

const { incrUser } = Redis;

export const checkTooManyRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const amount = await incrUser('redeem', req.ip);

  if (+(amount + '') > 34) {
    throw new HTTP400Error('tooManyRequestsAtOnce');
  }

  next();
};
