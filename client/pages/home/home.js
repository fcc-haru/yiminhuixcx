// pages/home/index.js
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    minustatus:"disabled",
    plusStatus:"normal",
    imgUrls: ["/images/hyk.png"],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    totalPrice: 0, // 订单总价，初始为0
    hasProduct:true,// 是否添加了产品，初始为true
    productList:[],
    carList:[],
    listTime:'',
    sendTime:'',
    buttonText:''
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
      total += productList[i].num * productList[i].productPrice;   // 所有价格加起来
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
    let carList = this.data.carList;   
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
   * 获取订单下单时间
   */
  getListTime(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    this.setData({
      listTime: Y + '年' + M + '月' + D + '日' 
    })
    //如果在五点之前，则次日送到，大于五点隔日送到
    if(h<17){
        D++;
    }else{
        D+=2;
    }
    this.setData({
      sendTime: Y + '年' + M + '月' + D + '日'
    })
    //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  
  },
  /**
   * 确认订单
   */
  confirmOrderlist(){
    var that = this;
    let productList = this.data.productList; 
    that.data.carList=[]; 
    that.getListTime();
    wx.setStorage({
      key: 'listTime',
      data: that.data.listTime,
    })
    wx.setStorage({
      key: 'sendTime',
      data: that.data.sendTime,
    })
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].num > 0) {
        that.data.carList.push(productList[i]);
      }
    }
    wx.setStorage({
      key: 'carList',
      data: that.data.carList,
    })
    if(that.data.buttonText=='确认订单'){
      wx.navigateTo({
        url: '/pages/orderDetails/orderDetails?buttonText=确认订单',
      })
    } else if (that.data.buttonText == '确认修改') {
      wx.navigateTo({
        url: '/pages/orderDetails/orderDetails?buttonText=确认修改',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.setStorage({
      key: 'modifyButton',
      data: '确认订单',
    })
    wx.hideLoading();
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        if(res.data.msg === "Success"){
          wx.showModal({
            title: '登陆成功',
            content: '尊敬的会员，欢迎来到亿民惠!',
            showCancel: false,
            confirmText: '好的'
          })
        } else if (res.data.msg === "User not found"){
          wx.showModal({
            title: '登陆失败',
            content: ' 很抱歉，您暂不是亿民惠会员，我们的工作人员会尽快与你联系，谢谢!',
            showCancel: false,
            confirmText: '好的'
          })
        }
      }
    })
    
    var options = {
      url: config.service.homeUrl,
      method: "POST",
      success(result) {
        var productArr = result.data.msg;
        for (let i = 0; i < productArr.length;i++){
          productArr[i].num = 0;
        }
        that.setData({
          productList: productArr
        })
        that.getTotalPrice();
        that.getProducts();
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);
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
    var that = this;
    wx.getStorage({
      key: 'modifyButton',
      success: function (res) {
        that.setData({
          buttonText: res.data
        })
      },
    })
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