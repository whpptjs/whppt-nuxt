<template>
  <div class="whppt-dashboard__users">
    <div>
      <whppt-button @click="newUserVisible = true">Invite User</whppt-button>
    </div>
    <whppt-table :items="users" :headers="headers" dense :page.sync="page" :per-page.sync="perPage" :total="total">
      <template v-slot:item.username="{ item }">
        {{ item.username || '–' }}
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
      <template v-slot:item.verified="{ item }">
        <component
          :is="item.verified ? 'check-icon' : 'close-icon'"
          :style="`color: ${item.verified ? 'green' : 'red'}`"
        />
      </template>
      <template v-slot:item.roles="{ item }">
        <whppt-button flat @click="manageRoles(item)">Manage Roles</whppt-button>
      </template>
    </whppt-table>
    <manage-roles
      v-if="manageRolesVisible"
      :active="manageRolesVisible"
      :user="managingUser"
      :roles="roles"
      @closed="manageRolesVisible = false"
    ></manage-roles>
    <new-user
      v-if="newUserVisible"
      :active="newUserVisible"
      @userCreated="newUserCreated"
      @closed="newUserVisible = false"
    >
    </new-user>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { map } from 'lodash';
import CheckIcon from '../../../icons/Check';
import CloseIcon from '../../../icons/Close';
import WhpptTable from '../../../ui/Table';
import WhpptButton from '../../../ui/Button';
import ManageRoles from './ManageRoles';
import NewUser from './NewUser';

export default {
  name: 'GeneralDashboard',
  components: { WhpptTable, WhpptButton, ManageRoles, NewUser, CheckIcon, CloseIcon },
  data: () => ({
    users: [],
    page: 1,
    perPage: 10,
    total: 0,
    roles: [],
    manageRolesVisible: false,
    newUserVisible: false,
    managingUser: {},
  }),
  computed: {
    headers() {
      return [
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Verified', align: 'start', value: 'verified' },
        { text: 'Roles', align: 'start', value: 'roles' },
        { text: 'Created At', align: 'start', value: 'createdAt' },
        { text: 'Updated At', align: 'start', value: 'updatedAt' },
      ];
    },
  },
  mounted() {
    this.loadUsers();
    this.loadRoles();
  },
  methods: {
    newUserCreated(link) {
      console.log(link);
    },
    formatDate(date) {
      return dayjs(date).format('ddd DD MMM YYYY');
    },
    loadUsers() {
      this.$axios
        .$get(`${this.$whppt.apiPrefix}/user/list`)
        .then(response => {
          this.total = response.total;
          this.users = map(response.users, user => ({ ...user, roles: user.roles || [] }));
        })
        .catch(err => {
          console.log('loadUserError', err);
        });
    },
    loadRoles() {
      this.$axios
        .$get(`${this.$whppt.apiPrefix}/roles/list`)
        .then(response => {
          this.roles = response.roles;
        })
        .catch(err => {
          console.log('loadRolesError', err);
        });
    },
    manageRoles(user) {
      this.managingUser = user;
      this.manageRolesVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-dashboard__users {
  padding: 2rem;
}
</style>
