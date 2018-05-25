// list.js
//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    customItem: '全部',
    weatherData: '',
    cityName:''
  },
  onLoad: function (options) {
    console.log(options) 
    this.setData({
      cityName: options.cityName
    })
    var _this = this;
    wx.request({
      url: 'https://v.juhe.cn/weather/index?format=2&cityname=' + options.cityName + '&key=c429960c9ad0ff73bf31674034f10dfd',
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
  },
})

