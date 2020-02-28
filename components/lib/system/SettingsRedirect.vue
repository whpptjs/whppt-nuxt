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
            placeholder="From URL"
            label="From"
            labelColour="black"
            info="When visiting this URL, users will be sent to the To URL instead."
          />
        </div>
        <div class="whppt-settings__right-column">
          <whppt-text-input
            v-model="newRedirect.to"
            placeholder="To URL"
            label="To"
            labelColour="black"
            info="Users will be sent to this URL when visiting the From URL"
          />
        </div>
      </div>

      <div class="whppt-flex-between whppt-align-center" style="padding-top: 1rem;">
        <label>Saved Redirects</label>
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
            <whppt-text-input v-model="redirect.from" placeholder="From URL" label="From" labelColour="black" />
          </div>
          <div class="whppt-redirects__middle-column">
            <whppt-text-input v-model="redirect.to" placeholder="To URL" label="To" labelColour="black" />
          </div>
          <div class="whppt-redirects__actions-column">
            <div class="whppt-redirects__icon" @click="$emit('deleteRedirect', redirect._id)">
              <w-remove></w-remove>
            </div>
          </div>
        </div>
      </div>
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
    addRedirect() {
      const vm = this;
      if (!this.newRedirect.to || !this.newRedirect.from) return;
      return this.$axios
        .post(`${vm.baseAPIUrl}/api/siteSettings/checkDuplicateRedirect`, { redirect: this.newRedirect })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return (this.errorMessage = 'That redirect already exists.');
          return this.$axios
            .post(`${vm.baseAPIUrl}/api/siteSettings/saveRedirect`, { redirect: this.newRedirect })
            .then(({ data: redirect }) => {
              this.$emit('addedRedirect', redirect);
              this.newRedirect = { to: '', from: '' };
            });
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
  width: 10%;
  padding-left: 1rem;
  padding-top: 1rem;
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
  width: 45%;
  padding-right: 1rem;
}

.whppt-redirects__middle-column {
  width: 45%;
  padding: 0 1rem;
}

.whppt-redirects__icon {
  border: 1px solid #981a31;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #981a31;
}
</style>
