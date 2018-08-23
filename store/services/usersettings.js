import feathersVuex from 'feathers-vuex'

let servicePlugin = (feathersClient) => {
  const { service } = feathersVuex(feathersClient, { idField: '_id' })
  const servicePath = 'usersettings'
  const servicePlugin = service(servicePath, {
    namespace: 'feathers-vuex-usersettings',
    instanceDefaults: {
      blacklist: []
    },
    getters: {
      isPending: (state) => {
        return (
          state.current ||
          state.isFindPending ||
          state.isGetPending ||
          state.isCreatePending ||
          state.isUpdatePending ||
          state.isPatchPending ||
          state.isRemovePending
        )
      }
    },
    actions: {
      async loadCurrent ({commit, dispatch}, user) {
        let userId = user._id
        let res = await dispatch('find', {
          query: { userId }
        })
        if (res.data.length > 0) {
          commit('setCurrent', res.data[0])
        }
      },
      async toggleBlacklist ({commit, dispatch, state}, author) {
        let current = state.copy
        let blacklist = current.blacklist
        let userId = author._id
        if (blacklist.includes(userId)) {
          blacklist = blacklist.filter(id => id !== userId)
        } else {
          blacklist.push(userId)
        }
        current.blacklist = blacklist
        await commit('commitCopy')
        return dispatch('patch', [current._id, current, {}])
      }
    }
  })
  return servicePlugin
}
export default servicePlugin
