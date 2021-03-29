<template>
  <div class="whppt-page-setting__general">
    <whppt-card>
      <span><strong>Page Slug</strong></span>
      <div>
        <span>current slug:</span> <strong>{{ `/${page.slug}` }}</strong>
      </div>
      <whppt-button @click="openSlugModal">Change Slug</whppt-button>
    </whppt-card>
    <whppt-card>
      <form class="whppt-page-setting__page-type-form" @submit.prevent>
        <whppt-select
          id="page-settings-page-type-select"
          label="Page Type"
          item-text="label"
          item-value="name"
          :items="pageTypes"
          :value="newPage.pageTypeObj"
          return-object
          @input="setPageTypeObj"
        />
        <whppt-select
          v-if="newPage.pageTypeObj && newPage.pageTypeObj && newPage.pageTypeObj.templates.length > 1"
          :id="`${$options._scopeId}-template`"
          :value="newPage.template"
          :items="newPage.pageTypeObj.templates"
          item-text="label"
          item-value="key"
          return-object
          label="template"
          @input="setPageTemplate"
        ></whppt-select>
        <component :is="newPage.pageTypeObj.name" v-if="newPage.pageTypeObj" :page="newPage" />
        <whppt-button @click="changePageType">Change Page Type</whppt-button>
      </form>
    </whppt-card>
    <whppt-card>
      <div class="whppt-page__actions">
        <whppt-button @click="openDupModal">Duplicate Page</whppt-button>
        <whppt-button @click="openDeleteModal">Delete Page</whppt-button>
      </div>
    </whppt-card>

    <!-- Change slug dialog -->
    <whppt-dialog v-if="showSlugModal" :is-active="showSlugModal" :height="prefix ? 500 : 400" :width="800">
      <template v-slot:header>
        <whppt-toolbar>
          <div class="whppt-slug__toolbar">
            <h3>Edit Slug</h3>
          </div>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <p v-if="foundDependencies" class="whppt-dialog__warning-dependencies">
          <em>
            Warning: The current slug is in use in {{ foundDependencies }} place{{
              foundDependencies !== 1 ? 's' : ''
            }}. Changing the slug may break links around the site, to avoid broken links remember to change the links.
          </em>
        </p>
        <form @submit.prevent>
          <div v-if="prefix">
            <whppt-text-input
              :id="`${$options._scopeId}-slug-prefix`"
              :value="prefix"
              placeholder="Page Slug Prefix"
              label="Prefix"
              readonly
              info="This prefix is managed by Whppt and is not editable."
            />
            <whppt-text-input
              :id="`${$options._scopeId}-edit-slug`"
              :value="slugSuffix"
              placeholder="Enter a page slug"
              label="Slug"
              info="The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. Your input will be formatted to avoid certain characters."
              @input="confirmSlug"
            />
          </div>
          <div v-if="!prefix">
            <whppt-text-input
              :id="`${$options._scopeId}-edit-prefix`"
              v-model="slugCopy"
              placeholder="Enter a page slug"
              label="Slug"
              :info="
                `The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. \nYour input will be formatted according to the page type setting and to avoid certain characters.`
              "
            />
          </div>
          <div style="display: flex; align-items: center; justify-content: flex-start">
            <div style="font-weight: bold; padding-right: 0.5rem;">Output:</div>
            <div>
              {{ formattedSlug }}
            </div>
          </div>
        </form>
        <div class="whppt-dialog__warning-actions">
          <whppt-button @click="saveSlug">Save</whppt-button>
          <whppt-button flat @click="showSlugModal = false">Close</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>

    <!-- Delete page dialog -->
    <whppt-dialog v-if="showWarning" :is-active="showWarning" :height="350" :width="800">
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Are you sure?</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h4>Are you sure you want to delete this page</h4>
          <p class="whppt-dialog__warning-dependencies">
            <em>Warning: Once you delete this page there is no way to recover it.</em>
          </p>
          <p v-if="foundDependencies" class="whppt-dialog__warning-dependencies">
            <em>
              Warning: The current slug is in use in {{ foundDependencies }} place{{
                foundDependencies !== 1 ? 's' : ''
              }}. Changing the slug may break links around the site, to avoid broken links remember to change the links.
            </em>
          </p>
        </div>
        <div class="whppt-dialog__warning-actions">
          <whppt-button danger @click="deletePageFromDraft">Delete</whppt-button>
          <whppt-button flat @click="showWarning = false">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>

    <!-- Duplicate page dialog -->
    <whppt-dialog v-if="showDuplicatePageModal" :is-active="showDuplicatePageModal" :height="450" :width="800">
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Duplicate Page</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h5>Please enter a new Slug for the duplicated page.</h5>
        </div>
        <form @submit.prevent>
          <whppt-text-input
            :id="`${$options._scopeId}-duplicate-page-slug`"
            v-model="slugCopy"
            placeholder="eg. /about"
            label="Slug"
            :info="
              `The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. \nYour input will be formatted according to the page type setting and to avoid certain characters.`
            "
          />
          <span><strong>Output:</strong> {{ formattedSlug }}</span>
        </form>
        <div class="whppt-dialog__warning-actions">
          <whppt-button @click="duplicatePage">Duplicate</whppt-button>
          <whppt-button flat @click="showDuplicatePageModal = false">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>
  </div>
</template>

<script>
import slugify from 'slugify';
import { mapActions } from 'vuex';
import { map, find, get, compact, filter, forEach, omit } from 'lodash';
import WhpptCard from '../../../ui/components/Card';
import WhpptSelect from '../../../ui/components/Select';
import WhpptTextInput from '../../../ui/components/Input';
import WhpptButton from '../../../ui/components/Button';
import WhpptDialog from '../../../ui/components/Dialog';
import WhpptToolbar from '../../../ui/components/Toolbar';
import Italic from '../../../icons/Italic';

const additionalComponents = {};

const plugins = global.$whppt.plugins;
const pageTypePlugins = filter(plugins, t => t.pageType);

forEach(pageTypePlugins, plugin => {
  if (plugin.pageType.component) additionalComponents[plugin.pageType.name] = plugin.pageType.component;
});

export default {
  name: 'PageSettingsGeneral',
  components: {
    Italic,
    WhpptToolbar,
    ...additionalComponents,
    WhpptTextInput,
    WhpptSelect,
    WhpptCard,
    WhpptButton,
    WhpptDialog,
  },
  props: {
    page: { type: Object, required: true },
    prefix: { type: String, default: '' },
  },
  data: () => ({
    additionalComponents,
    showWarning: false,
    showSlugModal: false,
    showDuplicatePageModal: false,
    foundDependencies: 0,
    slugCopy: '',
    rawSlug: '',
    newPage: {
      pageType: undefined,
      pageTypeObj: undefined,
      template: undefined,
    },
  }),
  computed: {
    formattedSlug() {
      if (!this.newPage.pageTypeObj || !this.newPage.pageTypeObj.formatSlug) return this.formatSlug(this.slugCopy);
      else return this.formatSlug(this.newPage.pageTypeObj.formatSlug({ slug: this.slugCopy, page: this.page }));
    },
    slugSuffix() {
      if (!this.prefix) return '';
      return this.slugCopy.replace(`${this.prefix}/`, '');
    },
    pageTypes() {
      return compact(map(this.$whppt.plugins, t => t.pageType));
    },
  },
  mounted() {
    this.newPage.pageTypeObj = find(this.pageTypes, t => get(t, 'name') === this.page.pageType) || {};

    if (!this.newPage.pageTypeObj.stripSlug) {
      this.rawSlug = this.page.slug;
    } else {
      this.rawSlug = this.newPage.pageTypeObj.stripSlug({ slug: this.page.slug, page: this.page });
    }

    if (!this.newPage.template) this.newPage.template = this.page.template;
  },
  methods: {
    ...mapActions('whppt/page', ['savePage', 'deletePage', 'checkSlug']),
    setPageTemplate(template) {
      if (!template) return;
      this.newPage.template = template;
    },
    setPageTypeObj(pageType) {
      if (!pageType) return;

      this.newPage.pageTypeObj = pageType;
      this.newPage.pageType = pageType;
    },
    changePageType() {
      let newSlug = this.rawSlug;

      const oldPageTypeObj = find(this.pageTypes, t => get(t, 'name') === this.page.pageType) || {};
      if (oldPageTypeObj && oldPageTypeObj.stripSlug) {
        newSlug = oldPageTypeObj.stripSlug({ slug: newSlug, page: this.page });
      }

      if (this.newPage.pageTypeObj && this.newPage.pageTypeObj.formatSlug) {
        newSlug = this.newPage.pageTypeObj.formatSlug({ slug: newSlug, page: this.newPage });
      }

      if (!this.rawSlug || !newSlug) {
        this.$toast.global.editorError('Cannot use an empty slug');
        return;
      }

      return this.checkSlug({ slug: newSlug, _id: this.page._id, pageType: this.page.pageType }).then(duplicateSlug => {
        const checkPageType = !(this.newPage.pageTypeObj.name === this.page.pageType);
        if (duplicateSlug && checkPageType) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          let page = { ...this.page, slug: newSlug, pageType: this.newPage.pageTypeObj.name };

          const templates = this.newPage.pageTypeObj && this.newPage.pageTypeObj.templates;

          if (this.newPage.template || templates.length === 1) {
            page.template = templates.length === 1 ? templates[0].key : this.newPage.template.key;
          }

          if (checkPageType) {
            return this.newPage.pageTypeObj.createPage(this, { page, form: this.newPage }).then(() => {
              return this.deletePage().then(() => {
                this.$router.push(`/${newSlug}`);
              });
            });
          } else {
            page = { ...page, ...omit(this.newPage, ['pageTypeObj', 'template', 'pageType']) };

            return this.savePage(page).then(() => {
              this.$router.push(`/${newSlug}`);
            });
          }
        }
      });
    },
    checkDependencies() {
      const params = { url: this.page.slug, type: 'link' };

      this.$axios.$get(`${this.$whppt.apiPrefix}/dependencies/checkDependencies`, { params }).then(dependencies => {
        if (dependencies && dependencies.length) this.foundDependencies = dependencies.length;
      });
    },
    openSlugModal() {
      this.showSlugModal = true;
      this.slugCopy = this.rawSlug;
      this.checkDependencies();
    },
    openDupModal() {
      this.showDuplicatePageModal = true;
      this.slugCopy = '';
    },
    openDeleteModal() {
      this.showWarning = true;
      this.checkDependencies();
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
      const newSlug = this.formattedSlug;

      if (!newSlug) {
        this.$toast.global.editorError('Please provide a slug');
        return;
      }

      return this.checkSlug({ slug: newSlug, _id: this.page._id, pageType: this.page.pageType }).then(duplicateSlug => {
        if (duplicateSlug) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          return this.savePage({ ...this.page, slug: newSlug }).then(() => {
            this.foundDependencies = 0;
            this.$router.push(`/${newSlug}`);
            this.$emit('closed');
          });
        }
      });
    },
    duplicatePage() {
      const vm = this;

      const newSlug = this.formattedSlug;

      if (!newSlug) {
        this.$toast.global.editorError('Please provide a slug');
        return;
      }

      return vm.checkSlug({ slug: newSlug, pageType: vm.page.pageType }).then(result => {
        if (result) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          return vm.savePage({ ...this.page, slug: newSlug, _id: undefined }).then(() => {
            vm.$router.push(`/${newSlug}`);
            this.showDuplicatePageModal = false;
            vm.$emit('closed');
          });
        }
      });
    },
    deletePageFromDraft() {
      const vm = this;

      if (vm.page.published) {
        return vm.$toast.global.editorError(
          'This page is currently published, Please unpublish the page before deletion.'
        );
      }

      return vm.deletePage().then(() => {
        !vm.page.slug || vm.page.slug === '/' ? vm.$router.push(`/404`) : vm.$router.push(`/`);
        vm.showWarning = false;
        vm.foundDependencies = 0;
        vm.$emit('closeModal');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$warning-500: #f59e0b;

.whppt-page-setting__general {
  .whppt-divider {
    margin: 0.5rem 0;
    width: 100%;
    height: 1px;
    background: lightgray;
  }

  .whppt-page__form fieldset {
    margin: 1rem 0;
  }

  .whppt-settings__section {
    display: flex;
    padding: 1rem;
  }

  .whppt-page__actions {
    display: flex;

    button {
      margin-right: 0.5rem;
    }
  }
}

.whppt-dialog__warning {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.75rem;
  }

  &-dependencies {
    color: $warning-500;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
}

.whppt-dialog__warning-message {
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 1rem;
  }
}

.whppt-dialog__warning-actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  button {
    margin-left: 0.5rem;
  }
}

.whppt-page-setting__page-type-form {
  button {
    margin-top: 1rem;
  }
}

.whppt-slug__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
