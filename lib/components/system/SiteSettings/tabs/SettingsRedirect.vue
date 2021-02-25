<template>
  <div class="whppt-redirects">
    <whppt-card>
      <form @submit.prevent>
        <div class="whppt-redirects__form">
          <div class="whppt-redirects__inputs">
            <whppt-text-input
              :id="`${$options._scopeId}-settings-redirects-from`"
              v-model="newRedirect.from"
              placeholder="From page (eg. my-page)"
              label="From"
              info="When visiting this page, users will be sent to the To page instead."
            />
            <whppt-spacer :width="2"></whppt-spacer>
            <whppt-text-input
              :id="`${$options._scopeId}-settings-redirects-to`"
              v-model="newRedirect.to"
              placeholder="To page (eg. another-page)"
              label="To"
              info="Users will be sent to this Page when visiting the From Page"
            />
          </div>

          <div class="whppt-redirects__actions">
            <whppt-button @click="addRedirect">
              Add Redirect
            </whppt-button>
          </div>
        </div>
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-text-input
        id="redirectFilter"
        v-model="filter"
        placeholder="about-us"
        label="Search"
        info="Search the from field or the to field"
        class="whppt-redirects__search"
        @input="searchRedirects"
      />
      <whppt-table
        dense
        :items="items"
        :headers="headers"
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
        @update:page="loadRedirects"
        @update:perPage="loadRedirects"
      >
        <template v-slot:item.from="{ item }">
          <span class="whppt-redirects__overflow">{{ item.from }}</span>
        </template>
        <template v-slot:item.to="{ item }">
          <a target="_blank" class="whppt-link" :href="item.to">
            <span class="whppt-redirects__overflow">{{ item.to }}</span>
          </a>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="flex">
            <a class="underline" @click="!item.published ? publish(item) : unpublishRedirect(item)">{{
              !item.published ? 'Publish' : 'Unpublish'
            }}</a>
            <div v-if="!item.published" class="flex ">
              <div class="mx-1">-</div>

              <a class="underline" @click="deleteRedirect(item)">Delete</a>
            </div>
          </div>
        </template>
      </whppt-table>
    </whppt-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map } from 'lodash';
import dayjs from 'dayjs';
import slugify from 'slugify';
import WhpptTextInput from '../../../ui/components/Input';
import WhpptTable from '../../../ui/components/Table';
import WhpptCard from '../../../ui/components/Card';
import WhpptSpacer from '../../../ui/components/Spacer';
import WhpptButton from '../../../ui/components/Button';

export default {
  name: 'SettingsRedirects',
  components: { WhpptTextInput, WhpptTable, WhpptCard, WhpptButton, WhpptSpacer },
  data: () => ({
    redirects: [],
    newRedirect: { from: '', to: '' },
    errorMessage: '',
    currentPage: 1,
    limit: 5,
    total: 0,
    filter: '',
  }),
  computed: {
    ...mapState('whppt/editor', ['baseAPIUrl']),
    ...mapState('whppt/config', ['domain']),
    publishing() {
      return !this.$whppt.disablePublishing;
    },
    items() {
      return map(this.redirects, redirect => ({
        _id: redirect._id,
        domainId: redirect.domainId,
        from: redirect.from,
        to: redirect.to,
        lastmod: redirect.updatedAt ? dayjs(redirect.updatedAt).format('DD MMM YYYY') : '–',
        createdAt: redirect.createdAt ? dayjs(redirect.createdAt).format('DD MMM YYYY') : '–',
        published: redirect.published || false,
        publishedAt: redirect.lastPublished ? dayjs(redirect.lastPublished).format('DD MMM YYYY') : '–',
      }));
    },
    headers() {
      return [
        { text: 'Actions', align: 'start', value: 'actions' },
        { text: 'From', align: 'start', value: 'from' },
        { text: 'To', align: 'start', value: 'to' },
        { text: 'Published', align: 'start', value: 'published' },
        { text: 'Published At', align: 'start', value: 'publishedAt' },
        { text: 'Last Modified', align: 'start', value: 'lastmod' },
        { text: 'Created At', align: 'start', value: 'createdAt' },
      ];
    },
  },
  mounted() {
    this.loadRedirects();
  },
  methods: {
    searchRedirects() {
      this.currentPage = 1;
      this.loadRedirects();
    },
    loadRedirects() {
      if (!this.domain._id) return this.$toast.global.editorError('No domain found');

      const params = { page: this.currentPage, size: this.limit, domainId: this.domain._id, search: this.filter };

      return this.$axios
        .$get(`${this.$whppt.apiPrefix}/siteSettings/loadRedirects`, { params })
        .then(({ redirects, total }) => {
          this.redirects = redirects;
          this.total = total;
        });
    },
    deleteRedirect(redirect) {
      if (redirect.published) return this.$toast.global.editorError('Redirect has to be unpublished first');

      return this.$axios
        .post(`${this.$whppt.apiPrefix}/siteSettings/deleteRedirect`, { _id: redirect._id })
        .then(() => {
          this.loadRedirects();
        });
    },
    addRedirect() {
      if (!this.domain._id) return this.$toast.global.editorError('No domain found');

      this.newRedirect.domainId = this.domain._id;

      if (!this.newRedirect.from) return this.$toast.global.editorError('Cannot save with an empty "from"');

      if (this.newRedirect.to === this.newRedirect.from)
        return this.$toast.global.editorError('To and From must be different');

      if (!this.newRedirect.from.startsWith('http') && !this.newRedirect.from.startsWith('/')) {
        this.newRedirect.from = `/${this.newRedirect.from}`;
      }

      if (!this.newRedirect.to.startsWith('http') && !this.newRedirect.to.startsWith('/')) {
        this.newRedirect.to = `/${this.newRedirect.to}`;
      }

      return this.$api
        .post(`/siteSettings/checkDuplicateRedirect`, {
          redirect: this.newRedirect,
        })
        .then(({ data: alreadyExists }) => {
          if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
          return this.$api.post(`/siteSettings/saveRedirect`, { redirect: this.newRedirect }).then(() => {
            this.loadRedirects();
            this.$toast.global.editorSuccess('Redirect Successfully Added');
            this.newRedirect = { to: '', from: '' };
          });
        });
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
    },
    save(redirect) {
      redirect.to = this.formatSlug(redirect.to);
      redirect.from = this.formatSlug(redirect.from);
      if (!redirect.from) return this.$toast.global.editorError('Cannot save with an empty "from"');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;

      return this.$api.post(`/siteSettings/checkDuplicateRedirect`, { redirect }).then(({ data: alreadyExists }) => {
        if (alreadyExists) return this.$toast.global.editorError('Redirect already exists');
        return this.$api.post(`/siteSettings/saveRedirect`, { redirect }).then(({ data: redirect }) => {
          this.$toast.global.editorSuccess('Redirect Saved');
        });
      });
    },
    publish(redirect) {
      const vm = this;
      redirect.to = this.formatSlug(redirect.to);
      redirect.from = this.formatSlug(redirect.from);
      if (!redirect.from) return this.$toast.global.editorError('Cannot publish with an empty "from"');
      if (redirect.to === redirect.from) return this.$toast.global.editorError('To and From must be different');
      if (!redirect.to.startsWith('/')) redirect.to = `/${redirect.to}`;
      if (!redirect.from.startsWith('/')) redirect.from = `/${redirect.from}`;

      return this.$axios
        .$post(`${this.$whppt.apiPrefix}/siteSettings/checkDuplicatePublishedRedirect`, { redirect })
        .then(alreadyExists => {
          if (alreadyExists) return vm.$toast.global.editorError('Redirect already exists');
          return vm.$api.post(`/siteSettings/publishRedirect`, { redirect }).then(() => {
            vm.$toast.global.editorSuccess('Redirect Published');
            this.loadRedirects();
          });
        });
    },
    unpublishRedirect(redirect) {
      if (!redirect.published) return this.$toast.global.editorError("Redirect isn't published");

      return this.$axios
        .$post(`${this.$whppt.apiPrefix}/siteSettings/unpublishRedirect`, { _id: redirect._id })
        .then(() => {
          this.$toast.global.editorSuccess('Redirect Unpublished');
          this.loadRedirects();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-redirects__overflow {
  // width: 150px;
  display: block;
  white-space: pre-wrap;
}

.whppt-redirects__form {
  .whppt-redirects__inputs {
    display: flex;
  }
  .whppt-redirects__actions {
    display: flex;
    margin-top: 1rem;

    button:first-of-type {
      margin-left: auto;
    }
  }
}

.whppt-redirects__search {
  margin-bottom: 1.5rem;
}

.whppt-link {
  &:hover {
    text-decoration: underline;
    color: $primary-600;
  }
}
</style>
