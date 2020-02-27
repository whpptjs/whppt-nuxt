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
            info="Open graph title is shown on most social media platforms as the title in a card that is created when this settingss url is used. E.g. Facebook."
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="settings.og.keywords"
            placeholder="keywords, for, OG"
            label="Keywords"
            labelColour="black"
            info="Open graph description is shown on most social media platforms as the description in a card that is created when this settingss url is used. E.g. Facebook."
          />
        </div>
      </div>

      <div class="whppt-label">Image</div>
      <div v-if="!settings.og.image.imageId">
        <Gallery :limit="7" imageDisplaySize="25%" @input="openCropper"></Gallery>
      </div>
      <div v-if="settings.og.image.imageId" class="whppt-text-center">
        <cropping :image-options="settings.og.image" :sizes="sizes" @imageRemoved="removeImage" />
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
