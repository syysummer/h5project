<template>
	<div class="contain">
		<div class="phoneHeader">
			<publicHeader :title="get_address_title.my_receiving_address"></publicHeader>
		</div>
		<div class="address_list" v-if="isHaveAddr">
			<v-touch class="address_items" v-for="(item, index) in address" :key=index :style='{right: item.right +"rem"}' @panleft="doLeft(index)" @panright="doRight(index)" @panend="doEnd(index)">
				<div class="address_item" @click="doTap(index)">
					<div class="address_contain" @click="chooseAddr(index)">
						<div class="address_detail">
							{{item.houseNumber +', '+ item.address}}
						</div>
						<div class="others_detail">
							<span class="recipients">{{item.name}}</span>
							<span class="number">{{item.phone}}</span>
							<img @click.stop="editAddr(index)" :src="edit_icon">
						</div>
					</div>
					<div class="address_confirm" @click="deleteAddr(index)" :class="{'address_delete': isDelete}">
						<div>
							{{get_address_title.delete}}
						</div>
					</div>
					<div class="outRang_mask" v-if="item.status == 1">
						<img :src="outRange_zh" v-if="language == 'zh'">
						<img :src="outRange" v-if="language == 'en'">
					</div>
				</div>
			</v-touch>
		</div>
		<div class="btn_contain" v-if="isHaveAddr">
			<button @click="add_address">
				<img :src="add_icon" alt=""> {{get_add_address_title}}
			</button>
		</div>
		<div class="empty_address" v-if="!isHaveAddr">
			<img src="./../assets/images/img_empty_addr.png" alt="">
			<p>{{get_address_title.address_empty}}</p>
			<a href="javascript:;" @click="add_address">{{get_address_title.add_address}}</a>
		</div>
	</div>
</template>
<script>
import publicHeader from '@/components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import store from '@/store'
export default {
  data() {
    return {
      edit_icon: require('@/assets/icons/icon_edit.png'),
      add_icon: require('@/assets/icons/icon_add.png'),
      outRange: require('@/assets/images/img_outRange.png'),
      outRange_zh: require('@/assets/images/img_outRange_zh.png'),
      right: 0,
      time: null,
      isDelete: false,
      isOurRange: false,
      address: [],
      isHaveAddr: true,
      sellerId: '',
      addrCount: 0,
      language: ''
    }
  },
  components: {
    publicHeader
  },
  computed: {
    get_address_title() {
      let title = this.$t('my_address')
      return title
    },
    get_add_address_title() {
      let title = this.$t('my_address.add_address')
      return title
    },
    go_order() {
      this.$router.push(`/submit_order?id=${this.sellerId}`)
    }
  },
  mounted() {
    this.UserOrderAddress()
  },
  created() {
    this.language = getCookie('lang')
    this.sellerId = this.$route.query.id
  },
  methods: {
    chooseAddr(index) {
      // let orderAddress = JSON.parse(sessionStorage.getItem('orderAddress'))
      let orderAddress = {}
      orderAddress.address = this.address[index].address
      orderAddress.name = this.address[index].name
      orderAddress.phone = this.address[index].phone
      orderAddress.id = this.address[index].id
      orderAddress.logistics = this.address[index].logistics
      orderAddress.houseNumber = this.address[index].houseNumber // 将门牌号也添加进去
      orderAddress.select = true
      sessionStorage.setItem('orderAddress', JSON.stringify(orderAddress))
      this.$router.push(`/submit_order?id=${this.sellerId}`)
    },
    UserOrderAddress() {
      store
        .dispatch('UserOrderAddress', { sellerId: this.sellerId })
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.forEach(item => {
              item.right = 0
              item.deleteText = '删除'
            })
            this.address = res.data.data
            this.addrCount = this.address && this.address.length
            sessionStorage.setItem('orderAddress', JSON.stringify(this.address))
            if (this.address.length !== 0) this.isHaveAddr = true
            if (this.address.length == 0) this.isHaveAddr = false
          }
        })
    },
    get_delete_text() {
      let text = this.$t('my_address.delete')
      return text
    },
    get_confirm_text() {
      let text = this.$t('my_address.confirm_delete')
      return text
    },
    /**
     * 触摸逻辑
     */
    doLeft(index) {
      for (let [i, item] of this.address.entries()) {
        if (index !== i) {
          item.right = 0
        }
      }
      if (this.address[index].right < 2.7) {
        this.address[index].right += 0.3
      }
    },
    doRight(index) {
      if (this.address[index].right > 0) {
        this.address[index].right -= 0.3
      }
    },
    doEnd(index) {
      if (this.address[index].right < 1.3) {
        this.time = setInterval(() => {
          if (this.address[index].right.toFixed(1) < 0) {
            clearInterval(this.time)
            this.time = null
            this.address[index].right = 0
            return
          }
          this.address[index].right -= 0.1
        }, 20)
      } else if (this.address[index].right >= 1.3) {
        this.time = setInterval(() => {
          if (this.address[index].right > 2.7) {
            clearInterval(this.time)
            this.time = null
            this.address[index].right = 2.7
            return
          }
          this.address[index].right += 0.1
        }, 20)
      }
    },
    deleteAddr(index) {
      // TODO
      store
        .dispatch('deleteReceivingAddress', {
          id: this.address[index].id
        })
        .then(res => {
          if (res.data.code === 1) {
            let txt = this.$t('my_address')
            this.toast.success(txt.successfully_delete)
            setTimeout(() => {
              this.$router.go(0)
            }, 500)
            // this.$router.push("/address_list");
          } else {
            this.toast.error(res.data.message)
          }
        })
    },
    doTap(index) {
      for (let [i, item] of this.address.entries()) {
        if (index !== i) {
          item.right = 0
        }
      }
    },
    /**
     *	地址逻辑
     */
    add_address() {
      if (this.addrCount < 5) {
        localStorage.setItem('editAddr', 'false')
        this.$router.push(`/add_address?sellerId=${this.sellerId}`)
      } else {
        this.toast(this.get_address_title.most_address)
      }
    },

    editAddr(index) {
      store.state.userInfo.id = this.address[index].id
      store.state.userInfo.userName = this.address[index].name
      store.state.userInfo.sex = this.address[index].sex
      store.state.userInfo.phoneNumber = this.address[index].phone
      store.state.userInfo.phoneArea = this.address[index].tel
      store.state.userInfo.add_address.address = this.address[index].address
      store.state.userInfo.room = this.address[index].houseNumber
      store.state.userInfo.add_address.locPos.lat = this.address[index].lat
      store.state.userInfo.add_address.locPos.lng = this.address[index].lon
      let locPos = {
        lat: this.address[index].lat,
        lng: this.address[index].lon
      }
      localStorage.setItem('new_address_latlng', JSON.stringify(locPos))
      localStorage.setItem('new_city_name', this.address[index].address)
      localStorage.setItem('editAddr', 'true')
      sessionStorage.setItem('userInfo', JSON.stringify(store.state.userInfo))
      this.$router.push(`/add_address?sellerId=${this.sellerId}&edit=edit`)
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
.contain {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  .phoneHeader {
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 1;
  }
  .address_list {
    position: fixed;
    top: 7%;
    width: 100%;
    height: 93%;
    .address_items {
      position: relative;
      right: 0;
      top: 0;
      &:first-child {
        border-top: 1px solid #eee;
      }
      .address_item {
        position: relative;
        .address_contain {
          border-bottom: 1px solid #eee;
          padding: 0.2rem 0.4rem 0.2rem 0.6rem;
          display: flex;
          flex-flow: column;
          .address_detail {
            margin-bottom: 0.1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 14px;
            color: #333;
          }
          .others_detail {
            color: #bbb;
            span {
              font-size: 13px;
            }
            .recipients {
              margin-right: 0.1rem;
            }
            img {
              float: right;
              width: 5.9%;
            }
          }
        }
        .address_confirm {
          position: absolute;
          right: -2.7rem;
          top: 0;
          background-color: #ff644d;
          text-align: center;
          width: 2.7rem;
          padding: 0 0.35rem;
          height: 100%;
          color: #fff;
          border-top: 1px solid #ff644d;
          border-bottom: 1px solid #ff644d;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 2rem;
            font-size: 15px;
          }
        }
        .address_delete {
          background-color: #ff3633;
        }
        .outRang_mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.9);
          img {
            width: 2rem;
            position: absolute;
            right: 1.2rem;
            top: 0.3rem;
          }
        }
      }
    }
  }
  .btn_contain {
    position: fixed;
    bottom: 0.4rem;
    height: auto;
    width: 100%;
    text-align: center;
    button {
      border: 0;
      padding: 0.4rem 0.4rem;
      background-color: #ff644c;
      color: #fff;
      display: inline-block;
      width: 90%;
      height: 100%;
      text-align: center;
      border-radius: 8px;
      img {
        width: 15px;
        position: relative;
        top: 1px;
      }
    }
  }
  .empty_address {
    margin-top: 3rem;
    text-align: center;
    img {
      width: 6rem;
    }
    p {
      margin: 0.3rem 0;
      color: #666;
      font-size: 16px;
    }
    a {
      display: inline-block;
      padding: 0.3rem;
      background-color: #ff644c;
      color: #fff;
      font-size: 14px;
      border-radius: 8px;
    }
  }
}
@media screen and(max-width: 329px) {
  .contain .btn_contain {
    position: fixed;
    bottom: 0.4rem;
  }
}
</style>
