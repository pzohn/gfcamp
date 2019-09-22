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
    interval: 6000, //自动切换时间间隔,3s
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
    knowInfo: [],


    showModalStatus: false,//是否显示
    gg_image:'',
    gg_txt:'默认规格',
    gg_id: '默认规格',//规格ID
    // guigeList: [{ guige: '100', price: '150' }, { guige: '200', price: '150' }, { guige: '300', price: '150' }],
    guigeList: [{ guige: '默认规格', price: '0' }],
    num: 1,//初始数量
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
        console.log(res);
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
          price: res.data.charge,
          gg_image: 'https://www.gfcamps.cn/images/' + res.data.title_pic
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
    this.setData({ showModalStatus:true})
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

  buttonOk() {
    var page = this;
    wx.navigateTo({
      url: '../certmake/certmake?id=' + page.data.id + '&activity_id=' + page.data.activity_id
    })
    return
    var page = this;
    if (this.isLogin()) {
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
    }
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
  },

  filter: function (e) {
    //console.log(e);
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, price = e.currentTarget.dataset.price
    self.setData({
      gg_id: id,
      gg_txt: txt,
      gg_price: price
    });
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
})
