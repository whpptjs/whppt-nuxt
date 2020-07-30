<template>
  <div class="whppt-pagination-container">
    <div class="whppt-pagination-left-nav">
      <button aria-label="Go To First" :disabled="currentPage === 1" @click="goToPage(1)">
        ⇤
      </button>
      <button aria-label="Previous" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        ←
      </button>
    </div>

    <button
      v-for="(page, index) in pagesShowing"
      :key="index"
      :disabled="page.isDisabled"
      class="whppt-pagination-page-button"
      :class="{ 'whppt-pagination-page-button__selected': currentPage === page.name }"
      @click="goToPage(page.name)"
    >
      {{ page.name }}
    </button>
    <div class="whppt-pagination-right-nav">
      <button
        aria-label="Next"
        :disabled="currentPage === Math.max(pageAmount, 1)"
        class="whppt-pagination-right-buttons"
        @click="goToPage(currentPage + 1)"
      >
        →
      </button>

      <button
        aria-label="Go To Last"
        :disabled="currentPage === Math.max(pageAmount, 1)"
        @click="goToPage(Math.max(pageAmount, 1))"
      >
        ⇥
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptButton',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    pageAmount: {
      type: Number,
      required: true,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    firstPageShowing() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.pageAmount) {
        return this.pageAmount - this.maxVisibleButtons;
      }
      return this.currentPage - 1;
    },
    pagesShowing() {
      return new Array(this.pageAmount || 1)
        .fill(undefined)
        .slice(this.firstPageShowing - 1, Math.min(this.pageAmount || 1, this.maxVisibleButtons))
        .map((_, index) => ({ name: index + 1, isDisabled: index === this.currentPage - 1 }));
    },
  },
  methods: {
    goToPage(pageName) {
      this.$emit('pageChanged', pageName);
    },
  },
};
</script>

<style>
.whppt-pagination-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 20px;
  cursor: default;
}

.whppt-pagination-page-button {
  width: 25px;
  height: 25px;
  border-radius: 12px;
  color: linen;
  margin: 0 5px;
  border-width: 1px;
  border-style: solid;
  border-color: linen;
}

.whppt-pagination-page-button__selected {
  background: linen;
  color: black;
}

.whppt-pagination-left-nav {
  display: flex;
  margin-right: auto;
}

.whppt-pagination-left-nav > button:first-child {
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
}

.whppt-pagination-right-nav {
  display: flex;
  margin-left: auto;
}
.whppt-pagination-right-nav > button:last-child {
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
}

.whppt-pagination-left-nav button:disabled,
.whppt-pagination-right-nav button:disabled {
  opacity: 50%;
}
</style>
