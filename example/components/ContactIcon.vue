<template>
  <section>
    <div v-whppt-contact-icon="content" style="background-color: gray;">
      {{ content || 'CONTACT ICON' }}
      <!-- <component :is="content.contactIcon.value"></component> -->
      {{ content.contactIcon.value }}
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
