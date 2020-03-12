<template>
  <div v-if="listing" class="whppt-atdw">
    <div v-if="showReconnect" class="whppt-atdw__modal">
      <div class="whppt-atdw__content whppt-atdw__modal--inner">
        <div class="whppt-atdw__heading">
          <p class="font-xl">ATDW</p>
          <button class="whppt-settings__button" @click="showReconnect = !showReconnect">Close</button>
        </div>
        <div v-if="listing.listingType === 'product'">
          <div v-for="(field, key) in atdwFields" :key="key" class="whppt-linker">
            <div class="whppt-linker__labels">
              <span class="whppt__bold">{{ key }}</span>
              <div>{{ field(listing.atdw, key) }}</div>
            </div>
            <button class="whppt-settings__button" @click="reconnect(field, key)">Link</button>
          </div>
        </div>
        <div v-if="listing.listingType === 'service'">
          <div v-for="(field, key) in serviceAtdwFields" :key="key" class="whppt-linker">
            <div class="whppt-linker__labels">
              <span class="whppt__bold">{{ key }}</span>
              <div>{{ field(listing.atdw, key) }}</div>
            </div>
            <button class="whppt-settings__button" @click="reconnect(field, key)">Link</button>
          </div>
        </div>
      </div>
    </div>
    <div class="whppt-atdw__content">
      <div class="whppt-atdw__heading">
        <h1>Edit Listing</h1>
        <div class="whppt-flex-between whppt-align-center">
          <!-- <button class="whppt-settings__button" style="margin-right: 1rem;" @click="publish">Publish</button> -->
          <button class="whppt-settings__button" @click="saveListing">Save</button>
        </div>
      </div>
      <div class="whppt-atdw__form">
        <form @submit.prevent>
          <fieldset>
            <label for="name">Name</label>
            <input
              id="name"
              v-model="listing.name.value"
              class="whppt-atdw__form-input"
              :disabled="!!listing.name.path"
              :class="{ 'whppt-atdw__input--disabled': listing.name.path }"
            />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.name.path }}</span>
              <div>
                <button v-if="listing.name.path" class="whppt-settings__button" @click="disconnect(listing.name)">
                  Disconnect
                </button>
                <button v-if="!listing.name.path" class="whppt-settings__button" @click="openReconnectMenu('name')">
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <!-- <label for="slug">Page Slug</label>
          <input id="slug" v-model="listing.slug" class="whppt-atdw__form-input" />
          <div style="font-style: italic; color: grey; padding-bottom: 1rem;">
            NOTE: Changing this slug will modify the url of the page. If any user had this page bookmarked, their link
            will no longer work. Adding a redirect from this page's old url to its new one would resolve this.
          </div> -->

          <fieldset v-if="listing.listingType === 'product'">
            <label for="desc">Description</label>
            <textarea
              id="desc"
              v-model="listing.description.value"
              class="whppt-atdw__form-textarea"
              rows="5"
              :disabled="!!listing.description.path"
              :class="{ 'whppt-atdw__input--disabled': listing.description.path }"
            />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.description.path }}</span>
              <div>
                <button
                  v-if="listing.description.path"
                  class="whppt-settings__button"
                  @click="disconnect(listing.description)"
                >
                  Disconnect
                </button>
                <button
                  v-if="!listing.description.path"
                  class="whppt-settings__button"
                  @click="openReconnectMenu('description')"
                >
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <label for="status">Active Status</label>
            <select
              class="select__input border-1 border-black bg-white"
              :value="listing.activeStatus.value"
              v-model="listing.activeStatus.value"
              :disabled="!!listing.activeStatus.path"
              :class="{ 'whppt-atdw__input--disabled': listing.activeStatus.path }"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>
              <option value="INACTIVE">
                INACTIVE
              </option>
            </select>
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.activeStatus.path }}</span>
              <div>
                <button
                  v-if="listing.activeStatus.path"
                  class="whppt-settings__button"
                  @click="disconnect(listing.activeStatus)"
                >
                  Disconnect
                </button>
                <button
                  v-if="!listing.activeStatus.path"
                  class="whppt-settings__button"
                  @click="openReconnectMenu('activeStatus')"
                >
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <label for="address">Address</label>
            <input
              id="address"
              v-model="listing.physicalAddress.value"
              class="whppt-atdw__form-input"
              :disabled="!!listing.physicalAddress.path"
              :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
            />
            <!-- <label for="street">Street</label>
          <input
            id="street"
            v-model="listing.physicalAddress.value.address_line"
            class="whppt-atdw__form-input"
            :disabled="!!listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          />
          <label for="city">City</label>
          <input
            id="city"
            v-model="listing.physicalAddress.value.city"
            class="whppt-atdw__form-input"
            :disabled="!!listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          />
          <label for="state">State</label>
          <input
            id="state"
            v-model="listing.physicalAddress.value.state"
            class="whppt-atdw__form-input"
            :disabled="!!listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          />
          <label for="postcode">Postcode</label>
          <input
            id="postcode"
            v-model="listing.physicalAddress.value.postcode"
            class="whppt-atdw__form-input"
            :disabled="!!listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          />
          <label for="country">Country</label>
          <input
            id="country"
            v-model="listing.physicalAddress.value.country"
            class="whppt-atdw__form-input"
            :disabled="!!listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          /> -->
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.physicalAddress.path }}</span>
              <div>
                <button
                  v-if="listing.physicalAddress.path"
                  class="whppt-settings__button"
                  @click="disconnect(listing.physicalAddress)"
                >
                  Disconnect
                </button>
                <button
                  v-if="!listing.physicalAddress.path"
                  class="whppt-settings__button"
                  @click="openReconnectMenu('physicalAddress')"
                >
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <label for="phone">Phone</label>
            <input
              id="phone"
              v-model="listing.phone.value"
              class="whppt-atdw__form-input"
              :disabled="!!listing.phone.path"
              :class="{ 'whppt-atdw__input--disabled': listing.phone.path }"
            />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.phone.path }}</span>
              <div>
                <button v-if="listing.phone.path" class="whppt-settings__button" @click="disconnect(listing.phone)">
                  Disconnect
                </button>
                <button v-if="!listing.phone.path" class="whppt-settings__button" @click="openReconnectMenu('phone')">
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="listing.email.value"
              class="whppt-atdw__form-input"
              :disabled="!!listing.email.path"
              :class="{ 'whppt-atdw__input--disabled': listing.email.path }"
            />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.email.path }}</span>
              <div>
                <button v-if="listing.email.path" class="whppt-settings__button" @click="disconnect(listing.email)">
                  Disconnect
                </button>
                <button v-if="!listing.email.path" class="whppt-settings__button" @click="openReconnectMenu('email')">
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <label for="image">Image</label>
            <input
              id="image"
              v-model="listing.image.value"
              class="whppt-atdw__form-input"
              :disabled="!!listing.image.path"
              :class="{ 'whppt-atdw__input--disabled': listing.image.path }"
            />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.image.path }}</span>
              <div>
                <button v-if="listing.image.path" class="whppt-settings__button" @click="disconnect(listing.image)">
                  Disconnect
                </button>
                <button v-if="!listing.image.path" class="whppt-settings__button" @click="openReconnectMenu('image')">
                  Reconnect
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="listing.atdwCategories">
            <whppt-tags-input label="ATDW Categories" :display-only="true" :tags="listing.atdwCategories.value" />
            <div class="whppt-atdw__form-controls">
              <span>Linked To: {{ listing.atdwCategories.path }}</span>
            </div>
          </fieldset>
          <fieldset>
            <whppt-tags-input label="Custom Categories" :tags="listing.customCategories.value" />
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { map, get, find } from 'lodash';
import { parse } from 'uri-js';
import slugify from 'slugify';

import WhpptTagsInput from '../whpptComponents/WhpptTagsInput';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

const stringFromPath = function(product, path) {
  return get(product, path);
};

export default {
  name: 'WhpptATDW',
  components: { WhpptTagsInput, WhpptTextInput },
  data: () => ({
    listing: undefined,
    showReconnect: false,
    propToReconnect: '',
    oldSlug: undefined,
    // TODO: work out a way of sharing atdwFields with api/nuxt
    serviceAtdwFields: {
      serviceName: stringFromPath,
      status: stringFromPath,
      image(product) {
        const img = get(product, 'serviceMultimedia[0].serverPath');
        if (!img) return '';

        const { scheme, host, path } = parse(img);
        return `${scheme}://${host}${path}`;
        // const { scheme, host, path } = parse(serviceImage);
        // return `${scheme}://${host}${path}`;
      },
      // atdwCategories(product) {
      //   const tags = map(product.verticalClassifications, category => category.productTypeId);
      //   tags.push(product.productCategoryId);
      //   return tags;
      // },
    },
    atdwFields: {
      productName: stringFromPath,
      productDescription: stringFromPath,
      status: stringFromPath,
      email(product) {
        const email = find(product.communication, comm => comm.attributeIdCommunication === 'CAEMENQUIR');
        if (!email) return '';
        return email.communicationDetail;
      },
      phone(product) {
        const phone = find(product.communication, comm => comm.attributeIdCommunication === 'CAPHENQUIR');
        if (!phone) return '';
        return phone.communicationDetail;
      },
      physicalAddress(product) {
        const address = find(product.addresses, address => address.attributeIdAddress === 'PHYSICAL');
        if (!address) return '';
        return `${address.addressLine1}, ${address.cityName}, ${address.stateName}, ${address.countryName}`;
        // if(!address) return ''
        // return `${address.address_line}, ${address.city}, ${address.state}, ${address.postcode}, ${address.country}`
      },
      // postalAddress(product) {
      //   return find(product.addresses, address => address.address_type === 'POSTAL');
      // },
      image(product) {
        if (!product.productImage) return '';

        const { scheme, host, path } = parse(product.productImage);
        return `${scheme}://${host}${path}`;
      },
      // atdwCategories(product) {
      //   const tags = map(product.verticalClassifications, category => category.productTypeId);
      //   tags.push(product.productCategoryId);
      //   return tags;
      // },
    },
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
    ...mapState('whppt-nuxt/page', ['page']),

    taggedCategories() {
      return [...this.listing.atdwCategories.value, this.listing.customCategories.value];
    },
    // formattedSlug() {
    //   return this.formatSlug(this.listing.slug);
    // },
  },
  mounted() {
    if (!this.selectedComponent || !this.selectedComponent.value) return;

    this.$axios.get(`${this.baseAPIUrl}/api/listing/findById?id=${this.selectedComponent.value}`).then(({ data }) => {
      this.listing = data.listing;
      this.oldSlug = data.listing && data.listing.slug;
    });
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['publishListing']),

    reconnect(field, key) {
      // this.listing.atdw should probably be dynamic, what if bookeasy?
      this.listing[this.propToReconnect].path = key;
      this.listing[this.propToReconnect].value = field(this.listing.atdw, key);
      this.listing[this.propToReconnect].provider = 'atdw';
      this.showReconnect = false;
    },
    disconnect(property) {
      property.provider = '';
      property.path = '';
    },
    openReconnectMenu(property) {
      this.showReconnect = !this.showReconnect;
      this.propToReconnect = property;
    },
    // publish() {
    //   const vm = this;
    //   const newSlug = this.formattedSlug;
    //   if (!newSlug) {
    //     this.$toast.global.editorError('Cannot use an empty slug');
    //     return;
    //   }
    //   return vm.$whppt.checkSlug({ slug: newSlug, _id: vm.listing._id }).then(result => {
    //     if (result) {
    //       this.$toast.global.editorError('Slug already in use');
    //     } else {
    //       vm.listing.slug = newSlug;
    //       // return this.$axios.post(`${this.baseAPIUrl}/api/listing/save`, { listing: this.listing }).then(() => {
    //       return this.$axios
    //         .post(`${vm.baseAPIUrl}/api/page/updateFromListing`, {
    //           _id: vm.listing._id,
    //           slug: vm.listing.slug,
    //           title: vm.listing.name.value,
    //         })
    //         .then(() => {
    //           return vm.$whppt.publishListing(this.listing).then(() => {
    //             if (vm.page.template === 'listing') {
    //               vm.$router.push(`/${vm.listing.slug}`);
    //               vm.$emit('closeModal');
    //             }
    //           });
    //         });
    //       // });
    //     }
    //   });
    // },
    saveListing() {
      // const vm = this;
      // const newSlug = this.formattedSlug;
      // if (!newSlug) {
      //   this.$toast.global.editorError('Cannot use an empty slug');
      //   return;
      // }
      // return vm.$whppt.checkSlug({ slug: newSlug, _id: vm.listing._id }).then(result => {
      //   if (result) {
      //     this.$toast.global.editorError('Slug already in use');
      //   } else {
      //     vm.listing.slug = newSlug;
      return this.$axios.post(`${this.baseAPIUrl}/api/listing/save`, { listing: this.listing }).then(() => {
        // return this.$axios
        //   .post(`${vm.baseAPIUrl}/api/page/updateFromListing`, {
        //     _id: vm.listing._id,
        //     slug: vm.listing.slug,
        //     title: vm.listing.name.value,
        //   })
        //   .then(() => {
        this.$toast.global.editorSuccess('Listing Saved');
        // if (vm.page.template === 'listing') {
        //   vm.$router.push(`/${vm.listing.slug}`);
        //   vm.$emit('closeModal');
        // }
      });
      //     });
      //   }
      // });
    },
    setStatus(value) {
      this.listing.activeStatus.value = value;
    },
    // formatSlug(slug) {
    //   if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
    //   slug = slug.replace(/\/{2,}/g, '/');

    //   slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
    //   return slug;
    // },
  },
};
</script>

<style>
.whppt-atdw {
  color: black;
  display: flex;
  z-index: 52;
  width: 100%;
  height: 80vh;
  margin: 1.5rem;
  position: relative;
}

.whppt-linker {
  display: flex;
  align-items: center;
  margin: 0.4rem 1rem;
}

.select__input {
  width: 100%;
  font-size: 16px;
  margin: 5px 0;
  height: 35px;
}

.whppt-linker__labels span {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.whppt-atdw__form-controls {
  display: flex;
  align-items: center;
}

.whppt-atdw__form-controls span {
  margin-right: auto;
}

.whppt-atdw__modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 53;
}

.whppt-atdw__content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  width: 100%;
}

.whppt-atdw__modal--inner {
  margin: 1rem auto;
  width: 80%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.whppt-atdw__heading {
  position: sticky;
  background-color: white;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 4rem;
}

.whppt-atdw__heading h1 {
  font-size: 1.6rem;
  font-weight: bold;
}

.whppt-atdw__input--disabled {
  cursor: not-allowed;
  background-color: #f1f1f1;
}

.whppt-atdw__form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.whppt-atdw__form > fieldset {
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  border: none;
}

.whppt-atdw__form label {
  font-size: 0.9rem;
}

.whppt-atdw__form-input,
.whppt-atdw__form-textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.2rem 0 0.5rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  resize: vertical;
}

.whppt-atdw__form-button {
  margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}
</style>
