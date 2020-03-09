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
import { basePath } from '../../middleware/common';

const { delUser } = Redis;

export default [
  {
    path: `${basePath}/redeem`,
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
    path: `${basePath}/generate/:amount`,
    method: 'post',
    handler: [
      checkApiKey,
      async ({ params }: Request, res: Response) => {
        const result = await generateKeys(+params.amount);
        res.status(200).send(result);
      },
    ],
  },
];
