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
    baseAPIUrl: process.env.BASE_API_URL,
    componentPrefix: 'W',
    defaultMarginTop: '40',
    components: [
      {
        key: 'CardCarousel',
        name: 'Card Carousel',
        editorType: 'wCarousel',
        displayType: 'wCardCarousel',
        reversed: false,
        title: '',
        description: '',
        items: [
          {
            title: '',
            description: '',
            ctaText: '',
            ctaIcon: undefined,
            ctaLink: '',
            image: undefined,
          },
        ],
      },
    ],
    templates: [
      { key: 'home', label: 'Home', init: { contents: [] } },
      { key: 'generic', label: 'Generic', init: { contents: [] } },
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
