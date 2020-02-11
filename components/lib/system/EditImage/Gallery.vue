<template>
  <div class="whppt-gallery-container">
    <div class="whppt-gallery-item-container">
      <div class="whppt-gallery__add">
        <span class="whppt-gallery__plus-button">+</span>
      </div>
    </div>
    <div v-for="image in examples" :key="image.id" class="whppt-gallery-item-container">
      <div class="whppt-gallery-item" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EditorGallery',
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  data() {
    return {
      examples: [
        { id: 1, url: '' },
        { id: 2, url: '' },
        { id: 3, url: '' },
        { id: 4, url: '' },
        { id: 5, url: '' },
      ],
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
.whppt-gallery-item-container {
  flex-basis: 50%;
  padding: 5px;
}
.whppt-gallery-item {
  background: tomato;
  height: 100px;
  cursor: pointer;
}
</style>
