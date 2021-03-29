<template>
  <div class="whppt-full">
    <div class="whppt-contents__actions">
      <whppt-button @click="selectedComponent.addNew"><add /> Add New Item</whppt-button>
    </div>
    <div v-for="(item, index) in selectedComponent.value[selectedComponent.property]" :key="index">
      <div class="whppt-contents__item-container">
        <span>
          {{
            typeof item !== 'object' ? item || `Item #${index + 1}` : item.name || item.title || `Item #${index + 1}`
          }}
        </span>
        <div class="whppt-contents__actions">
          <whppt-button @click="moveUp(item, index)"><arrow-up /></whppt-button>
          <whppt-button @click="moveDown(item, index)"><arrow-down /></whppt-button>
          <whppt-button danger @click="removeItem(item)"><trash /></whppt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { without, clone } from 'lodash';
import ArrowUp from '../icons/ArrowUp';
import ArrowDown from '../icons/ArrowDown';
import Add from '../icons/Add';
import Trash from '../icons/Trash';
import WhpptButton from '../ui/components/Button';

export default {
  name: 'EditorList',
  components: { ArrowUp, ArrowDown, Add, Trash, WhpptButton },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent', 'options']),
    items() {
      return this.selectedComponent.value[this.selectedComponent.property];
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    removeItem(link) {
      if (window.confirm('Are you sure?')) {
        const removed = without(this.selectedComponent.value[this.selectedComponent.property], link);

        this.setSelectedComponentState({ value: removed, path: this.selectedComponent.property });
      }
    },
    moveUp(item, index) {
      const items = clone(this.items);

      items.splice(index, 1);
      items.splice(index - 1, 0, item);

      this.setSelectedComponentState({ value: items, path: this.selectedComponent.property, replace: true });
    },
    moveDown(item, index) {
      const items = clone(this.items);

      items.splice(index, 1);
      items.splice(index + 1, 0, item);

      this.setSelectedComponentState({ value: items, path: this.selectedComponent.property, replace: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-contents__actions {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.whppt-contents__actions button {
  margin-right: 0.25rem;
  width: 100%;
}

.whppt-contents__item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
