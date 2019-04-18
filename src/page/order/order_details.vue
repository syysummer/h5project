<template>
  <div class="contain">
    <div class="phoneHeader">
      <publicHeader :title='order_details_lang.title'></publicHeader>
    </div>

    <div class="order_details_body">
      <!-- 头部订单状态 -->
      <div class="order_details_header clearFloat">
        <div class="order_status_box">
          <div class="order_status" v-if="order_status==1">
            <p>{{order_details_lang.to_be_evaluated}}</p>
            <p>{{order_details_lang.to_be_evaluated_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==2">
            <p>{{order_details_lang.refund}}</p>
            <p>{{order_details_lang.refund_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==3">
            <p>{{order_details_lang.canceled}}</p>
            <p v-show="cancel_status==1">{{order_details_lang.order_has_been_cancelled}}</p>
            <p v-show="cancel_status==2">{{order_details_lang.cancel_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==4">
            <p>{{order_details_lang.refund_succsss}}</p>
            <p>{{order_details_lang.cancel_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==5">
            <p>{{order_details_lang.over}}</p>
            <p>{{order_details_lang.forward}}</p>
          </div>
          <div class="order_status" v-if="order_status==6">
            <p>{{order_details_lang.not_receive}}</p>
            <p>{{order_details_lang.bot_receive_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==7">
            <p>{{order_details_lang.has_refused}}</p>
            <p>{{order_details_lang.reason_for_rejection}}</p>
          </div>
          <div class="order_status" v-if="order_status==8">
            <p>{{order_details_lang.process_delivery}}</p>
            <p>{{order_details_lang.process_delivery_content}}</p>
          </div>
          <div class="order_status" v-if="order_status==9">
            <p>{{order_details_lang.wait_pay}}</p>
            <p v-if="lang=='zh'">
              剩余
              <span>{{min}}</span> 分
              <span>{{sec}}</span> 秒订单将自动关闭
            </p>
            <p v-if="lang=='en'">
              Left
              <span>{{min}}:{{sec}}</span>
              order will be automatically closed
            </p>
          </div>
        </div>
        <div class="order_status_icon">
          <img v-if="order_status==1" src="../../assets/icons/order_details/to_be_evaluated.png" />
          <img v-if="order_status==2" src="../../assets/icons/order_details/refunds.png" />
          <img v-if="order_status==3" src="../../assets/icons/order_details/cancelled.png" />
          <img v-if="order_status==4" src="../../assets/icons/order_details/refunds_success.png" />
          <img v-if="order_status==5" src="../../assets/icons/order_details/finish.png" />
          <img v-if="order_status==6" src="../../assets/icons/order_details/waiting.png" />
          <img v-if="order_status==7" src="../../assets/icons/order_details/refusing_a_refund.png" />
          <img v-if="order_status==8" src="../../assets/icons/order_details/distribution.png" />
          <img v-if="order_status==9" src="../../assets/icons/order_details/unpaid.png" />
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="seller_info info_box">
        <!-- 商铺信息 -->
        <div class="seller_info_header clearFloat" @click="go_to_seller_home(order_details.seller_id)">
          <div>
            <img :src="order_details.seller_photo" />
          </div>
          <div class="seller_name single_hide">
            {{order_details.seller_name}}
          </div>
          <div>
            <img src="../../assets/icons/order_details/go_in.png" />
          </div>
        </div>

        <!-- 订单信息 -->
        <div class="orders_info_list_box">

          <div class="orders_info_list clearFloat" v-for="(item, index) in order_details.Goods" :key="index">
            <div class="orders_info_list_headers">
              <img :src="item.goodsPhoto" @error="imgError(index)" />
            </div>
            <div class="orders_info_list_content">
              <div class="order_name single_hide">
                {{item.goodsName}}
              </div>
              <div class="order_requirement single_hide" v-if="item.goodsSpecifications || item.goodsAttributeLabel">
                {{item.goodsSpecifications}}
                <span v-if="item.goodsSpecifications && item.goodsAttributeLabel"> / </span>
                {{item.goodsAttributeLabel}}
              </div>
              <div class="order_num">
                x{{item.num}}
              </div>
            </div>
            <div class="orders_info_list_price">
              <div>
                <p>
                  {{(item.presentPrice * item.num).toFixed(2)}}P
                </p>
                <P>
                  <!-- 优惠价 -->
                  <!-- 0P -->
                </P>
              </div>
            </div>
          </div>
        </div>

        <div class="seller_information clearFloat">
          <div>
            {{order_details_lang.delivery_fee}}
          </div>
          <div class="distribution_fee">
            {{order_details.logistics}}P
          </div>
        </div>
        <div class="seller_information clearFloat" v-if="order_details.discount_money!=0">
          <div>
            {{order_details_lang.preferential_amount}}
          </div>
          <div class="preferential_amount">
            -{{order_details.discount_money}}P
          </div>
        </div>
        <div class="seller_information clearFloat" v-if="order_details.total_lunchbox_price!=0">
          <div>
            {{order_details_lang.total_lunchbox_price}}
          </div>
          <div class="distribution_fee">
            {{order_details.total_lunchbox_price}}P
          </div>
        </div>
        <div class="seller_information clearFloat">
          <div></div>
          <div>
            <span class="real_payment">{{order_details_lang.real_pay}}</span>
            <span class="real_payment_amount">{{order_details.actual_price}}P</span>
          </div>
        </div>
        <div class="seller_information">
          <span class="contact_the_merchant">
            <span>
              <img src="../../assets/icons/order_details/contact_the_merchant.png" />
            </span>
            <span @click="show_tel=true">
              {{order_details_lang.contact_merchant}}
            </span>
          </span>
        </div>
      </div>

      <!-- 配送信息 -->
      <div class="distribution_info info_box">
        <div class="public_title">
          {{order_details_lang.distribution_information}}
        </div>
        <div>
          <div class="distribution_info_box clearFloat">
            <div>
              {{order_details_lang.delivery_address}}
            </div>
            <div>
              <p>
                {{order_details.name}}
                <span v-if="order_details.sex==0">({{order_details_lang.mr}})</span>
                <span v-if="order_details.sex==1">({{order_details_lang.ms}})</span>
                {{order_details.phone}}
              </p>
              <p>
                {{order_details.address}} {{order_details.house_number}}
              </p>
            </div>
          </div>
          <div class="distribution_info_box clearFloat">
            <div>
              {{order_details_lang.note}}
            </div>
            <div class="remarks_contetn">
              {{order_details.remark}}
            </div>
          </div>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="order_info info_box">
        <div class="public_title">
          {{order_details_lang.order_information}}
        </div>
        <div>
          <div class="order_info_box clearFloat">
            <div>
              {{order_details_lang.order_number}}
            </div>
            <div>
              {{order_details.id}}
            </div>
          </div>
          <div class="order_info_box clearFloat">
            <div>
              {{order_details_lang.order_time}}
            </div>
            <div>
              {{$formatDateTime(order_details.create_time)}}
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 底部按钮 -->
    <!-- <div class="footer_btn clearFloat" v-if="order_status==1 || order_status==2 || order_status==4 || order_status==6 || order_status==7 || order_status==8 || order_status==9"> -->
    <div class="footer_btn clearFloat">
      <div v-if="order_status==9" @click="toPay(order_id)">
        {{order_details_lang.toPay}}
      </div>
      <div v-if="order_status==8" @click="toDeliveyDetail(order_id)">
        {{order_details_lang.toDeliveyDetail}}
      </div>
      <div v-if="order_status==7" @click="toDeliveyDetail(order_id)">
        {{order_details_lang.toDeliveyDetail}}
      </div>
      <div v-if="order_status==4" @click="toRefundDetail(order_id)">
        {{order_details_lang.toRefundDetail}}
      </div>
      <div class="empty_color" v-if="order_status==6 || order_status==9" @click="toCancel(order_id)">
        {{order_details_lang.toCancel}}
      </div>
      <div class="empty_color" v-if="order_status==8" @click="toRefund(order_id)">
        {{order_details_lang.toRefund}}
      </div>
      <div v-if="order_status==2" @click="toRefundDetail(order_id)">
        {{order_details_lang.toRefundDetail}}
      </div>
      <div v-if="order_status==1" @click="toEvaluate(order_id)">
        {{order_details_lang.toEvaluate}}
      </div>
      <div class="empty_color" @click="reminder(order_details.reminderTime, order_id)" v-if="order_status == 8 && order_details.timeStatus == 1">
        {{get_language.reminder_title}}
      </div>
      <div class="empty_color" @click="go_to_seller_home(order_details.seller_id)" v-if="order_status == 1 || order_status == 3 || order_status == 4 || order_status == 5">
        {{get_en.single_again}}
      </div>
    </div>

    <!-- 电话提示框 -->
    <div class="tel_popup" v-if="show_tel">
      <div class="tel_num">
        {{order_details.sellerPhonePre + ' ' + order_details.sellerPhone}}
      </div>
      <div class="tel_popup_btn clearFloat">
        <div @click="show_tel=false">
          {{order_details_lang.cancel}}
        </div>
        <div @click="show_tel=false">
          <a :href="'tel:'+(order_details.sellerPhonePre + order_details.sellerPhone)">
            {{order_details_lang.call}}
          </a>
        </div>
      </div>
    </div>
    <div class="tel_task_box" v-if="show_tel"></div>
  </div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
export default {
  name: 'order_details',
  data() {
    return {
      timer: null,
      surplus_time: '',
      min: '',
      sec: '',
      lang: '',
      show_tel: false,
      cancel_status: 1,
      order_status: '', // 1：待评价、 2：退款中、 3：订单已取消、 4：退款成功、 5：订单已完成、6:等待商家接单、 7：订单已拒绝退款、 8：制作配送中、 9：待支付
      isReminder: false
    }
  },
  components: {
    publicHeader
  },
  computed: {
    order_details() {
      return store.state.order_details
    },
    order_details_lang() {
      let order_details_lang = this.$t('order_details')
      return order_details_lang
    },
    get_language() {
      let txt = this.$t('main_comment')
      return txt
    },
    order_id() {
      return store.state.order_details.id
    },
    get_en() {
      return this.$t('order')
    }
  },
  beforeCreate() {
    this.order_status = ''
  },
  created() {
    this.lang = getCookie('lang')
    this.get_order_details()
    // this.timer = setInterval(() => {
    //   this.get_order_details();
    // }, 5000);
  },
  methods: {
    reminder(status, id) {
      if (status || this.isReminder) {
        let txt = this.$t('main_comment.remindered')
        this.toast(txt)
      } else {
        let _this = this
        this.$confirm({
          title: _this.get_language.reminderTitle,
          content: _this.get_language.reminderTxt,
          noText: _this.get_language.no,
          yesText: _this.get_language.yes
        }).then(() => {
          store
            .dispatch('reminderOrder', {
              orderId: id
            })
            .then(res => {
              if (res.data.code === 1) {
                let txt = _this.get_language.success_undelivered
                this.isReminder = true
                this.toast(txt)
              } else {
                let txt = _this.get_language.reminder_failed
                this.toast(txt)
              }
            })
        })
      }
    },
    go_to_seller_home(id) {
      this.$router.push({
        path: '/business_shop',
        query: {
          id: id,
          pathName: this.$route.name,
          order_id: this.$route.query.id
        }
      })
    },
    imgError(index) {
      store.state.order_details.Goods[
        index
      ].goodsPhoto = require('../../assets/images/mo.png')
    },
    // 配送详情
    toDeliveyDetail(id) {
      this.$router.push({
        path: '/distribution_details',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 去支付
    toPay(id) {
      this.$router.push({
        path: '/selectPayMethod',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 取消订单
    toCancel(id) {
      store
        .dispatch('cancelTheOrder', {
          orderId: this.$route.query.id
        })
        .then(res => {
          this.get_order_details()
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 退款详情
    toRefundDetail(id) {
      this.$router.push({
        path: '/refund_details',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 申请退款
    toRefund(id) {
      this.$router.push({
        path: '/refund',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 去评价
    toEvaluate(id) {
      this.$router.push({
        path: '/evaluate',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 计算订单状态
    order_status_calc() {
      // 订单状态
      let order_status = this.order_details.order_status
      // 退款状态
      let rerund_status = this.order_details.rerund_status
      // 订单取消/退款
      let getSellerOrderTime = this.order_details.getSellerOrderTime

      if (rerund_status == 0 && order_status == 6) {
        // 待评价
        this.order_status = 1
      } else if (rerund_status == 1 || rerund_status == 3) {
        // 退款中
        this.order_status = 2
      } else if (
        rerund_status == 0 &&
        order_status == 7 &&
        getSellerOrderTime == null
      ) {
        // 订单已取消
        this.order_status = 3
        this.cancel_status = 1
      } else if (
        rerund_status == 4 &&
        order_status == 7 &&
        getSellerOrderTime == null
      ) {
        // 订单已取消
        this.order_status = 3
        this.cancel_status = 2
      } else if (
        rerund_status == 4 &&
        order_status == 7 &&
        getSellerOrderTime != null
      ) {
        // 退款成功
        this.order_status = 4
      } else if (rerund_status == 0 && order_status == 8) {
        // 订单已完成
        this.order_status = 5
      } else if (rerund_status == 0 && order_status == 1) {
        // 等待商家接单
        this.order_status = 6
      } else if (rerund_status == 2 || order_status == 7) {
        // 订单已拒绝退款
        this.order_status = 7
      } else if (rerund_status == 0 && order_status == 2) {
        // 制作配送中
        this.order_status = 8
      } else if (rerund_status == 0 && order_status == 9) {
        // 制作配送中
        this.order_status = 8
      } else if (rerund_status == 0 && order_status == 4) {
        // 制作配送中
        this.order_status = 8
      } else if (
        (rerund_status == 0 && order_status == 5) ||
        order_status == 3
      ) {
        // 制作配送中
        this.order_status = 8
      } else if (rerund_status == 0 && order_status == 0) {
        // 待支付
        this.order_status = 9
      }
    },
    // 获取订单详情
    get_order_details() {
      store
        .dispatch('orderDetails', {
          orderId: localStorage.getItem('order_detail_id')
        })
        .then(res => {
          let data = res.data
          if (data.code == 1) {
            Object.assign(store.state.order_details, data.data)
            this.order_status_calc()

            // 剩余支付时间
            if (
              this.order_details.rerund_status == 0 &&
              this.order_details.order_status == 0
            ) {
              let over_time = store.state.order_details.create_time + 900000
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
                  history.go(-1)
                }
              }, 1000)
            }
          } else if (data.code == 9999) {
            this.toast.error(data.message)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style scoped>
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.tel_task_box {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  background: black;
  opacity: 0.3;
}

.tel_popup {
  width: 60%;
  background: white;
  position: fixed;
  top: 40%;
  left: 20%;
  z-index: 222;
  border-radius: 10px;
}

.tel_num {
  text-align: center;
  padding: 0.4rem;
  border-bottom: 1px solid #ededed;
}

.tel_popup_btn {
  width: 100%;
  height: 50%;
}

.tel_popup_btn div {
  float: left;
  width: 50%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  text-align: center;
  color: #1b79d6;
}

.tel_popup_btn div:last-child {
  border-left: 1px solid #ededed;
}

.tel_popup_btn div a {
  display: block;
  width: 100%;
  height: 100%;
  color: #1b79d6;
}

.tel_popup_btn a:hover {
  color: #1b79d6;
}

.contain {
  height: 100%;
}

.phoneHeader {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 1;
}

.no_wify {
  width: 100%;
  height: 93%;
  position: fixed;
  top: 7%;
}

.no_wify div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.no_wify img {
  width: 50%;
  height: 50%;
  margin-top: 25%;
}

.no_wify p {
  width: 80%;
  text-align: center;
  color: #666666;
}

.no_wify span {
  display: block;
  padding: 0.2rem 0.4rem;
  background-color: #ff3633;
  border-radius: 5px;
  color: white;
}

.order_details_body {
  width: 100%;
  height: 93%;
  overflow: scroll;
  position: fixed;
  top: 7%;
}

.order_details_header {
  width: 100%;
  height: 13vh;
  background: url(../../assets/images/order_details_header_bg.png);
  background-size: 100% 100%;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.order_status_box {
  width: 75%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}

.order_status p {
  color: #fff0f0;
  font-size: 12px;
}

.order_status p:first-child {
  margin-bottom: 5px;
  font-size: 16px;
}

.order_status span {
  font-size: 12px;
  color: #f8e71c;
}

.order_status_icon {
  width: 25%;
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
}

.order_status_icon img {
  width: 80%;
}

.info_box {
  width: 100%;
  background: white;
  padding: 0.4rem;
  margin-top: 10px;
}

.public_title {
  width: 100%;
  border-bottom: 1px solid #ededed;
  padding-bottom: 0.4rem;
}

.seller_info_header {
  width: 100%;
  height: 1.8rem;
}

.seller_info_header div {
  float: left;
  height: 100%;
}

.seller_info_header div:first-child {
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.4rem;
}

.seller_info_header div:first-child img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.seller_name {
  width: 8.2rem;
  line-height: 1.8rem;
}

.seller_info_header div:last-child {
  float: right;
  margin-left: 0.4rem;
  width: 0.4rem;
  display: flex;
  align-items: center;
}

.seller_info_header div:last-child img {
  width: 100%;
}

.orders_info_list {
  width: 100%;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ededed;
}

.orders_info_list_headers {
  width: 2.4rem;
  height: 2.4rem;
  float: left;
  margin-right: 0.2rem;
}

.orders_info_list_headers img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.orders_info_list_content {
  float: left;
  height: 2.4rem;
  width: 6rem;
}

.orders_info_list_content {
  height: 0.8rem;
  line-height: 0.8rem;
}

.order_requirement {
  color: #999999;
}

.order_num {
  color: #999999;
  font-size: 14px;
}

.orders_info_list_price {
  float: right;
  height: 2.4rem;
  width: 2.4rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.orders_info_list_price p {
  font-size: 14px;
  text-align: right;
}

.orders_info_list_price p:first-child {
  color: #ff3633;
}

.orders_info_list_price p:last-child {
  color: #999999;
  text-decoration: line-through;
}

.seller_information {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ededed;
}

.seller_information div:first-child {
  float: left;
}

.seller_information div:last-child {
  float: right;
}

.distribution_fee {
  color: #999999;
}

.preferential_amount {
  color: #ff3633;
}

.real_payment {
  font-size: 14px;
}

.real_payment_amount {
  color: #ff3633;
}

.contact_the_merchant {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact_the_merchant span {
  color: #ff5d48;
}

.contact_the_merchant span:first-child {
  display: inline-block;
  width: 15px;
  margin-right: 0.2rem;
  height: 25px;
  display: flex;
  align-items: center;
}

.contact_the_merchant img {
  width: 100%;
}

.distribution_info_box div {
  float: left;
  margin-top: 0.4rem;
}

.distribution_info_box div:first-child {
  width: 28%;
  color: #9c9c9c;
}

.distribution_info_box div:last-child {
  padding-left: 5px;
  width: 72%;
}

.remarks_contetn {
  color: #9c9c9c;
}

.order_info {
  padding-bottom: 60px;
}

.order_info_box {
  width: 100%;
  margin-top: 0.4rem;
}

.order_info_box div:first-child {
  float: left;
  color: #9c9c9c;
}

.order_info_box div:last-child {
  float: right;
}

.footer_btn {
  width: 100%;
  background: white;
  border-top: 1px solid #ededed;
  padding: 0.2rem 0.4rem;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 5px #ededed;
}

.footer_btn div {
  float: right;
  text-align: center;
  padding: 0.2rem 0.4rem;
  margin-left: 15px;
  color: #ffffff;
  font-size: 14px;
  background: #ff5d48;
  border-radius: 2px;
  border: 1px solid #ff5d48;
}

.footer_btn div.empty_color {
  background: white;
  color: #ff5d48;
  border: 1px solid #ff5d48;
}
</style>
