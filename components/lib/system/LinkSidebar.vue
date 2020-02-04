<template>
  <div>
    <div>
      <ul class="whppt-tabs">
        <e-tab
          :active="$whppt.editData[$whppt.editDataProperty].type === 'page'"
          @click="$whppt.editData[$whppt.editDataProperty].type = 'page'"
          >Page</e-tab
        >
        <e-tab
          :active="$whppt.editData[$whppt.editDataProperty].type === 'external'"
          @click="$whppt.editData[$whppt.editDataProperty].type = 'external'"
          >External</e-tab
        >
        <e-tab
          :active="$whppt.editData[$whppt.editDataProperty].type === 'anchor'"
          @click="$whppt.editData[$whppt.editDataProperty].type = 'anchor'"
          >Anchor</e-tab
        >
      </ul>

      <div v-if="$whppt.editData[$whppt.editDataProperty].type === 'page'">
        <div>
          <e-input
            id="linkHref"
            v-model="$whppt.editData[$whppt.editDataProperty].href"
            class="whppt-input-half"
            placeholder="e.g. /contact"
            label="Hyperlink"
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData[$whppt.editDataProperty].text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          Page links take the user to another page on this website
        </div>
      </div>
      <div v-if="$whppt.editData[$whppt.editDataProperty].type === 'external'">
        <div class="whppt-flex">
          <e-input
            id="linkHref"
            v-model="$whppt.editData[$whppt.editDataProperty].href"
            class="whppt-input-half"
            placeholder="e.g. https://example.com/example"
            label="Hyperlink"
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData[$whppt.editDataProperty].text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          External links open a new tab to another website. Examples: https://example.com or mailto:example@mail.com
        </div>
      </div>
      <div v-if="$whppt.editData[$whppt.editDataProperty].type === 'anchor'">
        <div class="whppt-flex">
          <e-input
            v-model="$whppt.editData[$whppt.editDataProperty].href"
            class="whppt-input-half"
            placeholder="e.g. #museum"
            label="Hyperlink"
            info
          />
          <e-input
            id="linkText"
            v-model="$whppt.editData[$whppt.editDataProperty].text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          Anchors refer to identifying elements on the page using a #. Clicking on a anchor will scroll the page down to
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

.whppt-flex {
  display: flex;
}
</style>
