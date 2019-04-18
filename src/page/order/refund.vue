<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader style="height: 100%;" :title='apply_refund.apply_for_a_refund'></publicHeader>
		</div>
		<div class="refund_body" :style="{top: header_height}" :class="{foucus_target: foucus_target==0}">
			<div class="refund_box">
				<div class="order_info clearFloat">
					<div>
						{{apply_refund.order_number}}
					</div>
					<div>
						{{order_details.id}}
					</div>
				</div>
				<div class="order_info clearFloat">
					<div>
						{{apply_refund.shop_name}}
					</div>
					<div>
						{{order_details.seller_name}}
					</div>
				</div>
				<div class="order_info clearFloat">
					<div>
						{{apply_refund.refund_amount}}
					</div>
					<div>
						<span>
							{{order_details.actual_price}}P
						</span>
					</div>
				</div>
				<div class="order_info clearFloat">
					<div>
						{{apply_refund.refund_method}}
					</div>
					<div>
						{{apply_refund.return_account_balance}}
					</div>
				</div>

				<div class="refund_resion_box">
					<div class="refund_resion_title">
						{{apply_refund.refund_reason}}
						<span>*</span>
					</div>
					<div class="refund_resion_list clearFloat" v-for="(item, index) in refund_resion_list" :key="index">
						<div>
							{{item.resion}}
						</div>
						<div @click="check_resion(index)">
							<img src="../../assets/icons/oval_empty.png" v-show="!item.is_checked" />
							<img src="../../assets/icons/oval_checked.png" v-show="item.is_checked" />
						</div>
					</div>
				</div>

				<div class="remarks" v-show="notes">
					<div>
						{{apply_refund.supplementary_notes}}
					</div>
					<div>
						<textarea ref="textarea" v-model="remarks_content" @focus="focus_fn" @blur="on_blur" maxlength="50" resize="none" :placeholder="apply_refund.supplementary"></textarea>
					</div>
				</div>
			</div>

			<div class="refund_btn" @click="to_refund">
				{{apply_refund.apply_for_a_refund}}
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_gary_header.vue'
export default {
  name: 'refund',
  data() {
    return {
      refund_resion_list: [
        { resion: this.$t('apply_refund.wrong_dish'), is_checked: false },
        { resion: this.$t('apply_refund.change_plan'), is_checked: false },
        {
          resion: this.$t('apply_refund.no_promise_discount'),
          is_checked: false
        },
        {
          resion: this.$t('apply_refund.consignee_information'),
          is_checked: false
        },
        {
          resion: this.$t('apply_refund.slow_delivery_rate'),
          is_checked: false
        },
        { resion: this.$t('apply_refund.other'), is_checked: false }
      ],
      checked_resion: '',
      remarks_content: '',
      remarks: '',
      notes: false,
      is_active: false,
      header_height: '7%',
      foucus_target: 1
    }
  },
  components: {
    publicHeader
  },
  computed: {
    apply_refund() {
      let apply_refund = this.$t('apply_refund')
      return apply_refund
    },
    order_details() {
      return store.state.order_details
    }
  },
  created() {
    this.orderDetails()
  },
  watch: {
    remarks_content: function() {
      this.remarks = this.remarks_content
    }
  },
  methods: {
    focus_fn() {
      this.header_height =
        document.querySelector('.phoneHeader').offsetHeight + 'px'
      this.foucus_target = 0
      this.$refs.textarea.style.height = '30vh'
    },
    on_blur() {
      this.$refs.textarea.style.height = ''
      this.foucus_target = 1
    },
    to_refund() {
      if (this.remarks == '') {
        this.toast.warning(this.apply_refund.supplementary)
      } else {
        this.toApplyForARefund()
      }
    },
    check_resion(index) {
      if (index == this.refund_resion_list.length - 1) {
        this.checked_resion = this.refund_resion_list[index].resion
        this.remarks = this.checked_resion
        this.notes = true
      } else {
        this.notes = false
        this.checked_resion = this.refund_resion_list[index].resion
        this.remarks = this.checked_resion
      }
      this.refund_resion_list.forEach(item => {
        item.is_checked = false
      })
      this.refund_resion_list[index].is_checked = true
      this.checked_resion = this.refund_resion_list[index].resion
    },
    // 申请退款
    toApplyForARefund() {
      store
        .dispatch('toApplyForARefund', {
          orderId: this.$route.query.id,
          remark: this.remarks
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$router.push({
              path: '/order_details',
              query: { id: this.$route.query.id }
            })
            sessionStorage.setItem('refund_details_back', true)
          } else if (res.data.code == 9999) {
            this.toast.error(res.data.message)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 退款详情
    orderDetails() {
      store
        .dispatch('orderDetails', {
          orderId: this.$route.query.id
        })
        .then(res => {
          let data = res.data
          if (data.code == 1) {
            Object.assign(store.state.order_details, data.data)
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

.foucus_target {
  position: relative;
}

.refund_box {
  width: 100%;
  background: #ffffff;
}

.order_info {
  width: 100%;
  padding: 0.4rem;
  border-bottom: 1px solid #ededed;
}

.order_info div:first-child {
  float: left;
  color: #666666;
}

.order_info div:last-child {
  float: right;
}

.order_info span {
  color: #ff644c;
}

.refund_resion_box {
  padding: 0.4rem;
}

.refund_resion_title {
  padding-bottom: 0.4rem;
  border-bottom: 2px solid #ededed;
  color: #666666;
}

.refund_resion_title span {
  color: #ff644c;
}

.refund_resion_list {
  width: 100%;
  padding-top: 0.4rem;
}

.refund_resion_list div:first-child {
  float: left;
}

.refund_resion_list div:last-child {
  float: right;
  width: 20px;
  display: flex;
  align-items: center;
}

.refund_resion_list div:last-child img {
  width: 100%;
}

.remarks {
  width: 100%;
  padding: 0.4rem;
  border-top: 1px solid #ededed;
}

.remarks div {
  color: #666666;
}

.remarks div:first-child {
  margin-bottom: 0.4rem;
}

.remarks textarea {
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 0;
  background: #fafafa;
  padding: 0.4rem;
  -webkit-appearance: none;
}

.refund_btn {
  width: 100%;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  margin-top: 10px;
  background: #ff644c;
  text-align: center;
  color: white;
  margin-bottom: 50px;
}
</style>