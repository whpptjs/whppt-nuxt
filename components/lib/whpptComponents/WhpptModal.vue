<template>
  <div v-if="isActive" class="whppt-modal">
    <div class="whppt-modal-inner">
      <div class="whppt-modal__background" @click="$emit('closeModal')"></div>
      <button class="whppt-modal__close-btn" aria-label="Close Modal" @click="$emit('closeModal')">
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

.whppt-settings {
  color: black;
  display: flex;
  z-index: 52;
  width: 75%;
  min-height: 80vh;
  max-height: 90vh;
  margin: 1.5rem;
  position: relative;
}

.whppt-settings__content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  width: 100%;
}

.whppt-settings__heading {
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 1rem;
  border-bottom: 1px solid #718096;
  height: 5rem;
}

.whppt-settings__button {
  color: #981a31;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #981a31;
  transition: 0.2s;
}

.whppt-settings__button:hover,
.whppt-settings__button:focus {
  background-color: #981a31;
  color: white;
}

.whppt-settings__tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #981a31;
  padding: 0 1rem;
  border-bottom: 1px solid #718096;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 0.5rem;
}

.whppt-settings__tab {
  height: 100%;
  cursor: pointer;
  padding: 0.75rem 0;
  margin-right: 1.5rem;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.whppt-settings__tab-selected {
  border-bottom: 2px solid #981a31;
}

.whppt-settings__heading-text {
  font-size: 1.75rem;
  color: #981a31;
}

.whppt-warning {
  color: black;
  display: flex;
  z-index: 53;
  width: 100%;
  height: 80vh;
  margin: 1.5rem;
  position: relative;
}
</style>
