<template>
  <div v-content="content" :data-whitelist="whitelist" :class="{ 'py-4': activeMenuItem }" class="whppt-contents">
    <div v-if="content.length">
      <div v-for="(contentGroup, index) in content" :key="contentGroup.key + index">
        <component
          :is="contentGroup.displayType"
          :content="contentGroup"
          :class="[
            { container: contentGroup.inContainer },
            `mt-${$whppt.spacing(contentGroup.marginTopSmall || $whppt.defaultMarginTop) * 4} sm:mt-${$whppt.spacing(
              contentGroup.marginTopMedium || contentGroup.marginTopSmall || $whppt.defaultMarginTop
            ) * 4} lg:mt-${$whppt.spacing(
              contentGroup.marginTopLarge ||
                contentGroup.marginTopMedium ||
                contentGroup.marginTopSmall ||
                $whppt.defaultMarginTop
            ) * 4} `,
          ]"
        ></component>
      </div>
    </div>
    <div v-else>
      {{ placeholderText }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SplitContentColumn',
  props: {
    content: { type: Array, required: true },
    placeholderText: { type: String, default: 'Add some content here.' },
    whitelist: { type: String, default: '' },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>
