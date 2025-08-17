import locales from "./locales";

const defaultLang = "en-GB";

// if actual localisation is required later, this can be updated
// but for now, this will suffice so that the game is built around the idea that
// it could be localised in the future
const i18n = (key: string, locale?: string): string => {
  const lang = locale || navigator.language;

  if (locales[lang] && locales[lang][key]) {
    return locales[lang][key];
  }

  if (locales[defaultLang][key]) {
    return locales[defaultLang][key];
  }

  return key;
};

export default i18n;
