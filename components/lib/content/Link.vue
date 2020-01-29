<template>
  <div class="link">
    <nuxt-link :to="content.href">{{ content.text }}</nuxt-link>
    <div v-if="!content.text">Enter Link here</div>
  </div>
</template>

<script>
export default {
  name: 'WhpptLink',
  props: ['content'],
};
</script>
<style scoped>
.link {
  width: 100%;
}
</style>
