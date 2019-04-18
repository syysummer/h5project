<template>
  <div class="shopIndex">
    <div style="background:white;width:100%;position:relative" v-bind:style="{height:shopHeight+'px'}" v-show="!loading">
      <div class="shop_header flex row j-between">
        <span class="ic flex a-center j-center" @click="linkGo('/'+back_url)">
          <i style="width:.4rem;">
            <img src="../../assets/icons/left.png" />
          </i>
        </span>
        <!-- <span class="ic flex a-center j-center" @click="linkGo('/shop_search')">
        <i>
          <img src="../../assets/icons/search2.png" />
        </i>
      </span> -->
      </div>
      <div class="flex shopHead colmun a-center">
        <i>
          <img :src="shop_info.sellerLogoPath ? shop_info.sellerLogoPath : logoImg1" :onerror="logoImg1">
        </i>

      </div>
      <div class="flex shopImage">
        <i>
          <img src="../../assets/images/shopbj.png">
        </i>
        <span></span>
      </div>
      <div class="shopText flex colmun a-center j-center">
        <p @click="lower=false" style="width:8rem;text-align:center;" class="hiddenT">{{shop_info.sellerName}}</p>
        <div class="flex a-center" v-if="!lower">
          <span style="font-size:15px;margin-right:.3rem;">{{seller_header.score}}</span>

          <div class="rate_contain">
            <span class="rate_gray">
              <img src="../../assets/icons/icon_star_gray.png" alt="">
            </span>
            <span class="rate_red" :style="{width:set_star(shop_commentInfo.data.orderScoreAvg) + '%'}">
              <img src="../../assets/icons/icon_star_red.png" alt="">
            </span>
          </div>
          <!-- <el-rate v-model="shop_commentInfo.data.orderScoreAvg" disabled :colors="['#FD614A', '#FD614A', '#FD614A']">
                    </el-rate> -->
        </div>
        <span class="hiddenT" v-if="lower && shop_info.notice" @click="lower=false">{{shop_seller.notice}}：{{shop_info.notice?shop_info.notice:shop_index.no_ni+'!'}}</span>
        <ul class="flex row" v-show="listArr.length>0" v-if="lower">
          <li v-for="(item,index) in listArr" :key="index">{{item.discountAmount}}P</li>
          <li v-if="hasLog==1" @click="linkGo('/shop_platform?id='+id+'&name='+shop_info.sellerName)">{{shop_index.get_coupons}}
            <i></i>
          </li>
          <li v-else @click="linkGo('/login')">{{shop_index.get_coupons}}
            <i></i>
          </li>
        </ul>

        <ol class="flex row a-center" v-if="allArr.length>0 && lower" @click="lower=false">
          <li>
            <img src="../../assets/icons/discount.png">
          </li>
          <li class="hiddenT">
            <span v-for="(item,index) in allArr" v-if="language == 'zh'" :key="index">
              {{shop_seller.full}} {{item.limitcontent}}{{shop_seller.minus}}{{item.discountAmount}}{{(index !== allArr.length - 1)?';':''}}
            </span>
            <span v-for="(item,index) in allArr" v-if="language == 'en'" :key="index">
              {{item.limitcontent}}{{shop_seller.minus}}{{item.discountAmount}}{{(index !== allArr.length - 1)?';':''}}
            </span>
          </li>
          <li class="flex row a-center">
            <span v-if="shop_info.goodsMinPresentPrice&&shop_info.sellerActivityList&&shop_info.firstFull">4{{shop_index.an_aci}}</span>

            <span v-else-if="!shop_info.goodsMinPresentPrice&&shop_info.sellerActivityList&&shop_info.firstFull">3{{shop_index.an_aci}}</span>
            <span v-else-if="shop_info.goodsMinPresentPrice&&!shop_info.sellerActivityList&&shop_info.firstFull">3{{shop_index.an_aci}}</span>
            <span v-else-if="shop_info.goodsMinPresentPrice&&shop_info.sellerActivityList&&!shop_info.firstFull">3{{shop_index.an_aci}}</span>

            <span v-else-if="!shop_info.goodsMinPresentPrice&&!shop_info.sellerActivityList&&shop_info.firstFull">2{{shop_index.an_aci}}</span>
            <span v-else-if="shop_info.goodsMinPresentPrice&&!shop_info.sellerActivityList&&!shop_info.firstFull">2{{shop_index.an_aci}}</span>
            <span v-else-if="!shop_info.goodsMinPresentPrice&&shop_info.sellerActivityList&&!shop_info.firstFull">2{{shop_index.an_aci}}</span>

            <span v-else-if="!shop_info.goodsMinPresentPrice&&!shop_info.sellerActivityList&&!shop_info.firstFull">1{{shop_index.an_aci}}</span>
            <img src="../../assets/icons/open_all.png">
          </li>
        </ol>
        <ol class="flex row a-center" v-else-if="shop_info.goodsMinPresentPrice && lower" @click="lower=false">
          <li>
            <img src="../../assets/icons/full_subtraction.png" alt="">
          </li>
          <li class="hiddenT">
            <span v-if="language == 'zh'">特价商品{{shop_info.goodsMinPresentPrice}}起</span>
            <span v-if="language == 'en'">Special commodity {{shop_info.goodsMinPresentPrice}} fold up</span>
          </li>
          <li class="flex row a-center">
            <span v-if="shop_info.sellerActivityList&&shop_info.firstFull">3{{shop_index.an_aci}}</span>
            <span v-else-if="shop_info.sellerActivityList||shop_info.firstFull">2{{shop_index.an_aci}}</span>
            <span v-else>1{{shop_index.an_aci}}</span>
            <img src="../../assets/icons/open_all.png">
          </li>
        </ol>
        <ol class="flex row a-center" v-else-if="shop_info.sellerActivityList && lower" @click="lower=false">
          <li>
            <img src="../../assets/icons/enter_the_shop.png">
          </li>
          <li class="hiddenT">
            <span v-if="language == 'zh'">进店领{{shop_info.sellerActivityList[0].discountAmount}}P优惠劵</span>
            <span v-if="language == 'en'">{{shop_info.sellerActivityList[0].discountAmount}}P coupon in the shop</span>
          </li>
          <li class="flex row a-center">
            <span v-if="shop_info.firstFull">2{{shop_index.an_aci}}</span>
            <span v-else>1{{shop_index.an_aci}}</span>
            <img src="../../assets/icons/open_all.png">
          </li>
        </ol>
        <ol class="flex row a-center" v-else-if="shop_info.firstFull && lower" @click="lower=false">
          <li>
            <img src="../../assets/icons/new_people.png">
          </li>
          <li class="hiddenT">
            <span v-if="language == 'zh'">新人首单立减{{shop_info.firstFull.discountAmount}}P</span>
            <span v-if="language == 'en'">Discount up to P{{shop_info.firstFull.discountAmount}} for first order</span>
          </li>
          <li class="flex row a-center">
            <span>1{{shop_index.an_aci}}</span>
            <img src="../../assets/icons/open_all.png">
          </li>
        </ol>
        <div class="shoptxt" v-if="!lower">
          <p>{{shop_index.discount}}</p>
          <ul v-if="allArr.length>0||shop_info.goodsMinPresentPrice||shop_info.sellerActivityList||shop_info.firstFull">
            <li v-if="allArr.length>0">
              <i>
                <img src="../../assets/icons/discount.png" alt="">
              </i>
              <span v-if="allArr.length>0">
                <span v-if="language == 'zh'" style="font-size:12px;" v-for="(item,index) in allArr" :key="index">
                  {{shop_seller.full}}{{item.limitcontent}}{{shop_seller.minus}}{{item.discountAmount}}{{(index !== allArr.length - 1)?';':''}}
                </span>
                <span v-if="language == 'en'" style="font-size:12px;" v-for="(item,index) in allArr" :key="index">
                  {{item.limitcontent}}{{shop_seller.minus}}{{item.discountAmount}}{{(index !== allArr.length - 1)?';':''}}
                </span>
              </span>

              <!-- <i style="padding-top:5px;height:100%;display:flex;justify-content:center;align-items:center;width:1rem;" @click="lower=true">
              <img style="height:8px;width:12px;" src="../../assets/icons/icon_searchlist_arrow_up@2x.png">
            </i> -->
            </li>
            <li v-if="shop_info.goodsMinPresentPrice">
              <i><img src="../../assets/icons/full_subtraction.png" alt=""></i>
              <span v-if="language == 'zh'">特价商品{{shop_info.goodsMinPresentPrice}}起</span>
              <span v-if="language == 'en'">Special commodity {{shop_info.goodsMinPresentPrice}} fold up</span>
            </li>
            <li v-if="shop_info.sellerActivityList">
              <i><img src="../../assets/icons/enter_the_shop.png" alt=""></i>
              <span v-if="language == 'zh'">进店领{{shop_info.sellerActivityList[0].discountAmount}}P优惠劵</span>
              <span v-if="language == 'en'">{{shop_info.sellerActivityList[0].discountAmount}}P coupon in the shop</span>
            </li>
            <li v-if="shop_info.firstFull">
              <i><img src="../../assets/icons/new_people.png" alt=""></i>
              <span v-if="language == 'zh'">新人首单立减{{shop_info.firstFull.discountAmount}}P</span>
              <span v-if="language == 'en'">Discount up to P{{shop_info.firstFull.discountAmount}} for first order</span>
            </li>

          </ul>
          <ul v-else>
            <li>
              <span>{{shop_index.no_ai+'!'}}</span>
            </li>
          </ul>
          <p>{{shop_index.service}}</p>
          <ul>
            <li v-if="shop_info.allDayOpen==1">
              <span>{{seller_header.business}}: {{seller_header.business_time}}</span>
            </li>
            <li v-else>
              <span>{{seller_header.business}}: {{shop_info.businessStartTime}}-{{shop_info.businessEndTime}}</span>
            </li>
            <li>
              <span>{{seller_header.delivery_fee}}: {{shop_info.logistics||0}}P | {{seller_header.charging_fee}}:{{shop_info.limitDeliveryCost||0}}P</span>
            </li>
            <li>
              <span>{{seller_header.delivery}}: {{shop_info.deliveryScheme==1?seller_header.platform_delivery:seller_header.merchant_delivery}}</span>
            </li>
          </ul>
          <p>{{shop_seller.notice}}</p>
          <ul style="margin-bottom:30%">
            <li>
              <span>
                {{shop_info.notice?shop_info.notice:shop_index.no_ni}}
                <br>
              </span>

            </li>
          </ul>
          <div class="flex j-center a-center shoptxt1">
            <i class="flex j-center a-center" style="width:1rem;" @click="lower=true">
              <img style="width:1rem;" src="../../assets/icons/open_all1.png">
            </i>
          </div>

        </div>
      </div>
      <div class="shop_contem" v-if="lower">
        <ul class="flex row j-around a-center clickList" ref="clickList">
          <li :class="[tabber_result1?'active':'']" @click="linkGo('/business_shop?id='+id+'&pathName='+back_url,'text')">
            <i @click="linkGo('/business_shop?id='+id+'&pathName='+back_url,'list')">
              <img src="../../assets/icons/lie.png">
            </i>
            <p>{{shop_seller.menu}}</p>
          </li>
          <li @click="linkGo('/shop_comment','comment')" :class="[tabber_result2?'active':'']">
            <p>{{shop_seller.evaluation}}</p>
          </li>
          <li @click="linkGo('/shop_aptitude','aptitude')" :class="[tabber_result3?'active':'']">
            <p>{{shop_seller.qualification}}</p>
          </li>
        </ul>

        <div v-if="cart_result" class="contain divList" ref="divList">

          <div class="loading_gif" v-if="shop_loading">
            <img style="width: 100%;" src="../../assets/images/loding_img_no_floor.gif" />
            <p>{{this.$t('toast.loading')}}</p>
          </div>
          <ol class="menu_list" v-if="menuList&&!shop_loading">
            <li @click="click_check_all">
              <i>
                <img v-show="in_index=='all'" src="../../assets/icons/gou.png">
              </i>
              <span>{{shop_seller.all}}</span>
            </li>
            <li v-for="(item,index) in menuArr" :key="index" @click="click_check(index)">
              <i>
                <img v-show="index==in_index" src="../../assets/icons/gou.png">
              </i>
              <span>{{item.name}}</span>
            </li>
          </ol>
          <div v-show="nullShop" class="flex colmun a-center" style="width:100%;height:100%;color:#999;padding-top:40px;">
            <i style="width:4rem;"><img style="width:100%;" src="../../assets/images/null-shop.png"></i>
            <span v-show="goodsArr.length<=0">{{shop_index.null_shop}}~~</span>
          </div>
          <div class="goods_information flex row" v-for="(item,index) in goodsArr" :key="index" v-if="!menuList&&goodsArr.length>0" v-show="!shop_loading">

            <div @click="linkGo('/shop_detail?id='+id,index)">
              <img :src="item.goodsPhotoPath" :onerror="logoImg">
            </div>
            <ul @click="linkGo('/shop_detail?id='+id,index)">
              <li class="hiddenT">{{item.goodsName}}</li>
              <li class="flex a-center">
                <p>{{shop_seller.sale}} {{item.sellNum}}</p>
                <img src="../../assets/icons/fill1.png">
                <span style="margin-left: 3px;">{{item.commentNum}}</span>
              </li>
              <li class="flex a-center" v-if="item.isSpecs==1">

                <p v-if='item.goodsSpecsList&&item.goodsSpecsList.length==1'>{{item.presentPrice||item.originalPrice}}P</p>
                <p v-else-if='item.isDiscount==0&&item.goodsSpecsList.length>1'>{{item.originalPrice}}P{{shop_index.case}}</p>
                <p v-else>{{item.presentPrice?item.presentPrice:item.originalPrice}}P{{shop_index.case}}</p>
                <span v-if='item.goodsSpecsList&&item.goodsSpecsList.length==1&&item.presentPrice'>{{item.originalPrice}}P</span>
              </li>
              <li class="flex a-center" v-else style="width: 140%;">
                <p v-if='item.isDiscount==0'>{{item.originalPrice}}P</p>
                <p v-if='item.isDiscount==1'>{{item.presentPrice}}P</p>
                <span v-if='item.isDiscount==1'>{{item.originalPrice}}P</span>
              </li>
            </ul>

            <p class="flex j-end a-center" v-if="item.stock>0" v-show="shop_info.busFlag==1">
              <i v-if="item.number>=1" @click="addRemove(shop_info.busFlag,'-1',item.id,item.goodsAttributeList,item.isSpecs,index,item.number)">
                <img src="../../assets/icons/remove.png">
              </i>
              <span v-if="item.number">{{item.number}}</span>
              <i @click="addRemove(shop_info.busFlag,'1',item.id,item.goodsAttributeList,item.isSpecs,index,item.stock)">
                <img src="../../assets/icons/add.png">
              </i>
            </p>
            <span v-show="shop_info.busFlag==1" style="color:#999;font-size:15px" class="flex j-end a-center" v-else>{{shop_index.s_out}}</span>

          </div>

        </div>
        <div v-else class="contain divList" ref="divList">
          <router-view></router-view>
        </div>
      </div>

      //底部购物车
      <div class="shop_cart shopCart flex" v-if="shop_info.busFlag==1" v-show="cartTrue">
        <div class="flex j-center" @click="cart_shop_list">
          <i>
            <img src="../../assets/icons/cart1.png">
          </i>
          <span v-show="getGoodsCartCount_num>0">{{getGoodsCartCount_num}}</span>
        </div>
        <div class="flex colmun j-center">
          <p v-if="getGoodsCartCount_num<=0">{{shopping_cart.cart_empty}}</p>
          <p v-else>{{shopping_cart.a_total_of}}：{{totalM?totalM:0}} P</p>
          <span v-if="loginStatus == 401||loginStatus == 410">{{shop_index.disfee}} {{shop_info.logistics?shop_info.logistics:0}} P</span>
          <span v-else>{{shop_index.disfee}} {{shop_info.logistics?shop_info.logistics:0}} P</span>
        </div>
        <div class="flex j-center a-center">
          <span v-if="shop_info.limitDeliveryCost>totalM">{{shop_index.short}} {{Number((shop_info.limitDeliveryCost - totalM).toFixed(2))}}P {{shopping_cart.deliver}}</span>
          <span v-else-if="getGoodsCartCount_num<=0" style="background:#999;color:white;font-size:16px">{{shopping_cart.order_now}}</span>
          <span @click="linkGo('hasLog')" v-else-if="hasLog==1" style="background:#FF644D;color:white;font-size:16px">{{shopping_cart.order_now}}</span>
          <span @click="linkGo('/login?path=cart&id='+id)" v-else style="background:#FF644D;color:white;font-size:16px">{{shopping_cart.order_now}}</span>
        </div>
      </div>
      <div style="background:#665C5C;" class="shop_busFlag shopCart flex a-center j-center" v-else-if="shop_info.busFlag==2" v-show="cartTrue">
        <span>{{shop_index.no_bus}}</span>
      </div>
      <div style="background:#665C5C;" class="shop_busFlag shopCart flex a-center j-center" v-else-if="shop_info.busFlag==3" v-show="cartTrue">
        <span>{{shop_index.no_bus}}</span>
      </div>

      <!-- 休息中、不在配送范围 遮罩 -->
      <!-- <div class="no_bus_task">
      </div> -->
      <!-- 休息中弹窗 -->
      <!-- <div class="no_bus_popup">
        <div>
          店铺已休息，请重新选择
        </div>
        <div @click="go_home">
          去首页看看
        </div>
      </div> -->
      <!-- 不在配送范围弹窗 -->
      <!-- <div class="not_in_scope_popup">
        <div>
          <img src="../../assets/images/not_in_scope.png" alt="">
        </div>
        <div class="not_in_scope_hint">
          此商家不在配送范围
        </div>
        <div @click="go_home">
          去首页看看
        </div>
      </div> -->

      <!-- 已售完/下架 遮罩 -->
      <!-- <div class="no_bus_task">
      </div> -->
      <!-- 已售完/已下架弹窗 -->
      <!-- <div class="no_bus_popup">
        <div>
          商品“”已售完/已经下架，请重新选择
        </div>
        <div>
          知道了
        </div>
      </div> -->

      <div class="cartList" v-if="cart_list&&getGoodsCartCount_num">
        <div class="flex colmun">
          <i>
            <img src="../../assets/icons/icon_Trash.png" @click="openConfrim">
          </i>
          <ul>
            <li class="carts flex row" v-for="(item,index) in cartStorage" :key="index">
              <div>
                <img v-if="loginStatus == 401||loginStatus == 410" :src="item.goodsPhotoPath" :onerror="logoImg">
                <img v-else :src="item.goodsPhoto" :onerror="logoImg">

              </div>
              <ul>
                <li class="hiddenT">
                  <p>{{item.goodsName}}</p>
                  <p v-if="item.goodsSpecs&&item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsSpecs}}/{{item.goodsAttributeLabel}}</p>
                  <p v-else-if="item.goodsSpecs&&!item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsSpecs}}</p>
                  <p v-else-if="!item.goodsSpecs&&item.goodsAttributeLabel" style="font-size:12px;color:#999">{{item.goodsAttributeLabel}}</p>
                  <p v-else style="font-size:12px;color:#999"></p>
                </li>
                <!-- <li class="flex a-center" v-if="item.specsId==1">
                <p v-if='item.limintNum'>{{item.presentPrice}}P</p>
                <p v-else>{{item.presentPrice}}P</p>
                <span v-if='item.limintNum'>{{item.originalPrice}}P</span>
              </li>
              <li class="flex a-center" v-else>
                <p v-if='item.isDiscount==0'>{{item.originalPrice}}P</p>
                <p v-else>{{item.presentPrice}}P</p>
                <span v-if='item.isDiscount==1'>{{item.originalPrice}}P</span>
              </li> -->
                <li class="flex a-center" v-if="item.isSpecs==1||item.labelId">
                  <p>{{item.money1}}P</p>
                  <span v-if='item.money1!=Math.round((item.originalPrice*item.number) * 100) / 100'>{{Math.round((item.originalPrice*item.number) * 100) / 100}}P</span>
                </li>
                <li class="flex a-center" v-else>
                  <p v-if='item.isDiscount==0'>{{item.total_new}}P</p>
                  <p v-else>{{item.total_new}}P</p>
                  <span v-if='item.isDiscount==1'>{{item.total_old}}P</span>
                </li>
              </ul>

              <p class="flex j-end a-center">
                <i v-if="item.number" @click="addGoodsCart('-1',item.id,item.specs,item.label,index)">
                  <img src="../../assets/icons/remove.png">
                </i>
                <span v-if="item.number">{{item.number}}</span>
                <i @click="addGoodsCart('1',item.id,item.specs,item.label,index)">
                  <img src="../../assets/icons/add.png">
                </i>
              </p>
              <span class="flex" v-if="item.status==0">
                <span>{{shop_index.fa}}</span>
              </span>
            </li>
          </ul>
          <span class="flex a-center j-between">
            <span style="font-size:.5rem;">{{shopping_cart.cutlery_fee}}</span>
            <span style="color:#FF654E">{{hePrice}}P</span>
            <!-- <span style="color:#FF654E" v-else>{{getGoodsCart_z.lunchboxPrice}}P</span> -->
          </span>

        </div>
      </div>
      <div class="detail_block" v-if="detailSpecs">
        <div class="detail_specs">
          <div class="goods_information flex row uu">
            <div>
              <img :src="detailData.goodsPhotoPath">
            </div>
            <ul class="uls">
              <li class="hiddenT">{{detailData.goodsName}}</li>
              <li class="flex a-center" style="height:.5rem;margin-top:.3rem;">
                <p v-if="!goodsSpecs&&!goodsAttributeLabel"></p>
                <p v-else-if="goodsSpecs&&!goodsAttributeLabel">
                  <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsSpecs}}</span>
                </p>
                <p v-else-if="!goodsSpecs&&goodsAttributeLabel">
                  <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsAttributeLabel}}</span>
                </p>
                <p v-else>
                  <span style="font-size:.45rem;">{{shop_index.Selected}}: {{goodsSpecs}} / </span>
                  <span style="font-size:.45rem;">{{goodsAttributeLabel}}</span>
                </p>

              </li>
              <li v-if="detailData.isSpecs==1" class="flex a-center">
                <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length>1">{{detailData.presentPrice||detailData.originalPrice}}P{{specsId?'':shop_index.case}}</p>
                <p v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1">{{detailData.presentPrice?detailData.presentPrice:detailData.originalPrice}}P</p>
                <p v-if="!limitNum&&selN!=null">{{originalPrice}}P</p>
                <p v-if="limitNum">{{presentPrice?presentPrice:'0'}}P</p>
                <span v-if="limitNum">{{originalPrice?originalPrice:'0'}}P</span>
                <span v-if="!limitNum&&selN==null&&detailData.goodsSpecsList.length==1&&detailData.presentPrice">{{detailData.originalPrice || '0'}}P</span>
                <a v-show="limitNum" style="border:1px solid #FF644D;padding:.03rem .1rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                  {{shop_index.limit}} {{limitNum}} {{shop_index.piece}}</a>
              </li>
              <li v-else class="flex a-center">
                <p v-if="detailData.isDiscount==0">{{detailData.originalPrice}}P</p>
                <p v-if="detailData.isDiscount==1">{{detailData.presentPrice}}P</p>
                <span v-if="detailData.isDiscount==1">{{detailData.originalPrice}}P</span>
                <a v-show="detailData.limitNum&&detailData.isDiscount==1" style="border:1px solid #FF644D;padding:.05rem .2rem;font-size:.45rem;color:#FF644D;border-radius: .1rem;margin-left:.4rem;">
                  {{shop_index.limit}} {{detailData.limitNum}} {{shop_index.piece}}</a>
              </li>
            </ul>

            <p style="width:1rem;" class="flex j-center a-start">
              <span style="color:#A7A7A7;padding:0;text-align:center;width:.5rem;" @click="detailSpecs=false">
                <img style="width:100%;" src="../../assets/icons/Closex.png" alt="">
              </span>
            </p>
          </div>
          <div v-if="detailData.isSpecs==1">
            <div class="detail_text">{{shop_index.sta}}</div>
            <div class="detail_list flex a-center j-start">
              <span class="single_hide" v-for="(item,index) in detailData.goodsSpecsList" :class="[selN == index ? 'selestyle' : '']" :key="index" @click="sel(index,item.id,item.limitNum,item.originalPrice,item.presentPrice,item.goodsSpecs,item)">{{item.goodsSpecs}}</span>
            </div>
          </div>
          <div v-for="(item,index) in detailData.goodsAttributeList" :key="index" v-if="detailData.goodsAttributeList.length>0">
            <div class="detail_text">{{item.goodsAttribute}}</div>
            <div class="detail_list flex a-center j-start">
              <span class="single_hide" :class="[seleN == index ? 'selestyle' : '']" v-for="(todo,index) in item.goodsLabelList" :key="index" @click="sele(index,todo.id,todo.attributeId,todo.goodsAttributeLabel)">{{todo.goodsAttributeLabel}}</span>

            </div>
          </div>
          <div class="detail_but">
            <p @click="select_cart(index)">{{shop_index.sel}}</p>
          </div>
        </div>
      </div>
      <div class="delAlert flex a-center j-center" v-show="delAlert">
        <ul>
          <li class="flex a-center j-center">
            <span>{{shop_index.del}}?</span>
          </li>
          <li class="flex a-center j-center">
            <span @click="delAlert=false" class="flex a-center j-center">{{shop_index.cancel}}</span>
            <span @click="deleteGoodsCart()" class="flex a-center j-center">{{shop_index.confirm}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import publicHeader from '../../components/public_header.vue'
import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js'
export default {
  name: 'business_shop',
  data() {
    return {
      shopHeight:
        window.innerHeight ||
        screen.height ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      nullShop: false,
      delAlert: false,
      hasLog: '',
      tabber_result1: true,
      tabber_result2: false,
      tabber_result3: false,
      cart_result: true,
      arr: ['', ''],
      menuList: false,
      cart_list: false,
      back_url: '',
      lat: '',
      lon: '',
      id: '',
      menuArr: [],
      in_index: 'all',
      goodsArr: [],
      logoImg: 'this.src="' + require('../../assets/images/mo.png') + '"',
      logoImg1: 'this.src="' + require('../../assets/images/shop_mo.png') + '"',
      cart_list_num: [],
      cartNull: true,
      lower: true,
      detailData: {},
      detailSpecs: false,
      loginStatus: '',
      stroageCartArr: [],
      cartNum: 0,
      cartList: [],
      selN: null,
      seleN: null,
      specsId: null,
      labelId: null,
      goodsSpecs: null,
      attributeId: null,
      limitNum: 0,
      originalPrice: null,
      presentPrice: null,
      goodsAttributeLabel: null,
      goodsId: '',
      index: '',
      arrs: {},
      cartStorage: [],
      numbers: 0,
      numberl: 0,
      numbera: 0,
      cartData: [],
      cartTrue: true,
      totalM: 0,
      priceM: 0,
      hePrice: 0,
      getCart: [],
      newTime: '',
      orderId: '',
      loading: true,
      cartS: 1,
      islog: '',
      activityList: [],
      language: '',
      statusNum: 0
    }
  },
  components: {},
  computed: {
    shopHeight1() {
      return this.shopHeight
    },
    loading_img() {
      return store.state.loading_img
    },
    shop_loading() {
      return store.state.shop_loading
    },
    shop_index() {
      let shop_index = this.$t('shop_index')
      return shop_index
    },
    seller_header() {
      let seller_header = this.$t('seller_header')
      return seller_header
    },
    shop_seller() {
      let shop_seller = this.$t('seller')
      return shop_seller
    },
    shopping_cart() {
      let shopping_cart = this.$t('shopping_cart')
      return shopping_cart
    },
    shop_info() {
      return store.state.shop_info.data
    },

    allArr() {
      if (store.state.shop_info.data.allSubDiscount) {
        return store.state.shop_info.data.allSubDiscount
      } else {
        return []
      }
    },
    listArr() {
      if (store.state.shop_info.data.sellerActivityList) {
        return this.activityList
      } else {
        return []
      }
    },
    getGoodsCart_list() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        return this.cartStorage
      } else {
        return store.state.getGoodsCart.sellerList
      }
    },
    getGoodsCart_z() {
      return store.state.getGoodsCart
    },
    getGoodsCartCount_num() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        return this.cartNum
      } else {
        return store.state.getGoodsCartCount.data
      }
    },
    shop_commentInfo() {
      return store.state.shop_comment
    }
  },
  created() {
    // let data = {};
    this.hasLog = localStorage.getItem('hasLog')
    this.language = getCookie('lang')
  },
  updated() {
    let clientHeight =
      window.innerHeight ||
      screen.height ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let divList = document.getElementsByClassName('divList')[0]
    let clickList = document.getElementsByClassName('clickList')[0]
    let shopCart = document.getElementsByClassName('shopCart')[0]
    let menuList = document.getElementsByClassName('menu_list')[0]
    let shoptxt = document.getElementsByClassName('shoptxt')[0]
    let shoptxt1 = document.getElementsByClassName('shoptxt1')[0]
    if (divList && clickList) {
      let num = clientHeight - clickList.offsetTop - clickList.offsetHeight
      document.getElementsByClassName('divList')[0].style.height = num + 'px'
    }
    if (shoptxt && shoptxt1) {
      let num = clientHeight - shoptxt.offsetTop - shoptxt1.offsetHeight
      document.getElementsByClassName('shoptxt')[0].style.height = num + 'px'
    }
    if (clickList && shopCart && menuList) {
      let sum =
        clientHeight -
        clickList.offsetTop -
        clickList.offsetHeight -
        shopCart.offsetHeight
      document.getElementsByClassName('menu_list')[0].style.height = sum + 'px'
    }
  },
  beforeMount() {},
  mounted() {
    // window.addEventListener('resize', this.handleResize)

    this.goodsArr = []
    let arr = JSON.parse(localStorage.getItem('cartList'))
    if (!arr) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }
    if (localStorage.getItem('cartList')) {
      this.cartList = localStorage.getItem('cartList')
    }
    let current_address_latlng = localStorage.getItem('current_address_latlng')
    if (current_address_latlng) {
      this.lat = parseFloat(JSON.parse(current_address_latlng).lat)
      this.lon = parseFloat(JSON.parse(current_address_latlng).lng)
    } else {
      this.toast.error(this.shop_index.posi)
    }
    // if (localStorage.getItem("hasLog") == 0) {
    this.loginStatus = 401
    // }

    if (this.$route.query.id) {
      this.id = this.$route.query.id
      localStorage.setItem('id', this.$route.query.id)

      localStorage.setItem('pathName', this.$route.query.pathName)
      localStorage.setItem('orderId', this.$route.query.orderId)
    }
    this.orderId = this.$route.query.orderId
    this.back_url = localStorage.getItem('pathName')
    this.id = localStorage.getItem('id')
    // console.log(this.$route)
    if (this.$route.name == 'business_shop') {
      this.tabber_result1 = true
      this.cart_result = true
      this.tabber_result2 = !this.tabber_result1
      this.tabber_result3 = !this.tabber_result1
    } else if (this.$route.name == 'shop_comment') {
      this.tabber_result2 = true
      this.cart_result = false
      this.menuList = false
      this.cartTrue = false
      this.tabber_result1 = !this.tabber_result2
      this.tabber_result3 = !this.tabber_result2
    } else if (this.$route.name == 'shop_aptitude') {
      this.tabber_result3 = true
      this.cart_result = false
      this.menuList = false
      this.cartTrue = false
      this.tabber_result2 = !this.tabber_result3
      this.tabber_result1 = !this.tabber_result3
    }
    this.get_shop_menu()
    this.get_shop_information()

    // this.getGoodsCartCount();
    // this.get_GoodsCart();
    this.get_shop_comment()

    let that = this
    window.onresize = function windowResize() {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      setTimeout(() => {
        that.shopHeight =
          window.innerHeight ||
          screen.height ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
      }, 0)
    }
  },
  watch: {
    //监听路由
    $route(to, from) {
      if (to.name == 'business_shop') {
        this.tabber_result1 = true
        this.cart_result = true
        this.tabber_result2 = !this.tabber_result1
        this.tabber_result3 = !this.tabber_result1
      } else if (to.name == 'shop_comment') {
        this.tabber_result2 = true
        this.cart_result = false
        this.menuList = false
        this.cartTrue = false
        this.tabber_result1 = !this.tabber_result2
        this.tabber_result3 = !this.tabber_result2
      } else if (to.name == 'shop_aptitude') {
        this.tabber_result3 = true
        this.cart_result = false
        this.menuList = false
        this.cartTrue = false
        this.tabber_result2 = !this.tabber_result3
        this.tabber_result1 = !this.tabber_result3
      }
    },
    goodsArr: 'total_tt',
    getGoodsCartCount_num: 'total_tt',
    cartStorage: 'total_tt',
    lower: 'hideCart',
    detailSpecs: 'clearData',
    cartS: 'change'
    // shopHeight: 'shopHeightfun'
    // lower:{
    //    handler:function(val, oldVal){
    //      if (!this.lower) {
    //        this.cartTrue = false;
    //      } else if (this.lower && this.$route.path == "/business_shop") {
    //        this.cartTrue = true;
    //      }

    //    },
    //    deep: true,
    //    immediate: true
    // }
  },

  methods: {
    go_home() {
      this.$router.push('/home')
    },
    shopHeightfun() {
      let clientHeight =
        window.innerHeight ||
        screen.height ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      let divList = document.getElementsByClassName('divList')[0]
      let clickList = document.getElementsByClassName('clickList')[0]
      let shopCart = document.getElementsByClassName('shopCart')[0]
      let menuList = document.getElementsByClassName('menu_list')[0]
      let shoptxt = document.getElementsByClassName('shoptxt')[0]
      let shoptxt1 = document.getElementsByClassName('shoptxt1')[0]
      if (divList && clickList) {
        let num = this.shopHeight - clickList.offsetTop - clickList.offsetHeight
        document.getElementsByClassName('divList')[0].style.height = num + 'px'
      }
      if (shoptxt && shoptxt1) {
        let num = this.shopHeight - shoptxt.offsetTop - shoptxt1.offsetHeight
        document.getElementsByClassName('shoptxt')[0].style.height = num + 'px'
      }
      if (clickList && shopCart && menuList) {
        let sum =
          this.shopHeight -
          clickList.offsetTop -
          clickList.offsetHeight -
          shopCart.offsetHeight
        document.getElementsByClassName('menu_list')[0].style.height =
          sum + 'px'
      }
    },
    change() {
      this.cartStorage = JSON.parse(localStorage.getItem('cartList'))
    },
    openConfrim() {
      this.delAlert = true
    },
    hideCart() {
      if (!this.lower) {
        this.cartTrue = false
      } else if (this.lower && this.$route.path == '/business_shop') {
        this.cartTrue = true
      }
    },
    set_star(rate) {
      if (!rate) {
        rate = 0
      }
      // 一个星星width: 15% 空格距离是 6.5%
      let count = (rate * 15).toFixed(2)
      let space = rate.toString()[0] * 6.5
      // this.goods_star = Number(count) + space
      return Number(count) + space
      // this.post_star = Number(count) + space
    },
    cartListF() {
      if (this.getGoodsCartCount_num <= 0) {
        this.cart_list = false
        this.getCart.totalMoney = 0
      }
    },
    clearData() {
      console.log(this.detailSpecs)
      if (this.detailSpecs) {
        // this.specsId = null
        // this.labelId = null
        // this.attributeId = null
        // this.limitNum = 0
        // this.originalPrice = null
        // this.presentPrice = null
        // this.goodsSpecs = null
        // this.selN = null
        // this.seleN = null
        // this.goodsAttributeLabel = null
      } else {
        this.specsId = null
        this.labelId = null
        this.attributeId = null
        this.limitNum = 0
        this.originalPrice = null
        this.presentPrice = null
        this.goodsSpecs = null
        this.selN = null
        this.seleN = null
        this.goodsAttributeLabel = null
      }
    },
    //跳转
    linkGo(url, index) {
      // console.log(this.goodsArr, "goods");
      if (url == '/evaluate') {
        this.$router.push({
          path: '/evaluate',
          query: { id: this.$route.query.orderId }
        })
        return
      }
      if (url == '/order_details') {
        this.$router.push({
          path: '/order_details',
          query: { id: this.$route.query.order_id }
        })
        return
      }
      if (url == '/home') {
        this.$router.push({
          path: '/home',
          query: { pathName: 'business_shop' }
        })
        return
      }
      localStorage.setItem('shop_detail', JSON.stringify(this.goodsArr[index]))
      if (url == '/' + this.back_url) {
        localStorage.setItem('cartList', JSON.stringify([]))
      }
      if (url == '/login?path=cart&id=' + this.id || url == 'hasLog') {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        // console.log(arr);
        if (arr) {
          arr.forEach(el => {
            let data = {}
            data.sellerId = el.sellerId
            data.goodsId = el.id
            data.goodsNumber = el.number
            if (el.specsId) {
              data.specsId = el.specsId
            }
            if (el.attributeId) {
              data.attributeId = el.attributeId
            }
            if (el.labelId) {
              data.labelId = el.labelId
            }
            this.cartData.push(data)
          })
          console.log(this.cartData, 'chuan')
          localStorage.setItem('orderData', JSON.stringify(this.cartData))
        } else {
          arr = []
        }
      }
      if (url == 'hasLog') {
        this.batchAddGoodsCart()
        return
      }
      this.$router.push(url)
      if (index == '1') {
        this.menuList = !this.menuList
      } else if (index == 'list') {
        this.menuList = !this.menuList
        this.cartTrue = true
      } else if (index == 'text') {
        this.cartTrue = true
      }
    },
    cart_shop_list(change) {
      if (!this.getGoodsCartCount_num) {
        this.toast.error(this.shop_index.cart)
      } else if (change == 'cart') {
      } else {
        this.cart_list = !this.cart_list
      }
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        this.cartStorage = []
        let cartList = JSON.parse(localStorage.getItem('cartList'))

        this.cartStorage = cartList.filter(item => {
          return item.sellerId == this.id
        })
      } else {
        this.getGoodsCartCount()
        // this.get_GoodsCart();
      }

      let cartList = JSON.parse(localStorage.getItem('cartList'))
    },
    total_tt() {
      if (this.getGoodsCartCount_num <= 0) {
        this.cart_list = false
        this.getCart.totalMoney = 0
        this.delAlert = false
        this.totalM = 0
      }
      let arr = JSON.parse(localStorage.getItem('cartList'))
      // let num = 0;
      // let limitNums = 0;
      let total = 0
      let hezi = 0
      // let price = 0;
      // let isDiscount = false;
      // let isLoop = [];
      // for (let [index, elem] of arr.entries()) {
      //   num = 0;
      //   isDiscount = elem.isDiscount == 1 ? true : false;
      //   limitNums = isDiscount ? elem.limitNum : false;
      //   if (isLoop.includes(elem.specsId)) continue;
      //   for (let [jndex, item] of arr.entries()) {
      //     if (elem.id == item.id && elem.specsId == item.specsId) {
      //       item.specsId && isLoop.push(item.specsId);
      //       num += item.number;
      //     }
      //   }
      //   if (isDiscount) {
      //     if (!limitNums) return;
      //     num = num == 0 ? elem.number : num;
      //     if (num <= limitNums) {
      //       total += num * elem.presentPrice;
      //     } else {
      //       let normalNum = num - limitNums;
      //       total += limitNums * elem.presentPrice;
      //       total += normalNum * elem.originalPrice;
      //     }
      //     hezi += num * elem.lunchboxPrice;
      //   } else {
      //     total += elem.number * elem.originalPrice;
      //     hezi += elem.number * elem.lunchboxPrice;
      //   }
      // }

      arr.forEach(el => {
        if (el.isSpecs == 1 || el.goodsAttributeList) {
          if (el.limitNum) {
            if (el.number > el.limitNum) {
              let priceP = 0,
                priceO = 0
              priceP =
                (parseInt(el.number) - parseInt(el.limitNum)) *
                parseFloat(el.originalPrice)
              priceO = parseInt(el.limitNum) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round((priceP + priceO) * 100) / 100
            } else {
              let priceP = 0
              priceP = parseInt(el.number) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round(priceP * 100) / 100
            }
            //原价
            el.total_old =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
          } else {
            el.total_new =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
            el.total_old = null
          }
        } else {
          if (el.isDiscount == 1) {
            if (el.number > el.limitNum) {
              let priceP = 0,
                priceO = 0
              priceP =
                (parseInt(el.number) - parseInt(el.limitNum)) *
                parseFloat(el.originalPrice)
              priceO = parseInt(el.limitNum) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round((priceP + priceO) * 100) / 100
            } else {
              let priceP = 0
              priceP = parseInt(el.number) * parseFloat(el.presentPrice)
              //现价
              el.total_new = Math.round(priceP * 100) / 100
            }
            el.total_old =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
          } else {
            el.total_new =
              Math.round(
                parseInt(el.number) * parseFloat(el.originalPrice) * 100
              ) / 100
            el.total_old = null
          }
        }
        console.log('66')
      })

      arr.forEach(el => {
        if (el.isDiscount == 0) {
          el.limitNum = 0
        }
        if (el.isSpecs == 1 || el.attributeId) {
          total += el.money1
        } else {
          total += el.total_new
        }
        hezi += el.number * el.lunchboxPrice
      })
      this.totalM = Math.round((total + hezi) * 100) / 100
      this.hePrice = Math.round(hezi * 100) / 100
      // console.log(arr,'arr')
      localStorage.setItem('cartList', JSON.stringify(arr))
    },
    // 获取店铺信息
    get_shop_information() {
      store
        .dispatch('shop_information', {
          lat: this.lat,
          lon: this.lon,
          sellerId: this.id
        })
        .then(res => {
          this.activityList = []
          if (res.data.data.sellerActivityList) {
            let arr = res.data.data.sellerActivityList
            if (arr.length <= 3) {
              this.activityList = arr
            } else {
              arr.forEach((el, index) => {
                if (index <= 2) {
                  this.activityList.push(el)
                }
              })
            }
          }
          let data = res.data
          Object.assign(store.state.shop_info, data)
          this.loading = false
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    // 购物车商品数量
    getGoodsCartCount() {
      store
        .dispatch('getGoodsCartCount', {
          params: {
            sellerId: this.id
          }
        })
        .then(res => {
          // console.log("店铺信息", res.data);
          let data = res.data

          Object.assign(store.state.getGoodsCartCount, data)

          if (!data.data) {
            this.cart_list_num = data.sellerList
            this.cartNull = false
            this.cart_list = false
          } else {
            this.cartNull = true
          }
        })
        .catch(err => {
          // console.error("err:", this.loginStatus);
        })
    },
    // 单店购物车清空
    deleteGoodsCart() {
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        this.totalM = 0
        let arr = JSON.parse(localStorage.getItem('cartList'))
        if (!arr) {
          arr = []
        }
        this.cartStorage.forEach(el => {
          if (el.sellerId == this.id) {
            el.number = 0
            this.cartNum = 0
            this.goodsArr.forEach(el => {
              el.number = 0
            })
          }
          if (el.number > 0) {
            if (arr) {
              arr.forEach((elem, i) => {
                if (elem.id == el.id) {
                  arr.splice(i, 1)
                }
              })
              arr.push(el)
            } else {
              arr = []
              arr.push(el)
            }
          } else {
            arr.forEach((elem, i) => {
              if (elem.id == el.id) {
                arr.splice(i, 1)
              }
            })
          }
        })
        localStorage.setItem('cartList', JSON.stringify(arr))
      } else {
        store
          .dispatch('deleteGoodsCart', {
            params: {
              sellerId: this.id,
              platform: 3
            }
          })
          .then(res => {
            // console.log("店铺信息", res.data);
            let data = res.data
            Object.assign(store.state.deleteGoodsCart, data)
            this.getGoodsCartCount()
            this.get_shop_menu()
          })
          .catch(err => {
            // console.error("err:", err);
          })
      }
    },
    // 商品加减购物车
    addGoodsCart(type, goodsId, s, l, index) {
      this.cartStorage = JSON.parse(localStorage.getItem('cartList'))
      console.log(this.cartStorage, 'this.cartStorage')
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let total = 0
        let that = this.cartStorage[index]
        if (type == '-1') {
          this.cartStorage[index].number--
          console.log(this.cartStorage, 'this.cartStorage1')
          this.cartStorage.splice(index, 1, this.cartStorage[index])
          this.cartNum--

          if (that.isSpecs == 1 || that.attributeId) {
            let num = 0
            this.cartStorage.forEach(el => {
              if (el.id == that.id && el.specsId == that.specsId) {
                num += el.number
              }
            })
            // console.log('attributeId',num)
            if (that.limitNum) {
              if (num >= that.limitNum) {
                if (
                  Math.round(that.money1 / (that.number + 1) * 100) / 100 ==
                  that.presentPrice
                ) {
                  that.money1 =
                    Math.round((that.money1 - that.presentPrice) * 100) / 100
                  console.log('........减优惠........', this.cartStorage)
                  for (let i = 0; i < this.cartStorage.length; i++) {
                    let el = this.cartStorage[i]
                    if (
                      el.id == that.id &&
                      el.specsId == that.specsId &&
                      el.labelId != that.labelId &&
                      el.money1 >= el.originalPrice &&
                      el.money1 % el.presentPrice != 0
                    ) {
                      el.money1 =
                        Math.round(
                          (el.money1 - el.originalPrice + el.presentPrice) * 100
                        ) / 100
                      console.log('............for..........')
                      break
                    }
                  }
                } else {
                  that.money1 =
                    Math.round((that.money1 - that.originalPrice) * 100) / 100
                  console.log('........减原价........', num)
                }
                that.money2 =
                  Math.round((that.money2 - that.originalPrice) * 100) / 100
              } else {
                that.money1 =
                  Math.round((that.money1 - that.presentPrice) * 100) / 100
                console.log('........减优惠价........', num)
              }
              that.money2 =
                Math.round((that.money2 - that.originalPrice) * 100) / 100
            } else {
              that.money1 =
                Math.round((that.money1 - that.originalPrice) * 100) / 100
              console.log('........减优原........', num)

              that.money2 =
                Math.round((that.money2 - that.originalPrice) * 100) / 100
            }
          }
        } else if (type == '1') {
          if (this.cartStorage[index].stock <= this.cartStorage[index].number) {
            this.toast(this.shop_index.stock)
            return
          }

          this.cartStorage[index].number++

          this.cartStorage.splice(index, 1, this.cartStorage[index])
          this.cartNum++
          if (that.isSpecs == 1 || that.attributeId) {
            let num = 0
            this.cartStorage.forEach(el => {
              if (el.id == that.id && el.specsId == that.specsId) {
                num += el.number
              }
            })
            console.log('attributeId', num)
            // console.log('................',num)
            if (that.limitNum) {
              if (num > that.limitNum && num - that.limitNum < 2) {
                this.toast(this.shop_index.Exce)
              }
              if (num > that.limitNum) {
                console.log('...........加优惠价.................')
                that.money1 =
                  Math.round((that.originalPrice + that.money1) * 100) / 100
              } else {
                console.log('...........加原价.................')
                that.money1 =
                  Math.round((that.presentPrice + that.money1) * 100) / 100
              }
              that.money2 =
                Math.round((that.originalPrice + that.money2) * 100) / 100
            } else {
              that.money1 =
                Math.round((that.originalPrice + that.money1) * 100) / 100

              that.money2 =
                Math.round((that.originalPrice + that.money2) * 100) / 100
            }
          } else {
            let num = 0
            num = that.number
            if (num > that.limitNum && num - that.limitNum < 2) {
              this.toast(this.shop_index.Exce)
            }
          }
        }
        this.cartStorage.forEach((el, index) => {
          let surPlus = 0
          if (el.number == 0) {
            this.cartStorage.splice(index, 1)
          }
        })

        localStorage.setItem('cartList', JSON.stringify(this.cartStorage))

        this.cartS++

        let arr = []
        arr = this.goodsArr.concat()
        let cartList = JSON.parse(localStorage.getItem('cartList'))
        this.cartNum = 0
        cartList.forEach(item => {
          if (item.sellerId == this.id) {
            this.cartNum += item.number
          }
        })
        if (this.loginStatus == 401 || this.loginStatus == 410) {
          arr.forEach(el => {
            el.number = 0
            if (cartList) {
              cartList.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        } else {
          arr.forEach(el => {
            el.number = 0
            if (this.cart_list_num) {
              this.cart_list_num.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        }
      } else {
        if (s || l) {
          // this.toast.error("该商品无法在这操作！");
          return
        }
        store
          .dispatch('addGoodsCart', {
            sellerId: this.id,
            goodsId: goodsId,
            goodsNumber: type,
            specsId: this.specsId,
            labelId: this.labelId,
            attributeId: this.attributeId
          })
          .then(res => {
            // console.log("店铺信息", res.data);
            if (res.data.code == 1) {
              if (type == 1) {
                // this.toast.success("购物车成功 +1！");
              } else if (type == -1) {
                // this.toast.success("购物车成功 -1！");
              }
              this.getGoodsCartCount()
              this.get_GoodsCart()

              // window.location.reload();
            }
            let data = res.data

            Object.assign(store.state.addGoodsCart, data)
          })
          .catch(err => {
            // console.error("err:", err);
          })
      }
    },
    // 单店购物车列表
    get_GoodsCart() {
      store
        .dispatch('get_GoodsCart', {
          params: {
            sellerId: this.id,
            platform: 3
          }
        })
        .then(res => {
          // console.log('购物车', res.data.data);
          let data = res.data.data
          let data1 = data.find(el => {
            return this.id == el.sellerId
          })
          if (data1) {
            this.cart_list_num = data1.sellerList
          }
          let arr = []
          arr = this.goodsArr.concat()
          arr.forEach(el => {
            el.number = 0
            if (this.cart_list_num) {
              this.cart_list_num.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            }
          })
          this.getCart = data1
          // console.log(data1.sellerList,'sellerList')
          Object.assign(store.state.getGoodsCart, data1)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },

    // 获取店铺菜单
    get_shop_menu(type) {
      this.goodsArr = []
      store
        .dispatch('shop_menu', {
          sellerId: this.id
        })
        .then(res => {
          let data = res.data
          this.menuArr = res.data.data

          this.menuArr.forEach(el => {
            el.goodsList.forEach(item => {
              this.goodsArr.push(item)
            })
          })
          if (this.goodsArr.length <= 0) {
            this.nullShop = true
          } else {
            this.nullShop = false
          }

          let arr = []
          arr = this.goodsArr.concat()

          let cartList = JSON.parse(localStorage.getItem('cartList'))
          this.cartNum = 0
          cartList.forEach(item => {
            if (item.sellerId == this.id) {
              this.cartNum += item.number
            }
          })
          if (this.loginStatus == 401 || this.loginStatus == 410) {
            arr.forEach(el => {
              el.money1 = 0
              el.money2 = 0
              el.number = 0
              if (cartList) {
                cartList.forEach(item => {
                  if (el.id == item.id) {
                    el.number += item.number
                  }
                })
              } else {
                el.number = 0
              }
            })
          } else {
            arr.forEach(el => {
              el.number = 0
              if (this.cart_list_num) {
                this.cart_list_num.forEach(item => {
                  if (el.id == item.id) {
                    el.number += item.number
                  }
                })
              } else {
                el.number = 0
              }
            })
          }

          Object.assign(store.state.shop_menu, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    click_check_all() {
      this.in_index = 'all'
      this.menuList = false
      this.get_shop_menu()
    },
    click_check(index) {
      this.in_index = index
      this.menuList = false
      // console.log(this.menuArr[index])
      this.goodsArr = this.menuArr[index].goodsList
    },
    //加减购物车商品
    addRemove(flag, type, id, list, isSpecs, index, stock) {
      //  console.log(this.loginStatus)

      this.goodsId = id
      this.index = index
      if (list || isSpecs == 1) {
        if (type == 1) {
          this.detailSpecs = true
          this.detailData = this.goodsArr[index]
          if (this.detailData.isSpecs == 1) {
            this.limitNum = null
            let startDate = '',
              endDate = '',
              startTime = '',
              endTime = '',
              startTimeA = '',
              endTimeA = '',
              nowTime = '',
              data = this.detailData.goodsSpecsList[0]
            this.newTime = new Date().getTime()
            nowTime = new Date().getHours() + '' + new Date().getMinutes()

            if (data.endDate && data.startDate && data.isDiscount) {
              startDate = this.$formatDateTime(data.startDate, 'ymd')
              endDate = this.$formatDateTime(data.endDate, 'ymd')
            }
            if (data.startTime && data.endTime) {
              startTime = parseInt(data.startTime.replace(':', ''))
              endTime = parseInt(data.endTime.replace(':', ''))

              //  Stime=new Date(startTime).getTime()
              //  Etime=new Date(endTime).getTime()
            }
            if (data.startTimeA && data.endTimeA) {
              startTimeA = parseInt(data.startTimeA.replace(':', ''))
              endTimeA = parseInt(data.endTimeA.replace(':', ''))
              //  StimeA=new Date(startTimeA).getTime()
              //  EtimeA=new Date(endTimeA).getTime()
            }

            if (data.isDiscount == 1) {
              if (data.isAllDay == 1) {
                if (
                  data.startDate < this.newTime &&
                  this.newTime < data.endDate
                ) {
                  this.limitNum = this.detailData.goodsSpecsList[0].limitNum
                }
              } else {
                if (
                  data.startDate < this.newTime &&
                  this.newTime < data.endDate
                ) {
                  if (startTime < nowTime && nowTime < endTime) {
                    console.log(startTime, nowTime, endTime)
                    this.limitNum = this.detailData.goodsSpecsList[0].limitNum
                  }
                  if (startTimeA < nowTime && nowTime < endTimeA) {
                    this.limitNum = this.detailData.goodsSpecsList[0].limitNum
                  }
                }
              }
            }
            this.selN = 0
            this.specsId = this.detailData.goodsSpecsList[0].id
            this.originalPrice = this.detailData.goodsSpecsList[0].originalPrice
            this.presentPrice = this.detailData.goodsSpecsList[0].presentPrice
            this.goodsSpecs = this.detailData.goodsSpecsList[0].goodsSpecs
          }
          if (
            this.detailData.goodsAttributeList &&
            this.detailData.goodsAttributeList.length > 0
          ) {
            this.seleN = 0
            this.labelId = this.detailData.goodsAttributeList[0].goodsLabelList[0].id
            this.attributeId = this.detailData.goodsAttributeList[0].goodsLabelList[0].attributeId
            this.goodsAttributeLabel = this.detailData.goodsAttributeList[0].goodsLabelList[0].goodsAttributeLabel
            // console.log('辣度', this.detailData.goodsAttributeList[0])
          }
          console.log('1111111111322221111', this.seleN)
          return
        }
        if (type == -1 && this.goodsArr[index].number >= 2) {
          this.toast.error(this.shop_index.allDel)
          return
        }
      }

      // console.log("111111111111111111111111111111111111111111");
      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        let total = 0
        let that = this.goodsArr[index]
        //  console.log(this.goodsArr[index].number,'number')

        if (type == '-1') {
          this.goodsArr[index].number--
          this.goodsArr.splice(index, 1, this.goodsArr[index])
          this.cartNum--
        } else if (type == '1') {
          if (stock <= this.goodsArr[index].number) {
            this.toast(this.shop_index.stock)
            return
          }
          if (arr.length == 0) {
            this.goodsArr[index].number = 1
          } else {
            this.goodsArr[index].number++
          }

          this.goodsArr.splice(index, 1, this.goodsArr[index])
          this.cartNum++
        }

        if (!arr) {
          arr = []
        }

        let da = this.goodsArr[index]
        if (arr.length > 0) {
          arr.forEach((el, i) => {
            if (el.id == da.id) {
              arr.splice(i, 1)

              // if (da.number == 0 && el.id == da.id) {
              //   arr.splice(i, 1);
              //   return;
              // }
            }
          })

          if (da.number != 0) {
            arr.push(this.goodsArr[index])
          }
        } else {
          arr.push(this.goodsArr[index])
        }
        let num = 0
        arr.forEach((el, index) => {
          if (el.id == da.id) {
            num = el.number
          }
        })
        if (da.isDiscount == 1 && type == 1) {
          if (num > da.limitNum && num - da.limitNum < 2) {
            this.toast(this.shop_index.Exce)
          }
        }

        // this.loading = false
        localStorage.setItem('cartList', JSON.stringify(arr))

        let cartList = JSON.parse(localStorage.getItem('cartList'))

        this.goodsArr.forEach(el => {
          el.number = 0
          if (cartList) {
            cartList.forEach(item => {
              if (el.id == item.id) {
                el.number += item.number
              }
            })
          } else {
            el.number = 0
          }
        })
      } else {
        if (type == '-1') {
          this.goodsArr[index].number--
          this.goodsArr.splice(index, 1, this.goodsArr[index])
        } else if (type == '1') {
          this.goodsArr[index].number++
          this.goodsArr.splice(index, 1, this.goodsArr[index])
        }
        this.addGoodsCart(type, id)
      }
    },
    //获取店铺评论总信息
    get_shop_comment() {
      store
        .dispatch('shop_comment', {
          sellerId: this.id
        })
        .then(res => {
          // console.log("店铺", res.data);
          let data = res.data
          Object.assign(store.state.shop_comment, data)
        })
        .catch(err => {
          // console.error("err:", err);
        })
    },
    sel(index, id, limit, or, pr, goodsSpecs, data) {
      this.limitNum = null
      let startDate = '',
        endDate = '',
        startTime = '',
        endTime = '',
        startTimeA = '',
        endTimeA = '',
        nowTime = ''
      this.newTime = new Date().getTime()
      nowTime = new Date().getHours() + '' + new Date().getMinutes()

      if (data.endDate && data.startDate && data.isDiscount) {
        startDate = this.$formatDateTime(data.startDate, 'ymd')
        endDate = this.$formatDateTime(data.endDate, 'ymd')
      }
      console.log(startDate, endDate, '5')
      if (data.startTime && data.endTime) {
        startTime = parseInt(data.startTime.replace(':', ''))
        endTime = parseInt(data.endTime.replace(':', ''))

        //  Stime=new Date(startTime).getTime()
        //  Etime=new Date(endTime).getTime()
      }
      if (data.startTimeA && data.endTimeA) {
        startTimeA = parseInt(data.startTimeA.replace(':', ''))
        endTimeA = parseInt(data.endTimeA.replace(':', ''))
        //  StimeA=new Date(startTimeA).getTime()
        //  EtimeA=new Date(endTimeA).getTime()
      }

      if (data.isDiscount == 1) {
        if (data.isAllDay == 1) {
          if (data.startDate < this.newTime && this.newTime < data.endDate) {
            this.limitNum = limit
          }
        } else {
          if (data.startDate < this.newTime && this.newTime < data.endDate) {
            if (startTime < nowTime && nowTime < endTime) {
              console.log(startTime, nowTime, endTime)
              this.limitNum = limit
            }
            if (startTimeA < nowTime && nowTime < endTimeA) {
              this.limitNum = limit
            }
          }
        }
      }

      this.selN = index
      this.specsId = id
      this.originalPrice = or
      this.presentPrice = pr
      this.goodsSpecs = goodsSpecs
      console.log(or, pr, '66')
      // console.log(this.limitNum, "limitNum11111111111111");
    },
    sele(index, id, attr, label) {
      this.seleN = index
      this.labelId = id
      this.attributeId = attr
      this.goodsAttributeLabel = label
      console.log(id, attr)
    },
    //选好了
    select_cart(index) {
      this.cartS++
      if (this.goodsArr[index].isSpecs == 1 && this.selN == null) {
        this.toast.error(this.shop_index.ple)
        return
      }
      if (this.goodsArr[index].goodsAttributeList && this.seleN == null) {
        this.toast.error(this.shop_index.plea)
        return
      }

      if (this.loginStatus == 401 || this.loginStatus == 410) {
        let arr = JSON.parse(localStorage.getItem('cartList'))
        function simpleClone(initalObj) {
          var obj = {}
          for (var i in initalObj) {
            obj[i] = initalObj[i]
          }
          return obj
        }
        let data = simpleClone(this.goodsArr[index])

        data.specsId = this.specsId
        data.labelId = this.labelId
        data.attributeId = this.attributeId
        if (data.isDiscount == 0) {
          data.limitNum = 0
        }
        if (this.limitNum) {
          data.limitNum = this.limitNum
          data.isDiscount = 1
        }
        // if (this.selN != null && !this.limitNum) {
        //   data.isDiscount = 0;
        //   data.limitNum = 0;
        // }

        if (this.originalPrice) {
          data.originalPrice = this.originalPrice
        }
        if (this.presentPrice) {
          data.presentPrice = this.presentPrice
        }
        data.goodsSpecs = this.goodsSpecs
        data.goodsAttributeLabel = this.goodsAttributeLabel
        data.number = 1

        let pushArr = []
        let pushNum = 0
        let stockArr = []
        let stockNum = 0
        if (arr.length > 0) {
          arr.forEach(el => {
            stockNum = 0
            pushNum = 0
            // console.log('11111111', el)
            if (el.id == data.id && el.specsId == data.specsId && el.specsId) {
              pushArr.push(el)
              // console.log(11111111111111,'stock')
              // console.log(data,'data')
            } else if (
              el.id == data.id &&
              el.attributeId == data.attributeId &&
              !el.specsId
            ) {
              pushArr.push(el)
              // console.log(1111122222211111,'stock')
            }
            if (el.id == data.id) {
              stockArr.push(el)
            }
            if (stockArr.length > 0) {
              stockArr.forEach(el => {
                stockNum += el.number
              })
            }
            if (pushArr.length > 0) {
              pushArr.forEach(el => {
                pushNum += el.number
              })
            }
          })
        } else {
          if (this.limitNum) {
            data.money1 = this.presentPrice
            data.money2 = this.originalPrice
          } else if (data.limitNum && !data.specsId) {
            data.money1 = data.presentPrice
            data.money2 = data.originalPrice
          } else if (!data.limitNum && !data.specsId) {
            data.money1 = data.originalPrice
            data.money2 = data.originalPrice
          } else {
            data.money1 = this.originalPrice
            data.money2 = this.originalPrice
          }
        }

        if (this.limitNum) {
          if (pushNum >= this.limitNum) {
            data.money1 = this.originalPrice
          } else {
            data.money1 = this.presentPrice
          }
          data.money2 = this.originalPrice
        } else if (data.limitNum && !data.specsId) {
          if (pushNum >= data.limitNum) {
            data.money1 = data.originalPrice
          } else {
            data.money1 = data.presentPrice
          }
          data.money2 = data.originalPrice
        } else if (!data.limitNum && !data.specsId) {
          data.money1 = data.originalPrice
          data.money2 = data.originalPrice
        } else {
          data.money1 = this.originalPrice
          data.money2 = this.originalPrice
        }

        if (arr) {
          // console.log(arr, "arr");
          arr.forEach((el, index) => {
            if (
              el.id == data.id &&
              el.specsId == data.specsId &&
              el.labelId == data.labelId &&
              el.attributeId == data.attributeId
            ) {
              data.number = el.number
              arr.splice(index, 1)
              data.number++

              if (this.limitNum) {
                if (pushNum >= this.limitNum) {
                  let money1 =
                    Math.round((this.originalPrice + el.money1) * 100) / 100
                  data['money1'] = money1
                } else {
                  data.money1 =
                    Math.round((this.presentPrice + el.money1) * 100) / 100
                }
                data.money2 =
                  Math.round((this.originalPrice + el.money2) * 100) / 100
              } else if (data.limitNum && !data.specsId) {
                if (pushNum >= data.limitNum) {
                  let money1 =
                    Math.round((data.originalPrice + el.money1) * 100) / 100
                  data['money1'] = money1
                } else {
                  data.money1 =
                    Math.round((data.presentPrice + el.money1) * 100) / 100
                }
                data.money2 =
                  Math.round((data.originalPrice + el.money2) * 100) / 100
              } else if (!data.limitNum && !data.specsId) {
                data.money1 =
                  Math.round((data.originalPrice + el.money1) * 100) / 100
                data.money2 =
                  Math.round((data.originalPrice + el.money2) * 100) / 100
              } else {
                data.money1 =
                  Math.round((this.originalPrice + el.money1) * 100) / 100
                data.money2 =
                  Math.round((this.originalPrice + el.money2) * 100) / 100
              }
            }
          })
          console.log(this.goodsArr[index].stock, stockNum, 'stock')
          if (this.goodsArr[index].stock < stockNum + 1) {
            this.toast(this.shop_index.stock)
            return
          }
          // this.cartNum++;
          arr.push(data)
          if (data.limitNum) {
            // console.log("limitNum");
            let num = 0
            arr.forEach((el, index) => {
              if (el.id == data.id && el.specsId == data.specsId) {
                num += el.number
              }
            })

            if (num > data.limitNum && num - data.limitNum < 2) {
              this.toast(this.shop_index.Exce)
            }
          }
        } else {
          arr = []
          arr.push(data)
        }
        localStorage.setItem('cartList', JSON.stringify(arr))

        let cartList = JSON.parse(localStorage.getItem('cartList'))
        this.cartNum = 0
        cartList.forEach(item => {
          if (item.sellerId == this.id) {
            this.cartNum += item.number
          }
        })
        if (this.loginStatus == 401 || this.loginStatus == 410) {
          this.goodsArr.forEach(el => {
            el.number = 0
            if (cartList) {
              cartList.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        } else {
          this.goodsArr.forEach(el => {
            el.number = 0
            if (this.cart_list_num) {
              this.cart_list_num.forEach(item => {
                if (el.id == item.id) {
                  el.number += item.number
                }
              })
            } else {
              el.number = 0
            }
          })
        }

        // this.get_shop_menu();
      } else {
        this.addGoodsCart(1, this.goodsId)
        this.goodsArr[this.index].number++
        this.goodsArr.splice(this.index, 1, this.goodsArr[this.index])
      }
      this.specsId = null
      this.labelId = null
      this.attributeId = null
      this.limitNum = 0
      this.originalPrice = null
      this.presentPrice = null
      this.goodsSpecs = null
      this.goodsAttributeLabel = null
      this.detailSpecs = false
      this.selN = null
      this.seleN = null
    },
    //下单接口
    order_Info() {},
    // 购物车批量导入
    batchAddGoodsCart() {
      this.goodsArr.forEach(el => {
        el.number = 0
      })
      let data = localStorage.getItem('orderData')
      store
        .dispatch('batchAddGoodsCart', { goodsCart: data, platform: 3 })
        .then(res => {
          // console.log("购物车信息", res.data);
          let data = res.data
          if (res.data.code == 1) {
            this.get_shop_menu()
            console.log(this.goodsArr, 'goodsArr')
            this.$router.push('/submit_order?id=' + this.id)
            // localStorage.setItem("orderData", JSON.stringify([]));
            Object.assign(store.state.batchAddGoodsCart, data)
          } else {
            this.toast.error(res.data.message)
            // localStorage.setItem("orderData", JSON.stringify([]));
          }
        })
        .catch(err => {
          // this.loginStatus = err.status;
          // console.error("err:", this.loginStatus);
        })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.shopIndex {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: white;
}
.contain {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.loading_gif {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
  background: white;
  padding-top: 20%;
}

.loading_gif img {
  width: 20% !important;
  position: relative;
  left: 40%;
  margin-bottom: 10px;
}

.loading_gif p {
  text-align: center;
}
.delAlert {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  ul {
    width: 8rem;
    height: 3rem;
    background: white;
    border-radius: 0.3rem;
    li {
      width: 100%;

      &:nth-child(1) {
        border-bottom: 1px solid #f6f6f6;
        height: 60%;
      }
      span {
        font-size: 13px;
        padding: 0 0.5rem;
      }
      &:nth-child(2) {
        height: 40%;
        span {
          width: 50%;
          height: 100%;
          &:nth-child(1) {
            border-right: 1px solid #f6f6f6;
          }
        }
      }
    }
  }
}

.rate_contain {
  vertical-align: middle;
  display: inline-block;
  position: relative;
  width: 4rem;
  .rate_gray {
    display: inline-block;
    width: 100%;
    img {
      width: 4rem;
    }
  }
  .rate_red {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    overflow: hidden;
    img {
      width: 4rem;
    }
  }
}

.shop_header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 3;
  height: 7%;
}

.shop_header > span {
  width: 1.5rem;
  height: 1.5rem;
}

.shop_header > span > i {
  width: 0.6rem;
  height: 40%;
}

.shop_header > span > i > img {
  width: 100%;
}

.shopImage {
  width: 100%;
  height: 20%;
  position: relative;
  left: 0;
  top: 0;
}

.shopImage > i {
  width: 100%;
  height: 93%;
}

.shopImage > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shopImage > span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 93%;
  background: rgba(0, 0, 0, 0.1);
}

.shopHead {
  width: 100%;
  position: absolute;
  left: 0;
  top: 7%;
  z-index: 994;
}

.shopHead > i {
  width: 13vh;
  height: 13vh;
  background: white;
  border-radius: 50%;
}

.shopHead > i > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.shopText {
  width: 100%;
  min-height: 10%;
  max-height: 20%;
  background: white;
  position: relative;
  z-index: 993;
}

.shopText > p {
  font-size: 0.6rem;
  font-weight: 600;
  color: #333;
  padding: 0.3rem 0 0.1rem;
}

.shopText > span {
  font-size: 12px;
  color: #a0a0a0;
  width: 5rem;
  padding-bottom: 0.1rem;
}

.shopText > ul {
  margin: 0.1rem 0;
}

.shopText > ul > li {
  padding: 2px 5px;
  display: flex;
  align-items: center;
  border: 1px solid #ffbc83;
  background: #fff6cd;
  border-radius: 2px;
  color: #ff8f23;
  font-size: 12px;
  margin-right: 0.15rem;
}

.shopText > ul > li > i {
  display: flex;
  height: 100%;
  width: 1px;
  border-right: 1px dashed #ff8f23;
  margin-left: 4px;
}

.shopText > ol {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}
.shopText > ol > li:nth-child(1) {
  width: 15px;
  height: 15px;
}

.shopText > ol > li:nth-child(1) > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shopText > ol > li:nth-child(2) {
  color: #a0a0a0;
  font-size: 0.45rem;
  margin: 0 0.3rem;
  width: 55%;
}

.shopText > ol > li:nth-child(2) > span {
  color: #a0a0a0;
  font-size: 12px;
}

.shopText > ol > li:nth-child(3) {
  height: 20px;
}

.shopText > ol > li:nth-child(3) > span {
  font-size: 12px;
  color: #999;
  margin-right: 0.1rem;
}

.shopText > ol > li:nth-child(3) > img {
  width: 10px;
  height: 7px;
}

.shoptxt {
  width: 100%;
  // height: 14rem;
  overflow-y: scroll;
  background: white;
  position: absolute;
  top: 2.5rem;
  left: 0;
  z-index: 1000;
}

// @media screen and (max-height: 816px) {
//   .shoptxt {
//     width: 100%;
//     height: 17rem;
//     overflow-y: scroll;
//     background: white;
//     position: absolute;
//     top: 2.5rem;
//     left: 0;
//     z-index: 1000;
//   }
// }

// @media screen and (max-height: 736px) {
//   .shoptxt {
//     width: 100%;
//     height: 14rem;
//     overflow-y: scroll;
//     background: white;
//     position: absolute;
//     top: 2.5rem;
//     left: 0;
//     z-index: 1000;
//   }
// }

// @media screen and (max-height: 450px) {
//   .shoptxt {
//     width: 100%;
//     height: 10rem;
//     overflow-y: scroll;
//     background: white;
//     position: absolute;
//     top: 2.5rem;
//     left: 0;
//     z-index: 1000;
//   }
// }

.shoptxt::-webkit-scrollbar {
  display: none;
}

.shoptxt > p {
  padding: 0.2rem 0.4rem;
  font-size: 0.5rem;
}

.shoptxt > ul {
  width: 100%;
}

.shoptxt > ul > li {
  width: 100%;
  display: flex;
  padding: 0 1rem;
  margin-bottom: 0.1rem;
}

.shoptxt > ul > li > i {
  width: 15px;
  height: 15px;
  margin-right: 0.3rem;
}

.shoptxt > ul > li > i > img {
  width: 15px;
  height: 15px;
}
.shoptxt > ul > li:first-child > i > img {
  vertical-align: middle;
}

.shoptxt > ul > li > span {
  font-size: 12px;
  width: 10rem;
  color: #898989;
}

.shoptxt > div {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5%;
  background: white;
}

.shoptxt > div > i {
  width: 1.5rem;
  height: 1.5rem;
}

.shoptxt > div > i > img {
  width: 100%;
}

.shop_contem {
  width: 100%;
  min-height: 57%;
  max-height: 65%;
  background: white;
}

.shop_contem > ul {
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #ededed;
}

.shop_contem > ul > li {
  font-size: 16px;
  color: #6e6e6e;
  display: flex;
  width: 3rem;
  height: 1.55rem;
  justify-content: center;
  align-items: center; // background: red;
  border-bottom: 2px solid #fff;
}

.shop_contem > ul > li > i {
  width: 0.7rem;
  height: 0.6rem;
  margin-right: 0.2rem;
}

.shop_contem > ul > li > i > img {
  width: 100%;
}

.shop_contem > ul > li.active {
  border-bottom: 2px solid #ff4a47;
  color: #333;
}

.shop_contem > div {
  width: 100%;
  // height: 380px;
  background: white;
  overflow-y: scroll;
  position: relative;
}

.shop_contem > div::-webkit-scrollbar {
  display: none;
}

.no_bus_task {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
}

.not_in_scope_popup,
.no_bus_popup {
  width: 60%;
  background: white;
  position: absolute;
  z-index: 9999;
  top: 30%;
  left: 20%;
  border-radius: 8px;
  text-align: center;
}

.not_in_scope_popup {
  padding: 0 0.4rem 0.4rem 0.4rem;
}

.not_in_scope_popup div:first-child {
  width: 50%;
  margin: auto;
  position: relative;
  top: -25px;
  border-radius: 50%;
  background: white;
}

.not_in_scope_hint {
  color: #999999;
  font-size: 14px;
  position: relative;
  top: -18px;
}

.not_in_scope_popup div:last-child {
  width: 100%;
  background: #ff644c;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 2px;
}

.not_in_scope_popup img {
  width: 100%;
}

.no_bus_popup div:first-child {
  width: 100%;
  padding: 0.6rem 0.4rem;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #ededed;
}

.no_bus_popup div:last-child {
  width: 100%;
  padding: 0.2rem 0.4rem;
  border-radius: 0 0 8px 8px;
  color: #ff644c;
}

.shop_cart {
  width: 100%;
  height: 1.8rem;
  background: #999;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 998;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.shop_cart > div:nth-child(1) {
  width: 3rem;
  background: #665c5c;
  position: relative;
}

.shop_cart > div:nth-child(1) > i {
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  bottom: 0.1rem;
  z-index: 1115;
  right: 0.5rem;
}

.shop_cart > div:nth-child(1) > span {
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 1116;
  border-radius: 50%;
  background: #ff3633;
  font-size: 12px;
  box-shadow: 0 0 2px #fff;
  line-height: 18px;
  text-align: center;
  right: 0.5rem;
  top: -0.3rem;
}

.shop_cart > div:nth-child(1) > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop_cart > div:nth-child(2) {
  flex: 1;
  background: #665c5c;
}

.shop_cart > div:nth-child(2) > p {
  font-size: 12px;
  // margin-bottom: 0.1rem;
}

.shop_cart > div:nth-child(2) > span {
  font-size: 12px;
}

.shop_cart > div:nth-child(3) {
  width: 4rem;
}

.shop_cart > div:nth-child(3) > span {
  width: 4rem;
  height: 100%;
  font-size: 12px;
  // line-height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.shop_busFlag {
  width: 100%;
  height: 1.8rem;
  background: #999;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #eae8e8;
  z-index: 998;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.goods_information {
  width: 100%;
  padding: 0.4rem;
}

.goods_information:last-child {
  margin-bottom: 2rem;
}

// @media screen and (min-height: 390px) {
//   .goods_information:last-child {
//   margin-bottom: 6rem;
//   }
// }
// @media screen and (min-height: 440px) {
//   .goods_information:last-child {
//   margin-bottom: 6rem;
//   }
// }
// @media screen and (min-height: 500px) {
//   .goods_information:last-child {
//   margin-bottom: 6rem;
//   }
// }
// @media screen and (min-height: 550px) {
//   .goods_information:last-child {
//   margin-bottom: 4.5rem;
//   }
// }
// @media screen and (min-height: 650px) {
//   .goods_information:last-child {
//   margin-bottom: 4rem;
//   }
// }
// @media screen and (min-height: 730px) {
//   .goods_information:last-child {
//   margin-bottom: 4rem;
//   }
// }
// @media screen and (min-height: 810px) {
//   .goods_information:last-child {
//   margin-bottom: 4rem;
//   }
// }

.goods_information > div {
  width: 3.5rem;
  height: 2.7rem;
}

.goods_information > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods_information > ul {
  width: 5.5rem;
  height: 2.7rem;
}

.goods_information > ul > li:nth-child(1) {
  font-size: 0.5rem;
  color: #111;
  width: 5.5rem;
  padding: 0 0.2rem;
}

.goods_information > ul > li:nth-child(2) {
  color: #a0a0a0;
  padding: 0.1rem 0.2rem;
}

.goods_information > ul > li:nth-child(2) > p {
  font-size: 12px;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(2) > img {
  width: 12px;
  height: 12px;
}

.goods_information > ul > li:nth-child(2) > span {
  font-size: 12px;
}

.goods_information > ul > li:nth-child(3) {
  padding: 0 0.2rem;
  margin-top: 0.5rem;
}

.goods_information > ul > li:nth-child(3) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.goods_information > ul > li:nth-child(3) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}

.goods_information > p {
  width: 3rem;
  height: 2.7rem;
}

.goods_information > p > span {
  padding: 0.2rem;
  font-size: 0.5rem;
}

.goods_information > p > i {
  width: 0.8rem;
  height: 0.8rem;
}

.goods_information > p > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods_information > span {
  width: 3rem;
  height: 2.7rem;
}

.menu_list {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  // height: 80%;
  background: white;
  overflow-y: scroll;
}

// @media screen and (max-height: 816px) {
//   .menu_list {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 14rem;
//     background: white;
//     overflow-y: scroll;
//   }
// }

// @media screen and (max-height: 736px) {
//   .menu_list {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 10.5rem;
//     background: white;
//     overflow-y: scroll;
//   }
// }

// @media screen and (max-height: 500px) {
//   .menu_list {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 8rem;
//     background: white;
//     overflow-y: scroll;
//   }
// }

.menu_list::-webkit-scrollbar {
  display: none;
}

.menu_list > li:last-child {
  // margin-bottom: 1.8rem;
}

.menu_list > li {
  width: 100%;
  height: 1.5rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: 1px solid #ededed;
}

.menu_list > li > i {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 0.5rem 0 1rem;
}

.menu_list > li > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu_list > li > span {
  font-size: 0.5rem;
  color: #6e6e6e;
}

.carts {
  width: 100%;
  padding: 0.3rem;
  border-bottom: 1px solid #f6f6f6;
  position: relative;
}

.carts:last-child {
}

.carts > div {
  width: 2.4rem;
  height: 2rem;
}

.carts > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carts > ul {
  width: 6rem;
  height: 2rem;
}

.carts > ul > li:nth-child(1) {
  font-size: 0.6rem;
  color: #111;
  width: 5.5rem;
  padding: 0 0.2rem;
}

.carts > ul > li:nth-child(2) {
  padding: 0 0.2rem;
}
.carts > ul > li:first-child > p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.carts > ul > li:nth-child(2) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.carts > ul > li:nth-child(2) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}

.carts > p {
  width: 3rem;
  height: 2rem;
}

.carts > p > span {
  padding: 0.2rem;
  font-size: 0.5rem;
}

.carts > p > i {
  width: 0.8rem;
  height: 0.8rem;
}

.carts > p > i > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carts > span {
  width: 11.4rem;
  height: 2rem;
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
  background: rgba(255, 255, 255, 0.4);
}

.carts > span > span {
  position: absolute;
  background: #ccc;
  color: white;
  left: 0;
  bottom: 0;
  font-size: 0.3rem;
  width: 2.4rem;
  height: 0.5rem;
  text-align: center;
}

.cartList {
  width: 100%;
  height: calc(100vh - 1.8rem);
  position: fixed;
  left: 0;
  bottom: 1.8rem;
  background: rgba(0, 0, 0, 0.4);
  z-index: 997;
}

.cartList > div {
  width: 100%;
  background: white;
  position: absolute;
  left: 0;
  bottom: 0;
}

.cartList > div > p {
  width: 100%;
  height: 1rem;
  background: #fffbe6;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #666;
}

.cartList > div > i {
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.4rem;
  border-bottom: 1px solid #f6f6f6;
}

.cartList > div > i > img {
  width: 0.5rem;
}

.cartList > div > ul {
  width: 100%;
  max-height: 10rem;
  overflow-y: scroll;
  margin-bottom: 1.6rem;
}

.cartList > div > ul::-webkit-scrollbar {
  display: none;
}

.cartList > div > span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;

  padding: 0 0.3rem;
}

.detail_block {
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  z-index: 999;
}

.detail_specs {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
  z-index: 3;
}

.detail_text {
  color: #898989;
  padding: 0.2rem 0.5rem;
}

.detail_but {
  padding: 0.4rem 0.5rem;
}

.detail_but > p {
  border-radius: 0.1rem;
  background: #ff644c;
  padding: 0.3rem;
  color: white;
  text-align: center;
  font-size: 0.5rem;
}

.detail_list {
  padding: 0.2rem 0.5rem;
  flex-flow: row wrap;
}

.detail_list .selestyle {
  border: 1px solid #fe735e;
  background: #fee3df;
  color: #fe3532;
}

.detail_list > span {
  width: 3rem;
  padding: 0.2rem;
  font-size: 0.42rem;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 0.1rem;
  margin: 0.1rem 0.3rem;
}

.goods_information > .uls {
  width: 10rem;
  height: 2.7rem;
}

.goods_information > .uls > li:nth-child(1) {
  font-size: 0.5rem;
  color: #111;
  width: 7rem;
  padding: 0 0.2rem;
}

.goods_information > .uls > li:nth-child(2) {
  color: #a0a0a0;
  padding: 0.1rem 0.2rem;
}

.goods_information > .uls > li:nth-child(2) > p {
  font-size: 0.3rem;
  margin-right: 0.4rem;
}

.goods_information > .uls > li:nth-child(2) > img {
  width: 0.4rem;
  height: 0.4rem;
}

.goods_information > .uls > li:nth-child(2) > span {
  font-size: 0.3rem;
}

.goods_information > .uls > li:nth-child(3) {
  padding: 0 0.2rem;
  margin-top: 0.5rem;
}

.goods_information > .uls > li:nth-child(3) > p {
  font-size: 0.55rem;
  color: #ff3c39;
  margin-right: 0.4rem;
}

.goods_information > .uls > li:nth-child(3) > span {
  font-size: 0.3rem;
  color: #a0a0a0;
  text-decoration: line-through;
}
</style>
