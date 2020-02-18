<template>
  <section v-blank="value" class="lg:flex bg-black text-white" :class="{ 'flex-row-reverse': value.reversed }">
    <div
      v-edit-image="value.image"
      data-sizes='{ "desktop": { "width":400, "height":400, "quality":2 } }'
      class="w-full lg:w-1/4 bg-cover bg-top bg-no-repeat aspect-ratio-21/9"
    ></div>
    <!-- :style="`background-image: url('${img(400, 400)}')`" -->
    <div class="w-full lg:w-3/4 text-center lg:text-left p-8 lg:p-24">
      <h3
        v-plain-text="value"
        data-property="title"
        class="lg:text-5xl font-bold mb-8"
        v-text="value.title || 'Title Text'"
      />
      <h4 class="hidden lg:inline-block lg:text-xl mb-8" v-text="value.subtitle" />
      <p class="mb-16" v-text="value.description" />
      <whppt-link
        :to="{ href: '/contact' }"
        class="hidden lg:inline-block uppercase tracking-wider text-sm px-6 py-4 border-white border"
      >
        contact a concierge
      </whppt-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeatureBlock',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseImageUrl']),
  },
  methods: {
    img(w, h) {
      const { scale, orientation, startX, startY } = this.content.image.crop.desktop;
      const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${w}|h_${h}`;

      return `${this.baseImageUrl}/${format}/${this.content.image.imageId}`;
    },
  },
};
</script>
