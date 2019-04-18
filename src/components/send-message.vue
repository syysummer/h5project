<template>
	<div class="picture_message" v-if="visible">
		<div class="send-message">
			<p>{{$t('registered.popup_box.img_verify')}}</p>
			<div class="verify">
				<input type="text" v-model="vCode" :placeholder="$t('pw_login.verify_code')" />
				<div class="vCode_img">
					<img :src="codeImg" v-if="!imgLoading">
					<!-- <img src="" v-if="!imgLoading"> -->
				</div>
			</div>
			<div class="change_one">
				<img src="../assets/icons/icon__error@2x.png" alt="" v-if="isWrong">
				<img src="../assets/icons/icon_Correct@2x.png" alt="" v-if="isRight">
				<span @click="getCodeImage">{{$t('registered.popup_box.change_verify')}}</span>
			</div>
			<div class="sub_btn">
				<div @click="visible=false">{{$t('registered.popup_box.cancel_btn')}}</div>
				<div @click="submit">{{$t('registered.sure')}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import store from '../store'

export default {
  name: 'send-message',
  props: ['mobile', 'globalCode', 'messageCode', 'invitation'],
  data() {
    return {
      vCode: null,
      module: '',
      codeImg: '',
      imgLoading: false,
      submitLoading: false,
      clientType: '2',
      visible: false,
      isWrong: false,
      isRight: false
    }
  },
  created() {
    this.getCodeImage()
  },
  mounted() {
    this.getCodeImage
  },
  methods: {
    // ...mapActions('user', ['ajaxCodeImg', 'ajaxSendMessage']),
    getCodeImage() {
      if (this.imgLoading) return
      this.imgLoading = true
      let vCodeId = sessionStorage.getItem('vCodeId')
      store
        .dispatch('getCode', { clientType: this.clientType, vCodeId: vCodeId })
        .then(res => {
          let codeImg = res
          this.codeImg = codeImg
        })
        .catch(err => {
          console.error(err)
        })
      this.imgLoading = false
    },
    open() {
      this.getCodeImage()
      this.vCode = null
      this.visible = true
    },
    close() {
      this.visible = false
      this.$emit('close')
    },
    submit() {
      let self = this
      let { vCode, module, globalCode, mobile, clientType } = self
      if (!vCode) {
        let vCodeWarn = self.$t('registered.popup_box.img_verify')
        self.toast.warning(vCodeWarn)
        self.getCodeImage()
        return
      }
      let messageCode = self.messageCode
      switch (messageCode) {
        case 1:
          module = '1'
          break
        case 2:
          module = '3'
          break
        case 3:
          module = '2'
          break
        case 4:
          module = '5'
          break
        case 7:
          module = '7'
          break
        case 8:
          module = '8'
        default:
          break
      }
      self.submitLoading = true
      let vCodeId = sessionStorage.getItem('vCodeId')
      // let res = await this.ajaxSendMessage({vCode, module, mobile, globalCode,clientType,vCodeId:vCodeId})
      store
        .dispatch('phoneCodeApi', {
          vCode,
          module,
          mobile,
          globalCode,
          clientType,
          vCodeId: vCodeId
        })
        .then(res => {
          if (res.data.code === 1) {
            self.$emit('selfEvent')
            self.toast.success(res.data.message)
            self.close()
          } else {
            if (this.$route.path == '/invitation_register') {
              if (
                res.data.message == 'The phone number has already existed' ||
                res.data.message == '手机号码已存在'
              ) {
                self.$emit('invitation')
                self.close()
                return false
              } else {
                self.toast.error(res.data.message)
                self.getCodeImage()
              }
            } else {
              self.toast.error(res.data.message)
              self.getCodeImage()
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
      self.submitLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.picture_message {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 999;
  .send-message {
    width: 72%;
    background: #f9f9f9;
    border-radius: 10px;
    margin: 40% auto;
    z-index: 9999;
    // margin-top: 20px;
    p {
      text-align: center;
      color: #333;
      padding-top: 20px;
      margin-bottom: 25px;
    }
    .verify {
      background: #fff;
      width: 94%;
      margin: 10px auto;
      input {
        border: none;
        padding: 8px;
        width: 70%;
      }
      .vCode_img {
        display: inline-block;
        width: 27%;
        height: 29px;
        padding: 2px;
        img {
          width: 100%;
          margin-bottom: -8px;
        }
      }
    }
    .change_one {
      margin-top: 10px;
      height: 40px;
      padding: 0 10px 15px;
      border-bottom: 1px solid #ededed;
      img {
        width: 18px;
        margin-bottom: -4px;
      }
      span {
        float: right;
        font-size: 14px;
        color: #ff644c;
      }
    }
    .sub_btn {
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      height: 45px;
      div {
        &:first-child {
          border-right: 1px solid #ededed;
          color: #666;
        }
        height: 100%;
        line-height: 45px;
        display: inline-block;
        width: 48%;
        text-align: center;
        color: #ff644c;
        font-size: 14px;
      }
    }
  }
}
</style>
