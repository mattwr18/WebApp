import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../feathers-client'
// Get a reference to the FeathersVuex plugin
const { FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })
// Register the plugin with Vue.
Vue.use(FeathersVuex)
Vue.use(Vuex)
