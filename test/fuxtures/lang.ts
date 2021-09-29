export const en = {
  global: {
    key: 'some str {{param}}',
  },
  body: {
    title: 'Hello {{param1}} {{param2}}',
    subTitle: 'Hello {{ param1 }}',
    comp: 'Hello <cmp>someText</cmp>',
    compWithPar: 'Hello {{param1}} <cmp>{{param2}}</cmp> <cmp>someText</cmp>',
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
    compWithPar: 'Other Hello {{param1}} <cmp>{{param2}}</cmp>',
    sub: {
      str: 'other Some str',
    },
  },
};
