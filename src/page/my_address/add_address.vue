<template>
  <div class="contain">
    <div class="phoneHeader">
      <publicHeader :title='page_title'></publicHeader>
    </div>
    <div class="content_contain clearFloat">
      <div class="add_contain">
        <div class="add_item">
          <label>{{get_address_text.name}}</label>
          <input v-model="userInfo.userName" type="text" :placeholder="get_address_text.input_name">
        </div>
        <!-- 选择性别 -->
        <div class="add_item choose_sex">
          <div v-for="(item, index) in radios" :key="index">
            <span class="radio" :class="{'on':item.isChecked}"></span>
            <input v-model="userInfo.sex" :value="item.value" class="input-radio" :checked='item.isChecked' @click="check(index)" type="radio"> {{item.label}}
          </div>
        </div>
        <div class="add_item phone_area" @click="select_area">
          {{get_address_text.phone_place}}
          <img :src="right_arrow" alt="">
          <span v-if="userInfo.phoneArea">+{{userInfo.phoneArea}}</span>
        </div>
        <div class="add_item">
          <label>{{get_address_text.phone}}</label>
          <input v-model="userInfo.phoneNumber" type="number" :placeholder="get_address_text.enter_phone">
        </div>
        <div class="add_item choose_address" @click="select_address">
          <label>{{get_address_text.address}}</label>
          <img :src="icon_location" class="icon_location">
          <span :class="{gray: isGray}">{{userInfo.add_address.address}}</span>
          <img :src="right_arrow" class="right_arrow" alt="">
        </div>
        <div class="add_item room_contain">
          <label>{{get_address_text.room}}</label>
          <input v-model="userInfo.room" type="text" :placeholder="get_address_text.example">
        </div>
        <div class="room_contain t-tips">
          {{tips_address}}
        </div>
      </div>
      <div class="btn_contain">
        <button @touchstart="save_address" v-if="addRess">
          {{btn_txt}}
        </button>
        <button v-else>
          {{btn_txt}}
        </button>
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
      addRess: true,
      right_arrow: require('@/assets/icons/icon_right_arrow.png'),
      icon_location: require('@/assets/icons/icon_location_black.png'),
      sellerId: '',
      isGray: false,
      btn_txt: '',
      page_title: '',
      isEdit: false,
      radio: '1', // 保存性别
      radios: [
        {
          label: this.$t('order_details.mr'),
          value: '0',
          isChecked: true
        },
        {
          label: this.$t('order_details.ms'),
          value: '1',
          isChecked: false
        }
      ],
      userInfo: {
        userName: '', // 姓名
        sex: '0', // 性别
        phoneNumber: '', // 手机
        room: '', // 门牌号
        phoneArea: '', // 手机归属地
        add_address: {
          address: '',
          locPos: {
            lat: '',
            lng: ''
          }
        }
      }
    }
  },
  components: {
    publicHeader
  },
  computed: {
    tips_address() {
      let tips = this.$t('my_address.tips_address')
      return tips
    },
    get_header_title() {
      let title = this.$t('my_address.add_address')
      return title
    },
    get_address_text() {
      let text = this.$t('add_address')
      return text
    }
  },
  created() {
    this.sellerId = this.$route.query.sellerId
    let txt = this.$t('add_address')
    let add_txt = this.$t('my_address')
    if (this.$route.query.edit == 'edit') {
      this.page_title = txt.edit_address
      this.btn_txt = txt.confirm
      this.isEdit = true
    } else {
      this.btn_txt = txt.add
      this.page_title = txt.add_address
    }
    // this.userInfo = store.state.userInfo
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // this.userInfo.address = txt.select_address
    if (!this.userInfo.add_address.address) {
      this.userInfo.add_address.address = txt.select_address
    } else {
      this.isGray = true
    }
    this.check(this.userInfo.sex)
  },
  methods: {
    check(index) {
      // 先取消所有选中项
      this.radios.forEach(item => {
        item.isChecked = false
      })
      //再设置当前点击项选中
      this.userInfo.sex = this.radios[index].value
      // 设置值，以供传递
      this.radios[index].isChecked = true
    },
    select_area() {
      // Object.assign(store.state.userInfo, this.userInfo)
      sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      this.$router.push('/phone_area')
    },
    select_address() {
      // Object.assign(store.state.userInfo, this.userInfo)
      sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      this.$router.push('/address_map')
    },
    isEmojiCharacter(substring) {
      for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i)
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1)
            var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true
            }
          }
        } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1)
          if (ls == 0x20e3) {
            return true
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            return true
          } else if (0x2b05 <= hs && hs <= 0x2b07) {
            return true
          } else if (0x2934 <= hs && hs <= 0x2935) {
            return true
          } else if (0x3297 <= hs && hs <= 0x3299) {
            return true
          } else if (
            hs == 0xa9 ||
            hs == 0xae ||
            hs == 0x303d ||
            hs == 0x3030 ||
            hs == 0x2b55 ||
            hs == 0x2b1c ||
            hs == 0x2b1b ||
            hs == 0x2b50
          ) {
            return true
          }
        }
      }
    },
    save_address() {
      this.addRess = false
      let userInfo = this.userInfo
      if (
        this.isEmojiCharacter(userInfo.userName) ||
        this.isEmojiCharacter(userInfo.phoneArea) ||
        this.isEmojiCharacter(userInfo.room) ||
        this.isEmojiCharacter(userInfo.add_address.address)
      ) {
        let textErrors = this.$t('suggestion.emoticons')
        this.toast.error(textErrors)
        this.addRess = true
        return
      }
      let userData = {
        address: userInfo.add_address.address,
        houseNumber: userInfo.room,
        lat: userInfo.add_address.locPos.lat,
        lon: userInfo.add_address.locPos.lng,
        name: userInfo.userName,
        sex: userInfo.sex,
        tel: userInfo.phoneArea,
        phone: userInfo.phoneNumber
      }
      let cn_reg = /^[\u4e00-\u9fa5]+$/
      if (!userInfo.userName || cn_reg.test(userInfo.userName)) {
        this.toast.error(this.get_address_text.input_name)
        this.addRess = true
        return
      }
      if (!userInfo.phoneNumber) {
        this.toast.error(this.get_address_text.input_tel)
        this.addRess = true
        return
      }
      if (!userInfo.add_address.locPos.lat) {
        this.toast.error(this.get_address_text.address_empty)
        this.addRess = true
        return
      }
      if (!userInfo.room || cn_reg.test(userInfo.room)) {
        this.toast.error(this.get_address_text.house_no)
        this.addRess = true
        return
      }
      if (this.isEdit) {
        userData.id = userInfo.id
        store.dispatch('updateReceivingAddress', userData).then(res => {
          if (res.data.code === 1) {
            let txt = this.$t('add_address')
            this.toast.success(txt.edit_success)
            if (this.sellerId) {
              this.$router.push(`/order_address?id=${this.sellerId}`)
            } else {
              this.$router.push('/address_list')
            }
          } else {
            this.addRess = true
            this.toast.error(res.data.message)
            if (!userInfo.add_address.locPos.lat) {
              this.toast.error(this.get_address_text.address_empty)
            }
          }
          localStorage.removeItem('no_yet_save_city')
          localStorage.removeItem('no_yet_save_addr')
        })
      } else {
        store.dispatch('insertReceivingAddress', userData).then(res => {
          if (res.data.code === 1) {
            let txt = this.$t('add_address')
            this.toast.success(txt.add_success)
            if (this.sellerId) {
              this.$router.push(`/order_address?id=${this.sellerId}`)
            } else if (this.$route.query.name == 'select_address') {
              this.$router.push('/select_address')
            } else {
              this.$router.push('/address_list')
            }
          } else {
            this.addRess = true
            this.toast.error(res.data.message)
          }
          localStorage.removeItem('no_yet_save_city')
          localStorage.removeItem('no_yet_save_addr')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.contain {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  .phoneHeader {
    // position: fixed;
    width: 100%;
    height: 7%;
    min-height: 30px;
    // top: 0;
    // z-index: 1;
  }
  .content_contain {
    // position: fixed;
    // top: 7%;
    height: 93%;
    width: 100%;
    overflow-y: auto;
  }
  .add_contain {
    border-top: 1px solid #eee;
    .t-tips {
      padding: 0 0.4rem;
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }
    .add_item {
      color: #333;
      font-size: 16px;
      line-height: 1.5rem;
      border-bottom: 1px solid #eee;
      padding: 0 0.4rem;
      input[type='text'],
      input[type='number'] {
        border: 0;
        margin-left: 0.4rem;
        color: #333;
        width: 80%;
        font-size: 14px;
      }
      &.choose_sex {
        // padding-left: 2.4rem;
        padding-left: 0;
        div {
          &:first-child {
            margin-left: 2.4rem;
          }
          display: inline-block;
          margin-right: 0.4rem;
          position: relative;
          .radio {
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
            cursor: pointer;
            background-image: url(../../assets/icons/选择@2x.png);
            background-size: 100% 100%;
            margin-right: 0.1rem;
            position: relative;
            top: -0.05rem;
          }
          .on {
            background-image: url(../../assets/icons/勾选@2x.png);
          }
          input {
            position: absolute;
            opacity: 0;
            top: 0.6rem;
            left: 0.05rem;
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
      &.phone_area {
        img {
          float: right;
          position: relative;
          width: 0.3rem;
          top: 0.5rem;
        }
        span {
          float: right;
          margin-right: 0.5rem;
        }
      }
      &.choose_address {
        position: relative;
        .icon_location {
          margin: 0 0.05rem;
          width: 0.4rem;
          margin-bottom: -0.1rem;
        }
        .right_arrow {
          float: right;
          position: absolute;
          width: 0.3rem;
          top: 0.5rem;
          right: 0.4rem;
        }
        span {
          color: #ccc;
          display: inline-block;
          width: 70%;
          line-height: normal;
          vertical-align: middle;
          font-size: 14px;
        }
        .gray {
          color: #333;
        }
      }
      &.room_contain {
        input {
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .btn_contain {
    margin-top: 0.8rem;
    height: auto;
    width: 100%;
    text-align: center;
    button {
      border: 0;
      padding: 0.4rem 0.4rem;
      background-color: #ff644c;
      color: #fff;
      display: inline-block;
      width: 90%;
      height: 100%;
      text-align: center;
      border-radius: 4px;
    }
  }
}
</style>
