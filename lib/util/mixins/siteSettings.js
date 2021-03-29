import { mapActions } from 'vuex';

export default {
  props: {
    settings: { type: Object, required: true },
  },
  methods: {
    ...mapActions('whppt/site', ['saveSiteSettings']),
    saveSettings(settings) {
      const siteSettings = {
        ...this.settings,
        ...settings,
      };

      return this.saveSiteSettings({ siteSettings });
    },
  },
};
