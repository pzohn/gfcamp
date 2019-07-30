var app = getApp()
Page({
  data: {
    isLike: true,
    price:0,
    detail_id:0,
    activity_id:0,
    iscollect: false,
    collect_url:'../../images/collect-0.png',
    // banner

    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    images: [
      "../../images/logo1.png",
      "../../images/logo2.png",
      "../../images/logo3.png",
      "../../images/logo4.png",
      "../../images/logo5.png",
      "../../images/logo1.png",
      "../../images/logo2.png",
      "../../images/logo3.png",
      "../../images/logo4.png",
      "../../images/logo5.png"
    ],
    joinnum: 16666,
    currentTab: 0,
    imgUrls: [],
    title: '',
    classInfo: [],
    listInfo: [],
    knowInfo: []
  },

  onLoad: function (options) {
    var loginCode = wx.getStorageSync('phone');
    if (loginCode == "") {
      app.globalData.loginFlag = false;
    } else {
      app.globalData.loginFlag = true;
      app.globalData.phone = loginCode;
    }
    var id = options.id;
    var activity_id = options.activity_id;
    this.setData({ 
      detail_id:id,
      activity_id: activity_id});
    this.initData(id,activity_id);
    this.initCollect();
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
        var imgUrls = [];
        for (var i in res.data.swiper_pics) {
          var object = new Object();
          object = 'https://www.gfcamps.cn/images/' + res.data.swiper_pics[i];
          imgUrls[i] = object;
        }
        var classInfo = [];
        for (var j in res.data.class_pics) {
          var object = new Object();
          object = 'https://www.gfcamps.cn/images/' + res.data.class_pics[j];
          classInfo[j] = object;
        }
        var listInfo = [];
        for (var k in res.data.list_pics) {
          var object = new Object();
          object = 'https://www.gfcamps.cn/images/' + res.data.list_pics[k];
          listInfo[k] = object;
        }
        var knowInfo = [];
        for (var l in res.data.know_pics) {
          var object = new Object();
          object = 'https://www.gfcamps.cn/images/' + res.data.know_pics[l];
          knowInfo[l] = object;
        }
        page.setData({
          title: res.data.name,
          imgUrls: imgUrls,
          classInfo: classInfo,
          listInfo: listInfo,
          knowInfo: knowInfo,
          price: res.data.charge
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
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  collect: function () {
    var page = this;
    if (page.isLogin()){
      wx.request({
        url: 'https://www.gfcamps.cn/collect',
        data: {
          phone: app.globalData.phone,
          detail_id: page.data.detail_id,
          collect_flag: !page.data.iscollect
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          page.setData({
            iscollect: res.data,
          });
          page.initCollectUrl();
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
    }
  },

  initCollect: function () {
    var page = this;
    wx.request({
      url: 'https://www.gfcamps.cn/iscollect',
      data: {
        phone: app.globalData.phone,
        detail_id: page.data.detail_id
      },
      method: 'POST',
      success: function (res) {
        page.setData({
          iscollect: res.data
        });
        page.initCollectUrl();
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

  // 立即购买
  immeBuy() {
    var page = this;
    if (this.isLogin()){
      wx.login({
        success: res => {
          var code = res.code;
          console.log(code);
          if (code){
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
    }
  },

  initCollectUrl() {
    if (this.data.iscollect == true){
      this.setData({ collect_url: '../../images/collect.png'})
    }else{
      this.setData({ collect_url: '../../images/collect-0.png' })
    }
  },

  isLogin() {
    if (app.globalData.loginFlag == false) {
      wx.showModal({
        title: '错误提示',
        content: '用户登录,请登录!',
        confirmText: '登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../phonelogin/phonelogin',
            })
          }
        }
      })
      return false;
    }
    return true;
  },

  home() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  }
})
