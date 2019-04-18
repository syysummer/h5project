<template>
	<div class="feedback">
		<div class="header">
			<publicHeader :title="suggestion.title"></publicHeader>
		</div>
		<div class="content">
			<div class="textarea">
				<textarea v-model="advice" :placeholder="suggestion.please_leave" maxlength="200" @blur="keepContent"></textarea>
				<div class="imgList" v-if="showImg">
					<span v-for="(item, index) in imgList" :key="index"><img src="" alt=""></span>
				</div>
				<div class="advice_length">{{advice.length}}/200</div>
				<div class="uploadImg">
					<el-upload ref="file_list" :data="upToken" action="https://up.qiniup.com" multiple :limit="9" list-type="picture-card" :before-upload="uploadImg" :on-success="successUpload" :on-error="errorUpload" :on-exceed="removeUpload" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
			</div>
			<div class="areacode" @click="setCode">
				<img src="../../assets/icons/goto@2x.png" alt="">
				<span>{{suggestion.country_code}}</span>
				<span>+{{areaCode}}</span>
			</div>
			<div class="phone">
				<span>{{suggestion.tel}}</span>
				<input type="number" v-model="tel">
			</div>
			<div class="btn" @click="submit" v-if="!subLoading">
				<div>{{suggestion.submit}}</div>
			</div>
			<div class="btn_loading" v-else>
				<div><img src="../../assets/icons/is_loading.gif" alt=""></div>
			</div>
		</div>
	</div>
</template>
<script>
import publicHeader from '../../components/public_header.vue'
import store from '../../store'
export default {
  name: 'feedback',
  data() {
    return {
      advice: '',
      areaCode: '',
      tel: '',
      userInformation: {},
      imgList: [],
      showImg: false,
      hash: '',
      upToken: {
        token: ''
      },
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      },
      subLoading: false,
      loading_text: '',
      language: ''
    }
  },
  components: { publicHeader },
  computed: {
    suggestion() {
      let suggestion = this.$t('suggestion')
      return suggestion
    }
  },
  created() {
    this.language = getCookie('lang')
    if (this.language == 'zh') {
      this.loading_text = '加载中……'
    } else if (this.language == 'en') {
      this.loading_text = 'Loading...'
    }

    // 获取七牛Token
    store.dispatch('qiniuTokenApi', {}).then(res => {
      this.upToken.token = res.data.data
    })
  },
  mounted() {
    let userInformation = localStorage.getItem('userInformation')
    this.areaCode = sessionStorage.getItem('feedback_code')
    this.userInformation = JSON.parse(userInformation)
    if (!this.areaCode) {
      this.areaCode = this.userInformation.globalCode
    }
    this.tel = this.userInformation.tel
    let advice = sessionStorage.getItem('advice')
    if (advice) {
      this.advice = advice
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('feedback_code')
  },
  methods: {
    setCode() {
      this.$router.push('/phone_area')
    },

    removeUpload(file, fileList) {
      let warntext = this.$t('order.detail.alert.uploadImgLim')
      this.toast.warning(warntext)
    },
    handleRemove(file, fileList) {
      if (file.status == 'success') {
        // fileList.splice(file, 1)
        if (fileList.length <= 8) {
          setTimeout(() => {
            document.getElementsByClassName(
              'el-upload--picture-card'
            )[0].style.display =
              'inline-block'
          }, 300)
        }
      }
    },
    uploadImg(file) {
      const loading = this.$loading({
        lock: true,
        text: this.loading_text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
      })
      if (file) {
        loading.close()
      }
    },
    errorUpload(err, file, fileList) {
      let errortext = this.$t('order.detail.errorImg')
      this.toast.warning(errortext)
    },

    successUpload(response, file, fileList) {
      this.hash = ''
      fileList.forEach(el => {
        if (el.response) {
          this.hash += el.response.hash + ','
        }
      })
      this.hash = this.hash.substring(0, this.hash.length - 1)
      fileList.forEach(item => {
        if (item.status == 'success') {
          this.imgList = fileList
          if (this.imgList.length >= 9) {
            document.getElementsByClassName(
              'el-upload--picture-card'
            )[0].style.display =
              'none'
          }
        }
      })
    },
    keepContent() {
      sessionStorage.setItem('advice', this.advice)
    },
    isEmojiCharacter(substring) {
      for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i)
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1)
            var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true
            }
          }
        } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1)
          if (ls == 0x20e3) {
            return true
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            return true
          } else if (0x2b05 <= hs && hs <= 0x2b07) {
            return true
          } else if (0x2934 <= hs && hs <= 0x2935) {
            return true
          } else if (0x3297 <= hs && hs <= 0x3299) {
            return true
          } else if (
            hs == 0xa9 ||
            hs == 0xae ||
            hs == 0x303d ||
            hs == 0x3030 ||
            hs == 0x2b55 ||
            hs == 0x2b1c ||
            hs == 0x2b1b ||
            hs == 0x2b50
          ) {
            return true
          }
        }
      }
    },
    submit() {
      if (!this.tel) {
        let telErrors = this.$t('registered.tel_err')
        this.toast.error(telErrors)
        return
      } else if (!this.advice) {
        let textErrors = this.$t('suggestion.please_leave_proposal')
        this.toast.error(textErrors)
        return
      } else if (this.isEmojiCharacter(this.advice)) {
        let textErrors = this.$t('suggestion.emoticons')
        this.toast.error(textErrors)
        return
      }
      this.subLoading = true
      store
        .dispatch('feedbackApi', {
          phonePre: this.areaCode,
          phone: this.tel,
          content: this.advice,
          picture: this.hash,
          source: 2
        })
        .then(res => {
          if (res.data.code === 1) {
            this.subLoading = false
            let successText = this.$t('suggestion.submnit_success')
            this.toast.success(successText)
            this.advice = ''
            sessionStorage.removeItem('advice')
            this.$router.push('/user')
          } else {
            this.subLoading = false
            this.toast.error(res.data.message)
          }
        })
        .catch(error => {
          console.error(error)
          this.subLoading = false
        })
    }
  }
}
</script>
<style scoped lang="scss">
.feedback {
  height: 100%;
  .header {
    border-bottom: 1px solid #dddddd;
    position: absolute;
    width: 100%;
    height: 7%;
    top: 0;
    min-height: 40px;
    z-index: 1;
  }
  .textarea {
    background: #fff;
    margin-top: 12px;
    padding-bottom: 20px;
    // border-bottom: 1px solid #DDDDDD;
    textarea {
      width: 100%;
      border: none;
      resize: none;
      outline: none;
      height: 90px;
      padding: 15px;
      font-size: 15px;
    }
  }
  .clearfix {
    margin-left: 15px;
    list-style: none;
    .up {
      width: 80px;
      height: 80px;
      background: #f0f0f0;
      border: 1px dashed #dddddd;
      img {
        position: absolute;
        top: 19px;
        left: 19px;
      }
      input {
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        width: 80px;
        height: 80px;
      }
    }
  }
  .areacode {
    margin-top: 10px;
    background: #fff;
    padding: 15px 30px 15px 15px;
    color: #333;
    position: relative;
    span {
      &:last-child {
        float: right;
      }
    }
    img {
      width: 13px;
      position: absolute;
      top: 20px;
      right: 15px;
    }
  }
  .phone {
    background: #fff;
    margin-top: 10px;
    padding: 15px;
    color: #333;
    position: relative;
    input {
      width: 60%;
      border: none;
      text-align: right;
      position: absolute;
      right: 15px;
    }
  }
  .btn {
    margin: 50px auto;
    width: 93%;
    div {
      border: none;
      background: #ff644c;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 4px;
    }
  }
  .btn_loading {
    margin: 50px auto;
    width: 93%;
    background: rgba(255, 100, 76, 0.8);
    height: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 25px;
      img {
        width: 100%;
        margin-bottom: -3px;
      }
    }
  }
  .uploadImg {
    margin-left: 15px;
  }
  .advice_length {
    font-size: 12px;
    padding-left: 15px;
    padding-bottom: 5px;
    color: #cccccc;
    // 以后加上上传图片功能要删掉下面两行
    // float: right;
    // margin-right: 15px;
  }
  .content {
    padding-top: 8%;
    width: 100%;
  }
}
// @media screen and (max-width: 329px) {
//     .feedback {
//         .phone {
//             input{
//                 width: 76%;
//             }
//         }
//     }
// }
</style>
