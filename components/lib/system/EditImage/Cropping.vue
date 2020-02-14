<template>
  <div>
    <div v-if="isSizesEmpty">Missing Image Sizes</div>
    <div v-if="!isSizesEmpty">
      <div v-for="canvas in imageOptionsCopy.sizes" :key="canvas.name" class="whppt-cropper-container">
        <label class="whppt-cropper-label">{{ canvas.name }}</label>
        <croppa
          :key="canvas.name"
          :disable-drag-and-drop="true"
          :disable-click-to-choose="true"
          :width="canvas.width / canvas.quality"
          :height="canvas.height / canvas.quality"
          v-model="canvas.croppa"
          :initial-image="$whppt.originalImageUrl(imageOptionsCopy.value.imageId)"
          :placeholder="'Choose an image'"
          :accept="'image/*'"
          :file-size-limit="0"
          :prevent-white-space="true"
          @initial-image-loaded="applyManipulation"
          @draw="change(canvas)"
        />
      </div>
      <whppt-button @click="applyChanges" class="whppt-cropper__apply-change">Apply Change</whppt-button>
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
import { each, pick, cloneDeep } from 'lodash';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import WhpptButton from '../../whpptComponents/WhpptButton';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component, WhpptButton },
  data() {
    return {
      imageOptionsCopy: {},
    };
  },
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
      size.imageId = this.imageOptions.value.imageId;
      size.croppa = {};
    });
    this.imageOptionsCopy = cloneDeep(this.imageOptions);
  },
  computed: {
    // selectedImage() {
    //   const img = new Image();
    //   img.src = this.image.src;
    //   return img;
    // },
    isSizesEmpty() {
      return !Object.keys(this.imageOptionsCopy.sizes).length;
    },
  },
  methods: {
    applyManipulation() {
      each(this.imageOptionsCopy.sizes, (size, key) => {
        size.croppa.applyMetadata(this.imageOptionsCopy.value.image[key] || {});
      });
    },
    change(canvas) {
      const meta = {
        ...pick(canvas.croppa.imgData, ['startX', 'startY']),
        ...pick(canvas.croppa, ['orientation']),
        scale: canvas.croppa.scaleRatio,
      };
      this.imageOptionsCopy.value.image[canvas.name] = meta;
    },
    applyChanges() {
      this.imageOptions.value.image = cloneDeep(this.imageOptionsCopy.value.image);
      this.imageOptions.value.imageId = this.imageOptionsCopy.value.imageId;
    },
  },
  // watch: {
  //   imageOptions(newImageOptions) {
  //     console.log('WATCH !!TCL: handler -> newImageOptions', newImageOptions);
  //     newImageOptions.sizes.each(size => {
  //       // size.options = newImageOptions.value.image[size.name];
  //       size.imageId = newImageOptions.value.imageId;
  //     });
  //   },
  // },
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
