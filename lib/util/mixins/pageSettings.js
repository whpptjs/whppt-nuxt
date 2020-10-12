import { mapActions } from 'vuex';
import { clamp } from 'lodash';

export default {
  props: {
    page: { type: Object, required: true },
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage']),
    saveSettings(page) {
      const updatedPage = {
        ...this.page,
        ...page,
        priority: clamp(page.priority || this.page.priority, 0, 1),
      };

      return this.savePage(updatedPage);
    },
  },
};
