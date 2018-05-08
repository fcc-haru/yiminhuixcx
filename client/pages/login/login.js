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
        if(result.data.msg.length>0){
          wx.switchTab({
            url: '/pages/home/index',
          });
        }
        console.log(result.data)
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
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