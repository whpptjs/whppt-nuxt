<template>
  <div class="whppt-full">
    <h1>Component</h1>
    <!--    <whppt-check-box-->
    <!--      :value="selectedComponent.value.inContainer"-->
    <!--      label="Put it in a container"-->
    <!--      @click="selectedComponent.value.inContainer = !selectedComponent.value.inContainer"-->
    <!--    ></whppt-check-box>-->
    <!--    <whppt-text-input-->
    <!--      v-model="selectedComponent.value.marginTop"-->
    <!--      type="number"-->
    <!--      min="0"-->
    <!--      :placeholder="$whppt.defaultMarginTop"-->
    <!--      label="Margin Top"-->
    <!--      class="marin-top-input"-->
    <!--    />-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import WhpptCheckBox from '../whpptComponents/CheckBox';
// import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'EditorTextBox',
  // components: { WhpptTextInput, WhpptCheckBox },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>

<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
