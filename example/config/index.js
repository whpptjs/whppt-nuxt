const components = require('./components.config');
const templates = require('./templates.config');
const siteSettings = require('./siteSettings.config');
const styles = require('./styles.config');

module.exports = { siteSettings, components, templates, ...styles };
