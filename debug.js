const options = JSON.parse(`<%= JSON.stringify(options) %>`);

const { debug } = options;

if (debug) {
  console.log(`whppt-nuxt options: `, options);
}
