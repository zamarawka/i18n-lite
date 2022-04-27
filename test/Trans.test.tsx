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
              cmp: <span />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello <span>someText</span>');
  });

  it('should resolve complex key various component passing', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.copWay"
            components={{
              cmp: (props) => <span {...props} />,
              other: <b />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello <span>someText</span> <b>someOther text</b>');
  });

  it('should resolve complex key with empty content', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.compWithEmpty"
            components={{
              cmp: (props) => <span {...props} />,
              other: <b />,
              more: <div />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello <span></span> <div></div> <b></b>');
  });

  it('should resolve complex key new lines', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.copWayNl"
            components={{
              cmp: <span />,
              other: <b />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello <span>someText</span>\n<b>someOther text</b>');
  });

  it('should resolve complex key with values', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.compWithPar"
            values={{
              param1: 'foo',
              param2: 'bar',
            }}
            components={{
              cmp: <span />,
            }}
          />
        </Provider>,
        container,
      );
    });
    expect(container.innerHTML).toBe('Hello foo <span>bar</span> <span>someText</span>');
  });

  it('should resolve complex key with values with fallback', () => {
    act(() => {
      render(
        <Provider i18n={inst}>
          <Trans
            i18nKey="body.compWithParFallback"
            values={{
              param1: 'foo',
              param2: 'bar',
            }}
            components={{
              cmp: <span />,
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
