<template>
  <div>
    <div v-if="data">
      <ul class="whppt-tabs">
        <e-tab :active="data.type === 'page'" @click="data.type = 'page'">Page</e-tab>
        <e-tab :active="data.type === 'external'" @click="data.type = 'external'">External</e-tab>
        <e-tab :active="data.type === 'anchor'" @click="data.type = 'anchor'">Anchor</e-tab>
      </ul>

      <div v-if="data.type === 'page'">
        <div class="whppt-flex">
          <whppt-text-input
            id="linkHref"
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. /contact"
            label="Hyperlink"
          />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          Page links take the user to another page on this website
        </div>
      </div>
      <div v-if="data.type === 'external'">
        <div class="whppt-flex">
          <whppt-text-input
            id="linkHref"
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. https://example.com/example"
            label="Hyperlink"
          />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          External links open a new tab to another website. Examples: https://example.com or mailto:example@mail.com
        </div>
      </div>
      <div v-if="data.type === 'anchor'">
        <div class="whppt-flex">
          <whppt-text-input
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. #museum"
            label="Hyperlink"
            info
            text-
          />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
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
import ETab from './Tab';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'EditorLinkEdit',
  components: { WhpptTextInput, ETab },
  props: ['data'],
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
