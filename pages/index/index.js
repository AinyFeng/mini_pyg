// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    catesList: [],
    // 楼层数组
    floorList: []
  },
  // 页面开始加载 就会触发
  onLoad: function(options){
    // 1. 发送异步请求获取轮播图数据  优化的手段可以通过es6的promise来解决这个问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   // url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log('结果', result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })    
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图的数据
  getSwiperList() {
    request({url: "/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList() {
    request({url: "/home/catitems"})
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({url: "/home/floordata"})
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  },
  
});