import { Request, Response } from 'express';
import {
  checkApiKey,
  checkUsername,
  checkCode,
  verifyUsername,
  checkExistsRedeemedCode,
  checkUserAlreadyRedeemed,
  checkTooManyRequests,
} from '../../middleware/checks';
import generateKeys from './generateKeys';
import redeemCode from './redeemCode';
import { Redis } from '@luminu/core';

const { delUser } = Redis;

export default [
  {
    path: '/api/v1/redeem',
    method: 'put',
    handler: [
      checkUsername,
      checkCode,
      verifyUsername,
      checkTooManyRequests,
      checkExistsRedeemedCode,
      checkUserAlreadyRedeemed,
      async ({ query, ip }: Request, res: Response) => {
        await delUser('redeem', ip);
        const result = await redeemCode(res.locals.mcApi.uuid, query.code);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: '/api/v1/generate/:amount',
    method: 'post',
    handler: [
      checkApiKey,
      async ({ params }: Request, res: Response) => {
        const result = await generateKeys(parseInt(params.amount));
        res.status(200).send(result);
      },
    ],
  },
];
