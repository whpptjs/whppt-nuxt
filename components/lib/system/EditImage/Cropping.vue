<template>
  <div>
    <div v-if="isSizesEmpty">Missing Image Sizes</div>
    <div v-if="!isSizesEmpty">
      <div v-for="canvas in imageOptions.sizes" :key="canvas.name" class="whppt-cropper-container">
        <label class="whppt-cropper-label">{{ canvas.name }}</label>
        <croppa
          :key="canvas.name"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="false"
          :width="canvas.width / canvas.quality"
          :height="canvas.height / canvas.quality"
          v-model="canvas.croppa"
          :initial-image="$whppt.originalImageUrl(imageOptions.value.imageId)"
          :placeholder="'Choose an image'"
          :accept="'image/*'"
          :file-size-limit="0"
          @draw="change(canvas)"
        />
      </div>
      <whppt-button @click="applyChanges">Apply Change</whppt-button>
    </div>
  </div>
</template>

<script>
// const imageOptions = {
//   sizes:  {desktop: { name: 'desktop', w: 1000, h: 200, quality: 4 }},
//   value: {
//     imageId: 'aaabb',
//     image: {
//       desktop: { startX: 2, startY: 2, scale: 0.7 },
//       mobile: { startX: 2, startY: 2, scale: 0.7 },
//     },
//   },
// };
// import { mapState } from 'vuex';
import { each, pick } from 'lodash';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import WhpptButton from '../../whpptComponents/WhpptButton';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component, WhpptButton },
  props: {
    imageOptions: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.imageOptions.value = this.imageOptions.value || { image: {} };
    this.imageOptions.value.image = this.imageOptions.value.image || {};
    each(this.imageOptions.sizes, (size, key) => {
      size.name = key;
      // size.options = this.imageOptions.value.image[key] || {};
      size.imageId = this.imageOptions.value.imageId;
      size.croppa = {};
      // size.croppa.applyMetadata(size.options);
    });
    console.log('Created', this.imageOptions);
  },
  mounted() {
    each(this.imageOptions.sizes, (size, key) => {
      size.croppa.applyMetadata(this.imageOptions.value.image[key] || {});
    });
  },
  computed: {
    selectedImage() {
      const img = new Image();
      img.src = this.image.src;
      return img;
    },
    isSizesEmpty() {
      return !Object.keys(this.imageOptions.sizes).length;
    },
  },
  methods: {
    applyChanges() {},
    change(canvas) {
      const meta = {
        ...pick(canvas.croppa.imgData, ['startX', 'startY']),
        ...pick(canvas.croppa, ['orientation', 'scaleRatio']),
      };
      // try {
      //   console.log('TCL: change -> canvas.croppa', JSON.stringify(canvas.croppa, null, 2));
      //   console.log('TCL: change -> meta', JSON.stringify(meta, null, 2));
      // } catch (err) {
      //   console.log(err);
      // }
      this.imageOptions.value.image[canvas.name] = meta;
    },
  },
  watch: {
    imageOptions(newImageOptions) {
      console.log('WATCH !!TCL: handler -> newImageOptions', newImageOptions);
      newImageOptions.sizes.each(size => {
        // size.options = newImageOptions.value.image[size.name];
        size.imageId = newImageOptions.value.imageId;
      });
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
</style>
