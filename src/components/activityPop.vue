<template>
  <div v-if="show" class="activityPop">
    <div class="mask" @click="showFun">
    </div>
    <div class="pop" @click="showFun">
      <div class="img-box">
        <span @click="showFun"><img src="../assets/icons/icon_close_pops.png" alt=""></span>
        <template v-if="isLogin===0">
          <router-link class="link" to="/register">
            <img :src="activityPop_img.picture" alt="">
          </router-link>
        </template>
        <template v-else>
          <a href="javascript:;" class="link" @click="topHuodong">
            <img :src="activityPop_img.picture" alt="">
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { getCookie } from '../utils/cookies.js'
import store from '../store'
export default {
  name: 'activityPop',
  data() {
    return {
      imgUrl: '',
      show: true,
      isLogin: 0,
      show_activity: false
    }
  },
  computed: {
    activityPop_img() {
      return store.state.activityPop_img
    }
  },
  mounted() {
    if (
      this.activityPop_img.picture &&
      this.activityPop_img.picture != {} &&
      this.activityPop_img.picture != '' &&
      this.activityPop_img.picture != null
    ) {
      this.show_activity = true
    }
    store
      .dispatch('firstFullReductionOne')
      .then(res => {
        if (res.data.code == 1) {
          // 获取图片
          Object.assign(store.state.activityPop_img, res.data.data)
          console.log(store.state.activityPop_img)
        }
      })
      .catch(err => {
        console.error(err)
      })
    this.imgUrl = getCookie('lang')
    let isSHow = sessionStorage.getItem('activity')
    this.isLogin = localStorage.getItem('hasLog')
      ? parseInt(localStorage.getItem('hasLog'))
      : 0
    if (isSHow) {
      this.show = false
    } else {
      this.show = true
    }
  },
  methods: {
    showFun() {
      this.show = false
      sessionStorage.setItem('activity', true)
    },
    topHuodong() {
      this.showFun()
      this.$router.push('/meal_supplement?language=' + this.imgUrl)
    }
  }
}
</script>
<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0.5;
  background: #000;
  overflow: hidden;
  z-index: 99996;
}
.pop {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99997;
  overflow: hidden;
}
.img-box {
  position: relative;
  width: 80%;
  padding-top: 40%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
}
.img-box a.link {
  display: inline-block;
}
.link-btn {
  position: absolute;
  width: 50%;
  bottom: 10%;
  margin-left: 25%;
}
.img-box span {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 35%;
  right: 0;
  z-index: 99997;
  color: #fff;
}
.img-box img {
  display: inline-block;
  width: 100%;
}
</style>
