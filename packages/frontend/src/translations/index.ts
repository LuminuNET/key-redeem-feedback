import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { Locale } from '@luminu/core/frontend';
const { getLocale } = Locale;

import { en } from './en';
import { de } from './de';
import { Category, Translations } from '@/types/category';

Vue.use(VueI18n);

const messages = {
  en,
  de,
} as { [key: string]: any };

const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: getLocale() === null ? 'de' : `${getLocale()}`,
  messages,
});

const addTranslationsFromCategories = (categories: Category[]) => {
  categories.forEach(category => {
    addTranslations('category', category.title, category.translations);

    category.questions.forEach(question => {
      addTranslations('question', question.name, question.translations);
    });
  });
};

const addTranslations = (
  parent: string,
  key: string,
  translations: Translations
) => {
  Object.keys(translations).forEach(locale => {
    if (!messages[locale][parent]) messages[locale][parent] = {};
    messages[locale][parent][key] = translations[locale];

    i18n.setLocaleMessage(locale, messages[locale]);
  });
};

export { i18n, addTranslationsFromCategories };
