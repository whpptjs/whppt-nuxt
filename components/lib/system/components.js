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
        ctaLink: undefined,
        image: undefined,
      },
    ],
  },
  {
    key: 'Listings',
    value: 'Listings',
    editorType: 'wListings',
    displayType: 'wListings',
    categories: [],
  },
  {
    key: 'Container',
    value: 'Container',
    editorType: 'wContainer',
    displayType: 'wContainer',
    contents: [],
  },
  {
    key: 'Image',
    value: 'Test Image',
    editorType: 'wImage',
    displayType: 'wImage',
    data: undefined,
  },
];

components.forEach(c => {
  c.marginTop = '5';
});

export { components };
