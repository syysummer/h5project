<template>
	<div class="network_fee">
		<div class="header">
			<publicHeader :title="livingTitle"></publicHeader>
		</div>
		<div class="contain_content">
			<div class="fee-box">
				<div class="fee-time">
					<div class="start-time" @click="openPicker(1)">
						{{start_time?start_time:living_payment.start_date}}
						<i class="el-icon-date"></i>
					</div>
					<div class="line">
						-
					</div>
					<div class="end-time" @click="openPicker(2)">
						{{end_time?end_time:living_payment.end_date}}
						<i class="el-icon-date"></i>
					</div>
					<mt-datetime-picker ref="picker_start" type="date" v-model="select_start_time" @confirm="handleConfirm(1)">
					</mt-datetime-picker>
					<mt-datetime-picker ref="picker_end" type="date" v-model="select_end_time" @confirm="handleConfirm(2)">
					</mt-datetime-picker>
				</div>
				<div class="fee-filter" @click="get_network_list">{{living_payment.filter}}</div>
			</div>
			<!-- 列表为空 -->
			<div class="empty_network_list" v-if="empty_network_list">
				<p>{{living_payment.no_data}}</p>
				<!-- <img src="../../assets/images/img_empty_order.png" /> -->
			</div>
			<ul class="network-list">
				<router-link tag='li' :to="{path:url,query:{orderNo:item.payOrderNo}}" v-for="(item,index) in network_list.resultList" :key="index">
					<img :src="livingImg" alt="" class="network-img">
					<div class="network-content">
						<div class="network-top">
							<div class="network-title">{{subTitle}}</div>
							<div class="network-num">{{item.orderMoney}}P</div>
						</div>
						<div class="network-bottom">
							<div class="network-time">{{$formatDateTime(item.createTime,'ymdhm')}}</div>
							<div class="network-status" v-if="item.payStatus==0 || item.payStatus==4">{{item.showStatus}}</div>
							<div class="color-q" v-if="item.payStatus==5 || item.payStatus==3">{{item.showStatus}}</div>
							<div class="color-b" v-if="item.payStatus==6 || item.payStatus==-1 || item.payStatus==7">{{item.showStatus}}</div>
						</div>
					</div>
				</router-link>
				<div class="load_more" style="background:#fff;" v-if="network_loading&&!empty_network_list">
					<img src="../../../assets/icons/is_loading.gif" />
				</div>
			</ul>
		</div>
	</div>
</template>
<script>
import store from '../../../store'
import publicHeader from '../../../components/public_header'
import { getCookie } from '../../../utils/cookies'
export default {
  name: 'living_payment_list',
  data() {
    return {
      select_start_time: '',
      select_end_time: this.$formatDateTime(new Date(), 'ymd'),
      start_time: '',
      end_time: this.$formatDateTime(new Date(), 'ymd'),
      network_loading: true,
      empty_network_list: false,
      loading: true,
      network_list: {
        currentPage: 1,
        resultList: []
      }
    }
  },
  props: ['livingTitle', 'subTitle', 'payCostType', 'livingImg', 'url'],
  components: { publicHeader },
  created() {},
  mounted() {
    this.start_time = this.getMonthMaxDay(new Date())
    this.select_start_time = this.getMonthMaxDay(new Date())
    for (let i = 0; i < 2; i++) {
      document.getElementsByClassName('mint-datetime-cancel')[
        i
      ].innerHTML = this.living_payment.cancel
      document.getElementsByClassName('mint-datetime-confirm')[
        i
      ].innerHTML = this.living_payment.determine
    }
    this.get_network_list()
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.scrollList)

    // 加载更多
  },
  computed: {
    living_payment() {
      let living_payment = this.$t('living_payment')
      return living_payment
    }
  },
  methods: {
    openPicker(type) {
      if (type == 1) {
        this.$refs.picker_start.open()
      }
      if (type == 2) {
        this.$refs.picker_end.open()
      }
    },
    handleConfirm(type) {
      if (type == 1) {
        this.start_time = this.select_start_time
          ? this.$formatDateTime(this.select_start_time, 'ymd')
          : ''
      }
      if (type == 2) {
        this.end_time = this.select_end_time
          ? this.$formatDateTime(this.select_end_time, 'ymd')
          : ''
      }
    },
    get_network_list() {
      this.network_list.currentPage = 1
      let day = this.isLeapYear(new Date(this.start_time).getFullYear())
      // if (this.start_time) {
      //   if (!this.end_time) {
      //     this.toast.error(this.living_payment.end_empty)
      //     return
      //   }
      // }
      // if (this.end_time) {
      //   if (!this.start_time) {
      //     this.toast.error(this.living_payment.start_empty)
      //     return
      //   }
      // }
      if (this.start_time && this.end_time) {
        let format_start_time = new Date(this.start_time).getTime()
        let format_end_time = new Date(this.end_time).getTime()
        if (format_start_time > format_end_time) {
          this.toast.error(this.living_payment.start_than_end)
          return
        }
        if (format_end_time - format_start_time >= day * 24 * 3600 * 1000) {
          this.toast.error(this.living_payment.can_months)
          return
        }
      }
      let params = {
        payCostType: this.payCostType,
        currentPage: this.network_list.currentPage,
        startTime: this.start_time,
        endTime: this.end_time,
        showCount: 6
      }
      // if (this.start_time && this.end_time) {
      //   params.startTime = this.start_time
      //   params.endTime = this.end_time
      // }
      this.loading = false
      this.$axios
        .get('/innerService/getLifePayCostListPage', {
          params
        })
        .then(res => {
          this.network_loading = false
          this.loading = true
          let data = res.data
          if (data.code == 1) {
            if (!data.data.resultList) {
              this.network_list.resultList = []
            } else {
              this.network_list = Object.assign(this.network_list, data.data)
            }
            if (this.network_list.resultList.length == 0) {
              this.empty_network_list = true
            } else {
              this.empty_network_list = false
            }
          }
        })
    },
    scrollList() {
      if (!this.loading) {
        return
      }
      if (this.network_list.currentPage >= this.network_list.totalPage) {
        this.network_loading = false
        return
      } else {
        this.network_loading = true
      }
      var seller_list_top_box = document.documentElement.offsetHeight
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + clientHeight - scrollHeight >= -50) {
        this.network_list.currentPage++
        let params = {
          payCostType: this.payCostType,
          currentPage: this.network_list.currentPage,
          showCount: 6,
          startTime: this.start_time,
          endTime: this.end_time
        }
        this.loading = false
        this.$axios
          .get('/innerService/getLifePayCostListPage', {
            params
          })
          .then(res => {
            this.loading = true
            let data = res.data
            this.network_list.totalPage = data.data.totalPage
            this.network_list.resultList = this.network_list.resultList.concat(
              data.data.resultList
            )
          })
      } else {
        this.network_loading = false
      }
    },
    isLeapYear(year) {
      var cond1 = year % 4 == 0 //条件1：年份必须要能被4整除
      var cond2 = year % 100 != 0 //条件2：年份不能是整百数
      var cond3 = year % 400 == 0 //条件3：年份是400的倍数
      //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
      //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
      //所以得出判断闰年的表达式：
      var cond = (cond1 && cond2) || cond3
      if (cond) {
        return 366
      } else {
        return 365
      }
    },
    getMonthMaxDay(nowdate) {
      nowdate.setMonth(nowdate.getMonth() - 1)
      var y = nowdate.getFullYear()
      var m = nowdate.getMonth() + 1
      var d = nowdate.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      return y + '-' + m + '-' + d
    }
  }
}
</script>
<style scoped lang="scss">
.network_fee {
  height: 100%;
  background: #fff;
  top: 0;
  bottom: 0;
  .header {
    position: fixed;
    width: 100%;
    height: 45px;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid #dddddd;
  }
  .contain_content {
    padding-top: 45px;
    background: #fff;
    width: 100%;

    .empty_network_list {
      height: 77vh;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      p {
        font-size: 13px;
        padding: 0 2rem;
        text-align: center;
        margin-top: 0.5rem;
        color: #666;
      }
    }
    .fee-box {
      display: flex;
      padding: 12px 15px 8px 15px;
      justify-content: space-between;
      align-items: center;
      color: #333333;
      border-bottom: 1px solid #ededed;
      .fee-time {
        display: flex;
        align-items: center;
        width: 89%;
        .start-time {
          width: 46%;
          padding: 0 2%;
          height: 29px;
          line-height: 29px;
          background: #fdfdfd;
          border: 1px solid #cccccc;
          border-radius: 5px;
          font-size: 13px;
          i {
            margin-top: 6px;
            float: right;
          }
        }
        .end-time {
          width: 46%;
          padding: 0 2%;
          height: 29px;
          line-height: 29px;
          background: #fdfdfd;
          border: 1px solid #cccccc;
          border-radius: 5px;
          font-size: 13px;
          i {
            margin-top: 6px;
            float: right;
          }
        }
        .line {
          padding: 0 2px;
          background: #fdfdfd;
        }
      }
      .fee-filter {
        color: #666666;
        font-size: 14px;
      }
    }
    .network-list {
      overflow-y: auto;
      height: 85%;
      li {
        padding: 16px 15px;
        display: flex;
        align-items: flex-start;
        .network-img {
          width: 1.7rem;
          height: 1.7rem;
        }
        .network-content {
          width: 96%;
          margin-left: 4%;
          border-bottom: 1px solid #ededed;
          .network-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            .network-title {
              color: #333333;
              font-size: 16px;
            }
            .network-num {
              color: #fb4e44;
              font-size: 17px;
            }
          }
          .network-bottom {
            display: flex;
            margin-bottom: 14px;
            justify-content: space-between;
            .network-time {
              color: #999999;
              font-size: 14px;
            }
            .network-status {
              color: #098be8;
              font-size: 14px;
            }
            .color-q {
              color: #69c94a;
              font-size: 14px;
            }
            .color-b {
              color: #999999;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
