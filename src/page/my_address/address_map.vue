<template>
	<div class="contain">
		<div class="phoneHeader" :class="{focus: isFocus}">
			<publicHeader :title="get_addr_txt.add_address"></publicHeader>
		</div>
		<div class="all_height">
			<div class="search_area" :style="{top: this.inpHeight}" :class="{focus: isFocus}">
				<input type="text" @focus="focused" ref="googleMap" id="search_msg" @keyup="initAutocomplete" v-model="search_msg" :placeholder="get_newAddr_txt.input_area">
			</div>
			<div id="googleMap" ref="mapContain">
			</div>
			<div class="other_contain">
				<div class="location_icon" @click="back_location">
					<img src="../../assets/icons/icon_location.png" alt="">
				</div>
				<div class="move_address">
					{{move_location.address}}
				</div>
				<div class="confirm_btn" @click="saveLocation">
					{{get_newAddr_txt.confirm}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import publicHeader from '@/components/public_header.vue'
import store from '@/store'
export default {
  data() {
    return {
      test_count: 0,
      country: { country: ['PHI'] }, //查询范围 国家给单位
      search_msg: '',
      radius: 100, // 圆心半径
      locPos: {
        // 存储经纬度
        lat: 0,
        lng: 0
      },
      set_locPos: {
        // 搜索经纬度
        lat: 0,
        lng: 0
      },
      move_location: {
        //拖拽经纬度
        locPos: {},
        address: ''
      },
      save_location: {
        address: '',
        locPos: {
          lat: '',
          lng: ''
        }
      },
      isBlur: false,
      isFocus: false,
      autocomplete: '',
      inpHeight: '7%'
    }
  },
  created() {
    let isEdit = localStorage.getItem('editAddr')
    let noYetSave = localStorage.getItem('no_yet_save_city')
    if (noYetSave) {
      this.save_location.locPos.lat = this.locPos.lat = this.set_locPos.lat = parseFloat(
        JSON.parse(localStorage.getItem('no_yet_save_addr')).lat
      )
      this.save_location.locPos.lng = this.locPos.lng = this.set_locPos.lng = parseFloat(
        JSON.parse(localStorage.getItem('no_yet_save_addr')).lng
      )
      this.save_location.address = this.move_location.address = localStorage.getItem(
        'no_yet_save_city'
      )
    } else if (isEdit == 'true') {
      this.save_location.locPos.lat = this.locPos.lat = this.set_locPos.lat = parseFloat(
        JSON.parse(localStorage.getItem('new_address_latlng')).lat
      )
      this.save_location.locPos.lng = this.locPos.lng = this.set_locPos.lng = parseFloat(
        JSON.parse(localStorage.getItem('new_address_latlng')).lng
      )
      this.save_location.address = this.move_location.address = localStorage.getItem(
        'new_city_name'
      )
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.errorPosition
        )
      }
    }
    localStorage.removeItem('editAddr')
  },
  components: {
    publicHeader
  },
  computed: {
    get_addr_txt() {
      let txt = this.$t('my_address')
      return txt
    },
    get_newAddr_txt() {
      let txt = this.$t('add_address')
      return txt
    }
  },
  watch: {
    search_msg: function() {
      // this.initAutocomplete();
    }
  },
  mounted() {
    this.initialize()
    document
      .getElementById('search_msg')
      .addEventListener('input', function(e) {
        this.initAutocomplete
      })
  },
  methods: {
    focused() {
      this.inpHeight =
        parseFloat(
          getComputedStyle(document.querySelector('.phoneHeader')).height
        ) + 'px'
    },
    getCity(location) {
      let self = this
      self.geocoder = new google.maps.Geocoder()
      self.geocoder.geocode({ location: location }, function(results, status) {
        self.save_location.address = self.move_location.address =
          results[0].formatted_address
      })
    },
    errorPosition() {
      this.toast('定位失败')
    },
    showPosition(position) {
      let obj = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.getCity(obj)
      ;(this.save_location.locPos.lat = this.locPos.lat = this.set_locPos.lat =
        position.coords.latitude),
        (this.save_location.locPos.lng = this.locPos.lng = this.set_locPos.lng =
          position.coords.longitude)
      // localStorage.setItem("new_address_latlng", JSON.stringify(obj));
      this.initialize()
    },
    saveLocation() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      // store.state.userInfo.add_address.address = this.save_location.address
      // store.state.userInfo.add_address.locPos = this.save_location.locPos
      userInfo.add_address.address = this.save_location.address
      userInfo.add_address.locPos = this.save_location.locPos
      localStorage.setItem(
        'no_yet_save_addr',
        JSON.stringify(this.save_location.locPos)
      )
      localStorage.setItem('no_yet_save_city', this.save_location.address)
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      this.$router.go(-1)
    },
    back_location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.errorPosition
        )
      }
    },
    getAdd(location) {
      let self = this
      if (self.geocoder == null) {
        self.geocoder = new google.maps.Geocoder()
      }
      self.geocoder.geocode({ location: location }, function(results, status) {
        if (status == 'OK') {
          self.chooseAdd = results[0].formatted_address
          // 保存最终拖动地址
          console.log('dragend', results[0].formatted_address, location)
          self.move_location.locPos = location
          self.move_location.address = self.chooseAdd
          self.save_location.locPos = location
          self.save_location.address = self.chooseAdd
        } else {
          //self.$toast.error('定位错误，请刷新页面重试')
        }
      })
    },
    initialize() {
      var _this = this
      var mapProp = {
        // 地图初始化
        center: new google.maps.LatLng(
          _this.set_locPos.lat,
          _this.set_locPos.lng
        ),
        zoom: 15,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }
      _this.map = new google.maps.Map(
        document.getElementById('googleMap'),
        mapProp
      )

      this.initAutocomplete()

      _this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          _this.set_locPos.lat,
          _this.set_locPos.lng
        )
      })
      _this.marker.setMap(_this.map)
      google.maps.event.addListener(_this.map, 'drag', function(MouseEvent) {
        let pos = {
          lat: _this.map.getCenter().lat(),
          lng: _this.map.getCenter().lng()
        }
        _this.marker.setPosition(pos)
      })
      google.maps.event.addListener(_this.map, 'dragend', function(MouseEvent) {
        let pos = {
          lat: _this.map.getCenter().lat(),
          lng: _this.map.getCenter().lng()
        }
        _this.move_location.locPos = pos
        // _this.move_location.address = localStorage.getItem("current_city_name");
        _this.getAdd(pos)
      })
    },
    // 搜索时展开谷歌地图位置列表
    initAutocomplete() {
      let self = this
      let circle = new google.maps.Circle({
        center: self.locPos,
        radius: self.radius
      })
      let options = {
        types: [],
        // componentRestrictions: self.country,
        componentRestrictions: { country: 'PHL' },
        bounds: circle.getBounds()
      }
      let autocomplete = new google.maps.places.Autocomplete(
        this.$refs.googleMap,
        options
      )
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace()
        var address = place.name
        var latlng = place.geometry.location
        let lat = latlng
          .toString()
          .split(',')[0]
          .split('(')[1]
          .trim('')
        let lng = latlng
          .toString()
          .split(',')[1]
          .split(')')[0]
          .trim('')
        self.move_location.locPos = {
          lat: lat,
          lng: lng
        }

        let obj = { lat: lat, lng: lng }
        // 保存搜索地址
        // self.save_location.locpos = {'lat': lat, 'lng': lng}
        self.save_location.locPos.lat = lat
        self.save_location.locPos.lng = lng
        self.save_location.address = address
        self.move_location.address = address
        self.set_locPos = obj
        self.initialize()
      })
    }
  },
  beforeDestroy() {
    this.$refs.mapContain.innerHTML = ''
  }
}
</script>

<style lang="scss" scoped type="text/css">
.contain {
  height: 100%;
  .phoneHeader {
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 9;
    min-height: 30px;
  }
  .all_height {
    height: 93%;
    position: fixed;
    top: 7%;
    width: 100%;
  }
  .search_area {
    background-color: #ddd;
    padding: 0.2rem 0.4rem;
    text-align: center;
    position: fixed;
    top: 7%;
    width: 100%;
    z-index: 2; // height: 5.6vh;
    height: 7.5%;
    min-height: 40px;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      border: 0;
      height: 0.8rem;
      border-radius: 2px;
      background-color: #fcfcfc;
      padding-left: 1.4rem;
      font-size: 14px;
      background-image: url(../../assets/icons/搜索@3x.png);
      background-size: 0.5rem 0.5rem;
      background-repeat: no-repeat;
      background-position: 0.6rem center;
      color: #666;
    }
  }
  #googleMap {
    // height: 86.4vh;
    position: fixed !important;
    top: 12.5%;
    width: 100%;
    height: 87.5%;
    z-index: 1;
  }
  .other_contain {
    position: fixed;
    width: 100%;
    bottom: 0.4rem;
    padding: 0 0.4rem;
    z-index: 10;
    .location_icon {
      position: absolute;
      right: 0.3rem;
      top: -1.5rem;
      img {
        width: 1.3rem;
      }
    }
    .move_address {
      width: 100%;
      background-color: #fff;
      padding: 0.4rem 0.4rem;
      font-size: 14px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      margin-bottom: 0.4rem;
    }
    .confirm_btn {
      width: 100%;
      background-color: #ff644d;
      text-align: center;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #e65a45;
      padding: 0.4rem 0.4rem;
      color: #fff;
    }
  }
}
</style>