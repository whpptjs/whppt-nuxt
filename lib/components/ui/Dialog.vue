<template>
  <div v-if="isActive" class="whppt-modal" :class="{ 'whppt-modal--full': full }">
    <div class="whppt-modal__background">
      <div
        class="whppt-modal__inner"
        :class="{ 'whppt-modal__inner--dark': dark, 'whppt-modal__inner--full': full }"
        :style="dialogComputedStyles"
      >
        <button class="whppt-modal__close-btn" aria-label="Close Modal" @click="$emit('closed')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="stroke: currentColor;"
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
        <div class="whppt-modal__header">
          <slot name="header"></slot>
        </div>
        <div class="whppt-modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptModal',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [String, Number],
      default: undefined,
    },
    width: {
      type: [String, Number],
      default: undefined,
    },
  },
  computed: {
    dialogComputedStyles() {
      if (!this.height && !this.width) return;
      const maxWidth = this.width && `max-width: ${typeof this.width === 'number' ? `${this.width}px` : this.width};`;
      const maxHeight =
        this.height && `max-height: ${typeof this.height === 'number' ? `${this.height}px` : this.height};`;

      return `${maxWidth} ${maxHeight}`;
    },
  },
  destroyed() {
    this.$emit('closed');
  },
};
</script>

<style lang="scss" scoped>
$gray-100: #f7fafc;
$gray-200: #edf2f7;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-modal {
  &__background {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__close-btn {
    position: absolute;
    background-color: transparent;
    border: none;
    z-index: 50;
    color: white;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1rem;
    right: 1rem;
  }

  &__inner {
    margin: 0 auto;
    height: 80vh;
    width: 80%;
    max-width: 900px;
    border-radius: 0.25rem;
    background-color: $gray-100;
    overflow: hidden;

    &--dark {
      color: white;
      background-color: $gray-800;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 6rem;
    overflow-y: auto;
  }

  &--full {
    .whppt-modal__close-btn {
      display: none;
    }

    .whppt-modal__inner--full {
      height: 100vh;
      width: 100%;
      border: none;
      border-radius: 0;
      max-width: unset;
    }

    .whppt-modal__content {
      padding: 0;
    }
  }
}
</style>
