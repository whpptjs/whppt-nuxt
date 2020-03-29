<template>
  <div>
    <div
      v-if="showSlugModal || showWarning"
      style="background: rgba(0, 0, 0, .5); position: absolute; top: 0; left: 0; right: 0; bottom: 0"
    ></div>
    <div v-if="showSlugModal" class="whppt-settings__warning-modal">
      <div class="whppt-settings__warning-content">
        <form style="position: relative; " @submit.prevent>
          <div class="whppt-settings__warning-heading" style="text-align: center;">Edit Slug</div>
          <div class="whppt-settings__warning-body">
            <div>
              <div v-if="prefix" class="whppt-flex-between whppt-align-center">
                <whppt-text-input
                  :value="prefix"
                  :disabled="true"
                  placeholder="Page Slug Prefix"
                  label="Prefix"
                  label-colour="black"
                  info="This prefix is managed by Whppt and is not editable."
                />
                <whppt-text-input
                  :value="slugSuffix"
                  placeholder="Enter a page slug"
                  label="Slug"
                  label-colour="black"
                  info="The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. Your input will be formatted to avoid certain characters."
                  @input="confirmSlug"
                />
              </div>
              <div v-if="!prefix">
                <whppt-text-input
                  v-model="slugCopy"
                  placeholder="Enter a page slug"
                  label="Slug"
                  label-colour="black"
                  info="The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. Your input will be formatted to avoid certain characters."
                />
              </div>
              <div style="display: flex; align-items: center; justify-content: flex-start">
                <div style="font-weight: bold; padding-right: 0.5rem;">Output:</div>
                <div>
                  {{ formattedSlug }}
                </div>
              </div>
            </div>
          </div>
          <div class="whppt-settings__warning-actions">
            <button class="whppt-settings__button" style="margin-left: 0" @click="saveSlug">
              Save
            </button>
            <button class="whppt-settings__button" @click="showSlugModal = false">Close</button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
    <div v-if="showWarning" class="whppt-settings__warning-modal">
      <div class="whppt-settings__warning-content">
        <div style="position: relative; text-align: center;">
          <div class="whppt-settings__warning-heading">Confirm Delete</div>
          <div class="whppt-settings__warning-body">
            <div>
              Are you sure?
            </div>
            <div>
              This will delete the page and all of its content.
            </div>
          </div>
          <div class="whppt-settings__warning-actions">
            <button class="whppt-settings__button" style="margin-left: 0" @click="deletePageFromDraft()">
              Delete
            </button>
            <button class="whppt-settings__button" @click="showWarning = false">Cancel</button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <form @submit.prevent>
      <div>
        <fieldset>
          <whppt-text-input
            v-model="page.slug"
            placeholder="Enter a page slug"
            label="Slug"
            :disabled="true"
            label-colour="black"
          />
          <div class="whppt-justify-start whppt-align-center">
            <button class="whppt-settings__button" @click="openSlugModal">
              Change Slug
            </button>
            <button type="button" class="whppt-settings__delete-button" @click="showWarning = true">
              Delete Page
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import slugify from 'slugify';

export default {
  name: 'PageSettingsGeneral',
  components: {
    WhpptTextInput,
  },
  props: {
    page: { type: Object, required: true },
    prefix: { type: String, default: () => '' },
  },
  data: () => ({
    showWarning: false,
    showSlugModal: false,
    slugCopy: '',
  }),
  computed: {
    formattedSlug() {
      return this.formatSlug(this.slugCopy);
    },
    slugSuffix() {
      if (!this.prefix) return '';
      return this.slugCopy.replace(`${this.prefix}/`, '');
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage', 'deletePage']),
    openSlugModal() {
      this.showSlugModal = true;
      this.slugCopy = this.page.slug;
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
    },
    confirmSlug(value) {
      value = this.formatSlug(value);
      if (this.prefix) value = `${this.prefix}/${value}`;
      this.slugCopy = value;
    },
    saveSlug() {
      const vm = this;
      const newSlug = this.formattedSlug;
      if (!newSlug) {
        this.$toast.global.editorError('Cannot use an empty slug');
        return;
      }
      return vm.$whppt.checkSlug({ slug: newSlug, _id: this.page._id }).then(result => {
        if (result) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          vm.page.slug = newSlug;
          return vm.savePage().then(() => {
            vm.$router.push(`/${newSlug}`);
            vm.$emit('closeModal');
          });
        }
      });
    },
    deletePageFromDraft() {
      const vm = this;
      if (vm.page.published) {
        return vm.$toast.global.editorError('Unpublish the page first');
      }
      return vm.deletePage().then(() => {
        vm.$router.push(`/`);
        vm.showWarning = false;
        vm.$emit('closeModal');
      });
    },
  },
};
</script>
