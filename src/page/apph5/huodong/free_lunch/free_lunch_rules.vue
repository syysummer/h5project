<template>
	<div>
		<!-- <div class="header_box">
			<publicHeader title='活动规则' v-if="lang=='zh'"></publicHeader>
			<publicHeader title='Promo rules' v-if="lang=='en'"></publicHeader>
		</div> -->
		<div class="free_lunch_box">
			<div class="title_box">
				<div class="title_line_left"></div>
				<div class="title_line_right"></div>
				<div v-if="lang=='zh'" class="title">活动规则</div>
				<div v-if="lang=='en'" class="title">Promo rules</div>
			</div>

			<div class="rules_content" v-if="lang=='zh'">
				<p>
					1.在活动期间内每天前10000名新用户可享用首单立减P500优惠；
				</p>
				<p>
					2.每人仅享受一次优惠，不与其他的优惠活动同享；
				</p>
				<p>
					3.单笔订单商品价格大于P500可使用优惠，超出部分用户自行支付；
				</p>
				<p>
					4.单笔订单商品价格不超过P500用户仅需支付P0.01，配送费用自行承担。
				</p>
				<p>
					5.同一ID，同一手机号，设备号，银行卡均视为同一用户；
				</p>
				<p>
					6.一经发现任何违规、套现行为，将追回相关金额或者封停账号，且依法追究法律责任；
				</p>
				<p>
					7.关于本活动的任何问题，请联系龙外卖客服；
				</p>
				<p style="padding-top:20px; text-align:center; font-size:16px;">
					立即点餐，享首单优惠
				</p>
			</div>

			<div class="rules_content" v-if="lang=='en'">
				<p>
					1. during promo period, the first 10000 customers per day.can avail P500 off on the first single purchase .
				</p>
				<p>
					2. Each person shall enjoy the discount only once, and cannot avail the same promo with other promotional activities offered by the Company;
				</p>
				<p>
					3. User can avail the promo if the single purchase is over P500, orders that with an exceeding amount shall be shouldered by users themselves.
				</p>
				<p>
					4. If the price of a single purchase is less than P500, youhave to pay P0.01 only, and shall be responsible for the delivery charge.
				</p>
				<p>
					5. The same ID, mobile phone number and devices serial number are all regarded as one user.
				</p>
				<p>
					6.Users shall be liable, compensate for any beaches such as illegal Cash-Out which causing loses of the Company which act will result to blocking of your account as well.
				</p>
				<p>
					7.For any questions about this promo, please contact thecustomer service of Loong Delivery ;
				</p>
			</div>

		</div>
	</div>
</template>

<script>
// import publicHeader from '@/components/public_header.vue'
export default {
  name: 'free_lunch_rules',
  data() {
    return {
      lang: ''
    }
  },
  created() {
    this.lang = this.$route.query.language
  }
  // components: {
  //   publicHeader
  // }
}
</script>

<style scoped>
/* .header_box {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 1;
} */

.free_lunch_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* height: 93%; */
  height: 100%;
  background: url('../../../../assets/images/free_lunch_rules_bg.png');
  background-size: 100% 100%;
  color: white;
  overflow: scroll;
}

.title_box {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
}

.title_line_left {
  position: absolute;
  width: 10%;
  height: 3px;
  left: 20%;
  background: white;
}

.title_line_right {
  position: absolute;
  width: 10%;
  height: 3px;
  right: 20%;
  background: white;
}

.title_box .title {
  width: 40%;
  text-align: center;
  align-items: center;
  position: absolute;
  left: 30%;
  font-size: 18px;
  top: 18px;
}

.rules_content {
  padding: 0 0.5rem 1rem 0.5rem;
}

.rules_content p {
  line-height: 30px;
  font-size: 14px;
}
</style>