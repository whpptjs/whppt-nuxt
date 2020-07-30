<template>
  <div>
    <label class="whppt-tags__label">{{ label }}</label>
    <div v-if="!displayOnly" class="whppt-flex-start">
      <label>
        <span class="sr-only">New Tag</span>
        <input
          v-model="newTag"
          placeholder="Add New Tag"
          style="width: 50%; text-transform: uppercase;"
          @keydown.enter.prevent="addTag"
        />
      </label>
      <div style="padding-left: 1rem;">
        <button class="whppt-settings__button" style="display: flex;" type="button" @click="addTag">
          Add Tag
        </button>
      </div>
    </div>
    <div class="whppt-tags" :class="{ 'whppt-tags__display-only': displayOnly }">
      <div class="whppt-tags__container">
        <span class="whppt-tags__spacer">:</span>
        <span v-for="(tag, index) in tags" :key="index" class="whppt-tags__tag">
          <button v-if="!displayOnly" aria-label="Remove Tag" @click="deleteTag(tag)"><i-close /></button>{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { find, toUpper } from 'lodash';
import iClose from '../icons/Close';

export default {
  name: 'WhpptTagsInput',
  components: {
    iClose,
  },
  props: {
    tags: {
      type: Array,
      default: () => ({}),
    },
    displayOnly: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => 'Tags/Categories',
    },
  },
  data: () => ({
    newTag: '',
    error: '',
  }),
  methods: {
    addTag() {
      if (!this.newTag) return;
      if (find(this.tags, tag => tag === toUpper(this.newTag))) return;

      this.tags.push(toUpper(this.newTag));
      this.newTag = '';
    },
    deleteTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>

<style>
.whppt-tags {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  width: 100%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.whppt-tags__label {
  margin-bottom: 0.25rem;
  display: block;
}

.whppt-tags__display-only {
  padding-top: 0.5rem;
  cursor: not-allowed;
  background-color: #f1f1f1;
}

.whppt-tags input {
  background-color: transparent;
  border: none;
  display: flex;
  width: 100%;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
}

.whppt-tags__container {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}

.whppt-tags__spacer {
  padding: 0.5rem 0;
  visibility: hidden;
}

.whppt-tags__tag {
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  margin-right: 0.25rem;
  border-radius: 999px;
}

.whppt-tags__tag button {
  margin-right: 0.25rem;
}

.whppt-tags__error {
  color: red;
  font-size: 0.8rem;
}
</style>
