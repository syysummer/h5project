<template>
    <div class="coupon_contain">
			<div class="coupon_row" @click="getCoupon(item.id, index)" v-for="(item, index) in couponData" :key="index">
        <!-- TODO 有数据后根据可用状态放开蒙层 -->
        <div class="useless_mask" v-if="item.isCollect == 1"></div>
				<div class="get_coupon coupon_items coupon_platform">
					<div class="coupon_detail">
						<p class="coupon_name">{{en_txt.platform_coupons}}</p>
						<p class="expired_date">{{$formatDateTime(item.endTime, 'ymd')}} {{en_txt.overdue}}</p>
						<p class="use_platform">{{en_txt.platform_use}}</p>
					</div>
					<div class="coupon_discrpt">
						<p class="coupon_worth"><span :class="{smallFont: couponData.isSmall}">{{item.discountAmount}}</span> P</p>
            <!-- 无限制 -->
						<!-- <p class="coupo_limit">{{en_txt.no_limit}}</p> -->
						<p class="coupo_limit">{{en_txt.full}} {{item.limitcontent}} {{en_txt.to_use}}</p>
					</div>
				</div>
        <div class="useless_tip" v-if="item.isCollect == 1">
					<span>{{en_txt.received}}</span>
				</div>
			</div>
			<div class="empty_coupon" v-if="isEmpry">
				<img v-lazy=empty_img>
				<p>{{$t('coupon.not_enough_coupon')}}</p>
			</div>
		</div>
</template>
<script>
import store from "@/store";
export default {
  props: ["couponData"],
  data() {
    return {
      empty_img: require("@/assets/images/我的-无优惠卷插图.png"),
      used_zh: require("@/assets/images/已使用@2x.png"),
      used_en: require("@/assets/images/已使用-english@2x.png"),
      useless_zh: require("@/assets/images/已失效@2x.png"),
      useless_en: require("@/assets/images/已失效-english@2x.png"),
      isLogin: false,
      isEmpry: false
    };
  },
  computed: {
    en_txt() {
      return this.$t("coupon");
    },
    get_en() {
      return this.$t("user");
    }
  },
  watch: {
    couponData: function(newVal, oldVal) {
      if (newVal.length !== 0) {
        this.isEmpry = false;
      } else {
        this.isEmpry = true;
      }
    }
  },
  created() {
    this.isLogin = localStorage.getItem("hasLog");
  },
  methods: {
    getCoupon(id, index) {
      if (this.isLogin == 0) {
        this.toast(this.get_en.noLogin);
        this.$router.push("/user");
        return;
      }
      if (this.couponData[index].isCollect == 1) {
        return;
      }
      store.dispatch("collectCoupon", { activityId: id }).then(res => {
        let txt = this.$t("coupon");
        if (res.data.code === 1) {
          this.toast.success(txt.claiming_success);
          this.$emit("upDate");
        } else {
          this.toast.success(txt.claiming_fail);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped="" type="text/css">
.contain {
  height: 100%;
}
.coupon_contain {
  height: 94%;
  overflow-y: auto;
  padding: 0.5rem 0.4rem 0.4rem;
  position: fixed;
  top: 7vh;
  width: 100%;
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
            &.smallFont {
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
@media screen and(max-width: 320px) {
  .coupon_contain .coupon_row .coupon_items .coupon_discrpt .coupo_limit {
    text-align: left;
    line-height: 0.5rem;
  }
  .coupon_list .coupon_row .coupon_items .coupon_discrpt .coupon_worth span {
    font-size: 16px;
  }
}
</style>