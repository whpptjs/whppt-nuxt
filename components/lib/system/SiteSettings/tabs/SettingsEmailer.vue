<template>
  <form @submit.prevent>
    <div>
      <fieldset>
        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column" style="width: 100%; padding-right: 2rem;">
            <whppt-text-input v-model="emailerConfig.config.host" label="SMTP Host" label-colour="black" />
          </div>
          <div class="whppt-settings__right-column" style="width: 100%; padding-left: 2rem;">
            <whppt-text-input v-model="emailerConfig.config.port" label="SMTP Port" label-colour="black" />
          </div>
        </div>
        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column" style="width: 100%; padding-right: 2rem;">
            <whppt-text-input v-model="emailerConfig.config.auth.user" label="Username" label-colour="black" />
          </div>
          <div class="whppt-settings__right-column" style="width: 100%; padding-left: 2rem;">
            <whppt-text-input v-model="emailerConfig.config.auth.pass" label="Password" label-colour="black" />
          </div>
        </div>
        <button class="whppt-settings__button" style="display: flex" @click="saveEmailerSettings">
          Save Emailer Settings
        </button>
      </fieldset>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';

import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';

export default {
  name: 'SettingsEmailer',
  components: { WhpptTextInput },
  data() {
    return {
      emailerConfig: { _id: 'emailerConfig', config: { secure: false, requireTLS: true, auth: {} } },
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.loadEmailerSettings();
  },
  methods: {
    loadEmailerSettings() {
      return this.$axios
        .get(`${this.baseAPIUrl}/api/siteSettings/loadEmailerConfig`)
        .then(({ data: emailerConfig }) => {
          this.emailerConfig = emailerConfig || {
            _id: 'emailerConfig',
            config: { secure: false, requireTLS: true, auth: {} },
          };
        });
    },
    saveEmailerSettings() {
      return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveEmailerConfig`, {
        emailerConfig: this.emailerConfig,
      });
    },
  },
};
</script>

<style scoped>
.whppt-settings__email-at-sign {
  margin: 0 1rem;
}
</style>
