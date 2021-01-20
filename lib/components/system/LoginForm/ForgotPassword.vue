<template>
  <div class="whppt-login">
    <div class="whppt-forgot-password">
      <div class="whppt-forgot-password__heading-container">
        <h2 class="whppt-forgot-password__heading whppt-forgot-password__heading--dark">Forgot Password?</h2>

        <div class="whppt-forgot-password__heading-actions">
          <whppt-button class="whppt-forgot-password__heading-action" @click="$emit('return')">
            <arrow-left class="whppt-forgot-password__arrow-left" />
          </whppt-button>
          <whppt-button @click="close"><close-icon /></whppt-button>
        </div>
      </div>
      <form v-if="!success" @submit.prevent>
        <p class="whppt-forgot-password__info">
          Enter the email associated with your account and we'll send an email with instructions to reset your password.
        </p>
        <whppt-text-input
          :id="`${$options._scopeId}-reset-email`"
          v-model="email"
          label="Email"
          placeholder="Email"
          @input="error = false"
        />
        <span v-if="$v.email.$error && !$v.email.required" class="whppt-forgot-password__field--error">
          Please provide your email address
        </span>
        <span v-if="$v.email.$error && !$v.email.email" class="whppt-forgot-password__field--error">
          Please provide a valid email address
        </span>
        <span v-if="error" class="whppt-forgot-password__field--error">
          {{ error }}
        </span>
        <div class="whppt-forgot-password__form-actions">
          <whppt-button @click="resetPassword">
            Reset Password
          </whppt-button>
        </div>
      </form>
      <div v-else class="whppt-forgot-password__success">
        <div class="icon-container">
          <div class="icon">
            <mailbox-up class="whppt-forgot-password__icon" />
          </div>
        </div>
        <div>
          <h2>Check your mail</h2>
          <p>We have sent you some instructions to recover your password to your email.</p>
          <whppt-button :disabled="loading" @click="$emit('return')" v-text="loading ? 'X' : 'Back to login'" />
          <p class="whppt-forgot-password__try-again">
            Did not receive the email? Check your spam filter, or
            <a @click="resetForgotPassword">try another email address</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import WhpptTextInput from '../../ui/Input';
import WhpptButton from '../../ui/Button';
import { Close as CloseIcon, ArrowUp as ArrowLeft, MailboxUp } from '../../icons';

export default {
  name: 'ForgotPassword',
  components: {
    WhpptTextInput,
    WhpptButton,
    CloseIcon,
    ArrowLeft,
    MailboxUp,
  },
  mixins: [validationMixin],
  data: () => ({
    active: false,
    busy: false,
    email: '',
    error: false,
    success: false,
    loading: false,
  }),
  methods: {
    resetPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.loading = true;
      this.error = false;

      this.$axios
        .$post(`${this.$whppt.apiPrefix}/user/forgotPassword`, { email: this.email })
        .then(({ message }) => {
          this.success = message;
          this.loading = false;
          this.email = '';
        })
        .catch(err => {
          this.error = err.response.data.error.message;
          this.loading = false;
        });
    },
    close() {
      this.loading = false;
      this.error = false;
      this.email = '';
      this.$emit('close');
    },
    resetForgotPassword() {
      this.$v.$reset();
      this.success = false;
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
$gray-700: #4a5568;
$gray-900: #1a202c;

$primary-600: #5a67d8;
$danger-600: #e53e3e;

.whppt-forgot-password {
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

  &__info {
    margin: 1rem 0;
    color: white;
  }

  &__success {
    color: white;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }

    button {
      margin: 1.5rem auto;
    }
  }

  &__icon {
    color: white;
    width: 3.5rem;
    height: 3.5rem;
  }

  &__try-again {
    text-align: center;
    margin: 1rem 1rem 0;
    color: white;
    font-size: 0.75rem;

    a {
      cursor: pointer;
      color: $primary-600;

      &:hover {
        color: lighten($primary-600, 20%);
        text-decoration: underline;
      }
    }
  }
}

.icon-container {
  margin: 1rem 0;
  display: flex;
  justify-content: center;

  .icon {
    padding: 1.5rem;
    background-color: $gray-700;
    border-radius: 1rem;
  }
}
</style>
