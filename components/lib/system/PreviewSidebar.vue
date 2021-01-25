<template>
  <div
    v-if="draft && previewImage"
    class="preview-sidebar"
    :class="{ 'preview-openEditor': editSidebar && previewImage }"
    :style="previewImage ? 'background: white;' : ''"
    style="margin: 85px 0 0 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"
  >
    <div class="preview-sidebar__inner">
      <p class="font-xl">Preview</p>
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
