// pages/orderList/index.js
var amapFile = require('../../vendor/wafer2-client-sdk/lib/amap-wx.js');
var config = require('../../config');
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabslist: ["待派送订单", "已派送订单"],
    currentTab: 0, //预设当前项的值
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
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
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.modifyOrderlist();
    wx.setNavigationBarTitle({
      title: "订单详情"
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        //减去的80rpx为header和line还有tab栏的高度，如果此高度计算不准确会造成页面多出一个纵向滚动条
        var calc = clientHeight * rpxR - 80;
        that.setData({
          winHeight: calc,
        });
      }
    });
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
        console.log(res.data.data[0].userId);
        that.setData({
          userId: res.data.data[0].userId
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
    wx.setStorage({
      key: 'modifyButton',
      data: '确认修改',
    })
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