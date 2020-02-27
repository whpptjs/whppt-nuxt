<template>
  <div v-if="isActive" class="whppt-modal">
    <div class="whppt-modal-inner">
      <div class="whppt-modal__background" @click="$emit('closeModal')"></div>
      <button class="whppt-modal__close-btn" @click="$emit('closeModal')">
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
      <div class="whppt-modal__content">
        <slot name="content" />
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
      required: true,
      default: () => false,
    },
  },
  destroyed() {
    this.$emit('closeModal');
  },
};
</script>

<style>
.whppt-modal {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 52;
}

.whppt-modal__background {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.whppt-modal__close-btn {
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

.whppt-modal__content {
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.whppt-modal-inner {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
