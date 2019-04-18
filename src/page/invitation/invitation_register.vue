<template>
  <div class="invitation_register" v-show="isShow">
    <!-- <div class="phoneHeader">
            <publicHeader title="龙外卖新人优惠" v-if="!isActive"></publicHeader>
            <publicHeader title="Loong take out new staff discount" v-else></publicHeader>
        </div> -->
    <div class="bg_container" v-if="!isActive">
      <img class="page_bg" src="@/assets/images/invitation_bg@2x.png" alt="">
    </div>
    <div class="bg_container" v-else>
      <img class="page_bg" src="@/assets/images/english_invitation@2x.png" alt="">
    </div>
      <div class="inputs">
        <div class="input_bg">
          <div class="area_code" @click="setCode">
            <img src="../../assets/icons/DisclosureIndicator@2x.png" alt="">
            <span v-if="!isActive">手机归属地</span>
            <span v-else>Phone number place</span>
            <span>+{{areaCode}}</span>
          </div>
          <div class="phone">
            <input @focus="focued" type="text" v-model="tel" ref="input_tel" @blur="inviteMess">
            <span class="holider" @click="onfoucus" ref="span_tel" v-if="!isActive">请输入手机号</span>
            <span class="holider" @click="onfoucus" ref="span_tel" v-else>Phone number</span>
            <div class="codes" @click="getPhoneCode" v-if="!invitDisabled && !isActive && !isSecond">获取验证码</div>
            <div class="codes" @click="getPhoneCode" v-if="!invitDisabled && !isActive && isSecond">重获验证码</div>
            <div class="codes" @click="getPhoneCode" v-if="!invitDisabled && isActive && !isSecond">Get code</div>
            <div class="codes" @click="getPhoneCode" v-if="!invitDisabled && isActive && isSecond">reacquire</div>
            <div v-if="invitDisabled && !isActive">
              <span class="limit">{{limitTime}}s后重新发送</span>
            </div>
            <div v-if="invitDisabled && isActive">{{limitTime}}s resend</div>
          </div>
          <div class="phone_code">
            <span class="holider" @click="onOtherfoucus" ref="span_code" v-if="!isActive">请输入验证码</span>
            <span class="holider" @click="onOtherfoucus" ref="span_code" v-else>Please enter the code</span>
            <input @focus="focued" type="text" v-model="vCode" ref="input_code" @blur="inviteMess">
          </div>
        </div>
        <div class="middle_btn">
          <div class="go_login" @click="goLogin" v-if="!isActive">
            已有账号，去登录
          </div>
          <div class="go_login" @click="goLogin" v-else>
            Have an account, log in
          </div>
          <div class="btn" @click="jionUs">
            <div v-if="!isActive">
              <button>立即加入</button>
            </div>
            <div v-else>
              <button>Join now</button>
            </div>
          </div>
          <div class="agree" v-if="!isActive">
            <span>阅读并同意</span>
            <span @click="goAgreement">《用户服务协议》</span>
          </div>
          <div class="agree" v-else>
            <span>Read and agree</span>
            <span @click="goAgreement">《User agreement》</span>
          </div>
        </div>
    </div>
    <send-message ref="sendMessage" @selfEvent="getTiemOut" @invitation="invitationReg" :mobile="tel" :globalCode="areaCode" :messageCode="messageCode" @close="closeModel" />
    <div class="phoneCodeVisible" v-show="phoneCodeVisible">
      <div class="phoneCode">
        <img src="../../assets/icons/icon_delete@2x.png" alt="" class="close" @click="close">
        <div><img src="../../assets/images/Rectangle4Copy@2x.png" alt=""></div>
        <div v-if="!isActive">
          <div class="txt">该号码已注册</div>
          <div class="txt">立即登录享受超多优惠吧~~~</div>
        </div>
        <div v-else class="enTxt">This number has been registered for immediate login to enjoy a huge discount</div>
        <div class="button">
          <div @click="close" v-if="!isActive">暂不登录</div>
          <div @click="close" v-if="isActive">No login</div>
          <div @click="goLogin" v-if="!isActive">立即登录</div>
          <div @click="goLogin" v-if="isActive">Login now</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHeader from '../../components/public_header'
import sendMessage from '../../components/send-message'
import store from '../../store'
import Vue from 'vue'
import { removeCookie, setCookie, getCookie } from '../../utils/cookies.js'
export default {
  name: 'invitation_register',
  data() {
    return {
      areaCode: '',
      tel: '',
      vCode: '',
      phoneCodeVisible: false,
      invitDisabled: false,
      messageCode: 2,
      timeId: '',
      limitTime: 60,
      invitation: '',
      isActive: false,
      maskShow: false,
      lang: '',
      isShow: false,
      timeoutDate: '',
      isSecond: false,
      elemHeight: Number
    }
  },
  components: { publicHeader, sendMessage },
  watch: {
    tel(newVal, oldVal) {
      if (newVal != '') {
        this.$refs.span_tel.style.display = 'none'
      } else {
        this.$refs.span_tel.style.display = 'inline'
      }
    },
    vCode(newVal, oldVal) {
      console.log(222222)
      if (newVal != '') {
        this.$refs.span_code.style.display = 'none'
      } else {
        this.$refs.span_code.style.display = 'inline'
      }
    }
  },
  computed: {
    // certificate() {
    //     return this.$router.query
    // }
  },
  beforeCreate() {
    let isShow = sessionStorage.getItem('isShow')
    if (!isShow) {
      sessionStorage.setItem('isShow', 'false')
    } else if (sessionStorage.getItem('isShow') == 'true') {
      this.isShow = true
    } else if (sessionStorage.getItem('isShow') == 'false') {
      this.isShow = false
    }
    this.$nextTick(function() {
      this.lang = this.$route.query.language
      let language = getCookie('lang')
      if (this.lang != language) {
        setCookie('lang', this.lang, 365)
        setCookie('language', this.lang, 365)
        sessionStorage.setItem('isShow', 'true')
        location.reload()
      } else {
        this.isShow = true
        // if (location.href.indexOf("&xyz=") < 0) {
        //   console.log("res",558585)
        //   location.href = location.href + "&xyz=" + Math.random();
        //   sessionStorage.setItem('xyz', this.$route.query.xyz)
        // }
      }
    })
  },
  created() {
    // 语言切换
    this.$nextTick(function() {
      if (this.lang == 'en') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    })
  },
  mounted() {
    this.elemHeight = document.documentElement.clientHeight
    let areaCodes = sessionStorage.getItem('area_code')
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes)
    } else {
      this.areaCode = 63
    }
    let tel = sessionStorage.getItem('inviteTel')
    if (tel) {
      this.tel = tel
    }
    let vCode = sessionStorage.getItem('invitevCode')
    if (vCode) {
      this.vCode = vCode
    }
    // 保留倒计时
    let inviteTime = sessionStorage.getItem('inviteTime')
    if (inviteTime) {
      let times = parseInt(inviteTime) + 60
      let nowTimeout = parseInt(new Date() / 1000)
      this.timeoutDate = parseInt(times - nowTimeout)
      if (this.timeoutDate > 0) {
        this.invitDisabled = true
        this.limitTime = this.timeoutDate % 60
        this.timeId = setInterval(() => {
          this.limitTime--
          if (this.limitTime == 0) {
            console.log('----dao---shi ')
            this.invitDisabled = false
            clearInterval(this.timeId)
          }
        }, 1000)
      } else {
        this.invitDisabled = false
        sessionStorage.removeItem('inviteTel')
        sessionStorage.removeItem('area_code')
        sessionStorage.removeItem('invitevCode')
      }
    }
  },
  methods: {
    focued () {
      document.getElementsByTagName('body')[0].style.height = this.elemHeight + 'px'
      document.getElementsByClassName('invitation_register')[0].style.height = this.elemHeight + 'px'
    },
    setCode() {
      this.$router.push('/phone_area')
    },
    onfoucus() {
      this.$refs.input_tel.focus()
    },
    onOtherfoucus() {
      this.$refs.input_code.focus()
    },
    goAgreement() {
      this.$router.push({
        path: '/service_agreement',
        query: {
          language: this.lang,
          local: 0
        }
      })
    },
    inviteMess() {
      sessionStorage.setItem('inviteTel', this.tel)
      sessionStorage.setItem('invitevCode', this.vCode)
    },
    getPhoneCode() {
      let self = this
      let num = /^\d{3,14}$/
      let vCodeId = sessionStorage.getItem('vCodeId')
      if (!self.tel) {
        if (!self.isActive) {
          self.toast.error('请输入手机号')
        } else {
          self.toast.error('Please enter the phone number')
        }
        return
      } else if (!num.test(self.tel)) {
        if (!self.isActive) {
          self.toast.error('请输入正确的手机号')
        } else {
          self.toast.error('Please enter the correct phone number')
        }
        return
      } else if (!self.areaCode) {
        if (!self.isActive) {
          self.toast.error('手机归属地不能为空')
        } else {
          self.toast.error("Country code can't be empty")
        }
        return
      }
      store
        .dispatch('checkImgApi', {
          clientType: 2,
          globalCode: self.areaCode,
          mobile: self.tel,
          module: 3
        })
        .then(res => {
          console.log('1111111111', res)
          if (res.data.code === 1) {
            self.imgCodeShow = res.data.data
            if (self.imgCodeShow == 'true') {
              self.openModel()
            } else {
              store
                .dispatch('phoneCodeApi', {
                  clientType: 2,
                  globalCode: self.areaCode,
                  mobile: self.tel,
                  module: 3,
                  vCodeId: vCodeId
                })
                .then(res => {
                  console.log(res)
                  if (res.data.code === 1) {
                    self.invitDisabled = true
                    self.toast.success(res.data.message)
                    this.isSecond = true
                    self.getTiemOut()
                  } else {
                    if (
                      res.data.message ==
                        'The phone number has already existed' ||
                      res.data.message == '手机号码已存在'
                    ) {
                      self.phoneCodeVisible = true
                    }
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            }
          } else {
            // self.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    invitationReg() {
      this.phoneCodeVisible = true
    },
    getTiemOut() {
      let timeoutDate = parseInt(new Date() / 1000)
      sessionStorage.setItem('inviteTime', timeoutDate)
      this.limitTime = 60
      clearInterval(this.timeId)
      // this.setMsgStatus(true)
      this.invitDisabled = true
      if (this.invitDisabled) {
        this.timeId = setInterval(() => {
          this.limitTime--
          if (this.limitTime <= 0) {
            // console.log('----dao---shi ')
            this.invitDisabled = false
            this.limitTime = 60
            clearInterval(this.timeId)
          }
        }, 1000)
      }
    },
    openModel() {
      if (!this.invitDisabled) {
        this.$refs.sendMessage.open()
        // this.$emit("open");
      }
    },
    closeModel() {
      this.maskShow = false
    },
    close() {
      this.phoneCodeVisible = false
    },
    goLogin() {
      // this.$router.push('/login')
      location.href = 'https://loong.ph/app/'
      sessionStorage.removeItem('inviteTel')
      sessionStorage.removeItem('area_code')
      sessionStorage.removeItem('invitevCode')
      clearInterval(this.timeId)
      sessionStorage.removeItem('inviteTime')
    },
    jionUs() {
      let self = this
      if (!this.tel) {
        if (!this.isActive) {
          this.toast.error('请输入手机号')
        } else {
          this.toast.error('Please enter the phone number')
        }
        return
      } else if (!this.vCode) {
        if (!this.isActive) {
          this.toast.error('请输入验证码')
        } else {
          this.toast.error('Please enter the code')
        }
        return
      } else {
        store
          .dispatch('invitationRegisterApi', {
            clientType: 2,
            globalCode: self.areaCode,
            mobile: self.tel,
            mCode: self.vCode,
            certificate: self.$route.query.userID
          })
          .then(res => {
            // alert(certificate)
            if (res.data.code == 1) {
              console.log(res)
              self.toast.success(res.data.message)
              removeCookie('tokenKey')
              location.href = 'https://loong.ph/app/'
              sessionStorage.removeItem('inviteTel')
              sessionStorage.removeItem('area_code')
              sessionStorage.removeItem('invitevCode')
              clearInterval(self.timeId)
              sessionStorage.removeItem('inviteTime')
            } else {
              self.toast.error(res.data.message)
            }
          })
          .catch(error => {
            // alert(111111111)
            console.log(error)
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.invitation_register {
  height: 100vh;
  background: linear-gradient(to right, rgb(241, 117, 53), rgb(246, 86, 35));
  .bg_container{
    width: 100%;
    height: 52%;
    overflow:hidden;
    .page_bg{
      width: 100%;
      height: auto;
    }
  }
  .phoneHeader {
    position: fixed;
    width: 100%;
    height: 7vh;
    top: 0;
    z-index: 1;
    min-height: 40px;
  }
  .content_bg {
    width: 100%;
    // position: fixed;
    // top: 0;
    // height: 100%;
    // background: url('../../assets/images/invitation_bg@2x.png') no-repeat;
    // background-size: 100% 100%;
    // background-position: center;
    // overflow-y: auto;
  }
  // .english_bg {
  //   width: 100%;
  //   position: fixed;
  //   top: 0;
  //   height: 100%;
  //   background: url('../../assets/images/english_invitation@2x.png') no-repeat;
  //   background-size: 100% 100%;
  //   background-position: center;
  //   overflow-y: auto;
  // }
  .inputs {
    height: 48%;
    // width: 100%;
    // position: absolute;
    // bottom: 1.5rem;
    background: linear-gradient(to right, rgb(241, 117, 53), rgb(246, 86, 35));
    .input_bg {
      position: relative;
      div {
        background: #fdf3d3;
        width: 73%;
        margin: 0.3rem auto;
        margin-top: 0;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        padding-left: 15px;
        input {
          font-size: 14px;
          border: none;
          background: none;
          color: #f65623;
        }
        span {
          font-size: 14px;
        }
      }
      .area_code {
        padding-right: 30px;
        position: relative;
        span {
          &:last-child {
            float: right;
          }
          color: #f65623;
        }
        img {
          width: 7px;
          position: absolute;
          top: 13px;
          right: 15px;
        }
      }
      .phone {
        position: relative;
        .holider {
          position: absolute;
          left: 15px;
          color: #f65623;
          // z-index: 999;
        }
        div {
          z-index: 1;
          width: 3.2rem;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          position: absolute;
          top: 0;
          right: 0;
          margin: 0;
          padding: 0;
          color: #df2843;
          background: url('../../assets/images/button_06_5@2x.png') no-repeat;
          background-size: 100% 100%;
          background-position: center;
          span {
            font-size: 12px;
          }
        }
      }
      .phone_code {
        position: relative;
        .holider {
          position: absolute;
          left: 15px;
          color: #f65623;
        }
        input {
          width: 100%;
          padding-right: 15px;
        }
      }
    }
    .middle_btn {
      width: 73%;
      margin: 0 auto;
      .go_login {
        font-size: 14px;
        float: right;
        color: #fdf3d3;
        margin-bottom: 15px;
      }
      .btn {
        margin: 0;
        clear: both;
        div {
          width: 100%;
          height: 45px;
          background: url('../../assets/images/Group9@2x.png') no-repeat;
          background-size: 100% 100%;
          button {
            width: 100%;
            height: 38px;
            line-height: 38px;
            border: none;
            color: #f75824;
            font-weight: 600;
            background: none;
            font-size: 18px;
          }
        }
      }
      .agree {
        text-align: center;
        margin-top: 10px;
        span {
          font-size: 13px;
          color: #fdf3d3;
        }
      }
    }
  }
}
.phoneCodeVisible {
  position: absolute;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.4);
  width: 100%;
  height: 100vh;
  z-index: 999;
  .phoneCode {
    width: 90%;
    margin: 54% auto;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    position: relative;
    .close {
      width: 40px;
      position: absolute;
      top: -50px;
      right: -6px;
    }
    div {
      &:first-child {
        margin-bottom: 10px;
      }
      font-size: 16px;
      color: #474747;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .txt {
      height: 30px;
      line-height: 30px;
    }
    .button {
      padding: 15px 0 20px 0;
      div {
        &:first-child {
          border: 1px solid #ff5d42;
          background: #fff;
          color: #ff5b41;
          padding: 8px 30px;
          border-radius: 6px;
          margin-right: 10px;
        }
        background: #ff5d42;
        border: none;
        color: #fffcfc;
        border-radius: 6px;
        padding: 9px 30px;
        display: inline-block;
        width: 40%;
      }
    }
  }
}
@media screen and (max-width: 360px) {
  .invitation_register {
    .inputs {
      .input_bg {
        div {
          height: 32px;
          line-height: 32px;
        }
        .phone {
          div {
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            span {
              transform: scale(0.9);
              display: inline-block;
            }
          }
        }
        .area_code {
          img {
            top: 9px;
            right: 12px;
          }
        }
      }
      .middle_btn {
        .btn {
          div {
            height: 40px;
            button {
              height: 35px;
              line-height: 35px;
            }
          }
        }
        .agree {
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}
@media screen and (min-height: 810px) {
  .invitation_register {
    .inputs {
      bottom: 3rem;
      .middle_btn {
        .agree {
          margin-top: 20px;
        }
      }
    }
  }
  .phoneCodeVisible {
    .phoneCode {
      margin: 68% auto;
    }
  }
}
</style>
