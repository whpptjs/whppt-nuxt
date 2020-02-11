<template>
  <div>
    <croppa
      v-if="croppaImage"
      :disable-drag-and-drop="true"
      :disable-click-to-choose="true"
      :width="300"
      v-model="myCroppa"
      :initial-image="croppaImage"
      :placeholder="'Choose an image'"
      :accept="'image/*'"
      :file-size-limit="0"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';

export default {
  name: 'EditorImageCropping',
  components: { croppa: Croppa.component },
  props: {
    value: {
      type: Object,
      default: () => undefined,
    },
  },
  data() {
    return {
      myCroppa: {},
      image: undefined,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    croppaImage() {
      const img = new Image();
      img.src = this.value.url;
      return img;
    },
  },
};
</script>
<style scoped></style>
