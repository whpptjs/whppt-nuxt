<template>
  <div v-if="active" class="whppt-login">
    <whppt-button class="close" @click="close"><w-close /></whppt-button>
    <div class="whppt-form-container">
      <h2 class="whppt-login__heading whppt-login__heading--dark">Welcome</h2>
      <form @submit.prevent="doLogin">
        <whppt-text-input
          :id="`${$options._scopeId}-login-username`"
          v-model="data.username"
          label="Username"
          required
        />
        <whppt-text-input
          :id="`${$options._scopeId}-login-password`"
          v-model="data.password"
          type="password"
          label="Password"
          required
        />
        <p v-if="error" class="error">{{ error }}</p>
        <whppt-button :disabled="busy" @click="doLogin">
          <span v-if="!busy">Submit</span>
          <w-close v-if="busy" />
        </whppt-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WhpptTextInput from '../ui/Input';
import WhpptButton from '../ui/Button';

export default {
  name: 'EditorMenu',
  components: {
    WhpptTextInput,
    WhpptButton,
  },
  data: () => ({
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

  button.close {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
}
</style>
