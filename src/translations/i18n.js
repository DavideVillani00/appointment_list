import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en/translation.json";
import it from "./it/translation.json";

const resources = {
  en: { translation: en },
  it: { translation: it },
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
  interpolation: { escapeValue: false },
});

export default i18next;
