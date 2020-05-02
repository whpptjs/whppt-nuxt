<template>
  <div v-if="active" class="whppt-login">
    <button class="close" @click="close"><w-close /></button>
    <div class="whppt-form-container">
      <form>
        <label>
          <input v-model="data.username" type="text" required />
          <div class="whppt-label-text">Username / Email</div>
        </label>
        <label>
          <input v-model="data.password" type="password" required />
          <div class="whppt-label-text">Password</div>
        </label>
        <button :disabled="busy" @click.stop.prevent="doLogin">
          <span v-if="!busy">Submit</span>
          <w-close v-if="busy"></w-close>
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
    <p class="copywrite">&copy;{{ new Date().getFullYear() }} Svelte Studios. All rights reserved.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'EditorMenu',
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

<style scoped>
.whppt-login {
  position: fixed;
  z-index: 53;
  width: 100%;
  width: 100vh;
  height: 100%;
  height: 100vh;
  background-color: #333333;
  font-family: 'Open Sans', Helvetica;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.whppt-form-container {
  flex: 1;
  display: flex;
  align-items: center;
  align-self: center;
}

form {
  text-align: center;
}

label {
  display: block;
  letter-spacing: 4px;
  padding-top: 30px;
  text-align: center;
}

label .whppt-label-text {
  color: #9b9b9b;
  cursor: text;
  font-size: 20px;
  line-height: 20px;
  text-transform: uppercase;
  transform: translateY(-34px);
  transition: all 0.3s;
}

label input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #4a4a4a;
  color: white;
  font-size: 36px;
  letter-spacing: -1px;
  outline: 0;
  padding: 5px 20px;
  text-align: center;
  transition: all 0.3s;
  width: 200px;
}
label input:focus {
  max-width: 100%;
  width: 400px;
}

label input:focus + .whppt-label-text {
  color: #f0f0f0;
  font-size: 13px;
  transform: translateY(-80px);
}

label input:valid + .whppt-label-text {
  font-size: 13px;
  transform: translateY(-80px);
}

button {
  background-color: #333333;
  border: 2px solid white;
  border-radius: 27px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
  padding: 15px 30px;
  text-transform: uppercase;
  transition: all 200ms;
}
button:hover,
button:focus {
  background-color: white;
  color: #333333;
  outline: 0;
}

button.close {
  width: 20px;
  margin-top: 0;
  padding: 15px;
  border: none;
  position: absolute;
  right: 20px;
  top: 20px;
}

button.close:hover,
button.close:focus {
  /* border: 2px solid white; */
  background-color: #333333;
  color: white;
}

.copywrite {
  font-size: 12px;
  margin-bottom: 8px;
  color: white;
  text-align: center;
}

.error {
  margin-top: 8px;
  color: orangered;
}
</style>
