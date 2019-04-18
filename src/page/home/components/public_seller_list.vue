<template>
	<div>
		<!-- <div class="seller_list_top_box clearFloat" :class="{seller_list_top_fixed: fixed_header}"> -->
		<div class="seller_list_top_box clearFloat">
			<div class="seller_list_top_list_box" @click="sort_btn">
				<div>
					{{default_sort}}
				</div>
				<div class="seller_list_sort_img">
					<img src="../../../assets/icons/bottom_arrow.png" />
				</div>
			</div>
			<div class="seller_list_top_list_box" @click="filter_btn">
				<div>{{filter.title}}</div>
				<div class="seller_list_filter_img">
					<img src="../../../assets/icons/seller_list_filter.png" />
				</div>
			</div>
		</div>

		<!-- 商家列表 -->
		<div class="seller_list_body">
			<!-- 遮罩 -->
			<div class="seller_list_task" v-if="to_select || to_filter"></div>
			<!-- 排序方式 -->
			<div class="sort_box" v-if="to_select">
				<div class="sort_list" @click="to_sort(index)" :class="{sort_list_active: item.is_active }" v-for="(item, index) in sortList" :key="index">
					{{item.lookupItemName}}
				</div>
			</div>
			<!-- 筛选 -->
			<div class="filter_box" v-if="to_filter">
				<div class="filter_title">
					{{filter.delivery_mode}}
				</div>
				<div class="filter_list_box clearFloat">
					<div @click="loong_distribution_mode(index)" class="filter_list" :class="{filter_active: item.is_active}" v-for="(item, index) in loong_deliveryScheme" :key="index" v-if="is_loong_delivery">
						{{item.deliveryScheme}}
					</div>
					<div @click="distribution_mode(index)" class="filter_list" :class="{filter_active: item.is_active}" v-for="(item, index) in deliveryScheme" :key="index" v-if="!is_loong_delivery">
						{{item.deliveryScheme}}
					</div>
				</div>
				<div class="filter_title">
					{{filter.discount_activity}}
				</div>
				<div class="filter_list_box clearFloat">
					<div @click="preferential_activities(index)" class="filter_list" :class="{filter_active: item.is_active}" v-for="(item, index) in activityType" :key="index">
						{{item.activityType}}
					</div>
				</div>
				<div class="filter_bottom_btn clearFloat">
					<div @click="clear_filter">
						{{filter.clear_filter}}
					</div>
					<div @click="filter_submit">
						{{filter.complete}}
					</div>
				</div>
			</div>

			<!-- 缺省页面 -->
			<div class="no_sellers_page" v-if="seller_list.length==0 && !loading">
				<div>
					<img src="../../../assets/images/null-shop.png" />
				</div>
				<div class="no_sellers_page_hint">
					{{seller_list_card.no_seller}}
				</div>
			</div>

			<!-- 列表 -->
			<div class="seller_list" v-for="(item, index) in seller_list" :key="index">
				<div class="seller_list_top clearFloat" @click="to_detail(item.id)">
					<div class="seller_header">
						<img :src="item.sellerLogoPath" @error="imgError(index)">
						<!-- <img v-lazy="baseUrl + item.sellerLogo"> -->
						<!-- 休息中 -->
						<div class="no_bus_task" v-if="item.busFlag == 2"></div>
						<div class="no_bus" v-if="item.busFlag == 2">
							{{seller_list_card.no_bus}}
						</div>
					</div>
					<div class="content">
						<div class="content_top single_hide">
							{{item.sellerName}}
						</div>
						<div class="content_start clearFloat">
							<span>
								<div class="rate_contain">
									<span class="rate_gray">
										<img src="../../../assets/icons/icon_star_gray.png" alt="">
									</span>
									<span class="rate_red" :style="{width:set_star(item.orderScore) + '%'}">
										<img src="../../../assets/icons/icon_star_red.png" alt="">
									</span>
								</div>
							</span>
							<span class="score_num">
								{{item.orderScore}}
							</span>
							<span>
								{{seller_list_card.sale}}：{{item.monthSel}}
							</span>
						</div>
						<div class="content_bottom clearFloat">
							<div>
								{{item.limitDeliveryCost || 0}}P {{seller_list_card.deliver}}
							</div>
							<div>
								<span>{{item.km}}</span>km
							</div>
						</div>
					</div>
				</div>
				<div class="seller_list_bottom clearFloat">
					<div class="content" style="position: relative">
						<!-- 开关 -->
						<div class="discount_num clearFloat" style="position: absolute; right: 0;">
							<div class="bottom_arrow" @click="open_dis_list(index)">
								<img src="../../../assets/icons/top_arrow.png" v-if="item.open_btn" />

								<img src="../../../assets/icons/bottom_arrow.png" v-if="(item.allSubDiscount && ((!item.open_btn && subDiscount_body_width*item.allSubDiscount.length>=subDiscount_box_width)
                || (!item.open_btn && item.goodsMinPresentPrice && item.sellerActivityList && subDiscount_box_width > subDiscount_body_width*item.allSubDiscount.length)
                || (!item.open_btn && item.goodsMinPresentPrice && item.firstFull && subDiscount_box_width > subDiscount_body_width*item.allSubDiscount.length)
                || (!item.open_btn && item.sellerActivityList && item.firstFull && subDiscount_box_width > subDiscount_body_width*item.allSubDiscount.length) 
                || (!item.open_btn && item.goodsMinPresentPrice && item.sellerActivityList && item.firstFull && subDiscount_box_width > subDiscount_body_width*item.allSubDiscount.length)))
                || !item.open_btn && item.goodsMinPresentPrice && item.sellerActivityList && item.firstFull" />

							</div>
						</div>
						<div class="clearFloat">
							<!-- 满减 -->
							<div v-if="item.allSubDiscount" class="full_subtraction clearFloat">
								<div>
									<img src="../../../assets/icons/discount.png" />
								</div>
								<div v-if="item.open_btn" class="subDiscount_box">
									<span class="subDiscount_body" v-for="(subDiscount, index) in item.allSubDiscount" v-if="lang=='zh'" :key="index">满{{subDiscount.limitcontent}}减{{subDiscount.discountAmount}}; </span>
									<span class="subDiscount_body" v-for="(subDiscount, index) in item.allSubDiscount" v-if="lang=='en'" :key="index">{{subDiscount.limitcontent}} minus {{subDiscount.discountAmount}}; </span>
								</div>
								<div v-if="!item.open_btn" class="single_hide subDiscount_box">
									<span class="subDiscount_body" v-for="(subDiscount, index) in item.allSubDiscount" v-if="lang=='zh'" :key="index">满{{subDiscount.limitcontent}}减{{subDiscount.discountAmount}}; </span>
									<span class="subDiscount_body" v-for="(subDiscount, index) in item.allSubDiscount" v-if="lang=='en'" :key="index">{{subDiscount.limitcontent}} minus {{subDiscount.discountAmount}}; </span>
								</div>
							</div>

							<!-- 特价商品 -->
							<div v-if="item.goodsMinPresentPrice" class="full_subtraction">
								<div>
									<img src="../../../assets/icons/full_subtraction.png" />
								</div>
								<div class="subDiscount_box">
									<span class="subDiscount_body" v-if="lang=='zh'" :key="index">特价商品{{item.goodsMinPresentPrice}}P起</span>
									<span class="subDiscount_body" v-if="lang=='en'" :key="index">Special commodity {{item.goodsMinPresentPrice}} fold up</span>
								</div>
							</div>

							<!-- 进店领优惠券 -->
							<div v-if="item.sellerActivityList && item.open_btn" class="full_subtraction">
								<div>
									<img src="../../../assets/icons/icon_coupon.png" />
								</div>
								<div class="subDiscount_box">
									<span class="subDiscount_body" v-if="lang=='zh'" :key="index">进店领{{item.sellerActivityList[0].discountAmount}}P优惠券</span>
									<span class="subDiscount_body" v-if="lang=='en'" :key="index">{{item.sellerActivityList[0].discountAmount}}P coupon in the shop</span>
								</div>
							</div>
							<div v-if="item.sellerActivityList && !item.open_btn && (!item.goodsMinPresentPrice || !item.allSubDiscount)" class="full_subtraction">
								<div>
									<img src="../../../assets/icons/icon_coupon.png" />
								</div>
								<div class="subDiscount_box">
									<span class="subDiscount_body" v-if="lang=='zh'" :key="index">进店领{{item.sellerActivityList[0].discountAmount}}P优惠券</span>
									<span class="subDiscount_body" v-if="lang=='en'" :key="index">{{item.sellerActivityList[0].discountAmount}}P coupon in the shop</span>
								</div>
							</div>

							<!-- 新人首单立减 -->
							<div v-if="item.firstFull && item.open_btn" class="full_subtraction">
								<div>
									<img src="../../../assets/icons/new_people.png" />
								</div>
								<div class="subDiscount_box">
									<span class="subDiscount_body" v-if="lang=='zh'" :key="index">新人首单立减{{item.firstFull.discountAmount}}P</span>
									<span class="subDiscount_body" v-if="lang=='en'" :key="index">Discount up to P{{item.firstFull.discountAmount}} for first order</span>
								</div>
							</div>
							<div v-if="item.firstFull && !item.open_btn && ((!item.allSubDiscount && !item.goodsMinPresentPrice && !item.sellerActivityList)
              || (item.allSubDiscount && !item.goodsMinPresentPrice && !item.sellerActivityList)
              || (!item.allSubDiscount && item.goodsMinPresentPrice && !item.sellerActivityList)
              || (!item.allSubDiscount && !item.goodsMinPresentPrice && item.sellerActivityList))" class="full_subtraction">
								<div>
									<img src="../../../assets/icons/new_people.png" />
								</div>
								<div class="subDiscount_box">
									<span class="subDiscount_body" v-if="lang=='zh'" :key="index">新人首单立减{{item.firstFull.discountAmount}}P</span>
									<span class="subDiscount_body" v-if="lang=='en'" :key="index">Discount up to P{{item.firstFull.discountAmount}} for first order</span>
								</div>
							</div>

						</div>
					</div>

					<!-- 搜索商品列表 -->
					<div class="content" v-if="item.goodList">
						<!-- 全部商品 -->
						<div class="search_shop_list_box" v-for="(good_list, index) in item.goodList" :key="index" v-if="item.show_all">
							<div class="search_shop_list_top clearFloat">
								<div>
									{{good_list.goodsName}}
								</div>
								<div v-show="good_list.isDiscount==1">
									{{good_list.presentPrice}}P
								</div>
								<div v-show="good_list.isDiscount==0">
									{{good_list.originalPrice}}P
								</div>
							</div>
							<div class="search_shop_list_bottom clearFloat">
								<div>
									{{seller_list_card.sales}}：{{good_list.sellNum}}
								</div>
								<div>
									{{seller_list_card.referrals}}：{{good_list.commentNum}}
								</div>
								<div class="old_price" v-show="good_list.isDiscount==1">
									{{good_list.originalPrice}}P
								</div>
							</div>
						</div>

						<!-- 第一条 -->
						<div class="search_shop_list_box" v-if="item.goodList && !item.show_all">
							<div class="search_shop_list_top clearFloat">
								<div>
									{{item.goodList[0].goodsName}}
								</div>
								<div v-show="item.goodList[0].isDiscount==1">
									{{item.goodList[0].presentPrice}}P
								</div>
								<div v-show="item.goodList[0].isDiscount==0">
									{{item.goodList[0].originalPrice}}P
								</div>
							</div>
							<div class="search_shop_list_bottom clearFloat">
								<div>
									{{seller_list_card.sales}}：{{item.goodList[0].sellNum}}
								</div>
								<div>
									{{seller_list_card.referrals}}：{{item.goodList[0].commentNum}}
								</div>
								<div class="old_price" v-show="item.goodList[0].isDiscount==1">
									{{item.goodList[0].originalPrice}}P
								</div>
							</div>
						</div>
						<!-- 第二条 -->
						<div class="search_shop_list_box" v-if="item.goodList && item.goodList[1] && !item.show_all">
							<div class="search_shop_list_top clearFloat">
								<div>
									{{item.goodList[1].goodsName}}
								</div>
								<div v-show="item.goodList[1].isDiscount==1">
									{{item.goodList[1].presentPrice}}P
								</div>
								<div v-show="item.goodList[1].isDiscount==0">
									{{item.goodList[1].originalPrice}}P
								</div>
							</div>
							<div class="search_shop_list_bottom clearFloat">
								<div>
									{{seller_list_card.sales}}：{{item.goodList[1].sellNum}}
								</div>
								<div>
									{{seller_list_card.referrals}}：{{item.goodList[1].commentNum}}
								</div>
								<div class="old_price" v-show="item.goodList[1].isDiscount==1">
									{{item.goodList[1].originalPrice}}P
								</div>
							</div>
						</div>

					</div>

					<div class="shop_list_open_btn" v-if="item.goodList && item.has_all && !item.show_all" @click="item.show_all = !item.show_all">
						<div>
							<img src="../../../assets/icons/open_all.png" />
						</div>
						<div>
							{{seller_list_card.open_all}}
						</div>
					</div>
					<div class="shop_list_open_btn" v-if="item.goodList && item.has_all && item.show_all" @click="item.show_all = !item.show_all">
						<div>
							<img src="../../../assets/icons/close_all.png" />
						</div>
						<div>
							{{seller_list_card.close}}
						</div>
					</div>

				</div>
			</div>

			<!-- 加载更多 -->
			<div class="load_more" v-if="loading">
				<img src="../../../assets/icons/is_loading.gif" />
			</div>

		</div>
	</div>
</template>

<script>
import store from '../../../store'
import { setCookie, getCookie, removeCookie } from '../../../utils/cookies.js'
export default {
  name: 'public_seller_list',
  data() {
    return {
      // 0、默认距离排序 1、销量最高 2、评分最高 3、起送价最低4、配送费最低5、综合排序
      sortList: [
        {
          lookupItemCode: '5',
          lookupItemName: this.$t('filter.comprehensive_sort'),
          is_active: false
        },
        {
          lookupItemCode: '0',
          lookupItemName: this.$t('filter.shortest_distance'),
          is_active: false
        },
        {
          lookupItemCode: '1',
          lookupItemName: this.$t('filter.highest_sales'),
          is_active: false
        },
        {
          lookupItemCode: '2',
          lookupItemName: this.$t('filter.highest_score'),
          is_active: false
        },
        {
          lookupItemCode: '3',
          lookupItemName: this.$t('filter.lowest_delivery_price'),
          is_active: false
        }
      ],
      default_sort: this.$t('filter.comprehensive_sort'),
      sortType: 5,
      deliveryScheme: [
        {
          deliverySchemeCode: 1,
          deliveryScheme: this.$t('seller_header.loong_delivery'),
          is_active: false
        },
        {
          deliverySchemeCode: 2,
          deliveryScheme: this.$t('seller_header.merchant_delivery'),
          is_active: false
        }
      ],
      loong_deliveryScheme: [
        {
          deliverySchemeCode: 1,
          deliveryScheme: this.$t('seller_header.loong_delivery'),
          is_active: false
        }
      ],
      activityType: [
        {
          activityTypeCode: 0,
          activityType: this.$t('seller_header.special_goods'),
          is_active: false
        },
        {
          activityTypeCode: 1,
          activityType: this.$t('seller_header.shop_coupons'),
          is_active: false
        },
        {
          activityTypeCode: 2,
          activityType: this.$t('seller_header.payment_subtraction'),
          is_active: false
        }
      ],
      deliveryScheme_msg: '',
      activityType_msg: '',
      to_select: false,
      to_filter: false,
      lat: 0,
      lng: 0,
      currentPage: 1,
      search_keyword: '',
      active_index: false,
      lang: '',
      current_address_latlng: {},
      is_loong_delivery: false,
      fixed_header: false,
      catId: '',
      promotionType: '',
      subDiscount_box_width: '',
      subDiscount_body_width: '',
      error_img: require('@/assets/images/mo.png')
    }
  },
  props: {
    obj: Object
  },
  updated() {
    if (document.querySelector('.subDiscount_box')) {
      this.subDiscount_box_width = document.querySelector(
        '.subDiscount_box'
      ).offsetWidth
      this.subDiscount_body_width = document.querySelector(
        '.subDiscount_body'
      ).offsetWidth
    }
  },
  watch: {
    obj: function(newVal, oldVal) {
      localStorage.setItem('current_address_latlng', JSON.stringify(newVal))
      this.current_address_latlng = localStorage.getItem(
        'current_address_latlng'
      )
      this.lat = JSON.parse(this.current_address_latlng).lat
      this.lng = JSON.parse(this.current_address_latlng).lng

      this.getCity({
        lat: this.lat,
        lng: this.lng
      })
    }
  },
  computed: {
    seller_list() {
      return store.state.seller_list.sellerList
    },
    current_seller_list() {
      return store.state.current_seller_list
    },
    is_loading() {
      return store.state.is_loading
    },
    loading() {
      return store.state.loading
    },
    filter() {
      let filter = this.$t('filter')
      return filter
    },
    seller_list_card() {
      let seller_list_card = this.$t('seller_list_card')
      return seller_list_card
    }
  },
  beforeCreate() {
    // sessionStorage.setItem('default_sort', '')
    // sessionStorage.setItem('sortType', '')
    // sessionStorage.setItem('activityType_msg', '')
    // sessionStorage.setItem('deliveryScheme_msg', '')
    store.state.seller_list.sellerList = []
    store.state.loading = false
  },
  beforeDestroy() {
    store.state.seller_list.currentPage = 0
  },
  created() {
    if (localStorage.getItem('promotionType')) {
      this.promotionType = localStorage.getItem('promotionType')
    }
    if (localStorage.getItem('catId')) {
      this.catId = localStorage.getItem('catId')
    }
    store.state.loading = true
    this.lang = getCookie('lang')
    // 判断是否在搜索页
    if (this.$route.name == 'seller_search') {
      this.search_keyword = localStorage.getItem('search_keyword')
    } else {
      this.search_keyword = ''
    }
    // 默认优惠活动
    if (sessionStorage.getItem('activityType_msg')) {
      this.activityType_msg = sessionStorage.getItem('activityType_msg')
      this.activityType[
        sessionStorage.getItem('activityType_msg')
      ].is_active = true
    }
    // 默认配送方式
    if (sessionStorage.getItem('deliveryScheme_msg')) {
      this.deliveryScheme_msg = sessionStorage.getItem('deliveryScheme_msg')
      this.deliveryScheme[
        sessionStorage.getItem('deliveryScheme_msg') - 1
      ].is_active = true
    }
    // 默认排序方式
    if (sessionStorage.getItem('default_sort')) {
      this.default_sort = sessionStorage.getItem('default_sort')
      this.sortType = sessionStorage.getItem('sortType')
      for (let i = 0; i < this.sortList.length; i++) {
        if (this.sortList[i].lookupItemName == this.default_sort) {
          this.sortList[i].is_active = true
        }
      }
    } else {
      sessionStorage.setItem('default_sort', this.sortList[0].lookupItemName)
      sessionStorage.setItem('sortType', this.sortList[0].lookupItemCode)
      this.default_sort = sessionStorage.getItem('default_sort')
      this.sortType = sessionStorage.getItem('sortType')
      this.sortList[0].is_active = true
    }

    this.current_address_latlng = localStorage.getItem('current_address_latlng')
    if (this.current_address_latlng) {
      this.lat = JSON.parse(this.current_address_latlng).lat
      this.lng = JSON.parse(this.current_address_latlng).lng
      if (
        localStorage.getItem('label_title') == '快鸟' ||
        localStorage.getItem('label_title') == 'Logistics'
      ) {
        this.is_loong_delivery = true
        this.loong_deliveryScheme[0].is_active = true
        this.deliveryScheme_msg = this.loong_deliveryScheme[0].deliverySchemeCode
      } else {
        this.is_loong_delivery = false
      }
      if (
        localStorage.getItem('current_address_latlng') &&
        JSON.parse(localStorage.getItem('current_address_latlng')).name
      ) {
        this.render_list()
      }
    }

    // sessionStorage.setItem('default_sort', '')
    // sessionStorage.setItem('sortType', '')
  },
  mounted() {
    if (
      localStorage.getItem('current_address_latlng') &&
      JSON.parse(localStorage.getItem('current_address_latlng')).name &&
      JSON.parse(localStorage.getItem('current_address_latlng')).lat &&
      store.state.current_city != '' &&
      store.state.current_city != '定位中...' &&
      store.state.current_city != 'Position in...' &&
      store.state.current_city != '定位失败' &&
      store.state.current_city != 'To locate failure'
    ) {
      this.lat = JSON.parse(this.current_address_latlng).lat
      this.lng = JSON.parse(this.current_address_latlng).lng
      // this.render_list()
    } else {
      this.getCity({
        lat: this.lat,
        lng: this.lng
      })
    }
    // 加载更多
    window.addEventListener('scroll', this.scrollList)
  },
  methods: {
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
          store.state.current_city = '定位失败'
        } else if (self.lang == 'en') {
          store.state.current_city = 'To locate failure'
        }
        return
      }
      self.geocoder.geocode(
        {
          location: location
        },
        function(results, status) {
          // console.log('获取定位信息:::', results, status)
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

            // 有定位才获取商家
            self.render_list()
          } else {
            // 定位失败
            setCookie('current_city', self.$t('choose_address.locate_failure'))
          }
        }
      )
    },
    set_star(rate) {
      // 一个星星width: 15% 空格距离是 6.5%
      let count = (rate * 15).toFixed(2)
      let space = rate.toString()[0] * 6.5
      // this.goods_star = Number(count) + space
      return Number(count) + space
      // this.post_star = Number(count) + space
    },
    imgError(index) {
      store.state.seller_list.sellerList[index].sellerLogo = this.error_img
    },
    to_detail(id) {
      localStorage.setItem('pathName', this.$route.name)
      this.$router.push({
        path: '/business_shop',
        query: {
          id: id,
          pathName: this.$route.name,
          title: this.$route.query.title
        }
      })
    },
    // 展开优惠券列表
    open_dis_list(index) {
      store.state.seller_list.sellerList[index].open_btn = !store.state
        .seller_list.sellerList[index].open_btn
    },
    // 滚动加载
    scrollList() {
      if (localStorage.getItem('catId')) {
        this.catId = localStorage.getItem('catId')
      }
      this.sortType = sessionStorage.getItem('sortType')
      this.deliveryScheme_msg = sessionStorage.getItem('deliveryScheme_msg')
      this.activityType_msg = sessionStorage.getItem('activityType_msg')

      if (localStorage.getItem('current_address_latlng')) {
        this.lat = JSON.parse(
          localStorage.getItem('current_address_latlng')
        ).lat

        this.lng = JSON.parse(
          localStorage.getItem('current_address_latlng')
        ).lng
      }
      store.state.loading_img = false

      if (store.state.is_loading) {
        return
      }

      if (
        store.state.seller_list.currentPage >= store.state.seller_list.totalPage
      ) {
        store.state.loading = false
        return
      } else {
        store.state.loading = true
      }

      var seller_list_top_box = document.documentElement.offsetHeight

      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight

      // 固定到头部
      if (this.$route.name == 'home') {
        if (
          clientHeight - scrollTop - seller_list_top_box <
          seller_list_top_box
        ) {
          this.fixed_header = true
        } else {
          this.fixed_header = false
        }
      } else {
        console.log('fixed')
      }

      let speed = 0
      if (this.$router.name == 'home') speed = -50
      if (this.$router.name == 'seller_list') speed = -250
      if (scrollTop + clientHeight - scrollHeight + 300 >= speed) {
        store.state.seller_list.currentPage++

        store
          .dispatch('seller_list_sort', {
            lat: this.lat,
            lon: this.lng,
            currentPage: store.state.seller_list.currentPage,
            showCount: 10,
            sortType: this.sortType,
            deliveryScheme: this.deliveryScheme_msg,
            activityType: this.activityType_msg,
            promotionType: this.promotionType,
            catId: this.catId,
            allDayOpen: this.$route.query.allDay
          })
          .then(res => {
            let data = res.data

            if (data.code == 1) {
              for (let i = 0; i < data.data.sellerList.length; i++) {
                if (
                  data.data.sellerList[i].goodList &&
                  data.data.sellerList[i].goodList.length > 2
                ) {
                  data.data.sellerList[i].has_all = true
                  data.data.sellerList[i].show_all = false
                } else {
                  data.data.sellerList[i].has_all = false
                  data.data.sellerList[i].show_all = true
                }
              }
              // 获取总页数
              store.state.seller_list.totalPage = data.data.totalPage

              for (let i = 0; i < data.data.sellerList.length; i++) {
                data.data.sellerList[i].open_btn = false
                data.data.sellerList[i].sellerLogoPath =
                  'https://img.hzxindakeji.com/' +
                  data.data.sellerList[i].sellerLogoPath.replace(
                    /https:\/\/img.hzxindakeji.com\//g,
                    ''
                  )
              }

              // 拼接列表数组
              store.state.seller_list.sellerList = store.state.seller_list.sellerList.concat(
                data.data.sellerList
              )

              store.state.loading_img = true
            }
          })
          .catch(err => {
            console.error('err:', err)
          })
      }
    },
    // 清除筛选
    clear_filter() {
      this.loong_deliveryScheme.forEach(item => {
        item.is_active = false
      })
      this.deliveryScheme.forEach(item => {
        item.is_active = false
      })
      this.activityType.forEach(item => {
        item.is_active = false
      })
      if (
        localStorage.getItem('label_title') == '快鸟' ||
        localStorage.getItem('label_title') == 'Logistics'
      ) {
        this.is_loong_delivery = true
        this.activityType_msg = ''
      } else {
        this.deliveryScheme_msg = ''
        this.activityType_msg = ''
      }
      sessionStorage.setItem('deliveryScheme_msg', '')
      sessionStorage.setItem('activityType_msg', '')
    },
    // 完成筛选
    filter_submit() {
      // 判断是否在搜索页
      if (this.$route.name == 'seller_search') {
        this.search_keyword = localStorage.getItem('search_keyword')
      } else {
        this.search_keyword = ''
      }

      this.to_filter = false
      store.state.seller_list.currentPage = 1

      if (
        localStorage.getItem('current_address_latlng') &&
        JSON.parse(localStorage.getItem('current_address_latlng')).name
      ) {
        this.render_list()
      }
    },
    // 选择配送方式
    loong_distribution_mode(index) {
      this.loong_deliveryScheme.forEach(item => {
        item.is_active = false
      })
      this.loong_deliveryScheme[index].is_active = true
      this.deliveryScheme_msg = this.loong_deliveryScheme[
        index
      ].deliverySchemeCode
    },
    distribution_mode(index) {
      this.deliveryScheme.forEach(item => {
        item.is_active = false
      })
      sessionStorage.setItem(
        'deliveryScheme_msg',
        this.deliveryScheme[index].deliverySchemeCode
      )
      this.deliveryScheme_msg = sessionStorage.getItem('deliveryScheme_msg')
      this.deliveryScheme[index].is_active = true
    },
    // 选择优惠活动
    preferential_activities(index) {
      this.activityType.forEach(item => {
        item.is_active = false
      })
      sessionStorage.setItem(
        'activityType_msg',
        this.activityType[index].activityTypeCode
      )
      this.activityType_msg = sessionStorage.getItem('activityType_msg')
      this.activityType[index].is_active = true
    },
    // 选择排序方式
    to_sort(index) {
      // 判断是否在搜索页
      if (this.$route.name == 'seller_search') {
        this.search_keyword = localStorage.getItem('search_keyword')
      } else {
        this.search_keyword = ''
      }

      this.sortList.forEach(item => {
        item.is_active = false
      })
      this.sortList[index].is_active = true

      sessionStorage.setItem(
        'default_sort',
        this.sortList[index].lookupItemName
      )
      sessionStorage.setItem('sortType', this.sortList[index].lookupItemCode)
      this.default_sort = sessionStorage.getItem('default_sort')
      this.sortType = sessionStorage.getItem('sortType')

      this.to_select = false
      store.state.seller_list.currentPage = 1

      if (
        localStorage.getItem('current_address_latlng') &&
        JSON.parse(localStorage.getItem('current_address_latlng')).name
      ) {
        this.render_list()
      }
    },
    sort_btn() {
      this.to_filter = false
      this.to_select = !this.to_select
    },
    filter_btn() {
      this.to_select = false
      this.to_filter = !this.to_filter
    },
    // 获取附近商家列表
    render_list() {
      store.state.loading_img = false
      store
        .dispatch('seller_list_sort', {
          lat: this.lat,
          lon: this.lng,
          currentPage: store.state.seller_list.currentPage,
          showCount: 10,
          sortType: this.sortType,
          deliveryScheme: this.deliveryScheme_msg,
          activityType: this.activityType_msg,
          promotionType: this.promotionType,
          catId: this.catId,
          keyWord: this.search_keyword,
          allDayOpen: this.$route.query.allDay
        })
        .then(res => {
          if (res.data.code == 1) {
            let data = res.data

            for (let i = 0; i < data.data.sellerList.length; i++) {
              if (
                data.data.sellerList[i].goodList &&
                data.data.sellerList[i].goodList.length > 2
              ) {
                data.data.sellerList[i].has_all = true
                data.data.sellerList[i].show_all = false
              } else {
                data.data.sellerList[i].has_all = false
                data.data.sellerList[i].show_all = true
              }
            }

            store.state.loading = false

            for (let i = 0; i < data.data.sellerList.length; i++) {
              data.data.sellerList[i].open_btn = false
              data.data.sellerList[i].sellerLogoPath =
                'https://img.hzxindakeji.com/' +
                data.data.sellerList[i].sellerLogoPath.replace(
                  /https:\/\/img.hzxindakeji.com\//g,
                  ''
                )
            }

            Object.assign(store.state.seller_list, data.data)
            store.state.loading_img = true
          } else {
            store.state.loading_img = true
          }
        })
        .catch(err => {
          console.error('err:', err)
          store.state.loading_img = true
        })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.no_sellers_page {
  width: 100%;
  position: relative;
  div {
    max-width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 50%;
      height: 50%;
      margin-bottom: 10px;
    }
  }
}

.seller_list_body {
  position: relative;
}

.seller_list_task {
  width: 100%;
  height: 100%;
  min-height: 350px;
  position: absolute;
  z-index: 333;
  background: black;
  opacity: 0.3;
}

.sort_box {
  width: 100%;
  background: white;
  position: absolute;
  z-index: 334;
}

.sort_list {
  width: 100%;
  padding: 0.4rem;
  border-bottom: 1px solid #ededed;
  color: #666666;
}

.sort_list_active {
  background: #f1f1f1;
  color: #ff644d;
}

.filter_box {
  width: 100%;
  background: white;
  position: absolute;
  z-index: 334;
}

.filter_title {
  width: 100%;
  padding: 0.4rem;
  color: #999999;
}

.filter_list_box {
  padding-left: 0.4rem;
  padding-right: 0.2rem;
}

.filter_list {
  float: left;
  width: 3.6rem;
  text-align: center;
  margin-right: 0.2rem;
  margin-bottom: 0.4rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border: 1px solid #ededed;
  border-radius: 5px;
  color: #666666;
  font-size: 14px;
}

.filter_active {
  background: #fee3df;
  border-color: #ff644d;
  color: #ff644d;
}

.filter_bottom_btn {
  width: 100%;
  text-align: center;
  margin-top: 15px;
}

.filter_bottom_btn div {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}

.filter_bottom_btn div:first-child {
  border-top: 1px solid #ededed;
}

.filter_bottom_btn div:last-child {
  background: #ff644d;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  color: white;
  border-top: 1px solid #ff644d;
}

.filter_bottom_btn div {
  width: 50%;
  float: left;
}

.seller_list_top_box {
  padding: 10px 0.4rem;
  background: white;
  border-bottom: 1px solid #ededed;
  display: flex;
  width: 100%;
}

.seller_list_top_fixed {
  position: fixed;
  top: 14%;
  left: 0;
  z-index: 112;
}

.seller_list_top_list_box {
  width: 60%;
  float: left;
  display: flex;
  color: #666666;
}

.seller_list_top_list_box:last-child {
  width: 40%;
  justify-content: flex-end;
}

.seller_list_top_list_box div {
  float: left;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.seller_list_top_list_box .seller_list_sort_img {
  width: 12px;
  margin-left: 5px;
  align-items: flex-end;
}

.seller_list_sort_img img {
  width: 100%;
}

.seller_list_filter_img {
  width: 12px;
  margin-left: 5px;
}

.seller_list_filter_img img {
  width: 100%;
}

.seller_list {
  width: 100%;
  border-bottom: 1px solid #ededed;
  padding: 0.2rem 0.4rem;
  background: white;
}

.seller_header {
  width: 3rem;
  height: 2.4rem;
  background: gainsboro;
  float: left;
  position: relative;
  background: url('../../../assets/images/mo.png');
  background-size: 100% 100%;
}

.seller_header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no_bus_task {
  width: 100%;
  height: 100%;
  background: #bebebe;
  opacity: 0.3;
  position: absolute;
  top: 0;
}

.no_bus {
  background: #bebebe;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: white;
  padding-top: 2px;
  padding-bottom: 2px;
  z-index: 1;
}

.seller_list_top .content {
  width: 7.8rem;
  height: 2.4rem;
  float: right;
}

.seller_list_bottom .content {
  border-top: 1px dotted #ededed;
  width: 7.8rem;
  float: right;
  padding-top: 0.2rem;
  margin-top: 0.2rem;
}

.content_top {
  height: 0.8rem;
}

.content_start span {
  display: block;
  float: left;
  height: 0.5rem;
  font-size: 12px;
  color: #666666;
  display: flex;
  align-items: center;
}

.content_start .score_num {
  border-right: 1px solid #999999;
  margin-right: 5px;
  padding-right: 5px;
  padding-left: 5px;
}

.content_bottom {
  display: flex;
  align-items: flex-end;
  position: relative;
}

.content_bottom div {
  height: 0.8rem;
  float: left;
  font-size: 12px;
  color: #666666;
  display: flex;
  align-items: flex-end;
}

.content_bottom div:last-child {
  float: right;
  position: absolute;
  right: 0;
}

.content_bottom span {
  font-weight: bold;
  margin-right: 2px;
}

.content_bottom .content_border {
  width: 2px;
  height: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background: #666666;
}

.full_subtraction {
  float: left;
  width: 80%;
  color: #999999;
  margin-bottom: 3px;
}

.discount_num {
  float: right;
  font-size: 12px;
  color: #999999;
}

.full_subtraction div {
  float: left;
  font-size: 12px;
}

.full_subtraction div:first-child {
  width: 8%;
  margin-right: 2%;
}

.full_subtraction div:last-child {
  width: 90%;
}

.full_subtraction div:last-child span {
  width: 90%;
  font-size: 12px;
}

.content img {
  width: 100%;
}

.bottom_arrow {
  float: right;
  width: 13px;
  margin-left: 2px;
}

.bottom_arrow img {
  width: 100%;
}

.search_shop_list_box {
  border-top: 1px dotted #ededed;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.search_shop_list_box:first-child {
  border-top: 0;
  padding-top: 0;
}

.search_shop_list_top {
  margin-bottom: 5px;
}

.search_shop_list_top div {
  float: right;
  color: #ff644c;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search_shop_list_top div:first-child {
  float: left;
  width: 80%;
  color: #666666;
  font-size: 14px;
}

.search_shop_list_bottom {
  height: 13px;
}

.search_shop_list_bottom div {
  float: left;
  font-size: 12px;
  color: #999999;
  height: 100%;
  line-height: 13px;
}

.search_shop_list_bottom div:first-child {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid #999999;
}

.search_shop_list_bottom .old_price {
  float: right;
  text-decoration: line-through;
}

.shop_list_open_btn {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  clear: both;
  border-top: 1px dotted #ededed;
  margin-top: 0.4rem;
}

.shop_list_open_btn div {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666666;
}

.shop_list_open_btn div:first-child {
  width: 15px;
  margin-right: 0.2rem;
}

.shop_list_open_btn img {
  width: 100%;
}

.rate_contain {
  vertical-align: middle;
  display: inline-block;
  position: relative;
  width: 3rem;
  .rate_gray {
    display: inline-block;
    width: 100%;
    img {
      width: 3rem;
    }
  }
  .rate_red {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    overflow: hidden;
    img {
      width: 3rem;
    }
  }
}

@media screen and (max-width: 329px) {
  .content_bottom span {
    font-size: 12px;
  }

  .seller_header {
    width: 2.4rem;
  }

  .seller_list_top .content {
    width: 8.4rem;
  }

  .seller_list_bottom .content {
    width: 8.4rem;
  }
}
</style>
