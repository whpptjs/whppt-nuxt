<template>
  <div v-if="isActive" class="h-screen w-screen fixed inset-0 overflow-hidden">
    <div class="relative h-full w-full">
      <div class="absolute bg-gray-900 opacity-75 inset-0"></div>
      <button
        class="absolute z-50 text-white w-12 h-12 flex justify-center items-center"
        style="top: 1rem; right: 1rem;"
        aria-label="Close Modal"
        @click="$emit('closeModal')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current "
          width="22.828"
          height="22.828"
          viewBox="0 0 22.828 22.828"
        >
          <g transform="translate(-3.586 -3.586)">
            <line
              fill="none"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2px"
              x1="20"
              y2="20"
              transform="translate(5 5)"
            />
            <line
              fill="none"
              stroke-linecap="square"
              stroke-miterlimit="10"
              stroke-width="2px"
              x1="20"
              y1="20"
              transform="translate(5 5)"
            />
          </g>
        </svg>
      </button>
      <div class="h-screen w-screen flex justify-center items-center">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  destroyed() {
    this.$emit('closeModal');
  },
};
</script>
