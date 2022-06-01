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
        return this.$axios
          .$post(`${this.$whppt.apiPrefix}/user/login`, { username, password })
          .then(({ statusCode, token }) => {
            // console.log('🚀 ~ file: security.js ~ line 20 ~ returnthis.$axios.$post ~ statusCode', statusCode);
            Cookies.set('authToken', token, { expires: options.security.expires || 3 }); // expires is set in days

            return this.$axios.$post(`${this.$whppt.apiPrefix}/user/me`).then(({ user }) => {
              // console.log('🚀 ~ file: security.js ~ line 22 ~ returnthis.$axios.$post ~ user', user);
              if (!user.roles) return;
              commit('LOGIN_USER', user);
            });
          });
      },

      verifyUser({ commit }) {
        return Promise.resolve().then(() => {
          const token = Cookies.get('authToken');
          if (!token) return commit('LOGIN_USER', null);

          return this.$axios.$post(`${this.$whppt.apiPrefix}/user/me`).then(({ user }) => {
            commit('LOGIN_USER', user);
          });
        });
      },

      logout({ commit }) {
        Cookies.remove('authToken');
        commit('LOGIN_USER', null);
      },
    },
    mutations: {
      LOGIN_USER(state, user) {
        state.authUser = user;
      },
    },
  };
};
