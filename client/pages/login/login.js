var config = require('../../config');
Page({
  data: {
    // loginBtnBgBgColor:"#0099ff",
    btnLoading:false,
    disabled:false,
    userInfo: {}
  },
  formSubmit:function(e){
    var that = this;
    var formData = e.detail.value;
    var options = {
      url: config.service.loginUrl,
      data: formData,
      method: "POST",
      success(result) {
        wx.showLoading({
          title: '登陆中，请稍后',
        })
        if(result.data.msg.length>0){
          wx.switchTab({
            url: '/pages/home/home',
          });
        }
        console.log(result.data)
        wx.setStorage({
          key: 'userInfo',
          data: result.data.msg,
        })
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        wx.showToast({
          title: '登陆失败,请重新登陆',
          icon: 'none',
          duration: 1000
        })
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options)
  },
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: "亿民惠"
    })
    // app.getUserInfo(function(userInfo){
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  onShow: function () {

  },
  onReady: function () {

  }
});