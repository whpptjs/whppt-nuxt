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
    key: 'Link',
    name: 'Link',
    editorType: 'wLink',
    displayType: 'wLink',
    type: 'page',
    showOnDesktop: true,
    showOnTablet: true,
    showOnMobile: true,
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
        carouselImage: {
          value: {
            imageId: undefined,
          },
          sizes: {},
        },
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
    key: 'EditImage',
    name: 'Edit Image',
    editorType: 'wEditImage',
    displayType: 'wEditImage',
    property: 'data',
    data: {
      imageId: '',
    },
  },
  ...options.components,
];

export { Components };
