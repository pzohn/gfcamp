
var app = getApp();


Page({
  data: {
    current: 0,
    // 左侧菜单
    tabList: [
      { title: 'tab1', checked: true },
      { title: 'tab2', checked: false },
      { title: 'tab3', checked: false },
      { title: 'tab4', checked: false },
      { title: 'tab5', checked: false },
      { title: 'tab6', checked: false },

    ],
    // 右侧内容
    contList: [
      { cont: 'tab1' },
      { cont: 'tab2' },
      { cont: 'tab3' },
      { cont: 'tab4' },
      { cont: 'tab5' },
      { cont: 'tab6' },

    ],
  },

  // 循环切换
  forTab(index) {
    let lens = this.data.tabList.length;
    let _id = 't' + index;
    for (let i = 0; i < lens; i++) {
      this.data.tabList[i]['checked'] = false;
    }
    this.data.tabList[index]['checked'] = true;
    this.setData({
      tabList: this.data.tabList,
      toView: _id,
      current: index
    });
  },

  // 点击左侧菜单栏
  intoTab(e) {
    let lens = this.data.tabList.length;
    let _index = e.currentTarget.dataset.index;
    this.forTab(_index);
    let _id = 't' + _index;
    this.setData({
      toViewRt: _id
    });
  },

  // 滚动右侧菜单
  scrollRight(e) {
    //console.log(e)
    let _top = e.detail.scrollTop;
    let progress = parseInt(_top / this.data.ht); // 计算出 当前的下标
    if (progress > this.data.current) { // 向上拉动屏幕

      this.setData({ current: progress });
      this.forTab(this.data.current);
    } else if (progress == this.data.current) {
      return false;
    } else { // 向下拉动屏幕

      this.setData({
        current: progress == 0 ? 0 : progress--
      });
      this.forTab(progress);
    }
  },

  onLoad: function (options) {
    console.log(this.data.tabList)
    // 框架尺寸设置
    wx.getSystemInfo({
      success: (options) => {
        var wd = options.screenWidth; // 页面宽度
        var ht = options.windowHeight; // 页面高度
        this.setData({ wd: wd, ht: ht })
      }
    });
  },

  onShow: function () {
    // 初始化状态
    this.setData({
      toView: 't' + this.data.current,
      toViewRt: 't' + this.data.current
    })
  },

})
