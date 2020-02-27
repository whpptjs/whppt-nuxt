<template>
  <div class="whppt-full">
    <p class="font-xl">Image</p>
    <whppt-tabs ref="imageTabs">
      <whppt-tab title="Cropping">
        <cropping :image-options="selectedComponent.value.image" :sizes="selectedComponent.sizes" />
      </whppt-tab>
      <whppt-tab title="Gallery">
        <gallery :value="selectedComponent.value.image.imageId" @input="changeTab" />
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTab from '../../whpptComponents/WhpptTab';
import WhpptTabs from '../../whpptComponents/WhpptTabs';
import Gallery from './Gallery';
import Cropping from './Cropping';

export default {
  name: 'EditorImageEdit',
  components: { WhpptTabs, WhpptTab, Gallery, Cropping },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    changeTab(id) {
      this.selectedComponent.value.image.imageId = id;
      this.$refs.imageTabs.selectTab(this.$refs.imageTabs.tabs[0]);
    },
  },
};
</script>
<style scoped>
.whppt-tabs {
  display: flex;
  padding-bottom: 1.5rem;
  padding-left: 0;
}

.whppt-tabs__info {
  padding: 0 1.25rem;
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.whppt-input-half {
  padding: 0 0.5rem;
}
</style>
