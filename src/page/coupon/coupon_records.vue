<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader :title="get_coupon_title"></publicHeader>
		</div>
		<couponsDetails :couponsData=couponsData></couponsDetails>
	</div>
</template>
<script>
import publicHeader from '@/components/public_header.vue'
import couponsDetails from './components/coupons_record_plugin.vue'
import store from '@/store'
export default {
  data() {
    return {
      couponsData: [],
      isSmall: false
    }
  },
  components: {
    publicHeader,
    couponsDetails
  },
  computed: {
    get_coupon_title() {
      let title = this.$t('coupon.use_records')
      return title
    }
  },
  mounted() {
    this.isSmall = document.body.clientWidth < 329 && true
    this.selectUserCouponList(2)
  },
  methods: {
    selectUserCouponList(status) {
      this.isHover = status == 0 ? false : true
      store
        .dispatch('selectUserCouponList', {
          status: status
        })
        .then(res => {
          if (status == 0) {
            for (let [i, item] of res.data.data.entries()) {
              item.expire = 1
            }
          } else if (status == 2) {
            for (let [i, item] of res.data.data.entries()) {
              item.used = 1
            }
          }
          res.data.data.isSmall = this.isSmall
          this.couponsData = res.data.data
        })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
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
</style>
