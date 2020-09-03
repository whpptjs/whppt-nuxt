<template>
  <form @submit.prevent>
    <md-subheader>Email</md-subheader>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <whppt-input v-model="settings.emailLocal" label="Give the mailbox a name" />
      </div>
      <div class="md-layout-item md-small-size-100">
        <whppt-select v-model="settings.emailDomain" :items="domains" label="Select a domain name" />
      </div>
    </div>
    <md-divider></md-divider>
    <!--      <div>-->
    <!--        <h4>Mailing List</h4>-->
    <!--        <div>-->
    <!--          <whppt-text-input-->
    <!--            v-model="settings.subscriptionListId"-->
    <!--            placeholder="e.g. 12345678"-->
    <!--            label="Subscription Mail List ID"-->
    <!--            label-colour="black"-->
    <!--            info="The ID of the mailing list that users will be subscribed to if they opt in."-->
    <!--          />-->
    <!--        </div>-->
    <!--      </div>-->
    <div v-if="publishing">
      <md-subheader>Publishing</md-subheader>
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
