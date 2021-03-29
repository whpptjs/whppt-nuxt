<template>
  <div class="whppt-login">
    <div class="whppt-form-container">
      <div class="whppt-login__heading-container">
        <h2 class="whppt-login__heading whppt-login__heading--dark">Welcome</h2>
        <div class="whppt-login__heading-actions">
          <whppt-button @click="$emit('close')"><close-icon /></whppt-button>
        </div>
      </div>
      <form @submit.prevent>
        <whppt-text-input :id="`${$options._scopeId}-login-username`" v-model="username" label="Username or Email" />
        <whppt-text-input
          :id="`${$options._scopeId}-login-password`"
          v-model="password"
          type="password"
          label="Password"
        />
        <p v-if="error" class="whppt-login__field--error">{{ error }}</p>
        <div class="whppt-login__form-actions">
          <whppt-button :disabled="busy" @click="doLogin">
            <span v-if="!busy">Submit</span>
            <close-icon v-if="busy" />
          </whppt-button>
          <whppt-button flat @click="$emit('showForgotPassword')">
            <span class="whppt-login__form-actions--sm">Forgot Password?</span>
          </whppt-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import WhpptTextInput from '../../ui/components/Input';
import WhpptButton from '../../ui/components/Button';
import { Close as CloseIcon } from '../../icons';

export default {
  name: 'Login',
  components: {
    WhpptTextInput,
    WhpptButton,
    CloseIcon,
  },
  mixins: [validationMixin],
  data: () => ({
    error: '',
    busy: false,
    username: '',
    password: '',
  }),
  methods: {
    ...mapActions('whppt/security', ['login']),
    doLogin() {
      this.busy = true;
      this.login({ username: this.username, password: this.password })
        .then(() => {
          this.busy = false;
          this.$emit('close');
        })
        .catch(err => {
          this.busy = false;
          this.error =
            err.response && err.response.data
              ? err.response.data.message || err.response.data.error.message
              : err.message;
        });
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(3),
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
  width: 450px;
  height: 100vh;
  background-color: $gray-900;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 2rem;

  &__arrow-left {
    transform: rotate(270deg);
  }

  &__form-actions {
    display: flex;

    button {
      margin-right: 1rem;
    }

    &--sm {
      font-size: 0.75rem;
    }
  }

  &__heading-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__heading-action {
    margin-right: 0.25rem;
  }

  &__heading-actions {
    display: flex;
  }

  .whppt-login__heading {
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;

    &--dark {
      color: white;
    }
  }

  .whppt-form-container {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
      width: 100%;

      button {
        margin-top: 1rem;
      }
    }
  }

  &__field--error {
    color: $danger-600;
    font-size: 0.75rem;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  &__heading-actions {
    display: flex;
  }
}
</style>
