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
      isPending: (state) => {
        return (
          state.isFindPending
          || state.isGetPending
          || state.isCreatePending
          || state.isUpdatePending
          || state.isPatchPending
          || state.isRemovePending
        )
      }
    },
    actions: {
      async loadCurrent({commit, dispatch}, user){
        let userId = user._id;
        let res = await dispatch('find', {
          query: { userId }
        })
        if (res.data.length > 0){
          commit('setCurrent', res.data[0])
        }
      },
      async toggleBlacklist({commit, state}, userId){
        let current = state.copy;
        if (current.blacklist.includes(userId)){
          current.blacklist = current.blacklist.filter(id => id !== userId);
        } else {
          current.blacklist.push(userId);
        }
        await commit('commitCopy');
        return current.save();
      },
    }
  })
  return servicePlugin
}
export default servicePlugin
