import { Request, Response, NextFunction } from 'express';
import {
  HTTP401Error,
  HTTP400Error,
  HTTP404Error,
} from '../../../utils/httpErrors';
import con from '../../mysql';
import dotenv from 'dotenv';
import { MysqlError } from 'mysql';

dotenv.config();

export const checkApiKey = (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const API_KEY = process.env.API_KEY as string;
  if (query.api_key === API_KEY) {
    next();
  } else {
    throw new HTTP401Error('api_key invalid');
  }
};

export const checkUsername = (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  if (query.username) {
    if (query.username.length > 2 && query.username.length < 17) {
      if (/^[a-zA-Z0-9_]+$/.test(query.username)) {
        next();
      } else {
        throw new HTTP400Error('usernameNotFound');
      }
    } else {
      throw new HTTP400Error('usernameNotFound');
    }
  } else {
    throw new HTTP400Error('usernameNotSpecifiedInQuery');
  }
};

export const checkCode = (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  if (query.code) {
    if (query.code.length === 8) {
      if (/^[a-z0-9]+$/.test(query.code)) {
        next();
      } else {
        throw new HTTP400Error('codeNotSpecified');
      }
    } else {
      throw new HTTP400Error('codeLengthNot8');
    }
  } else {
    throw new HTTP400Error('codeNotSpecified');
  }
};

export const checkExistsRedeemedCode = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const checkExistsRedeemedQuery =
    'SELECT * FROM `beta_keys` WHERE `beta_key`=' +
    con.escape(query.code) +
    ';';

  const { result }: { result: any } = await new Promise((resolve, reject) => {
    con.query(checkExistsRedeemedQuery, (err: MysqlError, result: any) => {
      resolve({ result });
    });
  });

  if (result.length === 0) {
    throw new HTTP404Error('codeNotFound');
  }

  if (result[0].used_by) {
    throw new HTTP400Error('codeAlreadyRedeemed');
  }

  next();
};

export const checkUserAlreadyRedeemed = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = res.locals.mcApi.uuid;

  const checkUserAlreadyRedeemedQuery =
    'SELECT * FROM `beta_keys` WHERE `used_by`=' + con.escape(uuid);

  const { result }: { result: any } = await new Promise((resolve, reject) => {
    con.query(checkUserAlreadyRedeemedQuery, (err: MysqlError, result: any) => {
      resolve({ result });
    });
  });

  if (result.length !== 0) {
    throw new HTTP400Error('userAlreadyRedeemedBetaCode');
  }

  next();
};
