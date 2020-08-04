<template>
	<div id="app">
		<!-- 缺省页面 -->
		<div class="no_wify" v-if="no_wify">
			<div>
				<img src="./assets/images/no_wify.png" />
			</div>
			<div>
			 <p>
          {{$t("order_details.no_wify_01")}}
        </p>
        <p>
          {{$t("order_details.no_wify_02")}}
        </p>
			</div>
			<div>
				<span @click="to_reload">
					{{$t("order_details.reload")}}
				</span>
			</div>
		</div>

		<!--加载中-->
		<div class="loading_gif" v-if="loading_img && has_loading">
			<img style="width: 100%;" src="./assets/images/loding_img_no_floor.gif" />
			<p>{{this.$t('toast.loading')}}</p>
		</div>

		<div v-wechat-title="$route.meta.title"></div>
		<router-view/>
	</div>
</template>

<script>
import store from './store'
export default {
  name: 'App',
  created() {
    // 网络差时输入框失去焦点
    if (this.no_wify) {
      document.querySelector('input').blur()
    }

    let clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    // 如果在微信浏览器打开，则跳转到公众号
    // this.is_weixn()
    // 在PC端打开时跳转到外卖PC
    if (clientWidth > 780) {
      location.href = 'https://dev.loong.ph/loong/'
    }
    let vCodeId = sessionStorage.getItem('vCodeId')
    if (vCodeId) {
    } else {
      this.GenNonDuplicateID()
    }
    document.querySelector('#app').addEventListener('touchstart', function(ev) {
      let a = $('#app')[0].scrollTop
      if ($('#app')[0].scrollTop <= 0) {
        $('#app')[0].scrollTop = 1
      }
    })
  },
  watch: {
    $route(to, from) {
      if (to.path == '/address_list' || to.path == '/add_address') {
        document.getElementsByTagName('body')[0].style.background = 'white'
      } else {
        document.getElementsByTagName('body')[0].style.background = '#f0f0f0'
      }
      if (
        to.path.indexOf('user') !== -1 ||
        to.path.indexOf('submit_order') !== -1
      ) {
        document.getElementById('app').style.height = '100%'
        document.getElementsByTagName('body')[0].style.height = '100%'
        document.getElementsByTagName('html')[0].style.height = '100%'
        // document.getElementById("public_body").style.height = "100%";
      } else {
        document.getElementById('app').style.height = ''
      }
    }
  },
  computed: {
    loading_img() {
      return store.state.loading_img
    },
    has_loading() {
      return store.state.has_loading
    },
    no_wify() {
      return store.state.no_wify
    }
  },
  methods: {
    is_weixn() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // location.href = 'https://www.hzxindakeji.com/wechat/'
      }
    },
    to_reload() {
      window.location.reload()
    },
    GenNonDuplicateID() {
      // 生成不会重复的ID
      let idStr = Date.now().toString(36)
      idStr =
        'h5-' +
        idStr +
        Math.random()
          .toString(36)
          .substr(3)
      sessionStorage.setItem('vCodeId', idStr)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'PingFangSC-Regular', 'Microsoft YaHei';
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  background: #f0f0f0;
  position: relative;
  /* height: 100vh; */
}

html,
body,
#app {
  /* height: 100%; */
  width: 100%;
  /* overflow: hidden; */
}

/* 清除浮动 */

.clearFloat:after {
  content: '';
  clear: both;
  display: block;
}

/* 单行省略 */

.single_hide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行省略 */

.more_hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 遮罩 */

.task_box {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  background: black;
  opacity: 0.3;
}

a {
  text-decoration: none;
}

input,
button {
  outline: none;
}

input:-moz-placeholder {
  color: #8e8e8e;
  opacity: 0.5;
}

::-moz-placeholder {
  color: #8e8e8e;
  opacity: 0.5;
}

input:-ms-input-placeholder {
  color: #8e8e8e;
  opacity: 0.5;
}

input::-webkit-input-placeholder {
  color: #8e8e8e;
  opacity: 0.5;
}

/* 评分 */

.content_start .el-rate__icon {
  font-size: 14px;
  margin-right: 2px;
}

.content_start .el-rate__decimal,
.content_start .el-rate__icon .path2 {
  top: -2px;
}

/* 加载更多 */

.load_more {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}

.load_more img {
  width: 20px;
  height: 20px;
}

/* 加载中 */

.loading_gif {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background: white;
  padding-top: 45%;
}

.loading_gif img {
  width: 20% !important;
  position: relative;
  left: 40%;
  margin-bottom: 10px;
}

.loading_gif p {
  text-align: center;
}

/* 缺省页面 */

.no_wify {
  width: 100%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  z-index: 99998;
}

.no_wify div {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.no_wify img {
  width: 50%;
  height: 50%;
  margin-top: 25%;
}

.no_wify p {
  width: 100%;
  text-align: center;
  color: #666666;
}

.no_wify span {
  display: block;
  padding: 0.2rem 0.4rem;
  background-color: #ff3633;
  border-radius: 5px;
  color: white;
}

@media screen and (max-width: 329px) {
  * {
    font-size: 14px;
  }
  .coupon_list .coupon_row .coupon_items .coupon_discrpt .coupon_worth span {
    font-size: 16px;
  }
}
</style>
