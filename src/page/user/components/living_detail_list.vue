<template>
  <div class="network_detail">
    <div class="pay-dialog" v-if="modal_show">
      <div class=" delete-dialog" @click="madal_hide">
        <i class="el-icon-close"></i>
      </div>
      <div class="pay-madal-title">{{select_pay_method.payment_method}}</div>
      <div class="pay-madal-content">
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
        <div class="recharge" @click="pay_btn">{{living_payment.recharge}}</div>
      </div>

    </div>
    <div class="pay-modal" v-if="modal_show">
    </div>
    <div class="header">
      <publicHeader :title="living_payment.recharge_details" v-if='detail_list.payOrderType==3'></publicHeader>
      <publicHeader :title="living_payment.payment_details" v-else></publicHeader>
    </div>
    <div class="contain_content">
      <div class="detail-order">
        <div class="price">{{detail_list.orderMoney}}P</div>
        <div class="order-cancel">{{detail_list.showStatus}}</div>
        <div class="handle-button" v-if="detail_list.payStatus==0">
          <div class="button-pay" @click="open_dialog">{{living_payment.pay}}</div>
          <div class="button-cancel" @click="cancel_order">{{living_payment.cancel_order}}</div>
        </div>
      </div>
      <ul class="detail-list">
        <li v-if="detail_list.payStatus==4 ||detail_list.payStatus==5 || detail_list.payStatus==6">
          <div>{{living_payment.payment_method}}</div>
          <div class="act">{{detail_list.paymentName}}</div>
        </li>
        <li v-if="detail_list.payOrderType==3">
          <div>{{living_payment.cellphone_number}}</div>
          <div>{{detail_list.phone}}</div>
        </li>
        <li v-if="detail_list.payOrderType==3||detail_list.payOrderType==5">
          <div>{{living_payment.operator}}</div>
          <div>{{detail_list.supplier}}</div>
        </li>
        <li v-if="detail_list.payOrderType==4||detail_list.payOrderType==5">
          <div v-if="detail_list.payOrderType==4">{{living_payment.payment_account}}</div>
          <div v-if="detail_list.payOrderType==5">{{living_payment.account_number}}</div>
          <div>{{detail_list.accountNumber}}</div>
        </li>
        <li v-if="detail_list.payOrderType==4">
          <div>{{living_payment.billing_number}}</div>
          <div>{{detail_list.billNumber}}</div>
        </li>
        <li v-if="detail_list.payOrderType==4">
          <div>{{living_payment.billing_deadline}}</div>
          <div class="size-small">{{detail_list.deadline?$formatDateTime(detail_list.deadline,'ymd'):''}}</div>
        </li>
        <li v-if="detail_list.payOrderType==5">
          <div>{{living_payment.phone_number}}</div>
          <div>{{detail_list.phone}}</div>
        </li>
        <li>
          <div>{{living_payment.payment_amount}}</div>
          <div class="act">￥{{detail_list.payMoney}}</div>
        </li>
        <li>
          <div>{{living_payment.order_number}}</div>
          <div class="size-small">{{detail_list.payOrderNo}}</div>
        </li>
        <li>
          <div>{{living_payment.creation_time}}</div>
          <div class="size-small">{{detail_list.createTime?$formatDateTime(detail_list.createTime):''}}</div>
        </li>
      </ul>
      <div v-if="detail_list.payStatus==0">
        <div class="prompt" v-if="language=='zh'">
          温馨提示：尊敬的客户，我们还未收到订单的款项，请您尽快支付。该订单会为您保留1小时（从下单时间算起），1小时之后如果还未付款，系统将自动关闭该订单。
        </div>
        <div class="prompt" v-if="language=='en'">
          Reminder: Dear customers, the order will be reserved for you for 1 hour, after 1 hour has not been paid, the order will be automatically closed.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import publicHeader from '../../../components/public_header'
import { getCookie } from '../../../utils/cookies'
export default {
  data() {
    return {
      start_time: '',
      end_time: '',
      modal_show: false,
      rate_data: {
        exchangeRate: '',
        orderTime: ''
      },
      language: getCookie('lang'),
      active_index: 0,
      pay_method_params: {
        paymentId: '',
        pay_type: ''
      },
      detail_list: []
    }
  },
  components: { publicHeader },
  created() {
    this.OrderDetails()
    this.get_detail_list()
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
    get_detail_list() {
      this.$axios
        .get('/innerService/getLifePayCostByOrderNo', {
          params: { orderNo: this.$route.query.orderNo }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.detail_list = res.data.data
          }
        })
    },
    cancel_order() {
      MessageBox.confirm('', {
        message: this.living_payment.sure_order,
        title: '',
        confirmButtonText: this.living_payment.determine,
        cancelButtonText: this.living_payment.cancel,
        confirmButtonClass: 'confirm-button',
        cancelButtonClass: 'cancel-button'
      })
        .then(action => {
          if (action == 'confirm') {
            //确认的回调
            this.$axios
              .post('/innerService/lifePayCostCancelOrder', {
                orderNo: this.$route.query.orderNo,
                payCostType: this.detail_list.payOrderType
              })
              .then(res => {
                this.toast.success(res.data.message)
                setTimeout(() => {
                  window.location.reload()
                }, 500)
              })
          }
        })
        .catch(err => {
          if (err == 'cancel') {
            //取消的回调
          }
        })
    },
    madal_hide() {
      this.modal_show = false
    },
    open_dialog() {
      this.modal_show = true
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
    // 支付
    pay_btn() {
      // 获取订单状态
      //网费
      let params = {}
      if (this.detail_list.payOrderType == 5) {
        params = {
          paymentId: this.pay_method_params.paymentId,
          payOrderType: this.detail_list.payOrderType,
          payOrderNo: this.$route.query.orderNo,
          phone: this.detail_list.phone,
          supplierId: this.detail_list.supplier,
          extTag: this.detail_list.extTag,
          orderMoney: this.detail_list.orderMoney,
          accountNumber: this.detail_list.accountNumber,
          device: 4
        }
      }
      //电费
      if (this.detail_list.payOrderType == 4) {
        params = {
          paymentId: this.pay_method_params.paymentId,
          payOrderType: this.detail_list.payOrderType,
          payOrderNo: this.$route.query.orderNo,
          orderMoney: this.detail_list.orderMoney,
          deadline: this.$formatDateTime(this.detail_list.deadline, 'ymd'),
          billNumber: this.detail_list.billNumber,
          accountNumber: this.detail_list.accountNumber,
          device: 4
        }
      }
      if (this.detail_list.payOrderType == 3) {
        //话费
        params = {
          paymentId: this.pay_method_params.paymentId,
          payOrderType: this.detail_list.payOrderType,
          payOrderNo: this.$route.query.orderNo,
          phone: this.detail_list.phone,
          supplierId: this.detail_list.supplier,
          extTag: this.detail_list.extTag,
          orderMoney: this.detail_list.orderMoney,
          preferentialPrice: this.detail_list.preferentialPrice,
          phoneType: this.detail_list.type,
          device: 4
        }
      }
      if (this.pay_method_params.pay_type == 'zfb') {
        // 支付宝支付
        if (this.detail_list.payOrderType == 3) {
          location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=3&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&preferentialPrice=${
            params.preferentialPrice
          }&phoneType=${params.phoneType}&device=4`
        }
        if (this.detail_list.payOrderType == 4) {
          location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=4&payOrderNo=${params.payOrderNo}&orderMoney=${
            params.orderMoney
          }&deadline=${params.deadline}&billNumber=${
            params.billNumber
          }&accountNumber=${params.accountNumber}&device=4`
        }
        if (this.detail_list.payOrderType == 5) {
          location.href = `https://dev.loong.ph/waimai/innerService/zfbPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=5&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&accountNumber=${
            params.accountNumber
          }&device=4`
        }
      } else if (this.pay_method_params.pay_type == 'wx') {
        // 微信支付
        if (this.detail_list.payOrderType == 3) {
          location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=3&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&preferentialPrice=${
            params.preferentialPrice
          }&phoneType=${params.phoneType}&device=5`
        }
        if (this.detail_list.payOrderType == 4) {
          location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=4&payOrderNo=${params.payOrderNo}&orderMoney=${
            params.orderMoney
          }&deadline=${params.deadline}&billNumber=${
            params.billNumber
          }&accountNumber=${params.accountNumber}&device=5`
        }
        if (this.detail_list.payOrderType == 5) {
          location.href = `https://dev.loong.ph/waimai/innerService/wxPayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=5&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&accountNumber=${
            params.accountNumber
          }&device=5`
        }
      } else if (this.pay_method_params.pay_type == 'iPay88') {
        if (this.detail_list.payOrderType == 3) {
          location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=3&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&preferentialPrice=${
            params.preferentialPrice
          }&phoneType=${params.phoneType}&device=4`
        }
        if (this.detail_list.payOrderType == 4) {
          location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=4&payOrderNo=${params.payOrderNo}&orderMoney=${
            params.orderMoney
          }&deadline=${params.deadline}&billNumber=${
            params.billNumber
          }&accountNumber=${params.accountNumber}&device=4`
        }
        if (this.detail_list.payOrderType == 5) {
          location.href = `https://dev.loong.ph/waimai/innerService/iPay88PayOrder?paymentId=${
            this.pay_method_params.paymentId
          }&payOrderType=5&payOrderNo=${params.payOrderNo}&phone=${
            params.phone
          }&supplierId=${params.supplierId}&extTag=${
            params.extTag
          }&orderMoney=${params.orderMoney}&accountNumber=${
            params.accountNumber
          }&device=4`
        }
      } else if (this.pay_method_params.pay_type == 'paypal') {
        if (this.detail_list.payOrderType == 3) {
          this.$axios
            .post('/innerService/addPayOrder', {
              paymentId: this.pay_method_params.paymentId,
              payOrderType: 3,
              payOrderNo: params.payOrderNo,
              phone: params.phone,
              supplierId: params.supplierId,
              extTag: params.extTag,
              orderMoney: params.orderMoney,
              preferentialPrice: params.preferentialPrice,
              phoneType: params.type,
              device: 4
            })
            .then(res => {
              if (res.data.code === 1) {
                let aliplyHtml = res.data.data
                window.location.href = aliplyHtml
              }
            })
        }
        if (this.detail_list.payOrderType == 4) {
          this.$axios
            .post('/innerService/addPayOrder', {
              paymentId: this.pay_method_params.paymentId,
              payOrderType: 4,
              payOrderNo: params.payOrderNo,
              orderMoney: params.orderMoney,
              deadline: params.deadline,
              billNumber: params.billNumber,
              accountNumber: params.accountNumber,
              device: 4
            })
            .then(res => {
              if (res.data.code === 1) {
                let aliplyHtml = res.data.data
                window.location.href = aliplyHtml
              }
            })
        }
        if (this.detail_list.payOrderType == 5) {
          this.$axios
            .post('/innerService/addPayOrder', {
              paymentId: this.pay_method_params.paymentId,
              payOrderType: 4,
              payOrderNo: params.payOrderNo,
              orderMoney: params.orderMoney,
              phone: params.phone,
              supplierId: params.supplierId,
              extTag: params.extTag,
              accountNumber: params.accountNumber,
              device: 4
            })
            .then(res => {
              if (res.data.code === 1) {
                let aliplyHtml = res.data.data
                window.location.href = aliplyHtml
              }
            })
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.pay_method_select {
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
  background: url('../../../assets/icons/icon_choose@2x.png') no-repeat;
  background-size: 100% 100%;
}

.pay_checkbox .checked {
  background: url('../../../assets/icons/icon_chosen@2x.png') no-repeat;
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
.pay-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2002;
}
.pay-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  // overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  z-index: 2003;
  .delete-dialog {
    position: absolute;
    right: -18px;
    top: -23px;
    width: 35px;
    height: 35px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
  }
  .pay-madal-title {
    padding: 17px;
  }
  .pay-madal-content {
    padding: 0 17px 0 17px;
    .recharge {
      background: #ff644d;
      border-radius: 4px;
      width: 100px;
      height: 30px;
      color: #fff;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      margin: 0 auto 18px auto;
    }
  }
}
.network_detail {
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
    position: fixed;
    top: 7%;
    bottom: 0;
    background: #fff;
    width: 100%;
    .handle-button {
      display: flex;
      justify-content: space-around;
      padding-top: 25px;
      .button-pay {
        background: #ff644d;
        border-radius: 4px;
        width: 100px;
        height: 30px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
      }
      .button-cancel {
        width: 100px;
        height: 30px;
        border-radius: 4px;
        color: #ff644d;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ff644d;
        background: #fff;
        font-size: 14px;
      }
    }
    .detail-order {
      padding: 25px 0;
      border-bottom: 1px solid #ededed;
      display: flex;
      flex-direction: column;
      .price {
        color: #ff644d;
        font-size: 17px;
        padding-bottom: 12px;
        font-weight: 700;
        text-align: center;
      }
      .order-cancel {
        color: #999999;
        font-size: 14px;
        text-align: center;
      }
    }
    .detail-list {
      margin: 0 15px;
      padding: 0 0 15px 0;
      border-bottom: 1px solid #ededed;
      li {
        color: #999999;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
      }
      .act {
        color: #333333;
      }
      .size-small {
        font-size: 11px;
      }
    }
    .prompt {
      color: #999999;
      font-size: 14px;
      margin: 15px;
      padding: 0 0 15px 0;
    }
  }
}
</style>
