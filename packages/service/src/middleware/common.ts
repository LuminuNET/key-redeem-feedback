import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import { Redis } from '@luminu/core';
import dotenv from 'dotenv';
import con from './mysql';
import { MysqlError } from 'mysql';

dotenv.config();
const { createRedisConnection, getRedis } = Redis;

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

export const storeBetaPlayersInRedis = (router: Router) => {
  con.query(
    "SELECT `used_by` FROM `beta_keys` WHERE `used_by`!=''",
    async (err: MysqlError, data: [{ used_by: string }]) => {
      const uuids = data.map(row => row.used_by);
      await getRedis().sadd('betalist', uuids);
    }
  );
};

export const basePath = `${process.env.BASE_PATH}/${process.env.API_VERSION}`;
