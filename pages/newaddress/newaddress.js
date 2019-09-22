//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: [],
    default_flag:false,
    name:'',
    phone:'',
    detail:''
  },

  onLoad: function (options) {
    var have = options.have;
    if (have == 0){
      this.setData({
        default_flag: true
      })
    }
    this.initRegion();
  },

  backAddress: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.gfcamps.cn/insertAddress',
      data: {
        login_id: app.globalData.login_id,
        name: page.data.name,
        phone: page.data.phone,
        province: page.data.region[0],
        city: page.data.region[1],
        area: page.data.region[2],
        detail: page.data.detail,
        default_flag: page.data.default_flag
      },
      method: 'POST',
      success: function (res) {
        wx.navigateTo({
          url: '../address/address'
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  accountInput: function (e) {
    if (e.currentTarget.id == 1){
      this.setData({ name: e.detail.value});
    } else if (e.currentTarget.id == 2) {
      this.setData({ phone: e.detail.value });
    } else if (e.currentTarget.id == 3) {
      this.setData({ detail: e.detail.value });
    }
  },

  initRegion: function () {
    var arry = [];
    var app = getApp();
    arry[0] = app.globalData.province;
    arry[1] = app.globalData.city;
    arry[2] = app.globalData.district;
    this.setData({region:arry});
  },

  switch2Change: function (e) {
    this.setData({
      default_flag: e.detail.value
    })
  },
})
