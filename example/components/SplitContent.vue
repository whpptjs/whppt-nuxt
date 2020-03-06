<template>
  <section v-whppt-default="value" class="lg:flex py-32" :class="data.reversed ? '' : 'flex-row-reverse'">
    <div class="w-full lg:w-1/2 bg-red-700 relative">
      <div class="absolute inset-0 bg-center bg-cover bg-no-repeat" :style="`background-image: url(${data.image})`">
        <div class="absolute hidden lg:flex" :class="{ 'right-0': data.reversed }">
          <div class="h-12 w-12 bg-red-500"></div>
          <div class="h-12 w-12 bg-red-700"></div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 text-center lg:text-left p-8">
      <p class="mb-6 lg:mb-16" v-plain-text="data.text" data-property="subtitle">{{ data.text.subtitle }}</p>
      <h2
        class="text-4xl lg:text-5xl lg:leading-tight mb-8 lg:mb-12 font-bold"
        v-plain-text="data.text"
        data-property="title"
      >
        {{ data.text.title }}
      </h2>
      <p class="mb-8 lg:mb-16" v-plain-text="data.text" data-property="description">
        {{ data.text.description }}
      </p>
      <button class="border border-black flex items-center mx-auto lg:m-0" v-cta-button="data" data-property="button">
        <span class="p-2 bg-black">
          <icon icon="road-sign" class="h-5" />
        </span>
        <span class="text-xs p-2 px-5 tracking-wider uppercase">View Accommodation</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SplitContent',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    data() {
      return this.value[this.value.property];
    },
  },
};
</script>
