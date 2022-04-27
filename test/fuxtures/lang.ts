export const en = {
  global: {
    key: 'some str {{param}}',
  },
  body: {
    title: 'Hello {{param1}} {{param2}}',
    subTitle: 'Hello {{ param1 }}',
    comp: 'Hello <cmp>someText</cmp>',
    copWay: 'Hello <cmp>someText</cmp> <other>someOther text</other>',
    copWayNl: `Hello <cmp>someText</cmp>
<other>someOther text</other>`,
    compWithPar: 'Hello {{param1}} <cmp>{{param2}}</cmp> <cmp>someText</cmp>',
    compWithEmpty: 'Hello <cmp /> <more/> <other></other>',
    compWithParFallback: 'Hello {{param1}} <cmp>{{param2}}</cmp> <some>someText</some>',
    sub: {
      str: 'Some str',
    },
  },
};

export const other = {
  global: {
    key: 'other some str {{param}}',
  },
  body: {
    title: 'other Hello {{param1}} {{param2}}',
    subTitle: 'other Hello {{ param1 }}',
    comp: 'Other Hello <cmp>other someText</cmp>',
    copWay: 'Other Hello <cmp>someText</cmp> <other>someOther text</other>',
    copWayNl: `Other Hello <cmp>someText</cmp>
<other>someOther text</other>`,
    compWithPar: 'Other Hello {{param1}} <cmp>{{param2}}</cmp>',
    compWithEmpty: 'Other Hello <cmp /> <more/> <other></other>',
    sub: {
      str: 'other Some str',
    },
  },
};
