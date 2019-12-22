import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { getLocale } from '@luminu/core/common/locale.service';

import en from './en';
import de from './de';

Vue.use(VueI18n);

const messages = {
	en,
	de
};

const i18n = new VueI18n({
	fallbackLocale: 'en',
	locale: getLocale() === null ? 'de' : `${getLocale()}`,
	messages
});

export default i18n;
