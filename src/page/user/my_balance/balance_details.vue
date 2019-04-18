<template>
	<div class="detail_balance">
		<template v-if="!showLine">
			<div class="balance_details">
				<div class="head">
					<div class="header">
						<div class="back" @click="back">
							<img src="../../../assets/icons/icon_arrows_left@2x.png" alt="">
						</div>
						<div class="title">
							<span>{{balance_list.title}}</span>
							<!-- <span>{{balance_list.transaction_details}}</span> -->
						</div>
					</div>
					<ul class="nav">
						<li v-if="!is_loading" @click="getBalanceList(0)" :class="{active:status==0}">{{balance_list.all}}</li>
						<li v-if="!is_loading" @click="getBalanceList(2)" :class="{active:status==2}">{{balance_list.income}}</li>
						<li v-if="!is_loading" @click="getBalanceList(1)" :class="{active:status==1}">{{balance_list.expenditure}}</li>
						<li v-if="is_loading" :class="{active:status==0}">{{balance_list.all}}</li>
						<li v-if="is_loading" :class="{active:status==2}">{{balance_list.income}}</li>
						<li v-if="is_loading" :class="{active:status==1}">{{balance_list.expenditure}}</li>
					</ul>
				</div>
				<!-- <div class="content" v-show="balanceList.length!=[] && !loading" :class="{iphoneX: isIphoneX, iphone5: isIphone5, iphoneP: isIphoneP, iphone6: isIphone6}"> -->
				<div class="content" v-show="balanceList.length!=[] && !loading">
					<ul class="income" v-for="(item, index) in balanceList" :key="index">
						<li @click="todetail(item)">
							<div class="price">
								<span>{{item.accountType}}</span>
								<span>{{item.money}}P</span>
							</div>
							<div class="time">
								<span>{{$formatDateTime(item.createTime)}}</span>
								<span>{{item.name}}</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="noDetail" v-show="balanceList.length == [] && !loading">
					<div class="notImg">
						<img src="../../../assets/images/img_empty_order.png" alt="">
						<p>{{balance_list.details_empty}}</p>
					</div>
				</div>
			</div>
		</template>
		<template v-if="showLine">
			<div class="balance_details">
				<div class="header_list">
					<div class="back" @click="showLine=false">
						<img src="../../../assets/icons/icon_arrows_left@2x.png" alt="">
					</div>
					<div class="title">
						<span>{{balance_list.transaction_details}}</span>
					</div>
				</div>
				<div class="details-content">
					<div>
						<span>{{balance_list.transaction_type}}</span>
						<span>{{detailList.accountType}}</span>
					</div>
					<div>
						<span>{{balance_list.transaction_mode}}</span>
						<span>{{detailList.name}}</span>
					</div>
					<div>
						<span>{{balance_list.transaction_amount}}</span>
						<span>{{detailList.money}}P</span>
					</div>
					<div>
						<span>{{balance_list.creation_time}}</span>
						<span>{{$formatDateTime(detailList.createTime)}}</span>
					</div>
					<div>
						<span>{{balance_list.transaction_number}}</span>
						<span>{{detailList.orderNo}}</span>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import store from '../../../store'
export default {
  name: 'balance_details',
  data() {
    return {
      status: 0,
      showLine: false,
      currentPage: 1,
      showCount: 10,
      balanceList: [],
      detailList: {},
      isFinish: false,
      isLoading: true,
      isIphoneX: false,
      isIphoneP: false,
      isIphone6: false,
      loading: true
    }
  },
  computed: {
    balance_list() {
      let balance_list = this.$t('balance_list')
      return balance_list
    },
    id() {
      return this.$route.params.id
    },
    is_loading() {
      return store.state.is_loading
    }
  },
  created() {
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

    this.getBalanceList(0)
  },
  mounted() {
    document
      .querySelector('.content')
      .addEventListener('scroll', this.scrollList)
  },
  methods: {
    getBalanceList(status) {
      this.isLoading = false
      if (status != this.status) {
        this.currentPage = 1
        this.balanceList = []
        this.loading = true
        this.isFinish = false
      }
      if (this.isFinish) {
        return
      }
      this.status = status
      store
        .dispatch('balanceDetailApi', {
          status: this.status,
          currentPage: this.currentPage,
          showCount: this.showCount,
          id: this.id
        })
        .then(res => {
          if (res.data.code === 1) {
            this.balanceList = this.balanceList.concat(res.data.data.balanceLog)
            this.loading = false
            if (res.data.data.currentPage == res.data.data.totalPage)
              this.isFinish = true
            this.isLoading = true

            store.state.loading_img = true
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {})
    },
    back() {
      this.$router.go(-1)
    },
    todetail(item) {
      this.detailList = item
      this.showLine = true
    },
    // 滚动加载
    scrollList() {
      store.state.loading_img = false

      var scrollTop = document.querySelector('.content').scrollTop
      var clientHeight = document.documentElement.clientHeight
      var scrollHeight = document.querySelector('.content').scrollHeight
      if (scrollTop + clientHeight - scrollHeight >= 20) {
        this.currentPage++
        if (this.isLoading) {
          this.getBalanceList(this.status)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detail_balance {
  height: 100%;
}

.balance_details {
  height: 100%;
  .head {
    height: 13.3%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    background: #fff;
  }
  .header {
    text-align: center;
    padding: 0 0.5rem;
    position: relative;
    height: 6vh;
    line-height: 6vh;
    background: #fff;
    // border-bottom: 1px solid #ddd;
    .back {
      width: 12px;
      float: left;
      margin-top: 2px;
      img {
        width: 100%;
        margin-bottom: -4px;
      }
    }
    .title {
      span {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .nav {
    border-top: 1px solid #dddddd;
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    background-color: #f0f0f0;
    display: flex;
    li {
      // width: 31%;
      flex: 1;
      display: inline-block;
      text-align: center;
      font-size: 15px;
      color: #666; // border-bottom: 1px solid #EDEDED;
    }
    .active {
      color: #ff3633;
      border-bottom: 2px solid #ff3633;
    }
  }
  .line {
    width: 100%;
    border-bottom: 1px solid #dddddd;
  }
  .content {
    background: #fff;
    height: 86.7%;
    overflow-y: auto;
    position: fixed;
    top: 13.3%; // top: 15%;
    width: 100%;
    .income {
      li {
        padding: 10px 15px;
        border-bottom: 1px solid #ededed;
        color: #333;
        div {
          height: 30px;
          line-height: 30px;
        }
        .price {
          span {
            font-size: 14px;
            &:last-child {
              float: right;
              color: #fb4e44;
            }
          }
        }
        .time {
          color: #999;
          span {
            font-size: 13px;
            &:last-child {
              float: right;
            }
          }
        }
      }
    }
  } // .content.iphoneP{
  //   height: 76vh;
  // }
  // .content.iphone6{
  //   height: 74.5vh;
  // }
  // .content.iphone5{
  //   height: 73.2vh;
  // }
  // .content.iphoneX{
  //   height: 71.3vh;
  // }
  .header_list {
    text-align: center;
    padding: 12px 15px;
    position: relative;
    .back {
      width: 12px;
      float: left;
      margin-top: 2px;
      img {
        width: 100%;
      }
    }
    .title {
      span {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .details-content {
    background: #fff;
    height: 95vh;
    div {
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ededed;
      padding: 0 15px;
      span {
        &:first-child {
          color: #666;
        }
        &:last-child {
          float: right;
        }
        color: #333;
        font-size: 14px;
      }
    }
  }
  .noDetail {
    width: 100%;
    height: 86.7%;
    position: fixed;
    top: 13.3%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    .notImg {
      width: 50%;
      img {
        width: 100%;
      }
      p {
        text-align: center;
        font-size: 14px;
        color: #666;
      }
    }
  }
}

@media screen and (max-width: 329px) {
  .balance_details {
    .nav {
      li {
        width: 31%;
      }
    }
  }
}
</style>