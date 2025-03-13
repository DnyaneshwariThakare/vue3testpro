import axios from 'axios'
import { useauthStore } from  "../store/modules/authStore.js"

class ServerConnect {
  constructor(serverUrl = '/efserver', methodType = 'get', isAuth = true) {
    // let cancel
    this.serverConnectionTo = serverUrl
    let isAutorize = isAuth
    let method = methodType

    // this.showConfirmDialog = false
    // this.enablePageLoader = false
    // console.log('Connection', this.serverConnectionTo)
    this.serverConnectionInstance = axios.create({
      baseURL: this.serverConnectionTo
    })

    this.serverConnectionInstance.interceptors.request.use(
      function (config) {
        if (isAutorize) {
          if (localStorage.getItem('access_token') !== null) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.serverConnectionInstance.interceptors.response.use(
      function (response) {
        return response
      },
      async function (error) {
        if (error.response.status == 401) {
          const { logout } = useauthStore()
          await logout()
          return Promise.reject('Unauthorized')
        } else {
          return Promise.reject(error)
        }
      }
    )

    this.fetch = (strReqString, parameters = {}) => {
      // console.log(method, strReqString)
      if (method === 'post') {
        // console.log('In post call for ' + this.serverUrl)
        return new Promise((resolve, reject) => {
          this.serverConnectionInstance
            .post(strReqString, parameters)
            .then((response) => {
              // console.log(response.data)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else if (method === 'get') {
        return new Promise((resolve, reject) => {
          this.serverConnectionInstance
            .get(strReqString)
            .then((response) => {
              // console.log(response.data)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else if (method === 'put') {
        return new Promise((resolve, reject) => {
          this.serverConnectionInstance
            .put(strReqString, parameters)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else if (method === 'patch') {
        return new Promise((resolve, reject) => {
          this.serverConnectionInstance
            .patch(strReqString, parameters)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    }
  }
}

export default ServerConnect
