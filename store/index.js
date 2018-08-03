import feathersVuex, { initAuth } from 'feathers-vuex'
import feathersClient from '../feathers-client'
import Vuex from 'vuex'

import auth from './auth';
import categories from './categories';
import comments from './comments';
import connections from './connections';
import layout from './layout';
import newsfeed from './newsfeed';
import notifications from './notifications';
import organizations from './organizations';
import search from './search';
import settings from './settings';
import usersettings from './usersettings';

const { service } = feathersVuex(feathersClient, { idField: '_id' })

const createStore = () => {
  return new Vuex.Store({
    modules: { auth, categories, comments, connections, env, layout, newsfeed, notifications, organizations, search, settings, usersettings },
    actions: {
      async nuxtServerInit ({dispatch}) {
        dispatch('categories/init')
        await dispatch('auth/init')
        await dispatch('settings/init')
      }
    },
    plugins: [
      service('usersettings')
    ]
  });
}

export default createStore
