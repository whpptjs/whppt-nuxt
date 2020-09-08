<template>
  <div>
    <div v-for="(canvas, canvasName) in sizes" :key="canvasName">
      <md-subheader>{{ canvasName }}</md-subheader>
      <cropper
        v-if="imageOptions.imageId"
        :style="`background: #000; width:${canvas.width / canvas.quality}px;`"
        :wheel-resize="false"
        :default-position="vals => defaultPosition({ canvas, canvasName }, vals)"
        :default-size="vals => defaultSize({ canvas, canvasName }, vals)"
        :src="`${baseImageUrl}/${imageOptions.imageId}?o=true`"
        :stencil-props="{
          aspectRatio: canvas.aspectRatio,
        }"
        @change="changes => change({ canvas, canvasName }, changes)"
      ></cropper>
    </div>
    <whppt-text-input
      id="editor-image-alt"
      :value="imageOptions.alt"
      placeholder="e.g. Article Heading Image"
      label="Image alt text"
      @input="setSelectedComponentState({ value: $event, path: 'image.alt' })"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Cropper } from 'vue-advanced-cropper';
import WhpptTextInput from '../../ui/Input';

export default {
  name: 'EditorImageCropping',
  components: { Cropper, WhpptTextInput },
  props: {
    imageOptions: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      required: true,
    },
    labelColour: {
      type: String,
      default: () => 'white',
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseImageUrl', 'baseCdnImageUrl']),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    change({ canvasName }, changes) {
      const { coordinates } = changes;

      const dimensions = {
        top: coordinates.top,
        left: coordinates.left,
        width: coordinates.width,
        height: coordinates.height,
      };

      this.setSelectedComponentState({ value: dimensions, path: `image[${canvasName}]` });
    },
    defaultPosition({ canvasName }, { imageWidth, imageHeight }) {
      this.width = imageWidth;
      if (!this.imageOptions[canvasName]) {
        this.setSelectedComponentState({
          value: {
            top: 0,
            left: 0,
            width: imageWidth,
            height: imageHeight,
          },
          path: `image[${canvasName}]`,
        });
      }

      return {
        top: this.imageOptions[canvasName].top,
        left: this.imageOptions[canvasName].left,
      };
    },
    defaultSize({ canvasName }, { imageWidth, imageHeight }) {
      if (!this.imageOptions[canvasName]) {
        this.setSelectedComponentState({
          value: {
            top: 0,
            left: 0,
            width: imageWidth,
            height: imageHeight,
          },
          path: `image[${canvasName}]`,
        });
      }

      return {
        width: this.imageOptions[canvasName].width,
        height: this.imageOptions[canvasName].height,
      };
    },
  },
};
</script>
