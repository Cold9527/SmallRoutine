import { config } from '../config.js'

const tips = {
  1:'抱歉，出现错误',
  1005:'appkey无效',
  3000:'期刊不存在'
}

class HTTP {
  request(parmas) {
    if(!parmas.method){
      parmas.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + parmas.url,
      method:parmas.method,
      data:parmas.data,
      header:{
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          parmas.success && parmas.success(res.data)
        }else{
          let error_code = res.data.error_code       
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}

export { HTTP }