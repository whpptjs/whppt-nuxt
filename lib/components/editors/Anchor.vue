<template>
  <div class="whppt-full">
    <whppt-text-input
      id="editor-anchor-input"
      :value="selectedComponent.value[selectedComponent.property]"
      label="Anchor To"
      placeholder="eg. content"
      @input="setSelectedComponentState({ value: $event, path: selectedComponent.property })"
    ></whppt-text-input>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptTextInput from '../ui/components/Input';

export default {
  name: 'WhpptAnchorMenu',
  components: { WhpptTextInput },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
  },
};
</script>
