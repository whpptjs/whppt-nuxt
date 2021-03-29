# 2.0.0-rc42 -> 2.0.0-rc43

## Path updates

- ~/lib/components/ui/Richtext -> ~/lib/components/ui/components/Richtext
- ~/lib/components/ui/Autocomplete -> ~/lib/components/ui/components/Autocomplete
- ~/lib/components/ui/Button -> ~/lib/components/ui/components/Button
- ~/lib/components/ui/Card -> ~/lib/components/ui/components/Card
- ~/lib/components/ui/Checkbox -> ~/lib/components/ui/components/Checkbox
- ~/lib/components/ui/Datepicker -> ~/lib/components/ui/components/Datepicker
- ~/lib/components/ui/Dialog -> ~/lib/components/ui/components/Dialog
- ~/lib/components/ui/Drawer -> ~/lib/components/ui/components/Drawer
- ~/lib/components/ui/Field -> ~/lib/components/ui/components/Field
- ~/lib/components/ui/Input -> ~/lib/components/ui/components/Input
- ~/lib/components/ui/NumberInput -> ~/lib/components/ui/components/NumberInput
- ~/lib/components/ui/Pagination -> ~/lib/components/ui/components/Pagination
- ~/lib/components/ui/Select -> ~/lib/components/ui/components/Select
- ~/lib/components/ui/Spacer -> ~/lib/components/ui/components/Spacer
- ~/lib/components/ui/Tab -> ~/lib/components/ui/components/Tab
- ~/lib/components/ui/Table -> ~/lib/components/ui/components/Table
- ~/lib/components/ui/Tabs -> ~/lib/components/ui/components/Tabs
- ~/lib/components/ui/Textarea -> ~/lib/components/ui/components/Textarea
- ~/lib/components/ui/Toolbar -> ~/lib/components/ui/components/Toolbar

## Store modules

- whppt-nuxt/editor -> whppt/editor
- whppt-nuxt/site -> whppt/site
- whppt-nuxt/page -> whppt/page
- whppt-nuxt/security -> whppt/security
- whppt-nuxt/dashboard -> whppt/dashboard

## Function renames

### ~/lib/store/modules/editor.js

- menuItemSelected -> MENU_ITEM_SELECTED
- sidebarClosed -> SIDEBAR_CLOSED
- modalClosed -> MODAL_CLOSED
- selectedComponentCleared -> SELECTED_COMPONENT_CLEARED
- componentSelected -> COMPONENT_SELECTED
- contentSelected -> CONTENT_SELECTED
- selectedContentCleared -> SELECTED_CONTENT_CLEARED
- removedComponent -> REMOVED_COMPONENT
- movedComponentDown -> MOVED_COMPONENT_DOWN
- movedComponentUp -> MOVED_COMPONENT_UP
- editInSidebar -> EDIT_IN_SIDEBAR_CHANGED
- editInModal -> EDIT_IN_MODAL_CHANGED

## Removed

- \$api()
