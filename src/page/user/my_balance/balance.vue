<template>
	<div class="balance">
		<div class="header">
			<div class="back" @click="back">
				<img src="../../../assets/icons/icon_arrows_left@2x.png" alt="">
			</div>
			<div class="title">
				{{my_balance.title}}
			</div>
			<div class="right" @click="goDetails">{{my_balance.details}}</div>
		</div>
		<div class="content">
			<div>
				<img src="../../../assets/icons/my_balance@2x.png" alt="">
			</div>
			<div class="price">{{balance}}P</div>
		</div>
	</div>
</template>

<script>
import store from '../../../store'
export default {
  name: 'balance',
  data() {
    return {
      balance: '',
      balanceId: ''
    }
  },
  computed: {
    my_balance() {
      let my_balance = this.$t('my_balance')
      return my_balance
    }
  },
  mounted() {
    this.getBalance()
  },
  update() {
    this.getBalance()
  },
  methods: {
    getBalance() {
      store
        .dispatch('myBalanceApi')
        .then(res => {
          if (res.data.code === 1) {
            this.balance = res.data.data.accountBalance
            this.balanceId = res.data.data.id
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    back() {
      this.$router.go(-1)
    },
    goDetails() {
      this.$router.push('/balance_details/' + this.balanceId)
    }
  }
}
</script>

<style scoped lang="scss">
.balance {
  .header {
    text-align: center;
    padding: 12px 15px;
    position: relative;
    border-bottom: 1px solid #dddddd;
    .back {
      width: 12px;
      float: left;
      margin-top: 2px;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 16px;
      color: #666;
    }
    .right {
      color: #666;
      font-size: 16px;
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
  .content {
    background: #fff;
    height: 100vh;
    div {
      &:first-child {
        width: 90px;
        padding-top: 150px;
        margin: 0 auto;
      }
      img {
        width: 100%;
      }
    }
    .price {
      text-align: center;
      margin-top: 10px;
      font-size: 28px;
      color: #333;
    }
  }
}
</style>
