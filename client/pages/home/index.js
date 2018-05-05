// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    minustatus:"disabled",
    plusStatus:"normal",
    imgUrls: ["/images/timg.jpeg"],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    productList:[
      {
        url:"/images/timg.jpeg",
        name:"米粉",
        decr:"好吃的米粉",
        price:"30.00",
        totalNumber:"100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        totalNumber: "100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        totalNumber: "100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        totalNumber: "100"
      }
      
    ]
  },
  minus:function(){
    var num =this.data.num;
    if(num>1){
      num--;
    }
    var minusStatus =num<=1?"disabled":"normal";
    this.setData({
      num:num,
      minusStatus:minusStatus
    })
  },
  plus:function(e){
    console.log(e);
    var num = this.data.num;
    num++;
    var plusStatus = num > 10 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      // minusStatus: minusStatus,
      plusStatus: plusStatus
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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