<template>
  <div>
    <whppt-tabs :active-tab="activeTabIndex" position="fixed" @changed="setActiveTab">
      <whppt-tab id="cropping" name="Cropping">
        <cropping :image-options="selectedComponent.value.image" :sizes="selectedComponent.sizes" />
      </whppt-tab>
      <whppt-tab id="gallery" name="Gallery">
        <gallery :value="selectedComponent.value.image.imageId" @input="selectImage" />
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptTab from '../../ui/Tab';
import WhpptTabs from '../../ui/Tabs';
import Gallery from './Gallery';
import Cropping from './Cropping';

export default {
  name: 'EditorImageEdit',
  components: { WhpptTabs, WhpptTab, Gallery, Cropping },
  data: () => ({
    activeTabIndex: 0,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    selectImage(id) {
      this.setSelectedComponentState({ value: id, path: 'image.imageId' });
      this.setActiveTab(undefined, 0);
    },
    setActiveTab(tab, tabIndex, prevIndex) {
      this.activeTabIndex = tabIndex;
    },
  },
};
</script>
