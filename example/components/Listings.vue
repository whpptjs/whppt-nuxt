<template>
  <div
    v-listings="content"
    data-property="categoryFilter"
    :style="{ 'margin-top': `${content.marginTop || $whppt.defaultMarginTop}px` }"
  >
    <div class="py-16 lg:p-16 mx-6">
      <div v-if="!detailsOpen" class="flex my-4">
        <span class="ml-auto text-sm" v-text="items.length ? `${totalItems} Results` : 'No Listings found.'" />
      </div>
      <div v-if="items.length" class="flex flex-wrap -mx-2">
        <div>
          <div v-if="items.length" class="flex flex-wrap -mx-2">
            <div v-for="(item, index) in items" :key="`item-${index}`" v-listing="item._id" class="w-1/2 py-2 px-2">
              <whppt-link :to="{ href: getUrl(item) }">
                <div class="flex flex-col lg:flex-row bg-white h-full">
                  <div class="bg-red-700 w-full lg:w-1/2"></div>
                  <div class="w-full lg:w-1/2 p-2 lg:p-12">
                    <div class="flex flex-col justify-between h-full">
                      <h2 class="font-bold text-sm lg:text-base lg:mb-4">{{ item.name.value }}</h2>
                      <!-- <div v-if="item.atdw.verticalClassifications" class="my-4">
                        <h5 class="font-bold">ATDW Tags:</h5>
                        <div>
                          <span v-for="(tag, tagIndex) in item.atdw.verticalClassifications" :key="`tag-${tagIndex}`">
                            {{ `${tag.productTypeDescription} (${tag.productTypeId})` }}
                            <span v-if="tagIndex + 1 < item.atdw.verticalClassifications.length">, </span>
                          </span>
                        </div>
                      </div> -->
                      <button
                        v-if="item.bookEasy"
                        class="mt-4 mr-2 bg-red-500 w-12 h-12 flex justify-center items-center"
                      >
                        <span class="text-white">BE</span>
                      </button>
                    </div>
                  </div>
                </div>
              </whppt-link>
            </div>
          </div>
        </div>
      </div>
      <div v-if="canLoadMore" class="flex justify-center my-6">
        <button class="btn border-black" @click.stop="loadNextItems">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListingsComponent',
  components: {
    // Datepicker,
  },
  props: { content: { type: Object, default: () => ({}) } },
  data: () => ({
    detailsOpen: false,
    mobileFilters: false,
    from: '',
    to: '',
    items: [],
    totalItems: 0,
    currentPage: 1,
    limit: 6,
    page: false,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    canLoadMore() {
      return this.items && this.items.length && this.currentPage * this.limit < this.totalItems;
    },
  },
  watch: {
    to() {
      this.filterItems();
    },
    from() {
      this.filterItems();
    },
    // 'content.categories'() {
    //   const apiUrl = this.baseAPIUrl;

    //   return this.$axios
    //     .post(`${apiUrl}/api/listing/fetch`, { categories: this.content.categories })
    //     .then(({ data }) => {
    //       this.items = data.listings;
    //       this.totalItems = data.totalListings;
    //     });
    // },
  },
  mounted() {
    return this.$axios
      .post(`${this.baseAPIUrl}/api/listing/fetch`, {
        categoryFilterId: this.content.categoryFilter && this.content.categoryFilter._id,
        hideTours: true,
      })
      .then(({ data }) => {
        this.items = data.listings;
        this.totalItems = data.totalListings;
        // this.listingCategories = map(data.listingCategories, c => {
        //   return upperFirst(c);
        // });
      });
  },
  methods: {
    filterItems() {
      const filters = { from: this.from || undefined, to: this.to || undefined };
      const apiUrl = this.baseAPIUrl;

      this.$axios
        .post(`${apiUrl}/api/listing/fetch`, { filters, limit: this.limit, currentPage: this.currentPage })
        .then(({ data }) => {
          const { listings, totalListings } = data;
          this.totalItems = totalListings;
          if (listings) this.currentPage = 1;
          this.items = listings;
        });
    },
    getUrl(item) {
      return `/${item.slug}`;
    },
    loadNextItems() {
      const filters = { from: this.from || undefined, to: this.to || undefined };
      this.currentPage = this.currentPage + 1;

      const apiUrl = this.baseAPIUrl;

      this.$axios
        .post(`${apiUrl}/api/listing/fetch`, { filters, limit: this.limit, currentPage: this.currentPage })
        .then(({ data }) => {
          const { listings, totalListings } = data;
          this.totalItems = totalListings;
          listings.forEach(listing => {
            this.items.push(listing);
          });
        });
    },
    toggleMobileFilters() {
      const body = document.getElementsByTagName('body')[0];
      this.mobileFilters = !this.mobileFilters;
      this.mobileFilters ? body.classList.add('overflow-hidden') : body.classList.remove('overflow-hidden');
    },
  },
};
</script>
