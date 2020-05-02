<template>
  <div class="relative z-0 bg-white">
    <!-- <generic-header :header="page.header" /> -->
    <contents :contents="page.contents" class="min-h-200"></contents>
  </div>
</template>

<script>
// import GenericHeader from '~/components/page/headers/GenericHeader';
import Contents from '~/components/contents';

export default {
  name: 'ExampleTemplate',
  components: {
    // GenericHeader,
    Contents,
  },
  props: { page: { type: Object, default: () => ({}) } },
};
</script>
