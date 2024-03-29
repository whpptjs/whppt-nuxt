<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="draft">
      <editor-menu></editor-menu>
      <whppt-editor-dialog @closed="closeModal"></whppt-editor-dialog>
      <whppt-dialog v-if="dashboardVisible" full :is-active.sync="dashboardVisible" @closed="closeDashboard">
        <template v-slot:header>
          <whppt-toolbar>
            <div class="whppt-toolbar__content">
              <h2>
                Welcome to your dashboard<span v-if="authUser && authUser.username">, {{ authUser.username }}</span
                >.
              </h2>
              <whppt-button @click="closeDashboard">Close</whppt-button>
            </div>
          </whppt-toolbar>
        </template>
        <dashboard @closed="closeDashboard"></dashboard>
      </whppt-dialog>
    </div>
    <div class="whppt-content">
      <whppt-preview />
      <slot></slot>
    </div>
    <whppt-sidebar />
    <client-only>
      <whppt-dialog
        v-if="!authUser && recoveryVisible"
        :is-active="recoveryVisible"
        class="whppt-recovery"
        @closed="recoveryVisible = false"
      >
        <template v-slot:header>
          <whppt-toolbar>
            <h2>Welcome to Whppt!</h2>
          </whppt-toolbar>
        </template>
        <div>
          <whppt-card>
            <form @submit.prevent>
              <whppt-input
                :id="`${$options._scopeId}-recov-email`"
                v-model="recovery.email"
                label="Email"
                placeholder="Please enter your email."
              />
              <whppt-input
                :id="`${$options._scopeId}-recov-password`"
                v-model="recovery.password"
                type="password"
                label="Password"
                placeholder="Please enter your password."
              />
              <whppt-input
                :id="`${$options._scopeId}-recov-confirm`"
                v-model="recovery.passwordConfirm"
                type="password"
                label="Password Confirmation"
                placeholder="Please enter your password again."
              />
              <whppt-button class="whppt-recovery__button" @click="recoverPassword">Submit</whppt-button>
            </form>
          </whppt-card>
        </div>
      </whppt-dialog>
    </client-only>
  </div>
</template>

<script>
import { startCase, isEmpty } from 'lodash';
import { mapState, mapActions } from 'vuex';
import { diff } from 'deep-object-diff';
import EditorMenu from '../system/EditorMenu';
import WhpptDialog from '../ui/components/Dialog';
import WhpptButton from '../ui/components/Button';
import WhpptToolbar from '../ui/components/Toolbar';
import WhpptCard from '../ui/components/Card';
import WhpptInput from '../ui/components/Input';

export default {
  name: 'WhpptEditorApp',
  components: {
    WhpptEditorDialog: () => import('../system/WhpptEditorDialog'),
    Dashboard: () => import('../system/Dashboard/index'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
    WhpptPreview: () => import('../system/WhpptPreview'),
    EditorMenu,
    WhpptToolbar,
    WhpptButton,
    WhpptDialog,
    WhpptCard,
    WhpptInput,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    startCase,
    token: undefined,
    recoveryVisible: false,
    recovery: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  }),
  computed: {
    ...mapState('whppt/dashboard', ['dashboardVisible']),
    ...mapState('whppt/editor', [
      'editInModal',
      'editInModalType',
      'editSidebar',
      'editSidebarType',
      'draft',
      'componentPreviewType',
    ]),
    ...mapState('whppt/page', ['page', 'savedPage']),
    ...mapState('whppt/security', ['authUser']),
  },
  beforeMount() {
    if (this.draft) window.addEventListener('beforeunload', this.preventNavigate);
  },
  mounted() {
    if (this.$route.query) {
      this.token = this.$route.query.token;
      this.recovery.email = this.$route.query.email;
    }

    if (this.token) this.recoveryVisible = true;
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.preventNavigate);
  },
  methods: {
    ...mapActions('whppt/dashboard', ['closeDashboard']),
    ...mapActions('whppt/editor', ['closeSidebar', 'closeModal']),
    recoverPassword() {
      if (this.authUser) {
        this.$toast.global.editorError('You are already logged in as another user');
        return;
      }

      const { email, password } = this.recovery;

      this.$axios
        .$post(`${this.$whppt.apiPrefix}/user/setPassword`, { email, password, token: this.token })
        .then(() => {
          this.recoveryVisible = false;
          this.$toast.global.editorSuccess('Password successfully reset, you can now login.');
          this.$router.push('/');
        });
    },
    preventNavigate(event) {
      const unsavedChanges = diff(this.savedPage, this.page);
      const hasUnsavedChanges = !isEmpty(unsavedChanges);

      if (hasUnsavedChanges) {
        if (!window.confirm("Changes you've made may not be saved, are you sure you want to leave this page?")) {
          event.returnValue = 'Ok';
          event.preventDefault();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-toolbar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h2 {
    font-weight: bold;
  }
}

.whppt-flex {
  display: flex;
  height: 100%;
}

.whppt-overflow-hidden {
  overflow-x: hidden;
}

.whppt-content {
  position: relative;
  flex: 1;
  width: 100%;
}

.whppt-recovery {
  &__button {
    margin-top: 1rem;
  }
}
</style>

<style lang="scss">
.whppt__component--active {
  outline: 2px solid palegreen;
}

.whppt__content--active {
  outline: 2px solid orange;
}

.whppt__component--hover {
  outline: 2px solid blue;
}

.whppt__content--hover {
  outline: 2px solid red;
}
</style>
