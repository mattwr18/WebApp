import feathers from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'
import Vue from 'vue'
import api, { authKey } from '../feathers-client'

export default ({app, store, redirect, router}) => {
  api.hooks({
    before: {
      all: [
        async (hook) => {
          // hook.accessToken = await api.passport.getJWT()
          if (process.env.NODE_ENV === 'development') {
            console.log('# API:', `${hook.method} ${hook.path}`)
            console.info('data', hook.data)
            // console.log('# ' + hook.accessToken)
          }
          return hook
        }
      ]
    },
    async error (ctx) {
      if (process.env.NODE_ENV === 'development') {
        console.log('####################')
        console.error(ctx.error)
        // console.info('JWT TOKEN: ', app.$cookies.get(authKey))
        console.info('path', ctx.path)
        console.info('service', ctx.service)
        console.info('method', ctx.method)
        console.info('params', ctx.params)
        console.info('id', ctx.id)
        console.info('data', ctx.data)
        console.log('####################')
      }

      // force re-login on 401 responses
      if (process.client && ctx.error.code === 401) {
        await store.dispatch('auth/logout')
        redirect(`/auth/login?path=${window.location.pathname}`)
      }
    }
  })

  /**
   * (Re-)Authenticate a user by credentials or jwt token
   *
   * returns the user object or null
   * @param {Object} options
   */
  api.auth = async (options = {strategy: 'jwt'}) => {
    // console.log('~~~######### api.auth', options)
    if (options.strategy === 'local') {
      // fix issues where we could not log in
      // when at development
      await api.passport.logout()
    }
    let user = null
    const response = await api.authenticate(options)
    const payload = await api.passport.verifyJWT(response.accessToken)

    if (payload.userId) {
      user = await api.service('users').get(payload.userId)
    }
    return user
  }

  api.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    api.channel('authenticated').join(connection)
  })

  /**
   * @deprecated
   */
  api.authKey = authKey

  // make the api accessible inside vue components
  Vue.use({
    install (Vue) {
      Vue.prototype.$api = api
    }
  })

  // make the api accessible through app.$api
  app.$api = api

  return api
}
