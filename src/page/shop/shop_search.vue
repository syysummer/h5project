<template>
  <div>
    <div class="shop_search flex a-center j-center">
      <div class="flex a-center j-center">
        <i>
          <img src="../../assets/icons/icon_search.png" alt="">
        </i>
        <span>
          <input :placeholder="shop_index.pl_en" v-model="keyWord" type="text" @keyup="shop_search()">
        </span>
      </div>
      <div class="flex a-center j-center">
        <!-- <span @click="shop_search()" v-if="searchRe">{{shop_index.search}}</span> -->
        <span @click="linkGo('back')">{{shop_index.cancel}}</span>
      </div>
    </div>
    <div class="shop_contem">
      <div v-if="goodsArr.length>0">
        <!-- <div v-if="goodsArr.length<=0" class="flex a-center j-center" style="width:100%;height:2rem;color:#999"><span>{{shop_index.list_over}}~~~</span></div> -->
        <div class="goods_information flex row" v-for="(item,index) in goodsArr" :key="index">

          <div>
            <img :src="item.goodsPhotoPath" :onerror="logoImg">
          </div>
          <ul>
            <li class="hiddenT">{{item.goodsName}}</li>
            <li class="flex a-center">
              <p>{{shop_seller.sale}} {{item.sellNum}}</p>
              <img src="../../assets/icons/fill.png">
              <span>{{item.commentNum}}</span>
            </li>
            <li class="flex a-center" v-if="item.isSpecs==1">
              <p v-if='item.goodsSpecsList&&item.goodsSpecsList.length==1'>{{item.presentPrice||item.originalPrice}}P</p>
              <p v-else-if='item.isDiscount==0&&item.goodsSpecsList.length>1'>{{item.originalPrice}}P{{shop_index.case}}</p>
              <p v-else>{{item.presentPrice?item.presentPrice:item.originalPrice}}P{{shop_index.case}}</p>
              <span v-if='item.goodsSpecsList&&item.goodsSpecsList.length==1&&item.presentPrice'>{{item.originalPrice}}P</span>
            </li>
            <li class="flex a-center" v-else style="width: 140%;">
              <p v-if='item.isDiscount==0'>{{item.originalPrice}}P</p>
              <p v-if='item.isDiscount==1'>{{item.presentPrice}}P</p>
              <span v-if='item.isDiscount==1'>{{item.originalPrice}}P</span>
              <a v-show="item.isDiscount==1" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                {{shop_index.limit}}{{item.limitNum}}{{shop_index.piece}}</a>
            </li>
          </ul>

          <p class="flex j-end a-center" v-if="item.stock>0" v-show="shop_info.busFlag==1">
            <i v-if="item.number>=1" @click="addRemove(shop_info.busFlag,'-1',item.id,item.goodsAttributeList,item.isSpecs,index,item.number)">
              <img src="../../assets/icons/remove.png">
            </i>
            <span v-if="item.number">{{item.number}}</span>
            <i @click="addRemove(shop_info.busFlag,'1',item.id,item.goodsAttributeList,item.isSpecs,index,item.stock)">
              <img src="../../assets/icons/add.png">
            </i>
          </p>
          <span style="color:#999;" class="flex j-center a-center" v-else>{{shop_index.s_out}}</span>

        </div>

      </div>
      <div class="flex colmun a-center" v-else v-show="catches">
        <i style="margin-top:3rem;">
          <img src="../../assets/images/null-shop.png" alt="">
        </i>
        <span>{{shop_index.no_fo}}</span>
      </div>
    </div>
    <div class="shop_cart flex" v-if="shop_info.busFlag==1&&goodsArr.length>0" v-show="cartTrue">
      <div class="flex j-center" @click="cart_shop_list">
        <i>
          <img src="../../assets/icons/cart1.png">
        </i>
        <span v-show="getGoodsCartCount_num>0">{{getGoodsCartCount_num}}</span>
      </div>
      <!-- <div class="flex colmun j-center">

                <p v-if="loginStatus == 401||loginStatus == 410">{{shopping_cart.a_total_of}}：{{totalM?totalM:0}}P</p>
                <p v-else>{{shopping_cart.a_total_of}}：{{getCart.totalMoney?getCart.totalMoney:0}}P</p>
                <span v-if="loginStatus == 401||loginStatus == 410">{{shopping_cart.additional_delivery_fee}}{{shop_info.logistics?shop_info.logistics:0}}P</span>
                <span v-else>{{shopping_cart.additional_delivery_fee}}{{shop_info.logistics?shop_info.logistics:0}}P</span>
            </div>
            <div class="flex j-center a-center">
                <span v-if="getGoodsCartCount_num<=0">{{shopping_cart.cart_empty}}</span>
                <span v-else-if="shop_info.limitDeliveryCost>totalM">{{shop_index.short}}{{Number((shop_info.limitDeliveryCost - totalM).toFixed(2))}}P{{shopping_cart.deliver}}</span>
                <span @click="linkGo('hasLog')" v-else-if="hasLog==1" style="background:#FF644D;color:white;font-size:.5rem">{{shopping_cart.order_now}}</span>
                <span @click="linkGo('/login?path=cart')" v-else-if="loginStatus == 401||loginStatus == 410" style="background:#FF644D;color:white;font-size:.5rem">{{shopping_cart.order_now}}</span>

            </div> -->

    </div>
    <div style="background:#665C5C;" class="shop_busFlag flex a-center j-center" v-else-if="shop_info.busFlag==2&&goodsArr.length>0" v-show="cartTrue">
      <span>{{shop_index.no_bus}}</span>
    </div>
    <div style="background:#665C5C;" class="shop_busFlag flex a-center j-center" v-else-if="shop_info.busFlag==3&&goodsArr.length>0" v-show="cartTrue">
      <span>{{shop_index.no_be}}</span>
    </div>
    <div class="cartList" v-if="cart_list&&getGoodsCartCount_num">
      <div class="flex colmun">
        <!-- <p> -->
        <!-- 已享受满减，优惠 -->
        <!-- <span style="color:#FF514B;font-size:.4rem;">2P</span> -->
        <!-- </p> -->
        <i>
          <img src="../../assets/icons/icon_Trash.png" @click="openConfrim">
        </i>
        <ul>
          <li class="carts flex row" v-for="(item,index) in cartStorage" :key="index">
            <div>
              <img v-if="loginStatus == 401||loginStatus == 410" :src="item.goodsPhotoPath" :onerror="logoImg">
              <img v-else :src="item.goodsPhoto" :onerror="logoImg">
            </div>
            <ul>
              <li class="hiddenT">
                <p>{{item.goodsName}}</p>
                <p v-if="item.goodsSpecs&&item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsSpecs}}/{{item.goodsAttributeLabel}}</p>
                <p v-else-if="item.goodsSpecs&&!item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsSpecs}}</p>
                <p v-else-if="!item.goodsSpecs&&item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsAttributeLabel}}</p>
                <p v-else style="font-size:12px;color:#999"></p>
              </li>
              <li class="flex a-center" v-if="item.isSpecs==1">
                <p v-if="item.limitNum">{{item.total_new}}P</p>
                <p v-if="!item.limitNum">{{item.total_new}}P</p>
                <span v-if='item.limitNum'>{{item.total_old}}P</span>
              </li>
              <li class="flex a-center" v-else>
                <p v-if='item.isDiscount==0'>{{item.total_new}}P</p>
                <p v-else>{{item.total_new}}P</p>
                <span v-if='item.isDiscount==1'>{{item.total_old}}P</span>
              </li>
            </ul>

            <p class="flex j-end a-center">
              <i v-if="item.number" @click="addGoodsCart('-1',item.id,item.specs,item.label,index)">
                <img src="../../assets/icons/remove.png">
              </i>
              <span v-if="item.number">{{item.number}}</span>
              <i @click="addGoodsCart('1',item.id,item.specs,item.label,index)">
                <img src="../../assets/icons/add.png">
              </i>
            </p>
            <span class="flex" v-if="item.status==0">
              <span>{{shop_index.fa}}</span>
            </span>
          </li>
        </ul>
        <span class="flex a-center j-between">
          <span style="font-size:.5rem;">{{shopping_cart.cutlery_fee}}</span>
          <span style="color:#FF654E" v-if="loginStatus == 401||loginStatus == 410">{{hePrice}}P</span>
          <span style="color:#FF654E" v-else>{{getGoodsCart_z.lunchboxPrice}}P</span>
        </span>

      </div>
    </div>
    <div class="detail_block" v-if="detailSpecs">
      <div class="detail_specs">
        <div class="goods_information flex row uu">
          <div>
            <img :src="detailData.goodsPhotoPath">
          </div>
          <ul class="uls">
            <li class="hiddenT">{{detailData.goodsName}}</li>
            <li class="flex a-center" style="height:.5rem;margin-top:.3rem;">
              <p v-if="!goodsSpecs&&!goodsAttributeLabel"></p>
              <p v-else-if="goodsSpecs&&!goodsAttributeLabel">
                <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsSpecs}}</span>
              </p>
              <p v-else-if="!goodsSpecs&&goodsAttributeLabel">
                <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsAttributeLabel}}</span>
              </p>
              <p v-else>
                <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsSpecs}} / </span>
                <span style="font-size:.45rem;">{{goodsAttributeLabel}}</span>
              </p>

            </li>
            <li v-if="detailData.isSpecs==1" class="flex a-center">

              <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length>1">{{detailData.originalPrice}}P{{specsId?'':shop_index.case}}</p>
              <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1">{{detailData.presentPrice?detailData.presentPrice:detailData.originalPrice}}P</p>
              <p v-if="!limitNum&&selN!=null">{{originalPrice}}P</p>
              <p v-if="limitNum">{{presentPrice?presentPrice:'0'}}P</p>
              <span v-if="limitNum">{{originalPrice?originalPrice:'0'}}P</span>
              <span v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1&&detailData.presentPrice">{{detailData.originalPrice || '0'}}P</span>
              <a v-show="limitNum" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                {{shop_index.limit}}{{limitNum}}{{shop_index.piece}}</a>
            </li>
            <li v-else class="flex a-center">
              <p v-if="detailData.isDiscount==0">{{detailData.originalPrice}}P</p>
              <p v-if="detailData.isDiscount==1">{{detailData.presentPrice}}P</p>
              <span v-if="detailData.isDiscount==1">{{detailData.originalPrice}}P</span>
              <a v-show="detailData.limitNum&&detailData.isDiscount==1" style="border:1px solid #FF644D;padding:.05rem .2rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                {{shop_index.limit}}{{detailData.limitNum}}{{shop_index.piece}}</a>
            </li>
          </ul>

          <p style="width:1rem;" class="flex j-center a-start">
            <span style="color:#A7A7A7;padding:0;text-align:center;width:.5rem;" @click="detailSpecs=false">
              <img style="width:100%;" src="../../assets/icons/Closex.png" alt="">
            </span>
          </p>
        </div>
        <div v-if="detailData.isSpecs==1">
          <div class="detail_text">{{shop_index.sta}}</div>
          <div class="detail_list flex a-center j-start">
            <span v-for="(item,index) in detailData.goodsSpecsList" :class="[selN == index ? 'selestyle' : '']" :key="index" @click="sel(index,item.id,item.limitNum,item.originalPrice,item.presentPrice,item.goodsSpecs,item)">{{item.goodsSpecs}}</span>
          </div>
        </div>
        <div v-for="(item,index) in detailData.goodsAttributeList" :key="index" v-if="detailData.goodsAttributeList.length>0">
          <div class="detail_text">{{item.goodsAttribute}}</div>
          <div class="detail_list flex a-center j-start">
            <span :class="[seleN == index ? 'selestyle' : '']" v-for="(todo,index) in item.goodsLabelList" :key="index" @click="sele(index,todo.id,todo.attributeId,todo.goodsAttributeLabel)">{{todo.goodsAttributeLabel}}</span>

          </div>
        </div>
        <div class="detail_but">
          <p @click="select_cart(index)">{{shop_index.sel}}</p>
        </div>
      </div>
    </div>
    <div class="delAlert flex a-center j-center" v-show="delAlert">
      <ul>
        <li class="flex a-center j-center">
          <span>{{shop_index.del}}?</span>
        </li>
        <li class="flex a-center j-center">
          <span @click="delAlert=false" class="flex a-center j-center">{{shop_index.cancel}}</span>
          <span @click="deleteGoodsCart()" class="flex a-center j-center">{{shop_index.confirm}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
export default {
  name: 'business_shop',
  data() {
    return {
      delAlert: false,
      hasLog: '',
      tabber_result1: true,
      tabber_result2: false,
      tabber_result3: false,
      cart_result: true,
      arr: ['', '', '', '', '', '', ''],
      menuList: false,
      cart_list: false,
      back_url: '',
      lat: '',
      lon: '',
      id: '',
      menuArr: [],
      in_index: null,
      goodsArr: [],
      logoImg: 'this.src="' + require('../../assets/images/mo.png') + '"',
      cart_list_num: [],
      cartNull: true,
      lower: true,
      detailData: {},
      detailSpecs: false,
      loginStatus: '',
      stroageCartArr: [],
      cartNum: 0,
      cartList: [],
      selN: null,
      seleN: null,
      specsId: null,
      labelId: null,
      goodsSpecs: null,
      attributeId: null,
      limitNum: 0,
      originalPrice: null,
      presentPrice: null,
      goodsAttributeLabel: null,
      goodsId: '',
      index: '',
      arrs: {},
      cartStorage: [],
      numbers: 0,
      numberl: 0,
      numbera: 0,
      cartData: [],
      cartTrue: true,
      totalM: 0,
      priceM: 0,
      hePrice: 0,
      getCart: [],
      newTime: '',
      keyWord: null,
      searchRe: true,
      catches: false,
      cartS: 1
    }
  },
  computed: {
    shop_index() {
      let shop_index = this.$t('shop_index')
      return shop_index
    },
    seller_header() {
      let seller_header = this.$t('seller_header')
      return seller_header
    },
    shop_seller() {
      let shop_seller = this.$t('seller')
      return shop_seller
    },
    shopping_cart() {
      let shopping_cart = this.$t('shopping_cart')
      return shopping_cart
    },
    shop_info() {
      return store.state.shop_info.data
    },

    allArr() {
      if (store.state.shop_info.data.allSubDiscount) {
        return store.state.shop_info.data.allSubDiscount
      } else {
        return []
      }
    },
    listArr() {
      if (store.state.shop_info.data.sellerActivityList) {
        return store.state.shop_info.data.sellerActivityList
      } else {
        return []
      }
    },
    getGoodsCart_list() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        return this.cartStorage
      } else {
        return store.state.getGoodsCart.sellerList
      }
    },
    getGoodsCart_z() {
      return store.state.getGoodsCart
    },
    getGoodsCartCount_num() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        return this.cartNum
      } else {
        return store.state.getGoodsCartCount.data
      }
    },
    shop_commentInfo() {
      return store.state.shop_comment
    }
  },
  created() {
    // let data = {};
    this.hasLog = localStorage.getItem('hasLog')
  },
  mounted() {
    let arr = JSON.parse(localStorage.getItem('cartList'))
    if (!arr) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }
    if (localStorage.getItem('cartList')) {
      this.cartList = localStorage.getItem('cartList')
    }
    let current_address_latlng = localStorage.getItem('current_address_latlng')
    if (current_address_latlng) {
      this.lat = parseFloat(JSON.parse(current_address_latlng).lat)
      this.lon = parseFloat(JSON.parse(current_address_latlng).lng)
    } else {
      this.toast.error(this.shop_index.posi)
    }

    // if (localStorage.getItem("hasLog") == 0) {
    this.loginStatus = 401
    // }
    console.log(this.loginStatus, '7857857')

    if (this.$route.query.id) {
      this.id = this.$route.query.id
      localStorage.setItem('id', this.$route.query.id)

      localStorage.setItem('pathName', this.$route.query.pathName)
    }
    this.back_url = localStorage.getItem('pathName')
    this.id = localStorage.getItem('id')
    // console.log(this.$route)
    if (this.$route.name == 'business_shop') {
      this.tabber_result1 = true
      this.cart_result = true
      this.tabber_result2 = !this.tabber_result1
      this.tabber_result3 = !this.tabber_result1
    } else if (this.$route.name == 'shop_comment') {
      this.tabber_result2 = true
      this.cart_result = false
      this.menuList = false
      this.cartTrue = false
      this.tabber_result1 = !this.tabber_result2
      this.tabber_result3 = !this.tabber_result2
    } else if (this.$route.name == 'shop_aptitude') {
      this.tabber_result3 = true
      this.cart_result = false
      this.menuList = false
      this.cartTrue = false
      this.tabber_result2 = !this.tabber_result3
      this.tabber_result1 = !this.tabber_result3
    }
    this.get_shop_information()
    this.get_shop_menu()
    this.getGoodsCartCount()
    this.get_GoodsCart()
    this.get_shop_comment()
  },

  watch: {
    //监听路由
    $route(to, from) {
      if (to.name == 'business_shop') {
        this.tabber_result1 = true
        this.cart_result = true
        this.tabber_result2 = !this.tabber_result1
        this.tabber_result3 = !this.tabber_result1
      } else if (to.name == 'shop_comment') {
        this.tabber_result2 = true
        this.cart_result = false
        this.menuList = false
        this.cartTrue = false
        this.tabber_result1 = !this.tabber_result2
        this.tabber_result3 = !this.tabber_result2
      } else if (to.name == 'shop_aptitude') {
        this.tabber_result3 = true
        this.cart_result = false
        this.menuList = false
        this.cartTrue = false
        this.tabber_result2 = !this.tabber_result3
        this.tabber_result1 = !this.tabber_result3
      }
    },
    goodsArr: 'total_tt',
    getGoodsCartCount_num: 'total_tt',
    cartStorage: 'total_tt',
    lower: 'hideCart',
    detailSpecs: 'clearData',
    keyWord: 'clearKey',
    cartS: 'change'
  },

  methods: {
    change() {
      this.cartStorage = JSON.parse(localStorage.getItem('cartList'))
    },
    openConfrim() {
      this.delAlert = true
    },
    clearKey() {},
    shop_search1() {
      this.searchen = true
    },
    shop_search() {
      if (!this.keyWord) {
        this.toast.error(this.shop_index.pl_en)
        return
      }

      store
        .dispatch('searchForGoods', {
          sellerId: this.id,
          keyWord: this.keyWord
        })
        .then(res => {
          if (res.data.code == 1) {
            let cartList = JSON.parse(localStorage.getItem('cartList'))
            let data = res.data.data
            Object.assign(store.state.searchForGoods, data)
            if (data.length > 0) {
              data.forEach(el => {
                el.number = 0
                cartList.forEach(item => {
                  if (el.id == item.id) {
                    el.number += item.number
                  }
                })
              })
              this.goodsArr = data
              this.cartTrue = true
            } else {
              this.cartTrue = false
              this.catches = true
              this.goodsArr = []
            }

            // this.keyWord = ''
          }
          console.log('11', res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    hideCart() {
      if (!this.lower) {
        this.cartTrue = false
      } else if (this.lower && this.$route.path == '/business_shop') {
        this.cartTrue = true
      }
    },
    set_star(rate) {
      // 一个星星width: 15% 空格距离是 6.5%
      let count = (rate * 15).toFixed(2)
      let space = rate.toString()[0] * 6.5
      // this.goods_star = Number(count) + space
      return Number(count) + space
      // this.post_star = Number(count) + space
    },
    cartListF() {
      if (this.getGoodsCartCount_num <= 0) {
        this.cart_list = false
        this.getCart.totalMoney = 0
      }
    },
    clearData() {
      if (this.detailSpecs) {
        this.specsId = null
        this.labelId = null
        this.attributeId = null
        this.limitNum = 0
        this.originalPrice = null
        this.presentPrice = null
        this.goodsSpecs = null
        this.selN = null
        this.seleN = null
        this.goodsAttributeLabel = null
      }
    },
    //跳转
    linkGo(url, index) {
      if (url == 'back') {
        this.$router.push(
          '/business_shop?id=' + this.id + '&pathName=' + this.back_url
        )
        return
      }

      if (url == '/evaluate') {
        this.$router.push(url + '?id=' + this.id)
      }
      localStorage.setItem('shop_detail', JSON.stringify(this.goodsArr[index]))
      if (url == '/' + this.back_url) {
        localStorage.setItem('cartList', JSON.stringify([]))
      }
      if (url == '/login?path=cart' || url == 'hasLog') {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        console.log(arr)
        if (arr) {
          arr.forEach(el => {
            let data = {}
            data.sellerId = el.sellerId
            data.goodsId = el.id
            data.goodsNumber = el.number
            if (el.specsId) {
              data.specsId = el.specsId
            }
            if (el.attributeId) {
              data.attributeId = el.attributeId
            }
            if (el.labelId) {
              data.labelId = el.labelId
            }
            this.cartData.push(data)
          })
          console.log(this.cartData, 'chuan')
          localStorage.setItem('orderData', JSON.stringify(this.cartData))
        } else {
          arr = []
        }
      }

      this.$router.push(url)
      if (index == '1') {
        this.menuList = !this.menuList
      } else if (index == 'list') {
        this.menuList = !this.menuList
        this.cartTrue = true
      }
    },
    cart_shop_list() {
      if (!this.getGoodsCartCount_num) {
        this.toast.error(this.shop_index.cart)
      } else {
        this.cart_list = !this.cart_list
      }
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let cartList = JSON.parse(localStorage.getItem('cartList'))

        this.cartStorage = cartList.filter(item => {
          return item.sellerId == this.id
        })
        console.log(this.cartStorage, 'this.cartStorage')
      } else {
        this.getGoodsCartCount()
        this.get_GoodsCart()
      }
    },
    total_tt() {
      if (this.getGoodsCartCount_num <= 0) {
        this.cart_list = false
        this.getCart.totalMoney = 0
        this.delAlert = false
      }
      let arr = JSON.parse(localStorage.getItem('cartList'))
      let num = 0
      let limitNums = 0
      let total = 0
      let hezi = 0
      let price = 0
      arr.forEach((el, index) => {
        if (el.isDiscount == 1) {
          num = 0
          arr.forEach((item, inx) => {
            if (
              el.id == item.id &&
              el.specsId == item.specsId &&
              item.limitNum
            ) {
              console.log(11111)
              num += parseInt(item.number)

              limitNums = parseInt(el.limitNum)
              if (num <= limitNums) {
                total += num * el.presentPrice
              } else {
                let normalNum = num - limitNums
                total += normalNum * el.originalPrice
                total += limitNums * el.presentPrice
              }
              hezi += num * el.lunchboxPrice
            } else if (
              el.id == item.id &&
              el.specsId == item.specsId &&
              !item.limitNum
            ) {
              num += parseInt(item.number)
              total += num * el.originalPrice
              hezi += num * el.lunchboxPrice
            }
          })
        } else {
          num = 0
          num = parseInt(el.number)
          total += num * el.originalPrice
          hezi += num * el.lunchboxPrice
        }
        // console.log(num)
      })
      console.log(total.toFixed(2), hezi.toFixed(2))
      this.totalM = Math.round((total + hezi) * 100) / 100
      this.hePrice = Math.round(hezi * 100) / 100

      arr.forEach(el => {
        if (el.isSpecs == 1) {
          if (el.limitNum) {
            if (el.number > el.limitNum) {
              let priceP = 0,
                priceO = 0
              priceP =
                (parseInt(el.number) - parseInt(el.limitNum)) *
                parseFloat(el.originalPrice)
              priceO = parseInt(el.limitNum) * parseFloat(el.presentPrice)
              //现价
              console.log(111111111)
              el.total_new = Math.round((priceP + priceO) * 100) / 100
            } else {
              let priceP = 0
              priceP = parseInt(el.number) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round(priceP * 100) / 100
              console.log(2222222222)
            }
            //原价
            el.total_old =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
          } else {
            el.total_new =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
            el.total_old = null
          }
        } else {
          if (el.isDiscount == 1) {
            if (el.number > el.limitNum) {
              let priceP = 0,
                priceO = 0
              priceP =
                (parseInt(el.number) - parseInt(el.limitNum)) *
                parseFloat(el.originalPrice)
              priceO = parseInt(el.limitNum) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round((priceP + priceO) * 100) / 100
            } else {
              let priceP = 0
              priceP = parseInt(el.number) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round(priceP * 100) / 100
            }
            el.total_old =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
          } else {
            el.total_new =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
            el.total_old = null
          }
        }
        console.log('66')
      })
      // console.log(arr,'arr')
      localStorage.setItem('cartList', JSON.stringify(arr))
      if (arr.length == 0) {
        this.totalM = 0
      }
    },
    // 获取店铺信息
    get_shop_information() {
      store
        .dispatch('shop_information', {
          lat: this.lat,
          lon: this.lon,
          sellerId: this.id
        })
        .then(res => {
          // console.log("店铺信息", res.data);
          let data = res.data
          Object.assign(store.state.shop_info, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    // 购物车商品数量
    getGoodsCartCount() {
      store
        .dispatch('getGoodsCartCount', {
          params: {
            sellerId: this.id
          }
        })
        .then(res => {
          // console.log("店铺信息", res.data);

          let data = res.data

          Object.assign(store.state.getGoodsCartCount, data)

          if (!data.data) {
            this.cart_list_num = data.sellerList
            this.cartNull = false
            this.cart_list = false
          } else {
            this.cartNull = true
          }
        })
        .catch(err => {
          // console.error("err:", this.loginStatus);
        })
    },
    // 单店购物车清空
    deleteGoodsCart() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        this.totalM = 0
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }
        this.cartStorage.forEach(el => {
          if (el.sellerId == this.id) {
            el.number = 0
            this.cartNum = 0
            this.goodsArr.forEach(el => {
              el.number = 0
            })
          }
          if (el.number > 0) {
            if (arr) {
              arr.forEach((elem, i) => {
                if (elem.id == el.id) {
                  arr.splice(i, 1)
                }
              })
              arr.push(el)
            } else {
              arr = []
              arr.push(el)
            }
          } else {
            arr.forEach((elem, i) => {
              if (elem.id == el.id) {
                arr.splice(i, 1)
              }
            })
          }
        })
        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        store
          .dispatch('deleteGoodsCart', {
            params: {
              sellerId: this.id,
              platform: 3
            }
          })
          .then(res => {
            // console.log("店铺信息", res.data);
            let data = res.data
            Object.assign(store.state.deleteGoodsCart, data)
            this.getGoodsCartCount()
            this.get_shop_menu()
          })
          .catch(err => {
            // console.error("err:", err);
          })
      }
    },
    // 商品加减购物车
    addGoodsCart(type, goodsId, s, l, index) {
      this.cartStorage = JSON.parse(localStorage.getItem('cartList'))
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let total = 0
        let that = this.cartStorage[index]
        if (type == '-1') {
          this.cartStorage[index].number--

          this.cartStorage.splice(index, 1, this.cartStorage[index])
          this.cartNum--
        } else if (type == '1') {
          if (this.cartStorage[index].stock <= this.cartStorage[index].number) {
            this.toast(this.shop_index.stock)
            return
          }
          this.cartStorage[index].number++

          this.cartStorage.splice(index, 1, this.cartStorage[index])
          this.cartNum++

          if (that.isSpecs == 1) {
            let num = 0
            this.cartStorage.forEach(el => {
              if (el.id == that.id && el.specsId == that.specsId) {
                num += el.number
              }
            })
            if (that.limitNum) {
              if (num > that.limitNum && num - that.limitNum < 2) {
                this.toast(this.shop_index.Exce)
              }
            }
          } else {
            let num = 0
            num = that.number
            if (num > that.limitNum && num - that.limitNum < 2) {
              this.toast(this.shop_index.Exce)
            }
          }
        }
        this.cartStorage.forEach((el, index) => {
          if (el.number == 0) {
            this.cartStorage.splice(index, 1)
          }
        })
        localStorage.setItem('cartList', JSON.stringify(this.cartStorage))
        this.cartS++

        let cartList = JSON.parse(localStorage.getItem('cartList'))
        this.cartNum = 0
        cartList.forEach(item => {
          if (item.sellerId == this.id) {
            this.cartNum += item.number
          }
        })
        if (this.loginStatus == 401 || this.loginStatus == 410) {
          this.goodsArr.forEach(el => {
            el.number = 0
            if (cartList) {
              cartList.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        } else {
          this.goodsArr.forEach(el => {
            el.number = 0
            if (this.cart_list_num) {
              this.cart_list_num.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        }
      } else {
        if (s || l) {
          // this.toast.error(this.shop_index.allDel);
          return
        }
        store
          .dispatch('addGoodsCart', {
            sellerId: this.id,
            goodsId: goodsId,
            goodsNumber: type,
            specsId: this.specsId,
            labelId: this.labelId,
            attributeId: this.attributeId
          })
          .then(res => {
            // console.log("店铺信息", res.data);
            if (res.data.code == 1) {
              if (type == 1) {
                // this.toast.success("购物车成功 +1！");
              } else if (type == -1) {
                // this.toast.success("购物车成功 -1！");
              }
              this.getGoodsCartCount()
              this.get_GoodsCart()

              // window.location.reload();
            }
            let data = res.data

            Object.assign(store.state.addGoodsCart, data)
          })
          .catch(err => {
            // console.error("err:", err);
          })
      }
    },
    // 单店购物车列表
    get_GoodsCart() {
      store
        .dispatch('get_GoodsCart', {
          params: {
            sellerId: this.id,
            platform: 3
          }
        })
        .then(res => {
          // console.log('购物车', res.data.data);
          let data = res.data.data
          let data1 = data.find(el => {
            return this.id == el.sellerId
          })
          if (data1) {
            this.cart_list_num = data1.sellerList
          }

          this.goodsArr.forEach(el => {
            el.number = 0
            if (this.cart_list_num) {
              this.cart_list_num.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            }
          })
          this.getCart = data1
          // console.log(data1.sellerList,'sellerList')
          Object.assign(store.state.getGoodsCart, data1)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },

    // 获取店铺菜单
    get_shop_menu(type) {
      // this.menuArr = res.data.data;

      // this.menuArr.forEach(el => {
      //   el.goodsList.forEach(item => {
      //     this.goodsArr.push(item);
      //   });
      // });

      let cartList = JSON.parse(localStorage.getItem('cartList'))
      this.cartNum = 0
      cartList.forEach(item => {
        if (item.sellerId == this.id) {
          this.cartNum += item.number
        }
      })
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        this.goodsArr.forEach(el => {
          el.number = 0
          if (cartList) {
            cartList.forEach(item => {
              if (el.id == item.id) {
                el.number += item.number
              }
            })
          } else {
            el.number = 0
          }
        })
      } else {
        this.goodsArr.forEach(el => {
          el.number = 0
          if (this.cart_list_num) {
            this.cart_list_num.forEach(item => {
              if (el.id == item.id) {
                el.number += item.number
              }
            })
          } else {
            el.number = 0
          }
        })
      }
    },
    click_check(index) {
      this.in_index = index
      this.menuList = false
      // console.log(this.menuArr[index])
      this.goodsArr = this.menuArr[index].goodsList
    },
    //加减购物车商品
    addRemove(flag, type, id, list, isSpecs, index, stock) {
      //  console.log(this.loginStatus)
      this.goodsId = id
      this.index = index

      if (list || isSpecs == 1) {
        if (type == -1 && this.goodsArr[index].number >= 2) {
          this.toast.error(this.shop_index.allDel)
          return
        }
        if (type == 1) {
          this.detailSpecs = true
          this.detailData = this.goodsArr[index]
          return
        }
      }

      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let total = 0
        let that = this.goodsArr[index]
        //  console.log(this.goodsArr[index].number,'number')
        if (type == '-1') {
          this.goodsArr[index].number--
          this.goodsArr.splice(index, 1, this.goodsArr[index])
          this.cartNum--
        } else if (type == '1') {
          if (stock <= this.goodsArr[index].number) {
            this.toast(this.shop_index.stock)
            return
          }
          this.goodsArr[index].number++
          this.goodsArr.splice(index, 1, this.goodsArr[index])
          this.cartNum++
        }
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }

        let da = this.goodsArr[index]
        if (arr.length > 0) {
          arr.forEach((el, i) => {
            if (el.id == da.id) {
              arr.splice(i, 1)
            }
            if (da.number == 0 && el.id == da.id) {
              arr.splice(i, 1)
              return
            }
          })

          if (da.number != 0) {
            arr.push(this.goodsArr[index])
          }
        } else {
          arr.push(this.goodsArr[index])
        }
        let num = 0
        arr.forEach((el, index) => {
          if (el.id == da.id) {
            num = el.number
          }
        })
        if (da.isDiscount == 1 && type == 1) {
          if (num > da.limitNum && num - da.limitNum < 2) {
            this.toast(this.shop_index.Exce)
          }
        }

        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        if (type == '-1') {
          this.goodsArr[index].number--
          this.goodsArr.splice(index, 1, this.goodsArr[index])
        } else if (type == '1') {
          this.goodsArr[index].number++
          this.goodsArr.splice(index, 1, this.goodsArr[index])
        }

        this.addGoodsCart(type, id)
      }
    },
    //获取店铺评论总信息
    get_shop_comment() {
      store
        .dispatch('shop_comment', {
          sellerId: this.id
        })
        .then(res => {
          // console.log("店铺", res.data);
          let data = res.data
          Object.assign(store.state.shop_comment, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    sel(index, id, limit, or, pr, goodsSpecs, data) {
      this.limitNum = null
      let startDate = '',
        endDate = '',
        startTime = '',
        endTime = '',
        startTimeA = '',
        endTimeA = '',
        nowTime = ''
      this.newTime = new Date().getTime()
      nowTime = new Date().getHours() + '' + new Date().getMinutes()

      if (data.endDate && data.startDate && data.isDiscount) {
        startDate = this.$formatDateTime(data.startDate, 'ymd')
        endDate = this.$formatDateTime(data.endDate, 'ymd')
      }
      console.log(startDate, endDate, '5')
      if (data.startTime && data.endTime) {
        startTime = parseInt(data.startTime.replace(':', ''))
        endTime = parseInt(data.endTime.replace(':', ''))

        //  Stime=new Date(startTime).getTime()
        //  Etime=new Date(endTime).getTime()
      }
      if (data.startTimeA && data.endTimeA) {
        startTimeA = parseInt(data.startTimeA.replace(':', ''))
        endTimeA = parseInt(data.endTimeA.replace(':', ''))
        //  StimeA=new Date(startTimeA).getTime()
        //  EtimeA=new Date(endTimeA).getTime()
      }

      if (data.isDiscount == 1) {
        if (data.isAllDay == 1) {
          if (data.startDate < this.newTime && this.newTime < data.endDate) {
            this.limitNum = limit
          }
        } else {
          if (data.startDate < this.newTime && this.newTime < data.endDate) {
            if (startTime < nowTime && nowTime < endTime) {
              console.log(startTime, nowTime, endTime)
              this.limitNum = limit
            }
            if (startTimeA < nowTime && nowTime < endTimeA) {
              this.limitNum = limit
            }
          }
        }
      }

      this.selN = index
      this.specsId = id
      this.originalPrice = or
      this.presentPrice = pr
      this.goodsSpecs = goodsSpecs
      console.log(this.newTime, '66')
      console.log(data, 'dataa')
    },
    sele(index, id, attr, label) {
      this.seleN = index
      this.labelId = id
      this.attributeId = attr
      this.goodsAttributeLabel = label
      console.log(id, attr)
    },
    //选好了
    select_cart(index) {
      if (this.goodsArr[index].isSpecs == 1 && this.selN == null) {
        this.toast.error(this.shop_index.ple)
        return
      }
      if (this.goodsArr[index].goodsAttributeList && this.seleN == null) {
        this.toast.error(this.shop_index.plea)
        return
      }
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        function simpleClone(initalObj) {
          var obj = {}
          for (var i in initalObj) {
            obj[i] = initalObj[i]
          }
          return obj
        }

        let data = simpleClone(this.goodsArr[index])
        data.specsId = this.specsId
        data.labelId = this.labelId
        data.attributeId = this.attributeId
        data.limitNum = this.limitNum
        console.log(this.limitNum, 'limit')
        if (this.originalPrice) {
          data.originalPrice = this.originalPrice
        }
        if (this.presentPrice) {
          data.presentPrice = this.presentPrice
        }
        data.goodsSpecs = this.goodsSpecs
        data.goodsAttributeLabel = this.goodsAttributeLabel
        data.number = 1
        //  console.log(this.goodsArr[index],'555')
        this.cartNum++
        this.cartS++
        if (arr) {
          console.log(arr, 'arr')
          arr.forEach((el, index) => {
            if (
              el.id == data.id &&
              el.specsId == data.specsId &&
              el.labelId == data.labelId &&
              el.attributeId == data.attributeId
            ) {
              arr.splice(index, 1)
              data.number = el.number
              data.number++
            }
          })
          if (this.goodsArr[index].stock <= data.number) {
            this.toast(this.shop_index.stock)
            return
          }
          arr.push(data)
          if (data.limitNum) {
            let num = 0
            arr.forEach((el, index) => {
              if (el.id == data.id && el.specsId == data.specsId) {
                num += el.number
              }
            })

            if (num > data.limitNum && num - data.limitNum < 2) {
              this.toast(this.shop_index.Exce)
            }
          }

          this.goodsArr[index].number++
        } else {
          arr = []
          arr.push(data)
        }

        // this.get_shop_menu();
        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        this.addGoodsCart(1, this.goodsId)
        this.goodsArr[this.index].number++
        this.goodsArr.splice(this.index, 1, this.goodsArr[this.index])
      }
      this.specsId = null
      this.labelId = null
      this.attributeId = null
      this.limitNum = 0
      this.originalPrice = null
      this.presentPrice = null
      this.goodsSpecs = null
      this.goodsAttributeLabel = null
      this.detailSpecs = false
      this.selN = null
      this.seleN = null
    },
    //下单接口
    order_Info() {},
    // 购物车批量导入
    batchAddGoodsCart() {
      let data = localStorage.getItem('orderData')
      store
        .dispatch('batchAddGoodsCart', { goodsCart: data, platform: 3 })
        .then(res => {
          // console.log("购物车信息", res.data);
          let data = res.data
          if (res.data.code == 1) {
            this.$router.push('/submit_order?id=' + this.id)
            localStorage.setItem('cartList', JSON.stringify([]))
            Object.assign(store.state.batchAddGoodsCart, data)
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(err => {
          // this.loginStatus = err.status;
          // console.error("err:", this.loginStatus);
        })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.delAlert {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  ul {
    width: 8rem;
    height: 3rem;
    background: white;
    border-radius: 0.3rem;
    li {
      width: 100%;

      &:nth-child(1) {
        border-bottom: 1px solid #ccc;
        height: 60%;
      }
      span {
        font-size: 13px;
        padding: 0 0.5rem;
      }
      &:nth-child(2) {
        height: 40%;
        span {
          width: 50%;
          height: 100%;
          &:nth-child(1) {
            border-right: 1px solid #ccc;
          }
        }
      }
    }
  }
}
.shop_search {
  width: 100%;
  height: 1.8rem;
  padding: 0.3rem 0.4rem;
  background: white;
}

.shop_search > div:nth-child(1) {
  flex: 1;
  height: 100%;
  background: #f5f5f5;
}

.shop_search > div:nth-child(1) > i {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 0.4rem;
}

.shop_search > div:nth-child(1) > span {
  flex: 1;
}

.shop_search > div:nth-child(1) > span > input {
  border: none;
  background: #f5f5f5;
  width: 100%;
}

.shop_search > div:nth-child(1) > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop_search > div:nth-child(2) {
  width: 2rem;
  height: 100%;
  font-size: 0.5rem;
}

.shop_header {
  position: absolute;
  left: 0;
  top: 0;
  width: 12rem;
  z-index: 3;
  height: 7vh;
}

.shop_header > span {
  width: 1.3rem;
  height: 7vh;
}

.shop_header > span > i {
  width: 0.6rem;
  height: 40%;
}

.shop_header > span > i > img {
  width: 100%;
}

.shopImage {
  width: 12rem;
  height: 3.5rem;
  position: relative;
  left: 0;
  top: 0;
}

.shopImage > i {
  width: 12rem;
  height: 3.5rem;
}

.shopImage > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shopImage > span {
  position: absolute;
  left: 0;
  top: 0;
  width: 12rem;
  height: 3.5rem;
  background: rgba(0, 0, 0, 0.1);
}

.shopHead {
  width: 12rem;
  height: 3rem;
  position: absolute;
  left: 0;
  top: 1.2rem;
  z-index: 994;
}

.shopHead > i {
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.2rem;
  background: white;
  border-radius: 50%;
}

.shopHead > i > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.shopText {
  width: 12rem;
  background: white;
  padding: 0.8rem 0 0.2rem;
  position: relative;
  z-index: 993;
}

.shopText > p {
  font-size: 0.6rem;
  font-weight: 600;
  color: #333;
  padding: 0.2rem 0;
}

.shopText > span {
  font-size: 0.45rem;
  color: #a0a0a0;
  width: 5rem;
}

.shopText > ul {
  padding: 0.2rem 0 0.2rem;
}

.shopText > ul > li {
  padding: 0.05rem 0.2rem;
  border: 1px solid #ffbc83;
  background: #fff6cd;
  border-radius: 2px;
  color: #ff8f23;
  font-size: 14px;
  margin-right: 0.15rem;
}

.shopText > ol > li:nth-child(1) {
  width: 0.5rem;
  height: 0.5rem;
}

.shopText > ol > li:nth-child(1) > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shopText > ol > li:nth-child(2) {
  color: #a0a0a0;
  font-size: 0.45rem;
  margin: 0 0.3rem;
  width: 4rem;
}

.shopText > ol > li:nth-child(2) > span {
  color: #a0a0a0;
  font-size: 0.45rem;
}

.shopText > ol > li:nth-child(3) {
  height: 0.5rem;
}

.shopText > ol > li:nth-child(3) > span {
  font-size: 0.45rem;
  color: #999;
  margin-right: 0.1rem;
}

.shopText > ol > li:nth-child(3) > img {
  width: 0.3rem;
  height: 0.2rem;
}

.shoptxt {
  width: 100%;
  height: calc(100vh - 6.2rem);
  overflow-y: scroll;
  background: white;
  position: relative;
  z-index: 1000;
}

.shoptxt::-webkit-scrollbar {
  display: none;
}

.shoptxt > p {
  padding: 0.4rem;
  font-size: 0.6rem;
}

.shoptxt > ul {
  width: 100%;
}

.shoptxt > ul > li {
  width: 100%;
  display: flex;
  padding: 0 1rem;
  margin-bottom: 0.1rem;
}

.shoptxt > ul > li > i {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.3rem;
}

.shoptxt > ul > li > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shoptxt > ul > li > span {
  font-size: 0.45rem;
  width: 9rem;
  color: #898989;
}

.shoptxt > div {
  width: 100%;
  height: 1rem;
  background: white;
  padding: 3rem 0 1rem;
}

.shop_contem {
  width: 100%;
  background: white;
  position: relative;
  height: calc(100vh - 1.8rem);
  overflow-y: scroll;
}

.shop_contem::-webkit-scrollbar {
  display: none;
}

.shop_contem > ul {
  width: 100%;
  height: 1.6rem;
  border-bottom: 1px solid #fbfbfb;
}

.shop_contem > ul > li {
  font-size: 0.5rem;
  color: #6e6e6e;
  display: flex;
  width: 3rem;
  height: 1.55rem;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #fff;
}

.shop_contem > ul > li > i {
  width: 0.7rem;
  height: 0.6rem;
  margin-right: 0.2rem;
}

.shop_contem > ul > li > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop_contem > ul > li.active {
  border-bottom: 2px solid #ff4a47;
  color: #333;
}

.shop_contem > div {
  width: 100%;
  height: calc(100vh - 3.6rem);
}

.shop_contem > div > i {
  width: 5rem;
  height: 5rem;
  margin-top: -1.5rem;
}

.shop_contem > div > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop_contem > div > span {
  font-size: 0.6rem;
  color: #6e6e6e;
}

.shop_contem > div::-webkit-scrollbar {
  display: none;
}

.shop_cart {
  width: 100%;
  height: 1.8rem;
  background: #665c5c;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 998;
}

.shop_cart > div:nth-child(1) {
  width: 3rem;
  background: #665c5c;
  position: relative;
}

.shop_cart > div:nth-child(1) > i {
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  bottom: 0.1rem;
  z-index: 1115;
  right: 0.5rem;
}

.shop_cart > div:nth-child(1) > span {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  z-index: 1116;
  border-radius: 50%;
  background: #ff3633;
  font-size: 0.35rem;
  box-shadow: 0 0 2px #fff;
  line-height: 0.7rem;
  text-align: center;
  right: 0.5rem;
  top: -0.3rem;
}

.shop_cart > div:nth-child(1) > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop_cart > div:nth-child(2) {
  flex: 1;
  background: #665c5c;
}

.shop_cart > div:nth-child(2) > p {
  font-size: 0.46rem;
  margin-bottom: 0.1rem;
}

.shop_cart > div:nth-child(2) > span {
  font-size: 0.4rem;
}

.shop_cart > div:nth-child(3) {
  width: 4rem;
}

.shop_cart > div:nth-child(3) > span {
  width: 4rem;
  height: 100%;
  font-size: 0.46rem;
  line-height: 1.8rem;
  text-align: center;
}

.shop_busFlag {
  width: 100%;
  height: 1.8rem;
  background: #999;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 2;
}

.goods_information {
  width: 100%;
  padding: 0.4rem;
}

.goods_information:last-child {
  margin-bottom: 6rem;
}

.goods_information > div {
  width: 3.5rem;
  height: 2.7rem;
}

.goods_information > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods_information > ul {
  width: 5.5rem;
  height: 2.7rem;
}

.goods_information > ul > li:nth-child(1) {
  font-size: 0.5rem;
  color: #111;
  width: 5.5rem;
  padding: 0 0.2rem;
}

.goods_information > ul > li:nth-child(2) {
  color: #a0a0a0;
  padding: 0.1rem 0.2rem;
}

.goods_information > ul > li:nth-child(2) > p {
  font-size: 0.3rem;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(2) > img {
  width: 0.4rem;
  height: 0.4rem;
}

.goods_information > ul > li:nth-child(2) > span {
  font-size: 0.3rem;
}

.goods_information > ul > li:nth-child(3) {
  padding: 0 0.2rem;
  margin-top: 0.5rem;
}

.goods_information > ul > li:nth-child(3) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(3) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}

.goods_information > p {
  width: 3rem;
  height: 2.7rem;
}

.goods_information > p > span {
  padding: 0.2rem;
  font-size: 0.5rem;
}

.goods_information > p > i {
  width: 0.8rem;
  height: 0.8rem;
}

.goods_information > p > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods_information > span {
  width: 3rem;
  height: 2.7rem;
}

.menu_list {
  position: absolute;
  left: 0;
  top: 1.6rem;
  width: 100%;
  height: calc(100vh - 9.5rem);
  background: white;
  overflow-y: scroll;
}

.menu_list::-webkit-scrollbar {
  display: none;
}

.menu_list > li {
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: 1px solid #fbfbfb;
}

.menu_list > li > i {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 0.5rem 0 1rem;
}

.menu_list > li > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu_list > li > span {
  font-size: 0.5rem;
  color: #6e6e6e;
}

.carts {
  width: 100%;
  padding: 0.3rem;
  border-bottom: 1px solid #f6f6f6;
  position: relative;
}

.carts:last-child {
}

.carts > div {
  width: 2.4rem;
  height: 2rem;
}

.carts > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carts > ul {
  width: 6rem;
  height: 2rem;
}

.carts > ul > li:nth-child(1) {
  font-size: 0.5rem;
  color: #111;
  width: 5.5rem;
  padding: 0 0.2rem;
}

.carts > ul > li:nth-child(2) {
  padding: 0 0.2rem;
}

.carts > ul > li:nth-child(2) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.carts > ul > li:nth-child(2) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}

.carts > p {
  width: 3rem;
  height: 2rem;
}

.carts > p > span {
  padding: 0.2rem;
  font-size: 0.5rem;
}

.carts > p > i {
  width: 0.8rem;
  height: 0.8rem;
}

.carts > p > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carts > span {
  width: 11.4rem;
  height: 2rem;
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
  background: rgba(255, 255, 255, 0.4);
}

.carts > span > span {
  position: absolute;
  background: #ccc;
  color: white;
  left: 0;
  bottom: 0;
  font-size: 0.3rem;
  width: 2.4rem;
  height: 0.5rem;
  text-align: center;
}

.cartList {
  width: 100%;
  height: calc(100vh - 1.8rem);
  position: fixed;
  left: 0;
  bottom: 1.8rem;
  background: rgba(0, 0, 0, 0.4);
  z-index: 997;
}

.cartList > div {
  width: 100%;
  background: white;
  position: absolute;
  left: 0;
  bottom: 0;
}

.cartList > div > p {
  width: 100%;
  height: 1rem;
  background: #fffbe6;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #666;
}

.cartList > div > i {
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.4rem;
  border-bottom: 1px solid #f6f6f6;
}

.cartList > div > i > img {
  width: 0.5rem;
}

.cartList > div > ul {
  width: 100%;
  max-height: 10rem;
  overflow-y: scroll;
  margin-bottom: 1.6rem;
}

.cartList > div > ul::-webkit-scrollbar {
  display: none;
}

.cartList > div > span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  padding: 0.3rem;
}

.detail_block {
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  z-index: 999;
}

.detail_specs {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
  z-index: 3;
}

.detail_text {
  color: #898989;
  padding: 0.2rem 0.5rem;
}

.detail_but {
  padding: 0.4rem 0.5rem;
}

.detail_but > p {
  border-radius: 0.1rem;
  background: #ff644c;
  padding: 0.3rem;
  color: white;
  text-align: center;
  font-size: 0.5rem;
}

.detail_list {
  padding: 0.2rem 0.5rem;
  flex-flow: row wrap;
}

.detail_list .selestyle {
  border: 1px solid #fe735e;
  background: #fee3df;
  color: #fe3532;
}

.detail_list > span {
  width: 3rem;
  padding: 0.2rem;
  font-size: 0.42rem;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 0.1rem;
  margin: 0.1rem 0.3rem;
}

.goods_information > .uls {
  width: 7rem;
  height: 2.7rem;
}

.goods_information > .uls > li:nth-child(1) {
  font-size: 0.5rem;
  color: #111;
  width: 7rem;
  padding: 0 0.2rem;
}

.goods_information > .uls > li:nth-child(2) {
  color: #a0a0a0;
  padding: 0.1rem 0.2rem;
}

.goods_information > .uls > li:nth-child(2) > p {
  font-size: 0.3rem;
  margin-right: 0.4rem;
}

.goods_information > .uls > li:nth-child(2) > img {
  width: 0.4rem;
  height: 0.4rem;
}

.goods_information > .uls > li:nth-child(2) > span {
  font-size: 0.3rem;
}

.goods_information > .uls > li:nth-child(3) {
  padding: 0 0.2rem;
  margin-top: 0.5rem;
}

.goods_information > .uls > li:nth-child(3) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.goods_information > .uls > li:nth-child(3) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}
</style>
