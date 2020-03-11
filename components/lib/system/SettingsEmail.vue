<template>
  <div>
    <fieldset>
      <div class="whppt-flex whppt-align-center">
        <whppt-text-input v-model="settings.emailLocal" placeholder="Give the mailbox a name" class="whppt-full" />
        <span>@</span>
        <whppt-select v-model="settings.emailDomain" :items="domains" action="Select a domain name" />
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'SettingsEmail',
  components: { WhpptTextInput, WhpptSelect },
  props: { settings: { type: Object, default: () => ({}) } },
  data() {
    return {
      domains: [],
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/getVerifiedDomains`).then(({ data }) => (this.domains = data));
  },
};
</script>
