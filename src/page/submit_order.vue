<template>
  <div class="contain">
    <div class="header_box clearFloat">
      <div class="back_btn" @click="go_back">
        <div>
          <img src="../assets/icons/icon_white_arrow.png" />
        </div>
      </div>
      <div class="title">
        {{get_en.title}}
      </div>
    </div>
    <div class="red_bg"></div>
    <div class="order_contain" ref="scrollContain">
      <!-- 头部地址栏 -->
      <div v-if="isHaveAddr" class="order_address" @click="orderAddr(sellerId)">
        <div class="post_txt">{{get_en.delivery_to}}</div>
        <div class="post_detail">
          <p class="post_addr">{{first_address.houseNumber +', '+ first_address.address}}</p>
          <p class="post_person">{{first_address.name}}&nbsp;{{first_address.phone}}</p>
        </div>
        <div class="img_arrow">
          <img src="./../assets/icons/icon_right_arrow.png" alt="">
        </div>
      </div>
      <!-- 空地址 -->
      <div class="empty_contain" v-if="!isHaveAddr">
        <div class="add_content" @click="go_addAddr">
          <img src="./../assets/icons/icon_addAddr.png">
          <span>{{get_en.add_new_address}}</span>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="order_detail" v-for="(items, index) in carsData" :key="index">
        <div class="shop_detail">
          <div class="shop_img">
            <img :src="items.sellerLogo" alt="">
          </div>
          <div class="shop_name">
            {{items.sellerName}}
          </div>
        </div>
        <!-- 购买商品 -->
        <div class="goods_item" v-for="(item, index) in items.sellerList" :key="index">
          <div class="goods_img">
            <img :src="item.goodsPhoto" alt="">
          </div>
          <div class="goods_details">
            <p class="goods_name">
              <span class="goods_title">{{item.goodsName}} </span>
              <span class="goods_money">{{item.money}}P</span>
            </p>
            <p class="goods_format">x{{item.number}}
              <span v-if="item.specs"> {{item.specs}}</span>
              <span v-if="item.label">/ {{item.label}}</span>
            </p>
          </div>
        </div>
        <!-- 配送费 -->
        <div class="post_info" v-if="first_address">
          {{get_en.distribution_fee}}
          <span class="post_cost">{{first_address.logistics}}P</span>
        </div>
        <!-- 餐具费 -->
        <div class="post_info" v-if="items.lunchboxPrice !== 0">
          {{get_en.cutlery_fee}}
          <span class="post_cost">{{items.lunchboxPrice}}P</span>
        </div>
        <!-- 优惠 -->
        <div class="post_info benefit_contain" v-if="reduction.fullReduction !== 0 || available_coupon !== 0">
          <!-- 满减 -->
          <div class="discount" v-if="reduction.fullReduction !== 0">
            <span class="img_contain">
              <img src="./../assets/icons/full_subtraction.png" alt="">
            </span>
            <span class="benefit_title">
              {{get_en.discounts}}
            </span>
            <!-- 满减具体金额 -->
            <span class="haveCoupon" v-show="!showCoupon">
              <span class="benefit_count">
                -{{reduction.fullReductionMap.discount_amount}}P
              </span>
            </span>
            <!-- 几张可用 -->
            <span class="haveCoupon" v-show="showCoupon">
              <span class="useful_coupon" @click="selectType">
                1{{get_en.available_count}}
                <img src="./../assets/icons/icon_right_arrow.png" alt="">
              </span>
            </span>
          </div>
          <!-- 优惠券 -->
          <div class="discount coupons" v-show="available_coupon !== 0">
            <span class="img_contain">
              <img src="./../assets/icons/icon_coupon.png" alt="">
            </span>
            <span class="benefit_title">
              {{get_en.coupons}}
            </span>
            <!-- 优惠券具体金额 -->
            <span class="haveCoupon" v-show="showCoupon">
              <span class="benefit_count" @click="go_reduce">
                -{{select_coupon.money}}P
                <img src="./../assets/icons/icon_right_arrow.png" alt="">
              </span>
            </span>
            <!-- 几张可用 -->
            <span class="haveCoupon" v-show="!showCoupon">
              <span class="useful_coupon" @click="go_reduce">
                {{available_coupon}}{{get_en.available}}
                <img src="./../assets/icons/icon_right_arrow.png" alt="">
              </span>
            </span>
          </div>
          <!-- TODO 需要迁移至微信 -->
          <p class="discount_tip" v-if="reduction.fullReduction !== 0 && available_coupon !== 0">{{get_en.discount_tip}}</p>
        </div>
        <!-- 总价 -->
        <div class="all_amount">
          <div @click="goDiscount" class="discount_info">
            <div v-show="reduction.fullReduction !== 0 || available_coupon !== 0">
              {{get_en.activity_rules}}
              <img src="./../assets/icons/icon_discount_info.png" alt="">
            </div>
          </div>
          <div>
            {{get_en.to_cope_with}}
            <span>{{showPrice(final_money + logistics)}}P</span>
          </div>
        </div>
      </div>
      <!-- 备注 支付方式 -->
      <div class="tip_contain">
        <div class="payment">
          {{get_en.payment_method}}
          <span>{{get_en.online_payment}}</span>
        </div>
        <div class="order_note">
          <p class="note_title">{{get_en.note}}</p>
          <textarea ref="textarea" @blur="blured" @focus="focused" class="txtElem" v-model="remark" :placeholder="get_en.order_tip"></textarea>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="all_money">
        {{get_en.total}}
        <span class="total_money" v-show="final_money">{{showPrice(final_money + logistics)}}P&nbsp;</span>
        <span class="coupon_money" v-show="discountMoney != 0">|&nbsp;&nbsp;{{get_en.discounted}}&nbsp;{{discountMoney}}P</span>
      </div>
      <div class="go_order" @click="placeOrder">
        {{get_en.order_now}}
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getCookie } from '@/utils/cookies'
export default {
  data() {
    return {
      sellerId: '', // 商家ID
      logistics: 0, // 配送费
      discountMoney: 0, //优惠金额
      totalPrice: '', // 商品总金额
      final_money: 0, // 实付金额
      device: 1, // 提交设备
      AdderId: '', // 地址id
      remark: '', // 备注
      totalLunchboxPrice: '', // 总餐盒费
      carsData: [],
      address: [],
      isHaveAddr: false,
      first_address: false,
      reduction: {
        fullReductionMap: {
          discount_amount: ''
        }
      },
      reduce_amount: 0, // 不含优惠商品总价
      available_coupon: 0, // 可用优惠券数量
      showCoupon: false, // 判断显示满减\优惠状态
      select_coupon: {}, // 已选择优惠券的信息
      others_money: 0, // 不包含优惠的总价
      GoodsList: {
        GoodsList: []
      },
      activityRuleId: {
        activityRuleId: []
      },
      language: ''
    }
  },
  beforeCreate() {
    // location.reload()
    let orderSeller = sessionStorage.getItem('orderSeller')
    if (orderSeller !== this.$route.query.id) {
      sessionStorage.removeItem('orderAddress')
      sessionStorage.setItem('orderSeller', this.$route.query.id)
    }
  },
  created() {
    this.language = getCookie('lang')
    document.getElementById('app').style.height = '100%'
    document.getElementsByTagName('body')[0].style.height = '100%'
    document.getElementsByTagName('html')[0].style.height = '100%'
    store.state.carShopId = this.sellerId = this.$route.query.id
    // this.select_coupon = store.state.select_coupon;
    // this.showCoupon = store.state.select_coupon.showCoupon;
    // if (this.showCoupon) {
    //   this.discountMoney = parseFloat(this.select_coupon.money);
    //   this.final_money =
    //     parseFloat(this.others_money) - parseFloat(this.select_coupon.money) + parseFloat(this.logistics);
    //   let list = {
    //     activityId: this.select_coupon.activityId,
    //     activityType: this.select_coupon.activityType
    //   };
    //   this.activityRuleId.activityRuleId = [];
    //   this.activityRuleId.activityRuleId.push(list);
    // }
    this.UserOrderAddress()
  },
  computed: {
    get_en() {
      return this.$t('place_order')
    }
  },
  mounted() {
    // store.state.carShopId = this.sellerId = this.$route.query.id;
    this.select_coupon = store.state.select_coupon
    this.showCoupon = store.state.select_coupon.showCoupon
    setTimeout(() => {
      this.$nextTick(() => {
        if (this.showCoupon) {
          this.discountMoney = parseFloat(this.select_coupon.money)
          this.final_money =
            parseFloat(this.others_money) - parseFloat(this.select_coupon.money)
          // +
          // parseFloat(this.logistics);
          let list = {
            activityId: this.select_coupon.activityId,
            activityType: this.select_coupon.activityType
          }
          this.activityRuleId.activityRuleId = []
          this.activityRuleId.activityRuleId.push(list)
        }
      }, 500)
    })
    // this.UserOrderAddress();
    this.getCarData()
    // this.$refs.scrollContain.addEventListener('scroll', function() {
    //   document.getElementsByClassName('txtElem')[0].blur()
    // })
  },
  beforeDestroy() {
    document.getElementById('app').style.height = ''
    document.getElementsByTagName('body')[0].style.height = ''
    document.getElementsByTagName('html')[0].style.height = ''
  },
  methods: {
    blured() {
      let elem = this.$refs.scrollContain
      elem.style.height = '82.2%'
    },
    focused() {
      let elem = this.$refs.scrollContain
      elem.style.height = '140vh'
    },
    goDiscount() {
      // this.$router.push(`/description?language=${this.language}&local=0`)
      this.$router.push({
        path: '/description',
        query: {
          language: this.language,
          local: 0
        }
      })
    },
    go_addAddr() {
      this.$router.push(`/order_address?id=${this.sellerId}`)
    },
    placeOrder() {
      if (!this.first_address) {
        this.toast.error('请选择收货地址')
        return
      }
      store
        .dispatch('orderInfo', {
          GoodsList: JSON.stringify(this.GoodsList),
          sellerId: this.sellerId,
          totalPrice: this.showPrice(this.totalPrice + this.logistics),
          actualPrice: this.showPrice(
            parseFloat(this.final_money) + this.logistics
          ),
          logistics: this.logistics,
          discountMoney: this.discountMoney,
          device: this.device,
          AdderId: this.AdderId,
          remark: this.remark,
          totalLunchboxPrice: this.totalLunchboxPrice,
          activityRuleId: (this.activityRuleId =
            this.activityRuleId.length == 0
              ? ''
              : JSON.stringify(this.activityRuleId))
        })
        .then(res => {
          if (res.data.code == 1) {
            localStorage.setItem('cartList', JSON.stringify([]))
            store.state.select_coupon.showCoupon = false
            this.$router.push(`/selectPayMethod?id=${res.data.data}`)
          } else {
            let txt = this.$t('place_order.server_error')
            this.toast(txt)
          }
        })
    },
    go_reduce() {
      this.$router.push('/coupon')
    },
    selectType() {
      this.showCoupon = !this.showCoupon
      if (this.showCoupon) {
        this.discountMoney = parseFloat(this.select_coupon.money)
        this.final_money = (
          parseFloat(this.others_money) - parseFloat(this.select_coupon.money)
        ).toFixed(2)
        this.final_money = this.formatCount(this.final_money)
      } else {
        if (this.reduction.fullReduction !== 0) {
          store.state.select_coupon = {
            money: '',
            id: '',
            activityType: '',
            showCoupon: false
          }
          this.discountMoney = parseFloat(
            this.reduction.fullReductionMap.discount_amount
          )
          this.final_money = (
            parseFloat(this.others_money) -
            parseFloat(this.reduction.fullReductionMap.discount_amount)
          ).toFixed(2)
          this.final_money = this.formatCount(this.final_money)
          let list = {
            activityId: this.reduction.fullReductionMap.id,
            activityType: this.reduction.fullReductionMap.controlType
          }
          this.activityRuleId.activityRuleId = []
          this.activityRuleId.activityRuleId.push(list)
        }
      }
    },
    formatCount(count) {
      return parseFloat(count)
    },
    showPrice(price) {
      return parseFloat(parseFloat(price).toFixed(2))
    },
    UserOrderAddress() {
      // 当我写到这里, 只有老天跟我知道我在干嘛
      let orderAddress = JSON.parse(sessionStorage.getItem('orderAddress'))
      orderAddress = orderAddress == null ? {} : orderAddress
      orderAddress.select =
        orderAddress.select == null ? false : orderAddress.select
      // if (store.state.orderAddress.select) {
      //   this.first_address = store.state.orderAddress
      //   store.state.orderAddress.select = false
      //   this.isHaveAddr = true
      if (orderAddress.select) {
        this.first_address = orderAddress
        // console.log(this.first_address,"+++++++++++")
        this.logistics = this.first_address.logistics
        this.AdderId = this.first_address.id
        orderAddress.select = false
        this.isHaveAddr = true
      } else {
        store
          .dispatch('UserOrderAddress', { sellerId: store.state.carShopId })
          .then(res => {
            if (res.data.code == 1) {
              this.address = res.data.data
              for (let [index, item] of this.address.entries()) {
                if (item.status == 0) {
                  // 现在只有天知道
                  store.state.orderAddress.address = item.address
                  store.state.orderAddress.name = item.name
                  store.state.orderAddress.phone = item.phone
                  store.state.orderAddress.id = item.id
                  store.state.orderAddress.logistics = item.logistics
                  store.state.orderAddress.houseNumber = item.houseNumber // 添加门牌号
                  store.state.orderAddress.seleted = false
                  this.first_address = store.state.orderAddress
                  this.logistics = item.logistics
                  this.AdderId = item.id
                  this.isHaveAddr = true
                  sessionStorage.setItem(
                    'orderAddress',
                    JSON.stringify(store.state.orderAddress)
                  )
                  return
                } else {
                  this.first_address = false
                }
              }
            }
          })
      }
    },
    PreferentialInformation() {
      store
        .dispatch('PreferentialInformation', {
          price: this.reduce_amount,
          platform: 1,
          status: 1,
          sellerId: this.carsData[0].sellerId
        })
        .then(res => {
          this.reduction = res.data.data
          if (this.reduction.fullReduction !== 0) {
            if (!this.showCoupon) {
              this.discountMoney = this.reduction.fullReductionMap.discount_amount
            }
            this.final_money = (
              parseFloat(this.final_money) -
              parseFloat(this.reduction.fullReductionMap.discount_amount)
            ).toFixed(2)
            this.final_money = this.formatCount(this.final_money)
            this.first_address.logistics
            this.others_money = parseFloat(this.others_money)
          }
          this.totalPrice = parseFloat(this.totalPrice)
          this.final_money = this.first_address
            ? parseFloat(this.final_money)
                // +
                // parseFloat(this.first_address.logistics)
                .toFixed(2)
            : parseFloat(this.final_money)
          this.final_money = this.formatCount(this.final_money)
          for (let [index, item] of this.reduction.couponInfoMap.entries()) {
            if (item.status == 1) {
              this.available_coupon++
            }
          }
          sessionStorage.setItem('reduceData', JSON.stringify(res.data.data))
          Object.assign(store.state.reduceData, res.data.data)
          if (this.showCoupon) {
            this.final_money = (
              parseFloat(this.others_money) -
              parseFloat(this.select_coupon.money)
            ).toFixed(2)
            if (this.reduction.fullReduction == 0) {
              this.final_money = (
                parseFloat(this.others_money) -
                parseFloat(this.select_coupon.money)
              ).toFixed(2)
            } else {
              this.final_money = (
                parseFloat(this.others_money) -
                parseFloat(this.select_coupon.money)
              ).toFixed(2)
            }
            this.final_money = this.formatCount(this.final_money)
          } else {
            if (this.reduction.fullReductionMap) {
              let list = {
                activityId: this.reduction.fullReductionMap.id,
                activityType: this.reduction.fullReductionMap.controlType
              }
              this.activityRuleId.activityRuleId = []
              this.activityRuleId.activityRuleId.push(list)
            }
          }
        })
    },
    orderAddr(sellerId) {
      this.$router.push(`/order_address?id=${sellerId}`)
    },
    getCarData() {
      store.dispatch('getGoodsCart').then(res => {
        store.state.carShopId = ''
        this.carsData = res.data.data
        this.sellerId = this.carsData[0].sellerId
        for (let [index, item] of this.carsData[0].sellerList.entries()) {
          let list = {}
          if (item.isDiscount == 0) {
            this.reduce_amount += item.originalPrice * item.number
          } else if (item.isDiscount == 1) {
            if (item.number <= item.limitNum) {
              this.reduce_amount += 0
            } else {
              this.reduce_amount += item.originalNumber * item.originalPrice
            }
          }
          list.num = item.number
          list.goodsId = item.id
          list.goodsAttribute = item.specsId == 0 ? '' : item.specsId
          list.goodsAttributeLabel = item.labelId == 0 ? '' : item.labelId
          this.GoodsList.GoodsList.push(list)
        }
        this.GoodsList.GoodsList.reverse()
        this.totalLunchboxPrice = this.carsData[0].lunchboxPrice
        this.totalPrice = this.final_money = this.others_money = this.carsData[0].totalMoney.toFixed(
          2
        )
        this.reduce_amount = this.reduce_amount.toFixed(2)
        this.PreferentialInformation()
      })
    },
    go_back() {
      if (this.$route.name.indexOf('submit_order') !== -1) {
        this.$router.push(`/business_shop?id=${this.sellerId}&pathName=home`)
      } else {
        history.go(-1)
      }
      sessionStorage.removeItem('area_code')
    }
  }
}
</script>

<style lang="scss" scoped type="css/text">
.contain {
  height: 100%;
  .order_contain {
    position: absolute;
    width: 97%;
    top: 8vh;
    z-index: 1;
    margin: 0.4rem 0.2rem 0;
    height: 82.2%;
    // height: 100vh;
    padding-bottom: 1rem;
    overflow-y: auto;
    .order_address {
      height: 3rem;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      flex-flow: row;
      align-items: center;
      padding: 0 0.4rem;
      .post_txt {
        font-size: 14px;
        color: #999999;
        margin-right: 0.6rem;
        width: 1.6rem;
      }
      .post_detail {
        width: 8rem;
        font-weight: bold;
        .post_addr {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 95%;
        }
        .post_person {
          margin-top: 0.5rem;
          font-size: 14px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 90%;
        }
      }
      .img_arrow {
        img {
          width: 0.3rem;
        }
      }
    }
    .empty_contain {
      margin-top: 0.3rem;
      height: 3rem;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      .add_content {
        width: 8rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        border: 1px solid #ff644d;
        border-radius: 1rem;
        color: #ff644d;
        img {
          width: 0.5rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 16px;
        }
      }
    }
    .order_detail {
      margin-top: 0.4rem;
      padding: 0.4rem;
      padding-right: 0;
      background: #ffffff;
      border-radius: 4px;
      .shop_detail {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding-bottom: 0.4rem;
        // margin-right: .4rem;
        border-bottom: 1px solid #ddd;
        .shop_img {
          font-size: 0;
          flex-grow: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50px;
            overflow: hidden;
            border: 1px solid #edeaea;
          }
        }
        .shop_name {
          flex-grow: 1;
          font-size: 16px;
          color: #333333;
          padding-left: 0.6rem;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .goods_item {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding: 0.4rem 0;
        padding-right: 0.4rem;
        border-bottom: 1px solid #ddd;
        .goods_img {
          flex-grow: 0;
          font-size: 0;
          img {
            width: 1.5rem;
          }
        }
        .goods_details {
          flex-grow: 1;
          padding-left: 0.4rem;
          .goods_name {
            font-size: 14px;
            color: #333333;
            span.goods_title {
              width: 7rem;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span.goods_money {
              float: right;
              color: #999999;
              font-size: 14px;
            }
          }
          .goods_format {
            font-size: 14px;
            color: #999999;
          }
        }
      }
      .post_info {
        padding: 0.4rem 0;
        margin-right: 0.4rem;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        color: #333;
        .post_cost {
          float: right;
          font-size: 14px;
          color: #999999;
        }
        .coupons {
          margin-top: 0.4rem;
        }
        .discount {
          margin-top: 0.4rem;
          font-size: 0;
          span {
            vertical-align: middle;
          }
          .benefit_title {
            margin-left: 0.4rem;
            font-size: 14px;
            color: #333;
          }
          .benefit_count {
            float: right;
            font-size: 14px;
            color: #ff3633;
            img {
              margin-left: 0.2rem;
              width: 0.3rem;
              vertical-align: middle;
              position: relative;
              top: -0.05rem;
            }
          }
          .useful_coupon {
            float: right;
            font-size: 14px;
            color: #cccccc;
            // vertical-align: middle;
            img {
              margin-left: 0.2rem;
              width: 0.3rem;
              vertical-align: middle;
              position: relative;
              top: -0.05rem;
            }
          }
          .img_contain {
            font-size: 0;
            display: inline-block;
            img {
              width: 0.6rem;
            }
          }
        }
      }
      .benefit_contain {
        padding: 0 0 0.4rem 0;
        .discount_tip {
          font-size: 12px;
          color: #999;
          margin-top: 0.4rem;
        }
      }
      .all_amount {
        display: flex;
        justify-content: space-between;
        // text-align: right;
        padding-top: 0.4rem;
        margin-right: 0.4rem;
        .discount_info {
          color: #999;
        }
        img {
          vertical-align: middle;
          width: 0.4rem;
        }
        span {
          font-size: 16px;
          color: #ff3633;
          font-weight: bold;
        }
      }
    }
    .tip_contain {
      margin: 0.4rem 0;
      padding: 0.4rem 0;
      padding-left: 0.4rem;
      background-color: #fff;
      border-radius: 4px;
      .payment {
        font-size: 14px;
        color: #333333;
        margin-right: 0.4rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid #eee;
        span {
          float: right;
        }
      }
      .order_note {
        padding-top: 0.4rem;
        padding-right: 0.4rem;
        p {
          font-size: 14px;
          color: #333;
        }
        textarea {
          z-index: -1;
          margin-top: 0.4rem;
          width: 100%;
          outline: none;
          border: 0;
          resize: none;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    z-index: 11111;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 52px;
    background-color: #665c5c;
    display: -webkit-box;
    .all_money {
      -webkit-box-flex: 2;
      line-height: 52px;
      padding-left: 0.5rem;
      color: #fff;
      font-size: 14px;
      .total_money {
        font-size: 16px;
      }
      .coupon_money {
        font-size: 14px;
        color: #999999;
      }
    }
    .go_order {
      text-align: center;
      line-height: 52px;
      -webkit-box-flex: 1;
      background: #ff644d;
      color: #fff;
      font-size: 16px;
    }
  }
}
.red_bg {
  position: fixed;
  top: 7vh;
  width: 100%;
  height: 1.75rem;
  background-image: linear-gradient(90deg, #ff644c 3%, #ff3633 99%);
  z-index: 0;
}
.header_box {
  width: 100%;
  height: 8vh;
  min-height: 45px;
  color: #fff;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: fixed;
  background-image: linear-gradient(90deg, #ff644c 3%, #ff3633 99%);
  z-index: 2;
  .back_btn {
    width: 12px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0.4rem;
    display: flex;
    align-items: center;
  }
  .back_btn div {
    width: 100%;
    height: 40%;
  }
  .back_btn img {
    width: 100%;
    height: 100%;
  }
  .title {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  .right_btn {
    height: 100%;
    position: absolute;
    right: 0.4rem;
    top: 0;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .right_btn img {
    width: 50%;
  }
}
</style>
