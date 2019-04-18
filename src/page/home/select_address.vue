<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader :title='choose_address.select_delivery_address' @rightBtnFn="to_add_address"></publicHeader>
		</div>

		<div class="select_address_body">
			<div style="background: #F5F5F5">
				<div class="select_address_box clearFloat">
					<div class="city_list">
						{{current_city_name}}
					</div>
					<div class="input_box">
						<div>
							<input type="text" id="add_search" :placeholder="choose_address.address" v-model="select_address_msg" @keyup="initAutocomplete()">
						</div>
					</div>
				</div>

				<!-- 搜索地址列表 -->
				<div class="autoCompleteList" v-show="select_address_msg!=''">
					<div class="address_list my_addresss" v-for="(item, index) in autocomplete_list" :key="index" @click="select_search_address(index)">
						<div class="address_name">
							{{item.name}}
						</div>
						<div class="formatted_address">
							{{item.formatted_address}}
						</div>
					</div>
				</div>

				<div class="show_current_address">
					{{current_city}}
				</div>

				<!-- 重新定位 -->
				<div class="re_position">
					<div class="re_position_box clearFloat">
						<div class="re_position_img">
							<img src="../../assets/icons/re_position.png" />
						</div>
						<div class="re_position_content" @click="re_position_fn">
							{{choose_address.repositioning}}
						</div>
					</div>
				</div>

				<div class="my_address" v-if="show_my_address_list">

					<div class="my_address_box clearFloat">
						<div class="title_img">
							<img src="../../assets/icons/my_address.png" />
						</div>
						<div class="title_content">
							{{choose_address.receiving_address}}
						</div>
					</div>

					<!-- 收货地址 -->
					<div class="my_address_list">
						<div class="address_list my_addresss" v-show="no_more" v-for="(item, index) in my_address_list" :key="index" @click="select_my_address(index)">
							<div class="address">
								{{item.address}} {{item.houseNumber}}
							</div>
							<div class="user_info clearFloat">
								<div>
									{{item.name}}
								</div>
								<div>
									{{item.phone}}
								</div>
							</div>
						</div>

						<div v-show="open_card">
							<div class="address_list my_addresss" @click="select_my_address(0)" v-if="my_address_first">
								<div class="address">
									{{my_address_first.address}} {{my_address_first.houseNumber}}
								</div>
								<div class="user_info clearFloat">
									<div>
										{{my_address_first.name}}
									</div>
									<div>
										{{my_address_first.phone}}
									</div>
								</div>
							</div>
							<div class="address_list my_addresss" @click="select_my_address(1)" v-if="my_address_second">
								<div class="address">
									{{my_address_second.address}} {{my_address_second.houseNumber}}
								</div>
								<div class="user_info clearFloat">
									<div>
										{{my_address_second.name}}
									</div>
									<div>
										{{my_address_second.phone}}
									</div>
								</div>
							</div>
							<div class="address_list my_addresss" @click="select_my_address(2)" v-if="my_address_three">
								<div class="address">
									{{my_address_three.address}} {{my_address_three.houseNumber}}
								</div>
								<div class="user_info clearFloat">
									<div>
										{{my_address_three.name}}
									</div>
									<div>
										{{my_address_three.phone}}
									</div>
								</div>
							</div>
						</div>

						<div class="address_list my_addresss" v-show="close_card" v-for="(item, index) in my_address_list" :key="item.id" @click="select_my_address(index)">
							<div class="address">
								{{item.address}} {{item.houseNumber}}
							</div>
							<div class="user_info clearFloat">
								<div>
									{{item.name}}
								</div>
								<div>
									{{item.phone}}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<!-- 展开全部 -->
			<div class="open_all clearFloat">
				<div>
					<span @click='open_all_fn' v-show="open_card">{{choose_address.expand}}</span>
					<span @click='close_all_fn' v-show="close_card">{{choose_address.close}}</span>
				</div>
				<div>
					<img src="../../assets/icons/open_all.png" v-show="open_card" @click='open_all_fn' />
					<img src="../../assets/icons/close_all.png" v-show="close_card" @click='close_all_fn' />
				</div>
			</div>

			<!-- 附近地址 -->
			<div class="near_address">
				<div class="near_address_box clearFloat">
					<div class="title_img">
						<img src="../../assets/icons/near_address.png" />
					</div>
					<div class="title_content">
						{{choose_address.nearby_address}}
					</div>
				</div>

				<div class="near_address_list">
					<div class="address_list" v-for="(item, index) in near_address_list" :key="index" @click="select_near_address(index)">
						{{item.name}}
					</div>
				</div>
			</div>

			<div id="map">
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
export default {
  name: 'select_address',
  data() {
    return {
      radius: 500, //查询半径 以当前地点为圆心
      country: {
        country: ['PHL', 'CN']
      }, //查询范围 国家给单位
      locPos: {
        lat: 0,
        lng: 0
      },
      current_city: '',
      select_address_msg: '',
      autocomplete: '',
      open_card: false,
      close_card: false,
      open_height: '',
      close_height: '',
      current_city_name: '',
      my_address_list: [],
      my_address_first: {},
      my_address_second: {},
      my_address_three: {},
      no_more: false,
      autocomplete_list: [],
      near_address_list: [],
      show_my_address_list: false,
      lang: ''
    }
  },
  components: {
    publicHeader
  },
  computed: {
    choose_address() {
      let choose_address = this.$t('choose_address')
      return choose_address
    },
    get_en() {
      return this.$t('user')
    }
  },
  watch: {
    select_address_msg: function() {
      this.initAutocomplete()
    }
  },
  created() {
    let lang = getCookie('lang')
    this.lang = lang
  },
  mounted() {
    // 获取我的收货地址
    this.my_address_list_fn()
    if (
      sessionStorage.getItem('current_city_name') &&
      sessionStorage.getItem('current_city_name') != ''
    ) {
      this.current_city_name = sessionStorage.getItem('current_city_name')
    } else {
      if (this.lang == 'zh') {
        this.current_city_name = '定位中...'
      } else if (this.lang == 'en') {
        this.current_city_name = 'Position in...'
      }
    }

    if (
      localStorage.getItem('current_address_latlng') &&
      localStorage.getItem('current_address_latlng') != null
    ) {
      // 设置搜索圆心
      this.locPos.lat = parseFloat(
        JSON.parse(localStorage.getItem('current_address_latlng')).lat
      )
      this.locPos.lng = parseFloat(
        JSON.parse(localStorage.getItem('current_address_latlng')).lng
      )
      // 设置当前位置
      this.current_city = sessionStorage.getItem('current_city_address')
      // 获取附近地址
      this.near_address_fn()
    } else {
      // 暂时无法搜索
      console.log('select_address::暂无定位信息，请重新定位')
      // this.toast.error(this.choose_address.no_location)
    }
  },
  methods: {
    // 重新定位
    re_position_fn() {
      store.state.current_city != ''
      localStorage.setItem('current_address_latlng', '')
      sessionStorage.setItem('current_city_name', '')
      sessionStorage.setItem('current_city_address', '')
      this.$router.push('/home')
    },
    // 选择我的收货地址
    select_my_address(index) {
      let my_address_obj = {
        lat: this.my_address_list[index].lat,
        lng: this.my_address_list[index].lon,
        name: this.my_address_list[index].address
      }
      localStorage.setItem(
        'current_address_latlng',
        JSON.stringify(my_address_obj)
      )
      this.$router.push('/home')
    },
    // 获取我的收货地址
    my_address_list_fn() {
      store
        .dispatch('getReceivingAddress')
        .then(res => {
          if (res.data.code == 1) {
            this.my_address_list = res.data.data
            this.my_address_first = res.data.data[0]
            this.my_address_second = res.data.data[1]
            this.my_address_three = res.data.data[2]

            if (this.my_address_list.length > 0) {
              this.show_my_address_list = true
            } else {
              this.show_my_address_list = false
            }

            if (this.my_address_list.length <= 3) {
              this.no_more = true
            } else if (this.my_address_list.length > 3) {
              this.open_card = true
            }
          }
        })
        .catch(err => {
          console.warn(err)
        })
    },
    // 新增收货地址
    to_add_address() {
      let login = localStorage.getItem('hasLog')
      if (login == 0) {
        this.$router.push('/login')
        return
      } else {
        if (this.my_address_list.length == 5) {
          this.toast(this.get_en.address_limit)
        } else {
          this.$router.push({
            path: '/add_address',
            query: {
              name: this.$route.name
            }
          })
        }
      }
    },
    // 展开所有地址
    open_all_fn() {
      this.open_card = false
      this.close_card = true
    },
    close_all_fn() {
      this.open_card = true
      this.close_card = false
    },
    // 选择搜索到的地址
    select_search_address(index) {
      let obj = {
        lat: this.autocomplete_list[index].lat,
        lng: this.autocomplete_list[index].lng,
        name: this.autocomplete_list[index].name
      }
      localStorage.setItem('current_address_latlng', JSON.stringify(obj))
      this.getCity({
        lat: this.autocomplete_list[index].lat,
        lng: this.autocomplete_list[index].lng
      })
      this.$router.push('/home?edit=true')
    },
    // 搜索地址
    initAutocomplete() {
      let self = this
      if (self.select_address_msg != '') {
        let request = {
          radius: self.radius,
          location: self.locPos,
          query: self.select_address_msg
        }
        new google.maps.places.PlacesService(
          new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: self.locPos
          })
        ).textSearch(request, self.searchCallback)
      } else {
        self.autocomplete_list = []
      }
    },
    searchCallback(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return
      }
      let final_results = []
      results.forEach(elem => {
        if (
          elem.formatted_address.indexOf('Philippines') !== -1 ||
          elem.formatted_address.indexOf('菲律宾') !== -1
        ) {
          final_results.push(elem)
        }
      })
      let self = this
      let showl = 0
      self.autocomplete_list = []
      if (final_results.length >= 20) {
        showl = 20
      } else {
        showl = final_results.length
      }
      for (let i = 0; i < showl; i++) {
        self.autocomplete_list.push({
          lat: final_results[i].geometry.location.lat(),
          lng: final_results[i].geometry.location.lng(),
          name: final_results[i].name,
          formatted_address: final_results[i].formatted_address
        })
      }
    },
    // 选择附近地址
    select_near_address(index) {
      let obj = {
        lat: this.near_address_list[index].lat,
        lng: this.near_address_list[index].lng,
        name: this.near_address_list[index].name
      }
      localStorage.setItem('current_address_latlng', JSON.stringify(obj))
      this.$router.push('/home')
    },
    // 附近地址
    near_address_fn() {
      let self = this
      if (self.current_city != '') {
        new google.maps.places.PlacesService(
          new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: self.locPos
          })
        ).nearbySearch(
          {
            location: self.locPos,
            radius: self.radius,
            type: ['store']
          },
          function(results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return
            }
            self.near_address_list = []
            let showl = 0
            self.autocomplete_list = []
            if (results.length >= 10) {
              showl = 10
            } else {
              showl = results.length
            }
            for (let i = 0; i < showl; i++) {
              self.near_address_list.push({
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng(),
                name: results[i].name
              })
            }
          }
        )
      } else {
        self.near_address_list = []
      }
    },

    near_address_list_fn(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return
      }
      let self = this
      self.near_address_list = []
      let showl = 0
      self.autocomplete_list = []
      if (results.length >= 10) {
        showl = 10
      } else {
        showl = results.length
      }
      for (let i = 0; i < showl; i++) {
        self.near_address_list.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng(),
          name: results[i].name
        })
      }
    },
    getCity(location) {
      let self = this,
        locality = null
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
              let types = results[0].address_components[i].types
              if (types.indexOf('locality') != -1) {
                locality = results[0].address_components[i].long_name
                // 定位页面当前城市
                sessionStorage.setItem('current_city_name', locality)
              }
            }
          } else {
            console.log('定位失败,请刷新重试')
            setCookie('current_city', self.$t('choose_address.locate_failure'))
          }
        }
      )
    }
  }
}
</script>

<style scoped>
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

.select_address_body {
  width: 100%;
  height: 93%;
  position: fixed;
  top: 7%;
  overflow: scroll;
  background: white;
}

.select_address_box {
  width: 100%;
  height: 45px;
  background: white;
  padding: 0.2rem 0.4rem;
}

.city_list {
  width: 2rem;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.input_box {
  width: 9rem;
  height: 100%;
  float: right;
}

.input_box div {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.input_box input {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 5px;
  background: #f5f5f5;
  padding-left: 0.2rem;
}

.show_current_address {
  width: 100%;
  background: white;
  padding: 0.4rem;
  text-align: center;
  color: #999999;
  margin-top: 10px;
}

.re_position {
  width: 100%;
  padding: 0 0.4rem 0.4rem 0.4rem;
  border-bottom: 1px solid #ededed;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.re_position_img {
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 0.2rem;
}

.re_position_img img {
  width: 100%;
  height: 100%;
}

.re_position_content {
  float: left;
  height: 20px;
  display: flex;
  align-items: center;
  color: #ff644c;
}

.my_address {
  width: 100%;
  padding: 0.4rem;
  background: white;
}

.near_address {
  width: 100%;
  padding: 0.4rem;
  padding-bottom: 60px;
  background: white;
}

.title_img {
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 0.4rem;
}

.title_img img {
  width: 100%;
}

.title_content {
  float: left;
  height: 20px;
  display: flex;
  align-items: center;
  color: #9e9e9e;
}

.my_address_box,
.near_address_box {
  padding-bottom: 15px;
}

.my_address_list {
  overflow: hidden;
}

.my_address_list .address_list {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
  color: #666666;
}

.my_address_list .address_list .address {
  margin-bottom: 5px;
}

.user_info div {
  float: left;
  color: #999999;
}

.user_info div:first-child {
  margin-right: 20px;
}

.near_address_list .address_list {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
  color: #666666;
}

.open_all {
  width: 100%;
  background: white;
  padding-bottom: 10px;
  color: #999999;
  display: flex;
  justify-content: center;
}

.open_all div {
  float: left;
}

.open_all div:last-child {
  width: 15px;
  margin-left: 0.4rem;
}

.open_all img {
  width: 100%;
}

.autoCompleteList {
  width: 100%;
  background: white;
  padding: 0.2rem 0.4rem;
}

.address_list {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
}

.address_name {
  margin-bottom: 5px;
  color: #666666;
}

.formatted_address {
  color: #999999;
}
</style>