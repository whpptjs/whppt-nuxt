<template>
  <div>
    <a :href="`#${myComponentData.anchor}`">Go to anchor</a>
    <!-- ... -->
    <div v-whppt-anchor="myComponentData" data-property="anchor">
      <span :id="myComponentData.anchor">{{ content.anchor }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data: () => ({
    myComponentData: {
      anchor: '',
    },
  }),
};
</script>
