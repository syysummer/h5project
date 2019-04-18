<template>
	<div class="contain">
		<div class="content_contain" :class="{iphone5: isIphone5, iphoneP: isIphoneP, iphone6: isIphone6, iphoneX: isIphoneX}" ref="content">
			<div class="area_list">
				<div class="search_bar" :style="{top: this.inpHeight}">
					<input type="text" ref='inpText' class="inpContain" @focus="focused" v-model="search_txt" :placeholder="get_en_txt.search_for_content">
				</div>
				<div class="area_item" v-for="(item, index) in country_data" :key="index">
					<p ref="items">{{item.name}}</p>
					<div class="country_contain" @click="save_area(elem)" v-for="(elem, cindex) in item.newCountry" :key="cindex">
						<div class="country_name">{{elem.countryName}}</div>
						<div class="country_code">+{{elem.phoneCode}}</div>
					</div>
				</div>
			</div>
			<div class="nav_bar" :style="{top: inpTop}" :class="{iphone5: isIphone5, iphoneP: isIphoneP, iphone6: isIphone6, iphoneX: isIphoneX}">
				<p v-for="(item, index) in country_data" @click="jump(index)" :key="index">{{item.name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import country_zh from '@/assets/country_code/countryChinese.json'
import country_en from '@/assets/country_code/countryEnglish.json'
import store from '@/store'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
export default {
  data() {
    return {
      country: '',
      language: '',
      country_data: {},
      item_offset: [],
      search_txt: '',
      search_result: [],
      isSearch: false,
      isIphoneX: false,
      isIphoneP: false,
      isIphone6: false,
      isIphone5: false,
      inpHeight: '7%',
      inpTop: '2.8rem'
    }
  },
  computed: {
    get_en_txt() {
      let txt = this.$t('home')
      return txt
    }
  },
  created() {
    this.language = getCookie('lang')
    if (this.language == 'zh') {
      this.country = country_zh.data
    }
    if (this.language == 'en') {
      this.country = country_en.data
    }
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
  mounted() {
    this.set_data(),
      this.$nextTick(() => {
        const itemsEles = [...this.$refs.items]
        this.item_offset = itemsEles.map(item => {
          return item.offsetTop || 0
        })
      })
  },
  methods: {
    focused() {
      this.inpHeight =
        parseFloat(
          getComputedStyle(document.querySelector('.phoneHeader')).height
        ) + 'px'
      this.inpTop =
        parseFloat(
          getComputedStyle(document.getElementsByClassName('nav_bar')[0])
        ).top + 'px'
    },
    set_data() {
      let map = []
      let newMap = []
      if (this.isSearch) {
        this.country_data = this.search_result
      } else {
        this.country_data = this.country
      }
      if (this.language == 'en') {
        for (let [i, item] of this.country_data.entries()) {
          map[i] = {
            name: item.countryName.substr(0, 1),
            newCountry: []
          }
        }
      }
      if (this.language == 'zh') {
        for (let [i, item] of this.country_data.entries()) {
          map[i] = {
            name: item.countryPinyin.substr(0, 1).toUpperCase(),
            newCountry: []
          }
        }
      }
      for (let [i, item] of map.entries()) {
        let flag = true
        for (let [j, elem] of newMap.entries()) {
          if (item.name == elem.name) {
            flag = false
          }
        }
        if (flag) {
          newMap.push(map[i])
        }
      }
      newMap.sort((a, b) => {
        //排序
        return a.name.charCodeAt(0) - b.name.charCodeAt(0) //charCodeAt返回这个字符串中下标为0的code编码
      })
      for (let [i, item] of newMap.entries()) {
        for (let [j, elem] of this.country_data.entries()) {
          if (this.language == 'en') {
            if (elem.countryName.substr(0, 1) === item.name) {
              item.newCountry.push(elem)
              item.newCountry.sort((a, b) => {
                return a.countryName.charCodeAt(1) - b.countryName.charCodeAt(1)
              })
            }
          }
          if (this.language == 'zh') {
            if (elem.countryPinyin.substr(0, 1) == item.name.toLowerCase()) {
              item.newCountry.push(elem)
              item.newCountry.sort((a, b) => {
                return a.countryName.charCodeAt(1) - b.countryName.charCodeAt(1)
              })
            }
          }
        }
      }
      this.country_data = newMap
      this.isSearch = false
    },
    jump(index) {
      this.body = this.$refs.content
      // 因为offsetTop属性是相对整个视口，而scrollTop是相对滚动容器，所以需要减去44px(header的高度)
      const offset = this.item_offset[index]
      this.body.scrollTop = offset
    },
    doSearch(newVal) {
      this.search_result = []
      let value = newVal.replace(/^\s*/, '')
      let reg = new RegExp(newVal, 'gi')
      var numReg = new RegExp('^[0-9]*$')
      if (value.match(numReg)) {
        for (let [i, item] of this.country.entries()) {
          if (item.phoneCode.match(reg)) this.search_result.push(item)
        }
        this.isSearch = true
        this.set_data()
        return
      }
      if (this.language === 'zh') {
        for (let [i, item] of this.country.entries()) {
          if (item.countryName.match(reg)) this.search_result.push(item)
          if (item.countryPinyin.match(reg)) this.search_result.push(item)
        }
      }
      if (this.language === 'en') {
        for (let [i, item] of this.country.entries()) {
          if (item.countryName.match(reg)) this.search_result.push(item)
        }
      }
      this.isSearch = true
      this.set_data()
    },
    save_area(elem) {
      this.$nextTick(() => {
        this.$refs.inpText.blur()
        sessionStorage.setItem('area_code', elem.phoneCode)
        sessionStorage.setItem('feedback_code', elem.phoneCode)
        localStorage.setItem('phone_country', elem.countryName)
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        userInfo.phoneArea = elem.phoneCode
        // store.state.userInfo.phoneArea = elem.phoneCode
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        // this.$router.go(-1)
        setTimeout(() => {
          window.history.back()
        }, 300)
      })
    }
  },
  watch: {
    search_txt(newVal, oldVal) {
      if (/^\s*$/.test(newVal)) {
        this.set_data()
      } else {
        this.doSearch(newVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.contain {
  height: 93%;
  background-color: #fff;
  overflow: hidden;
  position: fixed;
  width: 100%;
  top: 7%;
  .nav_bar {
    position: fixed;
    right: 5px;
    top: 3rem;
    color: #ff644c;
    p {
      font-size: 12px;
      width: 0.4rem;
      padding: 0.01rem 0;
      text-align: center;
    }
  }
  .nav_bar.iphone6 {
    top: 2.5rem;
    padding: 0 0;
  }
  .nav_bar.iphone5 {
    transform: scale(0.8);
    top: 1rem;
    padding: 0 0;
  }
  .content_contain {
    margin-top: 9.7%;
    overflow-y: auto;
    height: 94.3%;
  }
  // .content_contain.iphoneP {
  //   margin-top: 2.5rem;
  //   height: 77vh;
  // }
  // .content_contain.iphone6 {
  //   margin-top: 2.5rem;
  //   height: 76.5vh;
  // }
  // .content_contain.iphoneX {
  //   margin-top: 3rem;
  //   height: 72vh;
  // }
  // .content_contain.iphone5 {
  //   margin-top: 3rem;
  //   height: 69vh;
  // }
  .area_list {
    position: relative;
    // padding-top: 1.2rem;
    .search_bar {
      position: fixed;
      width: 100%;
      top: 7%;
      padding: 0.2rem 0.4rem;
      background-color: #ddd;
      height: 6.5%;
      min-height: 35px;
      input {
        width: 100%;
        height: 0.8rem;
        border-radius: 10px;
        border: 0;
        padding-left: 1rem;
        font-size: 14px;
        background-color: #fafafa;
        background-image: url(../assets/icons/搜索@3x.png);
        background-size: 0.5rem 0.5rem;
        background-repeat: no-repeat;
        background-position: 0.2rem center;
        color: #666;
      }
    }
    .area_item {
      p {
        background-color: #f7f7f7;
        padding: 0.1rem 0.4rem;
        width: 95%;
        font-size: 14px;
      }
      .country_name {
        color: #333;
      }
      .country_code {
        color: #666;
      }
      &:last-child {
        margin-bottom: 20px;
      }
      .country_contain {
        padding: 0.3rem 0.2rem 0.3rem 0;
        display: -webkit-box;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        margin: 0 0.6rem;
        &:last-child {
          border: 0;
        }
        div {
          text-align: right;
          -webkit-box-flex: 1;
          &:first-child {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
