var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    account: '',
    password: '',
    array: []
  },

  register:function(){
    wx.navigateTo({
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
                wx.navigateTo({
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
            var app = getApp();
            app.globalData.id = res.data.ID;
            app.globalData.phone = res.data.PHONE;
            app.globalData.name = res.data.NAME;
            app.globalData.sex = res.data.SEX;
            app.globalData.age = res.data.AGE;
            app.globalData.father = res.data.FATHER;
            app.globalData.mother = res.data.MOTHER;
            app.globalData.address = res.data.ADDRESS;
            app.globalData.carddesc = res.data.CARDDESC;
            app.globalData.cardnum = res.data.CARDNUM;
            if (app.globalData.shop_id == 0){
              wx.navigateTo({
                url: '../information/information',
              })
            }else{
              myThis.group();
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
  accountInput:function(e) {
    var content = e.detail.value;
    if(content != ''){
      this.setData({ disabled: false, btnstate: "primary", account:content});
    }else{
      this.setData({ disabled: true, btnstate: "default"});
    }
  },

  find: function (e) {
    wx.navigateTo({
      url: '../find/find',
    })
  },

  getFoodandCar: function () {
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/getShopById',
      data: {
        id: app.globalData.shop_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.phone != "") {
          app.globalData.shop_food = res.data.food;
          app.globalData.shop_car = res.data.car;
          app.globalData.shop_phone = res.data.phone;
          app.globalData.shop_name = res.data.name;
          app.globalData.shop_user = res.data.user;
          var date = util.formatDate(new Date());
          if (date > res.data.share_date){
            wx.showModal({
              title: '错误提示',
              content: '小程序已过期,请联系团长',
              showCancel: false,
              success: function (res) {
                wx.redirectTo({
                  url: '../shopcallme/shopcallme',
                })
              }
            })
            return;
          }
          else{
            wx.redirectTo({
              url: '../shopchart/shopchart',
            })
          }
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应',
          success: function (res) {
          }
        })
        return;
      }
    })
  },

  group:function(){
    var app = getApp();
    var myThis = this;
    if (app.globalData.phone != '') {
      wx.request({
        url: 'https://www.hattonstar.com/getGroup',
        data: {
          phone: app.globalData.phone
        },
        method: 'POST',
        success: function (res) {
          if (res.data == 0) {
            myThis.getFoodandCar();
          }
          else {
            app.globalData.group_parent_num = res.data.parent_num;
            app.globalData.group_food_num = res.data.food_num;
            app.globalData.group_car_num = res.data.car_num;
            app.globalData.shop_name = res.data.name;
            app.globalData.group_class = res.data.group_class;
            myThis.getShare();
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '错误提示',
            content: '服务器无响应，请重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
          return;
        }
      })
    }
  },

  getShare:function(){
    var app = getApp();
    wx.request({
      url: 'https://www.hattonstar.com/getShopById',
      data: {
        id: app.globalData.shop_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.phone != "") {
          app.globalData.shop_name = res.data.name;
          app.globalData.share_date = res.data.share_date;
          app.globalData.shop_user = res.data.user;
          app.globalData.shop_phone = res.data.phone;
          wx.redirectTo({
            url: '../groupinfo/groupinfo',
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应',
          success: function (res) {
          }
        })
        return;
      }
    })
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