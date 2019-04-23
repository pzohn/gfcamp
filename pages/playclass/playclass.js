Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    title: '',
    currentTab: 0,

    // evaluationImgUrl: "https://s1.ax1x.com/2018/08/05/PDM8Bj.png",
    starCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQ0it.png",
    starUnCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQdII.png",

    starMap:[
      10,20,30,40,50,60,70,80,90,100
    ],

    evaluations: [
      {
        id: 0,
        name: "第1节：白垩纪恐龙杀手--达斯布雷龙",
        image: "https://s1.ax1x.com/2018/08/05/PDMaCV.png",
        star: 2,
        note: "20"
      },
      {
        id: 1,
        name: "第2节：身材娇小，也可以做头号杀手",
        image: "https://s1.ax1x.com/2018/08/05/PDMd3T.png",
        star: 3,
        note: "30"
      },
      {
        id: 2,
        name: "第3节：辣妈杀手--玛君龙",
        image: "https://s1.ax1x.com/2018/08/05/PDMN40.png",
        star: 5,
        note: "50"
      },
      {
        id: 3,
        name: "第4节：它才是恐龙的终极杀手",
        image: "https://s1.ax1x.com/2018/08/05/PDMN40.png",
        star: 10,
        note: "10"
      },
      {
        id: 4,
        name: "第5节：危机四伏的侏罗纪海洋",
        image: "https://s1.ax1x.com/2018/08/05/PDMN40.png",
        star: 0,
        note: "0"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 评分
   */
  chooseStar: function (e) {
    const index = e.currentTarget.dataset.index;
    const star = e.target.dataset.star;
    let evaluations = this.data.evaluations;
    let evaluation = evaluations[index];
    // console.log(evaluation)
    evaluation.star = star;
    evaluation.note = this.data.starMap[star - 1];
    this.setData({
      evaluations: evaluations
    })
  }
})