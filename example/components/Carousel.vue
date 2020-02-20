<template>
  <div
    v-list="{ list: value[value.property], addNew }"
    :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px`, container: value.inContainer }"
  >
    {{ value || 'Just a normal carousel' }}
  </div>
</template>
<script>
export default {
  name: 'CarouselDisplay',
  props: ['value'],
  methods: {
    addNew() {
      this.value[this.value.property].push({ test: 'THIS IS A TEST' });
    },
  },
};
</script>
