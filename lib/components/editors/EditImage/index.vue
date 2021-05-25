<template>
  <div>
    <whppt-tabs :active-tab="activeTabIndex" position="fixed" @changed="setActiveTab">
      <whppt-tab id="cropping" name="Cropping">
        <cropping
          :image-options="selectedComponent.value.image"
          :sizes="selectedComponent.sizes"
          @changed="cropperChanged"
        />
        <whppt-text-input
          id="editor-image-alt"
          :value="selectedComponent.value.image.alt"
          placeholder="e.g. Article Heading Image"
          label="Image alt text"
          @input="setAltText"
        />
      </whppt-tab>
      <whppt-tab id="gallery" name="Gallery">
        <gallery :value="selectedComponent.value.image.imageId" @input="selectImage" />
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptTab from '../../ui/components/Tab';
import WhpptTabs from '../../ui/components/Tabs';
import WhpptTextInput from '../../ui/components/Input';
import Gallery from './Gallery';
import Cropping from './Cropping';

export default {
  name: 'EditorImageEdit',
  components: { WhpptTabs, WhpptTab, Gallery, Cropping, WhpptTextInput },
  data: () => ({
    activeTabIndex: 0,
  }),
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    selectImage(id) {
      this.setSelectedComponentState({ value: id, path: 'image.imageId' });
      this.setActiveTab(undefined, 0);
    },
    setAltText(value) {
      this.setSelectedComponentState({ value, path: 'image.alt' });
    },
    setActiveTab(tab, tabIndex, prevIndex) {
      this.activeTabIndex = tabIndex;
    },
    cropperChanged({ dimensions, canvasName }) {
      this.setSelectedComponentState({ value: dimensions, path: `image[${canvasName}]` });
    },
  },
};
</script>
