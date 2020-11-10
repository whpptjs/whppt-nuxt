<template>
  <whppt-card>
    <whppt-table :items="roles" :headers="headers" hide-footer dense>
      <template v-slot:item.editor="{ item }">
        <whppt-checkbox v-model="item.level.editor" @change="updatePageRoles" />
      </template>
      <template v-slot:item.publisher="{ item }">
        <whppt-checkbox v-model="item.level.publisher" @change="updatePageRoles" />
      </template>
      <template v-slot:no-data>
        <div>{{ error }}</div>
      </template>
    </whppt-table>
  </whppt-card>
</template>

<script>
import { map } from 'lodash';
import { mapActions } from 'vuex';
import WhpptCard from '../../../ui/Card.vue';
import WhpptTable from '../../../ui/Table.vue';
import WhpptCheckbox from '../../../ui/Checkbox.vue';

export default {
  name: 'RolesPageSetting',
  components: { WhpptCard, WhpptTable, WhpptCheckbox },
  props: {
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    roles: [],
    total: 0,
    error: '',
  }),
  computed: {
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Required For Editing', align: 'start', value: 'editor' },
        { text: 'Required For Publishing', align: 'start', value: 'publisher' },
      ];
    },
  },
  mounted() {
    this.loadRoles();
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['applyRoles']),
    updatePageRoles() {
      this.applyRoles({ page: this.page, roles: this.roles });
    },
    loadRoles() {
      return this.$axios
        .$get(`${this.$whppt.apiPrefix}/roles/list`)
        .then(({ roles, total }) => {
          this.total = total;
          this.roles = map(roles, r => {
            const pageHasEditorRole = (this.page.editorRoles && this.page.editorRoles.includes(r._id)) || false;
            const pageHasPublisherRole =
              (this.page.publisherRoles && this.page.publisherRoles.includes(r._id)) || false;

            return { ...r, level: { editor: pageHasEditorRole, publisher: pageHasPublisherRole } };
          });

          if (this.roles.length < 1) this.error = 'No Results found';
        })
        .catch(err => {
          if (err.response.status === 401) this.error = 'Missing Permissions';
        });
    },
  },
};
</script>

<style scoped></style>
