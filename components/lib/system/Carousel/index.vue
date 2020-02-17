<template>
  <div v-if="editingCarousel" class="whppt-full">
    <h1>Carousel</h1>
    <whppt-tabs>
      <whppt-tab title="General">
        <general />
      </whppt-tab>
      <whppt-tab title="Items">
        <items />
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTab from '../../whpptComponents/WhpptTab';
import WhpptTabs from '../../whpptComponents/WhpptTabs';
import General from './General';
import Items from './Items';

export default {
  name: 'EditorCarousel',
  components: { WhpptTab, WhpptTabs, General, Items },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    editingCarousel() {
      return this.selectedComponent.value;
    },
  },
};
</script>
<style></style>
