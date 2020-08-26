<template>
  <div>
    <p class="font-xl">Image</p>
    <whppt-tabs md-alignment="fixed" :md-active-tab="activeTab" @md-changed="setActiveTab">
      <whppt-tab id="cropping" md-label="Cropping">
        <cropping :image-options="selectedComponent.value.image" :sizes="selectedComponent.sizes" />
      </whppt-tab>
      <whppt-tab id="gallery" md-label="Gallery">
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
    activeTab: 'cropping',
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    selectImage(id) {
      this.setSelectedComponentState({ value: id, path: 'image.imageId' });
      // this.selectedComponent.value.image.imageId = id;
      this.setActiveTab('cropping');
    },
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
  },
};
</script>
