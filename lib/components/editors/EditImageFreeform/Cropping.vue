<template>
  <div>
    <div v-for="(canvas, canvasName) in sizes" :key="canvasName">
      <p>{{ canvasName }}</p>
      <cropper
        v-if="imageOptions.imageId"
        :style="`background: #000; width:${canvas.width / canvas.quality}px;`"
        :wheel-resize="false"
        :default-position="vals => defaultPosition({ canvas, canvasName }, vals)"
        :default-size="vals => defaultSize({ canvas, canvasName }, vals)"
        :src="`${baseImageUrl}/${imageOptions.imageId}?o=true`"
        @change="changes => change({ canvas, canvasName }, changes)"
      ></cropper>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Cropper } from 'vue-advanced-cropper';

export default {
  name: 'EditorImageFreeformCropping',
  components: { Cropper },
  props: {
    imageOptions: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('whppt/editor', ['baseImageUrl', 'baseCdnImageUrl']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    change({ canvasName }, changes) {
      const { coordinates } = changes;

      const dimensions = {
        top: coordinates.top,
        left: coordinates.left,
        width: coordinates.width,
        height: coordinates.height,
      };

      this.$emit('changed', { dimensions, canvasName });
    },
    defaultPosition({ canvasName }, { imageWidth, imageHeight }) {
      const top = this.imageOptions[canvasName] && this.imageOptions[canvasName].top;
      const left = this.imageOptions[canvasName] && this.imageOptions[canvasName].left;

      this.width = imageWidth;

      if (!top && !left) {
        this.change({ canvasName }, { coordinates: { top: 0, left: 0, width: imageWidth, height: imageHeight } });
      }

      return {
        top: this.imageOptions[canvasName].top,
        left: this.imageOptions[canvasName].left,
      };
    },
    defaultSize({ canvasName }, { imageWidth, imageHeight }) {
      const width = this.imageOptions[canvasName] && this.imageOptions[canvasName].width;
      const height = this.imageOptions[canvasName] && this.imageOptions[canvasName].height;

      if (!width && !height) {
        this.change({ canvasName }, { coordinates: { top: 0, left: 0, width: imageWidth, height: imageHeight } });
      }

      return {
        width: this.imageOptions[canvasName].width,
        height: this.imageOptions[canvasName].height,
      };
    },
  },
};
</script>
