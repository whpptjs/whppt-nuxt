# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0-rc.77](https://github.com/whpptjs/whppt-nuxt/compare/v2.0.0-rc.76...v2.0.0-rc.77) (2022-08-11)

## [2.0.0-rc.76](https://github.com/whpptjs/whppt-nuxt/compare/v2.0.0-rc75...v2.0.0-rc.76) (2022-08-08)

# Changelog

## v2.0.0-rc15
### Fixes
- Fix Custom editor directives arguments format.

## v2.0.0-rc14
### Fixes
- Fix missing NumberInput vue component, it somehow didn't get bundled.

## v2.0.0-rc13

### Features
- Date directive now exists (new features to be added in the future).
- New way to initialise data at a template level, templates now have an `init` hook.
- New NumberInput.vue component in `~/lib/components/ui`, this is a work around to solve an `input[type=number]` vuex mutation issue 
in the [@whppt/layouts](https://github.com/whpptjs/layouts) package.

### Fixes
- Fix an issue where creating a new page would throw a vuex error (See point 2 of Features). 

## v2.0.0-rc12

### Features
- Implemented new module options `defaultPadding` and `defaultMargin`.
