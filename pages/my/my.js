// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'未登录',
    nickName:'未授权',
    avatarUrl:'',
    iconArray: [
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/info.png',
        "iconText": '宝宝信息',
        "id":1
      },
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/card.png',
        "iconText": '优惠卷',
        "id": 2
      },
      {
        "iconUrl": 'https://www.hattonstar.com/gfcamp/suggest.png',
        "iconText": '意见反馈',
        "id": 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  list: function(e) {
    var app = getApp();
    if (app.globalData.loginFlag == false) {
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../orderlist/orderlist?type=' + id
    });
  },

  authorize: function () {
    var app = getApp();
    if (app.globalData.authorizeFlag == false){
      wx.navigateTo({
        url: '../getuser/getuser'
      });
    }
  },

  login: function () {
    var app = getApp();
    if (app.globalData.loginFlag == false) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
  },

  onItemClick: function (e) {
    var app = getApp();
    if (app.globalData.loginFlag == false) {
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    var index = e.currentTarget.id;
    if (index == 1){
      wx.navigateTo({
        url: '../useredit/useredit'
      })
    } else if (index == 2){
      wx.navigateTo({
        url: '../address/address'
      });
    }
  },

  onLoad: function (options) {
    var app = getApp();
    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    if (wxUserInfo == ""){
      app.globalData.authorizeFlag = false;
    }else{
      this.setData({
        nickName: wxUserInfo.nickName,
        avatarUrl: wxUserInfo.avatarUrl
      });
      app.globalData.authorizeFlag = true;
    }
  },

  loadCoupon: function () {
    var app = getApp();
    if (app.globalData.loginFlag == false) {
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    this.collect();
  },

  collect: function () {
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getCollect',
      data: {
        login_id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data != 0) {
          wx.navigateTo({
            url: '../collect/collect'
          });
        }else{
          wx.showModal({
            title: '收藏夹为空',
            content: '收藏夹为空!',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
              } 
            }
          });
          return;
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      }
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
    var app = getApp();
    if (app.globalData.loginFlag == true){
      this.setData({ phone: app.globalData.phone });
    }

    var wxUserInfo = wx.getStorageSync('wxUserInfo');
    if (wxUserInfo == "") {
      app.globalData.authorizeFlag = false;
    } else {
      this.setData({
        nickName: wxUserInfo.nickName,
        avatarUrl: wxUserInfo.avatarUrl
      });
      app.globalData.authorizeFlag = true;
    }
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