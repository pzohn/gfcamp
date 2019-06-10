// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// var demo = new QQMapWX({
//   key: 'JSWBZ-2UC6K-ZCTJK-AMKZN-J7WEZ-6RBPZ'
// });
Page({

  data: {
    imgUrls: [
      'http://www.gfcamps.cn/images/wx/header1.jpg',
      'http://www.gfcamps.cn/images/wx/header2.jpg',
      'http://www.gfcamps.cn/images/wx/header3.jpg'
    ],
    recommend: [],
    hotrec: [],

    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    displayMultipleItems: 3,
    // address:'',
    name:'',
    navbar: ['自然营', '生存营', '思辨营', '科学营', '人文营'],
    currentTab: 0,
    types: [
      {
        name: "倾听森林上旋律,爱护天空下的音符倾听森林上旋律,爱护天空下的音符",
        img: "../../images/ceshi1.jpg",
        id: 236462
      },
      {
        name: "在家就能带孩子去宇宙遨游!",
        img: "../../images/ceshi2.jpg",
        videoid: 239209
      },
      {
        name: "海洋知识大百科探索坤丽的海洋奇观!",
        img: "../../images/ceshi3.jpg",
        videoid: 237119
      },
      {
        name: "轻松掌握朗诵技巧,感受古诗韵律之美!",
        img: "../../images/ceshi4.jpg",
        videoid: 233124
      },
      {
        name: "穿梭到白垩纪和做逻辑,漫游奇妙恐龙王国!",
        img: "../../images/ceshi5.jpg",
        videoid: 236697
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;

    page.initData();
  },

  initData: function () {

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
    // var app = getApp();
    // this.setData({
    //   address: app.globalData.city
    // });
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

  },

  accountInput: function (e) {
    var content = e.detail.value;
    this.setData({ name: content });
  },

  resetSearch: function (){
    var name = this.data.name;
    if (this.data.name == '') {
      wx.showModal({
        title: '搜索条件为空',
        content: '请输入关键字!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }
    var app = getApp();
    app.globalData.searchByname = true;
    wx.navigateTo({
      url: '../search/search?name=' + name
    });
  },

  select: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../search/search?id=' + id
    });
  },

  recommendGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  },

  hotrecGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  },

  switchcity: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../switchcity/switchcity'
    });
  }
})