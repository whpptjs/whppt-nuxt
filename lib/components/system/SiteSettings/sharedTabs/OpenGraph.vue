<template>
  <form @submit.prevent>
    <whppt-card>
      <whppt-text-input
        :id="`${$options._scopeId}-settings-og-title`"
        v-model="settings.og.title"
        placeholder="OG title"
        label="Title"
        label-colour="black"
        info="Open graph title is shown on most social media platforms as the title in a card that is created when this settings url is used. (e.g. Facebook)"
      />
      <whppt-text-input
        :id="`${$options._scopeId}-settings-og-keywords`"
        v-model="settings.og.keywords"
        placeholder="OG Keywords (eg. page, blank)"
        label="Keywords"
        label-colour="black"
        info="Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
      />
      <whppt-text-area
        :id="`${$options._scopeId}-settings-og-description`"
        v-model="settings.og.description"
        placeholder="Enter description"
        label="Description"
        rows="2"
        label-colour="black"
        info="OG description is shown on most social media platforms as the description in a card that is created when this pages url is used."
      />
    </whppt-card>
    <!-- TODO: tweak how image works here, fix Vuex mutation errors for image -->
    <whppt-card>
      <div v-if="!settings.og.image.imageId">
        <div class="whppt-label">Gallery</div>
        <Gallery :limit="7" image-display-size="25%" @input="openCropper"></Gallery>
      </div>
      <div v-if="settings.og.image.imageId">
        <div class="whppt-label">Image</div>
        <cropping :image-options="settings.og.image" :sizes="sizes" @imageRemoved="removeImage" />
        <button @click="removeImage">Select Another Image</button>
      </div>
    </whppt-card>
  </form>
</template>

<script>
import WhpptTextInput from '../../../ui/Input';
import WhpptTextArea from '../../../ui/Textarea';
import WhpptCard from '../../../ui/Card';
import Gallery from '../../../editors/EditImage/Gallery';
import Cropping from '../../../editors/EditImage/Cropping';

export default {
  name: 'SettingsOG',
  components: { WhpptTextInput, WhpptTextArea, WhpptCard, Gallery, Cropping },
  props: { settings: { type: Object, default: () => ({}) } },
  data() {
    return {
      sizes: { desktop: { width: 400, height: 209, quality: 1, aspectRatio: 400 / 209 } },
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
