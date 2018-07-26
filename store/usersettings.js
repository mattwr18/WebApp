import { isArray } from 'lodash'

export const state = () => {
  return {
    usersettings: {
      blacklist: []
    }
  }
}

export const mutations = {
  usersettings(state, usersettings) {
    state.usersettings = usersettings;
  }
}

export const getters = {
  usersettings(state) {
    return state.usersettings;
  }
}
export const actions = {
  async patch ({dispatch, rootGetters}, data) {
    const user = rootGetters['auth/user']
    const userSettings = rootGetters['auth/userSettings']

    if (!user || !userSettings) {
      return null
    }
    data.userId = user._id.toString()

    let res = await this.app.$api.service('usersettings').create(data)
    if (isArray(res)) {
      res = res.pop()
    }

    await dispatch('auth/refreshUser', res, { root: true })

    return res
  },
  async blacklist({commit, state}, userId){
    let usersettings = Object.assign({}, state.usersettings)
    let blacklist = usersettings.blacklist.slice();
    blacklist.push(userId);
    usersettings.blacklist = blacklist;
    commit('usersettings', usersettings);
  },
  async unblacklist({commit, state}, userId){
    let usersettings = Object.assign({}, state.usersettings)
    let blacklist = usersettings.blacklist.filter(id => id !== userId);
    usersettings.blacklist = blacklist;
    commit('usersettings', usersettings);
  }
}
