<template>
	<div>
		<div class="phoneHeader">
			<publicHeader :title='titles'></publicHeader>
		</div>
		<div class="search_box" @click="go_search()">
			<div class="search_body clearFloat">
				<div class="search_body_box">
					<div>
						<img src="../../assets/icons/icon_search.png" />
					</div>
					<div>
						{{$t('home.search_for_content')}}
					</div>
				</div>
			</div>
		</div>
		<div class="seller_list_body public_seller_list_bodys contain">
			<publicSellerList></publicSellerList>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import publicSellerList from './components/public_seller_list.vue'
export default {
  name: 'seller_list',
  data() {
    return {
      titles: ''
    }
  },
  beforeCreate() {
    // sessionStorage.setItem('default_sort', '')
    // sessionStorage.setItem('sortType', '')
    // sessionStorage.setItem('activityType_msg', '')
    // sessionStorage.setItem('deliveryScheme_msg', '')
  },
  created() {
    this.titles = localStorage.getItem('label_title')
    store.state.seller_list.currentPage = 0
  },
  components: {
    publicHeader,
    publicSellerList
  },
  methods: {
    go_search() {
      sessionStorage.setItem('list_to_search', true)
      this.$router.push({
        path: '/seller_search',
        query: {
          catId: this.$route.query.catId,
          promotionType: this.$route.query.promotionType
        }
      })
    }
  }
}
</script>

<style scoped>
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.phoneHeader {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  z-index: 2;
}

.seller_list_body {
  margin-top: 25%;
  width: 100%;
}

.search_box {
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: fixed;
  top: 7%;
  z-index: 2;
  background: #f0f0f0;
}

.search_body {
  width: 100%;
  height: 60%;
  background: white;
  border-radius: 5px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.search_body_box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search_body_box div {
  float: left;
  display: flex;
  align-items: center;
  color: #b2b2b2;
}

.search_body_box div:first-child {
  width: 0.6rem;
  margin-right: 0.2rem;
}

.search_body_box img {
  width: 100%;
}
</style>