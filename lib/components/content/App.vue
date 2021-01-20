<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="isDraft">
      <editor-menu></editor-menu>
      <whppt-dialog :is-active.sync="editInModal" @closed="closeModal">
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
      <whppt-dialog full :is-active.sync="dashboardVisible" @closed="closeDashboard">
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
      <slot></slot>
    </div>
    <whppt-sidebar />
    <whppt-dialog :is-active="recoveryVisible" @closed="recoveryVisible = false">
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
import { startCase } from 'lodash';
import { mapState, mapActions } from 'vuex';
import EditorMenu from '../system/EditorMenu';
import PublishSettings from '../system/PublishSettings';
import WhpptDialog from '../ui/Dialog';
import WhpptButton from '../ui/Button';
import WhpptToolbar from '../ui/Toolbar';
import WhpptCard from '../ui/Card';
import WhpptInput from '../ui/Input';
import Close from '../icons/Close';

export default {
  name: 'WhpptEditorApp',
  components: {
    ConfigSettings: () => import('../system/Config/index'),
    SiteSettings: () => import('../system/SiteSettings/index'),
    PageSettings: () => import('../system/PageSettings/index'),
    Dashboard: () => import('../system/Dashboard/index'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
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
    ...mapState('whppt-nuxt/editor', ['editInModal', 'editInModalType', 'editSidebar', 'editSidebarType', 'draft']),
    isDraft() {
      return this.draft;
    },
  },
  mounted() {
    if (this.$route.query) {
      this.token = this.$route.query.token;
      this.recovery.email = this.$route.query.email;
    }

    if (this.token) this.recoveryVisible = true;
  },
  methods: {
    ...mapActions('whppt/dashboard', ['closeDashboard']),
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
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
