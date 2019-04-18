<template>
  <div class="rider_success">
    <div class="header">
      <div class="back" @click="back">
        <img src="../../../assets/icons/icon_arrows_left@2x.png" alt="">
      </div>
      <div class="title">{{rider_recruitment.title_suc}}</div>
    </div>
    <div class="rider_all">
      <div class="content_rider">
        <div>
          <div class="img_rig">
            <img src="../../../assets/icons/success_right@2x.png" alt="">
          </div>
          <div class="success">
            {{rider_recruitment.success}}
          </div>
          <div class="test">{{rider_recruitment.note}}</div>
        </div>
      </div>
      <div class="footer_rider">
        <div class="warning_rider">
          <div class="img"><img src="../../../assets/icons/warning@2x.png" alt=""></div>
          <div class="warn_text">
            <div>{{rider_recruitment.warning_rider}}</div>
            <div>{{rider_recruitment.warn_1}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rider_success",
  data() {
    return {};
  },
  computed: {
    rider_recruitment() {
      let rider_recruitment = this.$t("rider_recruitment");
      return rider_recruitment;
    }
  },
  methods: {
    back() {
      this.$router.push("/user");
    }
  }
};
</script>
<style scoped lang="scss">
.rider_success {
  height: 100vh;
  .header {
    height: 7%; // line-height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    background: #f0f0f0;
    min-height: 40px;
    z-index: 99;
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
  .rider_all {
    position: fixed;
    height: 93%;
    top: 7%;
    background: #fff;
    width: 100%;
    .content_rider {
      display: flex;
      height: 80%;
      align-items: center;
      justify-content: center;
      div {
        &:first-child {
          text-align: center;
        }
        .img_rig {
          width: 100px;
          vertical-align: middle;
          margin: auto;
          img {
            width: 100%;
          }
        }
        .success {
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }
        .test {
          color: #999;
          margin-top: 20px;
        }
      }
    }
    .footer_rider {
      position: absolute;
      bottom: 4.5vh;
      width: 100%;
    }
    .warning_rider {
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 0 20px;
      .img {
        width: 17px;
        margin-right: 3px;
        img {
          margin-bottom: -2px;
          width: 17px;
        }
      }
      .warn_text {
        color: #999;
        div {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
