<template>
  <div v-if="listing" class="whppt-atdw">
    <div v-if="showReconnect" class="whppt-atdw__modal">
      <div class="whppt-atdw__content whppt-atdw__modal--inner">
        <div class="whppt-atdw__heading">
          <h1>ATDW</h1>
          <button class="whppt-atdw__form-button" @click="showReconnect = !showReconnect">Close</button>
        </div>
        <div v-for="(field, key) in atdwFields" :key="key" class="whppt-linker">
          <div class="whppt-linker__labels">
            <span class="whppt__bold">{{ key }}</span>
            <div>{{ field(listing.atdw, key) }}</div>
          </div>
          <button class="whppt-atdw__form-button" @click="reconnect(field, key)">Link</button>
        </div>
      </div>
    </div>
    <div class="whppt-atdw__content">
      <div class="whppt-atdw__heading">
        <h1>Edit Listing</h1>
        <button class="whppt-atdw__form-button" @click="saveListing">Save</button>
      </div>
      <div class="whppt-atdw__form">
        <fieldset>
          <label for="name">Name</label>
          <input
            id="name"
            v-model="listing.name.value"
            class="whppt-atdw__form-input"
            :disabled="listing.name.path"
            :class="{ 'whppt-atdw__input--disabled': listing.name.path }"
          />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.name.path }}</span>
            <div>
              <button v-if="listing.name.path" class="whppt-atdw__form-button" @click="disconnect(listing.name)">
                disconnect
              </button>
              <button v-if="!listing.name.path" class="whppt-atdw__form-button" @click="openReconnectMenu('name')">
                reconnect
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label for="desc">Description</label>
          <textarea
            id="desc"
            v-model="listing.description.value"
            class="whppt-atdw__form-textarea"
            rows="5"
            :disabled="listing.description.path"
            :class="{ 'whppt-atdw__input--disabled': listing.description.path }"
          />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.description.path }}</span>
            <div>
              <button
                v-if="listing.description.path"
                class="whppt-atdw__form-button"
                @click="disconnect(listing.description)"
              >
                disconnect
              </button>
              <button
                v-if="!listing.description.path"
                class="whppt-atdw__form-button"
                @click="openReconnectMenu('description')"
              >
                reconnect
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label for="status">Active Status</label>
          <input
            id="status"
            v-model="listing.activeStatus.value"
            class="whppt-atdw__form-input"
            :disabled="listing.activeStatus.path"
            :class="{ 'whppt-atdw__input--disabled': listing.activeStatus.path }"
          />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.activeStatus.path }}</span>
            <div>
              <button
                v-if="listing.activeStatus.path"
                class="whppt-atdw__form-button"
                @click="disconnect(listing.activeStatus)"
              >
                disconnect
              </button>
              <button
                v-if="!listing.activeStatus.path"
                class="whppt-atdw__form-button"
                @click="openReconnectMenu('status')"
              >
                reconnect
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label for="address">Address</label>
          <input
            id="address"
            v-model="listing.physicalAddress.value"
            class="whppt-atdw__form-input"
            :disabled="listing.physicalAddress.path"
            :class="{ 'whppt-atdw__input--disabled': listing.physicalAddress.path }"
          />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.physicalAddress.path }}</span>
            <div>
              <button
                v-if="listing.physicalAddress.path"
                class="whppt-atdw__form-button"
                @click="disconnect(listing.physicalAddress)"
              >
                disconnect
              </button>
              <button
                v-if="!listing.physicalAddress.path"
                class="whppt-atdw__form-button"
                @click="openReconnectMenu('physicalAddress')"
              >
                reconnect
              </button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <whppt-tags-input label="ATDW Categories" :display-only="true" :tags="listing.atdwCategories.value" />
        </fieldset>
        <fieldset>
          <whppt-tags-input label="Custom Categories" :tags="listing.customCategories.value" />
        </fieldset>
        <fieldset>
          <whppt-tags-input label="Tagged Categories" :display-only="true" :tags="listing.taggedCategories.value" />
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map, get, find } from 'lodash';
import { parse } from 'uri-js';
import WhpptTagsInput from '../whpptComponents/WhpptTagsInput';

const stringFromPath = function(product, path) {
  return get(product, path);
};

export default {
  name: 'WhpptATDW',
  components: { WhpptTagsInput },
  data: () => ({
    listing: undefined,
    showReconnect: false,
    propToReconnect: '',
    // TODO: work out a way of sharing atdwFields with api/nuxt
    atdwFields: {
      name: stringFromPath,
      description: stringFromPath,
      activeStatus: stringFromPath,
      email(product) {
        return find(product.communication, comm => comm.attributeIdCommunication === 'CAEMENQUIR');
      },
      physicalAddress(product) {
        return find(product.addresses, address => address.address_type === 'PHYSICAL');
      },
      postalAddress(product) {
        return find(product.addresses, address => address.address_type === 'POSTAL');
      },
      image(product) {
        if (!product.productImage) return;

        const { scheme, host, path } = parse(product.productImage);
        return `${scheme}://${host}${path}`;
      },
      atdwCategories(product) {
        const tags = map(product.verticalClassifications, category => category.productTypeId);
        tags.push(product.productCategoryId);
        return tags;
      },
      customCategories(product) {},
    },
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
    taggedCategories() {
      return [...this.listing.atdwCategories.value, this.listing.customCategories.value];
    },
  },
  mounted() {
    if (!this.selectedComponent || !this.selectedComponent.value) return;

    this.$axios.get(`${this.baseAPIUrl}/api/listing/findById?id=${this.selectedComponent.value}`).then(({ data }) => {
      this.listing = data.listing;
    });
  },
  methods: {
    reconnect(field, key) {
      this.listing[this.propToReconnect].path = key;
      // this.listing.atdw should probably be dynamic, what if bookeasy?
      this.listing[this.propToReconnect].value = field(this.listing.atdw, key);
      this.showReconnect = false;
    },
    disconnect(property) {
      property.provider = undefined;
      property.path = undefined;
    },
    openReconnectMenu(property) {
      this.showReconnect = !this.showReconnect;
      this.propToReconnect = property;
    },
    saveListing() {
      return this.$axios.post(`${this.baseAPIUrl}/api/listing/save`, { listing: this.listing });
    },
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
  outline: none;
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
