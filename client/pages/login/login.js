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
    wx.request({
      url: config.service.loginUrl,
      data: e.detail.value,
      header: {
        'content-type': "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",  
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  // goToHome: function (e) {
  //   wx.switchTab({
  //     url: '/pages/home/index',
  //   });
  // },
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
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});