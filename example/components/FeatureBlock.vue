<template>
  <section v-blank="value" class="lg:flex bg-black text-white" :class="{ 'flex-row-reverse': value.reversed }">
    {{ value.backgroundColour }}
    <div
      class="w-full lg:w-1/4 bg-cover bg-top bg-no-repeat aspect-ratio-21/9"
      :style="`background-image: url(${value.image})`"
    ></div>
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
export default {
  name: 'FeatureBlock',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
