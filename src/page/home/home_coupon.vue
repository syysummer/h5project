<template>
	<div class="contain">
		<div class="header_contain">
			<publicHeader :title="get_lang_txt.platform_coupons"></publicHeader>
		</div>
		<couponsDetails v-on:upDate='getPlatformActivity' :couponData="couponData"></couponsDetails>
	</div>
</template>

<script>
import publicHeader from '@/components/public_header.vue'
import couponsDetails from '@/page/home/components/coupons_details.vue'
import store from '@/store'
import Vue from 'vue'
export default {
  data() {
    return {
      couponData: '',
      isSmall: false
    }
  },
  created() {
    this.couponData = []
    this.source = this.$route.query.source
  },
  components: {
    publicHeader,
    couponsDetails
  },
  computed: {
    get_lang_txt() {
      let txt = this.$t('coupon')
      return txt
    }
  },
  methods: {
    getPlatformActivity() {
      store.dispatch('getPlatformActivity', {}).then(res => {
        res.data.data.isSmall = this.isSmall
        this.couponData = res.data.data
      })
    }
  },
  mounted() {
    this.getPlatformActivity()
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.contain {
  height: 100%;
}
.header_contain {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 1;
}
</style>
