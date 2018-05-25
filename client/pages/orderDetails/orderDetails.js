// pages/orderList/index.js
var amapFile = require('../../vendor/wafer2-client-sdk/lib/amap-wx.js');
var config = require('../../config');
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [], //订单列表
    listTime: '',//下单时间
    sendTime: '',//送货时间
    inTotal: 0,//总合计
    textData: {},
    markers: [],
    latitude: '',
    longitude: '',
    userId: '',
    customerInfo:[],
    buttonText:'确认订单'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      buttonText:options.buttonText
    })
    wx.setNavigationBarTitle({
      title: "订单详情"
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  /**
   * 获取订单列表
   */
  getCarList: function () {
    var that = this;
    //获取下单时间
    wx.getStorage({
      key: 'listTime',
      success: function (res) {
        that.setData({
          listTime: res.data
        })
      },
    })
    //获取送货时间
    wx.getStorage({
      key: 'sendTime',
      success: function (res) {
        that.setData({
          sendTime: res.data
        })
      },
    })
    //获取订单
    wx.getStorage({
      key: 'carList',
      success: function (res) {
        that.setData({
          carList: res.data
        })
        let num = that.data.carList.num;
        let productPrice = that.data.carList.productPrice;
        let totalPrice = num * productPrice;
        let carList = that.data.carList;
        let inTotal = that.data.inTotal;;
        for (let i = 0; i < carList.length; i++) {
          carList[i].total = carList[i].num * carList[i].productPrice;
        }
        that.setData({
          carList: carList,
        })
        inTotal = 0;
        for (let i = 0; i < carList.length; i++) {
          inTotal += carList[i].total;
        }
        that.setData({
          inTotal: inTotal,
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userId: res.data.data[0].userId
        })
        let userId = { "userId": that.data.userId }
        var options = {
          url: config.service.addressUrl,
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: userId,
          success(result) {
            that.setData({
              customerInfo: result.data.msg[0]
            })
            console.log(result.data.msg[0]);
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        }
        wx.request(options);
      },
    })

  },
  /**
   * 确认订单
   */
  confirmOrderlist:function(){
    if(this.data.buttonText=='确认订单'){
      wx.showModal({
        title: '提示',
        cancelText: '再想想',
        confirmText: '去充值',
        content: '是否每日生成相同订单',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/accountRecharge/accountRecharge',
            })
          } else if (res.cancel) {
            wx.navigateTo({
              url: '/pages/accountRecharge/accountRecharge',
            })
          }
        }
      })
    } else if (this.data.buttonText == '确认修改'){
      wx.navigateTo({
        url: '/pages/template/template?modifySuccess=true',
      })
    }
  
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
    this.getCarList();
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