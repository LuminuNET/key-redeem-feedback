import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/plugins/axios';
import { Category } from '@/types/category';

Vue.use(Vuex);

export const LOAD_CATEGORIES = 'loadCategories';
export const GET_CATEGORIES = 'getCategories';
export const SAVE_KEY = 'saveKey';
export const SET_ERROR = 'setError';
export const GET_ERROR = 'getError';

const SAVE_CATEGORIES = 'saveCategories';

export const store = new Vuex.Store({
  state: {},
  getters: {
    [GET_CATEGORIES](state: any) {
      return state.categories;
    },
    [GET_ERROR](state: any) {
      return state.isError;
    },
  },
  mutations: {
    [SAVE_CATEGORIES](state: any, payload: Category[]) {
      state.categories = payload;
    },
    [SAVE_KEY](state: any, payload: string) {
      state.key = payload;
    },
    [SET_ERROR](state: any, payload: boolean) {
      state.isError = payload;
    },
  },
  actions: {
    async [LOAD_CATEGORIES](context) {
      const key: string = context.state.key;

      try {
        const response = await api.get(`/categories?key=${key}`);
        const categories: Category[] = response.data;
        context.commit(SAVE_CATEGORIES, categories);
        context.commit(SET_ERROR, false);
      } catch {
        context.commit(SET_ERROR, true);
      }
    },
  },
});
