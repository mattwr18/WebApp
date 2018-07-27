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
  async blacklist({commit, state}, userId){
    let usersettings = Object.assign({}, state.usersettings)
    let blacklist = usersettings.blacklist.slice();
    blacklist.push(userId);
    usersettings.blacklist = blacklist;
    await this.app.$api.service('usersettings').create(usersettings);
    commit('usersettings', usersettings);
  },
  async unblacklist({commit, state}, userId){
    let usersettings = Object.assign({}, state.usersettings)
    let blacklist = usersettings.blacklist.filter(id => id !== userId);
    usersettings.blacklist = blacklist;
    await this.app.$api.service('usersettings').create(usersettings);
    commit('usersettings', usersettings);
  }
}
