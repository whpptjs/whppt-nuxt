const Components = options => [
  { key: 'Text', name: 'Text', editorType: 'wPlainText', displayType: 'wPlainText', text: '', property: 'text' },
  {
    key: 'RichText',
    name: 'Rich Text',
    editorType: 'wRichText',
    displayType: 'wRichText',
    text: '',
    property: 'text',
  },
  {
    key: 'LinkGroup',
    name: 'Link Group',
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
    name: 'Carousel',
    editorType: 'wCarousel',
    displayType: 'wCarousel',
    reversed: false,
    title: '',
    description: '',
    property: 'items',
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
    name: 'Listings',
    editorType: 'wListings',
    displayType: 'wListings',
    property: 'categoryFilter',

    categoryFilter: {},
  },
  {
    key: 'Container',
    name: 'Container',
    editorType: 'wContainer',
    displayType: 'wContainer',
    property: 'contents',
    contents: [],
  },
  {
    key: 'EditImage',
    name: 'Edit Image',
    editorType: 'wEditImage',
    displayType: 'wEditImage',
    data: {},
  },
  ...options.components,
];

export { Components };
