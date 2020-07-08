/**
 1. 获取用户的收货地址
   1. 绑定点击事件
   2. 调用小程序内置 api 获取用户的收货地址 chooseAddress, 如果用户选择了取消,下次再获取就没有反应
  2. 获取用户 对小程序 所授予 获取地址的 权限 状态 scope
      1. 假设 用户 点击获取收货地址的提示框 确定 authSetting  scope.address 
        scope 值 true   直接调用 获取收货地址
      2. 假设 用户 从来没有调用过 收货地址的 API
        scope undefined 直接调用 获取收货地址
      3. 假设 用户 点击获取收货地址的提示框 取消
        scope 值 false
        1. 诱导用户 自己 打开 授权设置页面 当用户重新给与 获取地址权限的时候
        2. 获取收货地址
 */
import {getSetting, chooseAddress, openSetting} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({
  // 点击收货地址
  async handleChooseAddress() {
    // console.log('点击了');
    // 获取收货地址
    // wx.chooseAddress({
    //   success: (result)=>{
    //     console.log(result);
    //   }
    // });

    // TODO 以下代码可以通过下面的代码封装的替代
    // 1. 获取 权限状态
    // wx.getSetting({
    //   success: (result)=>{
    //     // 2. 获取权限状态  主要发现一些 属性名很怪异的时候 都要使用[]形式来获取属性值
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           console.log(result1);
    //         }
    //       });
    //     }else {
    //       // 3. 用户 以前拒绝过授权权限 先诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result2)=>{
    //           // 4. 可以调用 收货地址代码
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //               console.log(result3);
    //             }
    //           });
    //         }
    //       });
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    // 1. 获取 权限状态
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    // 2. 判断 权限状态
    if (scopeAddress === true || scopeAddress === undefined) {
      // 3. 调用获取收货地址的 api
      const res2 = await chooseAddress();
    } else {
      // 4. 先诱导用户打开授权页面
      await openSetting();
      // 5. 调用获取收货地址的 api
      const res3 = await chooseAddress();
    }
    
  }
})