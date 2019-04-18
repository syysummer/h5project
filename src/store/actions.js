import Vue from 'vue'
import axios from '../axiosPath'

export default {
  // 店铺首页
  shop_information({
    commit
  }, obj) {
    return axios.post('/openservice/getSellerInfo', obj);
  },
  // 首页首单立减活动弹窗
  firstFullReductionOne({
    commit
  }, obj) {
    return axios.post('openService/firstFullReductionOne', obj);
  },
  // 店铺菜单
  shop_menu({
    commit
  }, obj) {
    return axios.post('/openservice/getSellerGoods', obj);
  },
  //店铺资质
  shop_aptitude({
    commit
  }, obj) {
    return axios.post('/openservice/getSellerSaterial', obj);
  },
  //店铺评论
  shop_comment({
    commit
  }, obj) {
    return axios.post('/openservice/getOrderCommentInfo', obj);
  },
  //店铺评论列表；
  comment_list({
    commit
  }, obj) {
    return axios.post('/openservice/getOrderCommentListPage', obj);
  },
  // 商家列表
  seller_list_sort({
    commit
  }, obj) {
    return axios.post('/openservice/getSortSellerListPage', obj);
  },

  // 首页商家分类
  inde_seller_label({
    commit
  }, obj) {
    return axios.post('/openservice/getIndexSellerLabel', obj);
  },
  // 店铺商品添加购物车
  addGoodsCart({
    commit
  }, obj) {
    return axios.post('/innerService/addGoodsCart', obj);
  },
  // 店铺购物车列表
  get_GoodsCart({
    commit
  }, obj) {
    return axios.get('/innerService/getGoodsCart', obj);
  },
  // 店铺优惠劵
  get_SellerActivity({
    commit
  }, obj) {
    return axios.post('/openservice/getSellerActivity', obj);
  },
  // 领取店铺优惠劵
  collect_Coupon({
    commit
  }, obj) {
    return axios.post('/innerservice/collectCoupon', obj);
  },
  // 购物车商品数量
  getGoodsCartCount({
    commit
  }, obj) {
    return axios.get('/innerService/getGoodsCartCount', obj);
  },
  // 购物车商品数量
  deleteGoodsCart({
    commit
  }, obj) {
    return axios.get('/innerService/deleteGoodsCart', obj);
  },
  //购物车批量添加商品接口
  batchAddGoodsCart({
    commit
  }, obj) {
    return axios.post('/innerService/batchAddGoodsCart', obj);
  },
  //商品搜索
  searchForGoods({
    commit
  }, obj) {
    return axios.post('/openservice/searchForGoods', obj);
  },

  // 获取图片验证码
  // 检验是否需要图片验证码
  checkImgApi({
    commit
  }, obj) {
    return axios.post('/openService/getCaptchaImageFlag', obj)
  },
  // 获取图形验证码
  getCode({
    commit
  }, obj) {
    return axios.post('/openService/getCaptchaImage', obj, {
        responseType: 'arraybuffer'
      })
      .then(response => new Buffer(response.data, 'binary').toString('base64'))
      .then(data => {
        return 'data:image/png;base64,' + data
      });
  },
  // 获取qiniu token
  qiniuTokenApi({
    commit
  }, obj) {
    return axios.post('/openservice/getImgToken', obj)
  },

  // 登录接口
  loginApi({
    commit
  }, obj) {
    return axios.post('/openService/login', obj)
  },
  // 登出
  logoutApi({
    commit
  }, obj) {
    return axios.post('/openService/logout', obj)
  },
  // 获取短信验证码
  phoneCodeApi({
    commit
  }, obj) {
    return axios.post('/openService/getPhoneVcode', obj)
  },
  // 注册
  registerApi({
    commit
  }, obj) {
    return axios.post('/openService/mobileRegister', obj)
  },
  // 校验短信验证码(手机注册模块)
  checkCodeApi({
    commit
  }, obj) {
    return axios.post('/openService/checkPhoneRegVcode', obj)
  },
  // 校验短信验证码(忘记模块)
  checkCodeRegApi({
    commit
  }, obj) {
    return axios.post('/openService/checkPhoneVcode', obj)
  },
  // 忘记模块
  forgetPassApi({
    commit
  }, obj) {
    return axios.post('/openService/resetPassword', obj)
  },
  // 个人中心
  userInfoApi({
    commit
  }, obj) {
    return axios.post('/innerService/userinfo', obj)
  },
  // 我的余额
  myBalanceApi({
    commit
  }, obj) {
    return axios.post('/innerService/userAccountBalance', obj)
  },
  // 交易列表
  balanceDetailApi({
    commit
  }, obj) {
    return axios.post('/innerService/balanceLog', obj)
  },
  // 意见反馈
  feedbackApi({
    commit
  }, obj) {
    return axios.post('/innerService/userInsertFeedback', obj)
  },
  // 我的评价
  evaluateApi({
    commit
  }, obj) {
    return axios.post('/innerService/userComment', obj)
  },
  // 删除我的评价
  delEvaluateApi({
    commit
  }, obj) {
    return axios.post('/innerService/deleteUserComment', obj)
  },
  // 设置修改登录密码
  modifyPassApi({
    commit
  }, obj) {
    return axios.post('/innerService/ChangeThePassword', obj)
  },
  // 设置修改支付密码
  modifyPayPassApi({
    commit
  }, obj) {
    return axios.post('/innerService/ChangeThePayPassword', obj)
  },
  // 商家入驻
  merchantApi({
    commit
  }, obj) {
    return axios.post('/openService/saveSellerEntry', obj)
  },

  // 骑手招募——我要加入
  deliveryRecruitApi({
    commit
  }, obj) {
    return axios.post('/openService/deliveryRecruit', obj)
  },
  // 骑手招募——提交
  saveDeliveryInfoApi({
    commit
  }, obj) {
    return axios.post('/openService/saveDeliveryInfo', obj)
  },

  /**
   * 地址相关接口
   *
   */
  // 获取省份
  getAreaRegionList({
    commit
  }, obj) {
    return axios.post('/openService/getAreaRegionList', obj)
  },

  // 获取市级
  getAreaCityList({
    commit
  }, obj) {
    return axios.post('/openService/getAreaCityList', obj)
  },

  // 添加地址

  insertReceivingAddress({
    commit
  }, obj) {
    return axios.post('/innerService/insertReceivingAddress', obj)
  },

  // 编辑用户地址

  updateReceivingAddress({
    commit
  }, obj) {
    return axios.post('/innerService/updateReceivingAddress', obj)
  },

  // 删除收货地址

  deleteReceivingAddress({
    commit
  }, obj) {
    return axios.post('/innerService/deleteReceivingAddress', obj)
  },

  // 获取用户地址

  getReceivingAddress({
    commit
  }, obj) {
    return axios.post('/innerService/getReceivingAddress', obj)
  },

  /**
   * 优惠券接口
   */
  // 获取用户优惠券
  selectUserCouponList({
    commit
  }, obj) {
    return axios.post('/innerService/selectUserCouponList', obj)
  },

  // 获取平台优惠券
  getPlatformActivity({
    commit
  }, obj) {
    return axios.post('/openservice/getPlatformActivity', obj)
  },

  // 领取优惠券
  collectCoupon({
    commit
  }, obj) {
    return axios.post('/innerservice/collectCoupon', obj)
  },
  /**
   * 购物车相关接口
   */
  // 查看购物车
  getGoodsCart({
    commit,
    state
  }) {
    if (state.carShopId) {
      return axios.get(`/innerService/getGoodsCart?sellerId=${state.carShopId}&platform=3`)
    } else {
      return axios.get('/innerService/getGoodsCart?platform=3')
    }
  },

  // 删除购物车
  deleteGoodsCart({
    commit,
    state
  }) {
    if (state.cartInfo.goodsId && state.cartInfo.sellerId) {
      return axios.get(`/innerService/deleteGoodsCart?sellerId=${state.cartInfo.sellerId}&goodsId=${state.cartInfo.goodsId}&platform=3`)
    } else if (state.cartInfo.sellerId) {
      return axios.get(`/innerService/deleteGoodsCart?sellerId=${state.cartInfo.sellerId}&platform=3`)
    } else {
      return axios.get(`/innerService/deleteGoodsCart?platform=3`)
    }
  },


  /***** 订单 *****/
  // 订单详情
  orderInfoApi({
    commit
  }, obj) {
    return axios.post('/innerService/TheOrderDetails', obj)
  },
  // 评价订单
  orderEvalueteApi({
    commit
  }, obj) {
    return axios.post('/innerService/EvaluationOfTheOrder', obj)
  },

  // 用户订单地址
  UserOrderAddress({
    commit
  }, obj) {
    return axios.post('/innerService/UserOrderAddress', obj)
  },

  // 订单列表
  orderList({
    commit
  }, obj) {
    return axios.post('/innerService/TheOrderList', obj);
  },

  // 订单详情
  orderDetails({
    commit
  }, obj) {
    return axios.post('/innerService/TheOrderDetails', obj);
  },

  // 订单 满减与优惠
  PreferentialInformation({
    commit
  }, obj) {
    return axios.post('/innerService/PreferentialInformation', obj)
  },
  //  下单
  orderInfo({
    commit
  }, obj) {
    return axios.post('/innerService/orderInfo', obj)
  },

  // 催单
  reminderOrder({
    commit
  }, obj) {
    return axios.post('innerService/reminderOrder', obj)
  },

  /**  邀请有奖  **/
  // 注册
  invitationRegisterApi({
    commit
  }, obj) {
    return axios.post('/openService/registeredGift', obj)
  },
  // 邀请记录
  invitationActivityListApi({
    commit
  }, obj) {
    return axios.post('/openservice/invitationActivityList', obj)
  },

  //  申请退款
  toApplyForARefund({
    commit
  }, obj) {
    return axios.post('/innerService/ToApplyForARefund', obj)
  },
  //  退款详情
  get_refund_details({
    commit
  }, obj) {
    return axios.post('/innerService/DetailsOfTheRefund', obj)
  },
  //  配送详情
  distributionLocation({
    commit
  }, obj) {
    return axios.post('/innerService/DistributionLocation', obj)
  },
  //  取消订单
  cancelTheOrder({
    commit
  }, obj) {
    return axios.post('/innerService/CancelTheOrder', obj)
  },

  /**
   * 通知消息
   */
  getUserMessageList({
    commit
  }, obj) {
    return axios.post('/innerService/getUserMessageList', obj)
  },

  // 清空消息
  deleteUserMessage({
    commit
  }, obj) {
    return axios.post('/innerService/deleteUserMessage', obj)
  },

  // app h5首页活动 店铺详情
  getGoodsList({
    commit
  }, obj) {
    return axios.post('/openService/selectHomeGoods', obj)
  },
  // app h5首页活动 店铺详情
  getsellerBanners({
    commit
  }, obj) {
    return axios.post('/openService/selectBanner', obj)
  }
}
