<template>
  <form @submit.prevent>
    <fieldset>
      <div class="whppt-flex-between">
        <div class="whppt-settings__left-column">
          <whppt-text-input
            v-model="settings.og.title"
            placeholder="OG title"
            label="Title"
            label-colour="black"
            info="Open graph title is shown on most social media platforms as the title in a card that is created when this settings url is used. (e.g. Facebook)"
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="settings.og.keywords"
            placeholder="OG Keywords (eg. page, blank)"
            label="Keywords"
            label-colour="black"
            info="Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
          />
        </div>
      </div>
      <div>
        <whppt-text-area
          v-model="settings.og.description"
          placeholder="Enter description"
          label="Description"
          rows="2"
          label-colour="black"
          info="OG description is shown on most social media platforms as the description in a card that is created when this pages url is used."
        />
      </div>
      <div v-if="!settings.og.image.imageId">
        <div class="whppt-label">Gallery</div>
        <Gallery :limit="7" image-display-size="25%" @input="openCropper"></Gallery>
      </div>
      <div v-if="settings.og.image.imageId">
        <div class="whppt-label">Image</div>
        <cropping
          class="whppt-text-center"
          :image-options="settings.og.image"
          :sizes="sizes"
          @imageRemoved="removeImage"
        />
      </div>
    </fieldset>
  </form>
</template>

<script>
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import Gallery from '../../EditImage/Gallery';
import Cropping from '../../EditImage/Cropping';
import WhpptTextArea from '../../../whpptComponents/WhpptTextArea';

export default {
  name: 'SettingsOG',
  components: { WhpptTextInput, WhpptTextArea, Gallery, Cropping },
  props: { settings: { type: Object, default: () => ({}) } },
  data() {
    return {
      sizes: { desktop: { width: 400, height: 209, quality: 1 } },
    };
  },
  methods: {
    openCropper(id) {
      this.settings.og.image.imageId = id;
    },
    removeImage() {
      this.settings.og.image.imageId = '';
    },
  },
};
</script>
