<template>
  <div class="whppt-pagination" :class="{ 'whppt-pagination--dark': dark }">
    <div class="whppt-pagination__per-page">
      <whppt-select
        :id="`${$options._scopeId}-per-page-items`"
        :items="perPageItems"
        :value="perPage"
        dense
        width="5rem"
        :dark="dark"
        :direction="direction"
        class="whppt-pagination__per-page-select"
        @input="changePerPage"
      />
    </div>
    <div class="whppt-pagination__results">{{ results }}</div>
    <div class="whppt-pagination__buttons">
      <whppt-button flat :disabled="prevDisabled" @click="onPageChangePrev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          style="transform: rotate(360deg)"
        >
          <path
            d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
            fill="currentColor"
          ></path>
        </svg>
      </whppt-button>
      <whppt-button flat :disabled="nextDisabled" @click="onPageChangeNext">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          style="transform: rotate(360deg)"
        >
          <path
            d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
            fill="currentColor"
          ></path>
        </svg>
      </whppt-button>
    </div>
  </div>
</template>

<script>
import WhpptSelect from './Select';
import WhpptButton from './Button';

export default {
  name: 'WhpptPagination',
  components: {
    WhpptSelect,
    WhpptButton,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    perPageItems: {
      type: Array,
      default: () => [5, 10, 25, 50, 100],
    },
    dark: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'down',
      validator: value => ['up', 'down'].includes(value),
    },
  },
  computed: {
    results() {
      if (!this.page) return '';
      const firstNumber = this.page * this.perPage - this.perPage + 1;
      const secondNumber = this.total < this.page * this.perPage ? this.total : this.page * this.perPage;

      const shownItems = `${firstNumber} - ${secondNumber}`;

      return this.total ? `${shownItems} of ${this.total}` : `showing results ${shownItems}`;
    },
    prevDisabled() {
      return Boolean(this.page === 1);
    },
    nextDisabled() {
      const pageCount = Math.ceil(Math.abs(this.total / this.perPage));

      return Boolean(this.page === pageCount);
    },
  },
  methods: {
    changePerPage($event) {
      this.$emit('update:page', 1);
      this.$emit('update:perPage', $event);
    },
    onPageChangePrev() {
      if (this.prevDisabled) return;
      this.$emit('update:page', this.page - 1);
    },
    onPageChangeNext() {
      if (this.nextDisabled) return;
      this.$emit('update:page', this.page + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-100: #f7fafc;
$gray-200: #edf2f7;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-pagination {
  display: flex;
  align-items: center;

  &__buttons {
    display: flex;

    button:nth-child(1) {
      margin-right: 0.5rem;
    }

    svg {
      color: $gray-800;
    }
  }

  &--dark {
    color: white;

    .whppt-pagination__buttons {
      svg {
        color: white;
      }
    }

    .whppt-pagination__results {
      color: white;
    }
  }

  &__per-page {
  }

  &__results {
    text-align: center;
    width: 8rem;
    margin: 0 0.5rem;
    color: $gray-800;
  }
}
</style>
