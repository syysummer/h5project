<template>
	<div class="contain">
		<div class="shop_head flex">
			<i class="flex a-center j-center" @click="linkGo('back')"><img src="../../assets/icons/icon_arrows_left@2x.png" /></i>
			<p>{{shop_index.mc}}</p>
			<i></i>
		</div>
		<div class="shop_main">
			<couponsDetails v-on:upDate='getSellerActivity' :couponsData=getSellerActivity_data></couponsDetails>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
import couponsDetails from './components/coupons_details.vue'
export default {
  name: 'business_shop',
  data() {
    return {
      id: '',
      logoImg: 'this.src="' + require('../../assets/images/mo.png') + '"',
      getSellerActivity_data: [],
      name: '',
      isSmall: false
    }
  },
  components: {
    couponsDetails
  },
  computed: {
    shop_index() {
      let shop_index = this.$t('shop_index')
      return shop_index
    },
    arrList() {
      let str = store.state.shop_aptitude.data.sellerPicturePath
      return str.split(',')
    },
    getSellerActivity_data1() {
      return store.state.getSellerActivity.data
    }
  },
  created() {},
  mounted() {
    window.scroll(0, 0)
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.isSmall = document.body.clientWidth < 329 && true
    this.getSellerActivity()
  },
  methods: {
    linkGo(url) {
      if (url == 'back') {
        this.$router.go(-1)
      }
    },
    getSellerActivity() {
      store
        .dispatch('get_SellerActivity', {
          sellerId: this.id
        })
        .then(res => {
          let data = res.data.data
          data.forEach(element => {
            element.text = this.shop_index.mc
            element.name =
              this.shop_index.Only + ' ' + this.name + ' ' + this.shop_index.Use
          })
          this.getSellerActivity_data = data
          this.getSellerActivity_data.isSmall = this.isSmall
          Object.assign(store.state.getSellerActivity, data)
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
.shop_head {
  width: 100%;
  height: 1.8rem;
  background: white;
}
.shop_head > i {
  width: 1.8rem;
  height: 1.8rem;
}
.shop_head > i > img {
  width: 0.5rem;
  height: 0.7rem;
}
.shop_head > p {
  flex: 1;
  text-align: center;
  line-height: 1.8rem;
  font-size: 0.6rem;
  color: #606060;
}
.shop_main {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.shop_main::-webkit-scrollbar {
  display: none;
}
</style>