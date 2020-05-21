import Cookies from 'js-cookie';

export default options => {
  options.security = options.security || {};
  return {
    namespaced: true,
    state: () => ({
      authUser: null,
    }),
    actions: {
      login({ commit }, { username, password }) {
        return this.$axios.$post(`/user/login`, { username, password }).then(({ token }) => {
          Cookies.set('authToken', token, { expires: options.security.expires || 3 }); // expires is set in days
          return this.$axios.$post(`/user/me`).then(({ user }) => {
            commit('LOGIN_USER', user);
          });
        });
      },

      verifyUser({ commit }) {
        return Promise.resolve().then(() => {
          const token = Cookies.get('authToken');
          if (!token) return commit('LOGIN_USER', null);
          return this.$axios.$post(`/user/me`).then(({ user }) => {
            commit('LOGIN_USER', user);
          });
        });
      },

      logout({ commit }) {
        // return axios.post(`/${apiPrefix}/user/logout`).then(() => {
        Cookies.remove('authToken');
        commit('LOGIN_USER', null);
        // });
      },
    },
    mutations: {
      LOGIN_USER(state, user) {
        state.authUser = user;
      },
    },
  };
};
