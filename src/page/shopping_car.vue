<template>
  <div class="contain">
    <div class="header_box clearFloat">
      <div class="back_btn" @click="go_back">
        <div>
          <img src="../assets/icons/icon_white_arrow.png" />
        </div>
      </div>
      <div class="title">
        {{get_en.cart}}
      </div>
      <div class="right_btn" @click='deleteGoodsCart'>
        {{get_en.clear}}
      </div>
    </div>
    <div class="car_contain">
      <div v-if="carsData" class="car_item" v-for="(items, index) in carsData" :key="index">
        <div class="item_header">
          <span class="shop_title">
            <span class="title_contain">{{items.sellerName}}</span>
            <span v-if="items.flag == 2 || items.flag == 3" class="rest_time">休息中</span>
          </span>
          <img @click="deleteGoodsCart(items.sellerId)" src="./../assets/icons/icon_Trash.png" alt="">
        </div>
        <div v-for="(item, i) in items.sellerList" :key="i">
          <div class="goods_contain" :style="{right:item.right + 'rem'}">
            <v-touch @panleft="doLeft(index, i)" @panright="doRight(index, i)" @panend="doEnd(index, i)">
              <div class="goods_item_contain">
                <div class="goods_item">
                  <!-- 失效蒙层 -->
                  <div class="invalid_mask" v-if="item.status == 0"></div>
                  <div class="goods_img flex_item1">
                    <img v-lazy="item.goodsPhoto" alt="">
                    <div v-if="item.status == 2">
                      <img v-if="language == 'zh'" class="img_mask" :src="sellComplete_zh" alt="">
                      <img v-if="language == 'en'" class="img_mask" :src="sellComplete_en" alt="">
                    </div>
                    <div v-if="item.status == 0">
                      <img v-if="language == 'zh'" class="img_mask" :src="invalid_zh" alt="">
                      <img v-if="language == 'en'" class="img_mask" :src="invalid_en" alt="">
                    </div>
                  </div>
                  <div class="goods_detail flex_item2">
                    <p class="goods_name">
                      {{item.goodsName}}
                      <span style="display: none">{{item.specsId}}</span>
                    </p>
                    <p class="goods_size">
                      <span class="size_format">{{item.specs}}
                        <span v-if="item.label">/</span>{{item.label}}</span>
                      <span class="goods_price" v-if="item.presentPrice">{{item.money}}P</span>
                    </p>
                    <p class="goods_count">
                      <span class="goods_count">*{{item.number}}</span>
                      <span class="goods_price" v-if="!item.presentPrice">{{item.money}}P</span>
                      <!-- 优惠价 -->
                      <span class="goods_discount" v-if="item.presentPrice">{{item.originalPrice * item.number}}P</span>
                    </p>
                  </div>
                </div>
                <div class="delete_item" @click="deleteGoodsCart(items.sellerId, item.id)">
                  {{get_en.delete}}
                </div>
              </div>
            </v-touch>
          </div>
        </div>
        <div class="packing_contain">
          {{get_en.cutlery_fee}}
          <span class="packing_price">{{items.lunchboxPrice}}P</span>
        </div>
        <div class="price_benefit">
          <span v-if="items.activityMoney">
            {{get_en.discounted}}{{items.activityMoney}}P
          </span>
          <span class="all_price">{{get_en.total}}{{items.totalMoney}}P</span>
        </div>
        <div class="balance_contain">
          <a href="javascript:;" :class="{rest: items.flag == 2 || items.flag == 3}" @click="go_order(items.flag, items.sellerId)">{{get_en.payment}}</a>
        </div>
      </div>
      <div class="red_bg"></div>
      <div class="no_item" v-if="!carsData">
        <img src="./../assets/images/img_no_order.png" alt="">
        <p>{{get_en.cart_empty}}</p>
        <router-link to="/home">
          <a href="javascript:;">{{get_en.go_shopping}}</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import store from '@/store'
export default {
  data() {
    return {
      sellComplete_zh: require('@/assets/images/img_sell_complete_zh.png'),
      sellComplete_en: require('@/assets/images/img_sell_complete_en.png'),
      invalid_zh: require('@/assets/images/img_invalid_zh.png'),
      invalid_en: require('@/assets/images/img_invalid_en.png'),
      language: '',
      carsData: [
        {
          sellerList: []
        }
      ]
    }
  },
  created() {
    this.language = getCookie('lang')
  },
  computed: {
    get_en() {
      return this.$t('shopping_cart')
    }
  },
  mounted() {
    this.getCarsDetail()
  },
  methods: {
    go_order(flag, sellerId) {
      if (flag == 1) {
        this.$router.push(`/submit_order?id=${sellerId}`)
      }
    },
    deleteGoodsCart(sellerId = '', goodsId = '') {
      store.state.cartInfo.sellerId = sellerId
      store.state.cartInfo.goodsId = goodsId
      store.state.cartInfo.platform = 3
      store.dispatch('deleteGoodsCart').then(res => {
        if (res.data.data) {
          this.carsData = res.data.data
        } else {
          this.carsData = null
        }
      })
    },
    getCarsDetail() {
      store.dispatch('getGoodsCart').then(res => {
        this.carsData = res.data.data
      })
    },
    go_back() {
      if (this.$route.name == 'HelloWorld') {
        alert('HelloWorld')
      } else {
        history.go(-1)
      }
      sessionStorage.removeItem('area_code')
    },
    right_btn_fn() {},
    doLeft(index, i) {
      for (let [index, items] of this.carsData.entries()) {
        for (let [j, item] of items.sellerList.entries()) {
          if (i !== j) {
            item.right = 0
          }
        }
      }
      if (this.carsData[index].sellerList[i].right < 2) {
        this.carsData[index].sellerList[i].right += 0.4
      }
    },
    doRight(index, i) {
      if (this.carsData[index].sellerList[i].right > 0) {
        this.carsData[index].sellerList[i].right -= 0.4
      }
    },
    doEnd(index, i) {
      if (this.carsData[index].sellerList[i].right < 1) {
        this.time = setInterval(() => {
          if (this.carsData[index].sellerList[i].right.toFixed(1) < 0) {
            clearInterval(this.time)
            this.time = null
            this.carsData[index].sellerList[i].right = 0
            return
          }
          this.carsData[index].sellerList[i].right -= 0.1
        }, 20)
      } else if (this.carsData[index].sellerList[i].right >= 1) {
        this.time = setInterval(() => {
          if (this.carsData[index].sellerList[i].right > 2) {
            clearInterval(this.time)
            this.time = null
            this.carsData[index].sellerList[i].right = 2
            return
          }
          this.carsData[index].sellerList[i].right += 0.1
        }, 20)
      }
    }
  }
}
</script>

<style lang="scss" scoped type="css/text">
.contain {
  .car_contain {
    position: relative;
    height: 93vh;
    padding-top: 0.4rem;
    overflow-y: auto;
    .red_bg {
      position: fixed;
      top: 7vh;
      width: 100%;
      height: 1.75rem;
      background-image: linear-gradient(90deg, #ff644c 3%, #ff3633 99%);
      z-index: 0;
    }

    .car_item {
      &:first-child {
        margin-top: 0;
        margin-bottom: 0;
      }
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1;
      margin: 0.4rem 0.2rem;
      background-color: #fff;
      border-radius: 8px;
      padding: 0.4rem 0 0.2rem 0.6rem;
      .item_header {
        text-align: right;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #eee;
        .shop_title {
          font-size: 16px;
          color: #333;
          vertical-align: middle;
          display: inline-block;
          text-align: left;
          width: 88%;
          .title_contain {
            width: 70%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            -webkit-box-orient: vertical;
          }
          .rest_time {
            float: right;
            font-size: 14px;
            color: #333;
            line-height: 0.8rem;
          }
        }
        img {
          margin-right: 0.6rem;
          width: 0.5rem;
          vertical-align: middle;
        }
      }
      .goods_contain {
        padding-right: 0.6rem;
        position: relative;
        .goods_item_contain {
          position: relative;
          .goods_item {
            display: flex;
            flex-flow: row;
            padding: 0.4rem 0 0.4rem 0;
            border-bottom: 1px solid #eee;
            .invalid_mask {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: rgba(255, 255, 255, 0.7);
            }
            .goods_img {
              font-size: 0;
              flex-grow: 0;
              position: relative;
              img {
                width: 2rem;
              }
              .img_mask {
                position: absolute;
                top: 0;
                left: 0;
              }
            }
            .goods_detail {
              padding-left: 0.4rem;
              flex-grow: 1;
              .goods_name {
                font-size: 14px;
                color: #333;
              }
              .goods_size {
                height: 0.6rem;
                font-size: 14px;
                color: #999;
                margin: 0.1rem 0;
                .goods_price {
                  float: right;
                  font-size: 14px;
                  color: #ff3633;
                }
              }
              .goods_count {
                font-size: 14px;
                color: #999;
              }
              .goods_price {
                float: right;
                font-size: 14px;
                color: #ff3633;
              }
              .goods_discount {
                float: right;
                font-size: 14px;
                color: #999;
                text-decoration: line-through;
              }
            }
            &:last-child {
              padding-bottom: 0.6rem;
            }
          }
          .delete_item {
            height: 100%;
            width: 2rem;
            position: absolute;
            top: 0;
            right: -2.6rem;
            color: #fff;
            background: #ed3518;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          }
        }
      }
      .packing_contain {
        padding: 0.4rem 0 0.4rem 0;
        margin-right: 0.6rem;
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #eee;
        .packing_price {
          float: right;
          font-size: 14px;
          color: #ff3633;
        }
      }
      .price_benefit {
        padding: 0.4rem 0 0.4rem 0;
        margin-right: 0.6rem;
        min-height: 1.4rem;
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #eee;
        .all_price {
          float: right;
          font-size: 14px;
          color: #ff3633;
        }
      }
      .balance_contain {
        padding: 0.4rem 0.6rem 0.4rem 0;
        text-align: right;
        a {
          padding: 0.4rem;
          background: #ff644d;
          border-radius: 5px;
          color: #fff;
          padding: 0.2rem 0.4rem;
          font-size: 14px;
        }
        a.rest {
          background-color: #ffcdcc;
        }
      }
    }
    .no_item {
      height: 86vh;
      background-color: #fff;
      margin: 0.4rem 0.2rem;
      position: relative;
      z-index: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      img {
        width: 5rem;
      }
      p {
        color: #666666;
        font-size: 14px;
        margin-top: 0.5rem;
      }
      a {
        margin-top: 0.5rem;
        width: 3.5rem;
        height: 1rem;
        background: #ff644c;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
        line-height: 1rem;
        text-align: center;
      }
    }
  }
}
.header_box {
  width: 100%;
  height: 7vh;
  color: #fff;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: relative;
  background-image: linear-gradient(90deg, #ff644c 3%, #ff3633 99%);
  z-index: 2;
}
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
</style>
