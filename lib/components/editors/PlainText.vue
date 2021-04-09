<template>
  <whppt-textarea
    id="editor-plain-text"
    :value="selectedComponent.value[selectedComponent.property]"
    label="Edit Text"
    @input="updateSelectedComponent"
  ></whppt-textarea>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptTextarea from '../ui/components/Textarea';

export default {
  name: 'WhpptTextEditor',
  components: {
    WhpptTextarea,
  },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    updateSelectedComponent(ev) {
      this.setSelectedComponentState({ value: this.$whppt.trim(ev), path: this.selectedComponent.property });
    },
  },
};
</script>

<style scoped></style>
