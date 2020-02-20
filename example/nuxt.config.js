module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  css: [],
  plugins: ['plugins/axios.js'],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', ['../../module.js']],
  whppt: {
    componentPrefix: 'W',
    defaultMarginTop: '40',
    colours: {
      background: {
        'Red Lighter': '#E52F2F',
        Red: '#981A31',
        'Red Darker': '#761218',
        'Red Darkest': '#4A131F',
        White: 'white',
        Grey: '#efefef',
      },
      text: {
        Black: 'black',
        White: 'white',
      },
    },
    components: [
      {
        key: 'CardCarousel',
        name: 'Card Carousel',
        editorType: 'wCarousel',
        displayType: 'wCardCarousel',
        reversed: false,
        title: '',
        description: '',
        items: [],
      },
      {
        key: 'FeatureBlock',
        name: 'Feature Block',
        displayType: 'FeatureBlock',
        editorType: 'wComponent',
        reversed: false,
        image: {
          crop: {},
          imageId: '',
        },
      },
      {
        key: 'SplitContent',
        name: 'Split Content',
        displayType: 'SplitContent',
        editorType: 'wComponent',
        property: 'data',
        data: {
          reversed: false,
          image: {
            sizes: {},
            imageId: '',
            crop: {},
          },
          text: {
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description',
          },
          button: {
            text: 'Button Text',
            icon: 'Button Icon',
            link: 'Button Link',
          },
        },
      },
    ],
    templates: [
      { key: 'generic', label: 'Generic', init: { header: { title: '' }, contents: [] } },
      { key: 'home', label: 'Home', init: { header: { title: '', link: { type: 'anchor' } }, contents: [] } },
    ],
  },
  axios: {
    proxy: true,
    retry: { retries: 3 },
  },
  purgeCSS: {
    whitelist: [],
    whitelistPatterns: [/^bg-\w+-\d00/, /^text-\w+-\d00/, /^border-\w+-\d00/, /^hover:border-\w+-\d00/, /^whppt-/],
    whitelistPatternsChildren: [],
  },
  build: {
    extend(config, ctx) {},
  },
};
