<template>
  <div>
    <whppt-select
      id="whppt-editor-select"
      :items="selectedComponent.items"
      :value="selectedComponent.value[selectedComponent.property]"
      placeholder="Select Item"
      @input="updateSelectedComponent"
    ></whppt-select>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptSelect from '../ui/components/Select';

export default {
  name: 'WhpptSelectEditor',
  components: {
    WhpptSelect,
  },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    updateSelectedComponent(ev) {
      this.setSelectedComponentState({ value: ev, path: this.selectedComponent.property });
    },
  },
};
</script>
