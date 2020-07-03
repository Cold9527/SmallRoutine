import { HTTP } from '../util/http.js'
export class ClassicModel extends HTTP {
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrev, sCallback){
    let key = nextOrPrev=='next' ? this._getKey(index+1) :this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url:`classic/${index}/${nextOrPrev}`,
        success:(res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }      
      })
    }else{
      sCallback(classic)
    }
  }
  getMyFavor(success){
    const parmas = {
      url:'classic/favor',
      success:success
    }
    this.request(parmas)
  }
  isFirst(index){
    return index==1 ? true : false
  }
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex==index ? true : false
  }
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey(index){
    let key = 'classic-' + index
    return key
  }
}