<template>
  <div class="invite_box">
      <div class="header_box">
          <opacityHeader rightBtn="活动规则" @rightBtnFn="right_btn_fn" v-if="!englishVisible"></opacityHeader>
          <opacityHeader rightBtn="Activity Rules" @rightBtnFn="right_btn_fn" v-else></opacityHeader>
      </div>
      <div class="top_bg">
          <div class="invite_coupon">
              <div class="coupon_info">
                  <div class="coupon_info_top clearFloat" v-if="invite_a_prize.invitationActivity.fullReductionMoney">
                      <div class="coupon_condition">
                          <span>{{invite_a_prize.invitationActivity.money}}</span><span>P</span>
                          <span v-if="!englishVisible">(满{{invite_a_prize.invitationActivity.fullReductionMoney}}可用)</span>
                          <span v-else>(Avallable at full{{invite_a_prize.invitationActivity.fullReductionMoney}})</span>
                      </div>
                  </div>
                  <div class="coupon_info_top" v-else>
                      <div class="notTitle">
                          <div class="titles" v-if="!englishVisible">
                              无门槛
                          </div>
                          <div class="titleEn" v-else>
                              <div>Free</div>
                              <div>coupon</div>
                          </div>
                          <div class="right" v-if="!englishVisible">
                              <div class="pingtai">平台</div>
                              <div class="youhui">优惠券</div>
                          </div>
                          <div class="right" v-else>
                              <div class="pingtai">Platform</div>
                              <div class="youhui">coupons</div>
                          </div>
                      </div>
                  </div>
                  <div class="condition" v-if="!englishVisible">
                    每邀请一个好友下单可得
                  </div>
                  <div class="condition" v-else>
                    Invite a friend to order
                  </div>
              </div>
              <div class="coupon_num" v-if="invite_a_prize.invitationActivity.fullReductionMoney">
                  <div v-if="!englishVisible">
                      <div class="coupon_type">
                          平台
                      </div>
                      <div class="coupon_content">
                          优惠券
                      </div>
                  </div>
                  <div v-else>
                      <div class="coupon_type">
                          Platform
                      </div>
                      <div class="coupon_content">
                          coupons
                      </div>
                  </div>
              </div>
              <div class="coupon_nums" v-else>
                  <div class="coupons"><span>{{invite_a_prize.invitationActivity.money}}</span><span class="moneys">P</span></div>
              </div>
              <div class="invite_btn" @click="invite" v-if="!englishVisible">
                  立即邀请
              </div>
              <div class="invite_btn" @click="invite" v-else>
                  Invitate now
              </div>
          </div>
      </div>

      <div class="body_box">
          <div class="my_profit">
              <div class="box_title" v-if="!englishVisible">
                  我的收益
              </div>
              <div class="box_title" v-else>
                  My income
              </div>
              <div class="my_profit_body clearFloat">
                  <div>
                      <p v-if="!englishVisible">
                          邀请收益
                      </p>
                      <p v-else>
                          Invite earnings
                      </p>
                      <p class="profit_num">
                          <span>{{invite_a_prize.moneyAll || 0}}</span> P
                      </p>
                  </div>
                  <div>
                      <p v-if="!englishVisible">
                          成功邀请人数
                      </p>
                      <p v-if="englishVisible">
                          Successful applicants
                      </p>
                      <p class="invite_people_num"  v-if="!englishVisible">
                          <span>{{invite_a_prize.numberAll || 0}}</span> 人
                      </p>
                      <p class="invite_people_num"  v-if="englishVisible">
                          <span>{{invite_a_prize.numberAll || 0}}</span>
                      </p>
                  </div>
              </div>
          </div>
          <div class="profit_details">
              <div class="box_title" v-if="!englishVisible">
                  邀请记录
              </div>
              <div class="box_title" v-else>
                  Invitation record
              </div>
              <div class="invitation_tab">
                <div class="invit_success_tab" :class="{active : invit_active === 1}" @click="invitationActivityList(1)">
                  <span v-if="!englishVisible">邀请成功</span>
                  <span v-else>Invitation success</span>
                </div>
                <div class="invit_not" :class="{active : invit_active === 2}" @click="invitationActivityList(2)">
                  <span v-if="!englishVisible">好友尚未下单</span>
                  <span v-else>No order</span>
                </div>
              </div>
              <div class="loading_list" v-if="inviteLoad">
                <img src="../assets/icons/is_loading.gif" alt="">
              </div>
              <div class="invit_success" v-show="invit_active===1 && !inviteLoad && (invitSellerList.length != 0)">
                <div class="success_record" v-for="(item, index) in invitSellerList" :key="index">
                  <div class="invit_phone">
                    <span>被邀请人手机号码：{{item.tel}}</span>
                    <span>{{item.money}}P</span>
                  </div>
                  <div class="invit_time">
                    <span>{{$formatDateTime(item.createTime, 'ymd')}}送达</span>
                    <span>已发放</span>
                  </div>
                </div>
              </div>
              <!-- <div class="empty_invit" v-show="!invitSellerList">
                <div v-if="!englishVisible">暂无数据</div>
                <div v-else>No data</div>
              </div> -->
              <div class="invit_success" v-show="invit_active===2 && !inviteLoad && (invitSellerList.length != 0)">
                <div class="no_record" v-for="(item, index) in invitSellerList" :key="index">
                  <div class="invit_phone">
                    <div>被邀请人手机号码：{{item.tel}}</div>
                    <div class="time">{{$formatDateTime(item.createTime, 'ymd')}}注册</div>
                  </div>
                  <div class="invit_price">{{item.money}}P</div>
                </div>
              </div>
              <div class="empty_invit" v-show="(invitSellerList.length == 0) && !inviteLoad">
                <div v-if="!englishVisible">暂无数据</div>
                <div v-else>No data</div>
              </div>
                <!-- 列表数据 -->
              <!-- <div class="profit_details_body" v-if="!invite_a_prize.invitationRecird">
                  <div class="profit_details_list" v-for="(item, index) in invite_a_prize.invitationRecird" :key="index">
                      <div class="p_d_l_top" v-if="!englishVisible">
                          被邀请人手机号码: {{item.remark}}
                      </div>
                      <div class="p_d_l_top" v-if="englishVisible">
                          Invitee: {{item.remark}}
                      </div>
                      <div class="p_d_l_bottom" v-if="!englishVisible">
                          邀请时间: {{$formatDateTime(item.createTime)}}
                      </div>
                      <div class="p_d_l_bottom" v-if="englishVisible">
                          Invite time: {{$formatDateTime(item.createTime)}}
                      </div>
                      <div class="amount">
                          {{item.money}}P
                      </div>
                  </div>
              </div> -->
              <!-- <div class="no_message" v-if="invite_a_prize.invitationRecird == false"> -->
              <!-- <div class="no_message" v-else>
                <div v-if="!englishVisible">暂无数据</div>
                <div v-else>No data</div>
              </div> -->
          </div>
      </div>

      <!-- 遮罩 -->
      <!-- <div class="task_box" v-show="this.show_share_box">sdf</div>
      <div class="share_box" v-show="this.show_share_box">
          <div class="share_methods">
              <div class="share_methods_box">
                  <div @click="share_to_wechat">
                      <div class="shaer_methods_img">
                          <img src="../assets/images/share_wechat.png" />
                      </div>
                      微信
                  </div>
              </div>
              <div class="share_methods_box">
                  <div @click="share_to_friends">
                      <div class="shaer_methods_img">
                          <img src="../assets/images/share_friends.png" />
                      </div>
                      朋友圈
                  </div>
              </div>
          </div>
          <div class="share_box_btn" @click="show_share_box=false">
              取消
          </div>
      </div> -->
  </div>
</template>

<script>
// import wx from 'weixin-js-sdk'
import store from "../store";
import { setCookie, getCookie, removeCookie } from "../utils/cookies";
import opacityHeader from "../components/opacity_header.vue";
export default {
  name: "invite_a_prize",
  data() {
    return {
      // show_share_box: false,
      // invite_a_prize: {}
      englishVisible: false,
      shareJson: {},
      userID: "",
      invit_active: 1,
      currentPage: 1,
      showCount: 6,
      totalPage: "",
      invitLoading: true,
      invitSellerList: [],
      inviteLoad: false
    };
  },
  components: {
    opacityHeader
  },
  computed: {
    invite_a_prize() {
      return store.state.invite_a_prize;
    }
  },
  created() {
    // console.log(this.$route.params);
    // setCookie('tokenKey', this.$route.params.tokenKey);
    // setCookie("tokenKey", this.$route.query.tokenKey);
    // 获取邀请数据
    let tokenKey = "";
    this.$axios
      .post("/openservice/invitationActivityInfo", {
        Cookie: `tokenKey=${this.$route.query.tokenKey}`,
        // "tokenKey=" + "65B354C790C59579C2FEB587DF04CD339405DA768EA00AABDBFE88CDC70E7D12",
        Language: this.$route.query.language
      })
      .then(res => {
        let data = res.data.data;
        this.userID = res.data.data.userID;
        console.log("invite_a_prize-160:", res.data.data.userID);
        Object.assign(store.state.invite_a_prize, data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // console.log("invite_a_prize.invitationRecird", this.invite_a_prize.invitationRecird)
    let lang = this.$route.query.language;
    let language = getCookie("lang");
    if (lang != language) {
      setCookie("language", lang);
      setCookie("lang", lang);
    }
    if (lang == "en") {
      this.englishVisible = true;
    } else {
      this.englishVisible = false;
    }
    this.invitationActivityList(1);
    this.$nextTick(function() {
      document
        .querySelector(".body_box")
        .addEventListener("scroll", this.scrollList);
    });
    console.log("9999999", document.querySelector(".body_box"));
    // wx.checkJsApi({
    //     jsApiList: [
    //         "checkJsApi",
    //         "onMenuShareTimeline",
    //         "onMenuShareAppMessage",
    //         "chooseImage"
    //     ],
    //     success: function (res) {
    //     }
    // });
    // wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: '', // 必填，公众号的唯一标识
    //     timestamp: '', // 必填，生成签名的时间戳
    //     nonceStr: '', // 必填，生成签名的随机串
    //     signature: '',// 必填，签名
    //     jsApiList: [] // 必填，需要使用的JS接口列表
    // });
  },
  methods: {
    invite() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.share(this.userID);
      } else if (isiOS) {
        window.webkit.messageHandlers.share.postMessage(this.userID);
      }
    },
    invitationActivityList(invit_active) {
      this.invitLoading = false;
      if (invit_active != this.invit_active) {
        this.inviteLoad = true;
        this.currentPage = 1;
        this.invitSellerList = [];
      }
      this.invit_active = invit_active;
      store
        .dispatch("invitationActivityListApi", {
          Cookie: `tokenKey=${this.$route.query.tokenKey}`,
          Language: this.$route.query.language,
          type: this.invit_active,
          currentPage: this.currentPage,
          showCount: this.showCount
        })
        .then(res => {
          console.log("invit_record", res);
          if (res.data.code == 1) {
            setTimeout(() => {
              this.inviteLoad = false;
            }, 350);
            // this.invitSellerList = res.data.data.sellerList;
            this.invitSellerList = this.invitSellerList.concat(
              res.data.data.sellerList
            );
            if (res.data.data.currentPage >= res.data.data.totalPage) {
              this.invitLoading = false;
            } else {
              this.invitLoading = true;
            }
          } else {
            this.inviteLoad = false;
            this.toast.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // getMessage() {
    //   console.log(1111111);
    // },
    // share_to_wechat() {
    //     // 分享到微信
    // },
    // share_to_friends() {
    //     // 分享到朋友圈
    // },
    right_btn_fn(data) {
      this.$router.push("/rules_of_activity");
    },
    // 滚动加载
    scrollList() {
      console.log(11111111111);
      var scrollTop = document.querySelector(".body_box").scrollTop;
      var clientHeight = document.documentElement.clientHeight;
      var scrollHeight = document.querySelector(".body_box").scrollHeight;
      console.log(
        "11111111111",
        parseFloat(scrollTop + clientHeight) - scrollHeight
      );
      if (parseFloat(scrollTop + clientHeight) - scrollHeight >= 200) {
        console.log(11111111111);
        if (this.invitLoading) {
          this.currentPage++;
          this.invitationActivityList(this.invit_active);
        }
      }
    }
  }
};
</script>

<style scoped>
@media screen and(max-width: 329px) {
  .coupon_info_top {
    height: 8vh;
  }
}
.invite_box {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}
.header_box {
  width: 100%;
  position: absolute;
  top: 0;
}

.top_bg {
  width: 100%;
  height: 35vh;
  background: url(../assets/images/invite_top_bg.png) no-repeat;
  background-size: 100% 100%;
}

.invite_coupon {
  width: 96%;
  height: 34vh;
  position: absolute;
  left: 2%;
  top: 10vh;
  background: url(../assets/images/invite_coupon.png) no-repeat;
  background-size: 100% 100%;
}

.coupon_info {
  position: absolute;
  left: 12%;
  top: 5%;
  width: 50%;
  height: 40%;
}

.coupon_info_top {
  width: 100%;
  height: 7vh;
}

.coupon_condition {
  width: 100%;
  text-align: center;
}

.coupon_condition span {
  color: #ee4004;
  font-weight: bold;
}

.coupon_condition span:first-child {
  font-size: 0.8rem;
}

.coupon_condition span:last-child {
  display: block;
  font-size: 12px;
  font-weight: lighter;
}

.coupon_type {
  background: #d38102;
  color: #ffffff;
  border-radius: 50px;
  text-align: center;
  font-size: 12px;
}

.coupon_content {
  color: #ed3800;
  text-align: center;
}

.condition {
  width: 100%;
  font-size: 12px;
  color: #f06148;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  border-top: 1px dotted #d17b00;
  margin-top: 5px;
}

.coupon_num {
  position: absolute;
  right: 12%;
  top: 12%;
  color: #ff3032;
  font-size: 0.8rem;
  width: 20%;
}

.coupon_num span {
  font-size: 2rem;
}

.invite_btn {
  width: 60%;
  height: 20%;
  background: #ffc11e;
  color: #99410b;
  font-weight: 600;
  border-radius: 50px;
  position: absolute;
  bottom: 5vh;
  left: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body_box {
  width: 96%;
  margin: auto;
  margin-top: 12vh;
  height: 53vh;
  overflow-y: auto;
}

.my_profit,
.profit_details {
  width: 100%;
  background: white;
  margin-bottom: 2vh;
  padding: 10px 10px 2px;
}
.profit_details .loading_list {
  width: 20px;
  margin: 18px auto;
}
.profit_details .loading_list img {
  width: 100%;
}
.box_title {
  width: 100%;
  border-bottom: 1px dotted #ededed;
  padding-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.my_profit_body {
  padding-top: 10px;
}

.my_profit_body div {
  float: left;
  width: 50%;
  height: 100%;
}
.empty_invit {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #999;
}
.empty_invit div {
  font-size: 14px;
}
.my_profit_body div:first-child {
  border-right: 1px dotted #ededed;
}

.my_profit_body p {
  text-align: center;
  color: #999;
  font-size: 13px;
}

.profit_num span {
  color: #ff2724;
  font-size: 30px;
}

.invite_people_num span {
  font-size: 30px;
}

.profit_details_list {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
  position: relative;
}

.p_d_l_bottom {
  font-size: 12px;
  color: #959595;
  margin-top: 10px;
}

.amount {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
}

.share_box {
  width: 100%;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 2222;
}

.share_methods {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
}

.share_methods_box {
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
}

.shaer_methods_img {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 10px;
}

.shaer_methods_img img {
  width: 100%;
  height: 100%;
}

.share_box_btn {
  border-top: 1px solid #ededed;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notTitle {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.titles {
  color: #ee4004;
  font-size: 22px;
  font-weight: 600;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  margin-right: 0.2rem;
}
.titleEn {
  color: #ee4004;
  font-size: 22px;
  font-weight: 600;
  margin-right: 0.2rem;
}
.right {
  display: inline-block;
}
.pingtai {
  font-size: 12px;
  background: #d38102;
  border-radius: 8px;
  color: #fff;
  padding: 0 2px;
}
.youhui {
  color: #ee4004;
  font-size: 12px;
}
.coupons span {
  font-size: 22px;
}
.moneys {
  font-size: 16px;
}
.coupon_nums {
  position: absolute;
  right: 11%;
  top: 17%;
  color: #ff3032;
  font-size: 0.8rem;
  width: 22%;
  text-align: center;
}
.no_message div {
  text-align: center;
  padding: 20px 0;
  color: #999;
}
.invitation_tab {
  width: 100%;
  display: flex;
  height: 45px;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #ededed;
}
.invit_success_tab {
  flex: 1;
  color: #666;
}
.invit_not {
  flex: 1;
  color: #666;
}
.invit_success span {
  font-size: 15px;
}
.invit_not span {
  font-size: 15px;
}
.invitation_tab .active span {
  color: #ff3633;
  border-bottom: 2px solid #ff3633;
  padding-bottom: 11px;
}
.invit_success {
  padding: 0 5px 10px;
}
.success_record {
  padding: 12px 0;
  border-bottom: 1px solid #ededed;
}
.success_record:last-child {
  border-bottom: 0;
}
.success_record .invit_phone span {
  font-size: 14px;
  color: #333;
}
.success_record .invit_phone span:last-child {
  float: right;
}
.success_record .invit_time {
  padding-top: 8px;
}
.success_record .invit_time span {
  font-size: 12px;
  color: #999;
}
.success_record .invit_time span:last-child {
  float: right;
}
/* .invite_not_record {
  padding: 0 5px 10px;
} */
.invit_success .no_record {
  padding: 12px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ededed;
}
.no_record:last-child {
  border-bottom: 0;
}
.invit_success .no_record .invit_phone {
  flex: 1;
}
.invit_success .no_record .invit_phone div {
  font-size: 14px;
  color: #333;
}
.invit_success .no_record .invit_phone .time {
  font-size: 12px;
  color: #999;
  padding-top: 8px;
}
.invit_price {
  font-size: 14px;
  color: #333;
}
@media screen and (max-width: 329px) {
  .titles {
    font-size: 20px;
  }
}
</style>||||||| .r1095

