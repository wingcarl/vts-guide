var base64 = require("../images/base64");
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["VTS中心简介", "船位核对点", "航路判断"],
    open: { 'intro': false, 'tel': false,'ship': false},
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    list: [
      {
        id: 'form',
        name: '管理与服务区域',
        open: false,
        content:'十一圩河口与小李港河口联线至大河港河口与螃蜞港河口联线之间水域（长江#32浮至长江#58浮附近）和沪通长江大桥桥区施工水域（长江#32浮联线至长江36浮联线）'
      },
      {
        id: 'widget',
        name: '联系方式',
        open: false,
        content:'1.甚高频无线电话：VHF10频道\n2.有线电话：<view>0512-58330432</view>、0512-12395'
      },
      {
        id: 'widget',
        name: '辖区图',
        open: false,
        content: '辖区图'
      }

      ]
  },
  wxTel:function(){
     wx.makePhoneCall({
       phoneNumber: '0512-58330432',
     });
  },
  imagePreviewZjg:function(){
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['http://i1.bvimg.com/661178/23495ec82039fdd5.png'] // 需要预览的图片http链接列表
    })
  },
  onLoad: function () {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
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
  kindToggle: function (e) {
   
    var id = e.currentTarget.id, list = this.data.list;
    console.log(id);
    var op = this.data.open;
    op[id] = !this.data.open[id];
    console.log(op);
    this.setData({
      list: list,
      open:op
    });
  }
});
 