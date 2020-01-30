<template>
  <div class="link">
    <nuxt-link v-if="content.type !== 'external'" class="whppt-link" :to="content.href">{{
      content.text || 'Add your text here'
    }}</nuxt-link>
    <a v-if="content.type === 'external'" :href="content.href" class="whppt-link" target="_blank">
      {{ content.text || 'Add your text here' }}
    </a>
    <!-- <div v-if="!content.type">Enter Link here</div> -->
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
