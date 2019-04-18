export default {
  cartArray: [],
  loading: false,
  is_loading: false,
  is_login: false,
  order_loading: false,
  loading_img: true,
  has_loading: false,
  shop_loading: false,
  no_wify: false,
  from_seller: false,
  current_city: "",
  network_loading: false,
  network_list: {
    operator: "",
    supplierId: "",
    accountNum: "",
    phone: "",
    orderAccount: "",
    exchangeAccount: "",
    accountNumText: '',
    phoneText: ''
  },
  electricity_list: {
    accountNum: "",
    billingNum: "",
    orderAccount: "",
    deadline: "",
    exchangeAccount: ""
  },
  // 首页活动弹窗
  activityPop_img: {
    picture: ''
  },
  // 邀请有奖
  invite_a_prize: {
    moneyAll: '',
    invitationActivity: {
      id: ''
    }
  },

  //店铺信息
  shop_info: {
    data: {}
  },

  //店铺菜单
  shop_menu: {
    data: []
  },
  //店铺优惠券
  getSellerActivity: {

  },
  //店铺优惠券
  collectCoupon: {

  },
  //店铺资质
  shop_aptitude: {
    data: {
      sellerPicturePath: ''
    }
  },
  //店铺评论
  shop_comment: {
    data: {
      orderScoreAvg: 0
    }
  },
  //批量导入购物车
  batchAddGoodsCart: {

  },
  //商品搜索
  searchForGoods: {

  },
  //店铺评论列表
  comment_list: {
    orderCommentList: [

    ],
    currentPage: 1,
    totalPage: '',
  },

  //商品添加购物车
  addGoodsCart: {

  },
  //店铺购物车清空
  deleteGoodsCart: {

  },
  //单店购物车列表
  getGoodsCart: {
    sellerList: []
  },
  //单店购物车列表
  getGoodsCartCount: {
    data: ''
  },

  // 商家列表
  seller_list: {
    currentPage: 1,
    totalPage: '',
    sellerList: []
  },

  current_seller_list: [],

  // 商家分类
  seller_label: {
    data: []
  },

  // 首页搜索
  search_list: {
    sellerList: []
  },

  // 添加新地址
  // add_address: {
  //     address: '',
  //     locpos: {
  //         lat: '',
  //         lng: ''
  //     }
  // },

  // 添加/编辑地址相关信息
  userInfo: {
    userName: '',
    sex: 0,
    phoneNumber: '',
    room: '',
    phoneArea: '63',
    add_address: {
      address: '',
      locPos: {
        lat: '',
        lng: ''
      }
    }
  },

  // 购物车删除相关
  cartInfo: {
    sellerId: '',
    goodsId: ''
  },

  // 购物车商家id
  carShopId: '',


  // 订单地址
  orderAddress: {
    seleted: false,
    name: '',
    phone: '',
    address: '',
    id: '',
    logistics: ''
  },

  // 满减优惠券信息
  reduceData: {

  },

  // 选择使用优惠券信息
  select_coupon: {
    money: '',
    id: '',
    activityType: '',
    showCoupon: false
  },

  // 满减信息
  reduce_info: {
    money: '',
    id: ''
  },

  // 订单列表
  order_list: {
    currentPage: 1,
    orderCommentList: []
  },

  // 订单详情
  order_details: {
    Goods: [],
    seller_name: ''
  },

  // 退款详情
  refund_details: {
    listStatus: [],
    orderMap: {}
  },

  // 配送详情
  distribution_details: {
    name: ''
  }
}
