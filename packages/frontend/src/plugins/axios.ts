import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${process.env.VUE_APP_ROOT_API}:3000/api/v1`,
});
