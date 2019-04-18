<template>
    <div class="forget">
        <div class="forget_first">
            <div class="header">
                <div class="back" @click="back"><img src="../../assets/icons/icon_arrows_left@2x.png" alt=""></div>
                <div class="title">
                    {{$t('login_index.forgot_pw')}}
                </div>
            </div>
            <div class="user_register">
                <div class="areacode" @click="setCode">
                    <img src="../../assets/icons/goto@2x.png" alt="">
                    <span>{{$t('login_index.pm_belong')}}</span>
                    <span>+{{areaCode}}</span>
                </div>
                <div class="password">
                    <input type="number" v-model="tel" :placeholder="$t('login_index.tel_err')" @blur="keepMess" />
                    <div class="img_code" @click="checkImg" v-if="!forgetDisabled">
                        <div v-if="!isSecond">{{$t('login_index.verify')}}</div>
                        <div v-else>{{$t('registered.popup_box.verify_code_again')}}</div>
                    </div>
                    <div class="send_code" v-if="showLoading">
                        <div><img src="../../assets/icons/is_loading.gif" alt=""></div>
                    </div>
                    <div class="send_code" v-if="!showLoading && forgetDisabled">
                        <div>{{limitTime}}s{{$t('sms_login.resend')}}</div>
                    </div>
                </div>
                <div class="mCode">
                    <input type="text" v-model="mCode" :placeholder="$t('login_index.verify_code')" @blur="keepCode">
                    <!-- <div class="right_img"><img src="../../assets/icons/icon_Correct@2x.png" alt=""></div> -->
                    <!-- <div class="code_img"><img src="" alt=""></div> -->
                </div>
            </div>
            <div class="login_btn" @click="next">
                <div>{{$t('login_index.next')}}</div>
            </div>
            <!--弹窗-->
            <send-message ref="sendMessage" @selfEvent="getTiemOut" :mobile="tel" :globalCode="areaCode" :messageCode="messageCode" @close="closeModel" />
        </div>
    </div>
</template>
<script>
// import publicHeader from '../../components/public_header'
import sendMessage from "../../components/send-message";
import store from "../../store";
export default {
  name: "forget_password",
  data() {
    return {
      areaCode: "",
      tel: "",
      mCode: "",
      forgetDisabled: false,
      maskShow: false,
      clientType: "2",
      limitTime: 60,
      timeId: "",
      certificate: "",
      messageCode: 3,
      timeoutDate: "",
      isSecond: false,
      showLoading: false
    };
  },
  components: { sendMessage },
  computed: {
    // login_index() {
    //     let login_index = this.$t('login_index')
    //     return login_index
    // }
  },
  computed: {},
  mounted() {
    let areaCodes = sessionStorage.getItem("area_code");
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes);
    } else {
      this.areaCode = 63;
    }
    let username = sessionStorage.getItem("forgetName");
    if (username) {
      this.tel = JSON.parse(username);
      console.log(this.tel);
    }
    let namemCode = sessionStorage.getItem("namemCode");
    if (namemCode) {
      this.mCode = namemCode;
    }
    // 保留倒计时
    let forgetTime = sessionStorage.getItem("forgetTime");
    if (forgetTime) {
      let times = parseInt(forgetTime) + 60;
      let nowTimeout = parseInt(new Date() / 1000);
      this.timeoutDate = parseInt(times - nowTimeout);
      if (this.timeoutDate > 0) {
        console.log("timeoutdata > 0");
        this.forgetDisabled = true;
        this.limitTime = this.timeoutDate % 60;
        this.timeId = setInterval(() => {
          this.limitTime--;
          if (this.limitTime == 0) {
            console.log("----dao---shi ");
            this.forgetDisabled = false;
            clearInterval(this.timeId);
          }
        }, 1000);
      } else {
        this.forgetDisabled = false;
        clearInterval(this.timeId)
        sessionStorage.removeItem("forgetTime")
        console.log("remove");
        sessionStorage.removeItem("forgetName");
        sessionStorage.removeItem("area_code");
        sessionStorage.removeItem("namemCode");
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
      // sessionStorage.removeItem('forgetName')
      // sessionStorage.removeItem('area_code')
      // sessionStorage.removeItem('namemCode')
    },
    keepMess() {
      sessionStorage.setItem("forgetName", this.tel);
    },
    keepCode() {
      sessionStorage.setItem("namemCode", this.mCode);
    },
    setCode() {
      this.$router.push("/phone_area");
      sessionStorage.setItem("forgetName", this.tel);
      sessionStorage.setItem("namemCode", this.mCode);
    },
    checkImg() {
      let self = this;
      let userNum = /^\d{3,14}$/;
      let vCodeId = sessionStorage.getItem("vCodeId");
      if (!self.areaCode) {
        let errors = self.$t("registered.areaCode");
        self.toast.error(errors);
        return;
      } else if (!self.tel) {
        let telErrors = self.$t("registered.tel_err");
        self.toast.error(telErrors);
        return;
      } else if (!userNum.test(self.tel)) {
        let txt = this.$t("login_index.tel_right");
        this.toast.warning(txt);
        return;
      }
      self.showLoading = true;
      store
        .dispatch("checkImgApi", {
          clientType: self.clientType,
          globalCode: self.areaCode,
          mobile: self.tel,
          module: 2
        })
        .then(res => {
          console.log("1111111111", res);
          if (res.data.code === 1) {
            self.imgCodeShow = res.data.data;
            if (self.imgCodeShow == "true") {
              self.openModel();
              this.showLoading = false;
            } else {
              store
                .dispatch("phoneCodeApi", {
                  clientType: self.clientType,
                  globalCode: self.areaCode,
                  mobile: self.tel,
                  module: 2,
                  vCodeId: vCodeId
                })
                .then(res => {
                  console.log(res);
                  if (res.data.code === 1) {
                    self.forgetDisabled = true;
                    this.isSecond = true;
                    self.showLoading = false;
                    self.getTiemOut();
                    self.toast.success(res.data.message);
                  } else {
                    self.showLoading = false;
                    self.toast.error(res.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          } else {
            self.toast.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    openModel() {
      if (!this.forgetDisabled) {
        this.$refs.sendMessage.open();
        this.$emit("open");
      }
    },
    // 倒计时
    getTiemOut() {
      let timeoutDate = parseInt(new Date() / 1000);
      sessionStorage.setItem("forgetTime", timeoutDate);
      // if (!this.$refs.inputVal.value || this.disabled) return
      this.limitTime = 60;
      let num = 60;
      clearInterval(this.timeId);
      // this.setMsgStatus(true)
      this.forgetDisabled = true;
      if (this.forgetDisabled) {
        let t1 = parseInt(new Date().getTime() / 1000);
        this.timeId = setInterval(() => {
          let t2 = parseInt(new Date().getTime() / 1000);
          this.limitTime = num - (t2 - t1);
          if (this.limitTime <= 0) {
            // console.log('----dao---shi ')
            this.forgetDisabled = false;
            this.limitTime = 60;
            clearInterval(this.timeId);
          }
        }, 1000);
      }
    },
    closeModel() {
      this.maskShow = false;
    },
    next() {
      if (!this.tel) {
        let telErrors = this.$t("login_index.tel_err");
        this.toast.error(telErrors);
        return;
      }
      if (!this.mCode) {
        let telErrors = this.$t("login_index.verify_err");
        this.toast.error(telErrors);
        return;
      }
      store
        .dispatch("checkCodeRegApi", {
          clientType: this.clientType,
          globalCode: this.areaCode,
          mobile: this.tel,
          mCode: this.mCode
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.certificate = res.data.data.certificate;
            sessionStorage.setItem("certificate", this.certificate);
            clearInterval(this.timeId);
            this.timeId = null;
            sessionStorage.removeItem("forgetTime");
            sessionStorage.removeItem("forgetName");
            sessionStorage.removeItem("namemCode");
            sessionStorage.removeItem("area_code");
            console.log("222222222222222", this.certificate);
            this.$router.push("/retrieve_password");
          } else {
            this.toast.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  //   beforeDestroy() {
  //     clearInterval(this.timeId);
  //     this.timeId = null;
  //   }
};
</script>
<style scoped lang="scss">
.forget {
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
        background: url("../../assets/images/button01@2x.png") no-repeat;
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
        top: 11px;
        right: 15px;
        background: #b1afaf;
        border: 1px solid #333;
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
}
</style>
