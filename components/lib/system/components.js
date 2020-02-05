const components = [
  { key: 'Text', value: 'Text', whpptType: 'wPlainText', type: 'wPlainText', text: 'test' },
  { key: 'RichText', value: 'Rich Text', whpptType: 'wRichText', type: 'wRichText', text: '' },
  {
    key: 'LinkGroup',
    value: 'Link Group',
    whpptType: 'wLinkGroup',
    type: 'wLinkGroup',
    linkGroup: { type: 'page', links: [], showOnDesktop: true, showOnTablet: true, showOnMobile: true },
  },
  {
    key: 'CardCarousel',
    value: 'Card Carousel',
    whpptType: 'wCardCarousel',
    type: 'wCardCarousel',
    reversed: false,
    title: '',
    description: '',
    items: [],
  },
];

export { components };
