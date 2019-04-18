<template>
	<div class="rider_recruit_info">
		<div class="header">
			<div class="back" @click="back">
				<img src="../../../assets/icons/icon_arrows_left@2x.png" alt="">
			</div>
			<div class="title">
				{{rider_recruitment.title}}
			</div>
		</div>
		<div class="merchant_info">
			<div class="content">
				<div class="line">
					<div class="name">{{rider_recruitment.name}}</div>
					<input type="text" v-model="name" maxlength="30" :placeholder="merchant_entry.contactPlaceholder" />
				</div>
				<div class="line_radio">
					<div class="sex">{{rider_recruitment.sex}}</div>
					<div class="sex_radio">
						<div class="radios" :class="{active: sex==1}">
							<input name="sex" type="radio" id="radio_1" value="1" v-model="sex" />{{merchant_entry.Mr}}
							<label for="radio_1"></label>
						</div>
						<div class="radios" :class="{active: sex==2}">
							<input name="sex" type="radio" id="radio_2" value="2" v-model="sex" />{{merchant_entry.Miss}}
							<label for="radio_2"></label>
						</div>
					</div>
				</div>
				<div class="old_rider">
					<div>{{rider_recruitment.old}}</div>
					<input type="number" v-model="age" :placeholder="rider_recruitment.oldHolder" />
				</div>
				<div class="line_radio">
					<div class="type_work">{{rider_recruitment.type}}</div>
					<div class="type_radio">
						<div class="radios" :class="{active: workType==1}">
							<input name="workType" type="radio" id="radio_3" value="1" v-model="workType" />{{rider_recruitment.all}}
							<label for="radio_3"></label>
						</div>
						<div class="radios" :class="{active: workType==2}">
							<input name="workType" type="radio" id="radio_4" value="2" v-model="workType" />{{rider_recruitment.anny}}
							<label for="radio_4"></label>
						</div>
					</div>
				</div>
				<div class="place_work">{{rider_recruitment.place}}</div>
				<div class="provice_select" @click="showSelect">
					<div class="provice">{{rider_recruitment.privoce}}</div>
					<div class="line_select">
						<span>{{select_province}}</span>
					</div>
					<div class="img"><img src="../../../assets/icons/open@2x.png" alt=""></div>
				</div>
				<div class="city_select" @click="selectCity">
					<div class="city">{{rider_recruitment.city}}</div>
					<div class="line_select">
						<span>{{city}}</span>
					</div>
					<div class="img"><img src="../../../assets/icons/open@2x.png" alt=""></div>
				</div>
			</div>
			<div class="button" @click="submit">
				{{merchant_entry.submit}}
			</div>
		</div>
		<div class="black_bg" v-show="provinceVisible">
			<div :class="{visible: isProvince, cityVisible: !isProvince}">
				<div class="btn">
					<span @click="cancel">{{merchant_entry.cancel}}</span>
					<span @click="finish">{{merchant_entry.finish}}</span>
				</div>
				<ul class="select">
					<li v-for="(item, index) in province" :key="index" @click="selectProvince(index)" :class="{active: currentIndex===index}">
						{{item.name}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import store from '@/store'
import sendMessage from '../../../components/send-message'
export default {
  name: 'rider_recruit_info',
  data() {
    return {
      name: '',
      sex: '1',
      workType: '1',
      select_province: '',
      city: '',
      address: '',
      provinceVisible: false,
      province: [],
      provinceId: '',
      cityId: '',
      isProvince: true,
      currentIndex: '',
      isProvinceId: false,
      isCityId: false,
      age: ''
    }
  },
  components: { sendMessage },
  created() {
    let merchant_entry = this.$t('merchant_entry')
    this.select_province = merchant_entry.provinces
    this.city = merchant_entry.city
  },
  computed: {
    merchant_entry() {
      let merchant_entry = this.$t('merchant_entry')
      return merchant_entry
    },
    rider_recruitment() {
      let rider_recruitment = this.$t('rider_recruitment')
      return rider_recruitment
    }
  },
  mounted() {
    let select_province = sessionStorage.getItem('select_province')
    if (select_province) {
      this.select_province = select_province
    } else {
      this.select_province = ''
    }
    let merchant_city = sessionStorage.getItem('merchant_city')
    if (merchant_city) {
      this.city = merchant_city
    } else {
      this.city = ''
    }
    let province = sessionStorage.getItem('province')
    let provinceId = sessionStorage.getItem('provinceId')
    if (province && provinceId) {
      this.provinceId = provinceId
      this.select_province = province
    } else {
      this.select_province = this.$t('merchant_entry.provinces')
      this.provinceId = ''
      this.cityId = ''
      this.city = this.$t('merchant_entry.city')
    }
    let city = sessionStorage.getItem('city')
    let cityId = sessionStorage.getItem('cityId')
    if (city && cityId) {
      this.city = city
      this.cityId = cityId
    } else {
      this.cityId = ''
      this.city = this.$t('merchant_entry.city')
    }
  },
  methods: {
    getAreaRegionList() {
      store.dispatch('getAreaRegionList').then(res => {
        if (res.data.code == 1) {
          this.province = res.data.data
        }
      })
    },
    getAreaCityList(id) {
      store
        .dispatch('getAreaCityList', {
          regionId: id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.province = res.data.data
          }
        })
    },
    back() {
      this.$router.go(-1)
      sessionStorage.removeItem('city')
      sessionStorage.removeItem('cityId')
      sessionStorage.removeItem('provinceId')
      sessionStorage.removeItem('province')
    },
    showSelect() {
      this.getAreaRegionList()
      this.provinceVisible = true
      this.isProvince = true
      this.currentIndex = ''
      this.cityId = ''
    },
    selectProvince(index) {
      this.currentIndex = index
      if (this.isProvince) {
        this.select_province = this.province[index].name
        this.provinceId = this.province[index].id
      } else {
        this.city = this.province[index].name
        this.cityId = this.province[index].id
      }
      // this.provinceVisible = false
    },
    finish() {
      if (this.isProvince) {
        if (this.provinceId) {
          this.provinceVisible = false
          this.cityId = ''
          this.city = this.$t('merchant_entry.city')
          this.getAreaCityList(this.provinceId)
        } else {
          let provinceError = this.$t('merchant_entry.provinces')
          this.toast.warning(provinceError)
          this.getAreaRegionList()
        }
        sessionStorage.setItem('province', this.select_province)
        sessionStorage.setItem('provinceId', this.provinceId)
        sessionStorage.removeItem('city')
        sessionStorage.removeItem('cityId')
      } else {
        if (this.cityId) {
          this.provinceVisible = false
        } else {
          let cityError = this.$t('merchant_entry.city')
          this.toast.warning(cityError)
          this.getAreaCityList(this.provinceId)
        }
        this.cityId
        sessionStorage.setItem('city', this.city)
        sessionStorage.setItem('cityId', this.cityId)
      }
    },
    selectCity() {
      this.currentIndex = ''
      if (this.provinceId) {
        this.getAreaCityList(this.provinceId)
        this.isProvince = false
        this.provinceVisible = !this.provinceVisible
      } else {
        let provinceError = this.$t('merchant_entry.provinces')
        this.toast.warning(provinceError)
        return
      }
      this.isCityId = true
    },
    cancel() {
      if (this.isProvince) {
        let province = sessionStorage.getItem('province')
        let provinceId = sessionStorage.getItem('provinceId')
        if (province && provinceId) {
          this.provinceId = provinceId
          this.select_province = province
          let city = sessionStorage.getItem('city')
          let cityId = sessionStorage.getItem('cityId')
          if (city && cityId) {
            this.city = city
            this.cityId = cityId
          } else {
            this.cityId = ''
            this.city = this.$t('merchant_entry.city')
          }
        } else {
          this.select_province = this.$t('merchant_entry.provinces')
          this.provinceId = ''
          this.cityId = ''
          this.city = this.$t('merchant_entry.city')
        }
      } else {
        let city = sessionStorage.getItem('city')
        let cityId = sessionStorage.getItem('cityId')
        if (city && cityId) {
          this.city = city
          this.cityId = cityId
        } else {
          this.cityId = ''
          this.city = this.$t('merchant_entry.city')
        }
      }
      this.currentIndex = ''
      this.provinceVisible = false
      this.isProvince = false
    },
    submit() {
      let names = /^[\u4E00-\u9FFFA-Za-z]{2,30}$/
      let ageNum = /^\d{2,3}$/
      if (!this.name) {
        let warnText = this.$t('merchant_entry.contactPlaceholder')
        this.toast.warning(warnText)
        return
      } else if (!names.test(this.name)) {
      } else if (!this.age) {
        let warnText = this.$t('rider_recruitment.oldHolder')
        this.toast.warning(warnText)
      } else if (!ageNum.test(this.age)) {
        let warnText = this.$t('rider_recruitment.oldConcact')
        this.toast.warning(warnText)
      } else if (!this.provinceId) {
        let warnText = this.$t('merchant_entry.provinces')
        this.toast.warning(warnText)
        return
      } else if (!this.cityId) {
        let warnText = this.$t('merchant_entry.city')
        this.toast.warning(warnText)
        return
      }
      let certificate = sessionStorage.getItem('certificate')
      store
        .dispatch('saveDeliveryInfoApi', {
          deliveryName: this.name,
          gender: this.sex,
          provinceId: this.provinceId,
          cityId: this.cityId,
          age: this.age,
          workType: this.workType,
          registrationForm: 2,
          certificate: certificate
        })
        .then(res => {
          if (res.data.code === 1) {
            sessionStorage.removeItem('city')
            sessionStorage.removeItem('cityId')
            sessionStorage.removeItem('provinceId')
            sessionStorage.removeItem('province')
            this.$router.push('/rider_success')
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style scoped lang="scss">
.rider_recruit_info {
  height: 100vh;
  .header {
    height: 7%; // line-height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    min-height: 40px;
    .back {
      width: 0.3rem;
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 17px;
      color: #333;
    }
  }
  .merchant_info {
    background: #fff;
    height: 93%;
    overflow-y: auto;
    .content {
      margin-left: 20px;
    }
    .line {
      padding-right: 15px;
      height: 8vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      color: #666;
      .name {
        width: 27%;
      }
      input {
        border: none;
        width: 100%;
        font-size: 15px;
        flex: 1;
        color: #666;
      }
      span {
        &:last-child {
          float: right;
          margin-right: 20px;
        }
        font-size: 15px;
      }
      img {
        width: 13px;
        position: absolute; // top: 1.9vh;
        right: 15px;
      }
    }
    .code_line {
      padding: 0 15px;
      height: 8vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      color: #666;
      input {
        border: none;
        width: 100%;
        font-size: 15px;
      }
      .img_code {
        width: 85px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        position: absolute;
        right: 15px;
        background: url('../../../assets/images/button01@2x.png') no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        z-index: 998;
        div {
          font-size: 13px;
          color: #ff644c;
        }
      }
      .send_code {
        width: 85px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        position: absolute;
        // top: 11px;
        right: 15px;
        background: #b1afaf;
        border: 1px solid #333;
        z-index: 999;
        div {
          width: 100%;
          font-size: 12px;
          img {
            width: 20px;
            margin-bottom: -3px;
          }
          // color: #ff644c;
        }
      }
    }
    .button {
      width: 93%;
      margin: 1rem auto;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #ff644c;
    }
    .line_radio {
      padding-right: 15px;
      height: 8vh;
      display: flex;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      color: #666;
      .sex {
        color: #666;
        width: 27%;
      }
      .type_work {
        width: 27%;
      }
      .radios {
        &:last-child {
          margin-left: 25px;
        }
        display: inline-block;
        position: relative;
        line-height: 30px;
        color: #999;
        input[type='radio'] {
          width: 28px;
          height: 20px;
          opacity: 0;
        }
        label {
          position: absolute;
          left: 5px;
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #999;
        }
        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        input:checked + label {
          background-color: #ff644d;
          border: 1px solid #ff644d;
        }

        input:checked + label::after {
          position: absolute;
          content: '';
          width: 4px;
          height: 7px;
          top: 1px;
          left: 4px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
      }
      .active {
        color: #ff644d !important;
      }
    }
    .old_rider {
      display: flex;
      color: #666;
      height: 8vh;
      align-items: center;
      border-bottom: 1px solid #ededed;
      div {
        width: 27%;
      }
      input {
        border: none;
        font-size: 15px;
        color: #666;
      }
    }
    .place_work {
      padding-top: 15px;
      color: #666;
    }
    .provice_select {
      display: flex;
      border-bottom: 1px solid #ededed;
      align-items: center;
      height: 8vh;
      min-height: 36px;
      padding-right: 15px;
      color: #666;
      .provice {
        margin-right: 10px;
      }
      .img {
        width: 15px;
        img {
          width: 100%;
        }
      }
    }
    .line_select {
      color: #999;
      flex: 1;
      text-align: center;
    }
    .city_select {
      display: flex;
      border-bottom: 1px solid #ededed;
      align-items: center;
      height: 8vh;
      min-height: 36px;
      padding-right: 15px;
      color: #666;
      .city {
      }
      .img {
        width: 15px;
        img {
          width: 100%;
        }
      }
    }
  }
  .black_bg {
    position: absolute;
    top: 7%;
    width: 100%;
    height: 93%;
    background: rgba(0, 0, 0, 0.4);
    .visible {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #fff;
      height: 48vh;
      .btn {
        padding: 0.5rem;
        border-bottom: 1px solid #ededed;
        span {
          &:last-child {
            float: right;
          }
          color: #ff3633;
        }
      }
      .select {
        height: 40vh;
        overflow-y: auto;
        li {
          list-style: none;
          color: #999;
          text-align: center;
          padding: 0.29rem; // height: 35px;
          // line-height: 35px;
          border-bottom: 1px solid #ededed;
        }
        .active {
          color: #333;
        }
      }
    }
    .cityVisible {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      height: 40vh;
      .btn {
        padding: 0.5rem;
        border-bottom: 1px solid #ededed;
        span {
          &:last-child {
            float: right;
          }
          color: #ff3633;
        }
      }
      .select {
        height: 32vh;
        overflow-y: auto;
        li {
          list-style: none;
          color: #666;
          text-align: center;
          padding: 0.29rem; // height: 35px;
          // line-height: 35px;
          border-bottom: 1px solid #ededed;
        }
        .active {
          color: #333;
        }
      }
    }
  }
}

@media screen and(max-width: 329px) {
  .merchant_entry {
    .merchant_info {
      .line {
        height: 6.5vh; // line-height: 6.5vh;
        img {
          top: 2.2vh;
        }
      }
      .line_radio {
        height: 6.5vh; // line-height: 6.5vh;
      }
      .line_select {
        height: 6.5vh; // line-height: 6.5vh;
        img {
          top: 2.4vh;
        }
      }
    }
    .black_bg {
      .visible {
        height: 33.7vh;
        .select {
          height: 25.4vh;
        }
      }
      .cityVisible {
        height: 27.3vh;
        .select {
          height: 19vh;
        }
      }
    }
  }
  .merchant_entry .header .back {
    top: 0.3rem;
  }
}

@media screen and(min-width: 410px) {
  .merchant_entry {
    .black_bg {
      .visible {
        height: 44vh;
        .select {
          height: 36.3vh;
        }
      }
      .cityVisible {
        height: 38.3vh;
        .select {
          height: 30.6vh;
        }
      }
    }
  }
}

@media screen and(min-height: 810px) {
  .merchant_entry {
    .black_bg {
      .visible {
        height: 45.3vh;
        .select {
          height: 38.7vh;
        }
      }
      .cityVisible {
        height: 39.7vh;
        .select {
          height: 33.1vh;
        }
      }
    }
  }
}
</style>