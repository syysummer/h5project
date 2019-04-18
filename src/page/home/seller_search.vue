<template>
	<div>
		<!-- 头部搜索框 -->
		<div class="search_header clearFloat">
			<div class="back_btn" @click="go_back">
				<div>
					<img src="../../assets/icons/icon_arrows_left@2x.png" />
				</div>
			</div>
			<div class="search_input">
				<div class="search_input_box clearFloat">
					<div>
						<img src="../../assets/icons/search.png" />
					</div>
					<div>
						<input @focus="focused" type="text" autofocus v-model="search_text" :placeholder="search_msg.search_for_content">
					</div>
				</div>
			</div>
			<div class="search_btn" @click="to_search">
				{{search_msg.search_btn}}
			</div>
		</div>

		<!-- 热门搜索 -->
		<!-- <div class="hot_search" v-show="search_text==''">
      <div class="public_title clearFloat">
        <div>
          热门搜索
        </div>
        <div></div>
      </div>

      <div class="search_content clearFloat">
        <div v-for="(item, index) in hot_search" :key="index">
          {{item}}
        </div>
      </div>
    </div> -->

		<!-- 历史搜索 -->
		<div class="history_search" :style="{top: this.searchHeight}" @focus="focused" v-show="search_text==''">
			<div style="width: 3px; height: 16px; background: #666666; float: left; border-radius: 5px;position: relative; top: 3px;">&nbsp;</div>
			<div class="public_title clearFloat">
				<div>
					{{search_msg.historical_search}}
				</div>
				<div @click="clear_history_search" v-show="this.history_search.length!=0">
					<img src="../../assets/icons/icon_searchlist_Trash@2x.png" />
				</div>
			</div>

			<div class="search_content clearFloat">
				<div v-for="(item, index) in history_search" :key="index" @click="history_search_fn(index)">
					{{item}}
				</div>
			</div>
		</div>

		<!-- 无结果 -->
		<div class="empty" v-show="empty">
			<div>
				<img src="../../assets/images/null-shop.png" />
			</div>
			<div>
				{{search_msg.no_search_result}}
			</div>
		</div>

		<!-- 搜索结果 -->
		<div class="seller_list_body" v-show="has_result">
			<publicSellerList></publicSellerList>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicSellerList from './components/public_seller_list.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies'
export default {
  name: 'seller_search',
  data() {
    return {
      search_text: '',
      currentPage: 1,
      lat: 0,
      lng: 0,
      empty: false,
      has_result: false,
      history_search: [],
      searchHeight: '',
      isFocus: false,
      sortType: '',
      catId: '',
      promotionType: '',
      activityType: '',
      deliveryScheme: ''
    }
  },
  components: {
    publicSellerList
  },
  watch: {
    search_text: function() {
      if (this.search_text == '') {
        this.empty = false
        this.has_result = false
      }
    }
  },
  computed: {
    search_msg() {
      let search_msg = this.$t('search')
      return search_msg
    }
  },
  created() {
    if (sessionStorage.getItem('history_search')) {
      this.history_search = sessionStorage.getItem('history_search').split(',')
    } else {
      this.history_search = []
    }
    let current_address_latlng = localStorage.getItem('current_address_latlng')
    if (current_address_latlng) {
      this.lat = parseFloat(JSON.parse(current_address_latlng).lat)
      this.lng = parseFloat(JSON.parse(current_address_latlng).lng)
    } else {
      this.toast.error(this.search_msg.can_not_location)
    }
  },
  mounted() {
    if (localStorage.getItem('search_keyword') != '') {
      this.search_text = localStorage.getItem('search_keyword')
      this.to_search()
    }
  },
  methods: {
    focused() {
      this.searchHeight =
        parseFloat(
          getComputedStyle(document.querySelector('.search_header')).height
        ) + 'px'
    },
    // 选择历史搜索
    history_search_fn(index) {
      this.search_text = this.history_search[index]
      this.to_search()
    },
    to_search() {
      this.sortType = sessionStorage.getItem('sortType')
      this.catId = localStorage.getItem('catId')
      this.deliveryScheme = sessionStorage.getItem('deliveryScheme_msg')
      this.activityType = sessionStorage.getItem('activityType_msg')
      this.promotionType = localStorage.getItem('promotionType')

      if (this.search_text.trim(' ') == '') {
        this.toast(this.search_msg.search_empty)
        return
      } else {
        store
          .dispatch('seller_list_sort', {
            lat: this.lat,
            lon: this.lng,
            currentPage: this.currentPage,
            showCount: 10,
            sortType: this.sortType,
            deliveryScheme: this.deliveryScheme,
            activityType: this.activityType,
            promotionType: this.promotionType,
            catId: this.catId,
            keyWord: this.search_text
          })
          .then(res => {
            let data = res.data
            if (res.data.code == 1) {
              for (let i = 0; i < data.data.sellerList.length; i++) {
                // if (data.data.sellerList[i].allSubDiscount) {
                data.data.sellerList[i].open_btn = false
                // }
              }

              for (let i = 0; i < data.data.sellerList.length; i++) {
                if (
                  data.data.sellerList[i].goodList &&
                  data.data.sellerList[i].goodList.length > 2
                ) {
                  data.data.sellerList[i].has_all = true
                  data.data.sellerList[i].show_all = false
                } else {
                  data.data.sellerList[i].has_all = false
                  data.data.sellerList[i].show_all = true
                }
              }

              Object.assign(store.state.search_list, data.data)
              if (store.state.search_list.sellerList == '') {
                this.empty = true
                this.has_result = false
              } else {
                this.empty = false
                this.has_result = true
                if (this.history_search.indexOf(this.search_text) == -1) {
                  this.history_search.unshift(this.search_text)
                  sessionStorage.setItem('history_search', this.history_search)
                }
                localStorage.setItem('search_keyword', this.search_text)
                Object.assign(store.state.seller_list, data.data)
              }
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    // 清空搜索历史
    clear_history_search() {
      sessionStorage.setItem('history_search', [])
      this.history_search = ''
    },
    go_back() {
      localStorage.setItem('search_keyword', '')
      if (
        sessionStorage.getItem('list_to_search') &&
        sessionStorage.getItem('list_to_search') == 'true'
      ) {
        this.$router.push('/seller_list')
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.search_header {
  width: 100%;
  height: 7%;
  min-height: 45px;
  background: white;
  border-bottom: 1px solid #ededed;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: fixed;
  top: 0;
  z-index: 111;
}

.back_btn {
  float: left;
  width: 0.4rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.back_btn div {
  width: 100%;
  height: 36%;
}

.back_btn img {
  width: 100%;
  height: 100%;
}

.search_input {
  float: left;
  width: 8.5rem;
  height: 100%;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  display: flex;
  align-items: center;
}

.search_input .search_input_box {
  width: 100%;
  height: 70%;
  background: #f0f0f0;
  border-radius: 5px;
}

.search_input_box div {
  float: left;
  height: 100%;
}

.search_input_box div:first-child {
  width: 0.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search_input_box img {
  width: 70%;
}

.search_input_box div:last-child {
  width: 7.3rem;
}

.search_input_box input {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border: 0;
  border-radius: 5px;
}

.search_btn {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
}

.hot_search,
.history_search {
  width: 100%;
  padding: 0.4rem;
  background: white;
  /* padding-top: 10vh; */
  position: fixed;
  top: 7%;
}

.public_title {
  width: 100%;
  padding-bottom: 0.4rem;
  border-bottom: 1px dotted #ededed;
}

.public_title div:first-child {
  padding-left: 0.3rem;
  /* border-left: 3px solid #666666; */
  float: left;
}

.public_title div:last-child {
  width: 0.5rem;
  height: 100%;
  float: right;
}

.public_title img {
  width: 100%;
  height: 100%;
}

.search_content {
  width: 100%;
  margin-top: 0.4rem;
}

.search_content div {
  float: left;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  background: #f5f5f5;
  border: 1px solid #ededed;
  border-radius: 5px;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  color: #666666;
  height: 30px;
  line-height: 30px;
}

.empty {
  width: 100%;
  height: 100vh;
  background: white;
  padding-top: 15vh;
}

.empty div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
}

.empty div:last-child {
  margin-top: 15px;
}

.empty img {
  width: 50%;
}

.seller_list_body {
  width: 100%;
  /* height: 93%; */
  /* overflow: scroll; */
  /* position: fixed; */
  /* top: 7%; */
  margin-top: 12%;
}
</style>