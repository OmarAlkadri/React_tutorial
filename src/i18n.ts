import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translationEN } from './assets/languages/en_lang'
import { translationTR } from './assets/languages/tr_lang'

const resources = {
  tr: translationTR,
  en: translationEN,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'tr',
    fallbackLng: 'tr',
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
    }
  });



