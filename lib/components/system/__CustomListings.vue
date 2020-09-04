<template>
  <div>
    <fieldset>
      <div v-if="!selectedListing">
        <div class="whppt-flex-between whppt-align-center">
          <label style="font-size: 1.25rem">New Listing</label>
          <button class="whppt-settings__button" style="display: flex" @click="addListing">
            Add New Listing
          </button>
        </div>
        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column">
            <whppt-text-input
              v-model="placeholder.name.value"
              placeholder="E.g. Barossa Winery #98762"
              label="Name"
              label-colour="black"
              info="The listing's name is displayed on its corresponding page's header."
            />
          </div>
          <div class="whppt-settings__right-column">
            <whppt-text-input
              v-model="slug"
              placeholder="E.g. barossawinetour"
              label="Page Slug"
              label-colour="black"
              info="Creating this listing will generate it a page. It's url will be generated using this slug, and a prefix of 'listing/'"
            />
          </div>
        </div>
        <label style="font-size: 1.25rem">Custom Listings</label>
        <div v-for="(listing, index) in listings" :key="index">
          <div
            class="whppt-flex-between whppt-align-center whppt-divider"
            style="cursor: pointer"
            @click="selectListing(listing)"
          >
            <div>
              {{ listing.name && listing.name.value }}
            </div>
            <div class="whppt-redirects__icon">
              <w-edit></w-edit>
            </div>
          </div>
        </div>
        <div v-if="!listings || !listings.length">There are no custom listings</div>
      </div>

      <div v-if="selectedListing">
        <button class="whppt-settings__button" @click="unselectListing">
          Back
        </button>

        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column">
            <whppt-text-input
              v-model="selectedListing.name.value"
              placeholder="E.g. Barossa Winery #98762"
              label="Name"
              label-colour="black"
              info="The listing's name is displayed on its corresponding page's header."
            />
          </div>
          <div class="whppt-settings__right-column">
            <whppt-text-input
              v-model="selectedListing.activeStatus.value"
              placeholder="E.g. ACTIVE"
              label="Status"
              label-colour="black"
              info="The listing's status."
            />
          </div>
        </div>

        <whppt-text-area
          v-model="selectedListing.description.value"
          placeholder="E.g. Details about the listing"
          label="Description"
          rows="2"
          label-colour="black"
          info="The listing's description is featured prominently on its page."
        />

        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column">
            <whppt-text-input
              v-model="selectedListing.email.value"
              placeholder="E.g. 0812345678"
              label="Phone"
              label-colour="black"
              info="Shown under contact details on the listing page."
            />
          </div>
          <div class="whppt-settings__right-column">
            <whppt-text-input
              v-model="selectedListing.phone.value"
              placeholder="E.g. vineyard@barossa.com.au"
              label="Email"
              label-colour="black"
              info="Shown under contact details on the listing page."
            />
          </div>
        </div>

        <div class="whppt-flex-between">
          <div class="whppt-settings__left-column">
            <whppt-text-input
              v-model="selectedListing.physicalAddress.value"
              placeholder="E.g. 48 Wine Street, Barossa, SA"
              label="Physical Address"
              label-colour="black"
              info="Shown under details on the listing page."
            />
          </div>
          <div class="whppt-settings__right-column">
            <whppt-text-input
              v-model="selectedListing.postalAddress.value"
              placeholder="E.g. 48 Wine Street, Barossa, SA"
              label="Postal Address"
              label-colour="black"
              info="Shown under details on the listing page."
            />
          </div>
        </div>

        <whppt-text-input
          v-model="catsString"
          placeholder="E.g. EVENT, WINERY, TOUR"
          label="Categories"
          label-colour="black"
          info="The listing's categories, used to find it via the categories filters. Seperate them via commas."
        />
        <button class="whppt-settings__button" style="display: flex;" @click="save">
          Save
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { get, map, remove, toUpper } from 'lodash';
import slugify from 'slugify';

import WhpptTextInput from '../editors/WhpptTextInput';
import WhpptTextArea from '../editors/__WhpptTextArea';

export default {
  name: 'SettingsRedirects',
  components: { WhpptTextInput, WhpptTextArea },
  props: {
    redirects: { type: Array, default: () => [] },
    pages: { type: Number, default: 0 },
    currentPage: { type: Number, default: 0 },
  },
  data() {
    return {
      listings: [],
      selectedListing: undefined,
      placeholder: { name: { value: '' } },
      catsString: '',
      slug: '',
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.queryCustomListings();
  },
  methods: {
    queryCustomListings() {
      return this.$axios.get(`/api/listing/fetchCustomListings`).then(({ data }) => (this.listings = data));
    },
    selectListing(listing) {
      this.selectedListing = listing;
      if (!this.selectedListing) return '';
      const cats = get(this, 'selectedListing.customCategories.value') || [];
      this.catsString = cats.join(', ');
    },
    unselectListing() {
      this.selectedListing = undefined;
      this.catsString = '';
    },
    isPublished(redirect) {
      return redirect.published;
    },
    addListing() {
      const vm = this;

      const newListing = {
        name: this.placeholder.name,
        description: { value: '' },
        email: { value: '' },
        image: { value: '' },
        phone: { value: '' },
        activeStatus: { value: 'ACTIVE' },
        physicalAddress: { value: '' },
        postalAddress: { value: '' },
        customCategories: { value: [] },
        taggedCategories: { value: [] },
        listingType: 'product',
        isCustom: true,
      };

      if (this.slug.startsWith('/')) this.slug = this.slug.replace(/^(\/*)/, '');
      this.slug = this.slug.replace(/\/{2,}/g, '/');

      if (!this.slug || !newListing.name.value) {
        this.$toast.global.editorError('Fields are empty');
        return;
      }
      this.slug = `listing/${slugify(this.slug, { remove: /[*+~.()'"!:@]/g, lower: true })}`;

      const newPage = {
        slug: this.slug,
        contents: [],
        template: 'listing',
        header: {
          title: newListing.name.value,
          breadcrumb: {
            items: [
              { type: 'page', href: '/', text: 'Home' },
              { type: 'page', href: `/${this.slug}`, text: newListing.name.value },
            ],
            property: 'items',
          },
        },
        createdAt: new Date(),
        og: { title: '', keywords: '', image: { imageId: '', crop: {} } },
        twitter: { title: '', keywords: '', image: { imageId: '', crop: {} } },
      };

      return vm.$whppt.checkSlug({ slug: newPage.slug }).then(result => {
        if (result) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          return this.$axios.post(`/api/listing/save`, { listing: newListing }).then(({ data }) => {
            return vm.$whppt.savePage({ ...newPage, listingId: data._id, _id: data._id }).then(() => {
              this.listings.push(data);
              this.placeholder = { name: { value: '' } };
              this.slug = '';
            });
          });
        }
      });
    },
    save() {
      this.selectedListing.customCategories.value = map(this.catsString.split(','), cat => {
        return toUpper(cat.trim());
      });
      return this.$axios.post(`/api/listing/save`, { listing: this.selectedListing }).then(() => {
        this.$toast.global.editorSuccess('Listing Saved');
      });
    },
    deleteListing() {
      return this.$axios.post(`/api/listing/deleteListing`, { _id: this.selectedListing._id }).then(() => {
        this.listings = remove(this.listings, l => l._id !== this.selectedListing._id);
        this.selectedListing = undefined;
        this.$toast.global.editorSuccess('Listing Deleted');
      });
    },
    publish() {
      return this.$axios.post(`/api/listing/publish`, { listing: this.selectedListing }).then(() => {
        this.selectedListing.published = true;
        this.$toast.global.editorSuccess('Listing Published');
      });
    },
    unpublishRedirect(redirect) {
      if (!redirect.published) return this.$toast.global.editorError("Redirect isn't published");
      const vm = this;
      return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/unpublishRedirect`, { _id: redirect._id }).then(() => {
        redirect.published = false;
        vm.$toast.global.editorSuccess('Redirect Unpublished');
      });
    },
    swapPage(newPage) {
      this.$emit('swapPage', newPage);
    },
  },
};
</script>

<style>
.whppt-divider {
  padding: 10px 0;
  border-bottom: 1px solid grey;
}
</style>
