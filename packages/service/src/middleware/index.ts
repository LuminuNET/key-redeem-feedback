import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  registerRedisClient,
} from './common';

export = [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  registerRedisClient,
];
