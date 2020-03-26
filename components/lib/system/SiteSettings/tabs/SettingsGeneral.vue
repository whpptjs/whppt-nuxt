<template>
  <form @submit.prevent>
    <div>
      <h4>Email</h4>
      <div class="whppt-flex whppt-align-center">
        <whppt-text-input v-model="settings.emailLocal" placeholder="Give the mailbox a name" class="whppt-full" />
        <div class="whppt-settings__email-at-sign">@</div>
        <whppt-select
          v-model="settings.emailDomain"
          :items="domains"
          action="Select a domain name"
          class="whppt-full"
          white
        />
      </div>
      <div>
        <h4>Mailing List</h4>
        <div>
          <whppt-text-input
            v-model="settings.subscriptionListId"
            placeholder="e.g. 12345678"
            label="Subscription Mail List ID"
            label-colour="black"
            info="The ID of the mailing list that users will be subscribed to if they opt in."
          />
        </div>
      </div>
      <div>
        <button class="whppt-settings__button" @click="pubNav">
          Publish Nav
        </button>
        <button class="whppt-settings__button" @click="pubFooter">
          Publish Footer
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import WhpptSelect from '../../../whpptComponents/WhpptSelect';

export default {
  name: 'SettingsGeneral',
  components: { WhpptTextInput, WhpptSelect },
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    domains: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/getVerifiedDomains`).then(({ data }) => (this.domains = data));
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

<style scoped>
.whppt-settings__email-at-sign {
  margin: 0 1rem;
}
</style>
