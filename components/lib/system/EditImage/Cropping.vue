<template>
  <div>
    <div v-if="isSizesEmpty">Missing Image Sizes</div>
    <div v-if="!isSizesEmpty">
      <div v-for="canvas in sizes" :key="canvas.name" class="whppt-cropper-container">
        <label class="whppt-cropper-label">{{ canvas.name }}</label>
        <croppa
          :key="canvas.name"
          v-model="canvas.croppa"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="true"
          :width="canvas.width / canvas.quality"
          :height="canvas.height / canvas.quality"
          :quality="canvas.quality"
          :initial-image="$whppt.originalImageUrl(imageOptionsCopy.imageId)"
          :placeholder="'Choose an image'"
          :accept="'image/*'"
          :file-size-limit="0"
          :prevent-white-space="true"
          @initial-image-loaded="applyManipulation"
          @draw="change(canvas)"
        />
      </div>
      <whppt-button class="whppt-cropper__apply-change" @click="applyChanges">Apply Change</whppt-button>
    </div>
  </div>
</template>

<script>
import { forEach, cloneDeep } from 'lodash';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import WhpptButton from '../../whpptComponents/WhpptButton';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component, WhpptButton },
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
    return {
      imageOptionsCopy: {},
    };
  },
  computed: {
    isSizesEmpty() {
      return !Object.keys(this.sizes).length;
    },
  },
  created() {
    this.imageOptions.crop = this.imageOptions.crop || {};

    forEach(this.sizes, (size, key) => {
      size.name = key;
      size.croppa = size.croppa || {};
    });

    this.imageOptionsCopy = cloneDeep(this.imageOptions);
  },
  methods: {
    applyManipulation() {
      this.$nextTick(() =>
        forEach(this.sizes, (size, key) => {
          size.croppa.applyMetadata(this.imageOptions.crop[key] || {});
        })
      );
    },
    change(canvas) {
      const meta = {
        startX: canvas.croppa.imgData.startX,
        startY: canvas.croppa.imgData.startY,
        orientation: canvas.croppa.orientation,
        scale: canvas.croppa.scaleRatio,
      };

      this.imageOptionsCopy.crop[canvas.name] = meta;
    },
    applyChanges() {
      this.imageOptions.crop = cloneDeep(this.imageOptionsCopy.crop);
    },
  },
};
</script>

<style scoped>
.whppt-cropper-container {
  margin-bottom: 10px;
}
.whppt-cropper-label {
  color: white;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-cropper__apply-change {
  margin: 10px 0;
}
</style>
