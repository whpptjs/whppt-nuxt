const components = [
  { key: 'Text', value: 'Text', editorType: 'wPlainText', displayType: 'wPlainText', text: 'test' },
  { key: 'RichText', value: 'Rich Text', editorType: 'wRichText', displayType: 'wRichText', text: '' },
  {
    key: 'LinkGroup',
    value: 'Link Group',
    editorType: 'wLinkGroup',
    displayType: 'wLinkGroup',
    type: 'page',
    links: [],
    showOnDesktop: true,
    showOnTablet: true,
    showOnMobile: true,
  },
  {
    key: 'Carousel',
    value: 'Carousel',
    editorType: 'wCarousel',
    displayType: 'wCarousel',
    reversed: false,
    title: '',
    description: '',
    items: [
      {
        title: '',
        description: '',
        ctaText: '',
        ctaIcon: undefined,
        image: undefined,
      },
    ],
  },
  {
    key: 'CardCarousel',
    value: 'Card Carousel',
    editorType: 'wCardCarousel',
    displayType: 'wCardCarousel',
    reversed: false,
    title: '',
    description: '',
    items: [],
  },
  {
    key: 'Listings',
    value: 'Listings',
    editorType: 'wListings',
    displayType: 'wListings',
    items: [],
  },
];

export { components };
