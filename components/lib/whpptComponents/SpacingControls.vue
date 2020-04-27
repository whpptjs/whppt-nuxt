<template>
  <whppt-tabs>
    <whppt-tab title="Large (Desktop)">
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginTopLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginTopLarge')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingTopLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingTopLarge')"
        />
        <div class="w-1/12"></div>
      </div>
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginBottomLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginBottomLarge')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingBottomLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingBottomLarge')"
        />
        <div class="w-1/12"></div>
      </div>
    </whppt-tab>
    <whppt-tab title="Medium (Tablet)">
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginTopMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginTopMedium')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingTopMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingTopMedium')"
        />
        <div class="w-1/12"></div>
      </div>
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginBottomMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginBottomMedium')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingBottomMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingBottomMedium')"
        />
        <div class="w-1/12"></div>
      </div>
    </whppt-tab>
    <whppt-tab title="Small (Mobile)">
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginTopSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginTopSmall')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingTopSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingTopSmall')"
        />
        <div class="w-1/12"></div>
      </div>
      <div class="flex">
        <whppt-text-input
          v-model="selectedComponent.value.marginBottomSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'marginBottomSmall')"
        />
        <div class="w-1/12"></div>
        <whppt-text-input
          v-model="selectedComponent.value.paddingBottomSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="marin-top-input w-5/12"
          @input="clampInput($event, 'paddingBottomSmall')"
        />
        <div class="w-1/12"></div>
      </div>
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import WhpptTabs from './WhpptTabs';
import WhpptTab from './WhpptTab';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'SpacingControls',
  components: {
    WhpptTabs,
    WhpptTab,
    WhpptTextInput,
  },
  props: {
    selectedComponent: {
      type: Object,
      required: true,
    },
    clampInput: {
      type: Function,
      required: true,
    },
  },
};
</script>
