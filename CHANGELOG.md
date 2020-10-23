# Changelog

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
