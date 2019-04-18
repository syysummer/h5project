<template>
	<div class="set_pass">
		<div class="header">
			<publicHeader :title="hasPass?change_pw.edit_pw:change_pw.set_pay_pw"></publicHeader>
		</div>
		<div class="content">
			<div class="setting">
				<div class="old_pass" v-if="hasPass">
					<input type="password" v-model="oldPass" :placeholder="change_pw.old_login_pw">
				</div>
				<div class="password">
					<input type="password" v-model="password" :placeholder="change_pw.login_pw" />
				</div>
				<div class="new_pass">
					<input type="password" v-model="prePass" :placeholder="change_pw.re_login_pw" />
				</div>
			</div>
			<div class="confirm" @click="submit">
				<div>{{change_pw.submit}}</div>
			</div>
		</div>
		<!-- <div class="submit" v-else>
            <input type="button" :value="change_pw.submit">
        </div> -->
	</div>
</template>
<script>
import publicHeader from '../../../components/public_header.vue'
import store from '../../../store'
export default {
  name: 'set_pass',
  data() {
    return {
      hasPass: false,
      oldPass: '',
      password: '',
      prePass: '',
      params: ''
    }
  },
  components: { publicHeader },
  computed: {
    change_pw() {
      let change_pw = this.$t('change_pw')
      return change_pw
    },
    passwordStatus() {
      return this.$route.params.id
    }
  },
  mounted() {
    if (this.passwordStatus == 0) {
      this.hasPass = false
    } else {
      this.hasPass = true
    }
  },
  methods: {
    submit() {
      let userPass = /^[0-9A-Za-z]{6,14}/
      if (this.passwordStatus == 0) {
        if (!this.password) {
          let passError = this.$t('registered.set_pw_holder')
          this.toast.error(passError)
          return
        } else if (!userPass.test(this.password)) {
          let txt = this.$t('registered.text_pass')
          this.toast.error(txt)
          return
        } else if (!this.prePass) {
          let cfmError = this.$t('registered.repeat_pw_holder')
          this.toast.error(cfmError)
          return
        } else if (!userPass.test(this.prePass)) {
          let txt = this.$t('registered.text_pass')
          this.toast.error(txt)
          return
        } else if (this.password !== this.prePass) {
          let sameError = this.$t(
            'account_and_security.set_payment_pw.inequality'
          )
          this.toast.error(sameError)
          return
        }
        this.params = {
          passwordStatus: this.passwordStatus,
          password: this.password,
          cfmPassword: this.prePass
        }
      } else {
        if (!this.oldPass) {
          let oldError = this.$t('registered.set_oldPw_holder')
          this.toast.error(oldError)
          return
        } else if (!this.password) {
          let passError = this.$t('registered.set_pw_holder')
          this.toast.error(passError)
          return
        } else if (!userPass.test(this.password)) {
          let txt = this.$t('registered.text_pass')
          this.toast.error(txt)
          return
        }
        if (!this.prePass) {
          let cfmError = this.$t('registered.repeat_pw_holder')
          this.toast.error(cfmError)
          return
        } else if (!userPass.test(this.prePass)) {
          let txt = this.$t('registered.text_pass')
          this.toast.error(txt)
          return
        }
        if (this.password !== this.prePass) {
          let sameError = this.$t(
            'account_and_security.set_payment_pw.inequality'
          )
          this.toast.error(sameError)
          return
        }
        this.params = {
          passwordStatus: this.passwordStatus,
          password: this.oldPass,
          newpassword: this.password,
          cfmPassword: this.prePass
        }
      }
      store
        .dispatch('modifyPassApi', this.params)
        .then(res => {
          if (res.data.code === 1) {
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
.set_pass {
  height: 100%;
  .header {
    border-bottom: 1px solid #ededed;
    min-height: 30px;
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 1;
  }
  .content {
    position: fixed;
    top: 7%;
    height: 93%;
    width: 100%;
  }
  .setting {
    background: #fff;
    div {
      &:last-child {
        border-bottom: none;
      }
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ededed;
      margin-left: 20px;
    }
    input {
      border: none;
      width: 100%;
    }
  }
  .submit {
    margin: 100px auto;
    width: 93%;
    input {
      border: none;
      background: #ff644c;
      color: #fff;
      width: 100%;
      padding: 12px;
      border-radius: 4px;
    }
  }
  .confirm {
    margin: 50px auto;
    width: 93%;
    div {
      border: none;
      background: #ff644c;
      color: #fff;
      width: 100%;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>
