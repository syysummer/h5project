<template>
	<div class="user" id="user">
		<div class="loading" v-show="!loading">
			<div class="white_bg">
				<div class="bg_color">
					<div class="header">
						<div class="text">
							<!-- <div class="news" @click="getNews">
                  <img src="../../assets/icons/icon_info@2x.png" alt="" v-if="noMessage">
                  <img src="../../assets/icons/has_info@2x.png" alt="" v-else>
                </div> -->
							<div class="noLogin" v-if="hasLog==0" @click="goLogin">
								<div class="dtitl">{{$t('login_index.title')}} / {{$t('login_index.registered_btn')}}</div>
								<div class="notes">{{$t('user.login_benefits')}}</div>
							</div>
							<div class="isLogin" v-else @click="accountShow">
								<div class="img_head">
									<img src="../../assets/images/default_img@2x.png" alt="" v-if="imgHead">
									<img :src="userPhoto" alt="" v-else>
								</div>
								<div class="info_person">
									<div class="username">{{userInfo.userName}}</div>
									<div class="tel">
										<img src="../../assets/icons/Group7@2x.png" alt="">
										<span>{{userInfo.tel}}</span>
									</div>
								</div>
							</div>
							<div class="togo">
								<img src="../../assets/icons/icon_arrows_right@2x.png" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="wallet">
					<div class="title">{{$t('user.property')}}</div>
					<ul class="inline clearFloat">
						<li class="inline_box" @click="goBalance">
							<ul class="clearFloat">
								<li v-if="hasLog==0" class="line">--</li>
								<li v-else>{{userInfo.accountBalance || 0}}P</li>
								<li>{{$t('user.balance')}}</li>
							</ul>
						</li>
						<li class="inline_box" @click="goCoupons">
							<ul class="clearFloat">
								<li v-if="hasLog==0" class="line">--</li>
								<li v-else>{{userInfo.couponNum || 0}}</li>
								<li>{{$t('user.coupons')}}</li>
							</ul>
						</li>
						<li class="inline_box" @click="goBank">
							<ul class="clearFloat">
								<li v-if="hasLog==0" class="line">--</li>
								<li v-else>--</li>
								<li>{{$t('user.bank')}}</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="empty_div"></div>
				<div class="management">
					<div class="title">{{$t('user.manage')}}</div>
					<ul class="inline">
						<li class="inline_text" @click="goEaluate">
							<ul>
								<li>
									<img src="../../assets/icons/mine_comment@2x.png" alt="">
								</li>
								<li>{{$t('user.estimate')}}</li>
							</ul>
						</li>
						<li class="inline_text" @click="goAddress">
							<ul>
								<li>
									<img src="../../assets/icons/mine_address@2x.png" alt="">
								</li>
								<li>{{$t('user.receiver_address')}}</li>
							</ul>
						</li>
						<li class="inline_text" @click="advice">
							<ul class="click_feedback">
								<li>
									<img src="../../assets/icons/mine_feedback@2x.png" alt="">
								</li>
								<li>{{$t('user.advice')}}</li>
							</ul>
						</li>
						<li class="inline_text" @click="goTenants">
							<ul class="click_merchant">
								<li>
									<img src="../../assets/icons/mine_merchant@2x.png" alt="">
								</li>
								<li>{{$t('user.tenants')}}</li>
							</ul>
						</li>
					</ul>
					<ul class="inline">
						<!-- <li class="inline_text" @click="goDriver">
							<ul>
								<li class="driver">
									<img src="../../assets/icons/driver@2x.png" alt="">
								</li>
								<li>{{$t('rider_recruitment.title')}}</li>
							</ul>
						</li> -->
						<li class="inline_text" @click="goRecharge">
							<ul>
								<li>
									<img src="../../assets/icons/recharge.png" alt="">
								</li>
								<li>{{$t('user.recharge')}}</li>
							</ul>
						</li>
						<!-- <li class="inline_text" @click="goElectricity">
              <ul>
                <li>
                  <img src="../../assets/icons/electricity.png" alt="">
                </li>
                <li>{{$t('user.electricity')}}</li>
              </ul>
            </li> -->
						<li class="inline_text" @click="network">
							<ul class="click_feedback">
								<li>
									<img src="../../assets/icons/network.png" alt="">
								</li>
								<li>{{$t('user.network')}}</li>
							</ul>
						</li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<!-- <div class="emptys_div"></div> -->
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../store'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
export default {
  name: 'user',
  data() {
    return {
      noMessage: true,
      hasLog: 0,
      loading: false,
      userInfo: '',
      imgHead: false,
      userPhoto: ''
    }
  },
  computed: {
    get_en() {
      return this.$t('user')
    }
  },
  mounted() {
    document.getElementById('app').style.height = '100%'
    document.querySelector('.public_body').style.height = '100%'
    document.getElementsByTagName('body')[0].style.height = '100vh'
    // document.getElementById('user').style.height=(document.documentElement.clientHeight)+"px"
    this.getUserinfo()
    window.scroll(0, 0)
  },
  beforeDestroy() {
    document.getElementById('app').style.height = ''
    // document.querySelector(".public_body").style.height = "";
    document.getElementsByTagName('body')[0].style.height = ''
  },
  methods: {
    getUserinfo() {
      this.loading = true
      store
        .dispatch('userInfoApi')
        .then(res => {
          if (res.data.code == 1) {
            this.userInfo = res.data.data
            localStorage.setItem(
              'userInformation',
              JSON.stringify(res.data.data)
            )
            this.userPhoto = res.data.data.memberObj.profilePhoto
            localStorage.setItem('hasLog', 1)
            this.hasLog = 1
            if (!this.userInfo.memberObj.profilePhoto) {
              this.imgHead = true
            }
          } else {
            this.toast.error(res.data.message)
          }
          this.loading = false
        })
        .catch(error => {
          error.status == 401 && localStorage.setItem('hasLog', 0)
          this.hasLog = 0
          this.loading = false
        })
    },
    checkLogin() {
      if (this.hasLog == 0) {
        this.$router.push('/login')
        return false
      } else {
        return true
      }
    },
    goRecharge() {
      if (!this.checkLogin()) return
      this.$router.push('/charge_fee')
    },
    goElectricity() {
      if (!this.checkLogin()) return
      this.$router.push('/electricity_fee')
    },
    network() {
      if (!this.checkLogin()) return
      this.$router.push('/network_fee')
    },
    goLogin() {
      this.$router.push('/login')
    },
    accountShow() {
      this.$router.push('/account')
    },
    goBalance() {
      if (!this.checkLogin()) return
      this.$router.push('/balance')
    },
    advice() {
      if (!this.checkLogin()) return
      this.$router.push('/feedback')
    },
    goCoupons() {
      if (!this.checkLogin()) return
      this.$router.push('/platform_coupon')
    },
    goTenants() {
      let txt = this.$t('user.unopened')
      this.toast.warning(txt)
      // this.$router.push('/merchant_entry')
    },
    goAddress() {
      if (!this.checkLogin()) return
      this.$router.push('/address_list')
    },
    goEaluate() {
      if (!this.checkLogin()) return
      this.$router.push('/my_evaluate')
    },
    goBank() {
      if (!this.checkLogin()) return
      let txt = this.$t('user.unopened')
      this.toast.warning(txt)
    },
    goDriver() {
      this.$router.push('/rider_recruit')
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  height: 92%;
  width: 100%;
  overflow: auto;
  position: fixed;
  top: 0;
  .loading {
    height: 100%;
  }
  .white_bg {
    background: #fff;
    height: 100%;
    position: relative;
    .empty_div {
      background: #f0f0f0;
      height: 12px;
    }
    .emptys_div {
      background: #f0f0f0;
      height: 12px;
      // position: absolute;
      // bottom: 0;
      // width: 100%;
    }
  }
  .bg_color {
    background: #fff;
  }
  .header {
    width: 100%;
    padding: 20px;
    background: url('../../assets/images/user_bg@2x.png') no-repeat;
    background-size: 100%;
    position: relative;
    .text {
      div {
        color: #fff;
      }
      .dtitl {
        font-size: 18px;
        height: 40px;
        line-height: 40px;
      }
      .news {
        img {
          width: 18px;
          position: absolute;
          top: 1rem;
          right: 15px;
        }
      }
      .noLogin {
        padding-bottom: 20px;
        margin-top: 0.3rem;
      }
      .isLogin {
        margin-top: 0.2rem;
        padding-bottom: 30px;
        .img_head {
          float: left;
          margin-right: 15px;
          img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }
        .info_person {
          padding-top: 0.2rem;
          .username {
            font-size: 20px;
            height: 30px;
            line-height: 30px;
          }
          .tel {
            font-size: 14px;
            img {
              width: 15px;
              margin-bottom: -3px;
            }
          }
        }
      }
      .notes {
        font-size: 14px;
      }
      .togo {
        img {
          width: 11px;
          position: absolute;
          top: 1.5rem;
          right: 15px;
        }
      }
    }
  }
  .wallet {
    background: #fff;
    .title {
      color: #b7b7b7;
      border-bottom: 1px solid #ededed;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
    }
    .inline {
      margin-top: 0.4rem;
      li {
        list-style: none;
        text-align: center;
        font-size: 14px;
        color: #666666;
      }
      .inline_box {
        width: 30%;
        float: left;
        font-size: 14px;
        margin-right: 10px;
        padding-bottom: 15px;
        li {
          &:first-child {
            color: #f47665;
            font-size: 16px;
          }
        }
        .line {
          font-size: 28px !important;
        }
      }
    }
  }
  .management {
    // min-height: 46vh;
    .inline {
      height: 12vh;
      li {
        font-size: 12px;
      }
      .inline_text {
        width: 20.8%;
        ul {
          li {
            &:first-child {
              height: 25px;
            }
          }
        }
      }
    }
    background: #fff;
    .title {
      color: #b7b7b7;
      border-bottom: 1px solid #ededed;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
    }
    .inline {
      margin-top: 0.7rem;
      // height: 11vh;
      border-bottom: 1px solid #ededed;
      display: flex;
      &:last-child {
        border-bottom: none;
      }
      li {
        list-style: none;
        text-align: center;
        font-size: 13px;
        color: #666666;
        height: 25px;
        flex: 1;
        line-height: 25px;
      }
      .inline_text {
        width: 21.9%;
        font-size: 14px;
        ul {
          li {
            img {
              width: 20px;
            }
          }
          .driver {
            img {
              width: 24px;
            }
          }
        }
      }
    }
  }
}
// @media screen and (max-width: 329px) {
//   .user {
//     .header {
//       padding-bottom: 0;
//       padding: 14px;
//       .text {
//         .noLogin {
//           margin-top: 0.1rem;
//         }
//         .isLogin {
//           // margin-top: 1rem;
//           padding-bottom: 27px;
//           .img_head {
//             img {
//               width: 60px;
//               height: 60px;
//             }
//           }
//         }
//         .notes {
//           font-size: 12px;
//         }
//       }
//     }
//     .wallet {
//       height: 21vh;
//     }
//     .management {
//       min-height: 46vh;
//       .inline {
//         height: 12vh;
//         li {
//           font-size: 12px;
//         }
//         .inline_text {
//           width: 20.8%;
//           ul {
//             li {
//               &:first-child {
//                 height: 25px;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

// @media screen and (min-width: 410px) {
//   .user {
//     .header {
//       .text {
//         .noLogin {
//           margin-top: 0.5rem;
//         }
//         .isLogin {
//           margin-top: 0.5rem;
//           padding-bottom: 35px;
//         }
//       }
//     }
//   }
// }

// @media screen and (min-height: 810px) {
//   .user {
//     .bg_color {
//       min-height: 16%;
//     }
//   }
// }
</style>
