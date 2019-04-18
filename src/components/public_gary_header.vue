<!-- 透明的公共头部 -->
<template>
	<div>
		<div class="header_box clearFloat" :class="{gary_title: this.$route.name == 'select_address'}">
			<div v-if="this.$route.name !== 'order'" class="back_btn" @click="go_back">
				<div>
					<img src="../assets/icons/icon_arrows_left@2x.png" />
				</div>
			</div>
			<div class="title" :class="{gary_title: this.$route.name == 'select_address'}">
				{{title}}
			</div>
			<div class="right_btn" @click='right_btn_fn'>
				{{rightBtn}}
			</div>
			<div class="right_btn" @click='right_btn_fn' v-if="this.$route.name == 'select_address'">
				<img src="../assets/icons/add_address.png" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'public_header',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    rightBtn: {
      type: String,
      default: ''
    }
  },
  methods: {
    go_back() {
      if (this.$route.name == 'HelloWorld') {
        alert('HelloWorld')
      } else if (sessionStorage.getItem('refund_details_back') == 'true') {
        this.$router.push({
          path: '/order_details',
          query: { id: this.$route.query.id }
        })
        sessionStorage.setItem('refund_details_back', false)
      } else {
        history.go(-1)
      }
      sessionStorage.removeItem('area_code')
    },
    right_btn_fn() {
      this.$emit('rightBtnFn', this.rightBtn)
    }
  }
}
</script>

<style scoped>
.header_box {
  width: 100%;
  height: 100%;
  min-height: 45px;
  color: #666;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: relative;
  background-color: #f9f9f9;
  z-index: 2;
}

.back_btn {
  width: 12px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0.4rem;
  display: flex;
  align-items: center;
}

.back_btn div {
  width: 100%;
  height: 40%;
}

.back_btn img {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 100%;
  min-height: 45px;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.right_btn {
  height: 100%;
  position: absolute;
  right: 0.4rem;
  top: 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.right_btn img {
  width: 50%;
}

.gary_title {
  background: #f9f9f9;
}
</style>