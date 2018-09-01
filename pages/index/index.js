import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var chart = null
var chartCj = null
var water = null
var widthL;
var heightL;
function initWater(canvas, width, height) {
  water = echarts.init(canvas, null, {
    width: widthL,
    height: heightL
  });
  canvas.setChart(water);

  var option = {
    title: {
      text: '水位潮汐查看',
      left: 'center'
    },
    legend: {
      data: ['港务集团水位','江阴潮汐','天生港潮汐'],
      top: 30,
      left: 'center',
      z: 100
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    }
  };

  water.setOption(option);
  return water;
}
function initChart(canvas, width, height) {
  widthL = width;
  heightL = height;
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '实时风速查看',
      left: 'center'
    },
    color: ["#37A2DA"],
    legend: {
      data: ['港务集团'],
      top: 50,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    }
  };

  chart.setOption(option);
  return chart;
}
function initCjChart(canvas, width, height) {
  chartCj = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartCj);

  var option = {
  
    color: ["#37A2DA"],
    legend: {
      data: ['长江防汛处'],
      top: 50,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    }
  };

  chartCj.setOption(option);
  return chartCj;
}
function getMin(y1,y2,y3){
  var min = y1[0]
  for(var i=0;i<y1.length;i++){
     if(y1[i]<min){
       min = y1[i]
     }
  }
  for (var i = 0; i < y2.length; i++) {
    if (y2[i] < min) {
      min = y2[i]
    }
  }
  for (var i = 0; i < y3.length; i++) {
    if (y3[i] < min) {
      min = y3[i]
    }
  }
  return min;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }, 
    eccj: {
      onInit: initCjChart
    },
    ecwater:{
      onInit: initWater
    },
    tabs: ["选项一", "风速", "水位"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onReady() {
    setTimeout(this.getData, 500);
  }, 
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    //console.log(e.currentTarget.id);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft, 
      activeIndex: e.currentTarget.id
    });
    
    //console.log(this)
    //this.getData("2")

   // setTimeout(this.getData(e.currentTarget.id), 500);

  },
  //getData方法里发送ajax
  getData() {
    wx.showLoading({
      title: '加载中...',
    })
      wx.request({
        url: 'http://140.143.26.197/api/show_wind',
        herder: {
          "content-type": "json"
        },
        success: function (res) {
          console.log(res);
          var data = res.data;
          var x = []
          var y = []
          for (var i = 0; i < data.length; i++) {
            x.push(data[i].x.substring(10, 16));
            y.push(data[i].y);
          }
          chart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: x,
              // show: false
            },
            series: [{
              name: '港务集团',
              type: 'line',
              smooth: true,
              data: y
            }]
          });
          console.log(chart)
          wx.hideLoading();
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
      }) 
      wx.request({
        url: 'http://140.143.26.197/api/show_wind_scrapy',
        herder: {
          "content-type": "json"
        },
        success: function (res) {
          console.log(res);
          var data = res.data;
          var x = []
          var y = []
          for (var i = 0; i < data.length; i++) {
            x.push(data[i].x.substring(10, 13));
            y.push(data[i].y);
          }

          chartCj.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: x,
              // show: false
            },
            series: [{
              name: '长江防汛处',
              type: 'line',
              smooth: true,
              data: y
            }]
          });
          wx.hideLoading();
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
      }) 

      var y1 = []
      wx.request({
        url: 'http://140.143.26.197/api/show_water',
        herder: {
          "content-type": "json"
        },
        success: function (res) {
          console.log(res);
          var data = res.data;
         
          for (var i = 0; i < data.length; i++) {
            y1.push(Number(data[i].y)*100);
          }
         
        
          wx.hideLoading();
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
      }) 
    wx.request({
      url: 'http://140.143.26.197/api/show_tide?type=jy',
      herder: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        var data = res.data;
        var x = []
        var y2 = []
        var y3 = []
        for (var i = 0; i < data.length; i++) {
          if(data[i].s == "1"){
            x.push(data[i].x.substring(10, 13));
            y2.push(data[i].y);
          }else{
            y3.push(data[i].y);
          }
        }
       console.log(y3)
        water.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x,
            // show: false
          },
          series: [{
            name: '港务集团水位',
            type: 'line',
            smooth: true,
            data: y1
          }, {
            name: '江阴潮汐',
            type: 'line',
            smooth: true,
            data: y2
            }, {
              name: '天生港潮汐',
              type: 'line',
              smooth: true,
              data: y3,
              z:100
            }],
          yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            min:getMin(y1,y2,y3)
            // show: false
          }
        });
        wx.hideLoading();
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    }) 

    }
    
  
});
