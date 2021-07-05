<template>
  <form @submit.prevent>
    <whppt-card v-if="publishing" title="Publishing">
      <div class="general-settings">
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
    <whppt-card title="Dependencies">
      <div>
        <whppt-button @click="recreateDependencies">
          Recreate Dependencies
        </whppt-button>
        <div v-if="recreatingDependencies" class="general-settings__dependencies">
          <div class="general-settings__dependencies-container">
            <div class="general-settings__dependencies-unfilled" />
            <div
              class="general-settings__dependencies-filled"
              :style="`width: ${(dependencyProgress / totalPages) * 100}%; `"
            />
          </div>
          <div class="general-settings__dependencies-progress">{{ dependencyProgress }} / {{ totalPages }}</div>
        </div>
      </div>
    </whppt-card>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptButton from '../../../ui/components/Button';
import WhpptCard from '../../../ui/components/Card';

export default {
  name: 'SettingsGeneral',
  components: { WhpptButton, WhpptCard },
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    domains: [],
    recreatingDependencies: false,
    totalPages: 0,
    dependencyProgress: 0,
  }),
  computed: {
    ...mapState('whppt/editor', ['baseAPIUrl']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  methods: {
    ...mapActions('whppt/site', ['saveSiteSettings', 'publishSiteSettings', 'publishNav', 'publishFooter']),
    pubNav() {
      this.publishNav();
    },
    pubFooter() {
      this.publishFooter();
    },
    resetDependencyProgress() {
      this.recreatingDependencies = false;
      this.dependencyProgress = 0;
      this.totalPages = 0;
    },
    recreateDependencies() {
      return this.$axios.$get(`${this.$whppt.apiPrefix}/sitemap/filter`).then(({ sitemap, total }) => {
        this.totalPages = total;
        this.dependencyProgress = 0;
        this.recreatingDependencies = true;

        return Promise.all(
          sitemap.map(sitemapPage => {
            const { slug, pageType, collection } = sitemapPage;
            return this.$whppt.page.load({ slug, pageType, collection }).then(page => {
              return this.$whppt.page.save(page).then(() => {
                this.dependencyProgress = this.dependencyProgress + 1;
              });
            });
          })
        )
          .then(() => {
            this.resetDependencyProgress();
            this.$toast.global.editorSuccess('Dependencies recreated');
          })
          .catch(() => {
            this.resetDependencyProgress();
            this.$toast.global.editorError('Something went wrong');
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.general-settings {
  display: flex;

  button {
    margin-right: 0.5rem;
  }

  &__dependencies {
    margin-top: 1rem;
    display: flex;
    align-items: 'center';

    &-progress {
      margin-left: 1rem;
    }

    &-container {
      position: relative;
      width: 500px;
      height: 20px;
    }

    &-unfilled {
      background: #5a67d8;
      height: 20px;
      position: absolute;
      width: 100%;
      border-radius: 6rem;
    }

    &-filled {
      background: #2734a5;
      height: 20px;
      position: absolute;
      border-radius: 6rem;
    }
  }
}
</style>
