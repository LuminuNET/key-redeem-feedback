import { Request, Response, NextFunction } from 'express';
import con from '../../mysql';
import { MysqlError } from 'mysql';
import { Category } from '../../../types/category';
import { Redis } from '@luminu/core';
import LuminuBuffer from '@luminu/core/src/common/buffer.service';
import { HTTP500Error } from '../../../utils/httpErrors';

const { getRedis } = Redis;

export const expireToken = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const redis = getRedis();
  const key = query.key;

  await redis.hdel('feedback', key);

  const sqlQuery = `INSERT INTO \`feedback_used\` (\`uid\`, \`token\`) VALUES (${con.escape(
    res.locals.uid
  )}, ${con.escape(key)})`;

  await new Promise((resolve) =>
    con.query(sqlQuery, (err: MysqlError, result: null) => resolve())
  );

  next();
};

export const saveAnswers = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  const answers = body.answers;

  const filteredAnswers = (answers as Category[]).map((category) => {
    delete category.translations;

    const questions = category.questions.map((question) => {
      return {
        name: question.name,
        value: question.value,
      };
    });

    return {
      ...category,
      questions,
    };
  });

  const sqlQuery = `INSERT INTO \`feedback_entries\` (\`id\`, \`categories\`) VALUES (NULL, ${con.escape(
    JSON.stringify(filteredAnswers)
  )});`;

  await new Promise((resolve) =>
    con.query(sqlQuery, (err: MysqlError, result: null) => resolve())
  );

  next();
};

export const giveReward = async (
  {}: Request,
  res: Response,
  next: NextFunction
) => {
  const redis = getRedis();
  await redis.sadd('feedback_entered', res.locals.uid);

  await Redis.publishBinary(
    'WEB',
    'FeedbackEntered',
    new LuminuBuffer().buffer,
    (err: Error, res: number) => {
      if (err) {
        throw new HTTP500Error('serviceUnavailable');
      }
    }
  );

  next();
};
