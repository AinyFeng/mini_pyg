// pages/category/index.js
import { request } from "../../request/index.js";
Page({
   /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    catesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList()
  },
  getCateList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  }
})