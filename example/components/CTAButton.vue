<template>
  <section v-cta-button="value" class="lg:flex">
    <whppt-link
      :to="{ href: `'${value[value.property].link}'` }"
      class="hidden lg:inline-block uppercase tracking-wider text-sm px-6 py-4 border-black border"
    >
      {{ value[value.property].text }}
    </whppt-link>
  </section>
</template>

<script>
export default {
  name: 'CTA Button',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
