import ServerConnect from './ServerConnect.js'

class ConnectionObject {
  constructor() {
   

    this.reportGet = new ServerConnect('/reportEngine', 'get', true)
    this.reportPost = new ServerConnect('/reportEngine', 'post', true)
    this.reportPut = new ServerConnect('/reportEngine', 'put', true)
    
    // ------ AUTH---------------------------------------------------------


    this.reportGetCall = () => {
      return this.reportGet
    }
    this.reportPostCall = () => {
      return this.reportPost
    }
    this.reportPutCall = () => {
      return this.reportPut
    }

  }
}
export default ConnectionObject
