<template>
  <div class="rider_recruit">
    <div class="header">
      <div class="back" @click="back">
        <img src="../../assets/icons/icon_arrows_left@2x.png" alt="">
      </div>
      <div class="title">
        {{rider_recruitment.title}}
      </div>
    </div>
    <div class="rider_content">
      <div class="rider_bg" v-if="!isEnglish"><img src="../../assets/images/driver_bg_zh@2x.png" alt=""></div>
      <div class="rider_bg" v-else><img src="../../assets/images/driver_bg_zh@2x.png" alt=""></div>
      <div class="content">
        <div class="line" @click="setCode">
          <img src="../../assets/icons/goto@2x.png" alt="">
          <span>{{$t('merchant_entry.areacode')}}</span>
          <span>+{{areaCode}}</span>
        </div>
        <div class="line">
          <input type="number" v-model="tel" :placeholder="$t('merchant_entry.telPlaceholder')" />
          <div class="img_code" @click="checkImg" v-if="!riderDisabled">
            <div v-if="!isSecond">{{$t('login_index.verify')}}</div>
            <div v-else>{{$t('registered.popup_box.verify_code_again')}}</div>
          </div>
          <div class="send_code" v-if="showLoading">
            <div><img src="../../assets/icons/is_loading.gif" alt=""></div>
          </div>
          <div class="send_code" v-if="!showLoading && riderDisabled">
              <div>{{limitTime}}s{{$t('sms_login.resend')}}</div>
          </div>
        </div>
        <div class="code_line">
          <input type="number" v-model="vCode" :placeholder="$t('login_index.verify_code')" />
        </div>
        <!-- 弹窗 -->
        <send-message ref="sendMessage" @selfEvent="getTiemOut" :mobile="tel" :globalCode="areaCode" :messageCode="messageCode" @close="closeModel" />
      </div>
      <div class="button" @click="submit">
        {{rider_recruitment.join}}
      </div>
      <div class="notes_rider">{{rider_recruitment.note}}</div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import sendMessage from "../../components/send-message";
import { getCookie } from "../../utils/cookies";
export default {
  name: "rider_recruit",
  data() {
    return {
      tel: "",
      areaCode: "63",
      messageCode: 8,
      vCode: "",
      riderDisabled: false,
      timeId: "",
      isSecond: false,
      showLoading: false,
      imgCodeShow: "",
      timeoutDate: "",
      limitTime: 0,
      isEnglish: false
    };
  },
  components: { sendMessage },
  created() {
    let rider_recruitment = this.$t("rider_recruitment");
    this.select_province = rider_recruitment.provinces;
    this.city = rider_recruitment.city;
  },
  computed: {
    rider_recruitment() {
      let rider_recruitment = this.$t("rider_recruitment");
      return rider_recruitment;
    }
  },
  mounted() {
    // this.getAreaRegionList()
    let lang = getCookie("lang");
    if (lang == "en") {
      this.isEnglish = true;
    } else {
      this.isEnglish = false;
    }
    let areaCodes = sessionStorage.getItem("area_code");
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes);
    } else {
      this.areaCode = 63;
    }
    let tel = sessionStorage.getItem("tel");
    if (tel) {
      this.tel = tel;
    } else {
      this.tel = "";
    }
    // 保留倒计时
    let riderTime = sessionStorage.getItem("riderTime");
    if (riderTime) {
      let times = parseInt(riderTime) + 60;
      let nowTimeout = parseInt(new Date() / 1000);
      this.timeoutDate = parseInt(times - nowTimeout);
      if (this.timeoutDate > 0) {
        console.log("timeoutdata > 0");
        this.riderDisabled = true;
        this.limitTime = this.timeoutDate % 60;
        this.timeId = setInterval(() => {
          this.limitTime--;
          if (this.limitTime == 0) {
            console.log("----dao---shi ");
            this.riderDisabled = false;
            clearInterval(this.timeId);
          }
        }, 1000);
      } else {
        this.riderDisabled = false;
        clearInterval(this.timeId);
        sessionStorage.removeItem("riderTime");
        console.log("remove");
        sessionStorage.removeItem("area_code");
      }
    }
  },
  methods: {
    checkImg() {
      let self = this;
      let userNum = /^\d{2,19}$/;
      let vCodeId = sessionStorage.getItem("vCodeId");
      console.log("vCodeId", vCodeId);
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
          clientType: 2,
          globalCode: self.areaCode,
          mobile: self.tel,
          module: 8
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
                  clientType: 2,
                  globalCode: self.areaCode,
                  mobile: self.tel,
                  module: 8,
                  vCodeId: vCodeId
                })
                .then(res => {
                  console.log(res);
                  if (res.data.code === 1) {
                    self.riderDisabled = true;
                    self.isSecond = true;
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
      if (!this.riderDisabled) {
        this.$refs.sendMessage.open();
        this.$emit("open");
      }
    },
    // 倒计时
    getTiemOut() {
      let timeoutDate = parseInt(new Date() / 1000);
      sessionStorage.setItem("riderTime", timeoutDate);
      // if (!this.$refs.inputVal.value || this.disabled) return
      this.limitTime = 60;
      let num = 60;
      clearInterval(this.timeId);
      // this.setMsgStatus(true)
      this.riderDisabled = true;
      if (this.riderDisabled) {
        let t1 = parseInt(new Date().getTime() / 1000);
        this.timeId = setInterval(() => {
          let t2 = parseInt(new Date().getTime() / 1000);
          this.limitTime = num - (t2 - t1);
          if (this.limitTime <= 0) {
            // console.log('----dao---shi ')
            this.riderDisabled = false;
            this.limitTime = 60;
            clearInterval(this.timeId);
          }
        }, 1000);
      }
    },
    closeModel() {
      this.maskShow = false;
    },
    back() {
      this.$router.go(-1);
      sessionStorage.removeItem("tel");
      sessionStorage.removeItem("area_code");
    },
    setCode() {
      sessionStorage.setItem("tel", this.tel);
      this.$router.push("/phone_area");
    },
    submit() {
      let names = /^[\u4E00-\u9FFFA-Za-z]{2,30}$/;
      let userNum = /^\d{2,19}$/;
      if (!this.tel) {
        let warnText = this.$t("merchant_entry.telPlaceholder");
        this.toast.warning(warnText);
        return;
      } else if (!userNum.test(this.tel)) {
        let warnText = this.$t("merchant_entry.tel_right");
        this.toast.warning(warnText);
        return;
      } else if (!this.vCode) {
        let warnText = this.$t("login_index.verify_err");
        this.toast.warning(warnText);
        return;
      }
      store
        .dispatch("deliveryRecruitApi", {
          mobile: this.tel,
          globalCode: this.areaCode,
          clientType: 2,
          mCode: this.vCode
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.$router.push("/rider_recruit_info");
            sessionStorage.removeItem("area_code");
            sessionStorage.removeItem("tel");
            sessionStorage.removeItem("riderTime");
          } else {
            this.toast.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.rider_recruit {
  height: 100vh;
  .header {
    height: 7%; // line-height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #dddddd;
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
  .rider_content {
    background: #fff;
    height: 93%;
    overflow-y: auto;
    .rider_bg {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .content {
      margin-left: 10px;
    }
    .title {
      color: #ff644d;
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .line {
      padding: 0 15px;
      height: 6.5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      position: relative;
      input {
        border: none;
        width: 100%;
        font-size: 15px;
      }
      span {
        &:last-child {
          float: right;
          margin-right: 20px;
        }
        font-size: 15px;
        color: #6e6e6e;
      }
      img {
        width: 13px;
        position: absolute; // top: 1.9vh;
        right: 15px;
      }
      .img_code {
        width: 85px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        position: absolute;
        right: 15px;
        background: url("../../assets/images/button01@2x.png") no-repeat;
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
    .code_line {
      padding: 0 15px;
      height: 6.5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      position: relative;
      input {
        border: none;
        width: 70%;
        font-size: 15px;
      }
    }
    .button {
      width: 93%;
      margin: 1rem auto;
      margin-bottom: 0.5rem;
      border: none;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #ff644c;
    }
    .notes_rider {
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>