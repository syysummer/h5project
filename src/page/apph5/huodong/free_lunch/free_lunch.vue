<template>
  <div>
    <div class="header_box">
      <publicHeader rightBtn="活动规则" @rightBtnFn="right_btn_fn" v-if="lang=='zh'"></publicHeader>
      <publicHeader rightBtn="Promo rules" @rightBtnFn="right_btn_fn" v-if="lang=='en'"></publicHeader>
    </div>
    <div class="free_lunch_box">
      <img v-if="lang=='zh'" src="@/assets/images/free_lunch_bg_zh.png" />
      <img v-if="lang=='en'" src="@/assets/images/free_lunch_bg_en.png" />
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/opacity_header.vue'
import { getCookie } from '@/utils/cookies'
export default {
  name: 'free_lunch',
  data() {
    return {
      lang: ''
    }
  },
  components: {
    publicHeader
  },
  created() {
    this.lang = this.$route.query.language
  },
  mounted() {
    this.lang = this.$route.query.language
  },
  methods: {
    right_btn_fn() {
      this.$router.push({
        path: '/free_lunch_rules',
        query: {
          language: this.$route.query.language
        }
      })
    }
  }
}
</script>

<style scoped>
.header_box {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 1;
}

.free_lunch_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.free_lunch_box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
