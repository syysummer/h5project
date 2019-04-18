<template>
	<div class="public_body">
		<!-- <router-view style="overflow: scroll;" :class="{iphone5: isIphone5, iphone6: isIphone6, iphoneX: isIphoneX, iphoneP:isIphoneP}" class="seller_list_body" /> -->
		<router-view :class="{iphone5: isIphone5, iphone6: isIphone6, iphoneX: isIphoneX, iphoneP:isIphoneP}" class="seller_list_body" />
		<div class="footer_tab clearFloat">
			<div class="f_t_box">
				<router-link to="/home">
					<div>
						<span class="icon_box">
							<img v-if="this.$route.name!='home'" src="../assets/icons/home.png" />
							<img v-if="this.$route.name=='home'" src="../assets/icons/home_active.png" />
						</span>
					</div>
					<div :class="{ is_active: this.$route.name=='home' }">
						{{tab_bar_menu.home}}
					</div>
				</router-link>
			</div>
			<div class="f_t_box">
				<router-link to="/order">
					<div>
						<span class="icon_box">
							<img v-if="this.$route.name!='order'" src="../assets/icons/order.png" />
							<img v-if="this.$route.name=='order'" src="../assets/icons/order_active.png" />
						</span>
					</div>
					<div :class="{ is_active: this.$route.name=='order' }">
						{{tab_bar_menu.order}}
					</div>
				</router-link>
			</div>
			<div class="f_t_box">
				<router-link to="/user" class="jump_user">
					<div>
						<span class="icon_box">
							<img v-if="this.$route.name!='user'" src="../assets/icons/user.png" />
							<img v-if="this.$route.name=='user'" src="../assets/icons/user_active.png" />
						</span>
					</div>
					<div :class="{ is_active: this.$route.name=='user' }">
						{{tab_bar_menu.mine}}
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import store from '../store'
export default {
  name: 'public_model',
  data() {
    return {
      isIphone6: false,
      isIphoneX: false,
      isIphoneP: false,
      isIphone5: false
    }
  },
  created() {
    let ALL_HEIGHT = document.body.clientHeight
    let is_iOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (is_iOS) {
      if (ALL_HEIGHT > 630 && ALL_HEIGHT < 640) {
        this.isIphoneX = true
      } else if (ALL_HEIGHT > 545 && ALL_HEIGHT < 560) {
        this.isIphone6 = true
      } else if (ALL_HEIGHT > 610 && ALL_HEIGHT < 630) {
        this.isIphoneP = true
      } else if (ALL_HEIGHT > 450 && ALL_HEIGHT < 470) {
        this.isIphone5 = true
      }
    }
  },
  computed: {
    tab_bar_menu() {
      let tab_bar_menu = this.$t('tab_bar_menu')
      return tab_bar_menu
    },
    is_loading() {
      return store.state.is_loading
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/user') {
        document.getElementById('app').style.height = '100%'
        document.querySelector('.public_body').style.height = '100%'
      } else {
        document.getElementById('app').style.height = ''
        document.querySelector('.public_body').style.height = ''
        document.getElementsByTagName('body')[0].style.height = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.footer_tab {
  width: 100%;
  height: 8%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  border-top: 1px solid #dddddd;
  z-index: 99995;
}

.f_t_box {
  width: 4rem;
  height: 100%;
  float: left;
  font-size: 12px;
}

.f_t_box div {
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.f_t_box div:first-child {
  align-items: flex-end;
  height: 55%;
}

.f_t_box div:last-child {
  align-items: flex-start;
  height: 45%;
}

.icon_box {
  display: block;
  width: 20px;
  height: 20px;
}

.icon_box img {
  width: 100%;
  height: 100%;
}

a {
  color: black;
}

.is_active {
  color: red;
}

.public_body {
  height: 100%;
  // padding-bottom: 12%;
  padding-bottom: 15vh;
}

.seller_list_body {
  // height: 92%;
} // .iphoneX {
//   height: 77vh;
// }
// .iphone6 {
//   height: 81vh;
// }
// .iphoneP {
//   height: 82vh;
// }
// .iphone5 {
//   height: 78.7vh;
// }
// @media screen and (min-height: 630px) {
//     .seller_list_body {
//         height: 77vh;
//     }
// }
// @media screen and (max-height: 550px) {
//     .seller_list_body {
//         height: 92.2vh;
//     }
// }
</style>