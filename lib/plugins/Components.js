const Components = options => [
  {
    key: 'Text',
    name: 'Text',
    editorType: 'PlainText', // possibly handled in directive
    displayType: 'wPlainText',
    text: '',
    property: 'text',
  },
  {
    key: 'RichText',
    name: 'Rich Text',
    editorType: 'wRichText',
    displayType: 'wRichText',
    text: '',
    property: 'text',
  },
  {
    key: 'FormattedText',
    name: 'Formatted Text',
    editorType: 'wFormattedText',
    displayType: 'wFormattedText',
    text: '',
    property: 'text',
  },
  {
    key: 'Link',
    name: 'Link',
    editorType: 'wLink',
    displayType: 'wLink',
    type: 'page',
    fileId: '',
    text: '',
    showOnDesktop: true,
    showOnTablet: true,
    showOnMobile: true,
  },
  // {
  //   key: 'SplitContent',
  //   name: 'Split Content',
  //   editorType: 'wSplitContent',
  //   displayType: 'wSplitContent',
  //   property: 'width',
  //   contents: { left: [], right: [] },
  //   width: 6,
  //   gap: 0,
  // },
  {
    key: 'Anchor',
    name: 'Anchor',
    editorType: 'Anchor',
    displayType: 'wAnchor',
    id: '',
    marginTop: 0,
  },
  // ...options.components,
];

export { Components };
