var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    account: '',
    password: '',
    array: []
  },

  register:function(){
    wx.redirectTo({
      url: '../registor/registor',
    })
  },

  login:function(){
    if (this.data.password == "")
    {
      wx.showModal({
        title: '错误提示',
        content: '密码不能为空!',
      });
      return;
    }
    var phone = this.data.account;
    var myThis = this;
    wx.request({
      url: 'https://www.hattonstar.com/user/save',
      data:{
        type:'select',
        PHONE: this.data.account,
        PASSWORD: this.data.password
      },
      method:'POST',
      success:function(res){
        if(res.data == 0){
          wx.showModal({
            title: '错误提示',
            content: '用户未注册,请注册!',
            confirmText: '注册',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../registor/registor',
                })
              }
            }
          })
        }
        else if (res.data == 1){
          wx.showModal({
            title: '错误提示',
            content: '密码错误,请重试！',
            confirmText: '找回密码',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../find/find?phone=' + phone,
                })
              }
            }
          }) 
        }
        else{
          if (res.data.PHONE != "")
          {
            var loginCode = res.data.PHONE;
            wx.setStorageSync('loginCode', loginCode);
            // wx.navigateBack({
            //   delta: 1
            // });
            if (app.globalData.goto_flag == 1){
              wx.navigateTo({
                url: '../record/record',
              })
            }
            else if (app.globalData.goto_flag == 2){
              wx.navigateTo({
                url: '../recordcard/recordcard',
              })
            }
          }
          else
          {
            wx.showModal({
              title: '错误提示',
              content: '服务器繁忙，请稍后再试!',
              showCancel: false
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success:function(res){
            if(res.confirm){
            }else if(res.cancel){
            }
          }
        })
      }
    })
  },

  find:function(e){
    wx.navigateTo({
      url: '../find/find',
    })
  },

  accountInput:function(e) {
    var content = e.detail.value;
    if(content != ''){
      this.setData({ disabled: false, account:content});
    }else{
      this.setData({ disabled: true});
    }
  },

  pwdBlur:function(e) {
    var password = e.detail.value;
    if(password != ''){
      this.setData({ password: password });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shareId = options.shareid;
    var app = getApp();
    if (shareId == undefined) {

    }
    else {
      app.globalData.shop_id = shareId;
    }
    var str = "" + options.q; var arr = str.split("3D");
    var shopID = arr[1];
    if (shopID == undefined)
    {
      
    }
    else
    {
      app.globalData.shopId = shopID;
    }
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