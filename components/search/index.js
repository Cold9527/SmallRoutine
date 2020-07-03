// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from '../../models/book'
import {
  paginationBev
} from '../behaviors/pagination'
import { m } from '../../util/common'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter:false
  },
  attached() {
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
    this.setData({
      historyWords: keywordModel.getHistory()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Oncancel(e) {
      this.initPagination()
      this.triggerEvent('cancel', {}, {})
    },
    //这个位置的函数要放在前面
    _setResult(){
      this.setData({
        searching: true
      })   
    },
    _closeResult (){
      this.setData({
        searching: false,
        q:''
      })   
    },      
    _showLoading(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoading(){
      this.setData({
        loadingCenter: false
      })    
    },

    OnConfirm(e) {
      this._showLoading()
      this._setResult()
      const word = e.detail.value || e.detail.text
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q: word
        })
        keywordModel.addToHistory(word)
        this._hideLoading()
      })
    },
    Ondelete(e) {
      this.initPagination()
      this._closeResult()
    },
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.Locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books)
          this.unLocked()
        },()=>{
          this.unLocked()
        })
      }
    }
  }
})