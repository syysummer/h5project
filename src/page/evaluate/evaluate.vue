<template>
	<div class="contain_evaluate">
		<div class="header">
			<div class="back" @click="back">
				<img src="../../assets/icons/icon_arrows_left@2x.png" alt="">
			</div>
			<div class="title">
				{{eval_order.evaluation}}
			</div>
		</div>
		<div class="detail_contain" v-show="!evalLoading">
			<div class="evaluate_item">
				<!-- 商家信息 -->
				<div class="goods_discrpt" @click="goSeller">
					<div class="goods_img">
						<img :src="orderInfo.seller_photo" alt="">
					</div>
					<div class="goods_name">{{orderInfo.seller_name}}</div>
					<div class="arrow_icon">
						<img src="../../assets/icons/icon_arrow_right.png" alt="">
					</div>
				</div>
				<!-- 评价商品 -->
				<div class="shops_contain">
					<div class="shops_evaluate">
						<div class="shops">
							<span class="service_txt">{{eval_order.merchant}}</span>
							<div class="rate_contain">
								<el-rate class="u-inner-block" :colors="rateColor" v-model="orderScore"></el-rate>
							</div>
						</div>
						<div class="orderNotes">
							<textarea name="" id="" rows="5" maxlength="200" :placeholder="eval_order.taste" v-model="orderEvaluate"></textarea>
						</div>
					</div>
					<div class="uploadImg">
						<!-- <el-upload  ref="file_list" :data="upToken" action="https://img.hzxindakeji.com/" multiple :limit="9" list-type="picture-card" :before-upload="uploadImg" -->
						<el-upload ref="file_list" :data="upToken" action="https://up.qiniup.com" multiple :limit="9" list-type="picture-card" :before-upload="uploadImg" :on-success="successUpload" :on-error="errorUpload" :on-exceed="removeUpload" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>
				</div>
				<!-- 推荐菜品 -->
				<div class="recommend_contain">
					<div class="recommend_title">
						{{eval_order.recommended_dishes}}
					</div>
					<div class="recommend_items" v-for="(item, index) in goods" :key="index">
						<div class="recommend">
							<div class="recommend_name">{{item.goodsName}}</div>
							<div class="fabulous">
								<span class="checkedUp" @click="changeImg(item, index)">
									<img src="../../assets/icons/fabulous_gray.png" alt="" v-if="!item.hasFabulous">
									<img src="../../assets/icons/fabulous_red.png" alt="" v-else>
								</span>
								<span class="checkedUp" @click="changeImgs(item, index)">
									<img src="../../assets/icons/unchecked.png" alt="" v-if="!item.hasFabul">
									<img src="../../assets/icons/select.png" alt="" v-else>
								</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 配送服务 -->
				<div class="post_service">
					<div class="post_evaluate">
						<span class="service_txt">{{eval_order.delivery}}</span>
						<div class="rate_contain">
							<el-rate class="u-inner-block" :colors="rateColor" v-model="deliveryScore"></el-rate>
						</div>
					</div>
					<div class="post_common">
						<textarea name="" id="text_area" rows="5" maxlength="200" :placeholder="eval_order.delivery_time" v-model="deliveryEvaluate"></textarea>
					</div>
				</div>
			</div>
			<div class="delete_contain">
				<div v-if="!status" @click="submitNull">{{eval_order.submit}}</div>
				<div class="active" v-else @click="submit">{{eval_order.submit}}</div>
			</div>
		</div>
		<div class="evaluateVisible" v-if="evaluateVisible">
			<div class="eval">
				<div class="bai_bg">
					<div class="title">{{eval_order.evalSucc}}</div>
					<div class="content">{{eval_order.notes}}</div>
				</div>
				<div class="btn">
					<div @click="toSee">
						<span>{{eval_order.look}}</span>
					</div>
					<div @click="ContinueEval">
						<span>{{eval_order.continue}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import publicHeader from '@/components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import store from '../../store'
export default {
  data() {
    return {
      rateColor: ['#FF644C', '#FF644C', '#FF644C'],
      orderScore: null,
      deliveryScore: null,
      language: '', // 语言
      currentPage: 1,
      showCount: 5,
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      },
      hasFabulous: false,
      hasFabul: false,
      disabled: false,
      orderEvaluate: '',
      deliveryEvaluate: '',
      evaluateVisible: false,
      orderInfo: {},
      goodsId: {
        GoodsList: []
      },
      goods: [],
      imgList: [],
      evalLoading: false,
      upToken: {
        token: ''
      },
      hash: '',
      backUrl: '',
      loading_text: ''
    }
  },
  components: {
    publicHeader
  },
  computed: {
    eval_order() {
      let txt = this.$t('eval_order')
      return txt
    },
    status() {
      //  this.orderScore || this.deliveryScore || this.deliveryEvaluate || this.orderEvaluate
      if (
        this.orderScore ||
        this.deliveryScore ||
        this.deliveryEvaluate ||
        this.orderEvaluate
      ) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      return this.disabled
    }
  },
  created() {
    this.language = getCookie('lang')
    if (this.language == 'zh') {
      this.loading_text = '加载中……'
    } else if (this.language == 'en') {
      this.loading_text = 'Loading...'
    }
    // 获取七牛Token
    store.dispatch('qiniuTokenApi', {}).then(res => {
      this.upToken.token = res.data.data
    })
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  methods: {
    back() {
      if (this.backUrl == '/order_details') {
        this.$router.go(-1)
      } else {
        this.$router.push('/order')
      }
    },
    goSeller() {
      this.$router.push({
        path: '/business_shop',
        query: {
          id: this.orderInfo.seller_id,
          orderId: this.$route.query.id,
          pathName: this.$route.name
        }
      })
    },
    removeUpload(file, fileList) {
      let warntext = this.$t('order.detail.alert.uploadImgLim')
      this.toast.warning(warntext)
    },
    handleRemove(file, fileList) {
      if (file.status == 'success') {
        if (fileList.length <= 8) {
          setTimeout(() => {
            document.getElementsByClassName(
              'el-upload--picture-card'
            )[0].style.display =
              'inline-block'
          }, 300)
        }
      }
    },
    uploadImg(file) {
      const loading = this.$loading({
        lock: true,
        text: this.loading_text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
      })
      if (file) {
        loading.close()
      }
    },
    errorUpload(err, file, fileList) {
      let errortext = this.$t('order.detail.errorImg')
      this.toast.warning(errortext)
    },

    successUpload(response, file, fileList) {
      this.hash = ''
      fileList.forEach(el => {
        if (el.response) {
          this.hash += el.response.hash + ','
        }
      })
      this.hash = this.hash.substring(0, this.hash.length - 1)
      fileList.forEach(item => {
        if (item.status == 'success') {
          this.imgList = fileList
          if (this.imgList.length >= 9) {
            document.getElementsByClassName(
              'el-upload--picture-card'
            )[0].style.display =
              'none'
          }
        }
      })
    },
    changeImg(item, index) {
      for (let [i, elem] of this.goodsId.GoodsList.entries()) {
        elem.goodsId == item.goodsId && this.goodsId.GoodsList.splice(i, 1)
      }
      this.goods[index].hasFabulous = true
      this.goods[index].hasFabul = false
      let GoodsList = {
        goodsId: item.goodsId,
        evaluation: '0'
      }
      this.goodsId.GoodsList.push(GoodsList)
    },
    changeImgs(item, index) {
      for (let [i, elem] of this.goodsId.GoodsList.entries()) {
        elem.goodsId == item.goodsId && this.goodsId.GoodsList.splice(i, 1)
      }
      this.goods[index].hasFabul = true
      this.goods[index].hasFabulous = false
      let GoodsList = {
        goodsId: item.goodsId,
        evaluation: '1'
      }
      this.goodsId.GoodsList.push(GoodsList)
    },
    submitNull() {
      let txt = this.$t('eval_order.evaluateNull')
      this.toast.warning(txt)
    },
    getOrderInfo() {
      this.evalLoading = true
      let id = this.$route.query.id
      store
        .dispatch('orderInfoApi', {
          orderId: id
        })
        .then(res => {
          if (res.data.code === 1) {
            let newGoods = []
            for (let [i, item] of res.data.data.Goods.entries()) {
              let flag = true
              for (let [j, elem] of newGoods.entries()) {
                if (item.goodsId == elem.goodsId) {
                  flag = false
                }
              }
              if (flag) {
                newGoods.push(item)
              }
            }
            newGoods.forEach(item => {
              item.hasFabulous = false
              item.hasFabul = false
            })
            this.goods = newGoods
            this.orderInfo = res.data.data
          } else {
            this.toast.error(res.data.message)
          }
          this.evalLoading = false
        })
        .catch(error => {
          console.error(error)
          this.evalLoading = false
        })
    },
    submit() {
      let picture = ''
      let list = this.$refs.file_list.$children[1].fileList
      for (let i = 0; i < list.length; i++) {
        if (i == list.length - 1) {
          picture += list[i].name
        } else {
          picture += list[i].name + ','
        }
      }
      if (this.goodsId.GoodsList.length > 0) {
        this.goodsId = JSON.stringify(this.goodsId)
      }
      if (this.orderScore == 0 || this.deliveryScore == 0) {
        let txt = this.$t('eval_order.scoreEval')
        this.toast.warning(txt)
      } else {
        store
          .dispatch('orderEvalueteApi', {
            orderId: this.orderInfo.id,
            userId: this.orderInfo.user_id,
            sellerId: this.orderInfo.seller_id,
            deliveryId: this.orderInfo.delivery_id,
            userDesc: this.orderEvaluate,
            picture: this.hash,
            deliveryScore: this.deliveryScore,
            deliveryDesc: this.deliveryEvaluate,
            orderScore: this.orderScore,
            goodsId: this.goodsId
          })
          .then(res => {
            if (res.data.code === 1) {
              window.scroll(0, 0)
              this.evaluateVisible = true
            } else {
              this.toast.error(res.data.message)
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    toSee() {
      // this.$router.push('/my_evaluate')
      this.$router.replace('/my_evaluate')
      this.evaluateVisible = false
    },
    ContinueEval() {
      sessionStorage.setItem('select_order_status', 2)
      this.$router.replace('/order')
      this.evaluateVisible = false
    }
  },
  mounted() {
    this.getOrderInfo()
  }
}
</script>

<style lang="scss" scoped type="text/css">
.contain_evaluate {
  width: 100%;
  // height: 100vh;
  height: 100%;
  top: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  // position: relative;
  // top: 0;
  .header {
    text-align: center;
    display: flex;
    height: 7%;
    position: fixed;
    top: 0;
    min-height: 40px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    border-bottom: 1px solid #dddddd;
    z-index: 999;
    .back {
      width: 12px;
      position: absolute;
      // top: 0.2rem;
      left: 0.3rem;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 18px;
      color: #666;
    }
  }
  .detail_contain {
    text-align: center;
    padding: 0.3rem;
    position: relative;
    border-bottom: 1px solid #dddddd;
    .back {
      width: 12px;
      float: left;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 18px;
      color: #666;
    }
  }
  .detail_contain {
    margin: 0 0.1rem;
    // height: 93%;
    // position: fixed;
    padding-top: 15%;
    width: 100%;
    overflow-y: auto;
    .evaluate_item {
      background-color: #fff; // padding: 0 0.2rem;
    }
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
        margin-right: 15px;
        color: #333333;
        font-size: 14px;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow_icon {
        position: absolute;
        right: 10px;
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
        .shops {
          margin-bottom: 10px;
        }
        .orderNotes {
          textarea {
            width: 100%;
            border: 1px solid #dddddd;
            resize: none;
            font-size: 13px;
            padding: 10px;
            color: #333;
            outline: none;
            background: #f0f0f0;
          }
          margin-bottom: 10px;
        }
        .service_txt {
          margin-right: 0.3rem;
          color: #999999;
          font-size: 14px;
        }
        .rate_contain {
          vertical-align: middle;
          display: inline-block;
          position: relative;
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
        img {
          width: 32%;
          margin-right: 2%;
          margin-top: 0.2rem;
          &:nth-child(3),
          &:nth-child(6),
          &:nth-child(9) {
            margin: 0;
          }
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
        width: 100%;
        padding-bottom: 10px;
        .recommend {
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
        }
        div {
          font-size: 14px;
        }
        .recommend_name {
          width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        font-size: 14px;
        color: #333333;
        .fabulous {
          span {
            img {
              width: 40px;
            }
          }
        }
      }
    }
    .post_service {
      padding: 0.4rem;
      padding-bottom: 0.6rem;
      .post_evaluate {
        .service_txt {
          margin-right: 0.3rem;
          color: #999999;
          font-size: 14px;
        }
        .rate_contain {
          vertical-align: middle;
          display: inline-block;
          position: relative;
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
        -webkit-tab-highlight-color: rgba(0, 0, 0, 0);
        margin-top: 0.4rem;
        font-size: 14px;
        color: #333333;
        textarea {
          outline: none;
          width: 100%;
          background: #f0f0f0;
          border: 1px solid #dddddd;
          padding: 10px;
          font-size: 13px;
          resize: none;
        }
      }
    }
    .delete_contain {
      div {
        border: none;
        background: #ffa799;
        color: #fff;
        width: 100%;
        padding: 7px;
        margin: 0.5rem 0;
      }
      .active {
        background: #ff644c;
      }
    }
  }
  .el-rate {
    margin-bottom: 5px;
  }
  .evaluateVisible {
    width: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    .eval {
      border-radius: 10px;
      background: #fff;
      width: 80%;
      text-align: center;
      margin: 60% auto;
      .bai_bg {
        padding: 20px 27px 0 27px;
        .title {
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }
        .content {
          font-size: 15px;
          color: #666;
        }
      }
      .btn {
        border-top: 1px solid #ededed;
        margin-top: 20px;
        div {
          &:first-child {
            border-right: 1px solid #ededed;
          }
          padding: 0;
          margin: 0;
          width: 48%;
          height: 30px;
          line-height: 30px;
          font-size: 0;
          display: inline-block;
          color: #ff644c;
          span {
            font-size: 13px;
          }
        }
      }
    }
  }
}

@media screen and(min-width: 410px) {
  .contain .detail_contain {
    height: 92%;
  }
}
</style>
