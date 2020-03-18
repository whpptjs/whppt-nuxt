<template>
  <form @submit.prevent>
    <fieldset>
      <div class="whppt-flex-between">
        <div class="whppt-settings__left-column">
          <whppt-text-input
            v-model="settings.twitter.title"
            placeholder="Twitter title"
            label="Title"
            label-colour="black"
            info="Twitter title is shown on most social media platforms as the title in a card that is created when this pages url is used."
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="settings.twitter.keywords"
            placeholder="keywords, for, twitter"
            label="Keywords"
            label-colour="black"
            info="Twitter description is shown on most social media platforms as the description in a card that is created when this pages url is used."
          />
        </div>
      </div>

      <div v-if="!settings.twitter.image.imageId">
        <div class="whppt-label">Gallery</div>
        <Gallery :limit="7" image-display-size="25%" @input="openCropper"></Gallery>
      </div>
      <div v-if="settings.twitter.image.imageId">
        <div class="whppt-label">Image</div>
        <cropping
          class="whppt-text-center"
          :image-options="settings.twitter.image"
          :sizes="sizes"
          @imageRemoved="removeImage"
        />
      </div>
    </fieldset>
  </form>
</template>

<script>
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';
import Gallery from '../EditImage/Gallery';
import Cropping from '../EditImage/Cropping';

export default {
  name: 'SettingsTwitter',
  components: { WhpptTextInput, Gallery, Cropping },
  props: { settings: { type: Object, default: () => ({}) } },
  data() {
    return {
      sizes: { desktop: { width: 400, height: 209, quality: 1 } },
    };
  },
  methods: {
    openCropper(id) {
      this.settings.twitter.image.imageId = id;
    },
    removeImage() {
      this.settings.twitter.image.imageId = '';
    },
  },
};
</script>
