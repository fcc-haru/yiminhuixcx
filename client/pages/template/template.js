Page({

  /**
   * 页面的初始数据
   */
  data: {
    modifySuccess:false,
    confirmSuccess:false,
    rechargeSuccess: false
  },
  viewList(){
    wx.navigateBack({
      delta:2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.modifySuccess){
      this.setData({
        modifySuccess: options.modifySuccess,
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 1000);
    }
    if (options.confirmSuccess) {
      this.setData({
        confirmSuccess: options.confirmSuccess,
      })
      setTimeout(function(){
        wx.navigateBack({
          delta: 2
        })
      },1000);
    }
    if (options.rechargeSuccess) {
      this.setData({
        rechargeSuccess: options.rechargeSuccess,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // setTimeout(function () {
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // }, 1000)
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})