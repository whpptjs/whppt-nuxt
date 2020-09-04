<template>
  <div>
    <div
      v-split-gap="content"
      :data-property="content.property"
      class="splitContent flex flex-col sm:flex-row"
      :class="{ 'py-4': activeMenuItem, container }"
    >
      <split-column
        :class="`sm:w-${content.width}/12`"
        :content="content.contents.left"
        :whitelist="whitelistLeftSplit"
      ></split-column>
      <div :class="`w-${content.gap}/12`">&nbsp;</div>
      <split-column
        :class="`sm:w-${12 - content.width - content.gap}/12`"
        :content="content.contents.right"
        :whitelist="whitelistRightSplit"
      ></split-column>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SplitColumn from './SplitContentColumn';

export default {
  name: 'SplitContentGap',
  components: { SplitColumn },
  props: {
    content: {
      type: Object,
      default: () => ({ left: [], right: [], inContainer: false, width: 5, gap: 0 }),
    },
    container: Boolean,
    whitelistLeftSplit: {
      type: String,
      default: '',
    },
    whitelistRightSplit: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>
