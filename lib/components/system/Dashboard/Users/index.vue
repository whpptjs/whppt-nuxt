<template>
  <div class="whppt-dashboard__users">
    <div class="whppt-invite-toggle">
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
          @click="getNewVerifiedCode(item)"
        />
      </template>
      <template v-slot:item.roles="{ item }">
        <whppt-button flat @click="manageRoles(item)">Manage Roles</whppt-button>
      </template>
    </whppt-table>
    <whppt-card v-if="newVerifiedLink">
      To complete the sign up process send them the following link. The link expires in 24 hours.
      <br />
      <a :href="newVerifiedLink" target="_blank" class="whppt-invite-link">{{ newVerifiedLink }}</a>

      <!-- TODO: Copy link to clipboard button -->
      <!-- TODO: Email to user button -->
    </whppt-card>
    <manage-roles
      v-if="manageRolesVisible"
      :active="manageRolesVisible"
      :user="managingUser"
      :roles="roles"
      @closed="manageRolesVisible = false"
    ></manage-roles>
    <new-user v-if="newUserVisible" :active="newUserVisible" @closed="newUserVisible = false"> </new-user>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { map } from 'lodash';
import CheckIcon from '../../../icons/Check';
import CloseIcon from '../../../icons/Close';
import WhpptTable from '../../../ui/components/Table';
import WhpptButton from '../../../ui/components/Button';
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
    newVerifiedLink: '',
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
    formatDate(date) {
      return dayjs(date).format('ddd DD MMM YYYY');
    },
    getNewVerifiedCode(user) {
      this.newVerifiedLink = '';
      if (user.verified) return;
      this.$axios.$post(`${this.$whppt.apiPrefix}/user/reverify`, { userId: user._id }).then(response => {
        this.newVerifiedLink = response.link;
      });
    },
    loadUsers() {
      this.$axios.$get(`${this.$whppt.apiPrefix}/user/list`).then(response => {
        this.total = response.total;
        this.users = map(response.users, user => ({ ...user, roles: user.roles || [] }));
      });
    },
    loadRoles() {
      this.$axios.$get(`${this.$whppt.apiPrefix}/roles/list`).then(response => {
        this.roles = response.roles;
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

.whppt-invite-toggle {
  display: flex;
  margin-bottom: 1rem;

  button {
    margin-left: auto;
  }
}
</style>
