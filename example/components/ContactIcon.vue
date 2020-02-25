<template>
  <section v-contact-icon="value">
    <div>
      {{ value || 'CONTACT ICON' }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactIcon',
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
