<template>
  <whppt-tabs>
    <whppt-tab name="Desktop">
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mt-large'"
          :value="selectedComponent.value.marginTopLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginTopLarge' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pt-large'"
          :value="selectedComponent.value.paddingTopLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingTopLarge' })"
        />
      </div>
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mb-large'"
          :value="selectedComponent.value.marginBottomLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginBottomLarge' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pb-large'"
          :value="selectedComponent.value.paddingBottomLarge"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingBottomLarge' })"
        />
      </div>
    </whppt-tab>
    <whppt-tab name="Tablet">
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mt-medium'"
          :value="selectedComponent.value.marginTopMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginTopMedium' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pt-medium'"
          :value="selectedComponent.value.paddingTopMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingTopMedium' })"
        />
      </div>
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mb-medium'"
          :value="selectedComponent.value.marginBottomMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginBottomMedium' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pb-medium'"
          :value="selectedComponent.value.paddingBottomMedium"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingBottomMedium' })"
        />
      </div>
    </whppt-tab>
    <whppt-tab name="Mobile">
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mt-small'"
          :value="selectedComponent.value.marginTopSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.top.base"
          label="Margin Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginTopSmall' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pt-small'"
          :value="selectedComponent.value.paddingTopSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.top.base"
          label="Padding Top"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingTopSmall' })"
        />
      </div>
      <div class="whppt-spacing__input-group">
        <whppt-text-input
          :id="$options._scopeId + 'spacing-mb-small'"
          :value="selectedComponent.value.marginBottomSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultMargin.bottom.base"
          label="Margin Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'marginBottomSmall' })"
        />
        <div class="whppt-spacing__spacer"></div>
        <whppt-text-input
          :id="$options._scopeId + 'spacing-pb-small'"
          :value="selectedComponent.value.paddingBottomSmall"
          type="number"
          max="8"
          min="0"
          :placeholder="$whppt.defaultPadding.bottom.base"
          label="Padding Bottom"
          class="whppt-spacing__input"
          @input="setSelectedComponentState({ value: $event, path: 'paddingBottomSmall' })"
        />
      </div>
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptTabs from '../ui/components/Tabs';
import WhpptTab from '../ui/components/Tab';
import WhpptTextInput from '../ui/components/Input';

export default {
  name: 'SpacingControls',
  components: {
    WhpptTabs,
    WhpptTab,
    WhpptTextInput,
  },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
  },
};
</script>

<style lang="scss" scoped>
.whppt-spacing {
  &__input-group {
    display: flex;
  }

  &__spacer {
    width: 8.333333%;
  }
}
</style>
