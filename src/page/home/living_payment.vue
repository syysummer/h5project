<template>
	<div style="height:100%;">
		<div class="header_box">
			<publicHeader :title='living_payment.title'></publicHeader>
		</div>
		<div class="living_payment_body">
			<div class="living_payment_box tel_charges">
				<div class="clearFloat">
					<div class="living_payment_icon">
						<img src="../../assets/icons/tel_charges_icon.png" />
					</div>
					<div class="living_payment_content">
						<p>
							{{living_payment.tel_charges}}
						</p>
						<p>
							{{living_payment.tel_charges_content}}
						</p>
					</div>
				</div>
				<div class="clearFloat">
					<div class="go_to_pay clearFloat">
						<div @click="to_detail('pay_charge')">
							{{living_payment.go_to_pay}}
						</div>
						<div @click="to_detail('pay_charge')">
							<img src="../../assets/icons/go_to_pay.png" />
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="living_payment_box electricity_fees">
				<div class="clearFloat">
					<div class="living_payment_icon">
						<img src="../../assets/icons/electricity_fees_icon.png" />
					</div>
					<div class="living_payment_content">
						<p>
							{{living_payment.electricity_fees}}
						</p>
						<p>
							{{living_payment.electricity_fees_content}}
						</p>
					</div>
				</div>
				<div class="clearFloat">
					<div class="go_to_pay clearFloat">
						<div @click="to_detail('pay_electricity')">
							{{living_payment.go_to_pay}}
						</div>
						<div @click="to_detail('pay_electricity')">
							<img src="../../assets/icons/go_to_pay.png" />
						</div>
					</div>
				</div>
			</div> -->
			<div class="living_payment_box net_fee">
				<div class="clearFloat">
					<div class="living_payment_icon">
						<img src="../../assets/icons/net_fee_icon.png" />
					</div>
					<div class="living_payment_content">
						<p>
							{{living_payment.net_fee}}
						</p>
						<p>
							{{living_payment.net_fee_content}}
						</p>
					</div>
				</div>
				<div class="clearFloat">
					<div class="go_to_pay clearFloat">
						<div @click="to_detail('pay_network')">
							{{living_payment.go_to_pay}}
						</div>
						<div @click="to_detail('pay_network')">
							<img src="../../assets/icons/go_to_pay.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import publicHeader from '../../components/public_header'
export default {
  name: 'living_payment',
  data() {
    return {}
  },
  components: {
    publicHeader
  },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    }
  },
  methods: {
    to_detail(type) {
      // if (localStorage.getItem('hasLog') == 0) {
      //   this.$router.push({
      //     path: '/login',
      //     query: {
      //       from_path: this.$route.name
      //     }
      //   })
      // } else {
      if (type == 'pay_charge') {
        this.$router.push({
          path: '/pay_charge'
        })
      } else if (type == 'pay_electricity') {
        this.$router.push({
          path: '/pay_electricity'
        })
      } else if (type == 'pay_network') {
        this.$router.push({
          path: '/pay_network'
        })
      }
      // }
    }
  }
}
</script>

<style scoped>
.header_box {
  width: 100%;
  height: 7vh;
}

.living_payment_body {
  width: 100%;
  height: 93vh;
  padding: 0.4rem;
  border-top: 1px solid #ededed;
  background: white;
}

.living_payment_box {
  width: 100%;
  padding: 0.4rem 0.6rem;
  color: white;
}

.living_payment_box div:first-child {
  display: flex;
  align-items: center;
}

.living_payment_icon {
  float: left;
  margin-right: 0.4rem;
  width: 1.3rem;
}

.living_payment_icon img {
  width: 100%;
  height: 100%;
}

.living_payment_content {
  float: left;
}

.living_payment_content p:first-child {
  font-size: 24px;
}

.living_payment_content p:last-child {
  font-size: 14px;
}

.go_to_pay {
  float: right;
  background: rgba(225, 225, 225, 0.4);
  padding: 0.1rem 0.4rem;
  border-radius: 50px;
  margin-bottom: 0.2rem;
}

.go_to_pay a {
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 16px;
}

.go_to_pay div {
  float: left;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.go_to_pay div:first-child {
  margin-right: 0.2rem;
}

.go_to_pay img {
  width: 14px;
}

.tel_charges {
  background: url('../../assets/icons/tel_charges_bg.png');
  background-size: 100% 100%;
}

.electricity_fees {
  background: url('../../assets/icons/electricity_fees_bg.png');
  background-size: 100% 100%;
}

.net_fee {
  background: url('../../assets/icons/net_fee_bg.png');
  background-size: 100% 100%;
}
</style>
