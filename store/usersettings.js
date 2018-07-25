import { isArray } from 'lodash'

export const state = () => {
  return {
    usersettings: {
      blacklist: []
    }
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
  blacklist({blacklist}){
    console.log(blacklist);
  },
  unblacklist({blacklist}){
    console.log(blacklist);
  }
}
