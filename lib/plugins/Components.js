const getHrefs = require('get-hrefs');

const Components = [
  {
    key: 'Text',
    name: 'Text',
    displayType: 'wPlainText',
    componentType: 'wPlainText',
    init: ({ $set }, content = {}) => {
      if (!content.text) $set(content, 'text', '');
      return content;
    },
  },
  {
    key: 'RichText',
    name: 'Rich Text',
    componentType: 'wRichText',
    init: ({ $set }, content = {}) => {
      if (!content.text) $set(content, 'text', '');
      return content;
    },
    extractLinks: content => {
      return getHrefs(content.text);
    },
  },
  {
    key: 'FormattedText',
    name: 'Formatted Text',
    componentType: 'wFormattedText',
    init: ({ $set }, content = {}) => {
      if (!content.text) $set(content, 'text', '');
      return content;
    },
  },
  {
    key: 'Anchor',
    name: 'Anchor',
    componentType: 'wAnchor',
    init: ({ $set }, content = {}) => {
      if (!content.id) $set(content, 'id', '');
      return content;
    },
  },
];

export { Components };
