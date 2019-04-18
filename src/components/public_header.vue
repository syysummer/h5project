<template>
	<div class="container">
		<div class="header_box clearFloat" :class="{gary_title: this.$route.name == 'select_address'}">
			<div v-if="this.$route.name !== 'order'" class="back_btn" @click="go_back">
				<div>
					<img src="../assets/icons/icon_arrows_left@2x.png" />
				</div>
			</div>
			<div class="title" :class="{gary_title: this.$route.name == 'select_address'}">
				{{title}}
			</div>
			<div class="right_btn" @click='right_btn_fn'>
				{{rightBtn}}
			</div>
			<div class="right_btn" @click='right_btn_fn' v-if="this.$route.name == 'select_address'">
				<img src="../assets/icons/add_address.png" />
			</div>
			<div class="right_btn" v-if="this.$route.name == 'pay_network'">
				<router-link to="/network_fee" class="pay-record">{{living_payment.pay_record}}</router-link>
			</div>
			<div class="right_btn" v-if="this.$route.name == 'pay_charge'">
				<router-link to="/charge_fee" class="pay-record">{{living_payment.recharge_record}}</router-link>
			</div>
			<div class="right_btn" v-if="this.$route.name == 'pay_electricity'">
				<router-link to="/electricity_fee" class="pay-record">{{living_payment.pay_record}}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import store from '../store'
export default {
  name: 'public_header',
  data() {
    return {
      sellerId: '',
      isPay: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    rightBtn: {
      type: String,
      default: ''
    }
  },
  created() {
    this.sellerId = this.$route.query.id
  },
  watch: {
    $route(to, from) {
      if (from.name.indexOf('/business_shop') != -1) {
        store.state.from_seller = true
      } else {
        store.state.from_seller = false
      }
    }
  },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    }
  },
  methods: {
    go_back() {
      if (this.$route.name == 'HelloWorld') {
        alert('HelloWorld')
      } else if (this.$route.name == 'order_details') {
        this.$router.push(`/order`)
      } else if (this.$route.name == 'living_payment') {
        this.$router.push(`/home`)
      } else if (this.$route.name == 'order_address') {
        this.$router.push(`/submit_order?id=${this.sellerId}`)
      } else if (this.$route.name == 'seller_list') {
        this.$router.push('/home')
      } else if (this.$route.name == 'address_list') {
        this.$router.push('/user')
      } else if (this.$route.name == 'select_address') {
        // localStorage.setItem("current_address_latlng", "")
        this.$router.push('/home')
      } else if (this.$route.name == 'my_evaluate') {
        this.$router.push('/user')
      } else if (this.$route.name == 'selectPayMethod') {
        this.$router.push('/order')
      } else if (this.$route.name == 'register') {
        location.reload()
        sessionStorage.removeItem('next_way')
      } else {
        history.go(-1)
      }
    },
    right_btn_fn() {
      this.$emit('rightBtnFn', this.rightBtn)
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  border-bottom: 1px solid #ededed;
}

.header_box {
  width: 100%;
  height: 100%;
  color: #666;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: relative;
  background-color: #fff;
  z-index: 2;
}

.back_btn {
  width: 12px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0.4rem;
  display: flex;
  align-items: center;
}

.back_btn div {
  width: 100%;
  height: 40%;
}

.back_btn img {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.right_btn {
  height: 100%;
  position: absolute;
  right: 0.4rem;
  top: 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.right_btn img {
  width: 50%;
}

.gary_title {
  background: #f9f9f9;
}
.pay-record {
  font-size: 14px;
  color: #333333;
}
</style>
