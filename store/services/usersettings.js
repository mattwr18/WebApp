import feathersVuex from 'feathers-vuex'

let servicePlugin = (feathersClient) => {
  const { service } = feathersVuex(feathersClient, { idField: '_id' })
  const servicePath = 'usersettings'
  const servicePlugin = service(servicePath, {
    namespace: 'feathers-vuex-usersettings',
    instanceDefaults: {
      blacklist: [],
    },
    getters: {
      isBlacklisted: (state) => (userId) => {
        return state.copy && state.copy.blacklist.includes(userId)
      },
      isPending: (state) => {
        return (state.isFindPending || state.isPatchPending)
      }
    },
    actions: {
      async setCurrentByUserId({commit, dispatch}, userId){
        let res = await dispatch('find', {
          query: { userId }
        })
        if (res.data.length > 0){
          await commit('setCurrent', res.data[0])
        }
      },
      toggleBlacklist({commit, state}, userId){
        let current = state.copy;
        if (current.blacklist.includes(userId)){
          current.blacklist = current.blacklist.filter(id => id !== userId);
        } else {
          current.blacklist.push(userId);
        }
        current.save();
        commit('setCurrent', current);
      },
    }
  })
  return servicePlugin
}
export default servicePlugin
