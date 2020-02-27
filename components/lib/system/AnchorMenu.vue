<template>
  <div class="whppt-full">
    <p class="font-xl">Anchor</p>
    <whppt-text-input
      v-model="selectedComponent.value.id"
      label="Anchor To"
      placeholder="eg. content"
    ></whppt-text-input>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'WhpptAnchorMenu',
  components: { WhpptTextInput },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
