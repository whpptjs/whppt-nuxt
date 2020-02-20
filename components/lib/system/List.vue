<template>
  <div class="whppt-full">
    <h1>Component</h1>
    <div class="whppt-contents__actions my-8">
      <button class="whppt-contents__actions-add" @click="selectedComponent.addNew">Add New Item</button>
    </div>
    <div v-for="(item, key) in selectedComponent.value[selectedComponent.property]" :key="key">
      <div class="flex  mb-2 w-full">
        <span class="mr-5 flex-1">
          {{ item.title || `Item #${key}` }}
        </span>
        <div class="whppt-contents__actions flex-1">
          <button class="whppt-contents__actions-remove" @click="removeItem(item)">
            Remove Item
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
  name: 'EditorBlank',
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
  margin-bottom: 10px;
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
