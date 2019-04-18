<template>
	<div class="select_pay_method">
		<div class="phoneHeader">
			<publicHeader :title="select_pay_method.title"></publicHeader>
		</div>
		<div class="pay_container">
			<div class="pay_detail">
				<p>{{select_pay_method.amount}}</p>
				<p class="pay_amount">{{pay_methods.actual_price}}P</p>
				<div class="surplus_pay_time_box clearFloat">
					<div class="surplus_pay_time_img">
						<img src="../../assets/icons/icon_time@2x.png" />
					</div>
					<div class="surplus_pay_time">
						{{select_pay_method.payment_time}}:
						<span>{{surplus_time}}</span>
					</div>
				</div>
			</div>
			<div class="pay_method_select">
				<p>{{select_pay_method.payment_method}}</p>
				<p class="parities">{{select_pay_method.parities}} : 1P={{rate_data.exchangeRate}}CNY</p>
				<div class="pay_method_list_body">
					<!-- 支付方式数据 -->
					<div class="pay_method_list_box" v-for="(item, index) in rate_data.paymentList" :key="index">
						<div class="pay_method_list clearFloat" @click="check_pay_method(index)">
							<div class="pay_checkbox">
								<div class="check_bg" :class="{checked: active_index == index}"></div>
							</div>
							<div class="pay_method_icon">
								<img :src="item.logo" />
							</div>
							<div class="pay_method_content">
								{{item.paymentName}}
							</div>
							<div class="pay_account">
								￥ {{item.orderMoney}}
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="pay_btn" @click="pay_btn">
				{{select_pay_method.pay}}
			</div>
		</div>
	</div>
</template>

<script>
import publicHeader from '@/components/public_header.vue'
import { getCookie } from '../../utils/cookies'
export default {
  name: 'selectPayMethod',
  data() {
    return {
      timer: null,
      orderdetail_timer: null,
      over_timer: null,
      active_index: 0,
      surplus_time: '',
      pay_methods: {
        actual_price: ''
      },
      rate_data: {
        exchangeRate: '',
        orderTime: ''
      },
      pay_method_params: {
        paymentId: '',
        pay_type: ''
      },
      min: '',
      sec: '',
      lang: ''
    }
  },
  components: {
    publicHeader
  },
  computed: {
    select_pay_method() {
      let select_pay_method = this.$t('select_pay_method')
      return select_pay_method
    }
  },
  created() {
    this.lang = getCookie('lang')
    this.theOrderDetails()
  },
  methods: {
    // 获取订单数据
    theOrderDetails() {
      this.$axios
        .post('innerService/TheOrderDetails', {
          orderId: this.$route.query.id
        })
        .then(res => {
          let data = res.data
          let creat_time = data.data.create_time
          Object.assign(this.pay_methods, data.data)

          // 查询支付方式数据
          this.$axios
            .post('innerService/getPaymentList', {
              orderId: this.$route.query.id,
              orderMoney: this.pay_methods.actual_price,
              payPermission: 3
            })
            .then(res => {
              let data = res.data
              Object.assign(this.rate_data, data.data)

              // 剩余支付时间
              let over_time = creat_time + 900000
              this.timer = setInterval(() => {
                let current_time = new Date().getTime()
                this.min = parseInt((over_time - current_time) / 1000 / 60)
                this.sec = parseInt(((over_time - current_time) / 1000) % 60)
                if (this.min <= 9) {
                  this.min = '0' + this.min
                }
                if (this.sec <= 9) {
                  this.sec = '0' + this.sec
                }
                if (current_time <= over_time) {
                  this.surplus_time = this.min + ':' + this.sec
                } else {
                  this.surplus_time = '00:00'
                  clearInterval(this.timer)
                }

                if (this.surplus_time <= '00:00') {
                  // 取消订单
                  this.$axios
                    .post('innerService/CancelTheOrder', {
                      orderId: this.$route.query.id
                    })
                    .then(res => {})
                    .catch(err => {
                      console.error(err)
                    })
                  this.over_timer = setTimeout(() => {
                    this.toast.error(this.select_pay_method.overtime)
                    this.$router.push('/submit_order')
                  }, 1000)
                }
              }, 1000)

              // 默认支付方式
              this.pay_method_params.paymentId = this.rate_data.paymentList[0].id
              this.pay_method_params.pay_type = this.rate_data.paymentList[0].pay_type
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 选择支付方式
    check_pay_method(index) {
      this.active_index = index
      this.pay_method_params.paymentId = this.rate_data.paymentList[index].id
      this.pay_method_params.pay_type = this.rate_data.paymentList[
        index
      ].pay_type
    },
    // 支付
    pay_btn() {
      // 获取订单状态
      if (this.pay_method_params.pay_type == 'paypal') {
        this.$axios
          .post('/innerService/addPayOrder', {
            paymentId: this.pay_method_params.paymentId,
            payOrderType: 2,
            orderId: this.$route.query.id,
            device: 4
          })
          .then(res => {
            if (res.data.code === 1) {
              let aliplyHtml = res.data.data
              window.location.href = aliplyHtml
            }
          })
      } else {
        this.$axios
          .post('innerService/TheOrderDetails', {
            orderId: this.$route.query.id
          })
          .then(res => {
            if (res.data.data.order_status != 0) {
              this.$toast.error(this.select_pay_method.paid)
              this.$router.push('/order')
            } else {
              if (this.pay_method_params.pay_type == 'zfb') {
                // 支付宝支付
                location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
                  this.pay_method_params.paymentId
                }&payOrderType=2&orderId=${this.$route.query.id}&device=4`
              } else if (this.pay_method_params.pay_type == 'wx') {
                // 微信支付
                location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
                  this.pay_method_params.paymentId
                }&payOrderType=2&orderId=${this.$route.query.id}&device=5`
              } else if (this.pay_method_params.pay_type == 'iPay88') {
                // iPay88
                location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
                  this.pay_method_params.paymentId
                }&payOrderType=2&orderId=${this.$route.query.id}&device=3`
              } else if (this.pay_method_params.pay_type == 'paymaya') {
                // paymaya
                console.log('paymaya', PayMaya)
                // location.href = `https://dev.loong.ph/waimai/innerService/updatePayOrderbyPayOrderNo?paymentId=${
                //   this.pay_method_params.paymentId
                // }&payOrderType=2&orderId=${this.$route.query.id}&device=3`

                // this.$axios
                //   .post('innerService/updatePayOrderbyPayOrderNo')
                //   .then(res => {
                //   })
                //   .error(err => {
                //     console.error(err)
                //   })

                // PayMaya.createForm(
                //   'pk-sHQWci2P410ppwFQvsi7IQCpHsIjafy74jrhYb8qfxu',
                //   'container',
                //   function tokenHandler(error, token) {
                //     if (error) {
                //       console.error(error)
                //     } else {
                //       console.log(token)
                //     }
                //   }
                // )
              }

              // TODO 公众号deviceID = 6, openID
            }
          })
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearTimeout(this.over_timer)
    clearInterval(this.orderdetail_timer)
  }
}
</script>

<style lang="scss" scoped type="text/css">
body {
  -webkit-overflow-scrolling: auto;
  overflow-scrolling: auto;
}

.select_pay_method {
  height: 100%;
}

.phoneHeader {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 1;
}

.pay_container {
  position: fixed;
  top: 7%;
  width: 100%;
  height: 93%;
  overflow-y: scroll;
}

.clearFloat:after {
  content: '';
  clear: both;
  display: block;
}

.pay_detail {
  width: 90%;
  background: white;
  margin: auto;
  margin-top: 0.4rem;
  margin-bottom: 20px;
  padding: 0.4rem;
}

.pay_detail .pay_time_contain {
  width: 100%;
  font-size: 16px;
}

.pay_detail .pay_time_contain span {
  margin-left: 0.4rem;
  font-size: 14px;
  color: #ccc;
}

.pay_detail p {
  text-align: center;
  color: #666666;
}

.pay_detail .pay_amount {
  font-size: 18px;
  color: #ccc;
  margin-top: 0.4rem;
  font-size: 26px;
  color: #ff644d;
}

.pay_detail .pay_amount span {
  float: right;
  font-size: 36px;
  color: #333;
}

.surplus_pay_time_box {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.surplus_pay_time_img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.surplus_pay_time {
  font-size: 16px;
  color: #666666;
}

.surplus_pay_time_img img {
  width: 100%;
  height: 100%;
}

.pay_method_select {
  width: 90%;
  background: white;
  margin: auto;
  margin-bottom: 30px;
  padding: 20px 10px 0 10px; // height: 50%;
}

.pay_method_select p {
  width: 100%;
  margin-bottom: 10px;
}

.parities {
  color: #ff644d;
  font-size: 14px;
}

.pay_btn {
  width: 80%;
  height: 44px;
  border-radius: 5px;
  background: #ff644d;
  color: white;
  text-align: center;
  line-height: 44px;
  margin: auto;
  margin-bottom: 60px;
}

.pay_method_list_body {
  width: 100%;
  margin-top: 20px;
}

.pay_method_list_box {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid gainsboro;
}

.pay_method_list {
  width: 100%;
  height: 35px;
}

.pay_checkbox {
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;
  float: left;
}

.pay_checkbox img {
  width: 25px;
  height: 25px;
  display: none;
}

.check_bg {
  width: 25px;
  height: 25px;
  background: url('../../assets/icons/icon_choose@2x.png') no-repeat;
  background-size: 100% 100%;
}

.pay_checkbox .checked {
  background: url('../../assets/icons/icon_chosen@2x.png') no-repeat;
  background-size: 100% 100%;
}

.pay_method_icon {
  float: left;
  width: 35px;
  height: 35px;
  margin-right: 15px;
}

.pay_method_icon img {
  width: 100%;
  height: 100%;
}

.pay_method_content {
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
}

.pay_account {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  color: #ff644d;
}

@media screen and(max-width: 329px) {
  .pay_btn {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 0.1rem;
  }
}
</style>
