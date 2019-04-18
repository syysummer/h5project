<template>
	<div class="center">
		<div class="center_content" v-if="goods">
			<div class="banner">
				<img v-lazy.container="goods.publicityPicture" :src="goods.publicityPicture" :alt="goods.sellerName" />
			</div>
			<div class="list-box" v-if="goods.ActivityListInfo">
				<div v-for="(tItem,index) in goods.ActivityListInfo" :key="index" class="g-itme">
					<div class="title">
						{{tItem.label_name}}
					</div>
					<div class="g-center">
						<div class="line_block" :style="clasWidth(tItem.sellerGoodsMap.length)">
							<div class="food" v-for="(itme,index) in tItem.sellerGoodsMap" :key="index" :style="itemWideth(tItem.sellerGoodsMap.length)">
								<div class="img_Box" @click="viweGoodInfo(itme)"><img :src="itme.goodsPhotoPath" :alt="itme.goodsPhoto"></div>
								<div class="food_name">
									<div class="name">{{itme.goodsName}}</div>
									<div class="price">
										<template v-if="itme.isDiscount">
											<span>{{itme.presentPrice}}P {{(itme.goodsSpecsList?($route.params.language=='zh'?'起':'rise'):'')}}</span>
											<span v-if="itme.goodsSpecsList">&nbsp;</span>
											<s v-else>{{itme.originalPrice}}P</s>
										</template>
										<template v-else>
											<span>{{itme.originalPrice}}P {{(itme.goodsSpecsList?($route.params.language=='zh'?'起':'rise'):'')}}</span>
											<span>&nbsp;</span>
										</template>
									</div>
									<div class="sell">{{ $route.params.language=='zh'?'售':'Sold'}}：{{itme.sellNum}}</div>
									<div class="add" @click="addCats(itme)"><img src="../../../assets/icons/add.png" alt=""></div>
								</div>
							</div>
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="list-box" v-if="goods.sellerGoodsMap">
				<div class="g-itme mt15">
					<div class="g-center">
						<div class="line_block" :style="clasWidth(goods.sellerGoodsMap.length)">
							<div class="food" v-for="(itme,index) in goods.sellerGoodsMap" :key="index" :style="itemWideth(goods.sellerGoodsMap.length)">
								<div class="img_Box" @click="viweGoodInfo(itme)"><img :src="itme.goodsPhotoPath" :alt="itme.goodsPhoto"></div>
								<div class="food_name">
									<div class="name">{{itme.goodsName}}</div>
									<div class="price">
										<template v-if="itme.isDiscount===1">
											<span>{{itme.presentPrice}}P {{(itme.goodsSpecsList?($route.params.language=='zh'?'起':'rise'):'')}}</span>
											<span v-if="itme.goodsSpecsList">&nbsp;</span>
											<s v-else>{{itme.originalPrice}}P</s>
										</template>
										<template v-else>
											<span>{{itme.presentPrice}}P {{(itme.goodsSpecsList?($route.params.language=='zh'?'起':'rise'):'')}}</span>
											<span>&nbsp;</span>
										</template>
									</div>
									<div class="sell">{{ $route.params.language=='zh'?'售':'Sold'}}：{{itme.sellNum}}</div>
									<div class="add" @click="addCats(itme)"><img src="../../../assets/icons/add.png" alt=""></div>
								</div>
							</div>
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="loading_gif">
			<img style="width: 100%;" src="../../../assets/images/loding_img_no_floor.gif" />
			<p>
				{{ $route.params.language=='zh'?'加载中...':'loading...'}}
			</p>
		</div>
	</div>
</template>
<script>
import store from '@/store'
import { mobileType } from '@/utils/common'
export default {
  name: 'huodong',
  components: {},
  data() {
    return {
      goods: null,
      banner: [],
      queryForm: {
        sellerId: null,
        id: null,
        language: null
      }
    }
  },
  created() {},
  mounted() {
    this.queryForm.sellerId = this.$route.params.id
    this.queryForm.id = this.$route.params.tid
    this.queryForm.language = this.$route.params.language
    this.geGoodtList()
  },
  methods: {
    itemWideth(opts) {
      let widthStr = ''
      if ((opts % 3 === 0 && opts === 6) || opts === 3) {
        widthStr = 'width:3.87rem'
      } else {
        widthStr = 'width:3.67rem'
      }
      return widthStr
    },
    clasWidth(opts) {
      let pxW = '',
        widthStr = ''
      if (opts === 3) {
        pxW = opts * 3.87
      }
      if (opts > 3 && opts < 6) {
        pxW = opts * 3.67
      }
      if (opts === 6) {
        opts = Math.ceil(opts / 2)
        pxW = opts * 3.87
      }
      if (opts > 6) {
        opts = Math.ceil(opts / 2)
        pxW = opts * 3.67
      }
      widthStr = 'width:' + pxW + 'rem'
      return widthStr
    },
    geGoodtList() {
      store.dispatch('getGoodsList', this.queryForm).then(res => {
        const rData = res.data
        if (rData.code == 1) {
          this.goods = rData.data
        }
      })
    },
    addCats(opst) {
      let type = mobileType()
      switch (type) {
        case 'android':
          let str = JSON.stringify(opst)
            .replace('"{', '{')
            .replace('}"', '}')
          window.android.addCat(str)
          break
        case 'iOS':
          window.webkit.messageHandlers.addCat.postMessage(opst)
          break
        default:
          break
      }
    },
    viweGoodInfo(opst) {
      let type = mobileType()
      switch (type) {
        case 'android':
          let str = JSON.stringify(opst)
            .replace('"{', '{')
            .replace('}"', '}')
          window.android.goodView(str)
          break
        case 'iOS':
          window.webkit.messageHandlers.goodView.postMessage(opst)
          break
        default:
          break
      }
    }
  }
}
</script>
<style scoped lang="scss">
.center {
  height: 100%;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  .i-box {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  .center:after {
    min-height: calc(100% + 1px);
  }
  .center_content {
    background: #fff;
    height: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    overflow-y: auto;
    .banner {
      width: 100%;
      height: 23.7vh;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }
    .list-box {
      // background: #e2330a;
      padding-bottom: 35px;
      .g-itme {
        display: block;
        background: #fff;
        padding: 0 0.195rem;
        border-bottom: 15px solid #e2330a;
        width: 100%;
        &:last-child {
          border-bottom: none;
        }
        .title {
          width: 100%;
          padding: 10px 0;
          font-size: 17px;
          font-weight: 700;
          color: #333;
          text-align: center;
        }
        .g-center {
          display: block;
          overflow-x: auto;
          overflow-y: hidden;
          margin-bottom: 3px;
          .line_block {
            display: block;
            width: 100%;
            overflow: hidden;
            .clear {
              clear: both;
            }
          }
          .food {
            position: relative;
            padding: 0 0.195rem 0.27rem 0.195rem;
            float: left;
            overflow: hidden;
            &:nth-child(3n + 0) {
              margin-right: 0;
            }
            .img_Box {
              width: 100%;
              height: 2.65rem;
              border-radius: 3px;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
          }
          .food_name {
            position: relative;
            overflow: hidden;
            .name {
              font-size: 14px;
              color: #333;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .price {
              line-height: 16px;
              margin-bottom: 0px;
              span {
                display: inline-block;
                width: 100%;
                line-height: 14px;
                font-size: 14px;
                color: #ff3633;
              }
              s {
                line-height: 12px;
                font-size: 12px;
                color: #999;
              }
            }
            .sell {
              line-height: 12px;
              font-size: 12px;
              color: #999;
            }
            .add {
              position: absolute;
              width: 0.7rem;
              height: 0.7rem;
              right: 0.07rem;
              bottom: 0.07rem;
              zoom: 1;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
