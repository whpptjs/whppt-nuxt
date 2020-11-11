<template>
  <div class="whppt-dashboard__users">
    <whppt-table :items="users" :headers="headers" dense :page.sync="page" :per-page.sync="perPage" :total="total">
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
      <template v-slot:item.roles="{ item }">
        <whppt-button flat @click="manageRoles(item)">Manage Roles</whppt-button>
      </template>
    </whppt-table>
    <whppt-dialog :is-active="false">
      hello
    </whppt-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import WhpptTable from '../../ui/Table';
import WhpptButton from '../../ui/Button';
import WhpptDialog from '../../ui/Dialog';

export default {
  name: 'GeneralDashboard',
  components: { WhpptTable, WhpptButton, WhpptDialog },
  data: () => ({
    users: [],
    page: 1,
    perPage: 10,
    total: 0,
  }),
  computed: {
    headers() {
      return [
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Roles', align: 'start', value: 'roles' },
        { text: 'Created At', align: 'start', value: 'createdAt' },
        { text: 'Updated At', align: 'start', value: 'updatedAt' },
      ];
    },
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('ddd DD MMM YYYY');
    },
    loadUsers() {
      this.$axios.$get(`${this.$whppt.apiPrefix}/user/list`).then(response => {
        this.total = response.total;
        // map users to remove/format data
        this.users = response.users;
      });
    },
    manageRoles(user) {},
  },
};
</script>

<style lang="scss" scoped>
.whppt-dashboard__users {
  padding: 2rem;
}
</style>
