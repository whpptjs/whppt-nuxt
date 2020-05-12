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
            <whppt-text-input
              v-model="newPassword"
              type="password"
              :placeholder="emailerConfig.config.auth.pass ? 'Password Hidden' : ''"
              label="Password"
              label-colour="black"
              info="For security purposes, the SMTP password can be set or changed here, but is never shown."
            />
          </div>
        </div>
        <div class="whppt-flex">
          <button class="whppt-settings__button" style="display: flex" @click="publishEmailerSettings">
            Publish Email Settings
          </button>
          <button class="whppt-settings__button" style="display: flex; margin-left: 1rem;" @click="saveEmailerSettings">
            Save Email Settings
          </button>
        </div>
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
      emailerConfig: { config: { secure: false, requireTLS: true, auth: {} } },
      newPassword: '',
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
        .get(`${this.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/loadEmailerConfig`)
        .then(({ data: emailerConfig }) => {
          this.emailerConfig = emailerConfig || {
            _id: 'emailerConfig',
            config: { secure: false, requireTLS: true, auth: {} },
          };
        });
    },
    saveEmailerSettings() {
      const newConfig = this.emailerConfig;
      newConfig.config.auth.pass = this.newPassword || undefined;
      return this.$axios
        .post(`${this.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/saveEmailerConfig`, {
          emailerConfig: newConfig,
        })
        .then(() => {
          this.$toast.global.editorSuccess('Emailer Settings Saved');
        });
    },
    publishEmailerSettings() {
      const newConfig = this.emailerConfig;
      newConfig.config.auth.pass = this.newPassword || undefined;
      return this.$axios
        .post(`${this.baseAPIUrl}/${this.$whppt.apiPrefix}/siteSettings/publishEmailerConfig`, {
          emailerConfig: newConfig,
        })
        .then(() => {
          this.$toast.global.editorSuccess('Emailer Settings Published');
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
