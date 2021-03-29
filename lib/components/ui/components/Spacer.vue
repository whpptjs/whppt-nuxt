<template>
  <div :style="spacerStyles"></div>
</template>

<script>
export default {
  name: 'WhpptSpacer',
  props: {
    width: { type: [Number, String], default: 0 },
  },
  computed: {
    spacerStyles() {
      const width = `width: ${typeof this.width === 'number' ? `${this.width}rem` : `${this.width}`}`;

      return `${width};`;
    },
  },
};
</script>
