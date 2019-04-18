<template>
  <div class="merchant_entry">
    <div class="header">
      <div class="back" @click="back">
        <img src="../../assets/icons/icon_arrows_left@2x.png" alt="">
      </div>
      <div class="title">
        {{merchant_entry.title}}
      </div>
    </div>
    <div class="merchant_info">
      <div class="content">
        <div class="notes">{{merchant_entry.notes}}</div>
        <div class="title"><div class="inline"></div><div class="block_fang"></div>{{merchant_entry.contact}}<div class="block_fang"></div><div class="inlines"></div></div>
        <div class="line">
          <input type="text" v-model="name" maxlength="30" :placeholder="merchant_entry.contactPlaceholder" />
        </div>
        <div class="line_radio">
          <div class="radios">
            <input name="sex" type="radio" id="radio_1" value="0" v-model="sex" />{{merchant_entry.Mr}}
            <label for="radio_1">
              <!-- <img src="../../assets/icons/pay_icon_chosen@2x.png" alt="" v-if="isRadio">
                            <img src="../../assets/icons/Oval02@2x.png" alt="" v-else> -->
            </label>
            <!-- <label for="radio_1" class="input_label"></label> -->
          </div>
          <div class="radios">
            <input name="sex" type="radio" id="radio_2" value="1" v-model="sex" />{{merchant_entry.Miss}}
            <label for="radio_2">
              <!-- <img src="../../assets/icons/pay_icon_chosen@2x.png" alt="" v-if="chooseRadio">
                            <img src="../../assets/icons/Oval02@2x.png" alt="" v-else> -->
            </label>
            <!-- <label for="radio_2" class="input_label"></label> -->
          </div>
        </div>
        <div class="line" @click="setCode">
          <img src="../../assets/icons/goto@2x.png" alt="">
          <span>{{merchant_entry.areacode}}</span>
          <span>+{{areaCode}}</span>
        </div>
        <div class="line">
          <input type="number" v-model="tel" :placeholder="merchant_entry.telPlaceholder" />
        </div>
        <div class="code_line">
          <input type="number" v-model="vCode" :placeholder="$t('login_index.verify_code')" />
          <div class="img_code" @click="checkImg" v-if="!entryDisabled">
            <div v-if="!isSecond">{{$t('login_index.verify')}}</div>
            <div v-else>{{$t('registered.popup_box.verify_code_again')}}</div>
          </div>
          <div class="send_code" v-if="showLoading">
            <div><img src="../../assets/icons/is_loading.gif" alt=""></div>
          </div>
          <div class="send_code" v-if="!showLoading && entryDisabled">
              <div>{{limitTime}}s{{$t('sms_login.resend')}}</div>
          </div>
        </div>
        <!--弹窗-->
        <send-message ref="sendMessage" @selfEvent="getTiemOut" :mobile="tel" :globalCode="areaCode" :messageCode="messageCode" @close="closeModel" />
        <div class="title shop_title"><div class="inline"></div><div class="block_fang"></div>{{merchant_entry.sellerAddr}}<div class="block_fang"></div><div class="inlines"></div></div>
        <div class="line">
          <input type="text" v-model="sellerName" :placeholder="merchant_entry.sellerPlaceholder" maxlength="24" />
        </div>
        <div class="line_select" @click="showSelect">
          <span>{{select_province}}</span>
          <img src="../../assets/icons/open@2x.png" alt="">
        </div>
        <div class="line_select" @click="selectCity">
          <span>{{city}}</span>
          <img src="../../assets/icons/open@2x.png" alt="">
        </div>
        <div class="line">
          <input type="text" v-model="address" :placeholder="merchant_entry.sellerAddress" maxlength="150">
        </div>
        <div class="button" @click="submit">
          {{merchant_entry.submit}}
        </div>
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
import store from "@/store";
import sendMessage from "../../components/send-message";
export default {
  name: "merchant_entry",
  data() {
    return {
      name: "",
      sex: "0",
      tel: "",
      sellerName: "",
      areaCode: "63",
      select_province: "",
      city: "",
      address: "",
      provinceVisible: false,
      province: [],
      provinceId: "",
      cityId: "",
      isProvince: true,
      currentIndex: "",
      isProvinceId: false,
      isCityId: false,
      messageCode: 7,
      vCode: "",
      entryDisabled: false,
      timeId: "",
      isSecond: false,
      showLoading: false,
      imgCodeShow: "",
      timeoutDate: "",
      limitTime: 0
    };
  },
  components: { sendMessage },
  created() {
    let merchant_entry = this.$t("merchant_entry");
    this.select_province = merchant_entry.provinces;
    this.city = merchant_entry.city;
  },
  computed: {
    merchant_entry() {
      let merchant_entry = this.$t("merchant_entry");
      return merchant_entry;
    }
  },
  mounted() {
    // this.getAreaRegionList()
    let areaCodes = sessionStorage.getItem("area_code");
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes);
    } else {
      this.areaCode = 63;
    }
    let username = sessionStorage.getItem("username");
    if (username) {
      this.name = username;
    } else {
      this.name = "";
    }
    let sex = sessionStorage.getItem("sex");
    if (sex) {
      this.sex = sex;
    } else {
      this.sex = "0";
    }
    let tel = sessionStorage.getItem("tel");
    if (tel) {
      this.tel = tel;
    } else {
      this.tel = "";
    }
    let sellerName = sessionStorage.getItem("sellerName");
    if (sellerName) {
      this.sellerName = sellerName;
    } else {
      this.sellerName = "";
    }
    let select_province = sessionStorage.getItem("select_province");
    if (select_province) {
      this.select_province = select_province;
    } else {
      this.select_province = "";
    }
    let merchant_city = sessionStorage.getItem("merchant_city");
    if (merchant_city) {
      this.city = merchant_city;
    } else {
      this.city = "";
    }
    let address = sessionStorage.getItem("merchant_address");
    if (address) {
      this.address = address;
    } else {
      this.address = "";
    }
    let province = sessionStorage.getItem("province");
    let provinceId = sessionStorage.getItem("provinceId");
    if (province && provinceId) {
      this.provinceId = provinceId;
      this.select_province = province;
    } else {
      this.select_province = this.$t("merchant_entry.provinces");
      this.provinceId = "";
      this.cityId = "";
      this.city = this.$t("merchant_entry.city");
    }
    let city = sessionStorage.getItem("city");
    let cityId = sessionStorage.getItem("cityId");
    if (city && cityId) {
      this.city = city;
      this.cityId = cityId;
    } else {
      this.cityId = "";
      this.city = this.$t("merchant_entry.city");
    }
    // 保留倒计时
    let entryTime = sessionStorage.getItem("entryTime");
    if (entryTime) {
      let times = parseInt(entryTime) + 60;
      let nowTimeout = parseInt(new Date() / 1000);
      this.timeoutDate = parseInt(times - nowTimeout);
      if (this.timeoutDate > 0) {
        console.log("timeoutdata > 0");
        this.entryDisabled = true;
        this.limitTime = this.timeoutDate % 60;
        this.timeId = setInterval(() => {
          this.limitTime--;
          if (this.limitTime == 0) {
            console.log("----dao---shi ");
            this.entryDisabled = false;
            clearInterval(this.timeId);
          }
        }, 1000);
      } else {
        this.entryDisabled = false;
        clearInterval(this.timeId);
        sessionStorage.removeItem("entryTime");
        console.log("remove");
        sessionStorage.removeItem("area_code")
      }
    }
  },
  methods: {
    isEmojiCharacter(substring) {
      for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true;
            }
          }
        } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          if (ls == 0x20e3) {
            return true;
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            return true;
          } else if (0x2b05 <= hs && hs <= 0x2b07) {
            return true;
          } else if (0x2934 <= hs && hs <= 0x2935) {
            return true;
          } else if (0x3297 <= hs && hs <= 0x3299) {
            return true;
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
            return true;
          }
        }
      }
    },
    checkImg() {
      let self = this;
      let userNum = /^\d{2,19}$/;
      let vCodeId = sessionStorage.getItem("vCodeId");
      console.log("vCodeId",vCodeId)
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
          module: 7
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
                  module: 7,
                  vCodeId: vCodeId
                })
                .then(res => {
                  console.log(res);
                  if (res.data.code === 1) {
                    self.entryDisabled = true;
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
      if (!this.entryDisabled) {
        this.$refs.sendMessage.open();
        this.$emit("open");
      }
    },
    // 倒计时
    getTiemOut() {
      let timeoutDate = parseInt(new Date() / 1000);
      sessionStorage.setItem("entryTime", timeoutDate);
      // if (!this.$refs.inputVal.value || this.disabled) return
      this.limitTime = 60;
      let num = 60;
      clearInterval(this.timeId);
      // this.setMsgStatus(true)
      this.entryDisabled = true;
      if (this.entryDisabled) {
        let t1 = parseInt(new Date().getTime() / 1000);
        this.timeId = setInterval(() => {
          let t2 = parseInt(new Date().getTime() / 1000);
          this.limitTime = num - (t2 - t1);
          if (this.limitTime <= 0) {
            // console.log('----dao---shi ')
            this.entryDisabled = false;
            this.limitTime = 60;
            clearInterval(this.timeId);
          }
        }, 1000);
      }
    },
    closeModel() {
      this.maskShow = false;
    },
    getAreaRegionList() {
      store.dispatch("getAreaRegionList").then(res => {
        if (res.data.code == 1) {
          this.province = res.data.data;
        }
      });
    },
    getAreaCityList(id) {
      console.log(id);
      store
        .dispatch("getAreaCityList", {
          regionId: id
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(111111);
            this.province = res.data.data;
          }
        });
    },
    back() {
      this.$router.go(-1);
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("sex");
      sessionStorage.removeItem("tel");
      sessionStorage.removeItem("sellerName");
      sessionStorage.removeItem("select_province");
      sessionStorage.removeItem("merchant_city");
      sessionStorage.removeItem("merchant_address");
      sessionStorage.removeItem("area_code");
      sessionStorage.removeItem("city");
      sessionStorage.removeItem("cityId");
      sessionStorage.removeItem("provinceId");
      sessionStorage.removeItem("province");
    },
    setCode() {
      sessionStorage.setItem("username", this.name);
      sessionStorage.setItem("sex", this.sex);
      sessionStorage.setItem("tel", this.tel);
      sessionStorage.setItem("sellerName", this.sellerName);
      sessionStorage.setItem("select_province", this.select_province);
      sessionStorage.setItem("merchant_city", this.city);
      sessionStorage.setItem("merchant_address", this.address);
      this.$router.push("/phone_area");
    },
    showSelect() {
      this.getAreaRegionList();
      this.provinceVisible = true;
      this.isProvince = true;
      this.currentIndex = "";
      this.cityId = "";
    },
    selectProvince(index) {
      this.currentIndex = index;
      if (this.isProvince) {
        this.select_province = this.province[index].name;
        this.provinceId = this.province[index].id;
        console.log("==========", this.province[index].id);
      } else {
        console.log(this.province[index].name);
        this.city = this.province[index].name;
        this.cityId = this.province[index].id;
      }
      // this.provinceVisible = false
    },
    finish() {
      if (this.isProvince) {
        if (this.provinceId) {
          this.provinceVisible = false;
          this.cityId = "";
          this.city = this.$t("merchant_entry.city");
          this.getAreaCityList(this.provinceId);
        } else {
          let provinceError = this.$t("merchant_entry.provinces");
          this.toast.warning(provinceError);
          this.getAreaRegionList();
        }
        sessionStorage.setItem("province", this.select_province);
        sessionStorage.setItem("provinceId", this.provinceId);
        sessionStorage.removeItem("city");
        sessionStorage.removeItem("cityId");
      } else {
        if (this.cityId) {
          this.provinceVisible = false;
        } else {
          let cityError = this.$t("merchant_entry.city");
          this.toast.warning(cityError);
          this.getAreaCityList(this.provinceId);
        }
        this.cityId;
        sessionStorage.setItem("city", this.city);
        sessionStorage.setItem("cityId", this.cityId);
      }
    },
    selectCity() {
      this.currentIndex = "";
      if (this.provinceId) {
        this.getAreaCityList(this.provinceId);
        this.isProvince = false;
        this.provinceVisible = !this.provinceVisible;
      } else {
        let provinceError = this.$t("merchant_entry.provinces");
        this.toast.warning(provinceError);
        return;
      }
      this.isCityId = true;
    },
    cancel() {
      if (this.isProvince) {
        let province = sessionStorage.getItem("province");
        let provinceId = sessionStorage.getItem("provinceId");
        if (province && provinceId) {
          this.provinceId = provinceId;
          this.select_province = province;
        } else {
          this.select_province = this.$t("merchant_entry.provinces");
          this.provinceId = "";
          this.cityId = "";
          this.city = this.$t("merchant_entry.city");
        }
      } else {
        let city = sessionStorage.getItem("city");
        let cityId = sessionStorage.getItem("cityId");
        if (city && cityId) {
          this.city = city;
          this.cityId = cityId;
        } else {
          this.cityId = "";
          this.city = this.$t("merchant_entry.city");
        }
      }
      this.currentIndex = "";
      this.provinceVisible = false;
      this.isProvince = false;
    },
    submit() {
      let names = /^[\u4E00-\u9FFFA-Za-z]{2,30}$/;
      let userNum = /^\d{2,19}$/;
      if (!this.name) {
        let warnText = this.$t("merchant_entry.contactPlaceholder");
        this.toast.warning(warnText);
        return;
      } else if (!this.tel) {
        let warnText = this.$t("merchant_entry.telPlaceholder");
        this.toast.warning(warnText);
        return;
      } else if (!userNum.test(this.tel)) {
        let warnText = this.$t("merchant_entry.tel_right");
        this.toast.warning(warnText);
        return;
      } else if (!this.sellerName) {
        let warnText = this.$t("merchant_entry.sellerPlaceholder");
        this.toast.warning(warnText);
        return;
      } else if (!names.test(this.name)) {
        let warnText = this.$t("merchant_entry.user_right");
        this.toast.warning(warnText);
        return;
      } else if (!this.provinceId) {
        let warnText = this.$t("merchant_entry.provinces");
        this.toast.warning(warnText);
        return;
      } else if (!this.cityId) {
        let warnText = this.$t("merchant_entry.city");
        this.toast.warning(warnText);
        return;
      } else if (!this.address) {
        let warnText = this.$t("merchant_entry.sellerAddress");
        this.toast.warning(warnText);
        return;
      }
      if (
        this.isEmojiCharacter(this.name) ||
        this.isEmojiCharacter(this.sellerName) ||
        this.isEmojiCharacter(this.address)
      ) {
        let textErrors = this.$t("suggestion.emoticons");
        this.toast.error(textErrors);
        return;
      }
      store
        .dispatch("merchantApi", {
          userName: this.name,
          sex: this.sex,
          tel: this.tel,
          globalCode: this.areaCode,
          sellerName: this.sellerName,
          regionId: this.provinceId,
          city: this.cityId,
          location: this.address,
          entrySource: 2,
          clientType: 2,
          mCode: this.vCode
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            let successText = this.$t("merchant_entry.success");
            this.toast.success(successText);
            this.$router.push("/user");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("sex");
            sessionStorage.removeItem("area_code");
            sessionStorage.removeItem("city");
            sessionStorage.removeItem("cityId");
            sessionStorage.removeItem("provinceId");
            sessionStorage.removeItem("province");
            sessionStorage.removeItem("entryTime");
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
.merchant_entry {
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
      font-size: 16px;
      color: #333;
    }
  }
  .merchant_info {
    background: #fff;
    height: 93%;
    overflow-y: auto;
    .notes {
      color: #999;
      font-size: 13px;
      padding: 1vh 15px;
    }
    .title {
      color: #ff644d;
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .inline {
        width: 55px;
        height: 1px;
        background: linear-gradient(to right, #ffffff, #ff644d);
      }
      .inlines {
        width: 55px;
        height: 1px;
        background: linear-gradient(to right, #ff644d, #ffffff);
      }
      .block_fang {
        width: 8px;
        height: 8px;
        background: #ff4c28;
        transform: rotate(45deg);
        margin: 0 5px;
      }
    }
    .shop_title {
      margin-top: 12px;
    }
    .line {
      padding: 0 15px;
      height: 5.5vh;
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
      }
      img {
        width: 13px;
        position: absolute; // top: 1.9vh;
        right: 15px;
      }
    }
    .code_line {
      padding: 0 15px;
      height: 5.5vh;
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
    .button {
      width: 93%;
      margin: 1rem auto;
      border: none;
      border-radius: 4px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #fff;
      background: #ff644c;
    }
    .line_radio {
      padding: 0 15px;
      height: 5.5vh;
      display: flex;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      .radios {
        display: inline-block;
        position: relative;
        line-height: 30px;
        margin-left: 25px;
        input[type="radio"] {
          width: 28px;
          height: 20px;
          opacity: 0;
        }
        label {
          position: absolute;
          left: 5px;
          top: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #999;
        }
        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        input:checked + label {
          background-color: #fe6d32;
          border: 1px solid #fe6d32;
        }

        input:checked + label::after {
          position: absolute;
          content: "";
          width: 5px;
          height: 10px;
          top: 1px;
          left: 4px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
      } //   .radios {
      //     display: inline-block;
      //     margin-left: 60px;
      //     input {
      //       display: none;
      //     }
      //     img {
      //       width: 16px;
      //       margin-bottom: -2px;
      //       margin-right: 5px;
      //     }
      //   }
    }
    .line_select {
      padding: 0 15px;
      height: 5.5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 36px;
      border-bottom: 1px solid #ededed;
      position: relative;
      img {
        width: 15px;
        position: absolute; // top: 2vh;
        right: 15px;
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
      height: 42.4vh;
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
        height: 34.4vh;
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
      height: 37vh;
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
        height: 29vh;
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