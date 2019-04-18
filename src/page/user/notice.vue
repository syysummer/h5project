<template>
	<div class="notice">
		<div class="header">
			<div class="back" @click="back"><img src="../../assets/icons/icon_arrows_left@2x.png" alt=""></div>
			<div class="title">
				{{notice.title}}
			</div>
			<div class="right" @click="clear" v-if="!hasInfo"><img src="../../assets/icons/icon_searchlist_Trash@2x.png" alt=""> {{notice.clear}}</div>
		</div>
		<div class="notice_news" v-if="hasInfo">
			<div class="info">
				<div class="img"><img src="../../assets/images/no_info@2x.png" alt=""></div>
				<div class="noInfo">{{notice.no_info}}</div>
				<div class="btn" @click="goHome">
					<input type="button" :value="notice.button">
				</div>
			</div>
		</div>
		<div class="notice_news" v-else>
			<v-touch v-for="(item, index) in msgData" :key="index" @panleft='doLeft(index)' @panright='doRight(index)' @panend='doEnd(index)'>
				<div class="content" @click="todetail" :style="{right: item.right + 'rem'}">
					<div class="title">
						<img src="../../assets/icons/icon_info@1x.png" alt=""> {{item.title}}
						<span>{{$formatDateTime(item.createTime)}}</span>
					</div>
					<div class="notes">
						<span>{{item.text}}</span>
						<img src="../../assets/icons/goto@2x.png" alt="">
					</div>
					<div class="delete_contain" @click="deleteMsg(item.messageId)">
						删除
					</div>
				</div>
			</v-touch>
		</div>
	</div>
</template>
<script>
import store from '@/store'
export default {
  name: 'notice',
  data() {
    return {
      hasInfo: false,
      msgData: {}
    }
  },
  computed: {
    notice() {
      let notice = this.$t('notice')
      return notice
    }
  },
  mounted() {
    this.getUserMessageList()
  },
  methods: {
    deleteMsg(id) {
      store
        .dispatch('deleteUserMessage', { messageId: id })
        .then(res => {})
        .catch(err => {
          console.error('err', err)
        })
    },
    getUserMessageList() {
      store
        .dispatch('getUserMessageList', {
          pageNum: 1,
          pageSize: 10
        })
        .then(res => {
          if (res.data.code == 1) {
            for (let [index, item] of res.data.data.entries()) {
              item.right = 0
            }
            this.msgData = res.data.data
          } else {
            this.toast(res.data.message)
          }
        })
    },
    back() {
      this.$router.go(-1)
    },
    clear() {
      store.dispatch('deleteUserMessage').then(res => {
        if (res.data.code == 1) {
          this.toast.success('清除成功')
        }
      })
    },
    goHome() {
      this.$router.push('/')
    },
    todetail() {
      this.$router.push('/notice_detail')
    },
    doLeft(index) {
      for (let [i, item] of this.msgData.entries()) {
        if (index !== i) {
          item.right = 0
        }
      }
      if (this.msgData[index].right < 1.7) {
        this.msgData[index].right += 0.3
      }
    },
    doRight(index) {
      if (this.msgData[index].right > 0) {
        this.msgData[index].right -= 0.3
      }
    },
    doEnd(index) {
      if (this.msgData[index].right < 1) {
        this.time = setInterval(() => {
          if (this.msgData[index].right.toFixed(1) < 0) {
            clearInterval(this.time)
            this.time = null
            this.msgData[index].right = 0
            return
          }
          this.msgData[index].right -= 0.1
        }, 20)
      } else if (this.msgData[index].right >= 1) {
        this.time = setInterval(() => {
          if (this.msgData[index].right > 1.7) {
            clearInterval(this.time)
            this.time = null
            this.msgData[index].right = 2
            return
          }
          this.msgData[index].right += 0.1
        }, 20)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.notice {
  .header {
    text-align: center;
    padding: 12px 15px;
    position: relative;
    border-bottom: 1px solid #dddddd;
    .back {
      width: 12px;
      float: left;
      margin-top: 2px;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 18px;
      color: #666;
    }
    .right {
      color: #666;
      font-size: 16px;
      position: absolute;
      top: 12px;
      right: 12px;
      img {
        width: 16px;
        margin-bottom: -3px;
      }
    }
  }
  .notice_news {
    background: #fff;
    height: 94vh;
    // padding: 0 15px;
    .content {
      border-bottom: 1px solid #ededed;
      padding: 10px 15px;
      position: relative;
      .delete_contain {
        position: absolute;
        width: 2rem;
        height: 91px;
        line-height: 91px;
        text-align: center;
        color: #fff;
        right: -2rem;
        top: 0;
        background-color: red;
      }
    }
    .title {
      height: 40px;
      line-height: 40px;
      color: #333;
      img {
        width: 25px;
        margin-bottom: -6px;
      }
      span {
        font-size: 13px;
        color: #666;
        float: right;
      }
    }
    .notes {
      color: #666;
      font-size: 15px;
      margin-left: 29px;
      height: 30px;
      line-height: 30px;
      position: relative;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 70%;
        display: inline-block;
      }
      img {
        width: 12px;
        position: absolute;
        top: 10px;
        right: 0;
      }
    }
    .info {
      padding-top: 150px;
      text-align: center;
      .img {
        margin: 0 auto;
        width: 150px;
        img {
          width: 100%;
        }
      }
      .noInfo {
        height: 45px;
        line-height: 45px;
        color: #666;
      }
      .btn {
        input {
          border: none;
          background: #ff644c;
          color: #fff;
          padding: 5px 16px;
          border-radius: 4px;
        }
      }
    }
  }
}
@media screen and (max-width: 329px) {
  .notice {
    .notice_news {
      .info {
        padding-top: 120px;
      }
    }
  }
}
</style>
