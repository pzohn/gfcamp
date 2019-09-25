var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail_id: 0,
    activity_id: 0,
    address_id:0,
    address_info: {}, //地址信息
    goods_info: [], //商品信息
    address_info:[],//地址信息
    goods_count: '', //商品件数
    goods_freight: '', //运费
    goods_price: '', //商品价格
    total_price: '', //合计价格
    item: {
      iconfontBack: "icon-arrowleft",
      navigationBarTitle: "确认订单",
      statusBarHeight: app.globalData.statusBarHeight
    },
    statusBarHeight: app.globalData.statusBarHeight,
    goods_id: '', //商品id
    hasAddr: false, //选项
    order_message: '', //订单留言
    cart_ids: [], // 购物车商品id
    type:''
  },
  //选择地址
  bindaddress: function () {
    if (this.data.hasAddr == 1) {
      wx.navigateTo({
        url: '../editaddress/editaddress?id=' + this.data.address_id + '&activity_id=' + this.data.activity_id + '&detail_id=' + this.data.detail_id
      })
    } else {
      wx.navigateTo({
        url: '../newaddress/newaddress?activity_id=' + this.data.activity_id + '&detail_id=' + this.data.detail_id
      })
    }


  },
  // 留言
  bindwaitMsg: function (event) {
    console.log(event.detail.value);
    this.setData({
      order_message: event.detail.value, // 订单留言
    })
  },

  deleteCert(id) {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/certdelete',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {

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
  //  提交订单
  bindSubmitOrder: function (e) {
    if (this.data.type == 'trade'){
      this.dealTrade()
    } else if (this.data.type == 'cert'){
      this.dealCert();
    }
  },

  delCerts(list) {
    for (var index in list) {
      var item = list[index];
      this.deleteCert(item.id);
    }
  },

  dealTrade() {
    var page = this;
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://www.gfcamps.cn/onPay',
            data: {
              js_code: code,
              detail_id: page.data.activity_id,
              phone: app.globalData.phone,
              num: page.data.goods_count,
              address_id: page.data.address_id
            },
            method: 'POST',
            success: function (res) {
              wx.requestPayment(
                {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 5000
                    });
                  },
                  'fail': function (res) {
                  },
                  'complete': function (res) {
                  }
                })
            },
            fail: function (res) {
            }
          })
        }
      }
    })
  },

  dealCert() {
    this.delCerts(app.globalData.certlist);

    var certInfo = '';
    for (var index in app.globalData.certlist) {
      certInfo += app.globalData.certlist[index].shoppingid + ',' + app.globalData.certlist[index].num;
      certInfo += '@';
    }
    certInfo = certInfo.substr(0, certInfo.length - 1);

    var page = this;
    var body = '';
    if (page.data.goods_info.length == 1){
      body = page.data.goods_info[0].title;
    } else if (page.data.goods_info.length > 1){
      body = page.data.goods_info[0].title + '...'
    }
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://www.gfcamps.cn/onPayForCert',
            data: {
              js_code: code,
              certInfo: certInfo,
              phone: app.globalData.phone,
              address_id: page.data.address_id,
              charge: page.data.total_price,
              body: body
            },
            method: 'POST',
            success: function (res) {
              wx.requestPayment(
                {
                  'timeStamp': res.data.timeStamp,
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 5000
                    });
                  },
                  'fail': function (res) {
                  },
                  'complete': function (res) {
                  }
                })
            },
            fail: function (res) {
            }
          })
        }
      }
    })
  },


  //返回上一页
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    if (type == 'trade'){
      var id = options.id;
      var activity_id = options.activity_id;
      var num = options.num;
      this.setData({
        detail_id: id,
        activity_id: activity_id,
        goods_count: num,
        type: type
      });
      this.initData(id, activity_id);
    }else if (type == 'cert'){
      this.initCert();
      this.setData({
        type: type
      });
    }
  },

  initData: function (id, activity_id) {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/makeTrades',
      data: {
        id: id,
        activity_id: activity_id,
        login_id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var goods_info = [];
        var object = new Object();
        object.title = res.data.name
        object.price = res.data.charge;
        object.image = 'https://www.gfcamps.cn/images/' + res.data.title_pic;
        object.count = page.data.goods_count;
        goods_info[0] = object;
        var total_price = object.price * page.data.goods_count;
        page.setData({
          goods_info: goods_info,
          total_price: total_price
        });
        if (res.data.address){
          var address_info = [];
          // for (var index in res.data.address) {
          //   var object = new Object();
          //   object.id = res.data.address[index].id;
          //   object.name = res.data.address[index].name;
          //   object.phone = res.data.address[index].phone;
          //   object.province = res.data.address[index].province;
          //   object.city = res.data.address[index].city;
          //   object.area = res.data.address[index].area;
          //   object.detail = res.data.address[index].detail;
          //   object.login_id = res.data.address[index].login_id;
          //   address_info[index] = object;
          // }
          var object = new Object();
          object.id = res.data.address.id;
          object.name = res.data.address.name;
          object.phone = res.data.address.phone;
          object.province = res.data.address.province;
          object.city = res.data.address.city;
          object.area = res.data.address.area;
          object.detail = res.data.address.detail;
          object.login_id = res.data.address.login_id;
          address_info[0] = object;
          page.setData({
            address_info: address_info,
            hasAddr: true,
            address_id: object.id
          });
          
        }else{
          page.setData({
            hasAddr: false
          });
        }
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

  initCert: function () {
    var page = this;
    var goods_info = [];
    var total_price = 0;
    for (var index in app.globalData.certlist){
      var object = new Object();
      object.title = app.globalData.certlist[index].title;
      object.price = app.globalData.certlist[index].price;
      object.image = app.globalData.certlist[index].image;
      object.count = app.globalData.certlist[index].num;
      goods_info[index] = object;
      total_price += object.price * object.count;
    }
    wx.request({
      url: 'https://www.gfcamps.cn/getAddress',
      data: {
        login_id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data) {
          var address_info = [];
          var object = new Object();
          object.id = res.data.id;
          object.name = res.data.name;
          object.phone = res.data.phone;
          object.province = res.data.province;
          object.city = res.data.city;
          object.area = res.data.area;
          object.detail = res.data.detail;
          object.login_id = res.data.login_id;
          address_info[0] = object;
          page.setData({
            address_info: address_info,
            hasAddr: true,
            address_id: object.id,
            goods_info: goods_info,
            total_price: total_price
          });

        } else {
          page.setData({
            hasAddr: false
          });
        }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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