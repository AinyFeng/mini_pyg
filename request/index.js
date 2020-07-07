// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  return new Promise((resolve, reject) => {
    // 显示加载中效果
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    // 定义公共的url
    // url: https://api-hmugo-web.itheima.net/api/public/v1/categories
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 关闭正在等待的图标
          wx.hideLoading();
        }
      }
    });
  })
}