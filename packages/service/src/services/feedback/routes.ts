import { Request, Response } from 'express';
import { basePath } from '../../middleware/common';
import { categories } from '../../middleware/categories';

import {
  checkKey,
  checkAnswers,
} from '../../middleware/services/feedback/checks';
import {
  verifyKey,
  verifyAnswers,
} from '../../middleware/services/feedback/verifications';
import {
  expireToken,
  saveAnswers,
  giveReward,
} from '../../middleware/services/feedback/functions';

export default [
  {
    path: `${basePath}/categories`,
    method: 'get',
    handler: [
      checkKey,
      verifyKey,
      async (req: Request, res: Response) => {
        res.status(200).json(categories);
      },
    ],
  },
  {
    path: `${basePath}/answers`,
    method: 'post',
    handler: [
      checkKey,
      verifyKey,
      checkAnswers,
      verifyAnswers,
      expireToken,
      saveAnswers,
      giveReward,
      async (req: Request, res: Response) => {
        res.status(200).json({ message: 'successfullyEnteredQuestions' });
      },
    ],
  },
];
