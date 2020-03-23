const whpptConfig = require('./config');

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
  plugins: ['plugins/axios.js', 'plugins/types.js'],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/toast', '@nuxtjs/axios', '@nuxtjs/dotenv', ['../../module.js']],
  whppt: {
    ...whpptConfig,
    componentPrefix: 'W',
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
  toast: {
    position: 'top-center',
    register: [
      {
        name: 'editorSuccess',
        message: payload => {
          if (!payload) return 'Success';
          return payload;
        },
        options: {
          type: 'success',
          duration: 4000,
          keepOnHover: true,
        },
      },
      {
        name: 'editorError',
        message: err => {
          if (!err) return 'Unknown Error';
          return err;
        },
        options: {
          type: 'error',
          duration: 4000,
          keepOnHover: true,
        },
      },
    ],
  },
  build: {
    extend(config, ctx) {},
  },
};
