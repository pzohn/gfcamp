//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: ['北京市','北京市','东城区'],
    name: '',
    phone: '',
    detail: '',
    detail_id: 0,
    activity_id: 0,
    address_id: 0,
  },

  onLoad: function (options) {
    var detail_id = options.detail_id;
    var id = options.id;
    var activity_id = options.activity_id;
    this.setData({
      detail_id: detail_id,
      activity_id: activity_id,
      address_id:id
    });
    this.initData(id);
  },

  saveAddress: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.gfcamps.cn/updateAddress',
      data: {
        id: page.data.address_id,
        name: page.data.name,
        phone: page.data.phone,
        province: page.data.region[0],
        city: page.data.region[1],
        area: page.data.region[2],
        detail: page.data.detail
      },
      method: 'POST',
      success: function (res) {
        wx.navigateTo({
          url: '../certmake/certmake?id=' + page.data.detail_id + '&activity_id=' + page.data.activity_id
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

  delAddress: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.gfcamps.cn/delAddress',
      data: {
        id: page.data.address_id
      },
      method: 'POST',
      success: function (res) {
        wx.navigateTo({
          url: '../certmake/certmake?id=' + page.data.detail_id + '&activity_id=' + page.data.activity_id
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
    if (e.currentTarget.id == 1) {
      this.setData({ name: e.detail.value });
    } else if (e.currentTarget.id == 2) {
      this.setData({ phone: e.detail.value });
    } else if (e.currentTarget.id == 3) {
      this.setData({ detail: e.detail.value });
    }
  },

  initData: function (id) {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.gfcamps.cn/getAddressById',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        var region = [];
        region[0] = res.data.province;
        region[1] = res.data.city;
        region[2] = res.data.area;
        page.setData({ 
          name: res.data.name,
          phone: res.data.phone,
          detail: res.data.detail,
          region: region,
          id:id
         });
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
})
