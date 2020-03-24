<template>
  <form @submit.prevent>
    <settings-twitter :settings="page"></settings-twitter>
  </form>
</template>

<script>
import SettingsTwitter from '../../SiteSettings/SettingsTwitter';

export default {
  name: 'PageSettingsTwitter',
  components: {
    SettingsTwitter,
  },
  props: {
    page: { type: Object, required: true },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped></style>
