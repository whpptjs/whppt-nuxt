<template>
  <section>
    <div v-whppt-contact-icon="content">
      {{ content || 'CONTACT ICON' }}
      <!-- <component :is="content.contactIcon.value"></component> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactIcon',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    data() {
      return this.content[this.content.property];
    },
  },
};
</script>
