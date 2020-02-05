<template>
  <div class="whppt-atdw">
    ATDW STUFF HERE
  </div>
</template>

<script>
export default {
  name: 'WhpptATDW',
  props: {
    page: { type: Object, default: () => {} },
  },
};
</script>

<style>
.whppt-atdw {
  display: flex;
  margin: 0 auto;
  z-index: 50;
  width: 100%;
  height: 80vh;
  background-color: white;
  padding: 1.5rem;
}
</style>
