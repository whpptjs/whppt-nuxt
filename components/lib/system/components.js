const components = [
  { key: 'Text', value: 'Text', editorType: 'wPlainText', displayType: 'wPlainText', text: 'test' },
  { key: 'RichText', value: 'Rich Text', editorType: 'wRichText', displayType: 'wRichText', text: '' },
  {
    key: 'LinkGroup',
    value: 'Link Group',
    editorType: 'wLinkGroup',
    displayType: 'wLinkGroup',
    linkGroup: { type: 'page', links: [], showOnDesktop: true, showOnTablet: true, showOnMobile: true },
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
