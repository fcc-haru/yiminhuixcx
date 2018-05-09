// pages/orderList/index.js
var amapFile = require('../../vendor/wafer2-client-sdk/lib/amap-wx.js');
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[], //订单列表
    listTime:'',//下单时间
    sendTime:'',//送货时间
    inTotal:0 ,//总合计
    textData: {},
    markers: [],
    latitude: '',
    longitude: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "订单详情"
    })

    var that = this;
    //获取地理位置信息
    var myAmapFun = new amapFile.AMapWX({ key: '27e90f82c382f9e04b7fcae4a0ebf3e3' });
    myAmapFun.getPoiAround({
      iconPathSelected: '选中 marker 图标的相对路径', //如：..­/..­/img/marker_checked.png
      iconPath: '未选中 marker 图标的相对路径', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
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
  getCarList:function(){
    var that = this;
    wx.getStorage({
      key: 'listTime',
      success: function(res) {
        that.setData({
          listTime: res.data
        })
      },
    })
    wx.getStorage({
      key: 'sendTime',
      success: function(res) {
        that.setData({
          sendTime: res.data
        })
      },
    })
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