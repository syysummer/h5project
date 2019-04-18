<template>
  <div class="contain">
    <div class="phoneHeader">
      <publicHeader :title='distribution_details.distribution_details'></publicHeader>
    </div>
    <div class="distribution_details_body">
      <div class="position_box">
        <div id="map"></div>
      </div>

      <!-- 配送流程 -->
      <div class="distribution_flow">

        <div class="el-step is-vertical" style="flex-basis: 33.3333%;">
          <div class="el-step__head">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
            </div>
            <div class="el-step__icon is-text">
              <img src="../../assets/icons/submission.png" />
            </div>
          </div>
          <div class="el-step__main clearFloat">
            <div class="arrow_box">
              <div class="arrow"></div>
            </div>
            <div class="el_step__main_body">
              <div class="el-step__title clearFloat">
                <div class="left_box" style="color: #5CB87A;">
                  {{distribution_details.sub}}
                </div>
                <div class="right_box">
                  {{distribution_details_msg.payTime}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="el-step is-vertical" style="flex-basis: 33.3333%;">
          <div class="el-step__head">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
            </div>
            <div class="el-step__icon is-text">
              <img src="../../assets/icons/receipt.png" />
            </div>
          </div>
          <div class="el-step__main">
            <div class="arrow_box">
              <div class="arrow"></div>
            </div>
            <div class="el_step__main_body">
              <div style="width: 100%;">
                <div class="el-step__title clearFloat">
                  <div class="left_box" style="color: black;">
                    {{distribution_details.take}}
                  </div>
                  <div class="right_box">
                    {{distribution_details_msg.orderTime}}
                  </div>
                </div>
                <div class="el-step__description clearFloat">
                  <div class="left_box">
                    <div v-if="distribution_status==3">{{distribution_details.deliMan}}</div>
                    <div v-if="distribution_status==5">{{distribution_details.deli}}</div>
                  </div>
                  <div class="right_box clearFloat">
                    <div class="names" v-if="distribution_status==2 || distribution_status==4">{{distribution_details_msg.name}}</div>
                    <div class="names" v-if="distribution_status==3 || distribution_status==5 || distribution_status==9">{{distribution_details_msg.name}}</div>
                    <div style="float: left; width: 2px; height:14px; background: gainsboro; margin-right: 10px;"></div>
                    <div style="width: 20px; float: right;" @click="show_tel=true">
                      <img style="width: 100%;" src="../../assets/icons/order_details/contact_the_merchant.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="el-step is-vertical" style="flex-basis: 33.3333%;">
          <div class="el-step__head">
            <div class="el-step__line" style="margin-right: 0px;">
              <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
            </div>
            <div class="el-step__icon is-text">
              <img src="../../assets/icons/delivered.png" />
            </div>
          </div>
          <div class="el-step__main">
            <div class="arrow_box">
              <div class="arrow" style="background:#F5F5F5"></div>
            </div>
            <div class="el_step__main_body" style="background:#F5F5F5">
              <div class="el-step__title" style="color:#BDBDBD;">{{distribution_details.deliComplete}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 电话提示框 -->
    <div class="tel_popup" v-if="show_tel">
      <div class="tel_num" v-if="distribution_details_msg.phone">
        {{distribution_details_msg.phonePre + ' ' + distribution_details_msg.phone}}
      </div>
      <div class="tel_num" v-else>
        {{distribution_details_msg.sellerphonePre + ' ' + distribution_details_msg.sellerphone}}
      </div>
      <div class="tel_popup_btn clearFloat">
        <div @click="show_tel=false">
          {{$t("order_details").cancel}}
        </div>
        <div @click="show_tel=false">
          <a :href="'tel:'+(distribution_details_msg.phonePre + distribution_details_msg.phone)" v-if="distribution_details_msg.phone">
            {{$t("order_details").call}}
          </a>
          <a :href="'tel:'+(distribution_details_msg.sellerphonePre + distribution_details_msg.sellerphone)" v-else>
            {{$t("order_details").call}}
          </a>
        </div>
      </div>
    </div>
    <div class="tel_task_box" v-if="show_tel"></div>
  </div>
</template>

<script>
  import {
    setCookie,
    getCookie,
    removeCookie
  } from '../../utils/cookies.js'
  import store from '../../store'
  import publicHeader from '../../components/public_header.vue'
  export default {
    name: 'distribution_details',
    data() {
      return {
        distribution_status: 1,
        map: '',
        timer: null,
        show_tel: false
      }
    },
    components: {
      publicHeader
    },
    computed: {
      distribution_details() {
        let distribution_details = this.$t('order.detail.step')
        return distribution_details
      },
      distribution_details_msg() {
        return store.state.distribution_details
      }
    },
    mounted() {
      this.distributionLocation()
    },
    methods: {
      // 配送详情
      distributionLocation() {
        store
          .dispatch('distributionLocation', {
            orderId: this.$route.query.id
          })
          .then(res => {
            if (res.data.code == 1) {
              Object.assign(store.state.distribution_details, res.data.data)

              this.distribution_status =
                store.state.distribution_details.orderStatus

              this.initialize()
              google.maps.event.addDomListener(window, 'load', this.initialize)
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      initialize() {
        let mapProp = {
          center: {
            lat: parseFloat(this.distribution_details_msg.sellerLat),
            lng: parseFloat(this.distribution_details_msg.sellerLon)
          },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
          rotateControl: false
        }
        let icons = null
        if (getCookie('lang') == 'zh') {
          icons = {
            distributor_position: require('../../assets/icons/distributor_position.png'),
            receiving_address: require('../../assets/icons/receiving_address.png'),
            seller_position: require('../../assets/icons/seller_position.png')
          }
        } else if (getCookie('lang') == 'en') {
          icons = {
            distributor_position: require('../../assets/icons/distributor_position_en.png'),
            receiving_address: require('../../assets/icons/receiving_address_en.png'),
            seller_position: require('../../assets/icons/seller_position_en.png')
          }
        }
        // 创建地图
        this.map = new google.maps.Map(document.getElementById('map'), mapProp)

        /*
         * 位置标注
         */
        // 收货地址
        new google.maps.Marker({
          position: new google.maps.LatLng({
            lat: parseFloat(this.distribution_details_msg.userLat),
            lng: parseFloat(this.distribution_details_msg.userLon)
          }),
          icon: icons.receiving_address,
          map: this.map,
          title: this.$t('order.detail.step.myPos')
        })
        // 商家位置
        new google.maps.Marker({
          position: new google.maps.LatLng({
            lat: parseFloat(this.distribution_details_msg.sellerLat),
            lng: parseFloat(this.distribution_details_msg.sellerLon)
          }),
          icon: icons.seller_position,
          map: this.map,
          title: this.$t('order.detail.step.distribution_staff_position')
        })
        // 配送员位置
        new google.maps.Marker({
          position: new google.maps.LatLng({
            lat: parseFloat(this.distribution_details_msg.lat),
            lng: parseFloat(this.distribution_details_msg.lon)
          }),
          icon: icons.distributor_position,
          map: this.map,
          title: this.$t('order.detail.step.distribution_staff_position')
        })

        /*
         * 配送路线（暂时不做）
         */
        // var directionsService = new google.maps.DirectionsService()
        // var directionsDisplay = new google.maps.DirectionsRenderer({
        //   map: this.map
        // })
        // // 商家位置坐标
        // let start_latlng = (
        //   this.distribution_details_msg.sellerLat.toString() +
        //   ',' +
        //   this.distribution_details_msg.sellerLon.toString()
        // ).trim()
        // // 收货地址坐标
        // let end_latlng = (
        //   this.distribution_details_msg.userLat.toString() +
        //   ',' +
        //   this.distribution_details_msg.userLon.toString()
        // ).trim()
        // // 配送员位置坐标
        // let driver_latlng = (
        //   this.distribution_details_msg.lat.toString() +
        //   ',' +
        //   this.distribution_details_msg.lon.toString()
        // ).trim()

        // let self = this
        // 商家到收货地址路线（取货前）
        // let request = {
        //   origin: JSON.stringify(start_latlng),
        //   destination: JSON.stringify(end_latlng),
        //   travelMode: 'DRIVING'
        // }
        // directionsService.route(request, function(response, status) {
        //   self.draw_line(response, status)
        // })
        // 配送员到商家路线（暂时不做）
        // let no_go_request = {
        //   origin: JSON.stringify(driver_latlng),
        //   destination: JSON.stringify(start_latlng),
        //   travelMode: 'DRIVING'
        // }
        // directionsService.route(no_go_request, function(response, status) {
        //   self.draw_line(response, status)
        // })
      },
      // 绘制路线
      draw_line(response, status) {
        let self = this
        if (status == 'OK') {
          // 默认展示路线方法（存在缺陷）
          // directionsDisplay.setDirections(response)

          // 自定义路线
          var myRoute = response.routes[0].legs[0]
          var locations = []
          for (var i = 0; i < myRoute.steps.length; i++) {
            // 多边形
            locations.push(myRoute.steps[i].start_point)
            var lineSymbol = {
              path: 'M 0,-1 0,1',
              strokeOpacity: 1,
              scale: 3
            }
            var polyOptions = {
              strokeColor: '#5BA6FF',
              strokeOpacity: 1,
              strokeWeight: 0,
              icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '10px'
              }]
            }
            var poly = new google.maps.Polyline(polyOptions)
            poly.setMap(self.map)
            for (var j = 0; j < locations.length; j++) {
              var loc = locations[j]
                .toString()
                .split('(')[1]
                .split(')')[0]
                .replace(', ', ',')
                .split(',')
              var path = poly.getPath()
              path.push(new google.maps.LatLng(loc[0], loc[1]))
            }
          }
        } else {
          // 无法获取路线信息
          self.toast(self.$t('delivery_details.no_line'))
        }
      }
    },
    beforeDestroy() {
      store.state.distribution_details = {
        name: ''
      }
    }
  }

</script>

<style scoped>
  .tel_task_box {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    background: black;
    opacity: 0.3;
  }

  .tel_popup {
    width: 60%;
    background: white;
    position: fixed;
    top: 40%;
    left: 20%;
    z-index: 222;
    border-radius: 10px;
  }

  .tel_num {
    text-align: center;
    padding: 0.4rem;
    border-bottom: 1px solid #ededed;
  }

  .tel_popup_btn {
    width: 100%;
    height: 50%;
  }

  .tel_popup_btn div {
    float: left;
    width: 50%;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    text-align: center;
    color: #1b79d6;
  }

  .tel_popup_btn div:last-child {
    border-left: 1px solid #ededed;
  }

  .tel_popup_btn div a {
    display: block;
    width: 100%;
    height: 100%;
    color: #1b79d6;
  }

  .tel_popup_btn a:hover {
    color: #1b79d6;
  }

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

  .distribution_details_body {
    width: 100%;
    height: 93%;
    position: fixed;
    top: 7%;
    overflow: scroll;
    background: white;
  }

  .position_box {
    width: 100%;
    height: 40vh;
    background: #dad9d9;
  }

  #map {
    width: 100%;
    height: 100%;
  }

  /* 流程图 */

  .distribution_flow {
    width: 100%;
    background: white;
    padding: 0.4rem;
  }

  .el-step__main {
    margin: 10px 0;
  }

  .el-step__title,
  .el-step__description {
    color: #666666;
    width: 100%;
  }

  .el-step__description {
    margin-top: 1vh;
    padding-right: 0;
  }

  .el-step__description div {
    font-size: 14px;
  }

  .el-step.is-vertical .el-step__title {
    padding-bottom: 0;
    width: 100%;
    font-size: 14px;
  }

  .left_box,
  .right_box {
    font-size: 14px;
    height: 25px;
    display: flex;
    align-items: center;
  }

  .left_box {
    float: left;
  }

  .right_box {
    float: right;
  }

  .names {
    float: left;
    padding-right: 10px;
  }

  .el-step__head {
    display: flex;
    align-items: center;
  }

  .el-step:last-of-type .el-step__line {
    display: block;
  }

  .el_step__main_body {
    border: 1px solid #dddddd;
    padding: 0 0.4rem;
    border-radius: 5px;
    width: 95%;
    float: right;
    height: 12vh;
    display: flex;
    align-items: center;
  }

  .arrow_box {
    width: 5%;
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .arrow {
    width: 100%;
    width: 16px;
    height: 16px;
    background: white;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    transform: rotate(135deg);
    position: absolute;
    left: 8px;
  }

  .el-step__icon.is-text {
    border: 0;
  }

  .el-step__icon.is-text img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 329px) {
    .arrow {
      left: 5px;
    }

    .el-step__description div {
      font-size: 12px;
    }

    .el-step.is-vertical .el-step__title {
      font-size: 12px;
    }

    .left_box,
    .right_box {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 410px) {
    .arrow {
      left: 9px;
    }
  }

</style>
