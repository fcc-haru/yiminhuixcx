// pages/orderList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[]
  },
   /**
   * 计算每个商品的总价
   */
  everProductPrice(){
    let num = this.data.num;
    let productPrice = this.data.productPrice;
    let totalPrice = num * productPrice;
    let carList = this.data.carList;
    for (let i = 0; i < carList.length; i++) {
      carList[i].total = carList[i].num * carList[i].productPrice;
    }
    this.setData({
      carList: carList
    })
    console.log(this.data.carList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'carList',
      success: function(res) {
        that.setData({
          carList:res.data
        })
        console.log(that.data.carList);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.everProductPrice();
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