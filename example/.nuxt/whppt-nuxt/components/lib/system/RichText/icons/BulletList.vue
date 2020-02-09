<template>
  <svg width="20" height="20" class="fill-current" viewBox="0 0 20 20" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z" />
  </svg>
</template>
<script>
export default {
  name: 'EditorIconBulletList',
  props: { fill: { type: String, default: 'white' } },
};
</script>
