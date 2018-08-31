import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '实时风速查看',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['港务集团', '长江防汛处'],
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
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
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
    },
    series: [{
      name: '港务集团',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '长江防汛处',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }]
  };

  chart.setOption(option);
  return chart;
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
    tabs: ["选项一", "风速", "选项三"],
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
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
        console.log("111")
        wx.hideLoading();
      },
      fail: function (res) { 
        console.log("222")
      },
      complete: function (res) {
        console.log("444")
      },
    })
  }
});
