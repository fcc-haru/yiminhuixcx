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
    totalPrice: 0, // 订单总价，初始为0
    hasProduct:true,// 是否添加了产品，初始为true
    productList:[
      {
        url:"/images/timg.jpeg",
        name:"米粉",
        decr:"好吃的米粉",
        price:"30.00",
        num:0,
        totalNumber:"100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        num: 0,
        totalNumber: "100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        num: 0,
        totalNumber: "100"
      },
      {
        url: "/images/timg.jpeg",
        name: "米粉",
        decr: "好吃的米粉",
        price: "30.00",
        num: 0,
        totalNumber: "100"
      }
      
    ]
  },
  /**
 * 绑定减数量事件
 */
  minus:function(e){
    const index = e.currentTarget.dataset.index;
    let productList = this.data.productList;
    let num = productList[index].num;
    if(num>0){
      num--;
    }
    productList[index].num = num;
    var minusStatus =num<=1?"disabled":"normal";
    this.setData({
      productList: productList,
      minusStatus:minusStatus
    })
    this.getTotalPrice();
    this.getProducts();
  },
   /**
 * 绑定加数量事件
 */
  plus:function(e){
    const index = e.currentTarget.dataset.index;
    let productList = this.data.productList;
    let num = productList[index].num;
    num++;
    productList[index].num = num;
    var plusStatus = num > 10 ? 'disabled' : 'normal';
    this.setData({
      productList: productList,
      // minusStatus: minusStatus,
      plusStatus: plusStatus
    });
    this.getTotalPrice();
    this.getProducts();
  },
  /**
 * 计算总价
 */
  getTotalPrice() {
    let productList = this.data.productList;                  // 获取产品列表
    let total = 0;
    for (let i = 0; i < productList.length; i++) {         // 循环列表得到每个数据                   
      total += productList[i].num * productList[i].price;   // 所有价格加起来
    }
    this.setData({                               
      productList: productList,
      totalPrice: total.toFixed(2)
    });
  },
  /**
* 获取产品下单数量
*/
  getProducts() {
    let productList = this.data.productList;  
    let products = 0;           
    for (let i = 0; i < productList.length; i++) {                          
       products +=productList[i].num; 
    }
    if(products>0){
      this.setData({
        hasProduct: false,
      });
    }else {
      this.setData({
        hasProduct: true,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProducts();
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