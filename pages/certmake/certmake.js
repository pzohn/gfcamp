var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail_id: 0,
    activity_id: 0,
    address_info: {}, //地址信息
    goods_info: [], //商品信息
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
    goods_num: '', //商品数量
    hasAddr: false, //选项
    order_message: '', //订单留言
    cart_ids: [], // 购物车商品id
  },
  //选择地址
  bindaddress: function () {
    if (this.data.hasAddr == 1) {
      wx.navigateTo({
        url: '../editaddress/editaddress'
      })
    } else {
      wx.navigateTo({
        url: '../newaddress/newaddress'
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


  /**
   * 支付订单
   */
  payOrder: function (orderHash, order_id) {
    var that = this;
    var order_hash = orderHash;
    console.log(order_hash)
    //呼起微信支付
    MBC.Ajax({
      url: api.getPayConfig,
      is_login: true,
      data: {
        hash: order_hash,
        platform: 'miniProgram',
        channel: 'weixin'
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.result.parameters.timeStamp,
          'nonceStr': res.result.parameters.nonceStr,
          'package': res.result.parameters.package,
          'signType': 'MD5',
          'paySign': res.result.parameters.paySign,
          'success': function (res) {
            console.log(res);
            MBC.Ajax({
              url: api.payOrder,
              is_login: true,
              data: {
                hash: order_hash
              },
              success: function (res) {
                console.log(res)
                var status = res.result.status;
                if (status == 2) {
                  wx.showToast({
                    title: '支付成功',
                  });
                  wx.redirectTo({
                    url: '../orderInfo/orderInfo?order_id=' + order_id,
                  })

                } else {
                  wx.showToast({
                    title: '支付失败，请稍后刷新',
                  })
                }

              }
            })
          },
          'fail': function (res) {
            console.log(res);
            wx.redirectTo({
              url: '../orderInfo/orderInfo?order_id=' + order_id,
            })
          }
        })
      }
    })

  },
  //  提交订单
  bindSubmitOrder: function (e) {
    var form_id = e.detail.formId;
    var that = this;
    var type = this.data.type;
    if (type == 1) {
      MBC.Ajax({
        url: api.submit,
        is_login: true,
        data: {
          form_id: form_id,
          order_message: this.data.order_message, //地址信息
          address_id: this.data.address_info.address_id, //地址id
          receiver_name: this.data.address_info.receiver_name, //收件人姓名
          receiver_phone: this.data.address_info.receiver_phone, //收件手机号
          receiver_city: this.data.address_info.city, //收件城市
          receiver_address_details: this.data.address_info.detail_address, //收件详细地址
          type: this.data.type, //选项
          goods_id: this.data.goods_id, //商品id
          goods_num: this.data.goods_num, //商品数量
        },
        success: function (res) {
          that.payOrder(res.result.hash, res.result.order_id);
        },
        fail: function (res) {

        }
      })
    } else if (type == 2) {
      MBC.Ajax({
        url: api.submit,
        is_login: true,
        data: {
          form_id: form_id,
          order_message: this.data.order_message, //地址信息
          address_id: this.data.address_info.address_id, //地址id
          receiver_name: this.data.address_info.receiver_name, //收件人姓名
          receiver_phone: this.data.address_info.receiver_phone, //收件手机号
          receiver_city: this.data.address_info.city, //收件城市
          receiver_address_details: this.data.address_info.detail_address, //收件详细地址
          type: this.data.type, //选项
          cart_ids: this.data.cart_ids, //购物车id
        },
        success: function (res) {
          that.payOrder(res.result.hash, res.result.order_id);
        },
        fail: function (res) {

        }
      })
    }

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
    var id = options.id;
    var activity_id = options.activity_id;
    this.setData({
      detail_id: id,
      activity_id: activity_id
    });
    this.initData(id, activity_id);
  },

  initData: function (id, activity_id) {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/getWxInfoById',
      data: {
        id: id,
        activity_id: activity_id
      },
      method: 'POST',
      success: function (res) {
        var goods_info = [];
        var object = new Object();
        object.title = res.data.name;
        object.price = res.data.charge;
        object.image = 'https://www.gfcamps.cn/images/' + res.data.title_pic;
        goods_info[0] = object;
        page.setData({
          goods_info: goods_info
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    var goods_id = that.data.goods_id;
    var goods_num = that.data.goods_num;
    var type = that.data.type;
    var cart_ids = that.data.cart_ids;
    console.log(that.data.address_id);
    // if (type == 1) {

    // } else if (type == 2) {

    // }
    if (that.data.address_id) {
      // 获取指定地址信息
      MBC.Ajax({
        url: api.getOne,
        is_login: true,
        data: {
          address_id: that.data.address_id
        },
        success: function (res) {
          that.setData({
            address_info: res.result.address_info
          })
        },
        fail: function (res) {

        }
      })
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