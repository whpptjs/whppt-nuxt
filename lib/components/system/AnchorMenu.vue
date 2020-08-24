<template>
  <div class="whppt-full">
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      label="Anchor To"
      placeholder="eg. content"
      :label-colour="labelColour"
    ></whppt-text-input>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'WhpptAnchorMenu',
  components: { WhpptTextInput },
  props: {
    labelColour: { type: String, default: () => 'white' },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
