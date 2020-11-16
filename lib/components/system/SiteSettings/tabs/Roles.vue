<template>
  <div>
    <!--New Role form-->
    <whppt-card>
      <form class="whppt-roles__form" @submit.prevent>
        <whppt-input
          :id="`${$options._scopeId}-role-name`"
          v-model="role.name"
          label="Name"
          placeholder="eg. Editor"
          :error="error"
        />
        <whppt-button @click="saveRole">Save</whppt-button>
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-table
        dense
        :items="roles"
        :headers="headers"
        :page.sync="page"
        :per-page.sync="perPage"
        :total="total"
        @update:page="loadRoles"
        @update:perPage="loadRoles"
      >
        <template v-slot:item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>
        <template v-slot:item.actions>
          <whppt-button flat @click="deleteRoleVisible">D</whppt-button>
        </template>
      </whppt-table>
    </whppt-card>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import WhpptCard from '../../../ui/Card';
import WhpptTable from '../../../ui/Table';
import WhpptInput from '../../../ui/Input';
import WhpptButton from '../../../ui/Button';

export default {
  name: 'SettingsRoles',
  components: {
    WhpptCard,
    WhpptTable,
    WhpptInput,
    WhpptButton,
  },
  data: () => ({
    roles: [],
    page: 1,
    perPage: 5,
    total: 0,
    role: {
      name: '',
    },
    error: '',
    deleteRoleVisible: false,
  }),
  computed: {
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Created At', align: 'start', value: 'createdAt' },
        { text: 'Updated At', align: 'start', value: 'updatedAt' },
        { text: 'Actions', align: 'start', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.loadRoles();
  },
  methods: {
    loadRoles() {
      this.$axios
        .$get(`${this.$whppt.apiPrefix}/roles/list`, { params: { page: this.page, perPage: this.perPage } })
        .then(response => {
          this.roles = response.roles;
          this.total = response.total;
        });
    },
    saveRole() {
      this.$axios
        .$post(`${this.$whppt.apiPrefix}/roles/save`, { role: this.role })
        .then(() => {
          this.error = '';
          this.role.name = '';
          this.page = 1;

          this.loadRoles();
        })
        .catch(err => {
          this.error = err.response.data.error.message || err.message;
        });
    },
    formatDate(date) {
      return dayjs(date).format('h:mma ddd D MMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-roles__form {
  button {
    margin-top: 0.5rem;
    margin-left: auto;
  }
}
</style>
