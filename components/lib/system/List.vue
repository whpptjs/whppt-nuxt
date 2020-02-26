<template>
  <div class="whppt-full">
    <p class="font-xl">Component</p>

    <div class="whppt-contents__actions">
      <button class="whppt-contents__actions-add" @click="selectedComponent.addNew">+ Add New Item</button>
    </div>
    <div v-for="(item, key) in selectedComponent.value[selectedComponent.property]" :key="key">
      <div class="whppt-contents__item-container">
        <span>
          {{ item.title || `Item #${key + 1}` }}
        </span>
        <div class="whppt-contents__actions">
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

export default {
  name: 'EditorList',
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'options']),
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
  },
};
</script>
<style>
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

.whppt-contents__actions button:focus {
  outline: none;
}
.whppt-contents__actions button:hover {
  background: black;
}
.whppt-contents__actions-remove:hover {
  color: red !important;
}
</style>
