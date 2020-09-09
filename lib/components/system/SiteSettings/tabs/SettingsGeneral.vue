<template>
  <form @submit.prevent>
    <div class="">
      <div class="">
        <whppt-input id="site-settings-email-local" v-model="settings.emailLocal" label="Give the mailbox a name" />
      </div>
      <div class="">
        <whppt-select
          id="site-settings-email-domain"
          v-model="settings.emailDomain"
          :items="domains"
          label="Select a domain name"
        />
      </div>
    </div>
    <div v-if="publishing">
      <whppt-button class="md-primary md-raised" @click="pubNav">
        Publish Nav
      </whppt-button>
      <whppt-button class="md-primary md-raised" @click="pubFooter">
        Publish Footer
      </whppt-button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptSelect from '../../../ui/Select';
import WhpptInput from '../../../ui/Input';
import WhpptButton from '../../../ui/Button';

export default {
  name: 'SettingsGeneral',
  components: { WhpptInput, WhpptSelect, WhpptButton },
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    domains: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  mounted() {
    // this.$api.get(`/siteSettings/getVerifiedDomains`).then(({ data }) => (this.domains = data));
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveSiteSettings', 'publishSiteSettings', 'publishNav', 'publishFooter']),
    pubNav() {
      this.publishNav();
    },
    pubFooter() {
      this.publishFooter();
    },
  },
};
</script>
