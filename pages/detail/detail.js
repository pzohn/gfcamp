Page({
  data: {
    isLike: true,
    // banner
    imgUrls: [
      "http://image.360kad.com/group2/M00/AF/3A/CgAgFFy5ciCAZKE_AAFoOcMlBao349.jpg",
      "../../images/1.jpg",
      "../../images/2.jpg"
    ],
    title: "这里有孩子们最好奇、最想了解的自热及人文科学，让孩子在探索世界谜题中开拓视野，让想象力无限释放！",
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
    currentTab: 0
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
