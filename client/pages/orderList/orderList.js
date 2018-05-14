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
    userId: '',
    curIndex: 0,
    modifyOrder:'', //是否能修改订单
    modifyFun:''  //根据是否能修改订单决定点击的方法名
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.modifyOrderlist();
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
        console.log(res.data[0].userId);
        that.setData({
          userId: res.data[0].userId
        })
        let userId = { userId: that.data.userId }
        var options = {
          url: config.service.addressUrl,
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: userId,
          success(result) {
            console.log(result.data);
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
   * 待派送与已派送tab切换事件
   */
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  /**
   * 是否能修改订单
   */
  modifyOrderlist() {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //时  
    var h = date.getHours();
    if(h<17){
        that.setData({
          modifyOrder:'#333',
          modifyFun:'canmodify'
        })
    }else{
      that.setData({
        modifyOrder: '#999',
        modifyFun: 'cantmodify'
      })
    }
  },
  canmodify(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  cantmodify(){
    wx.showModal({
      title: '',
      showCancel:false,
      confirmText: '我知道了',
      content: '很抱歉，由于每日订单及时生成，17:00后不再支持修改订单，忘理解',
    })
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