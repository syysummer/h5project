<template>
  <div class="contain">
    <!-- 遮罩 -->
    <div class="task_box" v-show="language_select" @click="language_select=false"></div>

    <div class="home_top clearFloat" style="position: relative;">
      <!-- 定位 -->
      <div class="home_location clearFloat">
        <div class="location_img">
          <router-link to="/select_address">
            <img src="../../assets/icons/location_img.png" />
          </router-link>
        </div>
        <div class="location_result">
          <router-link to="/select_address" class="single_hide">
            {{current_city}}
          </router-link>
        </div>
      </div>

      <!-- 语言选择 -->
      <div class="country_select single_hide" @click="language_select_btn">
        {{$t("language")}}
      </div>
      <div class="language_card" v-show="language_select">
        <p :class="item.class" class="clearFloat" v-for="(item, index) in language" :key='index' @click="chose_btn(index)">
          <span>{{item.language_name}}</span>
          <span class="select_img" :class="{ language_checked: item.is_checked }">
            <img src="../../assets/icons/select_img.png" />
          </span>
        </p>
        <div style="width:15px; height:15px; background:white; position: absolute; right:10px; top:-5px;transform:rotate(45deg);"></div>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="home_search_box">
      <div class="home_search" @click="search_seller">
        <div class="clearFloat" style="height:100%;">
          <div class="search_img">
            <img src="../../assets/icons/search.png" />
          </div>
          <div class="search_content">
            {{home_language.search_for_content}}
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- 引导下载 -->
      <div class="boot_download" style="padding-top: .2rem;" v-show="show_boot_download">
        <div class="boot_download_body clearFloat">
          <div class="boot_download_logo">
            <img src="../../assets/images/boot_download_logo.png" />
          </div>
          <div class="boot_download_content" @click="to_download">
            {{home_language.boot_download}}
          </div>
          <div class="boot_download_close_btn">
            <img src="../../assets/icons/close_app_download.png" @click='show_boot_download=false' />
          </div>
        </div>
      </div>

      <!-- 分类 -->
      <div class="shop_classical">
        <ul>
          <li class="click_classical" :classical="item.sellerLabelName" v-for="(item, index) in seller_label.data" :key="index" @click="to_label(item.sellerLabelPoint,item.sellerLabelName, item)">
            <div style="position: relative;">
              <img class="img click_classical" :classical="item.sellerLabelName" :src="baseUrl+item.sellerLabelPic">
              <!-- 敬请期待 -->
              <div v-if="item.sellerLabelName == '跑腿' || item.sellerLabelName == 'Errands'" style="width:100%; padding:0 0.4rem; position:absolute; bottom:0;">
                <img v-if="lang=='zh'" style="width:100%;" src="../../assets/images/coming_zh.png">
                <img v-if="lang=='en'" style="width:100%;" src="../../assets/images/coming_en.png">
              </div>
            </div>
            <div class="name click_classical" :classical="item.sellerLabelName">
              {{item.sellerLabelName}}
            </div>
          </li>
        </ul>
      </div>

      <!-- 优惠券（暂停使用） -->
      <!-- <div class="home_coupon_box" @click="goCoupon">
				<img src="../../assets/images/home_conpon_zh.gif" v-if="lang=='zh'" />
				<img src="../../assets/images/home_conpon_en.gif" v-if="lang=='en'" />
			</div> -->

      <!-- 活动专区（暂时停用） -->
      <!-- <div class="activity_area_box">
				<div class="public_title">
					<div class="public_title_line"></div>
					<div class="public_title_content">{{home_language.event_zone}}</div>
				</div>
				<div class="activity_area clearFloat">
					<div class="img_box" @click="to_list(1, activity_area_titles.foot_hot)">
						<img src="../../assets/images/foot_hot.png" v-if="lang=='zh'" />
						<img src="../../assets/images/foot_hot_en.png" v-if="lang=='en'" />
					</div>
					<div class="img_box" @click="to_list(2, activity_area_titles.brand_business)">
						<img src="../../assets/images/brand_business.png" v-if="lang=='zh'" />
						<img src="../../assets/images/brand_business_en.png" v-if="lang=='en'" />
					</div>
					<div class="img_box">
						<div class="activity_area_right_top" @click="to_list(3, activity_area_titles.new_store_special_benefit)">
							<img src="../../assets/images/new_store_special_benefit.png" v-if="lang=='zh'" />
							<img src="../../assets/images/new_store_special_benefit_en.png" v-if="lang=='en'" />
						</div>
						<div class="activity_area_right_bottom" @click="to_list(4, activity_area_titles.half_off_merchants)">
							<img src="../../assets/images/half_off_merchants.png" v-if="lang=='zh'" />
							<img src="../../assets/images/half_off_merchants_en.png" v-if="lang=='en'" />
						</div>
					</div>
				</div>
			</div> -->

      <!-- 附近热销 （暂停开发）-->
      <!-- <div class="nearby_hot_sale_box">
        <div class="public_title">
          <div class="public_title_line"></div>
          <div class="public_title_content">{{home_language.nearby_hot_sale}}</div>
        </div>
        <div class="nearby_hot_sale">

          <div class="nearby_hot_sale_body">
            <div>
              <img src="../../assets/images/classical/送药@2x.png" />
            </div>
            <div>
              85度C
            </div>
          </div>
          <div class="nearby_hot_sale_body">
            <div>
              <img src="../../assets/images/classical/送药@2x.png" />
            </div>
            <div>
              汉堡王
            </div>
          </div>
          <div class="nearby_hot_sale_body">
            <div>
              <img src="../../assets/images/classical/送药@2x.png" />
            </div>
            <div>
              我呀便当
            </div>
          </div>

        </div>
      </div> -->

      <!-- 附近商家 -->
      <div class="nearby_merchants_box">
        <div class="public_title">
          <div class="public_title_line"></div>
          <div class="public_title_content">{{home_language.nearby_merchants}}</div>
        </div>
        <div class="nearby_merchants">
          <publicSellerList :obj="obj"></publicSellerList>
        </div>
      </div>
    </div>
    <!-- 活动弹框(已下线) -->
    <!-- <activityPop></activityPop> -->
  </div>
</template>

<script>
import store from '../../store'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
import publicSellerList from './components/public_seller_list.vue'
import activityPop from '../../components/activityPop'
export default {
  //                            _ooOoo_
  //                           o8888888o
  //                           88" . "88
  //                           (| -_- |)
  //                            O\ = /O
  //                        ____/`---'\____
  //                      .   ' \\| |// `.
  //                       / \\||| : |||// \
  //                     / _||||| -:- |||||- \
  //                       | | \\\ - /// | |
  //                     | \_| ''\---/'' | |
  //                      \ .-\__ `-` ___/-. /
  //                   ___`. .' /--.--\ `. . __
  //                ."" '< `.___\_<|>_/___.' >'"".
  //               | | : `- \`.;`\ _ /`;.`/ - ` : | |
  //                 \ \ `-. \_ __\ /__ _/ .-` / /
  //         ======`-.____`-.___\_____/___.-`____.-'======
  //                            `=---='
  //
  //         .............................................
  //                  佛祖保佑             永无BUG

  name: 'home',
  data() {
    return {
      geocoder: null,
      language_select: false,
      language: [
        {
          status: 'en',
          language_name: 'English',
          is_checked: false,
          class: 'select_en'
        },
        {
          status: 'zh',
          language_name: '中文',
          is_checked: false,
          class: 'select_zh'
        }
      ],
      show_boot_download: true,
      lat: '',
      lng: '',
      current_city_address_name: '',
      lang: '',
      obj: {},
      address_timer: null
    }
  },
  components: {
    publicSellerList,
    activityPop
  },
  computed: {
    home_language() {
      let home_language = this.$t('home')
      return home_language
    },
    seller_label() {
      return store.state.seller_label
    },
    activity_area_titles() {
      return this.$t('activity_area_titles')
    },
    loading_gif() {
      return store.state.is_loading
    },
    current_city() {
      return store.state.current_city
    }
  },
  beforeCreate() {
    store.state.seller_list.currentPage = 0
    // 默认地图语言
    var script_box = document.getElementById('map_script')
    // 设置HTML文档语言
    var html_lang = document.querySelector('html')
    var language = getCookie('lang')
    var language_code = 'en-us'
    if (language.indexOf('en') > -1) {
      language_code = 'en-us'
      // 设置HTML文档语言
      html_lang.setAttribute('lang', 'en')
    } else if (language.indexOf('zh') > -1) {
      // 禁止中文地址
      language_code = 'en-us'
      // language_code = 'zh-cn'
      // 设置HTML文档语言
      html_lang.setAttribute('lang', 'zh')
    } else {
      // 设置HTML文档语言
      html_lang.setAttribute('lang', 'en')
      language_code = 'en-us'
    }
    script_box.setAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvAsx_SoeYJ5kIUBDaMpyj92B8bvGt4Zw&libraries=places&language=' +
        language_code
    )

    // if (store.state.from_seller == false) {
    //   sessionStorage.setItem('default_sort', '')
    //   sessionStorage.setItem('sortType', '')
    //   sessionStorage.setItem('activityType_msg', '')
    //   sessionStorage.setItem('deliveryScheme_msg', '')
    // }
  },
  created() {
    store.state.seller_list.currentPage = 0
    localStorage.setItem('promotionType', '')
    localStorage.setItem('catId', '')
    localStorage.setItem('label_title', '')
    this.current_language()
    let lang = getCookie('lang')
    this.lang = lang

    this.inde_seller_label()
  },
  mounted() {
    window.scroll(0, 0)

    if (
      localStorage.getItem('current_address_latlng') &&
      JSON.parse(localStorage.getItem('current_address_latlng')).name
    ) {
      store.state.current_city = JSON.parse(
        localStorage.getItem('current_address_latlng')
      ).name
    } else {
      if (this.lang == 'zh') {
        store.state.current_city = '定位中...'
      } else if (this.lang == 'en') {
        store.state.current_city = 'Position in...'
      }
    }

    if (
      localStorage.getItem('current_address_latlng') &&
      JSON.parse(localStorage.getItem('current_address_latlng')).name
    ) {
      // 定位页面当前位置
      sessionStorage.setItem(
        'current_city_address',
        JSON.parse(localStorage.getItem('current_address_latlng')).name
      )
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.errorPosition,
          {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 0
          }
        )
      } else {
        this.toast.error(this.$t('home.nonsupport'))
      }
    }

    this.isLogin()
  },
  methods: {
    isLogin() {
      store
        .dispatch('userInfoApi')
        .then(res => {
          if (res.data.code == 1) {
            store.state.is_login = res.data.code == 1 && true
            localStorage.setItem('hasLog', 1)
          } else if (res.data.code == 9999) {
            this.toast.error(res.data.message)
          }
        })
        .catch(err => {
          store.state.is_login = err.status == 401 && false
          localStorage.setItem('hasLog', 0)
        })
    },
    search_seller() {
      sessionStorage.setItem('default_sort', '')
      sessionStorage.setItem('sortType', '')
      sessionStorage.setItem('list_to_search', false)
      this.$router.push('/seller_search')
    },
    // 商家分类
    to_label(catId, title, item) {
      localStorage.setItem('label_title', title)
      // 29为跑腿
      catId =
        item.sellerLabelPoint == 1 || item.sellerLabelPoint == 29
          ? ''
          : localStorage.setItem('catId', catId)
      let allDay = ''
      let deliveryScheme = ''
      if (item.sellerLabelType == 3) {
        allDay = 1
      } else if (item.sellerLabelType == 1 && item.sellerLabelPoint == 1) {
        localStorage.setItem('catId', 1)
      } else if (item.sellerLabelType == 2) {
        deliveryScheme = 1
      }
      if (item.sellerLabelType == 5) {
        if (localStorage.getItem('hasLog') == 0) {
          this.$router.push({
            path: '/login',
            query: {
              from_path: 'living_payment'
            }
          })
        } else {
          this.$router.push({
            path: '/living_payment'
          })
        }
      } else if (
        item.sellerLabelName == '跑腿' ||
        item.sellerLabelName == 'Errands'
      ) {
        this.toast(this.$t('home.coming'))
      } else {
        this.$router.push({
          path: '/seller_list',
          query: {
            catId: catId,
            allDay: allDay
          }
        })
      }
    },
    // 活动专区
    to_list(type, title) {
      localStorage.setItem('label_title', title)
      localStorage.setItem('promotionType', type)
      this.$router.push({
        path: '/seller_list',
        query: {
          promotionType: type
        }
      })
    },
    errorPosition() {
      let self = this
      self.toast.error(self.$t('choose_address.locate_failure'))
      setCookie('current_city', self.$t('choose_address.locate_failure'))
      localStorage.setItem('current_address_latlng', '')
      store.state.current_city = self.$t('choose_address.locate_failure')
    },
    showPosition(position) {
      let select_address = localStorage.getItem('current_address_latlng')
      if (select_address && JSON.parse(select_address).name) {
        store.state.current_city = JSON.parse(select_address).name
      } else {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        this.obj = {
          lat: this.lat,
          lng: this.lng
        }
        // 定位当前位置
        this.getCity({
          lat: this.lat,
          lng: this.lng
        })
      }
    },
    getCity(location) {
      let self = this,
        locality = null,
        route = null,
        neighborhood = null,
        premise = null,
        sublocality = null,
        neighborhood_all = null
      try {
        self.geocoder = new google.maps.Geocoder()
      } catch (e) {
        store.state.is_loading = false
        if (self.lang == 'zh') {
          store.state.current_city = self.current_city = '定位失败'
        } else if (self.lang == 'en') {
          store.state.current_city = self.current_city = 'To locate failure'
        }
        return
      }
      self.geocoder.geocode(
        {
          location: location
        },
        function(results, status) {
          console.log(results)
          if (status == 'OK') {
            for (let i = 0; i < results[0].address_components.length; i++) {
              neighborhood_all = results[0].formatted_address
              let types = results[0].address_components[i].types
              if (types.indexOf('locality') != -1) {
                locality = results[0].address_components[i].long_name
                // 定位页面当前城市
                sessionStorage.setItem('current_city_name', locality)
              }
              if (types.indexOf('route') != -1) {
                route = results[0].address_components[i].long_name
              }
              if (types.indexOf('neighborhood') != -1) {
                neighborhood = results[0].address_components[i].long_name
              }
              if (types.indexOf('premise') != -1) {
                premise = results[0].address_components[i].long_name
              }
              if (types.indexOf('sublocality') != -1) {
                sublocality = results[0].address_components[i].long_name
              }
            }
            if (premise != null) {
              locality = premise
            } else if (neighborhood != null) {
              locality = neighborhood
            } else if (route != null) {
              locality = route
            } else if (sublocality != null) {
              locality = sublocality
            } else {
              locality = locality
            }

            let pos_obj = {
              lat: self.lat,
              lng: self.lng,
              name: neighborhood_all
            }

            localStorage.setItem(
              'current_address_latlng',
              JSON.stringify(pos_obj)
            )

            store.state.current_city = JSON.parse(
              localStorage.getItem('current_address_latlng')
            ).name

            self.current_city = JSON.parse(
              localStorage.getItem('current_address_latlng')
            ).name

            // 定位页面当前位置
            sessionStorage.setItem(
              'current_city_address',
              JSON.parse(localStorage.getItem('current_address_latlng')).name
            )
          } else {
            console.log('定位失败,请刷新重试')
            setCookie('current_city', self.$t('choose_address.locate_failure'))
            store.state.current_city = self.$t('choose_address.locate_failure')
          }
        }
      )
    },
    to_download() {
      location.href = `https://dev.loong.ph/app/index_page?language=${
        this.lang
      }`
    },
    current_language() {
      let item = this.language
      for (let i = 0; i < item.length; i++) {
        if (item[i].status == getCookie('lang')) {
          item[i].is_checked = true
        }
      }
    },
    // 选择语言
    chose_btn(index) {
      let item = this.language
      for (let i = 0; i < item.length; i++) {
        item[i].is_checked = false
      }
      item[index].is_checked = true
      setCookie('lang', this.language[index].status, 365)
      sessionStorage.setItem('default_sort', '')
      setCookie('current_city', '')
      localStorage.setItem('current_address_latlng', '')
      location.reload()
    },
    language_select_btn() {
      this.language_select = !this.language_select
    },
    // 获取商家分类
    inde_seller_label() {
      store
        .dispatch('inde_seller_label')
        .then(res => {
          if (res.data.code == 1) {
            let data = res.data
            Object.assign(store.state.seller_label, data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goCoupon() {
      if (localStorage.getItem('hasLog') == 0) {
        this.$router.push('/login')
      } else {
        this.$router.push('/home_coupon?source=platform')
      }
    }
  }
}
</script>

<style scoped>
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.home_top {
  width: 12rem;
  padding-top: 0.3rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  background: white;
}

.home_location {
  float: left;
  width: 7.6rem;
  height: 100%;
}

.home_location div {
  float: left;
  display: flex;
  align-items: center;
}

.location_img {
  width: 0.6rem;
  height: 100%;
}

.location_img img {
  width: 100%;
}

.location_result {
  width: 7rem;
  height: 100%;
  color: #666666;
  padding-left: 0.2rem;
}

.location_result a {
  color: #666666;
}

.country_select {
  float: right;
  max-width: 5.6rem;
  height: 100%;
  text-align: right;
  color: #666666;
  display: flex;
  align-items: center;
}

.language_card {
  width: 4.5rem;
  padding: 10px 0.4rem;
  background: white;
  border-radius: 5px;
  position: absolute;
  right: 0.4rem;
  top: 45px;
  z-index: 222;
  color: #666666;
}

.language_card p {
  width: 100%;
  border-bottom: 1px solid #ededed;
  padding-top: 5px;
  padding-bottom: 5px;
}

.select_img {
  display: none;
  float: right;
  width: 0.8rem;
}

.select_img img {
  width: 100%;
  height: 100%;
}

.language_checked {
  display: block;
}

.home_search_box {
  width: 100%;
  height: 45px;
  padding: 5px 0.4rem;
  background: white;
  clear: both;
}

.home_search {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #f5f5f5;
  padding-left: 0.4rem;
  display: flex;
  justify-content: center;
  color: #b2b2b2;
}

.search_img {
  float: left;
  width: 0.6rem;
  height: 100%;
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
}

.search_img img {
  width: 100%;
}

.search_content {
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}

.boot_download {
  width: 12rem;
  background: white;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.boot_download_body {
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  background: url('../../assets/images/down_load_bg.png');
  background-size: 100% 100%;
}

.boot_download_logo {
  float: left;
  width: 1rem;
  height: 1rem;
}

.boot_download_logo img {
  width: 100%;
  height: 100%;
  margin-right: 0.2rem;
}

.boot_download_content {
  float: left;
  width: 9rem;
  height: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
}

.boot_download_close_btn {
  float: right;
  width: 0.55rem;
  height: 1rem;
  display: flex;
  align-items: center;
}

.boot_download_close_btn img {
  width: 100%;
}

.shop_classical {
  width: 12rem;
  background: white;
}

.shop_classical ul {
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
}

.shop_classical li {
  flex: 20%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  list-style: none;
}

.shop_classical .img {
  width: 20vw;
  box-sizing: border-box;
  padding: 0 0.4rem;
}

.img img {
  display: inline-block;
  width: 100%;
  height: auto;
}

.name {
  font-size: 14px;
  margin-top: 10px;
}

.home_coupon_box {
  width: 12rem;
  background: white;
  margin-bottom: 10px;
}

.home_coupon_box img {
  width: 100%;
}

.public_title {
  width: 100%;
  height: 30px;
  background: white;
  position: relative;
}

.public_title_line {
  width: 54%;
  height: 2px;
  background: #665252;
  position: absolute;
  left: 23%;
  top: 50%;
  z-index: 11;
}

.public_title_content {
  width: 46%;
  height: 100%;
  background: white;
  position: absolute;
  left: 27%;
  top: 0;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #665252;
}

.activity_area_box,
.nearby_hot_sale_box,
.nearby_merchants_box {
  background: white;
}

.activity_area_box {
  margin-bottom: 10px;
}

.activity_area {
  padding: 0.2rem 0.4rem 0.4rem 0.4rem;
}

.nearby_hot_sale {
  border-bottom: 1px solid #ededed;
  padding: 0.2rem 0.2rem 0.4rem 0.2rem;
  display: flex;
  justify-content: space-around;
}

.nearby_hot_sale_body {
  width: 3.5rem;
}

.nearby_hot_sale_body div:first-child {
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nearby_hot_sale_body img {
  width: 60%;
  height: 60%;
}

.nearby_hot_sale_body div:last-child {
  text-align: center;
  margin-top: 5px;
  color: #665252;
}

.activity_area .img_box {
  float: left;
  width: 3.6rem;
  height: 17vh;
  margin-right: 0.2rem;
}

.activity_area .img_box:last-child {
  margin-right: 0;
}

.img_box {
  position: relative;
}

.img_box img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.img_box div {
  width: 100%;
  height: 48%;
}

.img_box div:last-child {
  position: absolute;
  bottom: 0;
}

@media screen and (max-width: 329px) {
  .boot_download_content {
    font-size: 12px;
    width: 8.5rem;
    height: 1.5rem;
  }

  .boot_download_logo {
    width: 1.5rem;
    height: 1.5rem;
  }

  .boot_download_close_btn {
    width: 0.8rem;
    height: 1.5rem;
  }

  .shop_classical li {
    flex: 19vw;
  }

  .shop_classical .img {
    width: 19vw;
  }
}
</style>
