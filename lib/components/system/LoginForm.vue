<template>
  <div v-if="active" class="whppt-login">
    <div class="whppt-login__heading-actions">
      <whppt-button v-if="forgotPasswordVisible" class="whppt-login__heading-action" @click="close">
        <arrow-left class="whppt-login__arrow-left" />
      </whppt-button>
      <whppt-button @click="close"><close-icon /></whppt-button>
    </div>
    <!-- TODO: Vuelidate the forms -->
    <transition mode="out-in" name="fade">
      <div v-if="!forgotPasswordVisible" class="whppt-form-container">
        <h2 class="whppt-login__heading whppt-login__heading--dark">Welcome</h2>
        <form @submit.prevent>
          <whppt-text-input :id="`${$options._scopeId}-login-username`" v-model="data.username" label="Username" />
          <whppt-text-input
            :id="`${$options._scopeId}-login-password`"
            v-model="data.password"
            type="password"
            label="Password"
          />
          <p v-if="error" class="error">{{ error }}</p>
          <div class="whppt-login__actions">
            <whppt-button :disabled="busy" @click="doLogin">
              <span v-if="!busy">Submit</span>
              <close-icon v-if="busy" />
            </whppt-button>
            <whppt-button flat @click="showForgotPassword">
              <span class="whppt-login__actions--sm">Forgot Password?</span>
            </whppt-button>
          </div>
        </form>
      </div>
      <div v-else class="whppt-form-container">
        <h2 class="whppt-login__heading whppt-login__heading--dark">Forgot Password?</h2>
        <form @submit.prevent>
          <!-- Add Form inputs and button here -->
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WhpptTextInput from '../ui/Input';
import WhpptButton from '../ui/Button';
import { Close as CloseIcon, ArrowUp as ArrowLeft } from '../icons';

export default {
  name: 'EditorMenu',
  components: {
    WhpptTextInput,
    WhpptButton,
    CloseIcon,
    ArrowLeft,
  },
  data: () => ({
    forgotPasswordVisible: false,
    active: false,
    error: '',
    busy: false,
    data: {
      username: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions('whppt-nuxt/security', ['login']),
    doLogin() {
      this.busy = true;
      this.login(this.data)
        .then(() => {
          this.busy = false;
          this.close();
        })
        .catch(err => {
          this.busy = false;
          this.error =
            err.response && err.response.data
              ? err.response.data.message || err.response.data.error.message
              : err.message;
        });
    },
    showForgotPassword() {
      this.forgotPasswordVisible = true;
    },
    show() {
      this.data.password = '';
      this.active = true;
    },
    close() {
      this.active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #1a202c;

$danger-600: #e53e3e;

.whppt-login {
  position: fixed;
  z-index: 53;
  width: 40vw;
  height: 100vh;
  background-color: $gray-900;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 2rem;

  &__arrow-left {
    transform: rotate(270deg);
  }

  &__actions {
    display: flex;

    button {
      margin-right: 1rem;
    }

    &--sm {
      font-size: 0.75rem;
    }
  }

  &__action {
    margin-right: 0.5rem;
  }

  .whppt-form-container {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    .whppt-login__heading {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;

      &--dark {
        color: white;
      }
    }

    form {
      width: 100%;

      button {
        margin-top: 1rem;
      }
    }
  }

  .error {
    color: $danger-600;
    font-size: 0.75rem;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  &__heading-actions {
    position: absolute;
    right: 2rem;
    top: 2rem;
    display: flex;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
