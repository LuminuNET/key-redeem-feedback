import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

Vue.prototype.$http = api;

export default Vue;
