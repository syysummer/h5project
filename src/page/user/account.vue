<template>
	<div class="account">
		<div class="header">
			<publicHeader :title="account_and_security.title"></publicHeader>
		</div>
		<div class="contain_content">
			<div class="context">
				<div class="user_head">
					<span>{{account_and_security.user_avatar}}</span>
					<div>
						<img src="../../assets/images/default_img@2x.png" alt="" v-if="!isImages">
						<img :src="userInfo.memberObj.profilePhoto" alt="" v-else>
					</div>
				</div>
				<div class="username">
					<span>{{account_and_security.username}}</span>
					<span class="names">{{userInfo.userName}}</span>
					<!-- <img src="../../assets/icons/goto@2x.png" alt="" v-if="!isModify"> -->
				</div>
			</div>
			<div class="security">
				<div class="title">{{account_and_security.security_settings}}</div>
				<div class="password" @click="setPass">{{account_and_security.login_password}}
					<img src="../../assets/icons/goto@2x.png" alt="">
				</div>
				<!-- <div class="payment_pass" @click="setPayment">{{account_and_security.payment_code}}
                    <img src="../../assets/icons/goto@2x.png" alt="">
                </div> -->
			</div>
			<div class="logout" @click="logout">
				{{$t('setting.sign_out')}}
			</div>
		</div>
	</div>
</template>
<script>
import publicHeader from '../../components/public_header'
import store from '../../store'
export default {
  name: 'account',
  data() {
    return {
      isImages: false,
      isModify: false,
      userInfo: {}
    }
  },
  components: { publicHeader },
  computed: {
    account_and_security() {
      let account_and_security = this.$t('account_and_security')
      return account_and_security
    }
  },
  mounted() {
    let userInfo = localStorage.getItem('userInformation')
    this.userInfo = JSON.parse(userInfo)
    if (this.userInfo.memberObj.profilePhoto) {
      this.isImages = true
    } else {
      this.isImages = false
    }
  },
  methods: {
    setPass() {
      this.$router.push('/set_pass/' + this.userInfo.passwordStatus)
    },
    // setPayment() {
    //     this.$router.push('/set_payment/'+ this.userInfo.modifyThe)
    // },
    logout() {
      store
        .dispatch('logoutApi')
        .then(res => {
          if (res.data.code === 1) {
            localStorage.setItem('hasLog', 0)
            store.state.is_login = res.data.code == 1 && false
            localStorage.removeItem('userInformation')
            this.$router.push({
              path: '/login',
              query: { pathName: this.$route.name }
            })
          } else {
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style scoped lang="scss">
.account {
  height: 100%;
  .header {
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid #dddddd;
  }
  .contain_content {
    position: fixed;
    top: 7%;
    width: 100%;
  }
  .context {
    background: #fff;
    margin-top: 15px;
    .user_head {
      height: 65px;
      line-height: 65px;
      padding: 0 20px;
      color: #333;
      font-size: 15px;
      border-bottom: 1px solid #ededed;
      div {
        float: right;
        img {
          width: 50px;
          height: 50px;
          margin-bottom: -19px;
        }
      }
    }
    .username {
      height: 45px;
      line-height: 45px;
      padding: 0 20px;
      color: #333;
      font-size: 15px;
      position: relative;
      .names {
        color: #999;
        float: right;
        // margin-right: 10px;
      }
      img {
        width: 13px;
        position: absolute;
        top: 16px;
        right: 10px;
      }
    }
  }
  .security {
    margin-top: 15px;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 5px;
    div {
      height: 40px;
      line-height: 40px;
      color: #333;
      padding: 0 20px;
      position: relative;
      font-size: 15px;
      img {
        width: 13px;
        position: absolute;
        top: 15px;
        right: 10px;
      }
    }
    .password {
      // border-bottom: 1px solid #EDEDED;
    }
    .title {
      color: #b0b0b0;
      font-size: 16px;
    }
  }
  .logout {
    width: 93%;
    margin: 2rem auto;
    background: #ff644c;
    border: none;
    color: #fff;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 4px;
  }
}
</style>
