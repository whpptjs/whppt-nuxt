<template>
  <form @submit.prevent>
    <settings-open-graph :settings="page"></settings-open-graph>
  </form>
</template>

<script>
import SettingsOpenGraph from '../../SiteSettings/tabs/SettingsOG';

export default {
  name: 'PageSettingsOpenGraph',
  components: {
    SettingsOpenGraph,
  },
  props: {
    page: { type: Object, required: true },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped></style>
