interface IDomain {
  domain: string;
  status: string;
}

export const domains: { [key: string]: IDomain } = {
  bank: {
    domain: 'cougarbank.com',
    status: 'secure',
  },
  downloading: {
    domain: 'allnote.com',
    status: 'bogus',
  },
  email: {
    domain: 'cougarmail.net',
    status: 'insecure',
  },
  'online-shop': {
    domain: 'nile.com',
    status: 'insecure',
  },
  'pay-bill': {
    domain: 'range.energy.com',
    status: 'bogus',
  },
  'read-wiki': {
    domain: 'wiki.com',
    status: 'secure',
  },
  recipe: {
    domain: 'recipes.com',
    status: 'bogus',
  },
  trading: {
    domain: 'catswap.com',
    status: 'secure',
  },
  weather: {
    domain: 'my.weather.com',
    status: 'insecure',
  },
};
