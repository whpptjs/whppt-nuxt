<template>
  <form @submit.prevent>
    <div>
      <fieldset>
        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column">
            <whppt-text-input
              v-model="settings.title"
              placeholder="Enter a title"
              label="Title"
              label-colour="black"
              info="This title will be used as a fallback for any page without one. The page title is shown in the browser's tab and used by search engines to match your page with search terms. Search results use the title to list the page."
            />
          </div>
          <div class="whppt-settings__right-column">
            <whppt-text-input
              v-model="settings.keywords"
              placeholder="keywords (eg. page, simple)"
              label="Keywords"
              label-colour="black"
              info="These keywords will be used as a fallback for any page without them. Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
            />
          </div>
        </div>
        <div>
          <whppt-text-area
            v-model="settings.description"
            placeholder="Enter description"
            label="Description"
            rows="2"
            label-colour="black"
            info="This description will be used as a fallback for any page without one. The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
          />
        </div>
      </fieldset>
    </div>
  </form>
</template>

<script>
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import WhpptTextArea from '../../../whpptComponents/WhpptTextArea';

export default {
  name: 'SettingsEmail',
  components: { WhpptTextInput, WhpptTextArea },
  props: { settings: { type: Object, default: () => ({}) } },
};
</script>

<style scoped>
.whppt-settings__email-at-sign {
  margin: 0 1rem;
}
</style>
