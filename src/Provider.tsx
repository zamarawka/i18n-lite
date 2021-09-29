import {
  isValidElement,
  cloneElement,
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useLayoutEffect,
  ReactNode,
  ReactElement,
  ElementType,
} from 'react';
import I18n from './I18n';
import { interpolate } from './utils';

export const I18nContext = createContext<{ i18n: I18n; lang: string } | undefined>(undefined);

export function useTranslation(baseKey = '') {
  const context = useContext(I18nContext);

  const getLocalKey = useCallback(
    (key: string) => (baseKey && key[0] !== ':' ? `${baseKey}.${key}` : key.replace(':', '')),
    [baseKey],
  );

  const t: I18n['t'] = useCallback(
    (key, params) => context.i18n.t(getLocalKey(key), params),
    [getLocalKey, context],
  );

  const exists: I18n['exists'] = useCallback(
    (key) => context.i18n.exists(getLocalKey(key)),
    [getLocalKey, context],
  );

  return { t, exists, i18n: context.i18n };
}

export default function Provider({ i18n, children }: { i18n: I18n; children: ReactNode }) {
  const [lang, setLang] = useState(() => i18n.currentLang);
  const value = useMemo(() => ({ i18n, lang }), [i18n, lang]);

  useLayoutEffect(() => {
    i18n.on('langChange', setLang);

    return () => {
      i18n.off('langChange', setLang);
    };
  }, [i18n]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

interface TransProps {
  t?: I18n['t'];
  i18nKey: Parameters<I18n['t']>[0];
  values?: Parameters<I18n['t']>[1];
  components?: { [key: string]: ReactElement<any> | ElementType };
}

function getComponentsRE(components: string[]) {
  const compString = components.join('|');

  return new RegExp(`<(?<component>(${compString}))\/?>(?<content>[^<]+)<\/(${compString})>`, 'g');
}

export function Trans({ t, i18nKey, values, components = {} }: TransProps) {
  const { t: localT } = useTranslation();

  const str = (t || localT)(i18nKey, values);

  const result = useMemo(() => {
    const componentsKeys = Object.keys(components);

    if (componentsKeys.length === 0) {
      return str;
    }

    return interpolate(getComponentsRE(componentsKeys), str, (parsed) => {
      const { component, content } = parsed.groups;
      const Comp = components[component];

      if (!Comp) {
        return `<${component}>${content}</${component}>`;
      }

      if (isValidElement(Comp)) {
        return cloneElement(Comp, { key: parsed.index }, content);
      } else {
        return <Comp key={parsed.index}>{content}</Comp>;
      }
    });
  }, [str, components]);

  return <>{result}</>;
}
