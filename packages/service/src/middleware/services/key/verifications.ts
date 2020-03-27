import { Request, Response, NextFunction } from 'express';
import { HTTP500Error, HTTP404Error } from '../../../utils/httpErrors';
import minecraftApi from '../../minecraftApi';
import { AxiosError, AxiosResponse } from 'axios';

export const verifyUsername = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const { error }: { error: AxiosError } = await new Promise(resolve => {
    minecraftApi
      .get(query.username)
      .then((response: AxiosResponse) => {
        res.locals.mcApi = response.data;
        next();
      })
      .catch((error: AxiosError) => {
        resolve({ error });
      });
  });

  if (error.response?.status === 404) {
    throw new HTTP404Error('usernameNotFound');
  } else {
    throw new HTTP500Error('serviceUnavailable');
  }
};
