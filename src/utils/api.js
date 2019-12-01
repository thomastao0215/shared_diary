import CONFIG from 'utils/config'
import _ from 'underscore'

const BASE_URL = CONFIG.baseUrl;
export const api = {
  "on_login": {
    desc: "用户登录",
    url: `${BASE_URL}v1/user/on_login/`,
    method: "post",
  },
  "info": {
    desc: "用户信息",
    url: `${BASE_URL}v1/user/info/`,
    method: "get",
  },
  "survey_info": {
    desc: "加载提交过了的问卷",
    url: `${BASE_URL}v1/user/survey/info/`,
    method: "get",
  },
  "survey_submit": {
    desc: "提交问卷",
    url: `${BASE_URL}v1/user/survey/submit/`,
    method: "post",
  },
  "get_coupon_for_subscribe": {
    desc: "购买会员时输入打折码",
    url: `${BASE_URL}v1/user/coupon_for_subscribe/get`,
    method: "get",
  },
  "subscribe_pay": {
    desc: "支付会员",
    url: `${BASE_URL}v1/user/subscribe/pay/`,
    method: "post",
  },
  "post_arrived": {
    desc: "确认收货",
    url: `${BASE_URL}v1/user/post_arrived/`,
    method: "post",
  },
  "order_box": {
    desc: "获取盒子信息",
    url: `${BASE_URL}v1/user/order/box/`,
    method: "get",
  },
  "pre_post_back": { // /api/v1/user/order/pre_post_back/:order_id
    desc: "预约寄回某产品",
    url: `${BASE_URL}v1/user/order/pre_post_back/`,
    method: "post",
  },
  "pre_post_back_cancel": {
    desc: "取消预约寄回某产品",
    url: `${BASE_URL}v1/user/order/pre_post_back_cancel/`,
    method: "post",
  },
  "order_update": { // /api/v1/user/order/update/:order_id
    desc: "修改盒子信息",
    url: `${BASE_URL}v1/user/order/update/`,
    method: "post",
  },
  "order_post_back": { // /user/order/post_back/:order_id/:product_id/
    desc: "寄回某产品",
    url: `${BASE_URL}v1/user/order/post_back/`,
    method: "post",
  },
  "order_post_back_cancel": { // /user/order/post_back_cancel/:order_id/:product_id/
    desc: "取消寄回",
    url: `${BASE_URL}v1/user/order/post_back_cancel/`,
    method: "post",
  },
  "order_pay": {
    desc: "支付盒子订单",
    url: `${BASE_URL}v1/user/order/pay/`,
    method: "post",
  },
  "order_feedback": {
    desc: "订单结束后反馈信息",
    url: `${BASE_URL}v1/user/order/feedback/:order_id/`,
    method: "post",
  },
  "coupon_list": {
    desc: "优惠券列表（我的钱包）",
    url: `${BASE_URL}v1/user/coupon/list/`,
    method: "get",
  },
  "coupon_exchange": {
    desc: "优惠码兑换成券",
    url: `${BASE_URL}v1/user/coupon/exchange/`,
    method: "post",
  },
  "address_list": {
    desc: "用户收件地址列表",
    url: `${BASE_URL}v1/user/address/list/`,
    method: "get",
  },
  "address_delete": {
    desc: "用户收件地址删除",
    url: `${BASE_URL}v1/user/address/delete/`,
    method: "post",
  },
  "address_create": {
    desc: "用户新增收件地址",
    url: `${BASE_URL}v1/user/address/create/`,
    method: "post",
  },
  "address_update": {
    desc: "用户编辑收件地址",
    url: `${BASE_URL}v1/user/address/update/`,
    method: "post",
  },
  "phone_send_sm": {
    desc: "用户发送手机验证码",
    url: `${BASE_URL}v1/user/phone/send_sm/`,
    method: "post",
  },
  "phone_bind": {
    desc: "用户绑定手机",
    url: `${BASE_URL}v1/user/phone/bind/`,
    method: "post",
  },
  "phone_unbind": {
    desc: "用户解绑手机",
    url: `${BASE_URL}v1/user/phone/unbind/`,
    method: "post",
  },
  "pay_nothing": {
    desc: "支付盒子空订单",
    url: `${BASE_URL}v1/user/order/pay_nothing/`,
    method: "post",
  }
}

export function request(options, data = {}) {
  options = _.clone(options);
  if (options.id !== undefined) { // 只要传入了id，自动在url结尾加上id
    options.url += String(options.id)
    delete options.id
  } else if (options.ids !== undefined) {
    options.ids.forEach(item => {
      options.url += (String(item) + '/')
    })
    delete options.ids
  }
  console.log(options)
  return new Promise((resolve, reject) => {
    const header = {
      'content-type': 'application/json',
    }
    const token = wx.getStorageSync('token')
    if(token){
      header['Auth-Token'] = token
    }
    wx.request({
      header,
      ...options,
      data,
      success(res) {
        if (res.data.status !== 200) {
          reject(res.data.error)
        }
        resolve(res.data.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}