import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var chart = null
var chartCj = null
var chartDirect = null
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
var op = {};
function initDirectChart(canvas, width, height) {
  chartDirect = echarts.init(canvas, null, {
    width: width,
    height: height-20
  });
  canvas.setChart(chartDirect);
  op = {
    
    tooltip: {
      show: true,
      backgroundColor: '#fff',
      borderColor: '#f60',
      borderWidth: '1px',
      textStyle: {
        color: '#333'
      },
      formatter: function (param) {
        if (param.seriesIndex == 2) {
          return '<em style="color:' + param.color + ';">当前风向:' + param.value + '</em> °'
        }
        if (param.seriesIndex == 3) {
          return '<em style="color:' + param.color + ';">当前风速:' + param.value + '</em> m/s'
        }
      }
    },
    series: [{
      name: '',
      type: 'gauge',
      radius: '83%',
      min: 0,
      max: 360,
      startAngle: 90,
      endAngle: 449.9,
      splitNumber: 0,
      axisLine: {
        lineStyle: {
          color: [
            [0.5, '#ccc'],
            [1, '#ccc']
          ],
          width: 4
        }
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      }
    }, {
      type: 'gauge',
      radius: '80%',
      splitNumber: 1,
      min: 0,   
      max: 360,  
      startAngle: 90,
      endAngle: 449.9,
      axisLine: {
        show: false,
        lineStyle: {
          width: 2,
          shadowBlur: 0,
          color: [
            [1, '#8f8f8f']
          ]
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#8f8f8f',
          width: 1
        },
        length: '-2%',
        splitNumber: 60
      },
      splitLine: {
        show: true,
        length: 12,
        lineStyle: {
          color: '#8f8f8f',
        }
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      }
    }, {
      name: '',
      type: 'gauge',
      min: 0,
      max: 360,
      startAngle: 90,
      endAngle: -269.9999,
      radius: '80%',
      splitNumber: 12,
      axisLine: {
        lineStyle: {
          width: 5,
          shadowBlur: 0,
          color: [
            [0.25, '#DDBD4D'],
            [0.5, '#E43F3D'],
            [0.75, '#7CBB55'],
            [1, '#9CD6CE']
          ]
        }
      },
      axisTick: {
        show: true,
        splitNumber: 1
      },
      splitLine: {
        length: 10,
        lineStyle: {
          width: 2
        }
      },
      axisLabel: {
        formatter: function (e) {
          switch (e + "") {
            case "0":
              return "正北";
            case "360":
              return "正北";
            case "180":
              return "正南";
            case "90":
              return "正东";
            case "270":
              return "正西";
            default:
              return e;
          }
        },
        textStyle: {
          fontSize: 12,
          fontWeight: ""
        }
      },
      pointer: {
        show: true,
      },
      detail: {
        formatter: function (param) {
          var level = '';
          if (param > 0 && param < 90) {
            level = '东北'
          } else if (param > 90 && param < 180) {
            level = '东南'
          } else if (param > 180 && param < 270) {
            level = '西南'
          } else if (param > 270 && param < 360) {
            level = '西北'
          } else if (param == 360) {
            level = '正北'
          } else if (param == 270) {
            level = '正西'
          } else if (param == 90) {
            level = '正东'
          } else if (param == 180) {
            level = '正南'
          }
          return "当前风向:" + level + "(" + param + "°)";
        },
        offsetCenter: [0, 140],
        textStyle: {
          fontSize: 22
        }
      },
      data: [{
        value: 279,
        name: ''
      }]
    }, {
      name: '风速',
      type: 'gauge',
      center: ['60%', '35%'],
      radius: '22%',
      min: 0,
      max: 60,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 12,
      animation: 0,
      pointer: {
        show: 1,
        length: '60%',
        width: 3
      },
      itemStyle: {
        normal: {
          color: '#00b0b0',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      },
      axisLine: {
        lineStyle: {
          color: [
            [1, '#337ab7']
          ],
          width: 6
        }
      },
      splitLine: {
        show: 1,
        length: 6,
        lineStyle: {
          width: 1
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: 1,
        distance: 1,
        textStyle: {
          color: '#0000ff'
        },
        formatter: function (t) {
          switch (t + '') {
            case '10':
              return '10';
            case '20':
              return '20';
            case '30':
              return '30';
            case '40':
              return '40';
            case '50':
              return '50';
            case '60':
              return '60';
          }
        }
      },
      detail: {
        formatter: function (param) {
          return "当前风速:" + param + "m/s";
        },
        offsetCenter: [0, 60],
        textStyle: {
          fontSize: 12
        }
      },
      data: [{
        value: 3.2,
        name: ''
      }]
    }]
  };

  chartDirect.setOption(op);
  return chartDirect;
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
    direction:{
      onInit:initDirectChart
    },
    weather:{
    },
    tabs: ["本地天气", "风速风向", "水位潮汐"],
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
         // console.log(res);
          var data = res.data;
          var x = []
          var y = []
          var len = data.length;
          var z = data[len-1].z;
          var yt = data[len-1].y;
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
          op.series[2].data[0].value = z;
          op.series[3].data[0].value = yt;
          chartDirect.setOption(op);
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
         // console.log(res);
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
          //console.log(res);
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
        //console.log(res);
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
       //console.log(y3)
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
    var th = this;
    wx.request({
      url: 'http://140.143.26.197/api/show_weather',
      herder: {
        "content-type": "json"
      },
      success: function (res) {
        var we = res.data[0].value;
       // console.log(we)
        //console.log(res)
        th.setData({
          weather:we
        })
        wx.hideLoading();
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    }) 
    }
    
  
});
