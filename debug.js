const options = JSON.parse(`<%= JSON.stringify(options) %>`);

const { debug } = options;

if (debug) {
  // eslint-disable-next-line no-console
  console.log(`whppt-nuxt options: `, options);
}
