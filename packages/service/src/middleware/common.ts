import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import { Redis } from '@luminu/core';
import dotenv from 'dotenv';

dotenv.config();
const { createRedisConnection } = Redis;

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const registerRedisClient = (router: Router) => {
  createRedisConnection(
    'betaKey',
    +(process.env.REDIS_PORT || ''),
    process.env.REDIS_IP || '',
    +(process.env.REDIS_CONNECTION_TIMEOUT || '')
  );
};

export const basePath = `${process.env.BASE_PATH}/${process.env.API_VERSION}`;
