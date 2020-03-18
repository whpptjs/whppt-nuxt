<template>
  <div>
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
            labelColour="black"
            info="When visiting this Page, users will be sent to the To Page instead."
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="newRedirect.to"
            placeholder="To page (eg. page/item)"
            label="To"
            labelColour="black"
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
      <div v-for="(redirect, index) in redirects" :key="index">
        <div class="whppt-flex-between whppt-align-center">
          <div class="whppt-redirects__left-column">
            <whppt-text-input v-model="redirect.from" placeholder="From Page" label="From" labelColour="black" />
          </div>
          <div class="whppt-redirects__middle-column">
            <whppt-text-input v-model="redirect.to" placeholder="To Page" label="To" labelColour="black" />
          </div>
          <div class="whppt-redirects__actions-column">
            <div class="whppt-redirects__icon" @click="save(redirect)">
              <w-save></w-save>
            </div>
            <div class="whppt-redirects__icon" @click="publish(redirect)">
              <w-publish></w-publish>
            </div>
            <div class="whppt-redirects__icon" @click="unpublishRedirect(redirect)">
              <w-close></w-close>
            </div>
            <div class="whppt-redirects__icon" @click="$emit('deleteRedirect', redirect)">
              <w-remove></w-remove>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!redirects || !redirects.length">There are currently no redirects</div>
    </fieldset>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'SettingsRedirects',
  components: { WhpptTextInput },
  props: {
    redirects: { type: Array, default: () => [] },
    pages: { type: Number, default: 0 },
    currentPage: { type: Number, default: 0 },
  },
  data() {
    return {
      newRedirect: { from: '', to: '' },
      errorMessage: '',
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {},
  methods: {
    isPublished(redirect) {
      return redirect.published;
    },
    addRedirect() {
      const vm = this;
      if (!this.newRedirect.to || !this.newRedirect.from)
        return this.$toast.global.editorError('Cannot save an empty redirect');
      if (this.newRedirect.to === this.newRedirect.from)
        return this.$toast.global.editorError('To and From must be different');
      if (!this.newRedirect.to.startsWith('/')) this.newRedirect.to = `/${this.newRedirect.to}`;
      if (!this.newRedirect.from.startsWith('/')) this.newRedirect.from = `/${this.newRedirect.from}`;
      return this.$axios
        .post(`${vm.baseAPIUrl}/api/siteSettings/checkDuplicateRedirect`, { redirect: this.newRedirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
          return this.$axios
            .post(`${vm.baseAPIUrl}/api/siteSettings/saveRedirect`, { redirect: this.newRedirect })
            .then(({ data: redirect }) => {
              this.$emit('addedRedirect', redirect);
              this.$toast.global.editorSuccess('Redirect Successfully Added');
              this.newRedirect = { to: '', from: '' };
            });
        });
    },
    save(redirect) {
      const vm = this;
      if (!redirect.to || !redirect.from) return this.$toast.global.editorError('Cannot save an empty redirect');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;
      return this.$axios
        .post(`${vm.baseAPIUrl}/api/siteSettings/checkDuplicateRedirect`, { redirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
          return this.$axios
            .post(`${vm.baseAPIUrl}/api/siteSettings/saveRedirect`, { redirect })
            .then(({ data: redirect }) => {
              this.$toast.global.editorSuccess('Redirect Saved');
            });
        });
    },
    publish(redirect) {
      const vm = this;
      if (!redirect.to || !redirect.from) return this.$toast.global.editorError('Cannot publish an empty redirect');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;
      return this.$axios
        .post(`${vm.baseAPIUrl}/api/siteSettings/checkDuplicatePublishedRedirect`, { redirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return vm.$toast.global.editorError('Redirect already exists');
          return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/publishRedirect`, { redirect }).then(() => {
            redirect.published = true;
            vm.$toast.global.editorSuccess('Redirect Published');
          });
        });
    },
    unpublishRedirect(redirect) {
      if (!redirect.published) return this.$toast.global.editorError("Redirect isn't published");
      const vm = this;
      return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/unpublishRedirect`, { _id: redirect._id }).then(() => {
        redirect.published = false;
        vm.$toast.global.editorSuccess('Redirect Unpublished');
      });
    },
    swapPage(newPage) {
      this.$emit('swapPage', newPage);
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
