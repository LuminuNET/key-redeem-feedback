type Translations = { [key: string]: string } & {
  en: string;
  de: string;
};

type QuestionTypes = 'number' | 'custom' | 'text';

type Question = {
  name: string;
  type: QuestionTypes;
  isRequired: boolean;
  customs: string[];
  translations: Translations;
  value: string;
};

type Category = {
  title: string;
  translations: Translations;
  questions: Question[];
};

export { Category, Translations };
