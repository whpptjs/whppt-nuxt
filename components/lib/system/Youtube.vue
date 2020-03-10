<template>
  <div class="whppt-full">
    <h1>Video</h1>
    <!-- <whppt-select v-model="platform" label="Select platform" :items="items" value-prop="value"></whppt-select> -->
    <whppt-text-input v-model="videoId" label="Video ID" />
    <whppt-button class="whppt-video-block__apply-change" @click="applyChanges">Apply</whppt-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';
import WhpptButton from '../whpptComponents/WhpptButton';

export default {
  name: 'EditorYoutube',
  components: { WhpptSelect, WhpptTextInput, WhpptButton },
  data: () => ({
    videoId: '',
    platform: { id: '', value: '' },
    items: [
      { value: 'Youtube', id: 'youtube' },
      { value: 'Vimeo', id: 'vimeo' },
      { value: 'Dailymotion', id: 'dailymotion' },
    ],
  }),
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
  mounted() {
    this.videoId = this.selectedComponent.value[this.selectedComponent.property];
    // this.platform = this.selectedComponent.value[this.selectedComponent.property].platform || { id: '', value: '' };
  },
  methods: {
    applyChanges() {
      this.selectedComponent.value[this.selectedComponent.property] = this.videoId;
      // this.selectedComponent.value[this.selectedComponent.property].platform = this.platform;
    },
  },
};
</script>
<style>
.whppt-video-block__apply-change {
  margin-top: 10px;
}
</style>
