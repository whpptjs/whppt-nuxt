<template>
  <div>
    <div>
      <ul class="tabs">
        <e-tab :active="$whppt.editData.type === 'page'" @click="$whppt.editData.type = 'page'">Page</e-tab>
        <e-tab :active="$whppt.editData.type === 'external'" @click="$whppt.editData.type = 'external'">External</e-tab>
        <e-tab :active="$whppt.editData.type === 'anchor'" @click="$whppt.editData.type = 'anchor'">Anchor</e-tab>
      </ul>

      <div v-if="$whppt.editData.type === 'page'">
        <div>
          <e-input
            id="linkHref"
            v-model="$whppt.editData.href"
            class="e-input-half"
            placeholder="e.g. /contact"
            label="Hyperlink"
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData.text"
            class="e-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="px-5 -mt-5 text-gray-900 text-xs italic mb-3">
          Page links take the user to another page on this website
        </div>
      </div>
      <div v-if="$whppt.editData.type === 'external'">
        <div class="flex">
          <e-input
            id="linkHref"
            v-model="$whppt.editData.href"
            class="e-input-half"
            placeholder="e.g. https://example.com/example"
            label="Hyperlink"
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData.text"
            class="e-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="px-5 -mt-5 text-gray-900 text-xs italic mb-3">
          External links open a new tab to another website. Examples: https://example.com or mailto:example@mail.com
        </div>
      </div>
      <div v-if="$whppt.editData.type === 'anchor'">
        <div class="flex">
          <e-input
            v-model="$whppt.editData.href"
            class="e-input-half"
            placeholder="e.g. #museum"
            label="Hyperlink"
            info
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData.text"
            class="e-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="px-5 -mt-5 text-gray-900 text-xs italic mb-3">
          Anchors refer to identifing elements on the page using a #. Clicking on a anchor will scroll the page down to
          it.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import ETab from './Tab';
import EInput from './InputText';

export default {
  name: 'EditorLinkEdit',
  components: { EInput, ETab },
  computed: {
    // ...mapGetters('editor', ['draft']),
  },
};
</script>
<style scoped>
.tabs {
  display: flex;
  padding-bottom: 1.5rem;
  padding-left: 0;
}
</style>
