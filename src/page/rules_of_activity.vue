<template>
    <div>
        <div class="header_box">
            <!-- <opacityHeader></opacityHeader> -->
            <!-- <div class="img_back" @click="back"><img src="../assets/icons/back_btn.png" alt=""></div> -->
        </div>
        <div class="activity_rules_body">
            <div :class="{title_box: isEnglish, title_boxes: !isEnglish}">
                <!-- <img src="../assets/images/active_rules_title.png" alt=""> -->
                <img :src="isEnglish?bg_images_en:bg_images_zh" />
            </div>
            <div class="activity_rules_content">
                <!-- <p>
                    1.邀请好友成为龙外卖新用户，好友在接受邀请的7天内下单成功，且无退款行为。你可获得龙外卖5P无门槛优惠券。
                </p>
                <p>
                    2.你的好友必须是从未使用龙外卖的新用户。拥有相同手机号、龙外卖账号与硬件设备的用户，均视为同一用户。
                </p>
                <p>
                    3.在好友完成收单的5天后（未取消订单、未申请退款）5P优惠券会放入龙外卖优惠券账户中，优惠券可用于空外卖订餐。
                </p>
                <p>
                    4.如发现任何违规套取奖励行为将视情节严重程度进行判罚：不予发放奖励、封停推荐有奖功能、冻结所有通过推荐有奖渠道获得的奖励、依法追究法律则热。
                </p>
                <p>
                    5.邀请记录最多保留6个月。
                </p> -->
                <h3>{{invite_a_prize.invitationActivity.activityTitle}}</h3>
                <p>
                    {{invite_a_prize.invitationActivity.activityRule}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import opacityHeader from "../components/opacity_header.vue";
import store from "../store";
import { getCookie } from "../utils/cookies";
export default {
  name: "rules_of_activity",
  data() {
    return {
      bg_images_zh: require("@/assets/images/active_rules_title.png"),
      bg_images_en: require("@/assets/images/activity_en@2x.png"),
      isEnglish: false
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
  mounted() {
    let lang = getCookie("lang");
    if (lang == "en") {
      this.isEnglish = true;
    } else {
      this.isEnglish = false;
    }
  },
  methods: {
    // back() {
    //   this.$router.push({
    //     path: "/invite_a_prize",
    //     query: {
    //       tokenKey: this.$route.query.tokenKey,
    //       language: this.$route.query.language
    //     }
    //   });
    //   // alert(1111111111)
    // }
  }
};
</script>

<style scoped>
.header_box {
  width: 100%;
  position: absolute;
  top: 0;
}
.header_box .img_back {
  width: 12px;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 999;
}
.header_box .img_back img {
  width: 100%;
}
.activity_rules_body {
  width: 100%;
  height: 100vh;
  background: url(../assets/images/active_rules_bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 7vh;
  padding-bottom: 7vh;
  overflow: hidden;
}

.title_box {
  width: 38%;
  margin: auto;
  height: 6vh;
  /* margin-bottom: 15px; */
}
.title_boxes {
  width: 38%;
  margin: auto;
  height: 8vh;
  /* margin-bottom: 15px; */
}
.title_boxes img {
  width: 100%;
}
.title_box img {
  width: 100%;
}

.activity_rules_content {
  width: 90%;
  background: white;
  margin: auto;
  border-radius: 8px;
  padding: 0.4rem;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 25px gainsboro;
}

.activity_rules_content p {
  color: #8b572a;
  font-size: 15px;
}
h3 {
  color: #8b572a;
  text-align: center;
}

@media screen and (min-width: 321px) {
  .activity_rules_content p {
    line-height: 30px;
    font-size: 16px;
  }
}
</style>