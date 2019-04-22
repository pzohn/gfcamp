// pages/videoplay/videoplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['精选', '自然科学', '文史艺术', '成长健康'],
    currentTab: 0,
    types: [
      {
        name: "深入了解昆虫大百科,锻炼孩子的观察力!",
        img: "https://www.hattonstar.com/movie/dongzuo.png",
        videoid: 236462
      },
      {
        name: "在家就能带孩子去宇宙遨游!",
        img: "https://www.hattonstar.com/movie/xiju.png",
        videoid: 239209
      },
      {
        name: "海洋知识大百科探索坤丽的海洋奇观!",
        img: "https://www.hattonstar.com/movie/aiqing.png",
        videoid: 237119
      },
      {
        name: "轻松掌握朗诵技巧,感受古诗韵律之美!",
        img: "https://www.hattonstar.com/movie/kehuan.png",
        videoid: 233124
      },
      {
        name: "穿梭到白垩纪和做逻辑,漫游奇妙恐龙王国!",
        img: "https://www.hattonstar.com/movie/donghua.png",
        videoid: 236697
      },
      {
        name: "一起去探索神秘王国,玩转迟到热带雨林!",
        img: "https://www.hattonstar.com/movie/jingsong.png",
        videoid: 236227
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  typeHandler(e) {
    let videoid = e.currentTarget.dataset.videoid
    wx.navigateTo({
      url: `../vedio_detail/vedio_detail?id=${videoid}`,
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