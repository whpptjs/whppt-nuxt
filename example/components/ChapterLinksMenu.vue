<template>
  <div>
    <h5 class="text-sm font-bold">Chapter Links</h5>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChapterLinksMenu',
  data: () => ({
    links: [],
  }),
};
</script>
