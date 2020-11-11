<template>
  <div>
    <whppt-card>
      <form @submit.prevent>
        <div class="whppt-config__domains-form">
          <whppt-input
            :id="`${$options._scopeId}-config-domain-name-new`"
            v-model="newDomain.name"
            label="Name"
            placeholder="Enter name"
          ></whppt-input>
          <whppt-input
            :id="`${$options._scopeId}-config-domain-hostnames-new`"
            v-model="newDomain.hostnames"
            label="Domain Names"
            placeholder="Enter host names"
          ></whppt-input>
        </div>
        <whppt-button @click="addNew">Add New Domain</whppt-button>
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-table
        dense
        :items="domains"
        :headers="headers"
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.hostnames="{ item }">
          {{ item.hostnames.join(', ') }}
        </template>
        <template v-slot:item.actions="{ item }">
          {{ domain._id === item._id ? 'ACTIVE' : 'INACTIVE' }}
          <div class="whppt-config__domains-actions">
            <button @click="swapDomain(item)">
              <check />
            </button>
            <!-- <button @click="itemToBeRemoved = item">
              <remove />
            </button> -->
          </div>
        </template>
      </whppt-table>
    </whppt-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import WhpptInput from '../../../ui/Input';
import WhpptTable from '../../../ui/Table';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import Check from '../../../icons/Check';
import Remove from '../../../icons/Trash';

export default {
  name: 'ConfigSettingsDomains',
  components: {
    WhpptInput,
    WhpptTable,
    WhpptCard,
    WhpptButton,
    Check,
    Remove,
  },
  data: () => ({
    limit: 5,
    loading: false,
    currentPage: 1,
    total: 0,
    newDomain: {},
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    ...mapState('whppt/config', ['domains', 'domain']),
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Host Names', align: 'start', value: 'hostnames' },
        { text: 'Actions', align: 'start', value: 'actions' },
      ];
    },
  },
  methods: {
    ...mapActions('whppt/config', ['addNewDomain']),
    ...mapMutations('whppt/config', ['DOMAIN_CHANGED']),
    addNew() {
      return this.addNewDomain({
        domain: { ...this.newDomain, hostnames: this.newDomain.hostnames.split(',') },
      }).then(() => {
        this.newDomain = {};
      });
    },
    swapDomain(selectedDomain) {
      if (selectedDomain._id === this.domain._id) return;
      this.DOMAIN_CHANGED({ domain: selectedDomain });
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
