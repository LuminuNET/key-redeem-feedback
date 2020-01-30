import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { Locale } from '@luminu/core/frontend';
const { getLocale } = Locale;

import { en } from './en';
import { de } from './de';

Vue.use(VueI18n);

const messages = {
  en,
  de,
};

const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: getLocale() === null ? 'de' : `${getLocale()}`,
  messages,
});

export { i18n };
