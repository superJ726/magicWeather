//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    region: [],
    customItem: '全部',
    weatherData: ''
  },
  goToList: function () {
    var cityName = this.data.weatherData.today.city
    console.log(cityName)
    wx.navigateTo({
      url: '../list/list?cityName=' + cityName
    })
  },
  onLoad: function() {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var _that = _this;
        wx.request({
          url: 'https://v.juhe.cn/weather/geo?format=2&lon=' + longitude + '&lat=' + latitude + '&key=c429960c9ad0ff73bf31674034f10dfd',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.resultcode == 200) {
              _that.setData({
                weatherData: res.data.result,
                region: ['', res.data.result.today.city + '市','']
              })
            }
          }
        })
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      weatherData: ''
    })
    var s = e.detail.value[2]
    if(s == '全部'){
      s = e.detail.value[1]
    }else{
      s = e.detail.value[2]
    }
      s = s.substring(0, s.length - 1)
    var _this = this;
    wx.request({
      url: 'https://v.juhe.cn/weather/index?format=2&cityname=' + s + '&key=c429960c9ad0ff73bf31674034f10dfd',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.resultcode == 200) {
          _this.setData({
            weatherData: res.data.result
          })
        }
      }
    })
  }
})
