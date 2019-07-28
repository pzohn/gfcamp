var app = getApp()
Page({
  data: {
    activity: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var id = options.type;
    page.initData(id);
  },

  initData: function (id) {
    var page = this;
    var url = '';
    if (id == 1){
      url = 'https://www.gfcamps.cn/getOrderAll'
    } else if (id == 2){
      url = 'https://www.gfcamps.cn/getOrderUnPay'
    } else if (id == 3) {
      url = 'https://www.gfcamps.cn/getOrderUnUse'
    } else if (id == 4) {
      url = 'https://www.gfcamps.cn/getOrderUse'
    } 
    wx.request({
      url: url,
      data: {
        phone: app.globalData.phone
      },
      method: 'POST',
      success: function (res) {
        var activity = [];
        for (var index in res.data) {
          var object = new Object();
          object.img = 'https://www.gfcamps.cn/images/' + res.data[index].title_pic;
          object.name = res.data[index].name;
          object.out_trade_no = res.data[index].out_trade_no;
          object.status = res.data[index].status;
          object.date = res.data[index].date;
          object.color = res.data[index].color;
          if (object.status == '未支付'){
            object.payhide = false;
            object.deletehide = false;
          }else{
            object.payhide = true;
            object.deletehide = true;
          }
          activity[index] = object;
        }
        page.setData({
          activity: activity
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
  onShow: function () {
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