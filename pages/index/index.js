//index.js
//获取应用实例

Page({
  data: {
      sliderList:[],
      categories:[]
  },
 onLoad:function(){
      wx.request({
              // 请求地址
        url: "https://locally.uieee.com/slides",
            // 请求的参数
            // data: {},
            // 设置请求的 header
            header: {},
            // 请求方式
            method: "GET",
            // 数据类型
            dataType: "json",
            // 成功请求执行的回调函数
            success: (res)=> {
                // console.log(res);
                this.setData({
                  sliderList:res.data
                 
                })
            },
            // 请求失败执行的回调函数
            fail: function(res) {},
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function(res) {},
        });
        wx.request({
          url: 'https://locally.uieee.com/categories',
          // data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res)=> {
            this.setData({
              categories:res.data
            })
            console.log(res)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
 }
  
})
