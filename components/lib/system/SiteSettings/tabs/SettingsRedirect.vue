<template>
  <form @submit.prevent>
    <fieldset>
      <div class="whppt-flex-between whppt-align-center">
        <label>New Redirect</label>
        <button class="whppt-settings__button" style="display: flex" @click="addRedirect">
          Add Redirect
        </button>
      </div>
      <div class="whppt-flex-between">
        <div class="whppt-settings__left-column">
          <whppt-text-input
            v-model="newRedirect.from"
            placeholder="From page (eg. page)"
            label="From"
            label-colour="black"
            info="When visiting this Page, users will be sent to the To Page instead."
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="newRedirect.to"
            placeholder="To page (eg. page/item)"
            label="To"
            label-colour="black"
            info="Users will be sent to this Page when visiting the From Page"
          />
        </div>
      </div>

      <div class="whppt-flex-between whppt-align-center" style="padding-top: 1rem;">
        <label style="font-size: 1.25rem">Saved Redirects</label>
        <div class="whppt-flex-start whppt-align-center">
          <div
            v-for="index in pages"
            :key="`page-${index}`"
            class="whppt-redirects__page"
            :class="index === currentPage + 1 ? 'whppt-redirects__page-selected' : ''"
            style="display: flex"
            @click="swapPage(index - 1)"
          >
            {{ index }}
          </div>
        </div>
      </div>
      <div v-for="(redirect, index) in slicedRedirects" :key="index">
        <div class="whppt-flex-between whppt-align-center">
          <div class="whppt-redirects__left-column">
            <whppt-text-input v-model="redirect.from" placeholder="From Page" label="From" label-colour="black" />
          </div>
          <div class="whppt-redirects__middle-column">
            <whppt-text-input v-model="redirect.to" placeholder="To Page" label="To" label-colour="black" />
          </div>
          <div class="whppt-redirects__actions-column">
            <div class="whppt-settings__tooltip whppt-redirects__icon" @click="save(redirect)">
              <span class="whppt-settings__tooltip-text">Save</span>
              <w-save></w-save>
            </div>
            <div v-if="publishing" class="whppt-settings__tooltip whppt-redirects__icon" @click="publish(redirect)">
              <span class="whppt-settings__tooltip-text">Publish</span>
              <w-publish></w-publish>
            </div>
            <div
              v-if="publishing"
              class="whppt-settings__tooltip whppt-redirects__icon"
              @click="unpublishRedirect(redirect)"
            >
              <span class="whppt-settings__tooltip-text">Unpublish</span>
              <w-close></w-close>
            </div>
            <div class="whppt-settings__tooltip whppt-redirects__icon" @click="deleteRedirect(redirect)">
              <span class="whppt-settings__tooltip-text">Delete</span>
              <w-remove></w-remove>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!redirects || !redirects.length">There are currently no redirects</div>
    </fieldset>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import slugify from 'slugify';

import { remove } from 'lodash';
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';

export default {
  name: 'SettingsRedirects',
  components: { WhpptTextInput },
  data: () => ({
    redirects: [],
    slicedRedirects: [],
    newRedirect: { from: '', to: '' },
    errorMessage: '',
    pages: 0,
    currentPage: 0,
    limit: 4,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  mounted() {
    this.loadRedirects();
  },
  methods: {
    isPublished(redirect) {
      return redirect.published;
    },
    sliceRedirects() {
      this.pages = Math.ceil(this.redirects.length / this.limit);

      if (this.currentPage >= this.pages) this.currentPage = this.pages - 1;

      this.slicedRedirects = this.redirects.slice(
        this.currentPage * this.limit,
        this.currentPage * this.limit + this.limit
      );
    },
    loadRedirects() {
      const vm = this;
      return this.$axios
        .get(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/loadRedirects`)
        .then(({ data: redirects }) => {
          if (!redirects || !redirects.length) return;
          vm.redirects = redirects;
          vm.sliceRedirects();
        });
    },
    deleteRedirect(redirect) {
      if (redirect.published) return this.$toast.global.editorError('Redirect has to be unpublished first');
      const vm = this;
      return this.$axios
        .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/deleteRedirect`, { _id: redirect._id })
        .then(() => {
          vm.redirects = remove(vm.redirects, r => r._id !== redirect._id);
          vm.sliceRedirects();
        });
    },
    addRedirect() {
      const vm = this;
      this.newRedirect.to = this.formatSlug(this.newRedirect.to);
      this.newRedirect.from = this.formatSlug(this.newRedirect.from);
      if (!this.newRedirect.to || !this.newRedirect.from)
        return this.$toast.global.editorError('Cannot save an empty redirect');

      if (this.newRedirect.to === this.newRedirect.from)
        return this.$toast.global.editorError('To and From must be different');

      if (!this.newRedirect.to.startsWith('/')) this.newRedirect.to = `/${this.newRedirect.to}`;
      if (!this.newRedirect.from.startsWith('/')) this.newRedirect.from = `/${this.newRedirect.from}`;

      return this.$axios
        .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/checkDuplicateRedirect`, {
          redirect: this.newRedirect,
        })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
          return this.$axios
            .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/saveRedirect`, { redirect: this.newRedirect })
            .then(() => {
              this.loadRedirects();
              this.$toast.global.editorSuccess('Redirect Successfully Added');
              this.newRedirect = { to: '', from: '' };
            });
        });
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
    },
    save(redirect) {
      const vm = this;
      redirect.to = this.formatSlug(redirect.to);
      redirect.from = this.formatSlug(redirect.from);
      if (!redirect.to || !redirect.from) return this.$toast.global.editorError('Cannot save an empty redirect');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;

      return this.$axios
        .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/checkDuplicateRedirect`, { redirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
          return this.$axios
            .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/saveRedirect`, { redirect })
            .then(({ data: redirect }) => {
              this.$toast.global.editorSuccess('Redirect Saved');
            });
        });
    },
    publish(redirect) {
      const vm = this;
      redirect.to = this.formatSlug(redirect.to);
      redirect.from = this.formatSlug(redirect.from);
      if (!redirect.to || !redirect.from) return this.$toast.global.editorError('Cannot publish an empty redirect');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;
      return this.$axios
        .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/checkDuplicatePublishedRedirect`, { redirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return vm.$toast.global.editorError('Redirect already exists');
          return vm.$axios
            .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/publishRedirect`, { redirect })
            .then(() => {
              redirect.published = true;
              vm.$toast.global.editorSuccess('Redirect Published');
            });
        });
    },
    unpublishRedirect(redirect) {
      if (!redirect.published) return this.$toast.global.editorError("Redirect isn't published");
      const vm = this;
      return vm.$axios
        .post(`${vm.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/unpublishRedirect`, { _id: redirect._id })
        .then(() => {
          redirect.published = false;
          vm.$toast.global.editorSuccess('Redirect Unpublished');
        });
    },
    swapPage(newPage) {
      this.currentPage = newPage;
      this.sliceRedirects();
    },
  },
};
</script>

<style>
.whppt-redirects__actions-column {
  width: 20%;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.whppt-redirects__page {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 0.5rem;
  border: 1px solid #981a31;
}

.whppt-redirects__page-selected {
  color: white;
  background: #981a31;
}

.whppt-redirects__left-column {
  width: 40%;
  padding-right: 1rem;
}

.whppt-redirects__middle-column {
  width: 40%;
  padding: 0 1rem;
}

.whppt-redirects__icon {
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #981a31;
}
</style>
