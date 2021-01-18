<template>
  <div v-if="active">
    <forgot-password v-if="forgotPasswordVisible" @close="active = false" />
    <login v-else @showForgotPassword="forgotPasswordVisible = true" @close="active = false"></login>
  </div>
</template>

<script>
import ForgotPassword from './ForgotPassword';
import Login from './Login';

export default {
  name: 'LoginForm',
  components: {
    ForgotPassword,
    Login,
  },
  data: () => ({
    active: false,
    forgotPasswordVisible: false,
  }),
  methods: {
    show() {
      this.active = true;
    },
  },
};
</script>
