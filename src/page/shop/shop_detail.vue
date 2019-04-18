<template>
  <div class="shopDetail">
    <div style="position:relative;height:100%;">
      <div class="shop_header flex row j-between">
        <span class="ic">

        </span>
        <span class="ic" @click="linkGo('back')">
          <img src="../../assets/icons/close.png" />
        </span>
      </div>
      <div class="flex shopImage">
        <i>
          <img :src="detailData.goodsPhotoPath" :onerror="logoImg">
        </i>
      </div>
      <div class="goods_information flex row">
        <ul>
          <li class="hiddenT">{{detailData.goodsName}}</li>
          <!-- <li>{{detailData.goodsName}}</li> -->
          <li class="flex a-center">
            <p>{{shop_seller.sale}} {{detailData.sellNum}}</p>
            <img src="../../assets/icons/fill1.png">
            <span>{{detailData.commentNum}}</span>
            <a v-if="detailData.isDiscount&&!detailData.isSpecs" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
              {{shop_index.limit}} {{detailData.limitNum}} {{shop_index.piece}}</a>
            <!-- <a v-if="detailData.goodsSpecsList.length==1" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                                {{shop_index.limit}}{{goodsList.limitNum}}{{shop_index.piece}}</a> -->
          </li>

          <li class="flex a-center" v-if="detailData.isSpecs==1">
            <p v-if='detailData.goodsSpecsList&&detailData.goodsSpecsList.length==1'>{{detailData.presentPrice||detailData.originalPrice}}P</p>
            <p v-else-if='detailData.isDiscount==0&&detailData.goodsSpecsList.length>1'>{{detailData.originalPrice}}P{{shop_index.case}}</p>
            <p v-else>{{detailData.presentPrice?detailData.presentPrice:detailData.originalPrice}}P{{shop_index.case}}</p>
            <span style="color:#999;text-decoration: line-through;" v-if='detailData.goodsSpecsList&&detailData.goodsSpecsList.length==1&&detailData.presentPrice'>{{detailData.originalPrice}}P</span>
          </li>
          <li class="flex a-center" v-else>
            <p v-if='detailData.isDiscount==0'>{{detailData.originalPrice}}P</p>
            <p v-else>{{detailData.presentPrice}}P</p>
            <span style="color:#999;text-decoration: line-through;" v-if='detailData.isDiscount==1'>{{detailData.originalPrice}}P</span>
          </li>
        </ul>

        <p class="flex j-end a-center" v-if="detailData.stock!=0" v-show="shop_info.busFlag==1">
          <i v-if="detailData.number" @click="addRemove('-1',detailData.id)">
            <img src="../../assets/icons/remove.png">
          </i>
          <span v-if="detailData.number">{{detailData.number}}</span>
          <i @click="addRemove('1',detailData.id)">
            <img src="../../assets/icons/add.png">
          </i>
        </p>
        <span class="flex j-center a-center" style="color:#999;font-size:.45rem;" v-else>{{shop_index.s_out}}</span>

      </div>
      <div class="shop_cart flex" v-if="shop_info.busFlag==1">
        <div class="flex j-center" @click="cart_shop_list">
          <i>
            <img src="../../assets/icons/cart1.png">
          </i>
          <span v-show="getGoodsCartCount_num>0">{{getGoodsCartCount_num}}</span>
        </div>
        <div class="flex colmun j-center">
          <p v-if="getGoodsCartCount_num<=0">{{shopping_cart.cart_empty}}</p>
          <p v-else>{{shopping_cart.a_total_of}}：{{totalM?totalM:0}} P</p>
          <!-- <p v-else>{{shopping_cart.a_total_of}}：{{getCart.totalMoney?getCart.totalMoney:0}} P</p> -->
          <span v-if="loginStatus == 401||loginStatus == 410">{{shop_index.disfee}} {{shop_info.logistics?shop_info.logistics:0}} P</span>
          <span v-else>{{shop_index.disfee}} {{shop_info.logistics?shop_info.logistics:0}} P</span>
        </div>
        <div class="flex j-center a-center">
          <span v-if="getGoodsCartCount_num<=0" style="background:#999;color:white;font-size:.5rem">{{shopping_cart.order_now}}</span>
          <span v-else-if="shop_info.limitDeliveryCost>totalM">{{shop_index.short}}{{Number((shop_info.limitDeliveryCost - totalM).toFixed(2))}}P{{shopping_cart.deliver}}</span>
          <span @click="linkGo('hasLog')" v-else-if="hasLog==1" style="background:#FF644D;color:white;font-size:.5rem">{{shopping_cart.order_now}}</span>
          <span @click="linkGo('/login?path=cart&id='+id)" v-else style="background:#FF644D;color:white;font-size:.5rem">{{shopping_cart.order_now}}</span>
        </div>
      </div>
      <div style="background:#665C5C;" class="shop_busFlag flex a-center j-center" v-else-if="shop_info.busFlag==2">
        <span>{{shop_index.no_bus}}</span>
      </div>
      <div style="background:#665C5C;" class="shop_busFlag flex a-center j-center" v-else-if="shop_info.busFlag==3">
        <span>{{shop_index.no_bus}}</span>
      </div>
      <div class="cartList" v-show="cart_list&&getGoodsCartCount_num">
        <div class="flex colmun">
          <!-- <p> -->
          <!-- 已享受满减，优惠
                    <span style="color:#FF514B;font-size:.4rem;">2P</span> -->
          <!-- </p> -->
          <i>
            <img src="../../assets/icons/icon_Trash.png" @click="openConfrim">
          </i>
          <ul>
            <li class="carts flex row" v-for="(item,index) in getGoodsCart_list" :key="index">
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
                <!-- <li class="flex a-center" v-if="item.specsId==1">
                              <p v-if='item.limintNum'>{{item.presentPrice}}P</p>
                              <p v-else>{{item.presentPrice}}P</p>
                              <span v-if='item.limintNum'>{{item.originalPrice}}P</span>
                            </li>
                            <li class="flex a-center" v-else>
                              <p v-if='item.isDiscount==0'>{{item.originalPrice}}P</p>
                              <p v-else>{{item.presentPrice}}P</p>
                              <span v-if='item.isDiscount==1'>{{item.originalPrice}}P</span>
                            </li> -->
                <li class="flex a-center" v-if="item.isSpecs==1||item.labelId">
                  <p>{{item.money1}}P</p>
                  <span v-if='item.money1!=Math.round((item.originalPrice*item.number) * 100) / 100'>{{Math.round((item.originalPrice*item.number) * 100) / 100}}P</span>
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
                <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length>1">{{detailData.presentPrice||detailData.originalPrice}}P{{specsId?'':shop_index.case}}</p>
                <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1">{{detailData.presentPrice?detailData.presentPrice:detailData.originalPrice}}P</p>
                <p v-if="!limitNum&&selN!=null">{{originalPrice}}P</p>
                <p v-if="limitNum">{{presentPrice?presentPrice:'0'}}P</p>
                <span v-if="limitNum">{{originalPrice?originalPrice:'0'}}P</span>
                <span v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1&&detailData.presentPrice">{{detailData.originalPrice || '0'}}P</span>
                <a v-show="limitNum" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                  {{shop_index.limit}} {{limitNum}} {{shop_index.piece}}</a>
              </li>
              <li v-else class="flex a-center">
                <p v-if="detailData.isDiscount==0">{{detailData.originalPrice}}P</p>
                <p v-if="detailData.isDiscount==1">{{detailData.presentPrice}}P</p>
                <span v-if="detailData.isDiscount==1">{{detailData.originalPrice}}P</span>
                <a v-show="detailData.limitNum&&detailData.isDiscount==1" style="border:1px solid #FF644D;padding:.05rem .2rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                  {{shop_index.limit}} {{detailData.limitNum}} {{shop_index.piece}}</a>
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
      detailSpecs: false,
      detailData: {},
      cart_result: true,
      cart_list: false,
      arr: ['', '', '', '', '', '', ''],
      back_url: '',
      logoImg: 'this.src="' + require('../../assets/images/mo.png') + '"',
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
      id: '',
      lat: '',
      lon: '',
      cartNull: true,
      cartNum: 0,
      cartStorage: [],
      loginStatus: '',
      totalM: 0,
      priceM: 0,
      hePrice: 0,
      newTime: '',
      getCart: [],
      cartS: 1,
      cartData: [],
      number: 0
      // goodsList:null
    }
  },
  components: {},
  computed: {
    shop_index() {
      let shop_index = this.$t('shop_index')
      return shop_index
    },
    shopping_cart() {
      let shopping_cart = this.$t('shopping_cart')
      return shopping_cart
    },
    shop_seller() {
      let shop_seller = this.$t('seller')
      return shop_seller
    },
    shop_info() {
      return store.state.shop_info.data
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
    }
  },
  created() {
    this.hasLog = localStorage.getItem('hasLog')
  },
  mounted() {
    this.loginStatus = 401

    this.id = this.$route.query.id
    // this.getGoodsCartCount()
    let cartList = JSON.parse(localStorage.getItem('cartList'))
    this.cartStorage = cartList.filter(item => {
      return item.sellerId == this.id
    })
    this.detailData = JSON.parse(localStorage.getItem('shop_detail'))
    this.detailData.number = 0
    let num = 0
    cartList.forEach(el => {
      if (el.id == this.detailData.id) {
        num += el.number
        this.detailData.number = num
        // this.number+=el.number
      }
    })
    console.log(this.cartStorage, '4253452')

    let current_address_latlng = localStorage.getItem('current_address_latlng')
    if (current_address_latlng) {
      this.lat = parseFloat(JSON.parse(current_address_latlng).lat)
      this.lon = parseFloat(JSON.parse(current_address_latlng).lng)
    } else {
      this.toast.error(this.shop_index.posi)
    }

    console.log(this.detailData, '123654')
    this.get_shop_information()
    this.get_GoodsCart()
    // this.goodsList=this.detailData.goodsSpecsList[0]
  },
  watch: {
    getGoodsCartCount_num: 'total_tt',
    detailData: 'clearData',
    cartS: 'change',
    detailSpecs: 'clearData'
  },
  methods: {
    change() {
      this.cartStorage = JSON.parse(localStorage.getItem('cartList'))
    },
    openConfrim() {
      this.delAlert = true
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
        this.goodsAttributeLabel = null
        this.selN = null
        this.seleN = null
      }
    },
    total_tt() {
      let arr = JSON.parse(localStorage.getItem('cartList'))
      // let num = 0;
      // let limitNums = 0;
      let total = 0
      let hezi = 0
      // let price = 0;
      // let isDiscount = false;
      // let isLoop = [];
      // for (let [index, elem] of arr.entries()) {
      //   num = 0;
      //   isDiscount = elem.isDiscount == 1 ? true : false;
      //   limitNums = isDiscount ? elem.limitNum : false;
      //   if (isLoop.includes(elem.specsId)) continue;
      //   for (let [jndex, item] of arr.entries()) {
      //     if (elem.id == item.id && elem.specsId == item.specsId) {
      //       item.specsId && isLoop.push(item.specsId);
      //       num += item.number;
      //     }
      //   }
      //   if (isDiscount) {
      //     if (!limitNums) return;
      //     num = num == 0 ? elem.number : num;
      //     if (num <= limitNums) {
      //       total += num * elem.presentPrice;
      //     } else {
      //       let normalNum = num - limitNums;
      //       total += limitNums * elem.presentPrice;
      //       total += normalNum * elem.originalPrice;
      //     }
      //     hezi += num * elem.lunchboxPrice;
      //   } else {
      //     total += elem.number * elem.originalPrice;
      //     hezi += elem.number * elem.lunchboxPrice;
      //   }
      // }

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
            el.total_old = 0
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
            el.total_old = 0
          }
        }
        console.log('66')
      })
      let num = 0
      arr.forEach(el => {
        if (el.id == this.detailData.id) {
          num += el.number
          this.detailData.number = num
          // this.number+=el.number
        }
        if (el.isDiscount == 0) {
          el.limitNum = 0
        }
        if (el.isSpecs == 1 || el.attributeId) {
          total += el.money1
        } else {
          total += el.total_new
          console.log('total', el.total_new)
        }
        hezi += el.number * el.lunchboxPrice
      })
      // console.log(total.toFixed(2), hezi.toFixed(2));
      this.totalM = Math.round((total + hezi) * 100) / 100
      this.hePrice = Math.round(hezi * 100) / 100
      // console.log(arr,'arr')
      localStorage.setItem('cartList', JSON.stringify(arr))

      if (arr.length == 0) {
        this.totalM = 0
      }
      if (this.getGoodsCartCount_num <= 0) {
        this.cart_list = false
        this.getCart.totalMoney = 0
        this.delAlert = false
      }
    },
    //跳转
    linkGo(url, index) {
      if (url == '/login?path=cart&id=' + this.id || url == 'hasLog') {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        // console.log(arr);
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
      if (url == 'hasLog') {
        this.batchAddGoodsCart()
        return
      }
      if (url == 'back') {
        this.$router.go(-1)
      } else {
        this.$router.push(url)
        console.log(11111111)
      }
    },
    cart_shop_list() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let cartList = JSON.parse(localStorage.getItem('cartList'))
        this.cartStorage = cartList.filter(item => {
          return item.sellerId == this.id
        })
      } else {
        this.getGoodsCartCount()
        this.get_GoodsCart()
      }
      console.log(this.getGoodsCart_list, '11111111111111')
      if (!this.getGoodsCartCount_num) {
      }
      if (!this.getGoodsCartCount_num) {
        this.toast.error(this.shop_index.cart)
      } else {
        this.cart_list = !this.cart_list
      }
    },
    // 获取店铺信息
    get_shop_information() {
      let cartList = JSON.parse(localStorage.getItem('cartList'))
      this.cartL = cartList
      this.cartNum = 0
      cartList.forEach(item => {
        if (item.sellerId == this.id) {
          this.cartNum += item.number
        }
      })
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
    click_check(index) {},
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

          if (that.isSpecs == 1 || that.attributeId) {
            let num = 0
            this.cartStorage.forEach(el => {
              if (el.id == that.id && el.specsId == that.specsId) {
                num += el.number
              }
            })
            // console.log("................", num);
            if (that.limitNum) {
              if (num >= that.limitNum) {
                if (
                  Math.round(that.money1 / (that.number + 1) * 100) / 100 ==
                  that.presentPrice
                ) {
                  that.money1 =
                    Math.round((that.money1 - that.presentPrice) * 100) / 100
                  console.log('........减优惠........', this.cartStorage)
                  for (let i = 0; i < this.cartStorage.length; i++) {
                    let el = this.cartStorage[i]
                    if (
                      el.id == that.id &&
                      el.specsId == that.specsId &&
                      el.labelId != that.labelId &&
                      el.money1 >= el.originalPrice
                    ) {
                      el.money1 =
                        Math.round(
                          (el.money1 - el.originalPrice + el.presentPrice) * 100
                        ) / 100
                      console.log('............for..........')
                      break
                    }
                  }
                } else {
                  that.money1 =
                    Math.round((that.money1 - that.originalPrice) * 100) / 100
                  console.log('........减原价........', num)
                }
                that.money2 =
                  Math.round((that.money2 - that.originalPrice) * 100) / 100
              } else {
                that.money1 =
                  Math.round((that.money1 - that.presentPrice) * 100) / 100
                console.log('........减优惠价........', num)
              }
              that.money2 =
                Math.round((that.money2 - that.originalPrice) * 100) / 100
            } else {
              that.money1 =
                Math.round((that.money1 - that.originalPrice) * 100) / 100

              that.money2 =
                Math.round((that.money2 - that.originalPrice) * 100) / 100
            }
          }
        } else if (type == '1') {
          if (this.cartStorage[index].stock <= this.cartStorage[index].number) {
            this.toast(this.shop_index.stock)
            return
          }
          this.cartStorage[index].number++

          this.cartNum++
          if (that.isSpecs == 1 || that.attributeId) {
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
              if (num > that.limitNum) {
                that.money1 =
                  Math.round((that.originalPrice + that.money1) * 100) / 100
              } else {
                that.money1 =
                  Math.round((that.presentPrice + that.money1) * 100) / 100
              }
              that.money2 =
                Math.round((that.originalPrice + that.money2) * 100) / 100
            } else {
              that.money1 =
                Math.round((that.originalPrice + that.money1) * 100) / 100

              that.money2 =
                Math.round((that.originalPrice + that.money2) * 100) / 100
            }
          } else {
            let num = 0
            num = that.number
            if (num > that.limitNum && num - that.limitNum < 2) {
              this.toast(this.shop_index.Exce)
            }
          }
        }
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }
        this.cartStorage.forEach((el, index) => {
          if (el.number == 0) {
            this.cartStorage.splice(index, 1)
          }
          if (el.id == this.detailData.id) {
            this.detailData.number = el.number
          }
        })
        localStorage.setItem('cartList', JSON.stringify(this.cartStorage))
        this.cartS++
      } else {
        if (s || l) {
          // this.toast.error("该商品无法在这操作！");
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
              localStorage.setItem(
                'shop_detail',
                JSON.stringify(this.detailData)
              )
              this.getGoodsCartCount()
              this.get_GoodsCart()
              if (this.cart_list_num) {
                let number = 0
                let arr = this.cart_list_num.filter(el => {
                  return this.detailData.id == el.id
                })
                arr.forEach(el => {
                  number += el.number
                })
                //    this.detailData.number = number;
              }
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

          console.log('222222222222222', this.cart_list_num)

          Object.assign(store.state.getGoodsCart, data1)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    //加减购物车商品
    addRemove(type, id) {
      this.goodsId = id
      if (this.detailData.goodsAttributeList || this.detailData.isSpecs == 1) {
        if (type == -1 && this.detailData.number >= 2) {
          this.toast.error(this.shop_index.allDel)
          return
        }
        if (type == 1) {
          this.detailSpecs = true
          return
        }
      }
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let total = 0
        let that = this.detailData
        if (type == '-1') {
          this.detailData.number--

          this.cartNum--
        } else if (type == '1') {
          if (this.detailData.stock <= this.detailData.number) {
            this.toast(this.shop_index.stock)
            return
          }
          this.detailData.number++

          this.cartNum++
        }
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }

        let da = this.detailData
        if (arr.length > 0) {
          arr.forEach((el, i) => {
            if (el.id == da.id) {
              console.log(el.id, da.id, 'id')
              arr.splice(i, 1)
            }
          })
          arr.push(this.detailData)
        } else {
          arr.push(this.detailData)
        }
        let num = 0
        // console.log(da,'rrr')
        arr.forEach((el, index) => {
          // console.log(11111111111111)
          if (el.id == da.id) {
            num = el.number
          }
          if (el.number == 0) {
            arr.splice(index, 1)
          }
        })
        // console.log(num,da.limitNum,'shushu')
        if (da.isDiscount == 1 && type == 1) {
          if (num > da.limitNum && num - da.limitNum < 2) {
            this.toast(this.shop_index.Exce)
          }
        }

        console.log(arr)
        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        if (type == '-1') {
          this.detailData.number--
          //   this.goodsArr.splice(index, 1, this.goodsArr[index])
        } else if (type == '1') {
          this.detailData.number++
          console.log(this.detailData.number, 'iii')
          //   this.goodsArr.splice(index, 1, this.goodsArr[index])
        }
        console.log(type, id, 'type')
        this.addGoodsCart(type, id)
      }
    },
    // 单店购物车清空
    deleteGoodsCart() {
      this.detailData.number = 0
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }
        this.cartStorage.forEach(el => {
          if (el.sellerId == this.id) {
            el.number = 0
            this.cartNum = 0
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
        .catch(err => {})
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
    },
    sele(index, id, attr, label) {
      this.seleN = index
      this.labelId = id
      this.attributeId = attr
      this.goodsAttributeLabel = label
    },
    //选好了
    select_cart() {
      this.cartS++
      // console.log(this.detailData.goodsAttributeList.length,'this.detailData.goodsAttributeList.length')
      if (this.detailData.isSpecs == 1 && this.selN == null) {
        this.toast.error(this.shop_index.ple)
        return
      }
      if (this.detailData.goodsAttributeList && this.seleN == null) {
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
        let data = simpleClone(this.detailData)
        data.specsId = this.specsId
        data.labelId = this.labelId
        data.attributeId = this.attributeId
        if (data.isDiscount == 0) {
          data.limitNum = 0
        }
        if (this.limitNum) {
          data.limitNum = this.limitNum
          data.isDiscount = 1
        }
        // if(this.selN!=null&&!this.limitNum){
        //   data.isDiscount=0;
        //   data.limitNum = 0;
        // }
        if (this.originalPrice) {
          data.originalPrice = this.originalPrice
        }
        if (this.presentPrice) {
          data.presentPrice = this.presentPrice
        }
        data.goodsSpecs = this.goodsSpecs
        data.goodsAttributeLabel = this.goodsAttributeLabel
        data.number = 1
        if (!arr) {
          arr = []
        }

        let pushArr = []
        let pushNum = 0
        let stockArr = []
        let stockNum = 0
        if (arr.length > 0) {
          arr.forEach(el => {
            stockNum = 0
            pushNum = 0
            // console.log('11111111', el)
            if (el.id == data.id && el.specsId == data.specsId && el.specsId) {
              pushArr.push(el)
              // console.log(data,'data')
            } else if (
              el.id == data.id &&
              el.attributeId == data.attributeId &&
              !el.specsId
            ) {
              pushArr.push(el)
            }
            if (el.id == data.id) {
              stockArr.push(el)
            }
            if (stockArr.length > 0) {
              stockArr.forEach(el => {
                stockNum += el.number
              })
            }
            if (pushArr.length > 0) {
              pushArr.forEach(el => {
                pushNum += el.number
              })
            }
          })
        } else {
          if (this.limitNum) {
            data.money1 = this.presentPrice
            data.money2 = this.originalPrice
          } else if (data.limitNum && !data.specsId) {
            data.money1 = data.presentPrice
            data.money2 = data.originalPrice
          } else if (!data.limitNum && !data.specsId) {
            data.money1 = data.originalPrice
            data.money2 = data.originalPrice
          } else {
            data.money1 = this.originalPrice
            data.money2 = this.originalPrice
          }
        }

        if (this.limitNum) {
          if (pushNum >= this.limitNum) {
            data.money1 = this.originalPrice
          } else {
            data.money1 = this.presentPrice
          }
          data.money2 = this.originalPrice
        } else if (data.limitNum && !data.specsId) {
          if (pushNum >= data.limitNum) {
            data.money1 = data.originalPrice
          } else {
            data.money1 = data.presentPrice
          }
          data.money2 = data.originalPrice
        } else if (!data.limitNum && !data.specsId) {
          data.money1 = data.originalPrice
          data.money2 = data.originalPrice
        } else {
          data.money1 = this.originalPrice
          data.money2 = this.originalPrice
        }

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

              if (this.limitNum) {
                if (pushNum >= this.limitNum) {
                  let money1 =
                    Math.round((this.originalPrice + el.money1) * 100) / 100
                  data['money1'] = money1
                } else {
                  data.money1 =
                    Math.round((this.presentPrice + el.money1) * 100) / 100
                }
                data.money2 =
                  Math.round((this.originalPrice + el.money2) * 100) / 100
              } else if (data.limitNum && !data.specsId) {
                if (pushNum >= data.limitNum) {
                  let money1 =
                    Math.round((data.originalPrice + el.money1) * 100) / 100
                  data['money1'] = money1
                } else {
                  data.money1 =
                    Math.round((data.presentPrice + el.money1) * 100) / 100
                }
                data.money2 =
                  Math.round((data.originalPrice + el.money2) * 100) / 100
              } else if (!data.limitNum && !data.specsId) {
                data.money1 =
                  Math.round((data.originalPrice + el.money1) * 100) / 100
                data.money2 =
                  Math.round((data.originalPrice + el.money2) * 100) / 100
              } else {
                data.money1 =
                  Math.round((this.originalPrice + el.money1) * 100) / 100
                data.money2 =
                  Math.round((this.originalPrice + el.money2) * 100) / 100
              }
            }
          })
          console.log('data.limitNum', data.limitNum)

          if (this.detailData.stock < stockNum + 1) {
            this.toast(this.shop_index.stock)
            return
          }
          this.cartNum++
          arr.push(data)
        } else {
          arr = []
          arr.push(data)
        }
        this.detailData.number++
        if (data.limitNum) {
          console.log('el.number')
          let num = 0
          arr.forEach((el, index) => {
            console.log('el.number', el.number)
            if (el.id == data.id && el.specsId == data.specsId) {
              num += el.number
            }
            console.log(num, 'num24547545')
          })

          if (num > data.limitNum && num - data.limitNum < 2) {
            this.toast(this.shop_index.Exce)
          }
        }
        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        this.detailData.number++
        this.addGoodsCart(1, this.goodsId)
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
    batchAddGoodsCart() {
      let data = localStorage.getItem('orderData')
      store
        .dispatch('batchAddGoodsCart', { goodsCart: data, platform: 3 })
        .then(res => {
          // console.log("购物车信息", res.data);
          let data = res.data
          if (res.data.code == 1) {
            this.$router.push('/submit_order?id=' + this.id)
            // localStorage.setItem("orderData", JSON.stringify([]));
            Object.assign(store.state.batchAddGoodsCart, data)
          } else {
            this.toast.error(res.data.message)
            // localStorage.setItem("orderData", JSON.stringify([]));
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
.shopDetail {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
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
        border-bottom: 1px solid #f6f6f6;
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
            border-right: 1px solid #f6f6f6;
          }
        }
      }
    }
  }
}
.shop_header {
  position: fixed;
  left: 0;
  top: 0;
  width: 12rem;
}

.shop_header > span {
  width: 1.8rem;
  height: 1.8rem;
  padding: 0.4rem;
}

.shop_header > span > img {
  height: 100%;
  height: 100%;
  object-fit: cover;
}

.shopImage {
  width: 12rem;
  height: 9rem;
  background: #ccc;
}
.shopImage > i {
  width: 100%;
  height: 100%;
}
.shopImage > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods_information {
  width: 100%;
  padding: 0.4rem;
  background: white;
}

.goods_information > ul {
  width: 8rem;
  height: 2.7rem;
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

.goods_information > ul > li:nth-child(1) {
  font-size: 13px;
  color: #111;
  width: 9rem;
  padding: 0 0.2rem;
}

.goods_information > ul > li:nth-child(2) {
  color: #a0a0a0;
  padding: 0.1rem 0.2rem;
}

.goods_information > ul > li:nth-child(2) > p {
  font-size: 13px;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(2) > img {
  width: 0.4rem;
  height: 0.4rem;
}

.goods_information > ul > li:nth-child(2) > span {
  font-size: 11px;
}

.goods_information > ul > li:nth-child(3) {
  padding: 0 0.2rem;
  margin-top: 0.5rem;
}

.goods_information > ul > li:nth-child(3) > p {
  font-size: 16px;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(3) > span {
  font-size: 13px;
  color: #ff3c39;
  /* text-decoration: line-through */
}

.goods_information > .uls {
  width: 10rem;
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

.goods_information.uu {
  width: 100%;
  padding: 0.5rem;
  background: white;
}

.goods_information > p {
  width: 4rem;
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

.shopHead {
  width: 12rem;
  height: 3rem;
  position: fixed;
  left: 0;
  top: 1.2rem;
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

.shop_cart {
  width: 100%;
  height: 1.8rem;
  background: #999;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 991;
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
  z-index: 88;
  right: 0.5rem;
}

.shop_cart > div:nth-child(1) > span {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  z-index: 99;
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
  font-size: 0.26rem;
}

.shop_cart > div:nth-child(3) {
  width: 4rem;
}

.shop_cart > div:nth-child(3) > span {
  font-size: 0.46rem;
  width: 4rem;
  height: 100%;
  font-size: 0.46rem;
  line-height: 1.8rem;
  text-align: center;
}

.cartList {
  width: 100%;
  height: calc(100vh - 1.8rem);
  position: fixed;
  left: 0;
  bottom: 1.8rem;
  background: rgba(0, 0, 0, 0.4);
  z-index: 990;
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
  background: rgba(255, 255, 255, 0.3);
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

.detail_block {
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  z-index: 993;
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

.shop_busFlag {
  width: 100%;
  height: 1.8rem;
  background: #999;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 2;
}
</style>
