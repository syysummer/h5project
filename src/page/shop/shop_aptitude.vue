<template>
	<div class="src contain">
		<div class="loading_gif" v-if="shop_loading">
			<img style="width: 100%;" src="../../assets/images/loding_img_no_floor.gif" />
			<p>{{this.$t('toast.loading')}}</p>
		</div>
		<div class="shop_aptitude">
			<p>{{shop_seller.business_qualification}}</p>
			<ul class="flex j-between">
				<li class="flex">
					<i><img v-lazy="getAptitude.industryQualificationPicPath" class="blur" /></i>
				</li>
				<li class="flex">
					<i><img v-lazy="getAptitude.subjectQualificationPicPath" class="blur" /></i>
				</li>
				<li class="flex" v-show="getAptitude.businessPermitsPicPath">
					<i><img v-lazy="getAptitude.businessPermitsPicPath" class="blur" /></i>
				</li>
			</ul>
		</div>
		<div class="shop_img">
			<p>{{shop_seller.store_pictures}}</p>
			<ol class="flex j-start a-center">
				<li v-for="(item,index) in arrList" :key="index">
					<yd-lightbox>
						<!-- <yd-lightbox-img :src="item"></yd-lightbox-img> -->
						<yd-lightbox-img v-lazy="item"></yd-lightbox-img>
					</yd-lightbox>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import {
  LightBox,
  LightBoxImg,
  LightBoxTxt
} from 'vue-ydui/dist/lib.rem/lightbox'
Vue.component(LightBox.name, LightBox)
Vue.component(LightBoxImg.name, LightBoxImg)
Vue.component(LightBoxTxt.name, LightBoxTxt)
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
export default {
  name: 'business_shop',
  data() {
    return {
      id: '',
      logoImg: 'this.src="' + require('../../assets/images/mo.png') + '"',
      getAptitude: {},
      arrList: []
    }
  },
  components: {},
  computed: {
    shop_seller() {
      let shop_seller = this.$t('seller')
      return shop_seller
    },
    shop_loading() {
      return store.state.shop_loading
    }
    // arrList() {
    //   let str = store.state.shop_aptitude.data.sellerPicturePath;
    //   return str.split(",");
    // },
    // getAptitude() {
    //   return store.state.shop_aptitude;
    // }
  },
  created() {
    let elem = document.getElementsByTagName('body')[0]
    elem.addEventListener('click', function(e) {
      var target = e.target
      if (target.nodeName.toLowerCase() == 'img') {
        if (target.parentNode.className == 'yd-slider-item') {
          if (
            target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode
          ) {
            target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML =
              ''
            return
          }
        }
      } else if (
        target.nodeName.toLowerCase() == 'div' &&
        target.className == 'yd-lightbox-img'
      ) {
        if (target.parentNode.parentNode) {
          target.parentNode.parentNode.innerHTML = ''
          return
        }
      }
    })
  },
  mounted() {
    this.id = localStorage.getItem('id')
    this.get_shop_aptitude()
  },
  methods: {
    get_shop_aptitude() {
      store
        .dispatch('shop_aptitude', {
          sellerId: this.id
        })
        .then(res => {
          let data = res.data
          Object.assign(store.state.shop_aptitude, data)
          this.getAptitude = res.data.data
          let str = res.data.data.sellerPicturePath
          this.arrList = str.split(',')
        })
        .catch(err => {})
    }
  }
}
</script>

<style scoped>
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.scr {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.loading_gif {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
  background: white;
  padding-top: 20%;
}

.loading_gif img {
  width: 20% !important;
  position: relative;
  left: 40%;
  margin-bottom: 10px;
}

.loading_gif p {
  text-align: center;
}
.shop_aptitude {
  width: 100%;
  padding: 0 0.4rem;
}

.shop_aptitude > p {
  font-size: 0.5rem;
  padding: 0.4rem 0.1rem 0.6rem;
}

.shop_aptitude > ul {
  flex-flow: row wrap;
}

.shop_aptitude > ul > li {
  width: 5.4rem;
  height: 3.5rem;
  margin-bottom: 0.2rem;
  position: relative;
  overflow: hidden;
}
.shop_aptitude > ul > li > i {
  width: 5.4rem;
  height: 3.5rem;
}

.shop_aptitude > ul > li > i > img {
  width: 100%;
  height: 100%;
}
.shop_img {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 10px;
}

.blur {
  -webkit-filter: blur(1.8px); /* Chrome, Opera */
  -moz-filter: blur(1.8px);
  -ms-filter: blur(1.8px);
  filter: blur(1.8px);
}

.shop_img {
  width: 100%;
}

.shop_img::-webkit-scrollbar {
  display: none;
}

.shop_img > p {
  font-size: 0.5rem;
  padding: 0.4rem 0.1rem 0.6rem;
}

.shop_img > ol {
  flex-flow: row wrap;
}

.shop_img > ol > li {
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 0.22rem;
  margin-bottom: 0.22rem;
}

.shop_img > ol > li > div {
  width: 100%;
  height: 100%;
}

.shop_img > ol > li > div > img {
  width: 100%;
  height: 100%;
}
.yd-lightbox-head > a {
  color: white;
}
</style>