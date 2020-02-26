module.exports = {
  security: {
    provider: 'jwt',
    jwt: {
      secret: process.env.JWT_SECRET || 'W5rX8JlYWRlclJrLCJqdGkiOiJiaGdkr3bGl6amZ5IiwiYWxnIjoiSFMyNTYiLCP', // use a 256bit key
      issuer: 'example',
      audience: 'example',
    },
  },
  collections: {
    pages: 'pages',
    listing: 'listing',
  },
  atdw: {
    apiUrl: process.env.ATDW_API_URL,
    apiKey: process.env.ATDW_API_KEY,
    state: 'SA',
    area: 'Barossa',
    limit: '1000',
  },
  bookEasy: {
    apiUrl: process.env.BOOKEASY_API_URL,
    apiKey: process.env.BOOKEASY_API_KEY,
    vcid: process.env.BOOKEASY_VCID,
  },
  defaults: {
    nav: {
      linkGroups: [
        {
          title: 'Places to go',
          links: [{ text: 'Wineries', href: '' }],
        },
        {
          title: 'Things to do',
          links: [{ text: 'Restaurants', href: '' }],
        },
        {
          title: 'Taste & Drink',
          links: [{ text: 'Suggested Itineraries', href: '' }],
        },
        {
          title: 'Plan your trip',
          links: [{ text: 'Hotels, Motels & Resorts', href: '' }],
        },
        {
          title: 'Inspiration',
          links: [{ text: 'Event Calendar', href: '' }],
        },
      ],
    },
    footer: {
      test: [],
    },
  },
};
