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
        <whppt-checkbox v-model="role.admin" label="Is Admin Role" class="whppt-checkbox"></whppt-checkbox>
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
        <template v-slot:item.admin="{ item }">
          <whppt-checkbox v-model="item.admin" @change="saveRole(item)"></whppt-checkbox>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <whppt-button flat @click="showDeleteRoleWarning(item)">
            <svg
              data-v-08a1318b=""
              viewBox="0 0 20 20"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              data-v-0ae9d0f6=""
            >
              <path
                d="M2 2h16v2H2V2zm6-2h4l2 2H6l2-2zM3 6h14l-1 14H4L3 6zm5 2h1v10H8V8zm3 0h1v10h-1V8z"
                fill="none"
                fill-rule="evenodd"
                style="fill: currentcolor;"
              ></path>
            </svg>
          </whppt-button>
        </template>
      </whppt-table>
    </whppt-card>
    <whppt-dialog
      v-if="deleteRoleVisible"
      :is-active="deleteRoleVisible"
      :width="800"
      :height="300"
      @closed="deleteRoleVisible = false"
    >
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Are you sure?</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h4>Are you sure you want to delete this role?</h4>
          <p><em>Warning: Once you delete this role there is no way to recover it.</em></p>
        </div>
        <div class="whppt-dialog__warning-actions">
          <whppt-button danger @click="deleteRole">Delete</whppt-button>
          <whppt-button flat @click="deleteRoleVisible = false">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import WhpptCard from '../../../ui/components/Card';
import WhpptTable from '../../../ui/components/Table';
import WhpptInput from '../../../ui/components/Input';
import WhpptButton from '../../../ui/components/Button';
import WhpptToolbar from '../../../ui/components/Toolbar';
import WhpptDialog from '../../../ui/components/Dialog';
import WhpptCheckbox from '../../../ui/components/Checkbox';

export default {
  name: 'SettingsRoles',
  components: {
    WhpptToolbar,
    WhpptCard,
    WhpptTable,
    WhpptInput,
    WhpptButton,
    WhpptDialog,
    WhpptCheckbox,
  },
  data: () => ({
    roles: [],
    page: 1,
    perPage: 5,
    total: 0,
    role: {
      name: '',
      admin: false,
    },
    error: '',
    deleteRoleVisible: false,
    roleToDelete: undefined,
  }),
  computed: {
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Is Admin Role', align: 'start', value: 'admin' },
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
    saveRole(role) {
      this.$axios
        .$post(`${this.$whppt.apiPrefix}/roles/save`, { role: role || this.role })
        .then(() => {
          this.error = '';
          this.role.name = '';
          this.role.admin = false;

          if (!role) {
            this.page = 1;
            this.loadRoles();
          }
        })
        .catch(err => {
          this.error = err.response.data.error.message || err.message;
        });
    },
    formatDate(date) {
      return dayjs(date).format('h:mma ddd D MMM YYYY');
    },
    showDeleteRoleWarning(role) {
      this.roleToDelete = role;
      this.deleteRoleVisible = true;
    },
    deleteRole() {
      this.$axios
        .$post(`${this.$whppt.apiPrefix}/roles/delete`, { role: this.roleToDelete })
        .then(() => {
          this.roleToDelete = undefined;
          this.deleteRoleVisible = false;
        })
        .catch(() => {
          this.roleToDelete = undefined;
          this.deleteRoleVisible = false;
        });
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

  .whppt-checkbox {
    margin-top: 0.5rem;
  }
}

.whppt-dialog__warning {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  height: 100%;

  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.75rem;
  }
}

.whppt-dialog__warning-message {
  margin-bottom: 1rem;
}

.whppt-dialog__warning-actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  button {
    margin-left: 0.5rem;
  }
}
</style>
