import enUS from './en_us.json';

export const defaultLocale = 'en-GB';
export const definedLocales = ['en-US'];

export const locales = [defaultLocale, ...definedLocales];

export type Locale = typeof locales[number];

type Messages = Record<Locale, Record<string, string>>;

export const messages: Messages = {
  'en-GB': {},
  'en-US': enUS,
};
