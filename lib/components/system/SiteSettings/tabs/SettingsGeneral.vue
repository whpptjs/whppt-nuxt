<template>
  <form @submit.prevent>
    <whppt-card title="Email">
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
    </whppt-card>
    <whppt-card v-if="publishing" title="Publishing">
      <div class="publishing-settings">
        <whppt-button @click="$emit('publish-settings')">
          Publish Site Settings
        </whppt-button>
        <whppt-button @click="pubNav">
          Publish Nav
        </whppt-button>
        <whppt-button @click="pubFooter">
          Publish Footer
        </whppt-button>
      </div>
    </whppt-card>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptSelect from '../../../ui/components/Select';
import WhpptInput from '../../../ui/components/Input';
import WhpptButton from '../../../ui/components/Button';
import WhpptCard from '../../../ui/components/Card';

export default {
  name: 'SettingsGeneral',
  components: { WhpptInput, WhpptSelect, WhpptButton, WhpptCard },
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    domains: [],
  }),
  computed: {
    ...mapState('whppt/editor', ['baseAPIUrl']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  mounted() {
    // this.$api.get(`/siteSettings/getVerifiedDomains`).then(({ data }) => (this.domains = data));
  },
  methods: {
    ...mapActions('whppt/site', ['saveSiteSettings', 'publishSiteSettings', 'publishNav', 'publishFooter']),
    pubNav() {
      this.publishNav();
    },
    pubFooter() {
      this.publishFooter();
    },
  },
};
</script>

<style lang="scss" scoped>
.publishing-settings {
  display: flex;

  button {
    margin-right: 0.5rem;
  }
}
</style>
