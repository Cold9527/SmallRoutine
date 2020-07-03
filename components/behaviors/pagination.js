
export const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noneRusult:false,
    loading:false
  },
  methods: {
    isLocked(){
      return this.data.loading ? true : false  
    },  
    Locked(){
      this.setData({
        loading:true
      })
    },
    unLocked(){
      this.setData({
        loading:false
      })
    },    
    setMoreData(dataArray) {
      const temArrary = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temArrary
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },  
    setTotal(total){
      if(total==0){
        this.setData({
          noneRusult:true
        })
      }
      this.data.total = total
    },
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else {
        return true
      }
    },    
    initPagination(){
      this.setData({
        dataArray:[],
        noneRusult:false,
        loading:false
      })
      this.data.total = 0
    }
  }
})
