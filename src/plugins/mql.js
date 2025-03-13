import axios from 'axios'
import Response from './response.js'
// commented login
// import {login} from "../store/modules/login"
import { main } from "../store/index"
function dialogConfirm({ title, text, errMsg, confirm }) {
  return new Promise((resolve, reject) => {
    confirm.require({
      message: text,
      header: title,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        resolve()
        //callback to execute when user confirms the action
      },
      reject: () => {
        reject(new Error(errMsg))
        //callback to execute when user rejects the action
      },
      onHide: () => {
        //Callback to execute when dialog is hidden
      }
    });
  })
}

class MQL {
  constructor(strActivities = null) {
    let cancel
    let isDevelopment = process.env.NODE_ENV !== 'production'
    let CancelToken = axios.CancelToken
    this.strActivities = strActivities
    this.isQuery = false
    this.isActivity = false
    this.fetchableMap = new Map()
    this.version = window.app.getVersion()
    this.region = window.app.getRegion()
    this.appCode = window.app.getAppCode()
    this.activityType = 'o'
    this.mqlString = '/mql'
    this.isConfirm = false
    this.confirm = null
    this.showPageLoader = true
    // this.loginStore = login()
    this.mainStore = main()
    const QueryActivityKey = 'FetchQueryData'

    const ActivitySplitter = '.['

    const ObjActivityNameKey = 'ActivityName'

    const ObjActivityData = 'Data'
    const mqlInstance = axios.create({
      baseURL: window.app.getBaseURL()
      // baseURL: window.location.host,
      // transformRequest: axios.defaults.transformRequest.concat(
      //   function (data, headers) {
      //     // compress strings if over 1KB
      //     if (typeof data === 'string' && data.length > 10) {
      //       headers['Content-Encoding'] = 'gzip';
      //       return pako.gzip(data);
      //     } else {
      //       // delete is slow apparently, faster to set to undefined
      //       //headers['Content-Encoding'] = undefined;
      //       return data;
      //     }
      //   }
      // )
    })
    mqlInstance.interceptors.request.use(
      function (config) {
        if (config.url.indexOf('r/mql') !== -1 || config.url.indexOf('r/c/mql') !== -1) {
          // Check for restricted request
          if (sessionStorage.getItem('user-token') === null) {
            cancel('Operation canceled by the MQL interceptor.')
            // TODO: Uncomment below code for dispatch
            // window.app.$store.dispatch('AUTH_LOGOUT')
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    // mqlInstance.interceptors.response.use(
    //   function (config) {
    //     if (config.url.indexOf('r/') !== -1) {
    //       // Check for restricted request
    //       if (sessionStorage.getItem('user-token') === null) {
    //         cancel('Operation canceled by the MQL interceptor.')
    //         //TODO: Uncomment below code for dispatch
    //         // window.app.$store.dispatch('AUTH_LOGOUT')
    //       }
    //     }
    //     return config
    //   },
    //   function (error) {
    //     return Promise.reject(error)
    //   }
    // )
    this.formatActivity = function (activityStr) {
      let activityArray = []
      this.activityType = activityStr.split(ActivitySplitter)[0]
      this.fetchableMap.set('ActivityType', this.activityType)
      activityArray = activityStr
        .split(ActivitySplitter)[1]
        .substring(0, activityStr.split(ActivitySplitter)[1].length - 1)
        .split(',')
      activityArray.map((item) => {
        let obj = {}

        let srvName
        obj[ObjActivityData] = null
        if (item.match(/query_/) !== null && item.match(/query_/).length > 0) {
          obj[item] = item.trim()
          srvName = item.trim()
          this.isQuery = true
        } else {
          obj[ObjActivityNameKey] = item.trim()
          srvName = item.trim()
          this.isActivity = true
        }
        this.fetchableMap.set(srvName, obj)
      })
    }
    this.deepFreeze = (object) => {
      // Retrieve the property names defined on object
      var propNames = Object.getOwnPropertyNames(object)
      // Freeze properties before freezing self
      for (let name of propNames) {
        let value = object[name]
        object[name] = value && typeof value === 'object' ? this.deepFreeze(value) : value
      }
      // return Object.freeze(object)
      return object
    }
    this.generateURL = (activityType, customURL) => {
      if (customURL != null && customURL !== undefined) {
        return customURL + this.getVersion() + this.getRegion() + this.getAppCode() + this.getServiceURL(activityType)
      } else {
        return this.getVersion() + this.getRegion() + this.getAppCode() + this.getServiceURL(activityType)
      }
    }
    this.getServiceURL = (activityType) => {
      return (
        (activityType.toLowerCase() === 'c' ? 'r/' + activityType.toLowerCase() : activityType.toLowerCase()) +
        this.mqlString
      )
    }
    this.generateHeaders = (activityType, activities, headers = {}, isQuery = false) => {
      headers['Service-Header'] = isQuery ? QueryActivityKey : activities
      if (activityType !== 'o') {
        headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      }
      return headers
    }
    this.getVersion = function () {
      // return ''
      return this.version != null || this.version !== undefined ? this.version + '/' : ''
    }
    this.getRegion = function () {
      // return ''
      return this.region != null || undefined !== this.region ? this.region + '/' : ''
    }
    this.getAppCode = function () {
      // return ''
      return this.appCode != null || this.appCode !== undefined ? this.appCode + '/' : ''
    }
    /* Setter methods */
    this.setActivity = function (strActivities = null) {
      this.strActivities = strActivities
      this.formatActivity(this.strActivities)
      return this
    }
    this.setData = function (strActivity = null, strDataObj = null) {
      if (strActivity === null) {
        console.log("");
      } else if (strDataObj === null) {
        // common data
        for (let [key, value] of this.fetchableMap) {
          if (value[ObjActivityData] === null) {
            value[ObjActivityData] = strActivity
            this.fetchableMap.set(key, value)
          }
        }
      } else {
        // service specific
        let activityValue = this.fetchableMap.get(strActivity)
        activityValue[ObjActivityData] = strDataObj
        this.fetchableMap.set(strActivity, activityValue)
      }
      return this
    }
    this.setHeader = function (obj_header = {}) {
      this.fetchableMap.set('Header', obj_header)
      return this
    }
    this.setCustomURL = function (str_customURL = null) {
      this.fetchableMap.set('CustomURL', str_customURL)
      return this
    }
    this.showConfirmDialog = function (boolConfirmation = false, confirm = confirm) {
      this.isConfirm = boolConfirmation
      this.confirm = confirm
      return this
    }
    this.enablePageLoader = function (boolShowPageLoader = false) {
      this.showPageLoader = boolShowPageLoader
      return this
    }
    this.setLoginActivity = function () {
      this.setActivity('o.[ldapLogin]')
      // this.setCustomURL('/o/mql/login')
      // this.activityType = ''
      // this.mqlString = ''
      return this
    }
    this.fetch = function (docId = null) {
      return new Promise((resolve, reject) => {
        console.log("reject:", reject)
        let self = this
        if (this.isConfirm) {
          dialogConfirm({
            title: 'Confirmation',
            text: 'Are you sure you want to continue ?',
            errMsg: 'Cancelled by User',
            confirm: this.confirm
          })
            .then(() => {
              let rs = self.run(docId, self.isQuery, self.isActivity, self.fetchableMap, self.activityType)
              resolve(rs)
            })
            .catch(e => {
              // eslint-disable-next-line prefer-promise-reject-errors
              resolve(new Response({
                data: {
                  error: e.message,
                  errorCode: 1990,
                  result: null
                }
              }))
            })
        } else {
          let rs = self.run(docId, self.isQuery, self.isActivity, self.fetchableMap, self.activityType)
          resolve(rs)
        }
      }).catch((error) => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }
    this.run = function (docId = null, isQuery = false, isActivity = false, fetchableMap = null, activityType = 'o') {
      return new Promise((resolve) => {
        // TODO: seperate this in new function
        let txt = 'Processing'
        if (this.showPageLoader && this.mainStore !== undefined && this.mainStore !== null) {
          // window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
          this.mainStore.MUTATE_PAGE_BLOCKER(true)
        }
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        let postParamObject = {}
        let activities = ''
        if (isQuery && isActivity) {
          let obj = {}
          obj.data = {}
          obj.data.error = 'Can not support query and activity in a single execution'
          obj.data.errorCode = 1990
          obj.data.result = null

          resolve(new Response(obj))
        } else {
          fetchableMap.set('isQuery', isQuery)
        }
        let payloadObject = {}
        for (var [key, value] of fetchableMap) {
          if (
            key.search('ActivityType') < 0 &&
            key.search('Header') < 0 &&
            key.search('CustomURL') < 0 &&
            key.search('isQuery') < 0
          ) {
            activities = activities + ',' + key
            payloadObject[
              key.match(/query_/) !== null && key.match(/query_/).length > 0
                ? key.substring('query_'.length, key.length)
                : key
            ] = value.Data
          }
        }
        if (this.isQuery) {
          payloadObject['fetchGroup'] = activities
            .substring(1, activities.length)
            .split(',')
            .map((item) => {
              return item.substring('query_'.length, item.length)
            })
          postParamObject[QueryActivityKey] = payloadObject
        } else {
          postParamObject = payloadObject
        }
        mqlInstance({
          url: this.generateURL(activityType, fetchableMap.get('CustomURL')),
          method: 'Post',
          headers: this.generateHeaders(
            activityType,
            activities.substring(1, activities.length),
            fetchableMap.get('Header'),
            isQuery
          ),
          data: postParamObject,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c
          })
        })
          .then((res) => {
            if (docId !== null && document.getElementById(docId) !== null) {
              document.getElementById(docId).disabled = false
              document.getElementById(docId).innerHTML = txt
            }
            if (this.showPageLoader) {
              // window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              this.mainStore.MUTATE_PAGE_BLOCKER(false)
            }
            resolve(new Response(res))
          })
          .catch((error) => {
            let obj = {}
            obj.data = {}
            if (docId !== null && document.getElementById(docId) !== null) {
              document.getElementById(docId).disabled = false
              document.getElementById(docId).innerHTML = txt
            }
            if (this.showPageLoader) {
              // window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              this.mainStore.MUTATE_PAGE_BLOCKER(false)
            }
            obj.data.error = error.message
            obj.data.errorCode = 1990
            obj.data.result = null
            resolve(new Response(obj))
          })
      }).catch((error) => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }
  }
}

export default MQL
