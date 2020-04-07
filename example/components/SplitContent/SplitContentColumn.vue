<template>
  <div v-content="content" data-whitelist="wPlainText, wRichText, Image4By3, CtaButton">
    <div v-if="content.length">
      <div v-for="(contentGroup, index) in content" :key="contentGroup.key + index">
        <component
          :is="contentGroup.displayType"
          :content="contentGroup"
          :style="{
            'margin-top': `${$whppt.spacing(contentGroup.marginTop || $whppt.defaultMarginTop)}rem`,
          }"
        ></component>
      </div>
    </div>
    <div v-else>
      {{ placeholderText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitContentGap',
  props: {
    content: { type: Array, required: true },
    placeholderText: { type: String, default: 'Add some content here.' },
  },
};
</script>
