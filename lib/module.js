const { resolve, join } = require('path');
const glob = require('glob');

export default function WhpptNuxtModule(moduleOptions) {
  const filesDir = 'whppt/nuxt';

  moduleOptions.apiPrefix = moduleOptions.apiPrefix || 'api';

  this.options.css.unshift('@whppt/nuxt/lib/styles/actions.css');

  const options = {
    ...moduleOptions,
    ...this.options.whppt,
  };

  const pluginsToSync = [
    'components/index.js',
    'plugins/index.js',
    'store/index.js',
    'util/index.js',
    'plugins/vCalendar.client.js',
  ];

  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(filesDir, pathString),
      options,
    });
  }

  const self = this;

  const copyDirectory = function(dir) {
    const pattern = `${__dirname}/${dir}/**/*.{js,vue,scss}`;
    const directoryOptions = {
      ignore: [],
    };

    const files = glob.sync(pattern, directoryOptions);

    for (const file of files) {
      self.addTemplate({
        src: file,
        fileName: join(filesDir, file.replace(`${__dirname}/`, '')),
        options,
      });
    }
  };

  copyDirectory('components');
  copyDirectory('store');
  copyDirectory('plugins');
  copyDirectory('util');
  copyDirectory('assets');
}

module.exports.meta = require('../package.json');
