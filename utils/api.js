var app = getApp()
// var config = 'http://localhost:3000'
var config = 'https://wanglian.leanapp.cn'
module.exports = {
  // 获取分类英雄
  getHeros: function (herotype, callback) {
    // 先从app中读取
    let result = this.filterHero(herotype, app.globalData.heros)
    if (result.length > 0) {
      callback(result)
    } else {
      //再没有才从网络中读取
      wx.request({
        url: config + '/king?type=heros&herotype=' + herotype,
        success: function (data) {
          callback(data.data)
          // 存入到app全局
          app.globalData.heros = app.globalData.heros.concat(data.data)
        },
        fail: function (err) {
          callback([])
        }
      })
    }
  },
  // 过滤不符合条件的英雄
  filterHero(herotype, heros) {
    let result = []
    result = heros.filter((hero) => {
      return hero.hero_type === herotype
    })
    return result
  },
  // 获取周免英雄
  getWeekfreeHeros(callback) {
    // 从app中获取
    let heros = app.globalData.weekfreeHeros
    if (heros.length > 0) {
      callback(heros)
    } else {
      wx.request({
        url: config + `/king?type=heros&herotype=weekfree`,
        success(data) {
          callback(data.data)
          // 存入app
          app.globalData.weekfreeHeros = data.data
        }
      })
    }
  },
  // 获取热门英雄
  getHotHeros(callback) {
    wx.request({
      url: config + `/king?type=hotheros`,
      success(data) {
        callback(data.data)
      }
    })
  },
  // 获取最新英雄
  getNewsHeros() {

  },
  // 根据英雄id来获取英雄详情信息
  getHeroDetail: function (hero_id, callback) {
    // 先从app获取
    let heroDetails = app.globalData.heroDetails
    let hero = this.filteHeroDetail(hero_id, heroDetails)
    if (hero.name) {
      callback(hero)
    } else {
      // 再从网络获取
      wx.request({
        url: config + '/king?type=herodetail&heroid=' + hero_id,
        success: function (data) {
          callback(data.data)
          // 存入到app全局
          app.globalData.heroDetails = app.globalData.heroDetails.concat(data.data)
        },
        fail() {
          callback([])
        }
      })
    }
  },
  filteHeroDetail(hero_id, heroDetails) {
    let result = []
    result = heroDetails.filter((hero) => {
      return hero.hero_id == hero_id
    })
    if (result.length === 0) {
      return {}
    }
    return result[0]
  },
  // 根据装备的type来获取装备信息
  getEquipments: function (item_type, callback) {
    // 看app.js中的equipments中是否存在要查询的数据
    let equips = app.globalData.equips
    equips = this.filterEquips(item_type, equips)
    // 如果内存中存在，就直接取出来
    if (equips.length > 0) {
      callback(equips)
    } else {
      //本地缓存中不存在，就从网络中读取
      wx.request({
        url: config + '/king?type=equip&item_type=' + item_type,
        success: function (data) {
          callback(data.data)
          // 存入到app全局
          app.globalData.equips = app.globalData.equips.concat(data.data)
        },
        fail: function (err) {
          callback([])
        }
      })
    }
  },
  filterEquips(item_type, equips) {
    let result = []
    result = equips.filter((item) => {
      return item.item_type == item_type
    })
    return result
  },
  // 获取单条装备数据
  getEquipment(item_id, callback) {
    // 先从app中获取
    let equips = app.globalData.equips
    let equip = this.filterEquip(item_id, equips)
    if (equip.item_name) {
      callback(equip)
    } else {
      // 从本地缓存获取
      let equips = wx.getStorageSync('equips').equips || []
      let equip = this.filterEquip(item_id, equips)
      if (equip.item_id) {
        callback(equip)
      } else {
        // 其次是网络
        wx.request({
          url: config + '/king?type=oneequip&item_id=' + item_id,
          success(data) {
            callback(data.data)
            // 存入app
            app.globalData.equips = app.globalData.equips.concat(data.data)
          },
          fail() {
            callback(null)
          }
        })
      }
    }
  },
  filterEquip(eid, equips) {
    let result = []
    result = equips.filter((item) => {
      return item.item_id == eid
    })
    if (result.length === 0) {
      return {}
    }
    return result[0]
  },
  // 根据颜色，等级获取铭文信息
  getMings(color, grade, callback) {
    // 先从app全局数据中获取
    let mings = this.filterMings(color, grade, app.globalData.mings)
    if (mings.length > 0) {
      console.log('从全局中获取', mings)
      callback(mings)
    } else {
      // storage中没有就从网络中获取
      wx.request({
        url: config + `/king?type=mingwen&color=${color}&grade=${grade}`,
        success: function (data) {
          callback(data.data)
          // 存入app.js全局
          app.globalData.mings = app.globalData.mings.concat(data.data)
        },
        fail: function (err) {
          callback(err)
        }
      })
    }
  },
  filterMings(color, grade, mings) {
    let result = []
    result = mings.filter((ming) => {
      return ming.ming_type == color && ming.ming_grade == grade
    })
    if (result.length === 0) {
      return []
    }
    return result
  },
  // 获取术语信息
  getTerminologys(callback) {
    // 从app中获取
    let terminologys = app.globalData.terminologys
    if (terminologys.length > 0) {
      callback(terminologys)
    } else {
      wx.request({
        url: config + `/king?type=terminology`,
        success(data) {
          callback(data.data)
          // 存入全局
          app.globalData.terminologys = data.data
        },
        fail(err) {
          callback(err)
        }
      })
    }
  },
  // 获取视频
  getVideos(videotype, callback) {
    //从app中取
    let videos = app.globalData.videos
    if(videos.length > 0) {
      callback(videos)
    } else {
      wx.request({
        url: config + `/king?type=videos&videotype=${videotype}`,
        success(data) {
          callback(data.data)
          // 存入全局
          app.globalData.videos = data.data
        },
        fail(err) {
          callback(err)
        }
      })
    }
  },
  // 获取视频详情
  getVideoDetail(id,callback){
    wx.request({
      url: config + `/king?type=videodetail&id=${id}`,
      success(data) {
        callback(data.data)
      }
    })
  }
}