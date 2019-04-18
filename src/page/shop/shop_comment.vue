<template>
  <div class="scr contain" ref="listDom" @scroll="scrollList">
    <div class="loading_gif" v-if="shop_loading&&loading_img">
      <img style="width: 100%;" src="../../assets/images/loding_img_no_floor.gif" />
      <p>{{this.$t('toast.loading')}}</p>
    </div>
    <ul class="comment_num flex" v-if="comment_list.length>0">
      <li class="a-center">
        <p>{{shop_commentInfo.data.orderScoreAvg}}</p>
        <span>{{main_comment.merchant}}</span>
      </li>
      <li class="a-center">

        <div class="rate_contain">
          <span class="rate_gray">
            <img src="../../assets/icons/icon_star_gray.png" alt="">
          </span>
          <span class="rate_red" :style="{width:set_star(shop_commentInfo.data.orderScoreAvg) + '%'}">
            <img src="../../assets/icons/icon_star_red.png" alt="">
          </span>
        </div>

        <!-- <span>{{shop_seller.a_total_of}} {{shop_commentInfo.data.orderCommentNum||0}} {{shop_seller.evaluation_num}}</span> -->
      </li>
      <li class="a-center">
        <p>{{shop_commentInfo.data.deliveryScoreAvg}}</p>
        <span>{{main_comment.delivery}}</span>
      </li>
    </ul>
    <div class="comment_content" v-if="comment_list.length>0">
      <ol v-for="(item,index) in comment_list" :key="index">
        <li class="flex">
          <p>
            <img :src="item.profilePhotoPath?item.profilePhotoPath:logoImg" :onerror="logoImg">
          </p>
          <p class="flex colmun j-between">
            <span style="color:#333;font-size:.5rem;">{{item.userName}}</span>
            <span style="color:#9C9C9C;" class="flex a-center">
              <span style="margin-right:.2rem;font-size:12px;">{{shop_seller.scores}}</span>

              <!-- <el-rate v-model="" disabled :colors="['#FD614A', '#FD614A', '#FD614A']">
                            </el-rate> -->
              <div class="rate_contain1">
                <span class="rate_gray">
                  <img src="../../assets/icons/icon_star_gray.png" alt="">
                </span>
                <span class="rate_red" :style="{width:set_star(item.orderScore) + '%'}">
                  <img src="../../assets/icons/icon_star_red.png" alt="">
                </span>
              </div>
            </span>
          </p>
          <p style="color:#9C9C9C;font-size:12px;">{{$formatDateTime(item.createTime,'ymd')}}</p>
        </li>
        <li class="flex">
          <span>{{item.userDesc}}</span>
        </li>
        <li class="flex">
          <!-- <img v-if="item.arrImg.length>=1" :onerror="logoImg" v-for="(demo,index) in item.arrImg" :key="index" :src="demo"> -->
          <yd-lightbox>
            <yd-lightbox-img v-if="item.arrImg.length>=1" v-for="(demo,index) in item.arrImg" :key="index" :src="demo" :onerror="logoImg"></yd-lightbox-img>
          </yd-lightbox>
        </li>
        <li class="flex" v-show="item.recommendGoodsName">
          <img v-show="item.recommendGoodsName" src="../../assets/icons/fill.png">
          <span>{{main_comment.recommend}}：{{item.goodsName}}</span>
        </li>
        <li class="flex">
          <span v-if="item.isReply">{{main_comment.business_reply}}：{{item.reply}}</span>
        </li>
      </ol>
    </div>
    <div class="no_comment flex a-center" v-show="show">
      <i><img src="../../assets/images/img_no_common.png" alt=""></i>
      <p style="color:#666666;font-size:14px;">{{shop_index.no_com}}</p>
    </div>
    <!-- <div style="background:white;color:#999;font-size:12px;margin-bottom:1rem;text-align:center;" v-show="shop_commentInfo.data.orderCommentNum">
            {{shop_index.list_over}}~~~
        </div> -->
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
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'

export default {
  name: 'business_shop',
  data() {
    return {
      arr: ['', '', '', '', ''],
      id: '',
      reply: false,
      show: false,
      logoImg: 'this.src="' + require('../../assets/images/default_img@2x.png') + '"',
      currentPage: 1
    }
  },
  components: {},
  computed: {
    loading_img() {
      return store.state.loading_img
    },
    shop_loading() {
      return store.state.shop_loading
    },
    shop_index() {
      let shop_index = this.$t('shop_index')
      return shop_index
    },
    main_comment() {
      let main_comment = this.$t('main_comment')
      return main_comment
    },
    shop_seller() {
      let shop_seller = this.$t('seller')
      return shop_seller
    },
    shop_commentInfo() {
      return store.state.shop_comment
    },
    comment_list() {
      return store.state.comment_list.orderCommentList
    },
    is_loading() {
      return store.state.is_loading
    },
    loading() {
      return store.state.loading
    }
  },
  watch: {
    comment_list: 'showfun'
  },
  beforeUpdate() {
    if (this.comment_list.length > 0) {
      this.show = false
    } else {
      this.show = true
    }
  },
  created() {
    if (this.comment_list.length > 0) {
      this.show = true
    } else {
      this.show = false
    }
    let elem = document.getElementsByTagName('body')[0]
    // console.log(elem);
    elem.addEventListener('click', function(e) {
      var target = e.target
      // console.log(target);
      if (target.nodeName.toLowerCase() == 'img') {
        console.log(11111111111111111)
        if (target.parentNode.className == 'yd-slider-item') {
          console.log(2222222222222222)
          if (
            target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.innerHTML != ''
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
        if (target.parentNode.parentNode.innerHTML != '') {
          target.parentNode.parentNode.innerHTML = ''
          return
        }
      }
    })
  },
  mounted() {
    this.id = localStorage.getItem('id')
    this.get_shop_comment()
    this.get_comment_list()

    // document.querySelector('.comment_num').addEventListener('scroll', this.scrollList);
  },
  methods: {
    showfun() {},
    set_star(rate) {
      if (!rate) {
        rate = 0
      }
      // 一个星星width: 15% 空格距离是 6.5%
      let count = (rate * 15).toFixed(2)
      let space = rate.toString()[0] * 6.5
      // this.goods_star = Number(count) + space
      return Number(count) + space
      // this.post_star = Number(count) + space
    },
    //获取店铺评论总信息
    get_shop_comment() {
      store
        .dispatch('shop_comment', {
          sellerId: this.id
        })
        .then(res => {
          // console.log("店铺", res.data);
          let data = res.data
          Object.assign(store.state.shop_comment, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    // 获取店铺评论列表
    get_comment_list() {
      store
        .dispatch('comment_list', {
          sellerId: this.id,
          currentPage: this.currentPage,
          showCount: 5
        })
        .then(res => {
          let data = res.data.data
          if (data.orderCommentList) {
            let arr = data.orderCommentList
            // console.log('1111111111', arr)
            arr.forEach(el => {
              if (el.picturePath) {
                el.arrImg = (el.picturePath || '').split(',')
              }
              if (el.recommendGoodsName) {
                let arr1 = el.recommendGoodsName.split(',')
                function dedupe(array) {
                  return Array.from(new Set(array))
                }
                let arr2 = dedupe(arr1)
                el.recommendGoodsName = arr2.join(',')
                console.log(el.recommendGoodsName, 'el.recommendGoodsName1')
                el.goodsName = el.recommendGoodsName.replace(/,/g, ' , ')
              }
            })
          }
          Object.assign(store.state.comment_list, data)
          // console.log(data, 11111111111)
        })
        .catch(err => {
          console.error('err:', err)
        })
    },
    // 滚动加载
    scrollList() {
      store.state.loading_img = false

      if (store.state.is_loading) {
        return
      }
      if (this.currentPage >= store.state.comment_list.totalPage) {
        store.state.loading = false
        return
      } else {
        store.state.loading = true
      }
      let listDom = this.$refs.listDom

      console.log(listDom.scrollHeight, listDom.scrollTop, listDom.clientHeight)
      if (
        listDom.scrollHeight - listDom.scrollTop - listDom.clientHeight <
        10
      ) {
        this.currentPage++

        store
          .dispatch('comment_list', {
            sellerId: this.id,
            currentPage: this.currentPage,
            showCount: 5
          })
          .then(res => {
            let data = res.data
            // 获取总页数
            store.state.comment_list.totalPage = data.data.totalPage
            // 拼接列表数组
            store.state.comment_list.orderCommentList = (
              store.state.comment_list.orderCommentList || []
            ).concat(data.data.orderCommentList)
            store.state.comment_list.orderCommentList.forEach(el => {
              if (el.recommendGoodsName) {
                el.goodsName = el.recommendGoodsName.replace(/,/g, ', ')
              }
              console.log('......', el.goodsName)
              if (el.picturePath) {
                el.arrImg = (el.picturePath || '').split(',')
              }
            })
            store.state.loading_img = true
          })
          .catch(err => {
            console.error('err:', err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.loading_gif {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
  background: white;
  padding-top: 20%;
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
.no_comment {
  width: 100%;
  height: 100%;
  flex-flow: column;
  padding: 1rem 0 0;
  margin-bottom: 2rem;
}
.no_comment > i {
  width: 4rem;
}
.no_comment > i > img {
  width: 100%;
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
    display: inline-block;
    overflow: hidden;
    img {
      width: 4rem;
    }
  }
}
.rate_contain1 {
  vertical-align: middle;
  display: inline-block;
  position: relative;
  width: 2.8rem;
  .rate_gray {
    display: inline-block;
    width: 100%;
    img {
      width: 2.8rem;
    }
  }
  .rate_red {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    overflow: hidden;
    img {
      width: 2.8rem;
    }
  }
}
.scr {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.comment_num {
  width: 100%;
  padding: 0.3rem 0.3rem;
}

.comment_num > li {
  display: flex;
  flex-flow: column;
  // height: 1.3rem;
  justify-content: center;
}

.comment_num > li > span {
  font-size: 12px;
  color: #a0a0a0;
}

.comment_num > li:nth-child(1) {
  width: 4rem;
}

.comment_num > li:nth-child(1) > p {
  font-size: 0.7rem;
  color: #ff644d;
}

.comment_num > li:nth-child(2) {
  width: 5rem;
  padding: 0.3rem 0 0;
}

.comment_num > li:nth-child(2) > p {
  width: 5rem;
  height: 1.3rem;
  padding: 0.4rem 0;
}

.comment_num > li:nth-child(2) > span {
}

.comment_num > li:nth-child(3) {
  width: 4rem;
  border-left: 1px solid #f5f5f5;
}

.comment_num > li:nth-child(3) > p {
  font-size: 0.7rem;
  color: #949494;
}

.comment_content {
  width: 100%;
  padding: 0 0.4rem 0.4rem;
  margin-bottom: 10px;
}

.comment_content > ol {
  border-top: 1px solid #f6f6f6;
  padding: 0.4rem 0;
}

.comment_content > ol > li:nth-child(1) {
  width: 100%;
}

.comment_content > ol > li:nth-child(1) > p:nth-child(1) {
  width: 1.5rem;
  height: 1.5rem;
}

.comment_content > ol > li:nth-child(1) > p:nth-child(1) > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment_content > ol > li:nth-child(1) > p:nth-child(2) {
  flex: 1;
  height: 1.5rem;
  margin-left: 0.1rem;
}

.comment_content > ol > li:nth-child(2) {
  width: 100%;
  padding: 0.2rem 0 0.2rem 1.5rem;
}
.comment_content > ol > li:nth-child(2) > span {
  width: 100%;
  font-size: 13px;
  word-wrap: break-word;
}

.comment_content > ol > li:nth-child(3) {
  width: 100%;
  padding: 0 0 0 1.5rem;
}

.comment_content > ol > li:nth-child(3) > div {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}

.comment_content > ol > li:nth-child(3) > div > img {
  width: 3rem;
  height: 3rem;
  margin-right: 0.1rem;
  margin-bottom: 0.2rem;
}

.comment_content > ol > li:nth-child(4) {
  width: 100%;
  padding: 0.2rem 0 0.2rem 1.5rem;
}

.comment_content > ol > li:nth-child(4) > img {
  width: 0.5rem;
  height: 0.5rem;
}

.comment_content > ol > li:nth-child(4) > span {
  font-size: 12px;
  margin-left: 0.2rem;
}

.comment_content > ol > li:nth-child(5) {
  width: 100%;
  padding: 0.2rem 0 0.2rem 1.5rem;
}

.comment_content > ol > li:nth-child(5) > span {
  padding: 0.2rem;
  background: #f9f9f9;
  font-size: 12px;
  color: #999;
}
</style>
