import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import authentication from '@feathersjs/authentication-client'
import urlHelper from '~/helpers/urls'
import { CookieStorage } from 'cookie-storage'

const authKey = 'feathers-jwt'
const endpoint = urlHelper.buildEndpointURL(process.env.API_HOST, { port: process.env.API_PORT })
let socket;
if (process.env.ENV === 'production'){
  socket = socketio(io(endpoint), { timeout: 20000 })
  if (process.server) {
    setTimeout(() => {
      // close server connection as content was delivered already after 30 seconds at latest
      try {
        socket.close()
      } catch (err) {
        console.log(err)
      }
    }, 30000)
  }
} else {
  socket = socketio(io(endpoint))
}

let api = feathers()
  .configure(socket)
  .configure(authentication({
    storage: new CookieStorage(),
    storageKey: authKey,
    cookie: authKey
  }))

export { socket, endpoint, authKey };
export default api
