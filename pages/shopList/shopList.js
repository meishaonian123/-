// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList:[],
      pageIndex:0,
      pageSize:20,
      catId:1,
      hasMore:true
  },

  // 加载请求函数抽离
  loadMore: function(){
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res)
        // console.log(res.data.length)
        if (!this.data.hasMore)
        {
          wx.showToast(
            {
              title: '没有更多了.....',
              icon: 'success',
              duration:1000
            }
          )
          return
        }else{
          wx.showNavigationBarLoading()
          // wx.showToast(
          //   {
          //     title: '成功',
          //     icon: 'success',
          //     image:'../../assets/icons/grid-01.png',
          //     duration:1000
          //   }
          // )
          // wx.showLoading({
          //   title: '加载中',
          // })
          var count = parseInt(res.header['X-Total-Count']);
          // 2.4 用于判断比较是否还有更多数据
          var flag = this.data.pageIndex * this.data.pageSize < count;
          var newList = []
          newList = this.data.shopList.concat(res.data)
          this.setData({
            shopList: newList,
            hasMore:flag
          })
        }

        },
      fail: function (res) { },
      complete: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
       },
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      wx.setNavigationBarTitle({
        title: options.title
      })
      this.setData({
        catId:options.cat
      })
      this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉")
    this.setData({
      hasMore:true,
      shopList: [],
      pageIndex: 0

    })
    this.loadMore()

    // 需要手动停止刷新的操作
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      console.log('上拉触底')
     this.loadMore()
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})