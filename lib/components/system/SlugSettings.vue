<template>
  <div class="whppt-settings__slug">
    <div class="whppt-settings__content">
      <div
        v-if="showWarning"
        style="background: rgba(0, 0, 0, .5); position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      ></div>
      <div class="whppt-settings__heading" :style="`background: ${showWarning ? 'grey' : 'white'}`">
        <p class="whppt-settings__heading-text">Slug Settings</p>
        <button class="whppt-settings__button" @click="saveSettings">Save</button>
      </div>
      <form @submit.prevent="saveSettings">
        <div>
          <div v-if="prefix" class="whppt-flex-between whppt-align-center">
            <whppt-text-input
              :value="prefix"
              disabled
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
              v-model="page.slug"
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
          <div v-if="errorMessage" style="color: red; font-style: italic;">{{ errorMessage }}</div>
        </div>
      </form>
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
              <button class="whppt-settings__warning-button" @click="deletePageFromDraft()">
                Delete
              </button>
              <button class="whppt-settings__warning-button" @click="showWarning = false">Cancel</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';

import WhpptTextInput from '../ui/Input';

export default {
  name: 'WhpptSlugSettings',
  components: { WhpptTextInput },
  props: { prefix: { type: String, default: '' } },
  data() {
    return {
      errorMessage: '',
      showWarning: false,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    ...mapState('whppt-nuxt/page', ['page']),
    formattedSlug() {
      return this.formatSlug(this.page.slug);
    },
    inDraft() {
      return process.env.DRAFT === 'true';
    },
    slugSuffix() {
      if (!this.prefix) return '';
      return this.page.slug.replace(`${this.prefix}/`, '');
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage', 'unpublishPage', 'deletePage']),
    confirmSlug(value) {
      value = this.formatSlug(value);
      if (this.prefix) value = `${this.prefix}/${value}`;
      this.page.slug = value;
    },
    deletePageFromDraft() {
      const vm = this;
      return vm.deletePage().then(() => {
        vm.$router.push(`/`);
        vm.showWarning = false;
        vm.$emit('closeModal');
      });
    },
    unpublish() {
      const vm = this;
      return vm.unpublishPage().then(() => {
        vm.$emit('closeModal');
      });
    },
    saveSettings() {
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
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
    },
  },
};
</script>

<style>
.whppt-settings__slug {
  color: black;
  display: flex;
  z-index: 52;
  width: 75%;
  margin: 1.5rem;
  position: relative;
}

.whppt-label {
  /* color: white; */
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  padding-right: 0.5rem;
}

.whppt-settings__content form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.whppt-settings__content form > fieldset {
  padding: 0;
  margin: 1rem 0;
  display: flex;
  border: none;
}

.whppt-settings__content form label {
  font-size: 0.9rem;
}

.whppt-settings__content form input,
.whppt-settings__content form textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.2rem 0 0.5rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  resize: vertical;
}

.whppt-settings__delete-button {
  margin-top: 1rem;
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #981a31;
  background: #981a31;
}

.whppt-ml-auto {
  margin-left: auto;
}
</style>
