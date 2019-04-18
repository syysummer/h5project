<template>
	<div class="pay-network">
		<div class="header">
			<publicHeader :title="living_payment.pay_electricity_bill"></publicHeader>
		</div>
		<div class="contain_content">
			<div class="electricity-des" v-if="language=='zh'">目前仅支持菲律宾电费缴纳，请填写的信息与账单一致，并于账单截至日期前3个工作日前提交。</div>
			<div class="electricity-des" v-if="language=='en'">Only support the Philippines, please inform the bill and submit it three working days before the bill closes.</div>
			<div class="account-num">
				<input type="text" :placeholder="living_payment.please_enter_number" v-model="accountNum" :maxlength="16" @keyup="limit_word('accountNum',16)">
			</div>
			<div class="billing-num">
				<input type="text" :placeholder="living_payment.please_enter_billing" v-model="billingNum" :maxlength="26" @keyup="limit_word('billingNum',26)">
			</div>
			<div class="account-money">
				<input type="text" :placeholder="living_payment.please_enter_amount" v-model="orderAccount" :maxlength="10" @keyup="get_account">
				<div>P</div>
			</div>
			<div class="deadline" @click="openPicker">
				<div>{{deadline?deadline:living_payment.please_due_date}}</div>
				<i class="el-icon-arrow-down"></i>
			</div>
			<mt-datetime-picker ref="picker_deadline" type="date" v-model="select_deadline" @confirm="handleConfirm">
			</mt-datetime-picker>
			<div class="pay-example" @click="go_page">
				{{living_payment.electricity_example}}
			</div>
			<div class="need-account">
				<div>{{living_payment.amounts_payable}}</div>
				<div class="act">￥{{exchangeAccount?exchangeAccount:0}}</div>
			</div>
			<div class="pay_method_select">
				<p>{{select_pay_method.payment_method}}</p>
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
						</div>
					</div>
				</div>
			</div>
			<div class="pay_btn" @click="pay_confirm">
				{{living_payment.pay_immediately}}
			</div>
			<div class="electricity-bottom" v-if="language=='zh'">温馨提示：目前龙外卖暂不受理逾期订单，请自行前往柜台缴费，敬请谅解。</div>
			<div class="electricity-bottom" v-if="language=='en'">Reminder: At present, Long Takeaway will not accept overdue orders, please go to the counter to pay the fee, please understand.</div>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import publicHeader from '../../components/public_header'
import { getCookie } from '../../utils/cookies'
import store from '../../store'
export default {
  name: 'pay_electricity',
  data() {
    return {
      accountNum: store.state.electricity_list.accountNum,
      billingNum: store.state.electricity_list.billingNum,
      orderAccount: store.state.electricity_list.orderAccount,
      select_deadline: this.$formatDateTime(new Date(), 'ymd'),
      deadline: store.state.electricity_list.deadline,
      rate_data: {
        exchangeRate: '',
        orderTime: ''
      },
      active_index: 0,
      pay_method_params: {
        paymentId: '',
        pay_type: ''
      },
      language: '',
      exchangeAccount: store.state.electricity_list.exchangeAccount
    }
  },
  components: { publicHeader },
  beforeRouteEnter(to, from, next) {
    if (from.path == '/living_payment') {
      store.state.electricity_list = {
        accountNum: '',
        billingNum: '',
        orderAccount: '',
        deadline: '',
        exchangeAccount: ''
      }
    }
    next()
  },
  mounted() {
    this.language = getCookie('lang')
    if (getCookie('lang') == 'en') {
      document.getElementsByClassName(
        'mint-datetime-cancel'
      )[0].innerHTML = this.living_payment.cancel
      document.getElementsByClassName(
        'mint-datetime-confirm'
      )[0].innerHTML = this.living_payment.determine
    }

    this.OrderDetails()
  },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    },
    select_pay_method() {
      let select_pay_method = this.$t('select_pay_method')
      return select_pay_method
    }
    // exchangeAccount() {
    //   // let regAccount = /^(\d{1,10}|\d{1,9}\.\d{1}|\d{1,8}\.\d{2})$/
    //   let regAccount = /^(\d{1,10}|([0-9]+\.[0-9]+))$/
    //   if (this.orderAccount && regAccount.test(this.orderAccount)) {
    //     return this.OrderDetails(this.orderAccount)
    //     // return (parseFloat(this.orderAccount) * changeRate).toFixed(2)
    //   } else {
    //     return ''
    //   }
    // }
  },
  methods: {
    go_page() {
      store.state.electricity_list = {
        accountNum: this.accountNum,
        billingNum: this.billingNum,
        orderAccount: this.orderAccount,
        deadline: this.deadline,
        exchangeAccount: this.exchangeAccount
      }
      this.$router.push('/electricity_example')
    },
    openPicker() {
      this.$refs.picker_deadline.open()
    },
    handleConfirm() {
      this.deadline = this.select_deadline
        ? this.$formatDateTime(this.select_deadline, 'ymd')
        : ''
    },
    limit_word(value, maxlength) {
      if (this[value].length > maxlength) {
        this[value] = this[value].substring(0, maxlength)
      }
    },
    get_account() {
      this.limit_word('orderAccount', 10)
      let regAccount = /^(\d{1,10}|([0-9]+\.[0-9]{1,8}))$/
      if (this.orderAccount && regAccount.test(this.orderAccount)) {
        var x = String(this.orderAccount).indexOf('.') + 1
        var y = String(this.orderAccount).length - x
        if (x > 0 && y >= 2) {
          this.orderAccount = Math.round(this.orderAccount * 100) / 100
        }
        setTimeout(() => {
          this.OrderDetails(this.orderAccount)
        }, 500)

        // return (parseFloat(this.orderAccount) * changeRate).toFixed(2)
      } else {
        this.exchangeAccount = ''
      }
    },
    pay_confirm() {
      let reg = /^\d{1,16}$/
      let regDeadline = /^\d{1,26}$/
      let regAccount = /^(\d{1,10}|([0-9]+\.[0-9]{1,8}))$/
      if (!this.accountNum) {
        this.toast.error(this.living_payment.account_empty)
        return
      }
      if (!this.billingNum) {
        this.toast.error(this.living_payment.billing_empty)
        return
      }
      if (!this.orderAccount) {
        this.toast.error(this.living_payment.bill_empty)
        return
      }
      if (!this.deadline) {
        this.toast.error(this.living_payment.deadlin_empty)
        return
      }
      if (!reg.test(this.accountNum)) {
        this.toast.error(this.living_payment.account_digits_e)
        return
      }
      if (!regDeadline.test(this.billingNum)) {
        this.toast.error(this.living_payment.billing_digits)
        return
      }
      if (!regAccount.test(this.orderAccount)) {
        this.toast.error(this.living_payment.bill_digits)
        return
      }
      if (this.orderAccount < 500 || this.orderAccount > 10000) {
        this.toast.error(this.living_payment.allow_amount)
        return
      }
      let className = this.language == 'en' ? 'act' : ''
      let html = `<div class="confirm-order">
      <div class="confirm-order-title">${
        this.living_payment.please_check_order
      }</div>
      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.account_number
      }：</div><div class="confirm-order-data">${this.accountNum}</div></div>

      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.billing_number
      }：</div><div class="confirm-order-data">${this.billingNum}</div></div>

      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.pay_amount
      }：</div><div class="confirm-order-data">${this.orderAccount}P</div></div>


      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.deadline
      }：</div><div class="confirm-order-data">${this.deadline}</div></div>
    </div>`
      MessageBox.confirm('', {
        message: html,
        title: '',
        confirmButtonText: this.living_payment.determine,
        cancelButtonText: this.living_payment.cancel,
        confirmButtonClass: 'confirm-button',
        cancelButtonClass: 'cancel-button'
      })
        .then(action => {
          if (action == 'confirm') {
            this.pay_btn()
          }
        })
        .catch(err => {
          if (err == 'cancel') {
            //取消的回调
          }
        })
    },
    OrderDetails(orderMoney = '') {
      let param = {
        payPermission: 3
      }
      if (orderMoney) {
        param.orderMoney = orderMoney
      }
      this.$axios.post('/innerService/getPaymentList', param).then(res => {
        let data = res.data
        this.rate_data = data.data
        // 默认支付方式
        if (!orderMoney) {
          this.pay_method_params.paymentId = this.rate_data.paymentList[0].id
          this.pay_method_params.pay_type = this.rate_data.paymentList[0].pay_type
        }
        if (orderMoney) {
          this.exchangeAccount = data.data.money
        }
      })
    },
    check_pay_method(index) {
      this.active_index = index
      this.pay_method_params.paymentId = this.rate_data.paymentList[index].id
      this.pay_method_params.pay_type = this.rate_data.paymentList[
        index
      ].pay_type
    },
    pay_btn() {
      let params = {
        paymentId: this.pay_method_params.paymentId,
        payOrderType: 4,
        orderMoney: this.orderAccount,
        deadline: this.deadline,
        billNumber: this.billingNum,
        accountNumber: this.accountNum,
        device: 4
      }
      if (this.pay_method_params.pay_type == 'zfb') {
        // 支付宝支付
        location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=4&orderMoney=${params.orderMoney}&deadline=${
          params.deadline
        }&billNumber=${params.billNumber}&accountNumber=${
          params.accountNumber
        }&device=4`
      } else if (this.pay_method_params.pay_type == 'wx') {
        // 微信支付
        location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=4&orderMoney=${params.orderMoney}&deadline=${
          params.deadline
        }&billNumber=${params.billNumber}&accountNumber=${
          params.accountNumber
        }&device=5`
      } else if (this.pay_method_params.pay_type == 'iPay88') {
        location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=4&orderMoney=${params.orderMoney}&deadline=${
          params.deadline
        }&billNumber=${params.billNumber}&accountNumber=${
          params.accountNumber
        }&device=4`
      } else if (this.pay_method_params.pay_type == 'paypal') {
        this.$axios.post('/innerService/addPayOrder', params).then(res => {
          if (res.data.code === 1) {
            let aliplyHtml = res.data.data
            window.location.href = aliplyHtml
          }
        })
      }
    }
  },
  watch: {
    accountNum(newValue, oldValue) {
      if (newValue > 16) {
        this.accountNum = newValue.substring(0, 16)
      }
    },
    billingNum(newValue, oldValue) {
      if (newValue > 26) {
        this.billingNum = newValue.substring(0, 26)
      }
    },
    orderAccount(newValue, oldValue) {
      if (newValue > 10) {
        this.orderAccount = newValue.substring(0, 10)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.pay-network {
  height: 100%;
  background: #fff;
  top: 0;
  bottom: 0;
  .header {
    position: fixed;
    width: 100%;
    height: 45px;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid #dddddd;
  }
  .contain_content {
    padding-top: 45px;
    background: #fff;
    width: 100%;
    overflow-y: auto;
    .deadline {
      color: #333333;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #ededed;
    }
    .electricity-des {
      color: #999999;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 6px solid #ededed;
    }
    .electricity-bottom {
      color: #999999;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 0 15px 15px 15px;
    }
    .account-num,
    .billing-num,
    .account-tel,
    .account-money {
      color: #999999;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid #ededed;
      input {
        border: none;
        width: 80%;
      }
    }

    .pay-example {
      padding: 15px;
      border-bottom: 1px solid #ededed;
      color: #5ba6ff;
      font-size: 14px;
      text-align: right;
    }
    .need-account {
      color: #333333;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid #ededed;
      .act {
        color: #ff644d;
      }
    }
  }
}
.pay_method_select {
  background: white;
  margin: auto;
  padding: 20px 15px 0 15px; // height: 50%;
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
  width: 90%;
  height: 44px;
  border-radius: 5px;
  background: #ff644d;
  color: white;
  text-align: center;
  line-height: 44px;
  margin: 15px auto;
}

.pay_method_list_body {
  width: 100%;
}

.pay_method_list_box {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid gainsboro;
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
  float: right;
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
</style>
