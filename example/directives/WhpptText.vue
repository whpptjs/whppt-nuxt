<template>
  <div v-whppt-default="myComponentData">
    This is an example for the v-whppt-default directive.
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data: () => ({
    myComponentData: {},
  }),
};
</script>
