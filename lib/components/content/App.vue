<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="draft">
      <editor-menu></editor-menu>
      <whppt-dialog v-if="editInModal" :is-active.sync="editInModal" @closed="closeModal">
        <template v-slot:header>
          <whppt-toolbar>
            <div class="whppt-toolbar__content">
              <h2>{{ startCase(editInModalType) }}</h2>
              <whppt-button @click="closeModal">Close</whppt-button>
            </div>
          </whppt-toolbar>
        </template>
        <component :is="editInModalType" :prefix="prefix" @closed="closeModal" />
      </whppt-dialog>
      <whppt-dialog v-if="dashboardVisible" full :is-active.sync="dashboardVisible" @closed="closeDashboard">
        <template v-slot:header>
          <whppt-toolbar>
            <div class="whppt-toolbar__content">
              <h2>Welcome to your dashboard.</h2>
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
    <whppt-dialog v-if="recoveryVisible" :is-active="recoveryVisible" @closed="recoveryVisible = false">
      <template v-slot:header>
        <whppt-toolbar>
          <h2>Welcome to Whppt!</h2>
        </whppt-toolbar>
      </template>
      <div>
        <whppt-card>
          <form @submit.prevent="recoverPassword">
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
            <whppt-button>Submit</whppt-button>
          </form>
        </whppt-card>
      </div>
    </whppt-dialog>
  </div>
</template>

<script>
import { startCase, isEmpty } from 'lodash';
import { mapState, mapActions } from 'vuex';
import { updatedDiff } from 'deep-object-diff';
import EditorMenu from '../system/EditorMenu';
import PublishSettings from '../system/PublishSettings';
import WhpptDialog from '../ui/components/Dialog';
import WhpptButton from '../ui/components/Button';
import WhpptToolbar from '../ui/components/Toolbar';
import WhpptCard from '../ui/components/Card';
import WhpptInput from '../ui/components/Input';
import Close from '../icons/Close';

export default {
  name: 'WhpptEditorApp',
  components: {
    ConfigSettings: () => import('../system/Config/index'),
    SiteSettings: () => import('../system/SiteSettings/index'),
    PageSettings: () => import('../system/PageSettings/index'),
    Dashboard: () => import('../system/Dashboard/index'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
    WhpptPreview: () => import('../system/WhpptPreview'),
    EditorMenu,
    WhpptToolbar,
    WhpptButton,
    WhpptDialog,
    WhpptCard,
    WhpptInput,
    PublishSettings,
    Close,
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
      if (this.authUser) return;

      const { email, password } = this.recovery;

      this.$axios
        .$post(`${this.$whppt.apiPrefix}/user/setPassword`, { email, password, token: this.token })
        .then(() => {
          this.$emit('closed');
          this.$router.push('/');
        });
    },
    preventNavigate(event) {
      const unsavedChanges = updatedDiff(this.savedPage, this.page);
      const hasUnsavedChanges = !isEmpty(unsavedChanges);

      if (hasUnsavedChanges) {
        if (!window.confirm("Changes you've made may not be saved, are you sure you want to do this?")) {
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
