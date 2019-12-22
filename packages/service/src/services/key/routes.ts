import { Request, Response } from 'express';
import {
	checkApiKey,
	checkUsername,
	checkCode,
	verifyUsername,
	checkExistsRedeemedCode,
	checkUserAlreadyRedeemed
} from '../../middleware/checks';
import generateKeys from './generateKeys';
import redeemCode from './redeemCode';

export default [
	{
		path: '/api/v1/redeem',
		method: 'put',
		handler: [
			checkUsername,
			checkCode,
			verifyUsername,
			checkExistsRedeemedCode,
			checkUserAlreadyRedeemed,
			async ({ query }: Request, res: Response) => {
				const result = await redeemCode(query.username, query.code);
				res.status(200).send(result);
			}
		]
	},
	{
		path: '/api/v1/generate/:amount',
		method: 'post',
		handler: [
			checkApiKey,
			async ({ params }: Request, res: Response) => {
				const result = await generateKeys(parseInt(params.amount));
				res.status(200).send(result);
			}
		]
	}
];
