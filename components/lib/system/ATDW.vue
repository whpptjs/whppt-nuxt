<template>
  <div v-if="listing" class="whppt-atdw">
    <div v-if="showReconnect" class="whppt-atdw__modal">
      <div class="whppt-atdw__content whppt-atdw__modal--inner">
        <div class="whppt-atdw__heading">
          <h1>ATDW</h1>
          <button @click="showReconnect = !showReconnect">Close</button>
        </div>
        <div v-for="(field, key) in atdwFields" :key="key" class="whppt-linker">
          <div class="whppt-linker__labels">
            <span class="whppt__bold">{{ key }}</span>
            <div>{{ field(listing.atdw, key) }}</div>
          </div>
          <button @click="reconnect(field, key)">Link</button>
        </div>
      </div>
    </div>
    <div class="whppt-atdw__content">
      <div class="whppt-atdw__heading">
        <h1>Edit Listing</h1>
        <button class="whppt-button" @click="saveListing">Save</button>
      </div>
      <form @submit.prevent>
        <fieldset>
          <label for="name">Name</label>
          <input id="name" v-model="listing.name.value" />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.name.path }}</span>
            <div>
              <button v-if="listing.name.path" @click="disconnect(listing.name)">disconnect</button>
              <button v-if="!listing.name.path" @click="openReconnectMenu('name')">reconnect</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label for="desc">Description</label>
          <textarea id="desc" v-model="listing.description.value" rows="5" />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.description.path }}</span>
            <div>
              <button v-if="listing.description.path" @click="disconnect(listing.description)">disconnect</button>
              <button v-if="!listing.description.path" @click="openReconnectMenu('description')">reconnect</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label for="address">Address</label>
          <input id="address" v-model="listing.physicalAddress.value" />
          <div class="whppt-atdw__form-controls">
            <span>Linked To: {{ listing.physicalAddress.path }}</span>
            <div>
              <button v-if="listing.physicalAddress.path" @click="disconnect(listing.physicalAddress)">
                disconnect
              </button>
              <button v-if="!listing.physicalAddress.path" @click="openReconnectMenu('physicalAddress')">
                reconnect
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { get, find } from 'lodash';
const URI = require('uri-js');

const stringFromPath = function(product, path) {
  return get(product, path);
};

export default {
  name: 'WhpptATDW',
  data: () => ({
    listing: undefined,
    showReconnect: false,
    propToReconnect: '',
    atdwFields: {
      productName: stringFromPath,
      productDescription: stringFromPath,
      // Category: stringFromPath,
      email(product) {
        return find(product.communication, comm => comm.attributeIdCommunication === 'CAEMENQUIR');
      },
      physicalAddress(product) {
        const address = find(product.addresses, address => address.address_type === 'PHYSICAL');
        return address && `${address.address_line} ${address.city}`;
      },
      postalAddress(product) {
        const address = find(product.addresses, address => address.address_type === 'POSTAL');
        return address && `${address.address_line} ${address.city}`;
      },
      image(product) {
        const { scheme, host, path } = URI.parse(product.productImage);
        return `${scheme}://${host}${path}`;
      },
    },
  }),
  mounted() {
    if (!this.$whppt.editData) return;

    const baseAPIUrl = this.$whppt.baseAPIUrl || '';
    this.$axios.get(`${baseAPIUrl}/api/listing/findById?id=${this.$whppt.editData}`).then(({ data }) => {
      this.listing = data;
    });
  },
  methods: {
    reconnect(field, key) {
      this.listing[this.propToReconnect].path = key;
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
      const baseAPIUrl = this.$whppt.baseAPIUrl || '';
      return this.$axios.post(`${baseAPIUrl}/api/listing/save`, { listing: this.listing });
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
  margin: 0.4rem 1rem;
}

.whppt-linker__labels span {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.whppt-atdw__form-controls {
  display: flex;
  /*justify-content: center;*/
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
  /*width: 33.33%;*/
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

.whppt-atdw__content form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.whppt-atdw__content form > fieldset {
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  border: none;
}

.whppt-atdw__content form label {
  font-size: 0.9rem;
}

.whppt-atdw__content form input,
.whppt-atdw__content form textarea {
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

.whppt-atdw button {
  margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}
</style>
