<template>
  <div class="whppt-gallery-container">
    <div class="whppt-gallery-item-container">
      <div class="whppt-gallery__add" @click="$refs.fileInput.click()">
        <input type="file" :accept="'image/*'" style="display: none;" ref="fileInput" />
        <span>+</span>
      </div>
    </div>
    <div v-for="image in images" :key="image.id" class="whppt-gallery-item-container">
      <div
        class="whppt-gallery-item"
        @click="$emit('input', image)"
        :style="{ 'background-image': `url('${image.url}')` }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EditorGallery',
  props: {
    value: {
      type: Object,
      default: () => undefined,
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  mounted() {
    this.baseAPIUrl = this.$whppt.baseAPIUrl || '';
    this.$axios
      .get(`${this.baseAPIUrl}/api/image/fetch`, { limit: this.limit, currentPage: this.currentPage })
      .then(({ data: { images, total } }) => {
        console.log('TCL: mounted -> images', images);
        this.images = images;
        this.total = total;
      });
  },
  data() {
    return {
      images: [],
      total: 0,
      limit: 9,
      currentPage: 1,
    };
  },
};
</script>
<style scoped>
.whppt-gallery-container {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
}
.whppt-gallery__add {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-color: white;
  border-width: 1px;
  border-style: dashed;
  font-size: 40px;
  cursor: pointer;
}
.whppt-gallery__add:hover {
  background: white;
  color: black;
}
.whppt-gallery-item-container {
  flex-basis: 50%;
  padding: 5px;
}
.whppt-gallery-item-container div:hover {
  filter: brightness(1.1);
}
.whppt-gallery-item {
  background: tomato;
  height: 100px;
  cursor: pointer;
}
</style>
