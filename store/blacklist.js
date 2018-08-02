export const state = () => {
  return {
    status: {
      isPending: false,
      blacklist: []
    }
  }
}

export const mutations = {
  status(state, stat) {
    state.status = stat;
  }
}

export const getters = {
  status(state) {
    return state.status;
  }
}
export const actions = {
  async syncBlacklist({commit, state}, {userId}){
    let status = Object.assign({}, state.status);
    status.isPending = true
    commit('status', status);
    status = Object.assign({}, state.status);
    try {
      const res = await this.app.$api.service('usersettings').find({
        query: { userId }
      })
      if(res.data.length && res.data.length > 0){
        status.blacklist = res.data[0].blacklist;
      }
    } catch (err) {
      console.error(err)
    }
    status.isPending = false
    commit('status', status)
  },
  async blacklist({commit, state}, userId){
    let status = Object.assign({}, state.status)
    let blacklist = status.blacklist.slice();
    blacklist.push(userId);
    status.blacklist = blacklist;
    await this.app.$api.service('usersettings').create({blacklist: status.blacklist});
    commit('status', status);
  },
  async unblacklist({commit, state}, userId){
    let status = Object.assign({}, state.status)
    let blacklist = status.blacklist.filter(id => id !== userId);
    status.blacklist = blacklist;
    await this.app.$api.service('usersettings').create({blacklist: status.blacklist});
    commit('status', status);
  }
}
