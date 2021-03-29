<template>
  <div>
    <whppt-rich-text-input
      :value="richTextValue"
      :hide-menu="selectedComponent.hideMenu"
      :hide-style="selectedComponent.hideStyle"
      :hide-headers="selectedComponent.hideHeaders"
      :hide-lists="selectedComponent.hideLists"
      :hide-links="selectedComponent.hideLinks"
      @input="updateSelectedComponent"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptRichTextInput from '../ui/components/RichText';

export default {
  name: 'WhpptRichTextEditor',
  components: {
    WhpptRichTextInput,
  },
  data: () => ({
    richTextValue: undefined,
  }),
  computed: {
    ...mapState('whppt/editor', ['selectedComponent', 'richTextWatcher']),
  },
  watch: {
    richTextWatcher() {
      this.richTextValue = this.selectedComponent.value[this.selectedComponent.property];
    },
  },
  mounted() {
    this.richTextValue = this.selectedComponent.value[this.selectedComponent.property];
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    updateSelectedComponent(ev) {
      this.setSelectedComponentState({ value: ev, path: this.selectedComponent.property });
    },
  },
};
</script>
