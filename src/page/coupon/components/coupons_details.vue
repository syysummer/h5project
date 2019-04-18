<template>
    <div ref="wrapper" class="coupon_contain" :class="{iphone5: isIphone5, iphoneP: isIphoneP, iphone6: isIphone6, iphoneX: isIphoneX}">
      <div>
        <div class="coupon_row" v-show="isEmpty" v-for="(item, index) in couponsData" :key="index">
          <!-- TODO 有数据后根据可用状态放开蒙层 -->
          <div class="useless_mask" v-if="item.expire == 1">
            <!-- <img v-lazy="useless_zh" v-if="language == 'zh'">
            <img v-lazy="useless_en" v-if="language == 'en'"> -->
            <img :src="useless_zh" v-if="language == 'zh'">
            <img :src="useless_en" v-if="language == 'en'">
          </div>
          <div class="useless_mask" v-if="item.used == 1">
            <!-- <img v-lazy="used_zh" v-if="language == 'zh'">
            <img v-lazy="used_en" v-if="language == 'en'"> -->
            <img :src="used_zh" v-if="language == 'zh'">
            <img :src="used_en" v-if="language == 'en'">
          </div>
          <div class="coupon_items" :class="item.universal_id == 0 ? 'coupon_platform' : 'coupon_store'">
            <div class="coupon_detail">
              <p class="coupon_name" v-if="item.universal_id == 0">{{en_txt.platform_coupons}}</p>
              <p class="coupon_name store_color" v-if="item.universal_id == 1">{{en_txt.merchant_coupons}}</p>
              <p class="expired_date" :class="{store_color: item.universal_id == 1, iphone5: isIphone5}">{{$formatDateTime(item.expireTime, 'ymd')}} {{en_txt.overdue}}</p>
              <p class="use_platform" v-if="item.universal_id == 0">{{en_txt.platform_use}}</p>
              <p class="use_platform" v-if="item.universal_id == 1">{{en_txt.limit}} {{item.universal}} {{en_txt.use}}</p>
              <!-- <p class="use_phone">{{en_txt.Limit_number}} {{item.tel}}</p> -->
            </div>
            <div class="coupon_discrpt">
              <p class="coupon_worth"><span :class='{smallFont: couponsData.isSmall}'>{{item.money}}</span> P</p>
              <p class="coupo_limit" v-show="item.fullMoney">{{en_txt.full}} {{item.fullMoney}} {{en_txt.to_use}}</p>
              <p class="coupo_limit" v-show="!item.fullMoney">{{en_txt.no_limit}}</p>
            </div>
          </div>
          <div class="useless_tip" v-if="item.expire == 1">
            <span>{{en_txt.unavailable_reason}}</span>
          </div>
          <div class="useless_tip" v-if="item.used == 1">
            <span></span>
          </div>
        </div>
      </div>
			<div class="empty_coupon" v-show="!isEmpty">
				<!-- <img v-lazy='empty_img'> -->
				<img :src='empty_img'>
				<p>{{$t('coupon.not_enough_coupon')}}</p>
			</div>
		</div>
</template>
<script>
import Bscroll from "better-scroll";
import { setCookie, getCookie, removeCookie } from "@/utils/cookies";
export default {
  data() {
    return {
      empty_img: require("@/assets/images/我的-无优惠卷插图.png"),
      used_zh: require("@/assets/images/已使用@2x.png"),
      used_en: require("@/assets/images/已使用-english@2x.png"),
      useless_zh: require("@/assets/images/已失效@2x.png"),
      useless_en: require("@/assets/images/已失效-english@2x.png"),
      isHover: true,
      platform: true,
      isIphoneX: false,
      isIphoneP: false,
      isIphone6: false,
      isIphone5: false,
      isEmpty: true
    };
  },
  props: ["couponsData"],
  created() {
    this.language = getCookie("lang");
    let ALL_HEIGHT = document.body.clientHeight;
    let is_iOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (is_iOS) {
      if (ALL_HEIGHT > 630 && ALL_HEIGHT < 640) {
        this.isIphoneX = true;
      } else if (ALL_HEIGHT > 545 && ALL_HEIGHT < 560) {
        this.isIphone6 = true;
      } else if (ALL_HEIGHT > 610 && ALL_HEIGHT < 630) {
        this.isIphoneP = true;
      } else if (ALL_HEIGHT > 450 && ALL_HEIGHT < 470) {
        this.isIphone5 = true;
      }
    }
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {});
    });
  },
  computed: {
    en_txt() {
      return this.$t("coupon");
    }
  },
  watch: {
    couponsData: function (newVal, oldVal) {
      if (newVal.length == 0) {
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    }
  },
  updated() {
    this.scroll.destroy();
    this.$nextTick(() => {
      setTimeout(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {});
        this.scroll.refresh();
        this.scroll.scrollTo(0, 0, 10);
      }, 500);
    });
  }
};
</script>
<style lang="scss" scoped="" type="text/css">
.contain {
  height: 100%;
}
.coupon_contain {
  height: 84%;
  // overflow-y: auto;
  padding: 0.5rem 0.4rem 0.4rem;
  position: fixed;
  // overflow-y: auto;
  padding: 0.5rem 0.4rem 0.4rem;
  width: 100%;
  top: 16%;
  .coupon_platform {
    background-image: url(../../../assets/images/Combined_Shape.png);
  }
  .coupon_store {
    background-image: url(../../../assets/images/商家优惠卷.png);
  }
  .coupon_row {
    position: relative;
    &:first-child .coupon_items {
      margin: 0;
    }
    .useless_mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      img {
        position: absolute;
        width: 30%;
        right: 1.5rem;
        top: 0.2rem;
      }
    }
    .coupon_items {
      padding: 0.4rem 0.2rem 0.4rem 0.4rem;
      display: -webkit-box;
      background-size: 100% 100%;
      margin-top: 0.4rem;
      height: 3rem;
      .coupon_detail {
        -webkit-box-flex: 20;
        .coupon_name {
          font-size: 16px;
          color: #ff3633;
          font-weight: bold;
        }
        .expired_date {
          font-size: 12px;
          color: #ff8280;
          margin-bottom: 0.2rem;
        }
        .use_platform,
        .use_phone {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #999;
        }
        .store_color {
          color: #ffb900;
        }
      }
      .coupon_discrpt {
        text-align: center;
        color: #fff;
        width: 2.5rem;
        -webkit-box-flex: 1;
        .coupon_worth {
          margin-top: 0.2rem;
          font-size: 14px;
          span {
            font-size: 18px;
            &.smallFont{
              font-size: 17px;
            }
          }
        }
        .coupo_limit {
          color: #ffffff;
          font-size: 12px;
        }
      }
    }
    .useless_tip {
      color: #666;
      padding: 0.2rem 0.2rem 0.2rem 0.4rem;
      background-color: #fafafa;
      border-radius: 4px;
      span {
        font-size: 12px;
      }
    }
  }
  .empty_coupon {
    margin-top: 5.5rem;
    text-align: center;
    img {
      width: 40%;
    }
    p {
      font-size: 14px;
      color: #666;
      margin-top: 0.4rem;
    }
  }
}
// .coupon_contain.iphoneP{
//   height: 75vh;
// }
// .coupon_contain.iphone6{
//   height: 74vh;
// }
// .coupon_contain.iphoneX{
//   height: 71vh;
// }
// .coupon_contain.iphone5{
//   height: 72vh;
// }
// .coupon_contain .coupon_row .coupon_items .coupon_detail .expired_date.iphone5{
//   margin-top: -.2rem;
// }
@media screen and (max-width: 329px) {
  .coupon_contain .coupon_row .coupon_items {
    padding: 0.1rem 0.2rem 0.4rem 0.4rem;
  }
  .coupon_list .coupon_row .coupon_items .coupon_discrpt .coupon_worth span{
    font-size: 16px;
  }
}
</style>