[![Ci Status](https://github.com/zamarawka/i18n-lite/workflows/CI/badge.svg)](https://github.com/zamarawka/i18n-lite/actions)
[![Npm version](https://img.shields.io/npm/v/i18n-lite.svg?style=flat&logo=npm)](https://www.npmjs.com/package/i18n-lite)
[![React version](https://img.shields.io/npm/dependency-version/i18n-lite/peer/react.svg?style=flat&logo=react)](https://reactjs.org/)

# i18n-lite

Modular, zero dependencies, tiny toolkit for i18n in react based apps. Inspired by i18next api. Focused on reduce bundle size.

Package includes its TypeScript Definitions

# Install

```sh
npm install i18n-lite
```

# Usage

```tsx
// ./src/App.tsx
import I18n, { getLangDetector, Provider as I18nProvider } from 'i18n-lite';

import SomeComponentWithTranslation './SomeComponentWithTranslation';

const { detectLang, langHandler } = getLangDetector();

const en = {
  some: 'some strings {{param}}',
  richTextString: 'lorem <cpm>ipsum</cpm> <b>{{param}}</b>',
  // ...
};

// Create I18n instance
const i18n = new I18n({
  lang: detectLang(),
  fallbackLng: 'en',
  resource: {
    en,
  },
});

i18n.on('langChange', langHandler);

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <SomeComponentWithTranslation />
    </I18nProvider>
  );
}

export default App;
```

```tsx
// ./src/SomeComponentWithTranslation.tsx
import { useTranslation, Trans } from 'i18n-lite';

export default function SomeComponentWithTranslation() {
  // Simple way to translate strings with values interpolation
  const { t } = useTranslation();

  return (
    <div>
      <span>{t('some', { param: 'here' })}</span>
      <div>
        {/* Way to interpolate components and values */}
        <Trans
          i18nKey="richTextString"
          components={{
            cpm: (props) => <span {...props} />,
            b: <b />,
          }}
          values={{
            param: 'bar',
          }}
        />
      </div>
    </div>
  );
}
```

# Development

```sh
npm run format # code fomatting
npm run lint # linting
npm run test # testing
```

Active maintenance with care and ❤️.

Feel free to send a PR.
