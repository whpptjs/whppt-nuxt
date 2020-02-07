require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  dev: false,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff9000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['plugins/axios.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['../../module.js']
  ],
  whppt: {
    baseAPIUrl: process.env.BASE_API_URL,
    componentPrefix: 'W',
    components: [
      {
        key: 'CardCarousel',
        value: 'Card Carousel',
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
            image: undefined
          }
        ]
      }
    ],
    templates: [
      { key: 'home', label: 'Home' },
      { key: 'generic', label: 'Generic' },
      { key: 'category', label: 'Category' },
      { key: 'chapters', label: 'Chapters' },
      { key: 'listings', label: 'Listings' },
      { key: 'listing', label: 'listing' }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    retry: { retries: 3 }
  },
  purgeCSS: {
    whitelist: [],
    whitelistPatterns: [
      /^bg-\w+-\d00/,
      /^text-\w+-\d00/,
      /^border-\w+-\d00/,
      /^hover:border-\w+-\d00/,
      /^whppt-/
    ],
    whitelistPatternsChildren: []
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
