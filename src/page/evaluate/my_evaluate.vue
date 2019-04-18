<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader :title="get_language.title"></publicHeader>
		</div>
		<div class="detail_contain" :class="{iphone5: isIphone5, iphoneP: isIphoneP, iphone6: isIphone6, iphoneX: isIphoneX}" v-show="userCommentList.length !== 0 && !loading">
			<div class="evaluate_item" v-for="(item, index) in userCommentList" :key="index">
				<!-- 商品介绍 -->
				<div class="goods_discrpt" @click="goSeller(item)">
					<div class="goods_img">
						<img :src="item.sellerLogoPath" alt="">
					</div>
					<div class="goods_name">{{item.sellerName}}</div>
					<div class="arrow_icon">
						<img src="../../assets/icons/icon_arrow_right.png" alt="">
					</div>
				</div>
				<!-- 用户信息 -->
				<div class="user_detail">
					<div class="user_header">
						<img :src="item.profilePhotoPath" alt="">
					</div>
					<div class="user_nicknama">
						{{item.userName}}
					</div>
					<div class="publish_time">
						<span v-if="language === 'zh'">评价时间</span>
						{{$formatDateTime(item.createTime, '_ymd')}}
					</div>
				</div>
				<!-- 商品评价 回复 -->
				<div class="shops_contain">
					<div class="shops_evaluate">
						<span class="service_txt">{{get_language.store}}</span>
						<div class="rate_contain">
							<span class="rate_gray">
								<img src="../../assets/icons/icon_star_gray.png" alt="">
							</span>
							<span class="rate_red" :style="{width:set_star(item.orderScore) + '%'}">
								<img src="../../assets/icons/icon_star_red.png" alt="">
							</span>
						</div>
					</div>
					<div class="user_comment">
						{{item.userDesc}}
					</div>
					<div class="user_img" v-show="item.imgList">
						<div class="item_img" v-for="(items, index) in item.imgList" :key="index">
							<yd-lightbox>
								<yd-lightbox-img :src="items"></yd-lightbox-img>
							</yd-lightbox>
						</div>
						<!-- <img :src="items" alt=""> -->
					</div>
					<div class="shops_replay" v-if="item.isReply">
						{{get_language.business_reply}}: {{item.reply}}
					</div>
				</div>
				<!-- 推荐菜品 -->
				<!-- <div class="recommend_contain" v-show="recommendGoodsName.length !== 0"> -->
				<div class="recommend_contain" v-show="recommendGoodsName">
					<div class="recommend_title">
						{{get_language.recommend}}
					</div>
					<div class="recommend_items" :key="index">
						{{item.recommendGoodsName}}
					</div>
				</div>
				<!-- 配送服务 -->
				<div class="post_service">
					<div class="post_evaluate">
						<span class="service_txt">{{get_language.delivery}}</span>
						<div class="rate_contain">
							<span class="rate_gray">
								<img src="../../assets/icons/icon_star_gray.png" alt="">
							</span>
							<span class="rate_red" :style="{width:set_star(item.deliveryScore) + '%'}">
								<img src="../../assets/icons/icon_star_red.png" alt="">
							</span>
						</div>
					</div>
					<div class="post_common">
						{{item.deliveryDesc}}
					</div>
					<div class="delete_contain">
						<button @click="deleteEvaluate(item)">{{get_language.delete}}</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 没有评价 -->
		<div class="no_evaluate" v-show="userCommentList.length == 0 && !loading">
			<img src="../../assets/images/img_no_common.png" alt="">
			<p>{{get_language.no_common}}</p>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import {
  LightBox,
  LightBoxImg,
  LightBoxTxt
} from 'vue-ydui/dist/lib.rem/lightbox'
Vue.component(LightBox.name, LightBox)
Vue.component(LightBoxImg.name, LightBoxImg)
Vue.component(LightBoxTxt.name, LightBoxTxt)
import publicHeader from '@/components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import store from '../../store'
export default {
  data() {
    return {
      language: '', // 语言
      goods_star: '', // 商品评价星星的宽度
      post_star: '', // 商品评价星星的宽度
      currentPage: 1,
      showCount: 5,
      userCommentList: [],
      imgList: [],
      recommendGoodsName: [],
      evalLoading: true,
      loading: true,
      isIphoneX: false,
      isIphoneP: false,
      isIphone6: false,
      isIphone5: false
    }
  },
  components: {
    publicHeader
  },
  computed: {
    get_language() {
      let txt = this.$t('main_comment')
      return txt
    }
  },
  created() {
    let elem = document.getElementsByTagName('body')[0]
    elem.addEventListener('click', function(e) {
      var target = e.target
      if (target.nodeName.toLowerCase() == 'img') {
        if (target.parentNode.className == 'yd-slider-item') {
          if (
            target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode
          ) {
            target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML =
              ''
            return
          }
        }
      } else if (
        target.nodeName.toLowerCase() == 'div' &&
        target.className == 'yd-lightbox-img'
      ) {
        if (target.parentNode.parentNode) {
          target.parentNode.parentNode.innerHTML = ''
          return
        }
      }
    })
    this.language = getCookie('lang')
    let ALL_HEIGHT = document.body.clientHeight
    let is_iOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (is_iOS) {
      if (ALL_HEIGHT > 630 && ALL_HEIGHT < 640) {
        this.isIphoneX = true
      } else if (ALL_HEIGHT > 545 && ALL_HEIGHT < 560) {
        this.isIphone6 = true
      } else if (ALL_HEIGHT > 610 && ALL_HEIGHT < 630) {
        this.isIphoneP = true
      } else if (ALL_HEIGHT > 450 && ALL_HEIGHT < 470) {
        this.isIphone5 = true
      }
    }
  },
  methods: {
    goSeller(item) {
      this.$router.push({
        path: '/business_shop',
        query: { id: item.sellerId, pathName: this.$route.name }
      })
    },
    set_star(rate) {
      // 一个星星width: 15% 空格距离是 6.5%
      let count = (rate * 15).toFixed(2)
      let space = rate.toString()[0] * 6.5
      // this.goods_star = Number(count) + space
      return Number(count) + space
      // this.post_star = Number(count) + space
    },
    getEvaluate() {
      this.evalLoading = false
      store
        .dispatch('evaluateApi', {
          currentPage: this.currentPage,
          showCount: this.showCount
        })
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.userCommentList.forEach(elem => {
              if (elem.picture) {
                elem.imgList = elem.picture.split(',')
              }
              if (elem.recommendGoodsName) {
                elem.recommendGoodsName = elem.recommendGoodsName.replace(
                  /,/g,
                  ', '
                )
              } else {
                elem.recommendGoodsName = ''
              }
            })
            this.userCommentList = this.userCommentList.concat(
              res.data.data.userCommentList
            )
            if (res.data.data.currentPage == res.data.data.totalPage) {
              this.evalLoading = false
            } else {
              this.evalLoading = true
            }
            this.loading = false
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteEvaluate(item) {
      let _this = this
      this.$confirm({
        title: _this.get_language.title,
        content: _this.get_language.confirm_delete,
        yesText: _this.get_language.yes,
        noText: _this.get_language.no
      })
        .then(() => {
          store
            .dispatch('delEvaluateApi', {
              commentId: item.commentId
            })
            .then(res => {
              if (res.data.code === 1) {
                let texts = this.$t('main_comment.deleteSuccess')
                this.toast.success(texts)
                this.userCommentList = []
                this.getEvaluate()
              } else {
                this.toast.success(res.data.message)
              }
            })
            .catch(error => {})
        })
        .catch(() => {
          //TODO
        })
    },
    // 滚动加载
    scrollList() {
      var scrollTop = document.querySelector('.detail_contain').scrollTop
      var clientHeight = document.documentElement.clientHeight
      var scrollHeight = document.querySelector('.detail_contain').scrollHeight
      if (scrollTop + clientHeight - scrollHeight >= 20) {
        if (this.evalLoading) {
          this.currentPage++
          this.getEvaluate()
        }
      }
    }
  },
  mounted() {
    this.set_star(3.7)
    this.getEvaluate()
    this.$nextTick(function() {
      document
        .querySelector('.detail_contain')
        .addEventListener('scroll', this.scrollList)
    })
  }
}
</script>

<style lang="scss" scoped type="text/css">
.evaluate_item {
  margin-top: 0.4rem;
  padding: 0 0.4rem;
  background-color: #fff;
}

.no_evaluate {
  display: none;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 4rem;
  }
  p {
    margin-top: 0.4rem;
    font-size: 16px;
    color: #666;
  }
}

.contain {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .phoneHeader {
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 1;
  }
  .detail_contain {
    background-color: #eee;
    height: 93%;
    position: fixed;
    overflow-y: auto;
    top: 7%;
    width: 100%;
    .goods_discrpt {
      padding: 0.4rem;
      display: flex;
      flex-flow: row;
      align-items: center;
      border-bottom: 1px solid #ededed;
      position: relative;
      .goods_img {
        img {
          width: 1.5rem;
          vertical-align: middle;
        }
      }
      .goods_name {
        padding-left: 0.4rem;
        color: #333333;
        font-size: 14px;
        vertical-align: middle;
      }
      .arrow_icon {
        position: absolute;
        right: 0;
        img {
          width: 0.4rem;
        }
      }
    }
    .user_detail {
      padding: 0.2rem 0.4rem;
      display: flex;
      flex-flow: row;
      align-items: center;
      border-bottom: 1px solid #ededed;
      position: relative;
      .user_header {
        padding-left: 0.2rem;
        img {
          width: 1rem;
        }
      }
      .user_nicknama {
        padding-left: 0.7rem;
        color: #333333;
        font-size: 14px;
        vertical-align: middle;
      }
      .publish_time {
        color: #333333;
        font-size: 12px;
        position: absolute;
        right: 0;
        span {
          color: #333333;
          font-size: 12px;
          margin-right: 0.2rem;
        }
      }
    }
    .shops_contain {
      padding: 0.4rem;
      border-bottom: 1px solid #ededed;
      .shops_evaluate {
        .service_txt {
          margin-right: 1.5rem;
          color: #999999;
          font-size: 14px;
        }
        .rate_contain {
          vertical-align: middle;
          display: inline-block;
          position: relative;
          width: 4rem;
          .rate_gray {
            display: inline-block;
            width: 100%;
            img {
              width: 4rem;
            }
          }
          .rate_red {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block; // width: 21%;
            overflow: hidden;
            img {
              width: 4rem;
            }
          }
        }
      }
      .user_comment {
        margin: 0.4rem 0 0.2rem 0;
        font-size: 14px;
        color: #333;
      }
      .user_img {
        font-size: 0;
        width: 100%;
        .item_img {
          &:nth-child(3),
          &:nth-child(6),
          &:nth-child(9) {
            margin-right: 0;
          }
          width: 32%;
          margin-right: 2%;
        }
        div {
          display: inline;
        }
        img {
          width: 32%;
          height: 3.4rem;
          object-fit: cover;
          // margin-right: 2%;
          margin-top: 0.2rem;
        }
      }
      .shops_replay {
        margin-top: 0.4rem;
        background-color: #f9f9f9;
        padding: 0.2rem;
        color: #999999;
        font-size: 12px;
      }
    }
    .recommend_contain {
      padding: 0.4rem;
      border-bottom: 1px solid #ededed;
      .recommend_title {
        font-size: 14px;
        color: #999999;
        margin-bottom: 0.4rem;
      }
      .recommend_items {
        font-size: 14px;
        color: #333333;
      }
    }
    .post_service {
      padding: 0.4rem;
      padding-bottom: 0.6rem;
      .post_evaluate {
        .service_txt {
          margin-right: 1.5rem;
          color: #999999;
          font-size: 14px;
        }
        .rate_contain {
          vertical-align: middle;
          display: inline-block;
          position: relative;
          width: 4rem;
          .rate_gray {
            display: inline-block;
            width: 100%;
            img {
              width: 4rem;
            }
          }
          .rate_red {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block; // width: 21%;
            overflow: hidden;
            img {
              width: 4rem;
            }
          }
        }
      }
      .post_common {
        margin-top: 0.4rem;
        font-size: 14px;
        color: #333333;
      }
      .delete_contain {
        margin-top: 0.4rem;
        text-align: right;
        button {
          display: inline-block;
          padding: 0.1rem 0.2rem;
          background-color: #fff;
          border: 1px solid #e65a45;
          color: #ff644d;
          font-size: 12px;
        }
      }
    }
  } // .detail_contain.iphoneP {
  //   height: 82.3vh;
  // }
  // .detail_contain.iphone6 {
  //   height: 80.8vh;
  // }
  // .detail_contain.iphoneX {
  //   height: 77.67vh;
  // }
  // .detail_contain.iphone5 {
  //   height: 79.8vh;
  // }
} // @media screen and(min-width: 410px) {
//   .contain .detail_contain {
//     height: 92%;
//   }
// }
</style>