<template>
  <div class="whppt-pagination-container">
    <div class="whppt-pagination-left-nav">
      <div @click="goToPage(1)" :disabled="currentPage === 1">
        ↤
      </div>

      <div @click="gotoPage(currentPage - 1)" :disabled="currentPage === 1">
        ←
      </div>
    </div>

    <button
      v-for="(page, index) in pagesShowing"
      :key="index"
      @click="goToPage(page.name)"
      :disabled="page.isDisabled"
      class=""
    >
      {{ page.name }}
    </button>
    <div class="whppt-pagination-right-nav">
      <div
        @click="gotoPage(currentPage + 1)"
        :disabled="currentPage === pageAmount"
        class="whppt-pagination-right-buttons"
      >
        →
      </div>

      <div @click="goToPage(pageAmount)" :disabled="currentPage === pageAmount">
        ↦
      </div>
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
}

.whppt-pagination-container button {
  background: linen;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  color: black;
  font: 14px;
}

.whppt-pagination-left-nav {
  display: flex;
  margin-right: auto;
}

.whppt-pagination-left-nav > div:first-child {
  margin-right: 10px;
  font-weight: bold;
}

.whppt-pagination-right-nav {
  display: flex;
  margin-left: auto;
}
.whppt-pagination-right-nav > div:last-child {
  margin-left: 10px;
  font-weight: bold;
}
</style>
