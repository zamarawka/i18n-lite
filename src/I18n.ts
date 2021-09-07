import { get } from './utils';
import EventEmitter from './EventEmitter';

type Lang = {
  [key: string]: string[] | string | Lang;
};

type InterpolationParams = {
  [key: string]: string | number;
};

type EmittedEvents = {
  langChange: (lang: string) => void;
  missedKey: (keyInfo: { key: string; currentLang: string; fallbackLang: string }) => void;
};

class I18n extends EventEmitter<EmittedEvents> {
  currentLang: string;
  fallbackLng?: string;
  resource: { [key: string]: Lang } = {};
  suffix: string;
  prefix: string;
  regexp: RegExp;
  debug: boolean;

  constructor({
    lang,
    debug = false,
    fallbackLng,
    resource,
    suffix = '}}',
    prefix = '{{',
  }: {
    lang: string;
    fallbackLng?: string;
    resource: I18n['resource'];
    suffix?: string;
    prefix?: string;
    debug?: boolean;
  }) {
    super();

    this.debug = debug;
    this.currentLang = lang;
    this.fallbackLng = fallbackLng;
    this.resource = resource;
    this.suffix = suffix;
    this.prefix = prefix;

    const regexpStr = `${this.prefix}(.+?)${this.suffix}`;

    this.regexp = new RegExp(regexpStr, 'g');
  }

  get supportedLangs() {
    return Object.keys(this.resource);
  }

  changeLang(lang: string) {
    this.currentLang = lang;

    this.emit('langChange', lang);
  }

  interpolate(str: string, params: InterpolationParams) {
    let result = '';
    let tmp: RegExpExecArray | null;
    let lastIndex = 0;
    const { regexp } = this;

    while ((tmp = regexp.exec(str)) !== null) {
      const head = str.slice(lastIndex, tmp.index);

      if (head !== '') {
        result += head;
      }

      const intKey = tmp[1].trim();

      result += get(params, intKey, tmp[0]);

      lastIndex = regexp.lastIndex;
    }

    const tail = str.slice(lastIndex);

    if (tail !== '') {
      result += tail;
    }

    return result;
  }

  getString(key: string): string | null {
    let str = get(this.resource[this.currentLang], key);

    if (!str && this.fallbackLng) {
      str = get(this.resource[this.fallbackLng], key);
    }

    return !str || typeof str !== 'string' ? null : str;
  }

  t(key: string, params?: InterpolationParams) {
    const str = this.getString(key);

    if (str === null) {
      if (this.debug) {
        console.warn('i18n: missed key warning ', key);
      }

      this.emit('missedKey', {
        key,
        currentLang: this.currentLang,
        fallbackLang: this.fallbackLng,
      });

      return key;
    }

    if (!params) {
      return str;
    }

    return this.interpolate(str, params);
  }

  exists(key: string) {
    return !!this.getString(key);
  }
}

export default I18n;
