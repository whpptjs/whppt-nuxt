<template>
  <div class="whppt-full">
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      label="Anchor To"
      placeholder="eg. content"
    ></whppt-text-input>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../ui/InputField';

export default {
  name: 'WhpptAnchorMenu',
  components: { WhpptTextInput },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
