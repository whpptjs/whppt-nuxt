<template>
  <div>
    <fieldset>
      <div class="whppt-flex-between">
        <div class="whppt-settings__left-column">
          <whppt-text-input
            v-model="settings.og.title"
            placeholder="OG title"
            label="Title"
            labelColour="black"
            info="Open graph title is shown on most social media platforms as the title in a card that is created when this settings url is used. (e.g. Facebook)"
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="settings.og.keywords"
            placeholder="OG Keywords (eg. page, blank)"
            label="Keywords"
            labelColour="black"
            info="Open graph description is shown on most social media platforms as the description in a card that is created when this settings url is used. (e.g. Facebook)"
          />
        </div>
      </div>

      <div v-if="!settings.og.image.imageId">
        <div class="whppt-label">Gallery</div>
        <Gallery :limit="7" imageDisplaySize="25%" @input="openCropper"></Gallery>
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
  </div>
</template>

<script>
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import Gallery from './EditImage/Gallery';
import Cropping from './EditImage/Cropping';

export default {
  name: 'SettingsOG',
  components: { WhpptTextInput, Gallery, Cropping },
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
