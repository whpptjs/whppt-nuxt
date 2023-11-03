<template>
  <whppt-dialog v-if="active" :is-active="active" :full="false" class="whppt-new-user">
    <template v-slot:header>
      <whppt-toolbar>
        <h3>
          Invite User
        </h3>
        <whppt-button @click="$emit('closed')">Close</whppt-button>
      </whppt-toolbar>
    </template>
    <div class="whppt-new-user__content">
      <whppt-card>
        <form @submit.prevent>
          <whppt-input
            :id="`${$options._scopeId}-user-email`"
            v-model="user.email"
            label="Email Address*"
            placeholder="eg. hello@gmail.com"
            required
          />
          <whppt-input
            :id="`${$options._scopeId}-user-username`"
            v-model="user.username"
            label="Username"
            placeholder="Username"
            info="Username is not required and can be added later by the invited user."
          />
          <whppt-button @click="createUser">Submit</whppt-button>
          <p v-if="createUserError" class="whppt-error">{{ createUserError }}</p>
        </form>
      </whppt-card>
      <whppt-card v-if="link">
        We've successfully created a user, to complete the sign up process send them the following link. The link
        expires in 24 hours.
        <br />
        <a :href="link" target="_blank" class="whppt-invite-link">{{ link }}</a>

        <!-- TODO: Copy link to clipboard button -->
        <!-- TODO: Email to user button -->
      </whppt-card>
    </div>
  </whppt-dialog>
</template>

<script>
import { filter, map } from 'lodash';
import WhpptButton from '../../../ui/components/Button';
import WhpptDialog from '../../../ui/components/Dialog';
import WhpptToolbar from '../../../ui/components/Toolbar';
import WhpptCard from '../../../ui/components/Card';
import WhpptInput from '../../../ui/components/Input';

export default {
  name: 'DashboardNewUser',
  components: { WhpptButton, WhpptDialog, WhpptToolbar, WhpptCard, WhpptInput },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    user: {
      username: '',
      email: '',
    },
    createUserError: '',
    link: '',
  }),
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
    createUser() {
      /* TODO: client side validation */
      this.$axios
        .$post(`${this.$whppt.apiPrefix}/user/create`, { newUser: this.user })
        .then(inviteLink => {
          this.user = { username: '', email: '' };
          this.link = inviteLink;

          this.$emit('userCreated', inviteLink);
          // this.$emit('closed');
        })
        .catch(err => {
          console.log('🚀  createUser ~ err:', err, err.message);
          this.createUserError = err.message;
          /* TODO: handle error in client */
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-new-user {
  h3 {
    font-size: 1.2rem;
    margin-right: auto;
  }

  &__content {
    padding: 1rem;
  }
}

.whppt-invite-link {
  margin-top: 1rem;
  font-size: 0.75rem;
  font-style: italic;

  &:hover {
    color: $primary-600;
  }
}
</style>
