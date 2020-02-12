<template>
  <div
    v-container="value"
    :data-property="value.property"
    class="whppt-contents"
    :style="{ 'margin-top': `${$whppt.spacing(value.marginTop || $whppt.defaultMarginTop)}rem` }"
  >
    <component
      :is="content.displayType"
      v-for="(content, index) in value[value.property]"
      :key="index"
      :value="content"
    ></component>
    <div v-if="!value[value.property].length">
      Hey Container
    </div>
  </div>
</template>
<script>
import * as DisplayComponents from '~/components/Components';

export default {
  name: 'ContainerDisplay',
  components: { ...DisplayComponents },
  props: ['value'],
};
</script>
