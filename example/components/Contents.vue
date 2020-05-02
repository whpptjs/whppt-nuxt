<template>
  <div
    v-content="contents"
    style="min-height: 40px"
    class="whppt-contents"
    :class="{ 'pb-8': inEditor }"
    data-whitelist="
      wRichText,
      wSplitContent,
    "
  >
    <component
      :is="content.displayType"
      v-for="(content, index) in contents"
      :key="content.key + index"
      :container="true"
      :content="content"
      whitelist-right-split="wRichText"
      whitelist-left-split="wRichText"
      :class="spacingClasses(content)"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Contents',
  props: { contents: { type: Array, default: () => [] } },
  computed: {
    ...mapGetters('navigation', ['inEditor']),
  },
  methods: {
    spacingClasses(content) {
      const whppt = this.$whppt;
      const marginTop = `mt-${whppt.spacing(content.marginTopSmall || whppt.defaultMargin.top.base) *
        4} sm:mt-${whppt.spacing(content.marginTopMedium || content.marginTopSmall || whppt.defaultMargin.top.sm) *
        4} lg:mt-${whppt.spacing(
        content.marginTopLarge || content.marginTopMedium || content.marginTopSmall || whppt.defaultMargin.top.lg
      ) * 4} `;
      const marginBottom = `mb-${whppt.spacing(content.marginBottomSmall || whppt.defaultMargin.bottom.base) *
        4} sm:mb-${whppt.spacing(
        content.marginBottomMedium || content.marginBottomSmall || whppt.defaultMargin.bottom.sm
      ) * 4} lg:mb-${whppt.spacing(
        content.marginBottomLarge ||
          content.marginBottomMedium ||
          content.marginBottomSmall ||
          whppt.defaultMargin.bottom.lg
      ) * 4} `;
      const paddingTop = `pt-${whppt.spacing(content.paddingTopSmall || whppt.defaultPadding.top.base) *
        4} sm:pt-${whppt.spacing(content.paddingTopMedium || content.paddingTopSmall || whppt.defaultPadding.top.sm) *
        4} lg:pt-${whppt.spacing(
        content.paddingTopLarge || content.paddingTopMedium || content.paddingTopSmall || whppt.defaultPadding.top.lg
      ) * 4} `;
      const paddingBottom = `pb-${whppt.spacing(content.paddingBottomSmall || whppt.defaultPadding.bottom.base) *
        4} sm:pb-${whppt.spacing(
        content.paddingBottomMedium || content.paddingBottomSmall || whppt.defaultPadding.bottom.sm
      ) * 4} lg:pb-${whppt.spacing(
        content.paddingBottomLarge ||
          content.paddingBottomMedium ||
          content.paddingBottomSmall ||
          whppt.defaultPadding.bottom.lg
      ) * 4} `;
      return [marginTop, marginBottom, paddingTop, paddingBottom];
    },
  },
};
</script>
