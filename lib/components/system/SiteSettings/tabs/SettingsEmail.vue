<template>
  <form @submit.prevent>
    <whppt-card>
      <whppt-text-input :id="`${$options._scopeId}-`" v-model="emailerConfig.config.host" label="SMTP Host" />
      <whppt-text-input :id="`${$options._scopeId}-`" v-model="emailerConfig.config.port" label="SMTP Port" />
      <whppt-text-input :id="`${$options._scopeId}-`" v-model="emailerConfig.config.auth.user" label="Username" />
      <whppt-text-input
        :id="`${$options._scopeId}-`"
        v-model="newPassword"
        type="password"
        :placeholder="emailerConfig.config.auth.pass ? 'Password Hidden' : ''"
        label="Password"
        info="For security purposes, the SMTP password can be set or changed here, but is never shown."
      />
    </whppt-card>
    <whppt-card>
      <whppt-button v-if="publishing" @click="publishEmailerSettings">
        Publish Email Settings
      </whppt-button>
      <whppt-button @click="saveEmailerSettings">
        Save Email Settings
      </whppt-button>
    </whppt-card>
  </form>
</template>

<script>
import { mapState } from 'vuex';

import WhpptTextInput from '../../../ui/Input';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';

export default {
  name: 'SettingsEmailer',
  components: { WhpptTextInput, WhpptCard, WhpptButton },
  data() {
    return {
      emailerConfig: { config: { secure: false, requireTLS: true, auth: {} } },
      newPassword: '',
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  mounted() {
    this.loadEmailerSettings();
  },
  methods: {
    loadEmailerSettings() {
      return this.$api.get(`/siteSettings/loadEmailerConfig`).then(({ data: emailerConfig }) => {
        this.emailerConfig = emailerConfig || {
          _id: 'emailerConfig',
          config: { secure: false, requireTLS: true, auth: {} },
        };
      });
    },
    saveEmailerSettings() {
      const newConfig = this.emailerConfig;
      newConfig.config.auth.pass = this.newPassword || undefined;

      return this.$api
        .post(`/siteSettings/saveEmailerConfig`, {
          emailerConfig: newConfig,
        })
        .then(() => {
          this.$toast.global.editorSuccess('Emailer Settings Saved');
        });
    },
    publishEmailerSettings() {
      const newConfig = this.emailerConfig;
      newConfig.config.auth.pass = this.newPassword || undefined;

      return this.$api
        .post(`/siteSettings/publishEmailerConfig`, {
          emailerConfig: newConfig,
        })
        .then(() => {
          this.$toast.global.editorSuccess('Emailer Settings Published');
        });
    },
  },
};
</script>
