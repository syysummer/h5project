<template>
	<div class="body_box">
		<div class="top_content">
			<img src="../../../../assets/img/title_zh@2x.png" v-if="lang=='zh'">
			<img src="../../../../assets/img/title_zh@2x.png" v-if="lang=='en'">
		</div>

		<div class="rules_content" v-if="lang=='zh'">
			<div class="title_box">
				<div class="title_line_left"></div>
				<div class="title_line_right"></div>
				<div class="title">活动规则</div>
			</div>
			<div class="rules_content_body">
				<p>
					1.活动期间内用户可通过首页领取一张P200的优惠券，点击首页平台优惠券活动即可领取；
				</p>
				<p>
					2.平台每天赠送1000张优惠券,送完即止；
				</p>
				<p>
					3.优惠券领取当天（0点-24点）有效，与特价、满减活动不同享；
				</p>
				<p>
					4.单笔订单商品价格须大于P200方可使用，超出部分由用户自行承担，优惠券不可用于抵扣配送费；
				</p>
				<p>
					5.同一ID，同一手机号，设备号均视为同一用户；
				</p>
				<p>
					6.如发现任何违规套取奖励行为将不予发放奖励；
				</p>
				<p>
					7.如有其它疑问请咨询龙外卖官方客服。
				</p>
				<p style="text-align:center; margin-top:10px; margin-bottom:10px;">
					本活动的解释权归我方所有
				</p>
			</div>
		</div>

		<div class="rules_content" v-if="lang=='en'">
			<div class="title_box">
				<div class="title_line_left"></div>
				<div class="title_line_right"></div>
				<div class="title">Promo rules</div>
			</div>
			<div class="rules_content_body">
				<p>
					1.During the activity, user can claim a P200 coupon by clicking the coupon button in the homepage.
				</p>
				<p>
					2.Our platform send out 1000 coupons every day.
				</p>
				<p>
					3.The coupon is valid for the claiming day only (00:00-24:00). It can’t be availed with other activities as special offer and other promos.
				</p>
				<p>
					4.You can only use the coupon when your purchase order is more than P200 and the excessing amount is borne by the user. Additionally, the coupon can not offset the delivery fee.
				</p>
				<p>
					5.The same ID, same Phone No. and same IMEI No. can be subscribed as one user only.
				</p>
				<p>
					6.Any fraudulent, deceptive activities will result in the forfeiture of the Coupon.
				</p>
				<p>
					7.For other concerns, kindly contact our customer service.
				</p>
				<p style="text-align:center; margin-top:10px; margin-bottom:10px;">
					We reserve the right of final interpretation of this activity
				</p>
			</div>
		</div>
		<div class="qr_code">
			<img src="../../../../assets/images/meal_supplement_qrcode.png" v-if="lang=='zh'">
			<img src="../../../../assets/images/meal_supplement_qrcode_en.png" v-if="lang=='en'">
		</div>
		<div class="qr_code_content" v-if="lang=='zh'">
			关注我们
		</div>
		<div class="qr_code_content" v-if="lang=='en'">
			Scan me with Facebook
		</div>
	</div>
</template>

<script>
import { getCookie } from '@/utils/cookies'
export default {
  name: 'meal_supplement',
  data() {
    return {
      lang: ''
    }
  },
  mounted() {
    this.lang = this.$route.query.language
  },
  methods: {}
}
</script>

<style scoped>
.body_box {
  width: 100%;
  height: 100%;
  background: url('../../../../assets/img/house_bg@2x.png');
  background-size: 100% 100%;
  position: relative;
  overflow: scroll;
  padding-top: 12px;
}

.top_content {
  width: 93%;
  text-align: center;
  position: relative;
  margin-left: 50%;
  /* height: 38%; */
  transform: translateX(-50%);
  z-index: 1000;
}
.top_content img {
  width: 100%;
}

.rules_content {
  width: 90%;
  background: white;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 20px;
  padding: 0.4rem;
  position: relative;
  top: -50px;
  color: #8b572a;
}

.rules_content p {
  font-size: 15px;
  line-height: 25px;
}

.title_line_left {
  position: absolute;
  width: 10%;
  height: 3px;
  left: 20%;
  background: #8b572a;
}

.title_line_right {
  position: absolute;
  width: 10%;
  height: 3px;
  right: 20%;
  background: #8b572a;
}

.title_box {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 30px;
}

.title_box .title {
  width: 40%;
  text-align: center;
  align-items: center;
  position: absolute;
  left: 30%;
  font-size: 18px;
  top: 8px;
}

.qr_code {
  width: 30%;
  margin: auto;
  position: relative;
  top: -50px;
}

.qr_code_content {
  width: 100%;
  position: relative;
  top: -50px;
  text-align: center;
  color: white;
}

img {
  width: 100%;
  height: 100%;
}
</style>
