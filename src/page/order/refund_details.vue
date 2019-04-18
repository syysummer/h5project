<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader :title='refund_details.title'></publicHeader>
		</div>
		<div class="refund_body">
			<div class="refund_box">
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.refund_eason}}
					</div>
					<div>
						{{refund_details_msg.orderMap.remark}}
					</div>
				</div>
				<!-- 补充说明 -->
				<!-- <div class="refund_info clearFloat">
          <div>
            {{refund_details.remarks}}
          </div>
          <div>
            {{refund_details_msg.orderMap.remark}}
          </div>
        </div> -->
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.refund_amount}}
					</div>
					<div>
						<span>{{(refund_details_msg.orderMap.actualPrice).toFixed(2)}}P</span>
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.refund_method}}
					</div>
					<div>
						{{refund_details_msg.orderMap.newOrderStatus}}
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.refund_status}}
					</div>
					<!-- 退款状态 -->
					<!-- <div v-if="refund_details_msg.orderMap.rerundWay==1">退款发起</div> -->
					<div v-if="refund_details_msg.orderMap.rerundWay==1">{{refund_details.merchant_handling}}</div>
					<div v-if="refund_details_msg.orderMap.rerundWay==3">{{refund_details.platform_audit}}</div>
					<div v-if="refund_details_msg.orderMap.rerundWay==4 || refund_details_msg.orderMap.rerundWay==2">{{refund_details.refunds}}</div>
				</div>
			</div>

			<!-- 退款流程 -->
			<div class="refund_flow">
				<div class="refund_title">
					{{refund_details.refund_process}}
				</div>
				<div class="refund_step">

					<div class="el-step is-vertical" style="flex-basis: 33.3333%;">
						<div class="el-step__head" :class="{'is-finish': refund_status==1 || refund_status==2 || refund_status==3 || refund_status==4}">
							<!-- 线 -->
							<div class="el-step__line" style="margin-right: 0px;">
								<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
							</div>
							<!-- 图标 -->
							<div class="el-step__icon is-text" :class="{'is-finish': refund_status==1 ||refund_status==2 || refund_status==3 || refund_status==4}">
							</div>
						</div>
						<div class="el-step__main">
							<div class="el-step__title" :class="{'is-finish': refund_status==1 || refund_status==2 || refund_status==3 || refund_status==4}">{{refund_details.refund_initiated}}</div>
							<div class="el-step__description" :class="{'is-finish': refund_status==1 || refund_status==2 || refund_status==3 || refund_status==4}">{{refund_details.merchants_launched_request}}</div>
							<div class="el-step__description" :class="{'is-finish': refund_status==1 || refund_status==2 || refund_status==3 || refund_status==4}">{{$formatDateTime(first_create_time)}}</div>
						</div>
					</div>
					<div class="el-step is-vertical" style="flex-basis: 33.3333%;">
						<div class="el-step__head" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">
							<div class="el-step__line" style="margin-right: 0px;">
								<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
							</div>
							<div class="el-step__icon is-text" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">
							</div>
						</div>
						<div class="el-step__main">
							<div class="el-step__title" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">{{refund_details.merchant_handling}}</div>
							<div v-if="refund_status==2" class="el-step__description" :class="{'is-finish': refund_status==2}">{{refund_details.in_business_processing}}</div>
							<div v-if="refund_status==3 || refund_status==4" class="el-step__description" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">{{refund_details.seller_agree}}</div>
							<div v-if="second_create_time" class="el-step__description" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">{{$formatDateTime(second_create_time)}}</div>
							<div v-if="!second_create_time" class="el-step__description" :class="{'is-finish': refund_status==2 || refund_status==3 || refund_status==4}">{{$formatDateTime(first_create_time)}}</div>
						</div>
					</div>
					<div class="el-step is-vertical" style="flex-basis: 33.3333%;">
						<div class="el-step__head" :class="{'is-finish': refund_status==3 || refund_status==4}">
							<div class="el-step__line" style="margin-right: 0px;">
								<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
							</div>
							<div class="el-step__icon is-text" :class="{'is-finish': refund_status==3 || refund_status==4}">
							</div>
						</div>
						<div class="el-step__main">
							<div class="el-step__title" :class="{'is-finish': refund_status==3 || refund_status==4}">{{refund_details.platform_audit}}</div>
							<div v-if="refund_status==3" class="el-step__description" :class="{'is-finish': refund_status==3}">{{refund_details.in_the_platform_audit}}</div>
							<div v-if="refund_status==4" class="el-step__description" :class="{'is-finish': refund_status==4}">{{refund_details.platform_agree}}</div>
							<div v-if="refund_status==4 && last_create_time" class="el-step__description" :class="{'is-finish': refund_status==3 || refund_status==4}">{{$formatDateTime(last_create_time)}}</div>
						</div>
					</div>
					<div class="el-step is-vertical" style="flex-basis: 33.3333%;">
						<div class="el-step__head">
							<div class="el-step__line" style="margin-right: 0px;">
								<i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
							</div>
							<div class="el-step__icon is-text" :class="{'is-finish': refund_status==4}">
							</div>
						</div>
						<div class="el-step__main">
							<div class="el-step__title" :class="{'is-finish': refund_status==4}">{{refund_details.refunds}}</div>
							<div v-if="refund_status==4" class="el-step__description" :class="{'is-finish': refund_status==4}">{{refund_details.refund_success}}</div>
						</div>
					</div>

				</div>
			</div>

			<!-- 订单信息 -->
			<div class="order_info">
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.shop_name}}
					</div>
					<div>
						{{refund_details_msg.orderMap.sellerName}}
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.order_number}}
					</div>
					<div>
						{{refund_details_msg.orderMap.orderId}}
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.total_order}}
					</div>
					<div>
						{{(refund_details_msg.orderMap.totalPrice).toFixed(2)}}P
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.discount_amount}}
					</div>
					<div>
						{{(refund_details_msg.orderMap.discountMoney).toFixed(2)}}P
					</div>
				</div>
				<div class="refund_info clearFloat">
					<div>
						{{refund_details.amount_paid}}
					</div>
					<div>
						{{(refund_details_msg.orderMap.actualPrice).toFixed(2)}}P
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_gary_header.vue'
export default {
  name: 'refund_details',
  data() {
    return {
      timer: null,
      first_create_time: '',
      second_create_time: '',
      last_create_time: '',
      refund_status: 1 // 1：退款发起、 2：商家处理、 3：平台审核、 4：退款结束
    }
  },
  components: {
    publicHeader
  },
  computed: {
    refund_details() {
      let refund_details = this.$t('refund_details')
      return refund_details
    },
    refund_details_msg() {
      return store.state.refund_details
    }
  },
  created() {
    this.get_refund_details()
  },
  methods: {
    get_refund_details() {
      store
        .dispatch('get_refund_details', {
          orderId: this.$route.query.id
        })
        .then(res => {
          let data = res.data
          this.first_create_time = data.data.listStatus[0].createTime
          if (data.data.listStatus[1]) {
            this.second_create_time = data.data.listStatus[1].createTime
          }
          if (data.data.listStatus[2]) {
            this.last_create_time = data.data.listStatus[2].createTime
          }
          if (data.code == 1) {
            Object.assign(store.state.refund_details, data.data)
            if (store.state.refund_details.orderMap.rerundWay == 1) {
              this.refund_status = 2
            } else if (store.state.refund_details.orderMap.rerundWay == 3) {
              this.refund_status = 3
            } else if (
              store.state.refund_details.orderMap.rerundWay == 4 ||
              store.state.refund_details.orderMap.rerundWay == 2
            ) {
              this.refund_status = 4
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
.contain {
  height: 100%;
}

.phoneHeader {
  position: fixed;
  width: 100%;
  height: 7%;
  min-height: 45px;
  top: 0;
  z-index: 1;
}

.refund_body {
  width: 100%;
  height: 93%;
  position: fixed;
  top: 7%;
  overflow: scroll;
}

.refund_box {
  width: 100%;
  background: #ffffff;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-bottom: 10px;
}

.refund_info {
  width: 100%;
  padding: 0.2rem 0.4rem;
}

.refund_info div:first-child {
  float: left;
  color: #999999;
}

.refund_info div:last-child {
  float: right;
  color: #666666;
}

.refund_info span {
  color: #ff644c;
}

.refund_flow {
  background: #ffffff;
  padding: 0.4rem;
  margin-bottom: 10px;
}

.refund_title {
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ededed;
  color: #666666;
  margin-bottom: 10px;
}

.order_info {
  background: #ffffff;
}

/* 流程图 */

.el-step__main {
  padding-bottom: 10px;
}

.el-step__title,
.el-step__description {
  color: #666666;
  padding-bottom: 5px;
}

.el-step__description.is-finish,
.el-step__title.is-finish,
.el-step__head.is-finish {
  color: #ff644c;
}

.el-step__icon.is-text {
  border: 3px solid #cdcdcd;
  background: #999999;
}

.el-step__icon.is-text.is-finish {
  border: 3px solid #ffbdb3;
  background: #ff644c;
}
</style>