<template>
  <whppt-dialog :is-active="active" :full="false" class="whppt-manage-rolls">
    <template v-slot:header>
      <whppt-toolbar>
        <h3>
          Manage Roles for <span>{{ user.username }}</span>
        </h3>
        <whppt-button @click="$emit('closed')">Close</whppt-button>
      </whppt-toolbar>
    </template>
    <div class="whppt-manage-rolls__content">
      <whppt-card>
        <whppt-table :items="availableRoles" :headers="headers" dense hide-footer>
          <template v-slot:item.applied="{ item }">
            <whppt-checkbox v-model="item.applied" @change="applyRole(item)"></whppt-checkbox>
          </template>
        </whppt-table>
      </whppt-card>
    </div>
  </whppt-dialog>
</template>

<script>
import { filter, map } from 'lodash';
import WhpptTable from '../../../ui/Table';
import WhpptButton from '../../../ui/Button';
import WhpptDialog from '../../../ui/Dialog';
import WhpptToolbar from '../../../ui/Toolbar';
import WhpptCard from '../../../ui/Card';
import WhpptCheckbox from '../../../ui/Checkbox';

export default {
  name: 'DashboardManageRoles',
  components: { WhpptTable, WhpptButton, WhpptDialog, WhpptToolbar, WhpptCard, WhpptCheckbox },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Applied', align: 'start', value: 'applied' },
      ];
    },
    availableRoles() {
      return map(this.roles, role => ({
        _id: role._id,
        name: role.name,
        applied: (this.user && this.user.roles && this.user.roles.includes(role._id)) || false,
      }));
    },
  },
  methods: {
    applyRole(role) {
      const roles = role.applied ? [...this.user.roles, role._id] : filter(this.user.roles, r => r !== role._id);

      this.$axios
        .$post(`${this.$whppt.apiPrefix}/roles/applyToUser`, { selectedUser: this.user, roles })
        .then(response => {
          this.user.roles = response.roles;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-manage-rolls {
  h3 {
    font-size: 1.2rem;
    margin-right: auto;

    span {
      font-weight: bold;
      color: $primary-600;
    }
  }

  &__content {
    padding: 1rem;
  }
}
</style>
