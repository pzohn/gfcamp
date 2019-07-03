Page({
  data: {
    isLike: true,
    price:0,
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
    console.log(options);
    var id = options.id;
    var activity_id = options.activity_id;
    this.initData(id,activity_id);
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
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
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
