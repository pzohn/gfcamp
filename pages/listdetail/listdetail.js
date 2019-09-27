var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail_id: 0,
    activity_id: 0,
    address_id: 0,
    address_info: {}, //地址信息
    goods_info: [], //商品信息
    address_info: [],//地址信息
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
    type: ''
  },

  //  提交订单
  bindSubmitOrder: function (e) {
    if (this.data.type == 'trade') {
      this.dealTrade()
    } else if (this.data.type == 'cert') {
      this.dealCert();
    }
  },

  typeHandler: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var activity_id = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&activity_id=' + activity_id
    });
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
    console.log(app.globalData.listdetail);
    this.initAddr();
    this.initData();
  },

  initAddr() {
    var address_info = [];
    var object = new Object();
    if (app.globalData.listdetail.address) {
      object.name = app.globalData.listdetail.address.name;
      object.phone = app.globalData.listdetail.address.phone;
      object.province = app.globalData.listdetail.address.province;
      object.city = app.globalData.listdetail.address.city;
      object.area = app.globalData.listdetail.address.area;
      object.detail = app.globalData.listdetail.address.detail;
      address_info[0] = object;
      this.setData({
        address_info: address_info,
      });
    }
  },

  initData: function () {
    var goods_info = [];
    var total_price = 0;
    if (app.globalData.listdetail.count == 1){
      var object = new Object();
      object.title = app.globalData.listdetail.name
      object.price = app.globalData.listdetail.charge;
      object.image = app.globalData.listdetail.img;
      object.count = app.globalData.listdetail.num;
      object.id = app.globalData.listdetail.wx_id;
      object.activity_id = app.globalData.listdetail.activity_id;
      goods_info[0] = object;
      total_price = object.price * object.count;
    } else if (app.globalData.listdetail.count > 1){
      for (var index in app.globalData.listdetail.detail){
        var object = new Object();
        object.title = app.globalData.listdetail.detail[index].name
        object.price = app.globalData.listdetail.detail[index].charge;
        object.image = app.globalData.listdetail.detail[index].img;
        object.count = app.globalData.listdetail.detail[index].num;
        object.id = app.globalData.listdetail.detail[index].id;
        object.activity_id = app.globalData.listdetail.detail[index].activity_id;
        goods_info[index] = object;
        total_price += object.price * object.count;
      }
    }
    this.setData({
      goods_info: goods_info,
      total_price: total_price
    });
    
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