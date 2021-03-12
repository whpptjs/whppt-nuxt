<template>
  <div class="whppt-autocomplete" :class="{ 'whppt-autocomplete--dark': dark }">
    <WhpptInput
      id="mehh"
      v-model="searchQuery"
      :value="setTextProp(internalValue)"
      v-bind="$attrs"
      :dark="dark"
      @input="onChange"
    />
    <slot :results="results">
      <div v-if="isSearching && searchQuery" class="whppt-autocomplete__menu">
        <ul role="listbox">
          <li v-for="(result, index) in results" :key="index" role="option" @click="setResult(result)">
            {{ setTextProp(result) }}
          </li>
          <li v-if="results && !results.length" class="whppt-autocomplete__no-result">
            No Results
          </li>
        </ul>
      </div>
    </slot>
    <span v-if="info" class="whppt-info">{{ info }}</span>
  </div>
</template>

<script>
import WhpptInput from './Input';

export default {
  name: 'WhpptAutocomplete',
  components: {
    WhpptInput,
  },
  props: {
    items: { type: Array, default: () => [] },
    dark: { type: Boolean, default: true },
    info: { type: String, default: '' },
    value: { type: [String, Array, Object], default: '' },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
  },
  data: () => ({
    isSearching: false,
    searchQuery: '',
  }),
  computed: {
    results() {
      if (!this.searchQuery) return [];

      return this.items.filter(item => {
        const _itemText = typeof this.item === 'object' ? item : item[this.itemText];

        return _itemText.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    internalValue() {
      if (typeof this.value === 'object') return this.value[this.itemText];

      const itemFromValue = find(this.items, i => i[this.itemValue] === this.value);

      return itemFromValue ? itemFromValue[this.itemText] : this.value;
    },
  },
  created() {
    this.searchQuery = this.setTextProp(this.value);
  },
  methods: {
    setValueProp(item) {
      if (typeof item !== 'object') return item;

      return item[this.itemValue];
    },
    setTextProp(item) {
      if (typeof item !== 'object') return item;

      return item[this.itemText];
    },
    setResult(result) {
      this.isSearching = false;
      this.searchQuery = typeof result !== 'object' ? result : result[this.itemText];

      this.$emit('input', result);
    },
    onChange() {
      this.$emit('input', this.searchQuery);

      if (this.searchQuery) this.isSearching = true;
    },
  },
};
</script>

<style scoped lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-autocomplete {
  position: relative;

  .whppt-info {
    font-size: 0.75rem;
    font-style: italic;
    color: $gray-500;
  }

  &__menu {
    left: 0;
    z-index: 1;
    position: absolute;
    width: 100%;

    &--up {
      bottom: 0;
    }

    &--down {
      top: 0;
    }

    ul {
      border: 1px solid $gray-500;
      border-radius: 0.25rem;
      background-color: white;
      padding: 0.5rem 0;
      margin: 0;
      list-style: none;

      li {
        padding: 0.75rem;

        &:hover {
          background-color: $gray-200;
        }
      }

      li.whppt-autocomplete__no-result {
        color: $gray-500;
      }
    }
  }

  &--dark {
    .whppt-autocomplete__menu {
      ul {
        border: 1px solid $gray-500;
        background-color: $gray-800;

        li {
          color: white;

          &:hover {
            background-color: $gray-900;
          }
        }

        li.whppt-autocomplete__no-result {
          color: $gray-500;
        }
      }
    }
  }
}
</style>
