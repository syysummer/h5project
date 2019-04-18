<template>
  <div class="living-box" id="living-box">
    <livingPaymentList :livingTitle="living_payment.pay_record" :subTitle="living_payment.pay_electricity_bill" :payCostType="payCostType" :livingImg="livingImg" :url="url"></livingPaymentList>
  </div>
</template>
<script>
import livingPaymentList from './components/living_payment_list'
export default {
  data() {
    return {
      payCostType: 4,
      livingImg: require('../../assets/icons/eletrict.png'),
      url: '/electricity_detail'
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
.living-box {
  height: 100%;
}
</style>
