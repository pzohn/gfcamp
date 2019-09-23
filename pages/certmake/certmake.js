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
    goods_num: '', //商品数量
    hasAddr: false, //选项
    order_message: '', //订单留言
    cart_ids: [], // 购物车商品id
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

  //  提交订单
  bindSubmitOrder: function (e) {
    var page = this;
    wx.login({
      success: res => {
        var code = res.code;
        console.log(code);
        if (code) {
          wx.request({
            url: 'https://www.gfcamps.cn/onPay',
            data: {
              js_code: code,
              detail_id: page.data.activity_id,
              phone: app.globalData.phone
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
    var id = options.id;
    var activity_id = options.activity_id;
    var num = options.num;
    this.setData({
      detail_id: id,
      activity_id: activity_id,
      goods_count:num
    });
    this.initData(id, activity_id);
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