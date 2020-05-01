<template>
  <div>
    <div v-for="(canvas, canvasName) in sizes" :key="canvasName">
      <label class="whppt-cropper-label">{{ canvas.name }}</label>
      image Options: {{ imageOptions }} Canvas: {{ canvas }} Width: {{ width }}
      <!-- :canvas="false" -->
      <!-- :style="{ width: `${width}px` }" -->
      <cropper
        style="background: #000;"
        :style="{ width: canvas.width / canvas.quality, height: canvas.height / canvas.quality }"
        :wheel-resize="false"
        :default-position="vals => defaultPosition({ canvas, canvasName }, vals)"
        :default-size="vals => defaultSize({ canvas, canvasName }, vals)"
        :src="`${baseCdnImageUrl2 || baseImageUrl2}/${imageOptions.imageId}?o=true`"
        :stencil-props="{
          aspectRatio: canvas.aspectRatio,
        }"
        @ready="ready"
        @change="changes => change({ canvas, canvasName }, changes)"
      ></cropper>
    </div>
    <!-- <whppt-button class="whppt-cropper__apply-change" @click="applyChanges">Apply</whppt-button> -->
    <whppt-text-input v-model="imageOptions.alt" placeholder="e.g. Article Heading Image" label="Image alt text" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { forEach, cloneDeep } from 'lodash';
import { Cropper } from 'vue-advanced-cropper';
// import WhpptButton from '../../whpptComponents/WhpptButton';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';

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
  },
  data() {
    return { width: 0 };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseImageUrl2', 'baseCdnImageUrl2']),
  },
  methods: {
    ready(arg) {
      console.log('ready -> arg', arg);
    },
    change({ canvasName }, changes) {
      const { coordinates } = changes;
      this.imageOptions[canvasName].top = coordinates.top;
      this.imageOptions[canvasName].left = coordinates.left;
      this.imageOptions[canvasName].width = coordinates.width;
      this.imageOptions[canvasName].height = coordinates.height;
    },
    defaultPosition({ canvasName }, { imageWidth, imageHeight }) {
      console.log('defaultPosition -> imageWidth', imageWidth);
      this.width = imageWidth;
      console.log('defaultPosition -> this.width', this.width);
      if (!this.imageOptions[canvasName])
        this.$set(this.imageOptions, canvasName, {
          top: 0,
          left: 0,
          width: imageWidth,
          height: imageHeight,
        });
      return {
        top: this.imageOptions[canvasName].top,
        left: this.imageOptions[canvasName].left,
      };
    },
    defaultSize({ canvasName }, { imageWidth, imageHeight }) {
      console.log('defaultSize -> canvasName', canvasName);
      console.log('defaultSize -> imageOptions[canvasName]', this.imageOptions[canvasName]);
      if (!this.imageOptions[canvasName])
        this.$set(this.imageOptions, canvasName, {
          top: 0,
          left: 0,
          width: imageWidth,
          height: imageHeight,
        });
      return {
        width: this.imageOptions[canvasName].width,
        height: this.imageOptions[canvasName].height,
      };
    },
  },
};
</script>
