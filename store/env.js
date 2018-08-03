export default {
  namespaced: true,
  state: {
    env: {}
  },
  mutations: {
    SET_ENV (state, env) {
      state.env = env
    }
  },

  getters: {
    all (state) {
      return state.env
    }
  },

  actions: {
    init ({commit}) {
      if (process.server) {
        commit('SET_ENV', require('dotenv').config().parsed)
      }
    }
  }
}
