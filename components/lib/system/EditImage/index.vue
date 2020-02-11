<template>
  <div class="whppt-full">
    <h1>Image</h1>
    <whppt-tabs>
      <whppt-tab title="Cropping">
        <cropping />
      </whppt-tab>
      <whppt-tab title="Gallery">
        <gallery />
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTab from '../../whpptComponents/WhpptTab';
import WhpptTabs from '../../whpptComponents/WhpptTabs';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';
import Gallery from './Gallery';
import Cropping from './Cropping';

export default {
  name: 'EditorImageEdit',
  components: { WhpptTextInput, WhpptTabs, WhpptTab, Gallery, Cropping },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    sizes() {
      return this.selectedComponent.sizes;
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
