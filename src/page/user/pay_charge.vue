<template>
  <div class="pay-network">
    <div class="header">
      <publicHeader :title="living_payment.recharge_fee"></publicHeader>
    </div>
    <div class="contain_content">
      <div class="electricity-des" v-if="language=='zh'">目前仅支持菲律宾号码充值，如输入错误信息将会导致话费充值延期或失败。</div>
      <div class="electricity-des" v-if="language=='en'">only Philippine number recharge is supported. If the error message is entered, the credit recharge will be postponed or failed.</div>
      <div class="charge-box">
        <div class="charge-num">
          <input type="text" v-model="phone" :placeholder="living_payment.please_phone_number" @keyup="phone_format" :maxlength="11">
          <!-- <img src="../../assets/icons/tel.png" alt="" v-if="!phone"> -->
        </div>
        <div class="notice-msg" :class="{'act':notice_msg}">
          {{notice_msg?notice_msg:living_payment.digits_starting}}
        </div>
      </div>
      <div class="operator-box" @click="select_operator">
        <div>{{operator?operator:living_payment.own_carrier}}</div>
        <i class="el-icon-arrow-down"></i>
        <!-- <i class="el-icon-arrow-up" v-if="popupVisible"></i> -->
      </div>
      <div class="account-box">
        <div class="account-title">{{living_payment.recharge_amount}}</div>
        <ul class="account-list">
          <li :class="{'act':selectedAccount==index}" v-for="(item,index) in accountList" @click="select_account(index)">{{item.display_name}}</li>
        </ul>
      </div>
      <div class="need-account">
        <div>{{living_payment.price}}</div>
        <div class="act">{{discount_price}}P</div>
      </div>
      <div class="need-account">
        <div>{{living_payment.amounts_payable}}</div>
        <div class="act">￥{{exchangeAccount}}</div>
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
      <div class="pay_btn" :class="{'act':phone=='' || notice_msg}" @click="pay_confirm">
        {{living_payment.pay_immediately}}
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="operator-pop">
        <div class="operator-button">
          <div class="cancel" @click="operator_cancel">{{living_payment.cancel}}</div>
          <div class="comfirm" @click="operator_comfirm">{{living_payment.carry_out}}</div>
        </div>
        <mt-picker :slots="operatorList" @change="onValuesChange" valueKey="lookupItemName"></mt-picker>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import publicHeader from '../../components/public_header'
let changeRate = 0.1296
export default {
  name: 'network_fee',
  data() {
    return {
      popupVisible: false,
      operator: '',
      supplierId: '',
      phone: '',
      selectOperator: '',
      selectSupplierId: '',
      selectedAccount: 0,
      operatorList: [
        {
          flex: 1,
          values: []
        }
      ],
      accountList: [],
      rate_data: {
        exchangeRate: '',
        orderTime: ''
      },
      active_index: 0,
      pay_method_params: {
        paymentId: '',
        pay_type: ''
      },
      notice_msg: '',
      exchangeAccount: '',
      discount_price: '',
      rechargeAmount: '',
      phoneType: '',
      ext_tag: '',
      language: ''
    }
  },
  components: { publicHeader },
  mounted() {
    this.language = getCookie('lang')
    this.get_operator_list()
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
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0]) {
        this.selectOperator = values[0].lookupItemName
        this.selectSupplierId = values[0].lookupItemCode
      }
    },
    get_account_list() {
      this.$axios
        .post('/innerService/getRechargeAmountList', {
          supplier: this.supplierId
        })
        .then(res => {
          if (res.data.code == 1) {
            this.accountList = res.data.data
            this.rechargeAmount = this.accountList[0].top_up_money
            this.discount_price = this.accountList[0].discount_amount
            this.exchangeAccount = this.accountList[0].moneyCNY
            this.ext_tag = this.accountList[0].ext_tag
            this.phoneType = this.accountList[0].type
          }
        })
    },
    get_operator_list() {
      this.$axios
        .post('innerService/getTelcoList', {
          supplerLookup: 'configuration_phone'
        })
        .then(res => {
          if (res.data.code == 1) {
            this.operatorList[0].values = res.data.data
            this.operator = res.data.data[0].lookupItemName
            this.supplierId = res.data.data[0].lookupItemCode
            this.get_account_list()
          }
        })
    },
    limit_word(value, maxlength) {
      if (this[value].length > maxlength) {
        this[value] = this[value].substring(0, maxlength)
      }
    },
    phone_format() {
      this.limit_word('phone', 11)
      let reg = /^[0][9][0-9]{9}$/
      if (this.phone.length != 11) {
        this.notice_msg = this.living_payment.phone_incorrect
        return
      }
      if (!reg.test(this.phone)) {
        this.notice_msg = this.living_payment.phone_supported
        return
      }
      this.notice_msg = ''
    },
    select_account(index) {
      this.selectedAccount = index
      this.rechargeAmount = this.accountList[index].top_up_money
      this.discount_price = this.accountList[index].discount_amount
      this.exchangeAccount = this.accountList[index].moneyCNY
      this.ext_tag = this.accountList[index].ext_tag
      this.phoneType = this.accountList[index].type
    },
    operator_cancel() {
      this.popupVisible = false
    },
    operator_comfirm() {
      this.popupVisible = false
      this.operator = this.selectOperator
      this.supplierId = this.selectSupplierId
      this.selectedAccount = 0
      this.get_account_list()
    },
    select_operator() {
      this.popupVisible = true
    },
    pay_confirm() {
      if (!this.phone) {
        this.toast.error(this.living_payment.mobile_empty)
        return
      }
      if (this.notice_msg) {
        return
      }
      if (!this.operator) {
        this.toast.error(this.living_payment.operator_empty)
        return
      }
      let className = this.language == 'en' ? 'act' : ''
      let html = `<div class="confirm-order">
      <div class="confirm-order-title">${
        this.living_payment.please_check_order
      }</div>
      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.cellphone_number
      }：</div><div class="confirm-order-data">${this.phone}</div></div>
      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.operator
      }：</div><div class="confirm-order-data">${this.operator}</div></div>
      <div class="confirm-order-detail"><div class="confirm-order-row ${className}">${
        this.living_payment.recharge_amount
      }：</div><div class="confirm-order-data">${
        this.rechargeAmount
      }P</div></div>
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
            //确认的回调
            this.pay_btn()
          }
        })
        .catch(err => {
          if (err == 'cancel') {
            //取消的回调
          }
        })
    },
    OrderDetails() {
      this.$axios
        .post('/innerService/getPaymentList', {
          payPermission: 3
        })
        .then(res => {
          let data = res.data
          this.rate_data = data.data
          // 默认支付方式
          this.pay_method_params.paymentId = this.rate_data.paymentList[0].id
          this.pay_method_params.pay_type = this.rate_data.paymentList[0].pay_type
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
        payOrderType: 3,
        phone: this.phone,
        supplierId: this.supplierId,
        extTag: this.ext_tag,
        orderMoney: this.rechargeAmount,
        preferentialPrice: this.discount_price,
        phoneType: this.phoneType,
        device: 4
      }
      if (this.pay_method_params.pay_type == 'zfb') {
        // 支付宝支付
        location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=3&phone=${params.phone}&supplierId=${
          params.supplierId
        }&extTag=${params.extTag}&orderMoney=${
          params.orderMoney
        }&preferentialPrice=${params.preferentialPrice}&phoneType=${
          params.phoneType
        }&device=4`
      } else if (this.pay_method_params.pay_type == 'wx') {
        // 微信支付
        location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=3&phone=${params.phone}&supplierId=${
          params.supplierId
        }&extTag=${params.extTag}&orderMoney=${
          params.orderMoney
        }&preferentialPrice=${params.preferentialPrice}&phoneType=${
          params.phoneType
        }&device=5`
      } else if (this.pay_method_params.pay_type == 'iPay88') {
        location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
          this.pay_method_params.paymentId
        }&payOrderType=3&phone=${params.phone}&supplierId=${
          params.supplierId
        }&extTag=${params.extTag}&orderMoney=${
          params.orderMoney
        }&preferentialPrice=${params.preferentialPrice}&phoneType=${
          params.phoneType
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
  .operator-pop {
    width: 100%;
    .operator-button {
      display: flex;
      justify-content: space-between;
      margin: 20px 20px 0 20px;
      color: #ff3633;
      font-size: 14px;
    }
    .operator-list {
      li {
        border-top: 1px solid #ededed;
        padding: 15px 0;
        text-align: center;
        color: #666666;
      }
      .active {
        color: #333333;
      }
    }
  }
  .contain_content {
    padding-top: 45px;
    overflow-y: auto;
    background: #fff;
    width: 100%;
    .account-box {
      padding: 15px;
      .account-title {
        color: #666666;
        font-size: 14px;
        padding-bottom: 10px;
      }
      .account-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: -4%;
        // justify-content: space-between;
        li {
          // width: 31.33%;
          flex: 0 0 29.3333%;
          margin-left: 4%;
          text-align: center;
          color: #dddddd;
          font-size: 22px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          padding: 14px 0;
          margin-bottom: 10px;
        }
        .act {
          border: 1px solid #ff644d;
          color: #ff644d;
        }
      }
    }
    .charge-box {
      color: #999999;
      font-size: 14px;
      padding: 10px;
      border-bottom: 1px solid #ededed;
      .charge-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          border: none;
          font-size: 21px;
          // color: #dddddd;
          color: #333;
          width: 100%;
          &.act {
            color: #333;
          }
        }
        img {
          width: 40px;
          height: 41.6px;
        }
      }
      .notice-msg {
        font-size: 11px;
        color: #dddddd;
        margin-top: 3px;
      }
      .act {
        color: #ff3633;
      }
    }
    .operator-box {
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
  &.act {
    background: #dddddd;
  }
}

.pay_method_list_body {
  width: 100%;
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
