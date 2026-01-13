import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const lang = segments[0];
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: string) {
  const safeLang = (lang in ui) ? lang as keyof typeof ui : defaultLang;
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[safeLang][key] || ui[defaultLang][key];
  };
}

export function useLanguageSwitcher(lang: string) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return function switchLanguage(targetLang: string): string {
    const segments = currentPath.split('/');
    segments[1] = targetLang;
    return segments.join('/');
  };
}

export function getLocalizedPath(path: string, targetLang: string): string {
  const segments = path.split('/');
  if (segments[1] === 'en' || segments[1] === 'zh') {
    segments[1] = targetLang;
  } else {
    segments.splice(1, 0, targetLang);
  }
  return segments.join('/');
}
