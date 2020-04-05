<template>
  <div>
    <div v-if="isSizesEmpty">Missing Image Sizes</div>
    <div v-if="!isSizesEmpty">
      <div v-for="canvas in sizes" :key="canvas.name" class="whppt-cropper-container">
        <label class="whppt-cropper-label">{{ canvas.name }}</label>
        <croppa
          :key="canvas.name"
          :ref="`${canvas.name}Croppa`"
          :show-loading="true"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="true"
          :width="canvas.width / canvas.quality"
          :height="canvas.height / canvas.quality"
          :quality="canvas.quality"
          :initial-image="$whppt.originalImageUrl(imageOptionsCopy.imageId)"
          placeholder="Choose from gallery"
          :placeholder-font-size="14"
          :accept="'image/*'"
          :file-size-limit="0"
          :prevent-white-space="true"
          @new-image-drawn="applyManipulation"
          @image-remove="$emit('imageRemoved')"
          @draw="change(canvas.name)"
        />
      </div>
      <whppt-button class="whppt-cropper__apply-change" @click="applyChanges">Apply</whppt-button>
      <whppt-text-input v-model="imageOptions.alt" placeholder="e.g. Article Heading Image" label="Image alt text" />
    </div>
  </div>
</template>

<script>
import { forEach, cloneDeep } from 'lodash';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import WhpptButton from '../../whpptComponents/WhpptButton';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component, WhpptButton, WhpptTextInput },
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
      croppas: [],
    };
  },
  computed: {
    isSizesEmpty() {
      return !Object.keys(this.sizes).length;
    },
  },
  watch: {
    'imageOptions.imageId'(val) {
      this.imageOptionsCopy.imageId = val;
      this.imageOptionsCopy.crop = cloneDeep(this.imageOptions.crop);
      forEach(this.sizes, (size, key) => {
        size.name = key;
        this.$refs[`${key}Croppa`][0].refresh();
      });
    },
  },
  created() {
    this.imageOptions.crop = this.imageOptions.crop || {};

    forEach(this.sizes, (size, key) => {
      size.name = key;
    });

    this.imageOptionsCopy = cloneDeep(this.imageOptions);
  },
  methods: {
    applyManipulation() {
      this.$nextTick(() =>
        forEach(this.sizes, (size, key) => {
          this.$refs[`${key}Croppa`][0].applyMetadata(this.imageOptions.crop[key] || {});
        })
      );
    },

    change(sizeKey) {
      const croppa = this.$refs[`${sizeKey}Croppa`][0];
      const meta = {
        startX: croppa.imgData.startX,
        startY: croppa.imgData.startY,
        orientation: croppa.orientation,
        scale: croppa.scaleRatio,
      };
      this.imageOptionsCopy.crop[sizeKey] = meta;
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
