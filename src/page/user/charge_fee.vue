<template>
  <div class="living-box" id="living-box">
    <livingPaymentList :livingTitle="living_payment.recharge_record" :subTitle="living_payment.recharge_fee" :payCostType="payCostType" :livingImg="livingImg" :url="url"></livingPaymentList>
  </div>
</template>
<script>
import livingPaymentList from './components/living_payment_list'
export default {
  data() {
    return {
      payCostType: 3,
      livingImg: require('../../assets/icons/charge.png'),
      url: '/charge_detail'
    }
  },
  components: { livingPaymentList },
  mounted() {
    let boxHeight = document.getElementById('living-box')
    boxHeight.style.height = document.documentElement.clientHeight + 'px'
  },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    }
  }
}
</script>
<style scoped lang="scss">
</style>

