<template>
	<div class="retriete_password">
		<div class="forget_second">
			<div class="header">
				<div class="back" @click="back"><img src="../../assets/icons/icon_arrows_left@2x.png" alt=""></div>
				<div class="title">
					{{$t('login_index.forgot_pws')}}
				</div>
			</div>
			<div class="register_pass">
				<div class="password_second">
					<input type="password" v-model="password" :placeholder="$t('account_and_security.set_payment_pw.input_new_pw')" v-if="openPass">
					<input type="text" v-model="password" :placeholder="$t('account_and_security.set_payment_pw.input_new_pw')" v-else>
					<span @click="changeType">
						<img src="../../assets/icons/icon_visual_01@2x.png" alt="" v-if="!openPass">
						<img src="../../assets/icons/icon_visual_02@2x.png" alt="" v-else>
					</span>
				</div>
				<div class="password_second">
					<input type="password" v-model="pass" :placeholder="$t('account_and_security.set_payment_pw.re_input_new_pw')" v-if="openPassword">
					<input type="text" v-model="pass" :placeholder="$t('account_and_security.set_payment_pw.re_input_new_pw')" v-else>
					<span @click="changeTypes">
						<img src="../../assets/icons/icon_visual_01@2x.png" alt="" v-if="!openPassword">
						<img src="../../assets/icons/icon_visual_02@2x.png" alt="" v-else>
					</span>
				</div>
				<!-- <p>{{$t('login_index.read')}}<router-link to="">{{$t('login_index.user_server')}}</router-link></p> -->
				<div class="login_btn" @click="retriete_sub">
					<div>{{$t('login_index.submit_con')}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import publicHeader from '../../components/public_header'
import store from '../../store'
export default {
  name: 'retriete_password',
  data() {
    return {
      password: '',
      pass: '',
      certificate: '',
      phoneArea: '',
      openPass: true,
      openPassword: true
    }
  },
  components: {},
  mounted() {
    this.certificate = sessionStorage.getItem('certificate')
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    changeType() {
      this.openPass = !this.openPass
    },
    changeTypes() {
      this.openPassword = !this.openPassword
    },
    retriete_sub() {
      let userPass = /^[0-9A-Za-z]{6,14}/
      if (!this.password) {
        let passError = this.$t('registered.set_pw_holder')
        this.toast.error(passError)
        return
      } else if (!userPass.test(this.password)) {
        let txt = this.$t('registered.text_pass')
        this.toast.error(txt)
        return
      } else if (!this.pass) {
        let cfmError = this.$t('registered.repeat_pw_holder')
        this.toast.error(cfmError)
        return
      } else if (!userPass.test(this.pass)) {
        let txt = this.$t('registered.text_pass')
        this.toast.error(txt)
        return
      }
      if (this.password !== this.pass) {
        let sameError = this.$t(
          'account_and_security.set_payment_pw.inequality'
        )
        this.toast.error(sameError)
        return
      }
      store
        .dispatch('forgetPassApi', {
          certificate: this.certificate,
          password: this.password,
          cfmPassword: this.pass
        })
        .then(res => {
          if (res.data.code === 1) {
            // store.state.userInfo.phoneArea = '63'
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            userInfo.phoneArea = '63'
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.toast.success(res.data.message)
            this.$router.push('/login')
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
.forget_second {
  .header {
    text-align: center;
    padding: 15px;
    background: #fff;
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
      font-size: 20px;
      color: #666;
      // display: inline-block;
    }
  }
  .register_pass {
    .password_second {
      background: #fff;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      border-bottom: 1px solid #ededed;
      position: relative;
      input {
        border: none;
        width: 85%;
      }
      img {
        width: 25px;
        position: absolute;
        top: 13px;
        right: 15px;
      }
    }
    p {
      font-size: 13px;
      margin-top: 14px;
      text-align: center;
      color: #666;
      a {
        font-size: 13px;
        color: #4a90e2;
      }
    }
    .login_btn {
      margin-top: 2rem;
    }
  }
  .login_btn {
    margin-top: 1rem;
    div {
      border: none;
      background: #ff644c;
      color: #fff;
      margin: 10px;
      padding: 10px;
      font-size: 18px;
      border-radius: 4px;
      width: 94.8%;
      text-align: center;
    }
  }
}
</style>
