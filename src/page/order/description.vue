<template>
	<div class="description_coupon">
		<div class="descriptionHeader" v-if="showHead">
			<publicHeader :title="$t('description.title')"></publicHeader>
		</div>
		<div :class="{description_content: showHead, description_contents: !showHead}">
			<div class="titles">{{$t('description.new_user')}}</div>
			<ul class="new_user">
				<li>
					<span></span>
					<span>{{$t('description.new_user_note1')}}</span>
				</li>
				<li>
					<span></span>
					<span>{{$t('description.new_user_note2')}}</span>
				</li>
				<li>
					<span></span>
					<span>{{$t('description.new_user_note3')}}</span>
				</li>
			</ul>
			<div class="titles">{{$t('description.first_order')}}</div>
			<ul class="new_user">
				<li>
					<span></span>
					<span>{{$t('description.first_order_note1')}}</span>
				</li>
				<li>
					<span></span>
					<span>{{$t('description.first_order_note2')}}</span>
				</li>
				<li>
					<span></span>
					<span>{{$t('description.first_order_note3')}}</span>
				</li>
			</ul>
			<div class="titles">{{$t('description.shop_first')}}</div>
			<ul class="new_user">
				<li>
					<span></span>
					<span>{{$t('description.shop_first_note')}}</span>
				</li>
			</ul>
			<div class="empty_div"></div>
		</div>
	</div>
</template>
<script>
import publicHeader from '../../components/public_gary_header'
import { setCookie, getCookie } from '../../utils/cookies.js'
export default {
  name: 'description',
  data() {
    return {
      lang: '',
      showHead: false
    }
  },
  beforeCreate() {
    this.$nextTick(function() {
      this.lang = this.$route.query.language
      let language = getCookie('lang')
      if (this.lang != language) {
        setCookie('lang', this.lang, 365)
        setCookie('language', this.lang, 365)
        location.reload()
      } else {
        // this.isShow = true
      }
    })
  },
  created() {
    // 语言切换
    // this.$nextTick(function() {
    //   if (this.lang == "en") {
    //     this.isShow = true;
    //   } else {
    //     this.isShow = false;
    //   }
    // });
  },
  mounted() {
    let local = this.$route.query.local
    if (local == 0) {
      this.showHead = true
    } else {
      this.showHead = false
    }
  },
  components: { publicHeader }
}
</script>
<style scoped lang="scss">
.description_coupon {
  height: 100%;
  background: #ffffff;
  .descriptionHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 7%;
    min-height: 40px;
    // border-bottom: 1px solid #dddddd;
  }
  .description_content {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    width: 100%;
    position: fixed;
    top: 7%;
    overflow-y: auto;
    background: #ffffff;
    height: 93%;
    padding: 3px 19px 20px;
    // border-top: 1px solid #dddddd;
    .titles {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 10px 0;
    }
    .new_user {
      li {
        text-indent: 1.5em;
        color: #666666;
        font-size: 15px;
        span {
          &:first-child {
            border: 1px solid #666666;
            width: 5px;
            height: 5px;
            display: inline-block;
            background: #666666;
            border-radius: 2px;
            margin-bottom: 3px;
            margin-right: 5px;
          }
          font-size: 14px;
        }
      }
    }
  }
  .description_contents {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    background: #ffffff;
    padding: 3px 19px 20px;
    // border-top: 1px solid #dddddd;
    .titles {
      font-size: 15px;
      font-weight: 600;
      color: #333333;
      margin: 10px 0;
    }
    .new_user {
      li {
        text-indent: 1.5em;
        color: #666666;
        font-size: 15px;
        span {
          &:first-child {
            border: 1px solid #666666;
            width: 5px;
            height: 5px;
            display: inline-block;
            background: #666666;
            border-radius: 2px;
            margin-bottom: 3px;
            margin-right: 5px;
          }
          font-size: 14px;
        }
      }
    }
  }
}
</style>
