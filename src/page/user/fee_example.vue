<template>
  <div>
    <div class="header">
      <publicHeader :title="living_payment.billing_example"></publicHeader>
    </div>
    <div class="contain_content">
      <img src="../../assets/images/fee-example.png" alt="">
      <div class="remark">
        {{living_payment.network_remark}}
      </div>
    </div>
  </div>

</template>

<script>
import publicHeader from '../../components/public_header'
export default {
  components: { publicHeader },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  position: fixed;
  width: 100%;
  height: 7%;
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
  overflow: auto;
}
img {
  width: 100%;
}
.remark {
  padding: 10px 15px;
  font-size: 13px;
  color: #ff644d;
}
</style>
