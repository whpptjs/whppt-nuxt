<template>
  <div class="whppt-full">
    <p class="font-xl">Component</p>

    <div class="whppt-contents__actions">
      <button class="whppt-contents__actions-add" @click="selectedComponent.addNew">+ Add New Item</button>
    </div>
    <div v-for="(item, index) in selectedComponent.value[selectedComponent.property]" :key="index">
      <div class="whppt-contents__item-container">
        <span>
          {{
            typeof item !== 'object' ? item || `Item #${index + 1}` : item.name || item.title || `Item #${index + 1}`
          }}
        </span>
        <div class="whppt-contents__actions">
          <button :disabled="index === 0" @click="moveUp(item, index)">
            <arrow-up />
          </button>
          <button :disabled="index >= items.length - 1" @click="moveDown(item, index)">
            <arrow-down />
          </button>
          <button class="whppt-contents__actions-remove" @click="removeItem(item)">
            ⊖ Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { without } from 'lodash';
import ArrowUp from '../icons/ArrowUp';
import ArrowDown from '../icons/ArrowDown';
export default {
  name: 'EditorList',
  components: { ArrowUp, ArrowDown },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'options']),
    items() {
      return this.selectedComponent.value[this.selectedComponent.property];
    },
  },
  methods: {
    removeItem(link) {
      if (window.confirm('Are you sure?')) {
        this.selectedComponent.value[this.selectedComponent.property] = without(
          this.selectedComponent.value[this.selectedComponent.property],
          link
        );
      }
    },
    moveUp(item, index) {
      this.items.splice(index, 1);
      this.items.splice(index - 1, 0, item);
    },
    moveDown(item, index) {
      this.items.splice(index, 1);
      this.items.splice(index + 1, 0, item);
    },
  },
};
</script>
<style scoped>
.whppt-contents__actions {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
.whppt-contents__actions button {
  background: rgba(0, 0, 0, 0.2);
  font-size: 12px;
  color: white;
  padding: 10px;
  border-width: 0;
  border-radius: 5px;
  cursor: pointer;
}

.whppt-contents__actions-add {
  width: 100%;
}

.whppt-contents__item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.whppt-contents__actions button:hover {
  background: black;
}
.whppt-contents__actions-remove:hover {
  color: red !important;
}

button:disabled {
  color: grey;
}
</style>
