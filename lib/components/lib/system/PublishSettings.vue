<template>
  <div class="whppt-settings__slug">
    <div class="whppt-settings__content">
      <div
        v-if="showWarning"
        style="background: rgba(0, 0, 0, .5); position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      ></div>
      <div class="whppt-settings__heading" :style="`background: ${showWarning ? 'grey' : 'white'}`">
        <p class="whppt-settings__heading-text">Publishing</p>
      </div>
      <form v-if="page" @submit.prevent>
        <div>
          <div style="font-weight: bold">Last Change:</div>
          <div>{{ page.updatedAt ? formatDate(page.updatedAt) : 'Never updated' }}</div>
          <div v-if="publishing">
            <div style="font-weight: bold">Last Published:</div>
            <div>{{ page.published ? formatDate(page.lastPublished) : 'Not published' }}</div>
          </div>
          <div v-if="errorMessage" style="color: red; font-style: italic;">{{ errorMessage }}</div>
          <button v-if="publishing" type="button" class="whppt-settings__delete-button" @click="publish">
            Publish Changes
          </button>
          <button v-if="publishing" type="button" class="whppt-settings__delete-button" @click="unpublish">
            Unpublish Page
          </button>
          <button type="button" class="whppt-settings__delete-button" @click="showWarning = true">
            Delete Page
          </button>
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

export default {
  name: 'WhpptPublishSettings',
  props: { prefix: { type: String, default: '' } },
  data() {
    return {
      errorMessage: '',
      showWarning: false,
    };
  },
  computed: {
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
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage', 'unpublishPage', 'deletePage', 'publishPage']),
    formatDate(date) {
      return new Date(date);
    },
    confirmSlug(value) {
      value = this.formatSlug(value);
      if (this.prefix) value = `${this.prefix}/${value}`;
      this.page.slug = value;
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
    publish() {
      return this.savePage().then(() => {
        return this.publishPage().then(() => {
          this.$emit('closeModal');
        });
      });
    },
    unpublish() {
      if (!this.page.published) return this.$toast.global.editorError('Page is not published');

      return this.unpublishPage().then(() => {
        this.$emit('closeModal');
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

.whppt-settings__warning-modal {
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.whppt-settings__warning-content {
  margin: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.whppt-settings__warning-heading {
  color: #981a31;
  padding: 1rem;
}

.whppt-settings__warning-body {
  border-top: 1px solid #981a31;
  border-bottom: 1px solid #981a31;
  padding: 2rem;
}

.whppt-settings__warning-actions {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.whppt-settings__content form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
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

.whppt-settings__warning-button {
  color: #981a31;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #981a31;
}

.whppt-ml-auto {
  margin-left: auto;
}
</style>
