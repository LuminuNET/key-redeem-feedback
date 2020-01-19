import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.VUE_APP_ROOT_API
});

Vue.prototype.$http = api;

export default Vue;
