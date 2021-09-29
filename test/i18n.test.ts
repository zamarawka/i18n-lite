import I18n from '../src/I18n';

import { en, other } from './fuxtures/lang';

describe('I18n', () => {
  let inst: I18n;

  it('should create class', () => {
    inst = new I18n({
      lang: 'en',
      resource: {
        en,
        other,
      },
    });

    expect(inst).toBeInstanceOf(I18n);
  });

  it('should create check translation exists', () => {
    expect(inst.exists('body.sub.str')).toBe(true);
    expect(inst.exists('body.sub.someStr')).toBe(false);
  });

  it('should create get translation', () => {
    expect(inst.t('body.sub.str')).toBe(en.body.sub.str);
  });

  it('should create fallback to key', () => {
    expect(inst.t('body.sub.someStr')).toBe('body.sub.someStr');
  });

  it('should create interpolate params', () => {
    expect(
      inst.t('body.title', {
        param1: 'foo',
        param2: 'bar',
      }),
    ).toBe('Hello foo bar');

    expect(
      inst.t('body.subTitle', {
        param1: 'foo',
      }),
    ).toBe('Hello foo');
  });

  it('should change lang', () => {
    inst.changeLang('other');

    expect(inst.currentLang).toBe('other');

    expect(inst.exists('body.sub.str')).toBe(true);
    expect(inst.t('body.sub.str')).toBe(other.body.sub.str);
  });
});
