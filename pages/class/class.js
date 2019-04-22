Page({
  data: {
    isLike: true,
    // banner
    imgUrls: [
      "http://image.360kad.com/group2/M00/AF/3A/CgAgFFy5ciCAZKE_AAFoOcMlBao349.jpg",
      "../../images/1.jpg",
      "../../images/2.jpg",
      "../../images/3.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "https://www.hattonstar.com/card/1.jpg",
      "https://www.hattonstar.com/card/2.jpg",
      "https://www.hattonstar.com/card/3.jpg",
      "https://www.hattonstar.com/card/4.jpg",
      "https://www.hattonstar.com/card/5.jpg",
      "https://www.hattonstar.com/card/6.jpg",
    ],
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
})
