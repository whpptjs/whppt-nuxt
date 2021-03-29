<template>
  <!-- TODO: Refactor similar to SettingsOG -->
  <form @submit.prevent>
    <whppt-card>
      <whppt-text-input
        :id="`${$options._scopeId}-settings-twitter-title`"
        v-model="settings.twitter.title"
        placeholder="Twitter title"
        label="Title"
        label-colour="black"
        info="Twitter title is shown on most social media platforms as the title in a card that is created when this pages url is used."
      />
      <whppt-text-input
        :id="`${$options._scopeId}-settings-twitter-keywords`"
        v-model="settings.twitter.keywords"
        placeholder="keywords, for, twitter"
        label="Keywords"
        label-colour="black"
        info="Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
      />
      <whppt-text-area
        :id="`${$options._scopeId}-settings-twitter-description`"
        v-model="settings.twitter.description"
        placeholder="Enter description"
        label="Description"
        rows="2"
        label-colour="black"
        info="Twitter description is shown on most social media platforms as the description in a card that is created when this pages url is used."
      />
    </whppt-card>
    <whppt-card>
      <div v-if="!settings.twitter.image.imageId">
        <div class="whppt-label">Gallery</div>
        <Gallery :limit="7" image-display-size="25%" @input="openCropper"></Gallery>
      </div>
      <div v-if="settings.twitter.image.imageId">
        <div class="whppt-label">Image</div>
        <cropping
          :image-options="settings.twitter.image"
          :sizes="sizes"
          @imageRemoved="removeImage"
          @changed="cropperChanged"
        />
        <button @click="removeImage">Select Another Image</button>
      </div>
    </whppt-card>
  </form>
</template>

<script>
import WhpptTextInput from '../../../ui/components/Input';
import WhpptTextArea from '../../../ui/components/Textarea';
import WhpptCard from '../../../ui/components/Card';
import Gallery from '../../../editors/EditImage/Gallery';
import Cropping from '../../../editors/EditImage/Cropping';

export default {
  name: 'SettingsTwitter',
  components: { WhpptTextInput, WhpptTextArea, WhpptCard, Gallery, Cropping },
  props: { settings: { type: Object, default: () => ({}) } },
  data() {
    return {
      sizes: { desktop: { width: 400, height: 209, quality: 1, aspectRatio: 400 / 209 } },
    };
  },
  methods: {
    openCropper(id) {
      this.settings.twitter.image.imageId = id;
    },
    removeImage() {
      this.settings.twitter.image.imageId = '';
    },
    cropperChanged({ dimensions, canvasName }) {
      this.settings.twitter.image[canvasName] = dimensions;
    },
  },
};
</script>
