export function get<T extends { [key: string]: unknown }, K extends keyof T, V = undefined>(
  object: T,
  path: K | [K],
  value?: V,
) {
  const pathArray = Array.isArray(path)
    ? path
    : typeof path === 'string'
    ? path.split('.').filter((key) => key)
    : [path];
  const pathArrayFlat = pathArray.flatMap(
    (part) => (typeof part === 'string' ? part.split('.') : part) as unknown as K,
  );

  return pathArrayFlat.reduce((obj: T | T[K], key: K) => obj && (obj as any)[key], object) ?? value;
}

export function getLangDetector(i18nKey = 'i18n-lang') {
  return {
    detectLang(): string {
      return localStorage[i18nKey] ?? navigator.language.slice(0, 2).toLowerCase();
    },
    langHandler(lang: string) {
      document.documentElement.lang = lang;
      localStorage[i18nKey] = lang;
    },
  };
}
