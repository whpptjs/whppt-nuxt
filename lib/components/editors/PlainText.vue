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
import WhpptTextarea from '../ui/Textarea';

export default {
  name: 'WhpptTextEditor',
  components: {
    WhpptTextarea,
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    updateSelectedComponent(ev) {
      this.setSelectedComponentState({ value: ev, path: this.selectedComponent.property });
    },
  },
};
</script>

<style scoped></style>
