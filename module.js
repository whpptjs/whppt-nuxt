const { resolve, join } = require('path');
const { readdirSync } = require('fs');

export default function WhpptNuxtModule(moduleOptions) {
  const pluginsToSync = ['components/index.js', 'components/lib/index.js', 'debug.js'];

  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join('whppt-nuxt', pathString),
      options: moduleOptions,
    });
  }

  const foldersToSync = [
    'components/lib/icons',
    'components/lib/content',
    'components/lib/layouts',
    'components/lib/system',
  ];
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString);
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join('whppt-nuxt', pathString, file),
        options: moduleOptions,
      });
    }
  }
}

module.exports.meta = require('./package.json');
