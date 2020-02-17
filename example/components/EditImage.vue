<template>
  <div class="component-container">
    <div
      class="image-container"
      v-edit-image="value[value.property]"
      data-sizes='{"desktop":{"width":400,"height":400,"quality":2}}'
    >
      <!-- :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }" -->
      <img :src="img(400, 400)" v-if="img" class="img lg:visible" />
      <img :src="img(200, 200)" v-if="img" class="img xs:visible lg:hidden" />
      <div v-else>Loading Image</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'ImageDisplay',
  props: ['value'],
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseImageUrl']),
  },
  methods: {
    img(w, h) {
      const { scale, orientation, startX, startY } = this.value[this.value.property].crop.desktop;
      const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${w}|h_${h}`;
      return `${this.baseImageUrl}/${format}/${this.value[this.value.property].imageId}`;
    },
    // loadImage() {
    //   const { scale, orientation, startX, startY } = this.value[this.value.property].crop.desktop;
    //   return this.$axios
    //     .get(`${this.baseAPIUrl}/api/image/loadCropped`, {
    //       params: {
    //         startX,
    //         startY,
    //         width: 400,
    //         height: 400,
    //         scale,
    //         orientation,
    //         id: this.value[this.value.property].imageId,
    //       },
    //     })
    //     .then(img => (this.img = img));
    // },
    // renderImage() {
    // Move to API
    // return Jimp.read(`./${this.value[this.value.property].imageId}.png`)
    //   .then(imgJimp => {
    //     const {
    //       scale: s,
    //       // orientation: o, // Deal with later
    //       startX: x,
    //       startY: y,
    //     } = this.value[this.value.property].crop.desktop;
    //     const scale = Number(s);
    //     // const orientation = Number(o);
    //     const startX = Number(x);
    //     const startY = Number(y);
    //     return imgJimp
    //       .scale(scale)
    //       .crop(-startX, -startY, 400, 400)
    //       .getBase64Async(Jimp.AUTO);
    //   })
    //   .then(img => (this.img = img));
    // },
  },
  watch: {
    // 'value.data.crop.desktop.scale'() {
    //   this.renderImage();
    // },
    'value.data': {
      handler() {
        this.loadImage();
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
