
import { request } from "../../request/index.js";
import regenratorRuntime from '../../lib/runtime/runtime';
import {login} from "../../utils/asyncWx.js";
Page({
  // 授权获取用户信息
  async handleGetUserInfo(e) {
   try {
    // 1. 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 2. 获取小程序登录成功后的code
    const {code } =await login();
    const loginParams = { encryptedData, rawData, iv, signature };
    // 3. 发送请求 获取用户的token
    const {token } = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
    // 4. 把token存入缓存中 同事跳转回上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
   } catch (error) {
     console.log(error);
   }
  }
})