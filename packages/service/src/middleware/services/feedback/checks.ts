import { Request, Response, NextFunction } from 'express';
import { HTTP401Error, HTTP400Error } from '../../../utils/httpErrors';
import { Category } from '../../../types/category';
import { categories } from '../../categories';

export const checkKey = async (
  { query }: Request,
  res: Response,
  next: NextFunction
) => {
  const key = query.key;

  if (key.length !== 6) {
    throw new HTTP401Error('keyInvalid');
  } else if (!/^[a-z0-9]+$/.test(key)) {
    // need to seperate the key length check and regex check
    // to prevent a regex dos attack
    throw new HTTP401Error('keyInvalid');
  }

  next();
};

export const checkAnswers = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  // need to make a deep copy of the array as it's values are being mutated
  const answers: Category[] = JSON.parse(JSON.stringify(body.answers));

  // set values of all answers to an empty string, to compare them with the categories
  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < answers[i].questions.length; j++) {
      answers[i].questions[j].value = '';
    }
  }

  if (JSON.stringify(answers) !== JSON.stringify(categories)) {
    throw new HTTP400Error('illegalQuestions');
  }

  next();
};
