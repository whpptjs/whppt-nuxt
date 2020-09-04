<template>
  <div class="whppt-full">
    <h1>Youtube Video</h1>
    <whppt-text-input v-model="videoId" label="Video ID" />
    <whppt-button class="whppt-video-block__apply-change" @click="applyChanges">Apply</whppt-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../editors/WhpptTextInput';
import WhpptButton from '../editors/__WhpptButton';

export default {
  name: 'EditorYoutube',
  components: { WhpptTextInput, WhpptButton },
  data: () => ({
    videoId: '',
  }),
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
  mounted() {
    this.videoId = this.selectedComponent.value[this.selectedComponent.property];
  },
  methods: {
    applyChanges() {
      this.selectedComponent.value[this.selectedComponent.property] = this.videoId;
    },
  },
};
</script>

<style>
.whppt-video-block__apply-change {
  margin-top: 10px;
}
</style>
