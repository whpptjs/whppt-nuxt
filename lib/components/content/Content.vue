<template>
  <div v-whppt-content="contentItems" :class="{ 'whppt-content--active': activeMenuItem, container }">
    <component
      :is="content.displayType"
      v-for="(content, index) in contentItems"
      :key="content.key + index"
      :content="content"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { filter, forEach } from 'lodash';

const additionalComponents = {};

// const plugins = global.$whppt && global.$whppt.plugins;
// const pageTypePlugins = filter(plugins, t => t.pageType);
//
// forEach(pageTypePlugins, plugin => {
//   if (plugin.pageType.components && plugin.pageType.components.length) {
//     forEach(plugin.pageType.components, component => {
//       additionalComponents[component.name] = component;
//     });
//   }
// });

export default {
  name: 'WhpptContent',
  components: {
    ...additionalComponents,
  },
  props: {
    contentItems: {
      type: [Array, Object],
      required: true,
    },
    container: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>

<style>
.whppt-content--active {
  min-height: 200px;
}
</style>
