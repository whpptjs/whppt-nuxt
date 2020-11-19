<template>
  <div>
    <whppt-card v-if="editingDomain">
      <form @submit.prevent>
        <div class="whppt-config__domains-form">
          <whppt-input
            :id="`${$options._scopeId}-config-domain-name-new`"
            v-model="editingDomain.name"
            label="Name"
            placeholder="Enter name"
          ></whppt-input>
          <whppt-spacer :width="2"></whppt-spacer>

          <whppt-input
            :id="`${$options._scopeId}-config-domain-hostnames-new`"
            v-model="editingDomain.hostString"
            label="Host Names"
            placeholder="Enter host names"
          ></whppt-input>
        </div>
        <whppt-button @click="editingDomain = undefined">Back</whppt-button>
        <whppt-button @click="saveDomainForm">Save Domain</whppt-button>
      </form>
    </whppt-card>
    <whppt-button v-if="!editingDomain" @click="editingDomain = {}">Add New Domain</whppt-button>
    <whppt-card v-if="!editingDomain">
      <whppt-table
        dense
        :items="editingDomains"
        :headers="headers"
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.hostString="{ item }">
          {{ item.hostString }}
        </template>
        <template v-slot:item.actions="{ item }">
          {{ domain && domain._id === item._id ? 'ACTIVE' : 'INACTIVE' }}
          <div class="whppt-config__domains-actions">
            <button @click="editDomain(item)">
              <edit />
            </button>
            <button v-if="environment === 'development'" @click="swapDomain(item)">
              <check />
            </button>
            <!-- <button @click="remove(item)">
              <remove />
            </button> -->
          </div>
        </template>
      </whppt-table>
    </whppt-card>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapState, mapActions } from 'vuex';

import WhpptInput from '../../../ui/Input';
import WhpptTable from '../../../ui/Table';
import WhpptSpacer from '../../../ui/Spacer';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import Check from '../../../icons/Check';
import Edit from '../../../icons/Edit';
import Remove from '../../../icons/Trash';

export default {
  name: 'ConfigSettingsDomains',
  components: {
    WhpptInput,
    WhpptTable,
    WhpptSpacer,
    WhpptCard,
    WhpptButton,
    Check,
    Remove,
    Edit,
  },
  data: () => ({
    editingDomain: undefined,
    limit: 5,
    loading: false,
    currentPage: 1,
    total: 0,
    editingDomains: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'environment']),
    ...mapState('whppt/config', ['domains', 'domain']),
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Host Names', align: 'start', value: 'hostString' },
        { text: 'Actions', align: 'start', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.editingDomains = cloneDeep(this.domains);
  },
  methods: {
    ...mapActions('whppt/config', ['saveDomain', 'changeDomain']),
    saveDomainForm() {
      this.editingDomain.hostnames = this.editingDomain.hostString.split(',');
      return this.saveDomain({
        domain: this.editingDomain,
      }).then(savedDomain => {
        this.editingDomains = cloneDeep(this.domains);
        this.editingDomain = undefined;
      });
    },
    swapDomain(selectedDomain) {
      if (selectedDomain._id === this.domain._id) return;
      return this.changeDomain({ domain: selectedDomain }).then(() => {
        this.editingDomains = cloneDeep(this.domains);
      });
    },
    editDomain(selectedDomain) {
      this.editingDomain = selectedDomain;
      this.editingDomain.hostString = selectedDomain.hostnames.join(',');
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-config__domains-form {
  display: flex;
  justify-content: space-between;
  input {
    width: 45%;
  }
}

.whppt-config__domains-actions {
  display: flex;

  button {
    cursor: pointer;
    background: none;
    border: none;
    margin: 0 0.5rem 0 0;
    padding: 0;
    color: inherit;

    &:hover {
      color: $primary-600;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}

.whppt-config__domains-form-actions {
  display: flex;
  margin-top: 0.5rem;

  button {
    margin-left: 0.5rem;

    &:first-of-type {
      margin-left: auto;
    }
  }
}
</style>
