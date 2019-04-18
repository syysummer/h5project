<template>
	<div class="shop_agreement">
		<div class="zh_agreement" v-if="!isEnglish">
			<div class="shop_header" v-if="showHead">
				<div class="back" @click="goBack">
					<img src="../assets/icons/icon_arrows_left@2x.png" alt="">
				</div>
				<div class="title">loong-delivery商家服务协议</div>
			</div>
			<div :class="{content: !showHead, contents: showHead}">
				<div class="version">协议版本：2018年3月30日</div>
				<div class="note">为保护双方合法权益,确保诚信公平交易,loong-delivery合作商家在遵守《loong-delivery平台服务合同》等协议的基础上,还应遵守以下规范:</div>
				<p>
					(一)商家拥有在loong-delivery平台发布外卖信息的合法权利,并保证发布的信息真实、准确、合法、有效。若提供和发布的外卖信息错误、虚假或者侵权造成的任何损失。均由商家承担。
				</p>
				<p>
					(二)商家不得在loong-delivery平台出售国家法律法规明令禁止售卖的产品,对出现违法违规的产品,loong-delivery有权进行下线处理,涉及触犯法律法规的,由商家承担法律责任。
				</p>
				<p>
					(三)保证向用户配送的外卖产品与发布和信息一致,不得减少份量、降低质量、以次充好、虚高价格、腐败变质等情形。若因产品本身质量和品质问题引起纠纷,均由商家负责解决并承担法律后果,若因此造成loong-delivery公司或第三方损失的,商家应予赔偿。
				</p>
				<p>
					(四)保证订单真实有效,不得无故取消订单或单方不履行合同,不得绕开loong-delivery平台单独接受用户的电话或其他方式的订餐要求。对于用户已经提交完成的订单,不得引诱或采取其他方式让用户取消,或者不对订单进行消费确认。
				</p>
				<p>
					(五)市场活动发放的代金券、活动补贴、让利等均针对消费用户甲方不得以任何形式获取用户补贴,侵占用户应得利益,扰乱市场,包括但不限于甲方、甲方人员、或甲方指使的第三方在loong-delivery下单获取用户补贴,通过技术手段虚假下单获取用户补贴等。若发现将按《loong-delivery平台服务合同》相关内容对商家进行处理。
				</p>
				<p>
					(六)商家不得进行缺失配送行为的交易,不得允许用户使loong-delivery平台订餐,到店堂食。
				</p>
				<p>
					(七)商家不得提供手机号码、支付账号、设备(电脑、手机、ipad等)给予用户注册、下单使用。
				</p>
				<p>
					(八)应妥善保管商家登陆账号和密码,通过商家账号和密码实施的行为均视为商家行为,商家应对此承担法律责任。若因账号或密码丢失、保管不善造成的损失,均由商家承担。
				</p>
				<p class="last_note">
					如果商家与loong-delivery签订的合同中有多家店铺在loong-delivery平台发布外卖信息的,则商家对合同中所有的店铺承担连带责任。以上条款loong-delivery公司拥有解释权。
				</p>
			</div>
		</div>
		<div class="en_agreement" v-else>
			<!-- <div class="shop_header">
        <div class="back" @click="goBack">
            <img src="../assets/icons/icon_arrows_left@2x.png" alt="">
        </div>
        <div class="title">Loong-delivery Platform Service Agreement</div>
      </div> -->
			<div :class="{content: !showHead, contents: showHead}">
				<div class="version">Agreement Version: March 30th, 2018</div>
				<div class="note">To protect the legitimate rights and interests of both parties and ensure fair and honest transactions, Loong Delivery Partners shall comply with the following specifications following the "Loong Delivery Platform Service Contract" and other agreements:</div>
				<p>
					(1) The merchant has the legal right to publish the information on the Loong delivery platform and guarantees that the released information is correct, accurate, legal and valid. If the data provided and posted by the merchant is erroneous, any fake information or infringement, all liability will shoulder by merchants.
				</p>
				<p>
					(2) Merchants may not sell products that are prohibited by the national laws and regulations on the Loong delivery platform. Loong delivery shall have the right to conduct off-line treatment of products that violate the law and rules, and those merchants involved in the violation of laws and regulations shall bear legal liabilities responsibility.
				</p>
				<p>
					(3) Ensure that the takeaway products delivered to users are consistent with the release and information, and may not reduce the quantity, quality, shoddy, high prices, corruption, deterioration, etc. If any dispute arises due to the quality and freshness of the product itself, it is the responsibility of the merchant to resolve and bear the legal consequences. However, if any damage is caused to the Long Delivery Company or the third party, then the merchant shall be liable for compensation.
				</p>
				<p>
					(4) To ensure a correct and valid order, it is forbidden to cancel the order without a valid reason or unilaterally fails to perform the contract, and it is not allowed to bypass the Loong delivery platform to accept the user's information or other ordering requirements independently. For orders that have already been submitted by the user, do not induce or take other methods to make the user to cancel their order, or don’t confirm the purchase order from the seller.
				</p>
				<p>
					(5) The vouchers, activities subsidy, profit sharing and other issued by market activities that directly connected to consumer or users. Party A shall not obtain the user subsidies in any form, encroach the benefits of users, and disrupt the market, etc. linked to Party A. Likewise, any other third party instructed by Party A to obtain Loong delivery user's subsidy, and get the user's subsidy through false orders and through technical way is not allowed. If anyone involved in the said violation is caught, then it will be processed under the relevant content of the "Loong Delivery Platform Service Contract."
				</p>
				<p>
					(6) Merchants must not engage in transactions that with missing distribution activities or scam activities and must not allow users to use Loong Delivery Platform Service for delivery eat inside the restaurants or shop.
				</p>
				<p>
					(7) Merchants may not provide mobile phone numbers, payment accounts, devices (computers, mobile phones, iPad, etc.) to users for registration and make orders.
				</p>
				<p>
					(8) The merchant's account number and password for login shall be appropriately maintained and kept. The conducts of merchant's account number and password shall be deemed as the acts of the merchant rights. The merchant shall bear the legal responsibility for this. If the account number or password is lost or forgotten, then it will be on the merchant.
				</p>
				<p>
					If there are many shops in the contract undersigned with Loong delivery to publish the takeout information on the Loong delivery platform, the merchant shall be jointly and severally liable for all the shops in the contract. The above terms Long delivery company has the right to interpretation.
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import { removeCookie, setCookie, getCookie } from '../utils/cookies.js'
export default {
  name: 'shop_agreement',
  data() {
    return {
      isEnglish: false,
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
    this.$nextTick(function() {
      if (this.lang == 'en') {
        this.isEnglish = true
      } else {
        this.isEnglish = false
      }
    })
    //保留头部
    let local = this.$route.query.local
    if (local == 0) {
      this.showHead = true
    } else {
      this.showHead = false
    }
  },
  methods: {
    goBack() {
      // this.$router.go(-1)
      window.history.back()
    }
  }
}
</script>
<style scoped lang="scss">
.shop_agreement {
  width: 100%;
  height: 100%;
  .zh_agreement,
  .en_agreement {
    width: 100%;
    height: 100%;
    .shop_header {
      background: #fff8ed;
      width: 100%;
      height: 7%;
      min-height: 35px;
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      .back {
        width: 11px;
        position: absolute;
        left: 12px;
        img {
          width: 100%;
          margin-bottom: -3px;
        }
      }
    }
    .content {
      background: #fff;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      overflow-y: auto;
      padding: 0 12px 20px;
      color: #333;
      .version {
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #666;
        margin: 15px 0 10px 0;
      }
      .note {
        font-size: 12px;
        text-indent: 1.5em;
      }
      p {
        font-size: 12px;
        text-indent: 1.5em;
      }
    }
    .contents {
      background: #fff;
      width: 100%;
      height: 93%;
      position: fixed;
      top: 7%;
      overflow-y: auto;
      padding: 0 12px 20px;
      color: #333;
      .version {
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #666;
        margin: 15px 0 10px 0;
      }
      .note {
        font-size: 12px;
        text-indent: 1.5em;
      }
      p {
        font-size: 12px;
        text-indent: 1.5em;
      }
    }
  }
  .en_agreement {
    .shop_header {
      .title {
        font-size: 14px;
      }
    }
  }
}
@media screen and (max-width: 329px) {
  .shop_agreement {
    .en_agreement {
      .shop_header {
        .title {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
