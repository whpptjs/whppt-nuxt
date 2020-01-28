<template>
  <div class="container">
    <div v-w-data="test" @click="$editRichText(test)">
      Hey
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { test: 'bbbb' }
  },
  methods: {
    editObject() {
      return this.test
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
