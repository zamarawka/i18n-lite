import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import I18n from '../src/I18n';
import Provider, { Trans } from '../src/Provider';
import { en, other } from './fuxtures/lang';

const inst = new I18n({
  lang: 'en',
  resource: {
    en,
    other,
  },
});

let container: HTMLDivElement = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Trans', () => {
  it('should resolve simple key', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans i18nKey="body.sub.str" />
        </Provider>,
        container,
      );
    });

    expect(container.innerHTML).toBe('Some str');
  });

  it('should resolve with fallback and safe complex key', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans i18nKey="body.comp" />
        </Provider>,
        container,
      );
    });

    expect(container.innerHTML).toBe('Hello &lt;cmp&gt;someText&lt;/cmp&gt;');
  });

  it('should resolve complex key', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.comp"
            components={{
              cmp: (props) => <span {...props} />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello <span>someText</span>');
  });

  it('should resolve complex key with params', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.compWithPar"
            params={{
              param1: 'foo',
              param2: 'bar',
            }}
            components={{
              cmp: (props) => <span {...props} />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello foo <span>bar</span> <span>someText</span>');
  });

  it('should resolve complex key with params with fallback', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.compWithParFallback"
            params={{
              param1: 'foo',
              param2: 'bar',
            }}
            components={{
              cmp: (props) => <span {...props} />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe(
      'Hello foo <span>bar</span> &lt;some&gt;someText&lt;/some&gt;',
    );
  });
});
