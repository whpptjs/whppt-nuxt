<template>
  <div class="whppt-login">
    <div class="whppt-forgot-password">
      <div class="whppt-forgot-password__heading-container">
        <h2 class="whppt-forgot-password__heading whppt-forgot-password__heading--dark">Forgot Password?</h2>
        <div class="whppt-forgot-password__heading-actions">
          <whppt-button
            v-if="forgotPasswordVisible"
            class="whppt-forgot-password__heading-action"
            @click="forgotPasswordVisible = false"
          >
            <arrow-left class="whppt-forgot-password__arrow-left" />
          </whppt-button>
          <whppt-button @click="close"><close-icon /></whppt-button>
        </div>
      </div>
      <form @submit.prevent>
        <whppt-text-input :id="`${$options._scopeId}-reset-email`" v-model="email" label="Email" placeholder="Email" />
        <span v-if="$v.email.$error && !$v.email.required" class="whppt-forgot-password__field--error">
          Please provide your email address
        </span>
        <span v-if="$v.email.$error && !$v.email.email" class="whppt-forgot-password__field--error">
          Please provide a valid email address
        </span>
        <div class="whppt-forgot-password__form-actions">
          <whppt-button @click="resetPassword">
            Reset Password
          </whppt-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import WhpptTextInput from '../../ui/Input';
import WhpptButton from '../../ui/Button';
import { Close as CloseIcon, ArrowUp as ArrowLeft } from '../../icons';

export default {
  name: 'ForgotPassword',
  components: {
    WhpptTextInput,
    WhpptButton,
    CloseIcon,
    ArrowLeft,
  },
  mixins: [validationMixin],
  data: () => ({
    active: false,
    busy: false,
    email: '',
  }),
  methods: {
    resetPassword() {
      this.$v.$touch();
      // if (this.$v.$invalid) return;

      // submit to api to reset password and send email
      // reset password form
      // emit event to go back to login form
      // done
    },
    close() {
      this.$emit('close');
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #1a202c;

$danger-600: #e53e3e;

.whppt-forgot-password {
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

  &__form-actions {
    margin-top: 1rem;
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

  &__heading {
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
