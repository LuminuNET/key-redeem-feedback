import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  registerRedisClient,
  storeBetaPlayersInRedis,
} from './common';

export = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  registerRedisClient,
  storeBetaPlayersInRedis,
];
