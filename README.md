Whppt 1.0 Breaking Changes:

- The pageTypes property on plugins has been renamed to pageType
- Plugins are now added via a addPlugins() function, see example project whpptPlugins.js for an example
- All plugins that add a pageType now need to provide functions for page-specific commands, see components/lib/systemPlugins/GenericPagePlugin for an example
- The genericPagePlugin needs to be added to all projects to create basic pages with templates, see example project plugins/whpptPlugins for an example
