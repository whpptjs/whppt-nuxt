<template>
  <div class="whppt-redirects">
    <whppt-card class="whppt-redirects__form-card" :show-content="redirectFormVisible">
      <template v-slot:header>
        <whppt-toolbar class="whppt-redirects__toolbar">
          <div
            class="items-center cursor-pointer flex justify-between w-full"
            @click="redirectFormVisible ? (redirectFormVisible = false) : (redirectFormVisible = true)"
          >
            <span>Add New Redirect</span>
            <button>
              <chevron-down-icon
                :class="!redirectFormVisible ? 'whppt-redirects__toolbar-expand' : 'whppt-redirects__toolbar-contract'"
              ></chevron-down-icon>
            </button>
          </div>
        </whppt-toolbar>
      </template>
      <div>
        <form v-if="redirectFormVisible" @submit.prevent>
          <div class="whppt-redirects__form">
            <whppt-input
              :id="`${$options._scopeId}-settings-redirects-name`"
              v-model="newRedirect.name"
              label="Name"
            ></whppt-input>
            <div class="whppt-redirects__inputs">
              <whppt-input
                :id="`${$options._scopeId}-settings-redirects-from`"
                v-model="newRedirect.from"
                placeholder="From page"
                label="From"
                info="Example: /my-page. When visiting this page, users will be sent to the To URL instead."
              />
              <whppt-spacer :width="2"></whppt-spacer>
              <whppt-input
                :id="`${$options._scopeId}-settings-redirects-to`"
                v-model="newRedirect.to"
                placeholder="To URL"
                label="To"
                info="Example: /another-page or https://www.whppt.org. Users will be sent to this URL when visiting the From Page."
              />
            </div>

            <div class="whppt-redirects__actions">
              <whppt-button @click="addRedirect">
                Add Redirect
              </whppt-button>
            </div>
          </div>
        </form>
      </div>
    </whppt-card>
    <whppt-card>
      <whppt-input
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
        <template v-slot:item.published="{ item }">
          <component
            :is="item.published ? 'CheckIcon' : 'CrossIcon'"
            class="whppt-redirects__table-published"
            :class="item.published ? 'whppt-redirects__icon--success' : 'whppt-redirects__icon--danger'"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="whppt-redirects__table-actions">
            <button
              v-tooltip="!item.published ? 'Publish' : 'Unpublish'"
              flat
              @click="!item.published ? publish(item) : unpublishRedirect(item)"
            >
              <component :is="!item.published ? 'PublishIcon' : 'UnpublishIcon'" />
            </button>
            <div v-if="!item.published" class="flex ">
              <button v-tooltip="'Delete'" flat @click="deleteRedirect(item)">
                <trash-icon />
              </button>
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
import { VTooltip as Tooltip } from 'v-tooltip';
import WhpptInput from '../../../ui/components/Input';
import WhpptTable from '../../../ui/components/Table';
import WhpptCard from '../../../ui/components/Card';
import WhpptSpacer from '../../../ui/components/Spacer';
import WhpptToolbar from '../../../ui/components/Toolbar';
import WhpptButton from '../../../ui/components/Button';
import PublishIcon from '../../../icons/Publish';
import UnpublishIcon from '../../../icons/Unpublish';
import TrashIcon from '../../../icons/Trash';
import CheckIcon from '../../../icons/Check';
import CrossIcon from '../../../icons/Close';
import ChevronDownIcon from '../../../icons/ChevronDown';

export default {
  name: 'SettingsRedirects',
  components: {
    WhpptInput,
    WhpptTable,
    WhpptCard,
    WhpptButton,
    WhpptSpacer,
    WhpptToolbar,
    PublishIcon,
    UnpublishIcon,
    TrashIcon,
    CheckIcon,
    CrossIcon,
    ChevronDownIcon,
  },
  directives: {
    Tooltip,
  },
  data: () => ({
    redirects: [],
    newRedirect: { name: '', from: '', to: '' },
    errorMessage: '',
    currentPage: 1,
    limit: 5,
    total: 0,
    filter: '',
    redirectFormVisible: false,
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
        name: redirect.name,
        from: redirect.from,
        to: redirect.to,
        lastmod: redirect.updatedAt ? dayjs(redirect.updatedAt).format('DD MMM YYYY') : '–',
        createdAt: redirect.createdAt ? dayjs(redirect.createdAt).format('DD MMM YYYY') : '–',
        published: redirect.published || false,
        publishedAt: redirect.lastPublished ? dayjs(redirect.lastPublished).format('mm:hhA DD MMM YYYY') : '–',
      }));
    },
    headers() {
      return [
        { text: 'Actions', align: 'start', value: 'actions' },
        { text: 'Name', align: 'start', value: 'name' },
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
        .then(() => this.loadRedirects());
    },
    addRedirect() {
      this.formatRedirect();

      const redirect = { ...this.newRedirect, domainId: this.domain._id };

      // TODO: Should only be 1 request, consolidate into api project.
      return this.$axios
        .$post(`${this.$whppt.apiPrefix}/siteSettings/checkDuplicateRedirect`, {
          redirect,
        })
        .then(redirectExists => {
          if (redirectExists) return this.$toast.global.editorError('Redirect already exists.');

          return this.$axios.$post(`${this.$whppt.apiPrefix}/siteSettings/saveRedirect`, { redirect }).then(() => {
            this.loadRedirects();
            this.$toast.global.editorSuccess('Redirect Successfully Added');
            this.newRedirect = { name: '', to: '', from: '' };
          });
        })
        .catch(err => this.$toast.global.editorError(err.response.data.error.message));
    },
    formatRedirect() {
      if (
        this.newRedirect.from &&
        !this.newRedirect.from.startsWith('http') &&
        !this.newRedirect.from.startsWith('/')
      ) {
        this.newRedirect.from = `/${this.newRedirect.from}`;
      }

      if (this.newRedirect.to && !this.newRedirect.to.startsWith('http') && !this.newRedirect.to.startsWith('/')) {
        this.newRedirect.to = `/${this.newRedirect.to}`;
      }
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');

      return slug;
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

          return vm.$axios.post(`${this.$whppt.apiPrefix}/siteSettings/publishRedirect`, { redirect }).then(() => {
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
$danger-600: #e53e3e;
$success-600: #059669;

.whppt-redirects__overflow {
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

.whppt-redirects__table-actions {
  display: flex;
}

.whppt-redirects__table-published {
  margin: 0 auto;
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

.whppt-redirects__icon--success {
  color: $success-600;
}

.whppt-redirects__icon--danger {
  color: $danger-600;
}

.whppt-redirects__toolbar {
  border-radius: 0.25rem 0.25rem 0 0;

  &-expand,
  &-contract {
    width: 1.5rem;
  }

  &-expand {
    will-change: transform;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }

  &-contract {
    will-change: transform;
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
}
</style>
