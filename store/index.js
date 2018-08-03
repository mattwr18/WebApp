import feathersVuex, { initAuth } from 'feathers-vuex'
import feathersClient from '../feathers-client'

const { service } = feathersVuex(feathersClient, { idField: '_id' })


export const actions = {
  async nuxtServerInit ({dispatch}) {
    dispatch('categories/init')
    await dispatch('auth/init')
    await dispatch('settings/init')
  }
}

export const plugins = [
  service('usersettings')
]
