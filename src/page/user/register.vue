<template>
  <div class="register">
    <div class="register_first" v-if="next_way==1">
      <div class="header">
        <div class="back" @click="back"><img src="../../assets/icons/icon_arrows_left@2x.png" alt=""></div>
        <div class="title">
          {{registered.title}}
        </div>
      </div>
      <div class="user_register">
        <div class="areacode" @click="setCode">
          <img src="../../assets/icons/goto@2x.png" alt="">
          <span>{{$t('login_index.pm_belong')}}</span>
          <span>+{{areaCode}}</span>
        </div>
        <div class="password">
          <input type="number" v-model="tel" :placeholder="registered.tel_num_err" />
          <div class="img_code" @click="checkImg" v-show="!regDisabled">
            <div v-if="!getCodeSecond">{{registered.popup_box.verify_code}}</div>
            <div v-else>{{registered.popup_box.verify_code_again}}</div>
          </div>
          <div class="send_image" v-show="showLoading">
            <div>
              <img src="../../assets/icons/is_loading.gif" />
            </div>
          </div>
          <div class="send_code" v-show="regDisabled && !showLoading">
            <div>{{limitTime}}s{{$t('sms_login.resend')}}</div>
          </div>

        </div>
        <div class="mCode">
          <input type="text" v-model="mCode" :placeholder="registered.verify_code_err">
          <!-- <div class="right_img"><img src="../../assets/icons/icon_Correct@2x.png" alt=""></div> -->
          <!-- <div class="code_img"><img src="" alt=""></div> -->
        </div>
      </div>
      <div class="login_btn" @click="next">
        <div>{{$t("registered.next_btn")}}</div>
      </div>
      <!--弹窗-->
      <send-message ref="sendMessage" @selfEvent="getTiemOut" :mobile="tel" :globalCode="areaCode" :messageCode="messageCode" @close="closeModel" />
      <!-- <send-message ref="message" @selfEvent="getTiemOut" @close="closeModel"></send-message> -->
    </div>
    <div class="register_second" v-if="next_way==2">
      <div class="phoneHeader">
        <publicHeader :title="registered.title"></publicHeader>
      </div>
      <div class="register_pass">
        <div class="password_second">
          <input type="password" v-model="password" :placeholder="registered.set_pw" v-if="openPass" @blur="keepVal">
          <input type="text" v-model="password" :placeholder="registered.set_pw" v-else @blur="keepVal">
          <span @click="changeType">
            <img src="../../assets/icons/icon_visual_01@2x.png" alt="" v-if="!openPass">
            <img src="../../assets/icons/icon_visual_02@2x.png" alt="" v-else>
          </span>
        </div>
        <div class="password_second">
          <input type="password" v-model="cfmPassword" :placeholder="registered.repeat_pw" v-if="openPassword" @blur="keepCfm">
          <input type="text" v-model="cfmPassword" :placeholder="registered.repeat_pw" v-else @blur="keepCfm">
          <span @click="changeTypes">
            <img src="../../assets/icons/icon_visual_01@2x.png" alt="" v-if="!openPassword">
            <img src="../../assets/icons/icon_visual_02@2x.png" alt="" v-else>
          </span>
        </div>
        <p @click="setInfo">{{$t('login_index.read')}}
          <router-link to="">{{$t('login_index.user_server')}}</router-link>
        </p>
        <div class="login_btn" @click="register_sub">
          <div>{{registered.confirm_btn}}</div>
        </div>
      </div>
    </div>
    <div class="module" v-show="dialogVisible">
      <div class="content">
        <div class="bgImages">
          <img src="../../assets/images/success@2x.png" alt="">
        </div>
        <p>{{registered.complete}}</p>
        <div class="note">{{registered.notes}}</div>
        <div class="button" @click="goHome">
          <a type="button">{{registered.sure}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHeader from '../../components/public_header'
import sendMessage from '../../components/send-message'
import store from '../../store'
import { getCookie } from '../../utils/cookies'
export default {
  name: 'register',
  data() {
    return {
      areaCode: '',
      tel: '',
      mCode: '',
      password: '',
      cfmPassword: '',
      regDisabled: false,
      maskShow: false,
      messageCode: 2,
      limitTime: 60,
      clientType: '2',
      certificate: '',
      timeId: '',
      next_way: 1,
      dialogVisible: false,
      imgCodeShow: '',
      openPass: true,
      openPassword: true,
      showLoading: false,
      timeoutDate: '',
      getCodeSecond: false,
      lang: ''
    }
  },
  components: { sendMessage, publicHeader },
  computed: {
    registered() {
      let registered = this.$t('registered')
      return registered
    }
  },
  mounted() {
    let lang = getCookie('lang')
    this.lang = lang
    let next_way = sessionStorage.getItem('next_way')
    if (next_way) {
      this.next_way = next_way
    } else {
      this.next_way = 1
    }
    let areaCodes = sessionStorage.getItem('area_code')
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes)
    } else {
      this.areaCode = 63
    }
    let nameTel = sessionStorage.getItem('nameTel')
    if (nameTel) {
      this.tel = JSON.parse(nameTel)
    }
    let namemCodes = sessionStorage.getItem('namemCodes')
    if (namemCodes) {
      this.mCode = namemCodes
    }
    let namePas = sessionStorage.getItem('namePas')
    if (namePas) {
      this.password = namePas
    }
    let nameCfmPas = sessionStorage.getItem('nameCfmPas')
    if (nameCfmPas) {
      this.cfmPassword = nameCfmPas
    }
    // 保留倒计时
    let regTime = sessionStorage.getItem('regTime')
    if (regTime) {
      let times = parseInt(regTime) + 60
      let nowTimeout = parseInt(new Date() / 1000)
      this.timeoutDate = parseInt(times - nowTimeout)
      if (this.timeoutDate > 0) {
        this.regDisabled = true
        this.limitTime = this.timeoutDate % 60
        this.timeId = setInterval(() => {
          this.limitTime--
          if (this.limitTime == 0) {
            console.log('----dao---shi ')
            this.regDisabled = false
            clearInterval(this.timeId)
          }
        }, 1000)
      } else {
        clearInterval(this.timeId)
        sessionStorage.removeItem('regTime')
        this.regDisabled = false
        sessionStorage.removeItem('nameTel')
        sessionStorage.removeItem('area_code')
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
      // sessionStorage.removeItem("nameTel");
      sessionStorage.removeItem('namemCodes')
      sessionStorage.removeItem('namePas')
      sessionStorage.removeItem('nameCfmPas')
      sessionStorage.removeItem('regCertificate')
    },
    keepCfm() {
      sessionStorage.setItem('nameCfmPas', this.cfmPassword)
    },
    keepVal() {
      sessionStorage.setItem('namePas', this.password)
    },
    setCode() {
      this.$router.push('/phone_area')
      sessionStorage.setItem('nameTel', this.tel)
      sessionStorage.setItem('namemCodes', this.mCode)
    },
    changeType() {
      this.openPass = !this.openPass
    },
    changeTypes() {
      this.openPassword = !this.openPassword
    },
    checkImg() {
      let self = this
      let userNum = /^\d{3,14}$/
      console.log(this.showLoading)
      let vCodeId = sessionStorage.getItem('vCodeId')
      if (!self.areaCode) {
        let errors = self.$t('registered.areaCode')
        self.toast.error(errors)
        return
      } else if (!self.tel) {
        let telErrors = self.$t('registered.tel_err')
        self.toast.error(telErrors)
        return
      } else if (!userNum.test(self.tel)) {
        let txt = this.$t('login_index.tel_right')
        this.toast.warning(txt)
        return
      }
      this.showLoading = true
      store
        .dispatch('checkImgApi', {
          clientType: self.clientType,
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
              this.showLoading = false
            } else {
              store
                .dispatch('phoneCodeApi', {
                  clientType: self.clientType,
                  globalCode: self.areaCode,
                  mobile: self.tel,
                  module: 3,
                  vCodeId: vCodeId
                })
                .then(res => {
                  console.log(res)
                  if (res.data.code === 1) {
                    self.regDisabled = true
                    this.showLoading = false
                    this.getCodeSecond = true
                    sessionStorage.setItem('nameTel', this.tel)
                    console.log(this.showLoading)
                    self.getTiemOut()
                    self.toast.success(res.data.message)
                  } else {
                    self.toast.error(res.data.message)
                    this.showLoading = false
                  }
                })
                .catch(error => {
                  console.log(error)
                  this.showLoading = false
                })
            }
          } else {
            self.toast.error(res.data.message)
            this.showLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          this.showLoading = false
        })
    },
    openModel() {
      if (!this.regDisabled) {
        this.$refs.sendMessage.open()
        this.$emit('open')
      }
    },
    // 倒计时
    getTiemOut() {
      let timeoutDate = parseInt(new Date() / 1000)
      sessionStorage.setItem('regTime', timeoutDate)
      this.limitTime = 60
      let num = 60
      clearInterval(this.timeId)
      // this.setMsgStatus(true)
      this.regDisabled = true
      if (this.regDisabled) {
        let t1 = parseInt(new Date().getTime() / 1000)
        this.timeId = setInterval(() => {
          let t2 = parseInt(new Date().getTime() / 1000)
          this.limitTime = num - (t2 - t1)
          if (this.limitTime <= 0) {
            // console.log('----dao---shi ')
            this.regDisabled = false
            this.limitTime = 60
            clearInterval(this.timeId)
          }
        }, 1000)
      }
    },
    closeModel() {
      this.maskShow = false
    },
    next() {
      sessionStorage.setItem('nameTel', this.tel)
      sessionStorage.setItem('namemCodes', this.mCode)
      if (!this.tel) {
        let telErrors = this.$t('login_index.tel_err')
        this.toast.error(telErrors)
        return
      }
      if (!this.mCode) {
        let telErrors = this.$t('login_index.verify_err')
        this.toast.error(telErrors)
        return
      }
      store
        .dispatch('checkCodeApi', {
          clientType: this.clientType,
          globalCode: this.areaCode,
          mobile: this.tel,
          mCode: this.mCode
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            clearInterval(this.timeId)
            this.timeId = null
            sessionStorage.removeItem('regTime')
            this.certificate = res.data.data.certificate
            sessionStorage.setItem('regCertificate', this.certificate)
            console.log('222222222222222', this.certificate)
            this.next_way = 2
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    setInfo() {
      sessionStorage.setItem('next_way', this.next_way)
      this.$router.push({
        path: '/service_agreement',
        query: {
          language: this.lang,
          local: 0
        }
      })
      // sessionStorage.setItem("namePas", this.password);
      // sessionStorage.setItem("nameCfmPas", this.cfmPassword);
    },
    register_sub() {
      let userPass = /^[0-9A-Za-z]{6,14}/
      if (!this.password) {
        let passError = this.$t('registered.set_pw_holder')
        this.toast.error(passError)
        return
      } else if (!userPass.test(this.password)) {
        let txt = this.$t('registered.text_pass')
        this.toast.error(txt)
        return
      } else if (!this.cfmPassword) {
        let cfmError = this.$t('registered.repeat_pw_holder')
        this.toast.error(cfmError)
        return
      } else if (!userPass.test(this.cfmPassword)) {
        let txt = this.$t('registered.text_pass')
        this.toast.error(txt)
        return
      } else if (this.password !== this.cfmPassword) {
        let sameError = this.$t(
          'account_and_security.set_payment_pw.inequality'
        )
        this.toast.error(sameError)
        return
      }
      let certificate = sessionStorage.getItem('regCertificate')
      store
        .dispatch('registerApi', {
          certificate: certificate,
          password: this.password,
          cfmPassword: this.cfmPassword
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            sessionStorage.removeItem('area_code')
            // store.state.userInfo.phoneArea = '63'
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            userInfo.phoneArea = '63'
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            sessionStorage.removeItem('next_way')
            sessionStorage.removeItem('nameTel')
            sessionStorage.removeItem('namemCodes')
            sessionStorage.removeItem('namePas')
            sessionStorage.removeItem('nameCfmPas')
            sessionStorage.removeItem('regCertificate')
            this.dialogVisible = true

            this.toast.success(res.data.message)

            // this.$router.push("/");
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped lang="scss">
.register {
  .header {
    text-align: center;
    padding: 15px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #dddddd;
    .back {
      width: 12px;
      float: left;
      margin-top: 2px;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 20px;
      color: #666;
      // display: inline-block;
    }
  }
  .user_register {
    background: #fff;
    padding-top: 3px;
    .areacode {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ededed;
      position: relative;
      img {
        width: 13px;
        position: absolute;
        top: 19px;
        right: 16px;
      }
      span {
        &:last-child {
          float: right;
          padding-right: 15px;
        }
        color: #6e6e6e;
      }
    }
    input {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      width: 100%;
      outline: none;
      border: none;
      display: block;
      padding: 25px 20px;
      border-bottom: 1px solid #ededed;
    }
    .password {
      position: relative;
      .img_code {
        width: 85px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        position: absolute;
        top: 11px;
        right: 15px;
        background: url('../../assets/images/button01@2x.png') no-repeat;
        background-size: 100% 100%;
        background-position: center center;
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
        top: 8px;
        right: 15px;
        background: #b1afaf;
        border: 1px solid #333;
        div {
          width: 100%;
          font-size: 12px;
          // color: #ff644c;
        }
      }
      .send_image {
        width: 85px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        position: absolute;
        top: 11px;
        right: 15px;
        background: #b1afaf;
        border: 1px solid #333;
        div {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.6rem;
          }
        }
      }
    }
    .mCode {
      position: relative;
      .right_img {
        img {
          width: 20px;
          position: absolute;
          top: 10px;
          right: 0.5rem;
        }
      }
    }
  }
  .login_btn {
    margin-top: 0.5rem;
    div {
      border: none;
      background: #ff644c;
      color: #fff;
      margin: 10px;
      padding: 10px;
      font-size: 18px;
      border-radius: 4px;
      width: 94.8%;
      text-align: center;
    }
  }
  .register_second {
    height: 100%;
    .phoneHeader {
      position: fixed;
      width: 100%;
      height: 7%;
      top: 0;
      z-index: 1;
      min-height: 40px;
      border-bottom: 1px solid #ededed;
    }
    .register_pass {
      position: fixed;
      width: 100%;
      top: 7%;
      height: 93%;
      .password_second {
        background: #fff;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        border-bottom: 1px solid #ededed;
        position: relative;
        input {
          border: none;
          width: 85%;
        }
        img {
          width: 25px;
          position: absolute;
          top: 13px;
          right: 15px;
        }
      }
      p {
        font-size: 13px;
        margin-top: 14px;
        text-align: center;
        color: #666;
        a {
          font-size: 13px;
          color: #4a90e2;
        }
      }
      .login_btn {
        margin-top: 30px;
      }
    }
  }
  .module {
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    .content {
      width: 72%;
      background: #fff;
      border-radius: 8px;
      text-align: center;
      padding-top: 90px;
      margin: 50% auto;
      .bgImages {
        img {
          width: 40%;
          position: absolute;
          top: 117px;
          left: 30%;
        }
      }
      p {
        font-size: 16px;
        color: #f5a623;
        margin-bottom: 20px;
      }
      .note {
        color: #999;
        font-size: 14px;
        padding: 0 25px;
      }
      .button {
        margin-top: 20px;
        padding-bottom: 20px;
        a {
          display: inline-block;
          border: none;
          background: #ff644c;
          width: 90%;
          line-height: 35px;
          height: 35px;
          color: #fff;
          font-size: 15px;
          border-radius: 3px;
        }
      }
    }
  }
}
@media screen and (max-width: 329px) {
  .register .module .content .bgImages img {
    top: 105px;
  }
}
@media screen and (min-width: 410px) {
  .register .module .content .bgImages img {
    top: 125px;
  }
}
@media screen and (max-height: 560px) {
  .register .register_second .register_pass {
    top: 40px;
  }
}
</style>
