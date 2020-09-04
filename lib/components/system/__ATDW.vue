<template>
  <div v-if="listing" class="whppt-atdw whppt-settings__content">
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
          <button class="whppt-settings__button" @click="saveListing">Save</button>
        </div>
      </div>
      <div class="whppt-atdw__form">
        <form @submit.prevent>
          <fieldset>
            <whppt-text-input
              v-model="listing.name.value"
              placeholder="E.g. Barossa Wine Tour"
              label="Name"
              label-colour="black"
              :disabled="!!listing.name.path"
              :info="`Linked To: ${listing.name.path}`"
            />
            <div>
              <button
                v-if="listing.name.path"
                style="display: flex"
                class="whppt-settings__button"
                type="button"
                @click="disconnect(listing.name)"
              >
                Disconnect
              </button>
              <button
                v-if="!listing.name.path"
                style="display: flex"
                class="whppt-settings__button"
                type="button"
                @click="openReconnectMenu('name')"
              >
                Reconnect
              </button>
            </div>
          </fieldset>
          <fieldset>
            <whppt-text-area
              v-model="listing.description.value"
              placeholder="E.g. A Barossa Wine Tour"
              label="Description"
              label-colour="black"
              rows="5"
              :disabled="!!listing.description.path"
              :info="`Linked To: ${listing.description.path}`"
            />
            <div>
              <button
                v-if="listing.description.path"
                style="display: flex"
                class="whppt-settings__button"
                type="button"
                @click="disconnect(listing.description)"
              >
                Disconnect
              </button>
              <button
                v-if="!listing.description.path"
                class="whppt-settings__button"
                style="display: flex"
                type="button"
                @click="openReconnectMenu('description')"
              >
                Reconnect
              </button>
            </div>
          </fieldset>
          <fieldset>
            <div class="whppt-select__status-label">Active Status</div>
            <select
              v-model="listing.activeStatus.value"
              :disabled="!!listing.activeStatus.path || listing.published"
              class="whppt-select__status-input"
              :class="{
                'whppt-select__disabled': !!listing.activeStatus.path || listing.published,
                'bg-white': !listing.activeStatus.path && !listing.published,
              }"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>
              <option value="INACTIVE">
                INACTIVE
              </option>
            </select>
            <div class="whppt-select__status-info">
              Linked To: {{ listing.activeStatus.path }}. Whether or not the listing and its corresponding page should
              be published automatically when its ATDW information is updated. This cannot be edited unless the
              listing's page has been unpublished.
            </div>
            <div>
              <button
                v-if="listing.activeStatus.path"
                class="whppt-settings__button"
                style="display: flex"
                type="button"
                @click="disconnect(listing.activeStatus)"
              >
                Disconnect
              </button>
              <button
                v-if="!listing.activeStatus.path"
                class="whppt-settings__button"
                style="display: flex"
                type="button"
                @click="openReconnectMenu('activeStatus')"
              >
                Reconnect
              </button>
            </div>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <whppt-text-input
              v-model="listing.physicalAddress.value"
              placeholder="E.g. 1234 Barossa Street"
              label="Address"
              label-colour="black"
              :disabled="!!listing.physicalAddress.path"
              :info="`Linked To: ${listing.physicalAddress.path}`"
            />
            <button
              v-if="listing.physicalAddress.path"
              class="whppt-settings__button"
              style="display: flex"
              type="button"
              @click="disconnect(listing.physicalAddress)"
            >
              Disconnect
            </button>
            <button
              v-if="!listing.physicalAddress.path"
              class="whppt-settings__button"
              style="display: flex"
              type="button"
              @click="openReconnectMenu('physicalAddress')"
            >
              Reconnect
            </button>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <whppt-text-input
              v-model="listing.phone.value"
              placeholder="E.g. 08 1234 5678"
              label="Phone"
              label-colour="black"
              :disabled="!!listing.phone.path"
              :info="`Linked To: ${listing.phone.path}`"
            />
            <button
              v-if="listing.phone.path"
              style="display: flex"
              type="button"
              class="whppt-settings__button"
              @click="disconnect(listing.phone)"
            >
              Disconnect
            </button>
            <button
              v-if="!listing.phone.path"
              class="whppt-settings__button"
              style="display: flex"
              type="button"
              @click="openReconnectMenu('phone')"
            >
              Reconnect
            </button>
          </fieldset>
          <fieldset v-if="listing.listingType === 'product'">
            <whppt-text-input
              v-model="listing.email.value"
              placeholder="E.g. wine@barossa.com"
              label="Email"
              label-colour="black"
              :disabled="!!listing.email.path"
              :info="`Linked To: ${listing.email.path}`"
            />
            <button
              v-if="listing.email.path"
              style="display: flex"
              type="button"
              class="whppt-settings__button"
              @click="disconnect(listing.email)"
            >
              Disconnect
            </button>
            <button
              v-if="!listing.email.path"
              class="whppt-settings__button"
              style="display: flex"
              type="button"
              @click="openReconnectMenu('email')"
            >
              Reconnect
            </button>
          </fieldset>
          <fieldset>
            <whppt-text-input
              v-model="listing.image.value"
              label="Image"
              label-colour="black"
              :disabled="!!listing.image.path"
              :info="`Linked To: ${listing.image.path}`"
            />
            <button
              v-if="listing.image.path"
              style="display: flex"
              type="button"
              class="whppt-settings__button"
              @click="disconnect(listing.image)"
            >
              Disconnect
            </button>
            <button
              v-if="!listing.image.path"
              class="whppt-settings__button"
              style="display: flex"
              type="button"
              @click="openReconnectMenu('image')"
            >
              Reconnect
            </button>
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
import { get, find } from 'lodash';
import { parse } from 'uri-js';

import WhpptTagsInput from '../editors/WhpptTagsInput';
import WhpptTextInput from '../editors/WhpptTextInput';
import WhpptTextArea from '../editors/__WhpptTextArea';

const stringFromPath = function(product, path) {
  return get(product, path);
};

export default {
  name: 'WhpptATDW',
  components: { WhpptTagsInput, WhpptTextInput, WhpptTextArea },
  data: () => ({
    listing: undefined,
    showReconnect: false,
    propToReconnect: '',
    oldSlug: undefined,
    // TODO: work out a way of sharing atdwFields with api/nuxt
    serviceAtdwFields: {
      serviceName: stringFromPath,
      serviceDescription: stringFromPath,
      status: stringFromPath,
      image(product) {
        const img = get(product, 'serviceMultimedia[0].serverPath');
        if (!img) return '';

        const { scheme, host, path } = parse(img);
        return `${scheme}://${host}${path}`;
      },
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
      },
      image(product) {
        if (!product.productImage) return '';

        const { scheme, host, path } = parse(product.productImage);
        return `${scheme}://${host}${path}`;
      },
    },
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'baseAPIUrl']),
    ...mapState('whppt-nuxt/page', ['page']),

    taggedCategories() {
      return [...this.listing.atdwCategories.value, this.listing.customCategories.value];
    },
  },
  mounted() {
    if (!this.selectedComponent || !this.selectedComponent.value) return;

    this.$axios.get(`/api/listing/findById?id=${this.selectedComponent.value}`).then(({ data }) => {
      this.listing = data.listing;
      this.oldSlug = data.listing && data.listing.slug;
    });
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['publishListing']),

    reconnect(field, key) {
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
    saveListing() {
      return this.$axios.post(`/api/listing/save`, { listing: this.listing }).then(() => {
        this.$toast.global.editorSuccess('Listing Saved');
        this.selectedComponent.refresh();
      });
    },
    setStatus(value) {
      this.listing.activeStatus.value = value;
    },
  },
};
</script>

<style>
.whppt-select__disabled {
  cursor: not-allowed;
  background-color: #f1f1f1;
}

.whppt-select__status-input {
  margin: 0.2rem 0 0.5rem;
  appearance: none;
  display: block;
  width: 100%;
  color: black;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
}

.whppt-select__status-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-select__status-info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}

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
