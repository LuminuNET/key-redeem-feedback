import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { basePath } from '../../middleware/common';

dotenv.config();

export = [
  {
    path: `${basePath}/sample`,
    method: 'get',
    handler: [
      async ({}: Request, res: Response) => {
        const result = { is: 'working' };
        res.status(200).send(result);
      },
    ],
  },
];
