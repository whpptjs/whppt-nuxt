<template>
  <div>
    <croppa
      :disable-drag-and-drop="true"
      :disable-click-to-choose="true"
      width="300"
      v-model="myCroppa"
      :initial-image="undefined"
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
  data() {
    return {
      myCroppa: {},
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
<style scoped></style>
