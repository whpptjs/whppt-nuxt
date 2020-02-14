<template>
  <div class="component-container">
    <div
      class="image-container"
      v-edit-image="value[value.property]"
      data-sizes='{"desktop":{"width":400,"height":400,"quality":2}}'
      :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
    >
      <img :src="img" v-if="img" class="img" />
      <div v-else>Loading Image</div>
    </div>
  </div>
</template>
<script>
import Jimp from 'jimp';
export default {
  name: 'ImageDisplay',
  props: ['value'],
  mounted() {
    this.renderImage();
  },
  data() {
    return {
      img: '',
    };
  },
  methods: {
    renderImage() {
      // Move to API
      return Jimp.read(`./${this.value[this.value.property].imageId}.png`)
        .then(imgJimp => {
          const {
            scale: s,
            // orientation: o, // Deal with later
            startX: x,
            startY: y,
          } = this.value[this.value.property].image.desktop;
          const scale = Number(s);
          // const orientation = Number(o);
          const startX = Number(x);
          const startY = Number(y);
          return imgJimp
            .scale(scale)
            .crop(-startX, -startY, 400, 400)
            .getBase64Async(Jimp.AUTO);
        })
        .then(img => (this.img = img));
    },
  },
  watch: {
    value: {
      handler() {
        this.renderImage();
      },
      deep: true,
    },
  },
};
</script>
<style>
.component-container {
  display: flex;
  justify-content: center;
}
.image-container {
  height: 400px;
  width: 400px;
  overflow: hidden;
}
.img {
  object-fit: none;
  height: 100%;
  width: 100%;
}
</style>
