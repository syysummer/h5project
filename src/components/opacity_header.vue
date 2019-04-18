<!-- 透明的公共头部 -->
<template>
	<div>
		<div class="header_box clearFloat">
			<div :class="{opacity_img: no_back}" class="back_btn" @click="go_back">
				<div>
					<img src="../assets/icons/back_btn.png" />
				</div>
			</div>
			<div class="title">
				{{title}}
			</div>
			<div class="right_btn" @click='right_btn_fn'>
				<div :class="{right_btn_bg: has_bg}">{{rightBtn}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'opacity_header',
  data() {
    return {
      no_back: false,
      has_bg: false
    }
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
  created() {
    if (this.$route.name == 'invite_a_prize') {
      this.no_back = true
    } else if (this.$route.name == 'free_lunch') {
      this.no_back = true
      this.has_bg = true
    } else {
      this.no_back = false
    }
  },
  methods: {
    go_back() {
      if (this.$route.name == 'HelloWorld') {
        alert('HelloWorld')
      } else {
        history.go(-1)
      }
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
  height: 7vh;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: relative;
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

.opacity_img {
  display: none;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right_btn {
  height: 100%;
  position: absolute;
  right: 0.4rem;
  top: 0;
  display: flex;
  align-items: center;
}

.right_btn_bg {
  padding: 2px 10px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
}
</style>