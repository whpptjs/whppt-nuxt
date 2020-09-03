<template>
  <div
    v-if="draft"
    class="preview-sidebar"
    :class="{ 'preview-openEditor': editSidebar && previewImage }"
    :style="previewImage ? 'background-color: rgba(0, 0, 0, 0.8);' : ''"
  >
    <div class="preview-sidebar__inner">
      <p class="font-xl" style="margin: 85px 0 0 0;">Preview</p>
      <img class="preview-image" :src="previewImage" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PreviewSidebar',
  props: { previewImage: { type: String, default: '' } },
  computed: {
    ...mapState('whppt-nuxt/editor', [
      'editSidebar',
      'editSidebarType',
      'editData',
      'selectedComponent',
      'selectedContent',
      'draft',
    ]),
  },
};
</script>

<style>
@media (max-width: 640px) {
  .preview-sidebar {
    display: none;
  }
}
</style>
