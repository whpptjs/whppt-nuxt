<template>
  <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z" />
  </svg>
</template>
<script>
export default {
  name: 'EditorIconItalic',
  props: { fill: { type: String, default: 'white' } },
};
</script>
