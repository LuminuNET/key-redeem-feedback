import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const userAgent =
  process.env.SERVICE_NAME +
  '/' +
  process.env.SERVICE_VERSION +
  ' ' +
  process.env.SERVICE_PLATFORM_NAME +
  '/' +
  process.env.SERVICE_PLATFORM_VERSION;

const minecraftApi = axios.create({
  baseURL: 'https://api.ashcon.app/mojang/v2/user/',
  headers: {
    'User-Agent': userAgent,
  },
});

export default minecraftApi;
