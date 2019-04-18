<template>
	<div class="coupon_contain">
		<div class="coupon_row" v-for="(item, index) in couponsData" :key="index">
			<!-- TODO 有数据后根据可用状态放开蒙层 -->
			<div class="useless_mask" v-if="item.isCollect == 1">
				<img :src="received_cn" v-if="language == 'zh'">
				<img :src="received_en" v-if="language == 'en'">
			</div>

			<div class="get_coupon coupon_items" :class="item.universal_id == 0 ? 'coupon_platform' : 'coupon_store'" @click="click_receive(item.isCollect,item.id,item.index)">
				<div class="coupon_detail">
					<p class="coupon_name store_color">{{item.text}}</p>
					<p class="expired_date store_color">{{$formatDateTime(item.endTime, 'ymd')}} {{en_txt.overdue}}</p>
					<p class="use_platform hiddenT" style="width:6rem;">{{item.name}}</p>
				</div>
				<div class="coupon_discrpt">
					<p class="coupon_worth">
						<span :class="{smallFont: couponsData.isSmall}">{{item.discountAmount}}</span> P</p>
					<p class="coupo_limit">{{en_txt.full}} {{item.limitcontent}} {{en_txt.to_use}}</p>
				</div>
			</div>
			<div class="useless_tip" v-if="item.expire == 1">
				<span>{{en_txt.unavailable_reason}}</span>
			</div>
			<div class="useless_tip" v-if="item.used == 1">
				<span></span>
			</div>
		</div>
		<div class="empty_coupon" v-if="!couponsData">
			<img v-lazy='empty_img'>
			<p>{{$t('coupon.not_enough_coupon')}}</p>
		</div>
	</div>
</template>
<script>
import store from '../../../store'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
export default {
  data() {
    return {
      empty_img: require('@/assets/images/我的-无优惠卷插图.png'),
      used_zh: require('@/assets/images/已使用@2x.png'),
      received_en: require('@/assets/images/received_en.png'),
      received_cn: require('@/assets/images/received_cn.png'),
      useless_en: require('@/assets/images/已失效-english@2x.png'),
      isHover: true,
      platform: true,
      id: '',
      hasLog: ''
    }
  },
  props: ['couponsData'],
  computed: {
    en_txt() {
      return this.$t('coupon')
    }
  },
  created() {
    this.language = getCookie('lang')
  },
  mounted() {
    this.id = localStorage.getItem('id')
    this.hasLog = localStorage.getItem('hasLog')
  },
  methods: {
    click_receive(isCollect, id) {
      if (this.hasLog == 0) {
        this.$router.push('/login')
      }
      if (isCollect == 1) {
        return
      }
      store
        .dispatch('collect_Coupon', {
          sellerId: this.id,
          activityId: id
        })
        .then(res => {
          let data = res.data
          if (res.data.code == 1) {
            this.toast.success(res.data.message)
            this.$emit('upDate')
          } else {
            this.toast.error(res.data.message)
          }

          Object.assign(store.state.collectCoupon, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
.contain {
  height: 100%;
}
.coupon_contain {
  height: 90%;
  overflow-y: auto;
  padding: 0.5rem 0.4rem 0.4rem;
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
              font-size: 16px;
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
@media screen and(max-width: 329px) {
  .coupon_contain .coupon_row .coupon_items {
    padding: 0.1rem 0.2rem 0.4rem 0.4rem;
  }
  .coupon_list .coupon_row .coupon_items .coupon_discrpt .coupon_worth span {
    font-size: 16px;
  }
}
</style>