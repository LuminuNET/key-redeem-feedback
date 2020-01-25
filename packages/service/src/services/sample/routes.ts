import { Request, Response } from 'express';

const basePath = `${process.env.BASE_PATH}/v1`;

export = [
  {
    path: `${basePath}/sample`,
    method: 'put',
    handler: [
      async ({ query, ip }: Request, res: Response) => {
        const result = {};
        res.status(200).send(result);
      },
    ],
  },
];
