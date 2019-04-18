<template>
	<div class="set_payment">
		<div class="header">
			<publicHeader :title="hasPass?change_pw.edit_pay_pw:change_pw.set_pw"></publicHeader>
		</div>
		<div class="content">
			<div class="setting">
				<div class="old_pass" v-if="hasPass">
					<input type="password" v-model="oldPass" :placeholder="change_pw.old_pay_pw">
				</div>
				<div class="password" v-if="!hasPass">
					<input type="password" v-model="password" :placeholder="change_pw.login_pw" />
				</div>
				<div class="new_pass" v-if="!hasPass">
					<input type="password" v-model="prePass" :placeholder="change_pw.re_login_pw" />
				</div>
				<div class="new_pass" v-if="hasPass">
					<input type="password" v-model="password" :placeholder="change_pw.new_pay_pw" />
				</div>
				<div class="new_pass" v-if="hasPass">
					<input type="password" v-model="prePass" :placeholder="change_pw.re_login_pw" />
				</div>
			</div>
			<div class="submit" @click="submit">
				<div>{{change_pw.submit}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import publicHeader from '../../../components/public_header.vue'
import store from '../../../store'
export default {
  name: 'set_payment',
  data() {
    return {
      hasPass: false,
      oldPass: '',
      password: '',
      prePass: '',
      params: '',
      modifyThe: ''
    }
  },
  components: { publicHeader },
  computed: {
    change_pw() {
      let change_pw = this.$t('change_pw')
      return change_pw
    }
  },
  mounted() {
    this.getUserinfo()
  },
  methods: {
    getUserinfo() {
      store
        .dispatch('userInfoApi')
        .then(res => {
          if (res.data.code === 1) {
            this.modifyThe = res.data.data.modifyThe
            if (this.modifyThe == 0) {
              this.hasPass = false
            } else {
              this.hasPass = true
            }
          } else {
            this.toast.error(res.data.message)
          }
          this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    },
    submit() {
      if (this.modifyThe == 0) {
        if (!this.password) {
          let passError = this.$t('change_pw.login_pw')
          this.toast.error(passError)
          return
        } else if (!this.prePass) {
          let cfmError = this.$t('change_pw.re_login_pw')
          this.toast.error(cfmError)
          return
        } else if (this.password !== this.prePass) {
          let sameError = this.$t(
            'account_and_security.set_payment_pw.inequality'
          )
          this.toast.error(sameError)
          return
        }
        this.params = {
          payPasswordStatus: this.modifyThe,
          payPassword: this.password,
          cfmPayPassword: this.prePass
        }
      } else {
        if (!this.oldPass) {
          let oldError = this.$t('change_pw.old_pay_pw')
          this.toast.error(oldError)
          return
        } else if (!this.password) {
          let cfmError = this.$t('change_pw.new_pay_pw')
          this.toast.error(cfmError)
          return
        } else if (!this.prePass) {
          let cfmError = this.$t('change_pw.re_login_pw')
          this.toast.error(cfmError)
          return
        }
        this.params = {
          payPasswordStatus: this.modifyThe,
          payPassword: this.oldPass,
          newpayPassword: this.password,
          cfmPayPassword: this.prePass
        }
      }
      store.dispatch('modifyPayPassApi', this.params).then(res => {
        if (res.data.code === 1) {
          this.toast.success(res.data.message)
          this.$router.push('/account')
        } else {
          this.toast.error(res.data.message)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.set_payment {
  height: 100%;
  .header {
    border-bottom: 1px solid #ededed;
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    z-index: 1;
  }
  .content {
    position: fixed;
    top: 7%;
    width: 100%;
    height: 93%;
  }
  .setting {
    background: #fff;
    position: fixed;
    top: 7%;
    width: 100%;
    height: 93%;
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
    margin: 80px auto;
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
