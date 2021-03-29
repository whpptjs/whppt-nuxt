<template>
  <div
    class="whppt-select"
    :class="{ 'whppt-select--dark': dark, 'whppt-select--dense': dense }"
    :style="`width: ${typeof width === 'number' ? `${width}px` : width}`"
  >
    <label v-if="label" :for="id">{{ label }}</label>
    <div v-click-outside="close" class="whppt-select__input">
      <input
        :id="id"
        :placeholder="placeholder"
        :value="internalValue"
        :class="{ 'whppt-select--menu-active': showSelectItems }"
        :style="`width: ${typeof width === 'number' ? `${width}px` : width}`"
        readonly
        @click="showSelectItems = true"
        @focus="showSelectItems = true"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.tab="close"
      />
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      <div v-if="showSelectItems" class="whppt-select__menu" :class="`whppt-select__menu--${direction}`">
        <ul role="listbox" :aria-expanded="showSelectItems">
          <li
            v-if="placeholder"
            class="whppt-select__menu-item default"
            role="option"
            @click="updateValue(undefined, undefined)"
          >
            {{ placeholder }}
          </li>
          <li
            v-for="(item, index) in items"
            :key="index"
            role="option"
            class="whppt-select__menu-item"
            :class="{ 'whppt-select__menu-item--active': arrowCounter === index }"
            @click="updateValue(setTextProp(item), setValueProp(item))"
          >
            {{ setTextProp(item) }}
          </li>
        </ul>
      </div>
    </div>
    <p v-if="info" class="info">{{ info }}</p>
    <span v-if="error && typeof error === 'string'" class="whppt-error">{{ error }}</span>
    <div v-if="error && Array.isArray(error)">
      <span v-for="(err, index) in error" :key="index" class="whppt-error">
        {{ err }}<span v-if="index + 1 < error.length">, </span>
      </span>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash';
import clickOutside from '../directives/clickOutside';

export default {
  name: 'WhpptSelect',
  directives: {
    clickOutside,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String, Object, Array, Boolean],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    error: { type: [String, Array], default: '' },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'down',
      validator: value => ['up', 'down'].includes(value),
    },
  },
  data: () => ({
    showSelectItems: false,
    arrowCounter: -1,
  }),
  computed: {
    internalValue() {
      if (typeof this.value === 'object') return this.value[this.itemText];

      const itemFromValue = find(this.items, i => i[this.itemValue] === this.value);

      return itemFromValue ? itemFromValue[this.itemText] : this.value;
    },
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
    onInput(value) {
      const returnValue = this.returnObject ? find(this.items, i => i[this.itemValue] === value) : value;

      this.$emit('input', returnValue);
    },
    onChange(value) {
      const returnValue = this.returnObject ? find(this.items, i => i[this.itemValue] === value) : value;

      this.$emit('change', returnValue);
    },
    updateValue(text, value) {
      if (this.showSelectItems) this.showSelectItems = false;

      this.onInput(value);
      this.onChange(value);
    },
    close() {
      this.showSelectItems = false;
    },
    onArrowDown() {
      if (this.arrowCounter > this.items.length) return this.close();

      if (this.arrowCounter < this.items.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      const item = this.items[this.arrowCounter];

      this.updateValue(this.setTextProp(item), this.setValueProp(item));

      this.arrowCounter = -1;
    },
  },
};
</script>

<style scoped lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

$danger-600: #e53e3e;

.whppt-select {
  position: relative;

  label {
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  .whppt-error {
    font-size: 0.75rem;
    color: $danger-600;
  }

  .info {
    font-size: 0.75rem;
    font-style: italic;
    color: $gray-500;
  }

  .whppt-select__input {
    position: relative;

    input {
      box-sizing: border-box;
      display: block;
      background-color: $gray-200;
      color: $gray-700;
      border: 1px solid $gray-200;
      border-radius: 0.25rem;
      padding: 1rem 0.75rem;
      line-height: 1.25;

      &:focus {
        outline: none;
        background-color: white;
        border-color: $gray-500;
      }
    }

    .icon {
      pointer-events: none;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      color: $gray-700;

      svg {
        fill: currentColor;
        height: 1rem;
        width: 1rem;
      }
    }
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

      .whppt-select__menu-item--active {
        background-color: $gray-200;
      }

      li {
        padding: 0.75rem;

        &:hover {
          background-color: $gray-200;
        }
      }

      li.default {
        color: $gray-500;
      }
    }
  }

  &--dense {
    .whppt-select__input {
      input {
        padding: 0.5rem;
      }
    }

    .whppt-select__menu {
      ul {
        padding: 0.25rem 0;

        li {
          padding: 0.5rem;
        }
      }
    }
  }

  &--dark {
    label {
      color: white;
    }

    .whppt-select__input {
      input {
        background-color: $gray-900;
        color: white;
        border: 1px solid $gray-500;

        &:focus {
          background-color: $gray-800;
        }
      }

      .icon {
        color: $gray-200;
      }
    }

    .whppt-select__menu {
      ul {
        border: 1px solid $gray-500;
        background-color: $gray-800;

        .whppt-select__menu-item--active {
          background-color: $gray-900;
        }

        li {
          color: white;

          &:hover {
            background-color: $gray-900;
          }
        }

        li.default {
          color: $gray-500;
        }
      }
    }
  }
}
</style>
