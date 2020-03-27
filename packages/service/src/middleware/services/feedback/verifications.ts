import { Request, Response, NextFunction } from 'express';
import { HTTP401Error, HTTP400Error } from '../../../utils/httpErrors';
import { Redis } from '@luminu/core';
import con from '../../mysql';
import { MysqlError } from 'mysql';
import { Category } from '../../../types/category';

const { getRedis } = Redis;

export const verifyKey = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const redis = getRedis();

  const result = await redis.hget('feedback', query.key);

  // need to specifically check if the result is null, as the uid (the result) might be 0
  if (result === null) {
    throw new HTTP401Error('keyInvalid');
  }

  const sqlQuery = `SELECT COUNT(*) FROM \`feedback_used\` WHERE \`uid\`=${con.escape(
    result
  )}`;

  // check if the uid has already given feedback
  const count: number = await new Promise(resolve => {
    con.query(sqlQuery, (err: MysqlError, result: number) => resolve(result));
  });

  if (count === 1) {
    throw new HTTP401Error('alreadyGivenFeedback');
  }

  res.locals.uid = result;

  next();
};

export const verifyAnswers = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  const answers: Category[] = body.answers;
  // console.log(JSON.stringify(body.answers));
  let isInvalid = false;

  answers.some(category => {
    category.questions.some(question => {
      switch (question.type) {
        case 'custom':
          // check if given custom is in customs array
          // we can check from the customs array in the answers
          // as this method is called after checkAnswers
          if (
            question.customs.indexOf(question.value) === -1 &&
            question.value !== ''
          ) {
            isInvalid = true;
          }
          break;
        case 'number':
          if (
            (+question.value < 1 || +question.value > 5) &&
            question.value !== ''
          ) {
            isInvalid = true;
          }
          break;
        case 'text':
          if (question.value.length > 1024 && question.value !== '') {
            isInvalid = true;
          }
          break;
      }

      return isInvalid;
    });
    return isInvalid;
  });

  if (isInvalid) {
    throw new HTTP400Error('illegalAnswers');
  }

  next();
};
