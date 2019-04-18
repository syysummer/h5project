<template>
	<div class="logo">
		<!--头部-->
		<!-- <common-header/> -->
		<div class="content_agree">
			<div class="header" v-if="showHead">
				<div class="back" @click="goBack">
					<img src="../assets/icons/icon_arrows_left@2x.png" alt="">
				</div>
				<div class="title" v-if="!isShow">龙外卖配送服务协议</div>
				<div class="titles" v-else>Loong-delivery service agreement</div>
			</div>
			<div :class="{context: !showHead, contexts: showHead}" v-if="!isShow">
				<div class="banben">协议版本：2018年3月27日</div>
				<h3>一、 声明</h3>
				<p>
					1、loong-delivery配送平台所提供的各项服务的所有权和运营权，均归属于湖州莘达科技有限公司；
				</p>
				<p>
					2、用户协议（以下简称"本协议"）系用户因使用配送平台的各项服务而与配送平台订立的正式的、完整的协议；
				</p>
				<p>
					3、在配送平台完成登录，即表示接受本协议的所有条件和条款。用户部分或全部不接受本协议条款的，不得使用配送平台；在使用配送平台服务时，则视为完全知晓且同意注册协议的所有条款；
				</p>
				<p>
					4、本协议内容同时包括配送平台不定期发布或更新的相关协议、奖励措施等内容，配送平台有权随时对本协议内容进行单方面的变更，并以在loong-delivery网站(loong.ph/loong/) 或者loong-delivery经营者网站（包括但不限于域名为“loong.ph/loong/”的Web站点和名称为"loong-deliveryAPP"的应用）上公告的方式提前予以公布，无需另行单独通知您。上述内容一经正式发布，即为本协议不可分割的组成部分，用户应当及时查看本协议更新内容，若有异议，可卸载APP，不再使用配送平台服务；若未有异议且继续使用配送平台服务的，视为接受本协议的更新内容。
				</p>
				<h3>二、 定义</h3>
				<p>
					1、配送平台：是包括但不限于域名为“loong.ph/loong/”的Web站点和名称为"loong-deliveryAPP"的应用的合称；
				</p>
				<p>
					2、商家：是指显示在配送平台的配送运单服务的需求方，可以通过配送平台对用户提出具体配送规范的要求并支付相应报酬的商户、消费者或其他商事主体；
				</p>
				<p>
					3、用户：是指配送平台的配送服务的提供方。本协议项下，特指已经登录或下载配送平台，并自愿申请注册，注册成功且具有独立完成配送运单之条件和资质的用户；
				</p>
				<p>
					4、配送订单：是指商家发布的，在配送平台显示的配送服务要约信息（包括但不限于商家信息、配送货物、配送地址、收货人信息及配送费用等），用户一旦通过点击或确认的方式承诺配送运单的，即视为商家与用户的配送合同生效，用户需按照商家的管理要求履行合同义务。
				</p>
				<h3>三、 服务条款的确认和接受</h3>
				<p>
					1、用户应当是具备完全民事行为能力和有责任能力的自然人、法人或法律确定的其他组织，用户注册和使用配送平台不违反任何法律或合同约定的义务。用户如有历史犯罪记录的应给到配送平台予以备案。如果不具备前述条件或资格的，经核实后，配送平台有权限制该用户的账户功能而无需事先通知用户；由此给配送平台造成损失的，用户应当赔偿配送平台的全部损失（包括但不限于赔偿金、补偿金、罚金以及诉讼费、调查费及律师费等）；
				</p>
				<p>
					2、用户注册时，应配合平台要求上传本人证明身份的真实有效的证件，并通过审核，否则将影响后续接单；提现时必须绑定与注册证件一致的银行卡，以免出现无法提现的情况。银行卡将只用于提现。用户在使用App的接单功能时，应当保证证明文件始终处于有效期内，否则一切后果由用户承担；
				</p>
				<p>
					3、用户应当保证注册时提供的信息的完整性、真实性、合法性。配送平台有权根据业务需要，随时审核用户的注册信息是否完整真实有效，一旦发现用户信息存在不真实情况的或不符合配送平台业务规则的，配送平台有权中止或限制用户的账户功能；
				</p>
				<p>
					4、用户承诺一经确认运单，即应如约完整履行。配送平台有权根据本协议约定及平台业务规则采取扣款、罚款、终止抢单资格等方式限制用户的履约瑕疵行为；
				</p>
				<p>
					5、根据业务需要，配送平台保留在国家法律允许及本协议约定的范围内，独自决定拒绝服务、中止服务、终止服务或注销用户账户的权利；
				</p>
				<p>
					6、为了保证配送平台服务的安全性和功能的一致性，配送平台有权不经向用户特别通知而对应用进行更新，对配送平台的部分功能效果进行改变或限制。新版本发布后，配送平台不保证旧版本继续可用及相应的客户服务，用户应随时核对并下载最新版本。
				</p>
				<h3>四、 服务说明</h3>
				<p>
					1、配送平台提供的服务为：主要通过信息发布以及信息推送的方式向商户及用户提供居间服务。同时为用户及商家提供配送信息管理、配送信息浏览与查询、配送交易撮合与处理、配送运单查询与管理、配送费用代收代付、根据商家提供的管理规定对用户提出配送具体要求（如形象、食物包装、配送时间、餐具提供）等互联网信息服务和在线交易处理服务；
				</p>
				<p>
					2、尽管配送平台尽力保证服务的有效性和可用性，但因电信故障、黑客攻击或政策变动等不可抗力因素，可能导致前述服务部分或全部无效或调整，用户理解并接受该等情形的出现，并放弃因此向配送平台索赔的权利；
				</p>
				<p>
					3、用户必须自行准备如下服务设备，并承担相关服务开支：
				</p>
				<p>
					（1）服务设备：包括并不限于手机、电脑或者其他移动终端、调制解调器及其他必备的上网装置等；
				</p>
				<p>
					（2）服务开支：包括并不限于网络接入费、上网设备租用费、网络流量费、结算手续费，以及履行配送服务过程可能发生的其他费用等；
				</p>
				<p>
					4、用户同意授权配送平台自商家处代为收取配送费用及商家提供的活动补贴、红包款项等（如有）。配送费用的结算方式及结算周期根据配送平台届时有效的规则执行。因用户提供无效的、错误的、不完整的结算账户信息导致的结算延迟、错误等责任由用户自行承担。用户同意并理解，因履行配送服务而获取的收益，应当根据法律规定自行承担相关税费，商家可能根据税法要求代扣代缴相关税费，配送平台可能在税务局要求下代扣代缴相关税费（如有）；
				</p>
				<p>
					5、用户使用配送平台服务而需要下载相关客户端程序时，配送平台给予用户一项单个的、不可转让及非排他性的许可。用户仅在使用商家平台服务时使用相关客户端程序，不进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现相关客户端程序的源代码；不得删除相关客户端程序及其副本上关于著作权的信息。用户终止使用商家平台服务时，应当立即删除相关客户端程序及其数据；
				</p>
				<p>
					6、本条及本协议其他条款未明示授权的其他一切权利仍由配送平台保留，用户在行使这些权利时须提前取得配送平台的书面许可。配送平台未行使前述任何权利的，并不构成对该权利的放弃。
				</p>
				<h3>五、 账户管理</h3>
				<p>
					1、用户账户的所有权归配送平台所有，用户完成申请注册手续后，仅获得用户帐号的使用权，且该使用权仅属于初始申请注册人，申请注册人应对该用户账号行为负责；
				</p>
				<p>
					2、用户注册成功后，将生成由用说户自行设置的用户名和密码等账户信息。用户可以根据配送平台的业务规则改变密码。用户应谨慎合理的保存、使用其用户名和密码，并对利用用户的用户名和密码完成管理权限验证而实施的所有行为、活动及事件负全责。用户若发现任何不当使用用户账号或存在安全漏洞等其他可能危及用户账户安全的情况，应当立即以有效方式通知配送平台，要求配送平台暂停相关服务，并根据平台的要求，协助平台向公安机关报案；
				</p>
				<p>
					3、用户依据本条第二款发出的通知至少应当包括情况描述，相关的初步证据，要求配送平台处理措施，通知人联系信息等，缺乏前述信息的通知视为无效通知。用户理解配送平台对用户的通知请求识别、采取行动需要合理时间，配送平台对在采取行动前已经产生的后果（包括但不限于用户的任何损失）及非因配送平台原因产生的后果不承担任何责任；
				</p>
				<p>
					4、用户不得将账户借/租给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。一经发现，配送平台有权终止用户账户使用功能；
				</p>
				<p>
					5、用户理解并同意，配送平台有权使用用户的注册信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证等；同时，为了更好的为用户提供服务，配送平台及其关联方可以无偿的、商业性的分析和使用用户注册信息及使用数据；
				</p>
				<p>
					6、用户注册帐号后如果长期不登录该帐号，配送平台有权回收、注销该帐号或设定账户功能限制，以免造成资源浪费，由此带来的任何损失均由用户自行承担；
				</p>
				<p>
					7、用户理解并同意，配送平台通过向用户注册时预留的地址、电话、邮箱等任一方式发送信息，或者通过配送平台发送站内信息，即视为配送平台向用户履行了送达、通知义务；所有违反协议约定或者loong-delivery平台规则的行为，平台都有权根据违规情节和性质进行相应的处理，直至封禁账号（拉黑）处理，违规情节和性质由平台依据相关法律或平台规则或双方事先约定最终确定。平台不可能事先列举所有违规事项和处理措施，对未事先列举的，由平台依据诚实信用原则或公序良俗原则予以确定。被封禁（拉黑）的账号内剩余的所有资产都将作为违约金或损害赔偿给到平台或由平台转赔偿真正的受损害方。
				</p>
				<h3>六、 责任范围和责任限制</h3>
				<p>
					1、用户理解并同意，用户提供的配送服务的合同相对方是商家，合同履行的瑕疵担保及付款责任（包括但不限于配送费用、活动补贴及红包款项等）应当由商家根据约定内容承担，作为交易信息平台的配送平台，与商家是独立的商事主体，不为商家承担任何担保或连带责任；
				</p>
				<p>
					2、用户在履行配送服务之前，应当自行审核商家的真实性及履约能力，应当要求商家明示配送货物的性质和品类，以及货物接收人的信息，作为交易信息平台的配送平台，不承担任何担保或连带责任。特别地，配送平台作为交易信息平台，无法控制每一配送运单所涉及的物品的质量、安全或合法性，以及配送交易的真实性或准确性。用户因完成配送服务而遭受人身损害、财产损害的，或造成第三方人身损害、财产损害的，应当依法向责任主体追究法律责任，配送平台不承担任何责任；
				</p>
				<p>
					3、用户在收取帮送业务配送的快件时，必须验视内件物品是否符合法律、行政法规以及国务院和国务院有关部门关于禁止寄递或者限制寄递物品的规定（具体参照国家邮政局、公安部、国家安全部共同发布的《禁止寄递物品管理规定》）及《帮买帮送服务用户协议》相关禁止性条款,以避免快件发生导致用户或第三方人员和财产损害的情形（例如爆炸物、硫酸、其他有毒有害物质等），否则，由此造成的相关损失均由用户负责承担。用户收取快件后，应对服务对象委托配送的快件妥善保管，如快件丢失、破损，用户应按照物品声明或实际价值，承担相应赔偿责任。
				</p>
				<p>
					4、用户进行配送时应遵守法律法规，包括道路交通安全法。若用户于配送过程中，因自身或他人原因造成的一切人身与财产损失，将由用户个人承担，用户确认并同意配送平台不承担责任和赔偿义务。另外，众包配送员使用的交通工具必须符合国家法律法规规定，且必须符合相应的准驾规则；
				</p>
				<p>
					5、用户与商家达成配送运单信息以外的线下交易或条件（例如代收货款、附条件配送等）的，用户应当自行保留相应的证据，并在各自责任范围内承担相应的法律责任。任何时候，用户禁止承揽配送下列货物;
				</p>
				<p>
					（1）国家法律法规禁止配送的；
				</p>
				<p>
					（2）国家法律法规要求特殊资质或条件配送的。
				</p>
				<p>
					用户一旦发现以上情况的，用户应拒绝承揽配送并向配送平台报告，若用户仍承揽该配送货物的，用户承担因此产生的所有法律责任，若造成配送平台损失的，用户应赔偿配送平台全部损失；
				</p>
				<p>
					6、有且仅当法律法规明确要求，或出现以下情况，配送平台才对商家及用户注册信息、配送运单信息进行事先或事后的审查：
				</p>
				<p>
					（1）应商家或用户要求的，且有合理的理由认为特定商家、用户或交易可能存在重大违法或违约情形。
				</p>
				<p>
					（2）应商家或用户要求的，且有合理的理由认为商家、用户在配送平台的行为涉嫌违法或不当。
				</p>
				<p>
					用户理解并同意并积极配合配送平台审查行为，配送平台可自行决定审查终结时间，审查终结前，配送平台可按相关规则对用户、用户账号、数据进行审查，包括但不限于暂扣、冻结款项等；
				</p>
				<p>
					7、用户理解并同意，依据法律或本协议有明确的赔偿义务的前提下，配送平台的赔偿限额为单笔配送运单的配送费，且不对因下述情况而导致的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿；
				</p>
				<p>
					（1）使用或未能使用配送平台的服务；
				</p>
				<p>
					（2）第三方未经批准地使用或更改用户的数据；
				</p>
				<p>
					（3）通过配送平台的服务购买或获取任何商品、样品、数据、信息等行为或替代行为产生的费用及损失；
				</p>
				<p>
					（4）用户对配送平台的服务的误解；
				</p>
				<p>
					（5）任何非因配送平台的过错原因而引起的与配送平台的服务有关的其它损失。
				</p>
				<p>
					8、如因不可抗力或其他配送平台无法控制的原因使配送平台系统崩溃或无法正常使用，从而导致配送交易无法完成或丢失有关的信息、记录等，配送平台不承担责任。配送平台会尽可能合理地协助处理善后事宜，并努力使用户免受或减少经济损失；
				</p>
				<p>
					9、用户同意在发现配送平台任何内容不符合法律规定，或不符合本协议规定的，有义务及时通知配送平台。如果用户发现合法权利受到侵害，请将此情况告知配送平台并同时提供如下信息和材料：
				</p>
				<p>
					（1）侵犯用户权利的信息的网址，编号或其他可以找到该信息的细节；
				</p>
				<p>
					（2）用户的联系方式，包括联系人姓名，地址，电话号码和电子邮件；
				</p>
				<p>
					（3）用户的身份证复印件、营业执照等其他相关资料；
				</p>
				<p>
					（4）配送平台要求提供的其他相关材料。
				</p>
				<p>
					经审查得到证实的，配送平台将及时删除相关信息。配送平台仅接受邮寄、电子邮件或传真方式的书面侵权通知，并会视情况采取相应措施；
				</p>
				<p>
					10、用户应当严格遵守本协议及配送平台发布的其他协议、活动规则，因用户违反协议或规则的行为给第三方或配送平台造成损失的，用户应当承担全部责任，配送平台因此承担损失的，有权向用户追偿；
				</p>
				<p>
					11、用户理解并同意，配送平台可能会与第三方合作向用户提供相关的服务（包括但不限于广告服务、支付服务、寻址定位服务等），在此情况下，配送平台不保证该第三方提供的服务的可用性、有效性和合法性；
				</p>
				<p>
					12、用户与配送平台并非劳动、劳务、雇佣关系。用户履行配送服务获取的配送费用及商家提供的活动补贴、红包款项等均由商家提供，用户理解并授权配送平台自商家处代为收取上述款项。任何时候，用户自配送平台收到的收益（若有），系商家向用户支付的劳务报酬，不应当视为配送平台向用户支付的工资、薪金及劳务报酬或类似收入。用户应当自行或通过配送平台购买商业保险，并自行承担履行配送义务过程中的意外事故或责任事故的责任及损失；
				</p>
				<p>
					13、配送平台在本协议中仅为用户和商家提供达成双方配送业务的居间服务，除本协议约定应由配送平台承担的义务外，用户与商家达成的具体配送业务及配送过程中产生的全部权利义务，包括但不限于保证产品质量、及时配送等，由双方自行承担，与配送平台无关。如因双方合作义务履行不当给配送平台造成任何损失的，配送平台有权向责任人追偿；
				</p>
				<p>
					14、本平台将保留因用户违反法律法规而导致商户与用户利益损失的追诉权。同时，因用户违反法律法规造成严重损失或恶劣社会影响的，对配送平台造成损失的，配送平台有权向用户追偿。
				</p>
				<h3>七、 知识产权</h3>
				<p>
					1、配送平台各项信息服务及其载体，以及交易处理数据的所有权和运营权归配送平台，配送平台得依自身义务需要采取任何商业性利用或开发；
				</p>
				<p>
					2、配送平台服务内容包括：文字、软件、声音、图片、录像、图表、广告中的全部内容；电子邮件的全部内容；配送平台为用户提供的其他信息。所有这些内容受版权、商标、标签和其它财产权法律的保护。所以，用户只能在配送平台和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。配送平台所有的文章版权归原文作者和配送平台共同所有，任何人需要转载该等文章或信息，必须征得原文作者或配送平台授权；
				</p>
				<p>
					3、用户接受本协议条款，即表明该用户将其在配送平台发表的任何形式的信息的著作权或其他合法权利，包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给配送平台所有，同时表明该用户许可配送平台有权就任何主体侵权而单独提起诉讼，并获得全部赔偿。本协议效力及于用户在配送平台发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。同时，配送平台保留删除站内各类不符合规定的信息而不通知用户的权利。
				</p>
				<h3>八、 法律管辖和适用</h3>
				<p>
					1、本条款的订立、执行和解释及争议的解决均应适用各国法律；
				</p>
				<p>
					2、如双方就本条款内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向上海市普陀区人民法院提起诉讼；
				</p>
				<p>
					3、本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据；
				</p>
				<p>
					4、本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
				</p>
			</div>
			<div :class="{context: !showHead, contexts: showHead}" v-else>
				<div class="banben">Protocol version: March 27, 2018</div>
				<h3>I. &nbsp;Statement</h3>
				<p>
					1. &nbsp;Loong Delivery Platform ownership and operation rights of the services provided are attribute to HuZhou ShenDa Technology Limited.
				</p>
				<p>
					2. &nbsp;User agreement (Referred to as “This Agreement”) A formal and complete agreement with the delivery platform for the use of various services of the delivery platform, Complete protocol.
				</p>
				<p>
					3. &nbsp;When the delivery platform completes the login, the acceptance of all the terms and conditions of this agreement. Users who do not accept the terms of this agreement in part or in whole shall not use the delivery platform; When using the delivery platform service, they are deemed fully aware and agree to all the terms of the registration agreement.
				</p>
				<p>
					4. &nbsp;The content of this agreement also includes the delivery platform to publish or update the relevant agreements, incentive measures, etc., the delivery platform has the right to make unilateral changes to the content of this agreement at any time, and in the Loong-delivery website (loong.ph/loong/) or the Loong-delivery operator website (including but not limited to the domain name "loong.ph/loong/" Web site and the name is "Loong-delivery app" the application) announces the way in advance to announce, does not need to separate inform you separately. Once the above content is officially released, that is an integral part of this agreement, the user should check the updated content of this agreement in time, if there is any objection, can uninstall app, no longer use the delivery platform service, if there is no objection and continue to use the delivery platform service, consider acceptance of this agreement update.
				</p>
				<h3>II. &nbsp;Definition</h3>
				<p>
					1. &nbsp;Delivery platform: is including but not limited to the domain name "loong.ph/loong/" the Web site and the name is "Loong-delivery app" the application of collectively.
				</p>
				<p>
					2. &nbsp;Merchant: Refers to the delivery platform in the delivery of the delivery of the demand side, you can through the delivery platform to the user to propose specific delivery requirements and pay the corresponding remuneration of the merchant, consumer or other commercial subjects;
				</p>
				<p>
					3. &nbsp;User: Refers to the delivery platform of the delivery service provider. This agreement has been registered or downloaded delivery platform, and voluntarily applied for registration, registered successfully and have an independent delivery of the conditions and the quality of the consignment of users.
				</p>
				<p>
					4. &nbsp;Delivery order: Refers to the merchant release, in the delivery platform display of delivery services offer information (including but not limited to merchant information, delivery of goods, delivery address, consignee information and delivery costs, etc.), once the user by clicking or confirming the manner of commitment to delivery waybill, that is, the merchant and the user's delivery contract to enter into force, The user must fulfill the contract duty according to the Merchant's management request.
				</p>
				<h3>III. &nbsp;Confirmation and acceptance of the terms of service</h3>
				<p>
					1. &nbsp;The user shall be a natural person, legal person or other organization determined by law with full civil capacity and responsibility, and the user may register and use the delivery platform without violating any legal or contractual obligations. Users who have historical criminal records should be given to the delivery platform for the record. If the foregoing conditions or qualifications are not available, after verification, the delivery platform has the right to limit the user's account function without prior notice to the user, the loss of the delivery platform, the user should compensate for all the loss of the delivery platform (including but not limited to compensation, compensation, fines and litigation costs, investigation fees and legal fees, etc.);
				</p>
				<p>
					2. &nbsp;When the user registers, should cooperate with the platform request to upload oneself to prove the identity the real valid document, and passes the examination, otherwise will affect the follow-up order; The present must bind the bank card which is consistent with the registration document, in order to avoid the situation which cannot be mentioned. The bank card will only be used for the present. Users in the use of the app's access list function, should ensure that the document is always in the validity period, otherwise all the consequences of the user to bear;
				</p>
				<p>
					3. &nbsp;The user shall ensure the integrity, authenticity and legality of the information provided at the time of registration. The delivery platform has the right to audit the registration information of the user at any time according to the merchant needs, if the user information is found to be untrue or does not conform to the delivery platform merchant rules, the delivery platform has the right to suspend or restrict the user's account function;
				</p>
				<p>
					4. &nbsp;User commitment to confirm the waybill, that is, the full performance. The delivery platform shall be entitled to restrict the performance defects of the users in accordance with the stipulations of this agreement and the Platform merchant rules, such as deduction, fines, termination of robbery, etc.
				</p>
				<p>
					5. &nbsp;According to merchant needs, the delivery platform reserves the right to refuse the service, discontinue the service, terminate the service or cancel the user's account in accordance with the law of the country and the scope of this Agreement;
				</p>
				<p>
					6. &nbsp;In order to ensure the security and function consistency of the delivery platform service, the delivery platform has the right to update the application without special notice to the user, and to change or restrict the function effect of the delivery platform. After the release of the new version, the delivery platform does not guarantee that the old version continues to be available and the corresponding customer service, users should check and download the latest version at any time.
				</p>
				<h3>IV. &nbsp;Service Description</h3>
				<p>
					1. &nbsp;Delivery platform provides services for: mainly through the dissemination of information and information to provide intermediary services to merchants and users. At the same time for users and merchants to provide delivery information management, delivery information browsing and inquiries, delivery transactions and processing, delivery waybill inquiries and management, delivery costs on behalf of the collection, according to the management regulations provided to users to provide specific requirements for delivery (such as image, food packaging, delivery time, Tableware provided) and other Internet Information services and online transaction processing services;
				</p>
				<p>
					2. &nbsp;Although the delivery platform to ensure the effectiveness and availability of services, but due to telecommunications failures, hacker attacks or policy changes, such as force majeure factors, may lead to the aforementioned services or all of the invalidity or adjustment, the user understand and accept the appearance of the situation, and give up the right to claim the delivery platform;
				</p>
				<p>
					3. &nbsp;The user must prepare the following service equipment and bear the related service expenses:
				</p>
				<p>
					(a) Service equipment: Including not limited to mobile phones, computers or other mobile terminals, modems and other necessary internet devices;
				</p>
				<p>
					(b) Service expenses: Including not limited to network access fee, Internet equipment leasing fee, network traffic fee, clearing handling fee, and other expenses that may occur in the process of delivering the delivery service.
				</p>
				<p>
					4. &nbsp;The user agrees to authorize the delivery platform from the merchant place to collect the delivery fee and the activity subsidy provided by the merchant, and the money of the red envelopes (if any). The billing method and the settlement period of the delivery cost are executed according to the effective rules of the delivery platform. Due to the user to provide invalid, wrong, incomplete settlement account information resulting in settlement delays, errors and other responsibilities by the user at their own responsibility. The user agrees and understands that the proceeds derived from the performance of the delivery service shall be subject to the relevant taxes and charges as stipulated by the law, and that the merchant may, in accordance with the requirements of the tax law, withhold the relevant taxes and charges, and the delivery platform may request the relevant taxes and charges in the Inland Revenue Department.
				</p>
				<p>
					5. &nbsp;When users use the delivery platform service and need to download the relevant client program, the delivery platform gives the user a single, non-transferable and Non-exclusive license. Users use the Vendor platform service only when using the relevant client program, do not reverse engineer, reverse compile, reverse compile, or otherwise try to discover the relevant client program source code, not to delete the relevant client program and its copy on the copyright information. When the user terminates using the Merchant Platform service, the relevant client program and its data should be deleted immediately;
				</p>
				<p>
					6. &nbsp;This article and other provisions of this Agreement are not expressly authorized by all other rights are still retained by the delivery platform, users in the exercise of these rights in advance to obtain the delivery platform in writing permission. If the delivery platform does not exercise any of the foregoing rights, it does not constitute a waiver of the right.
				</p>
				<h3>V. &nbsp;Account Management</h3>
				<p>
					1. &nbsp;The ownership of the user account is owned by the delivery platform, after the user completes the registration procedure, only obtains the use right of the user account, and the right to use only belongs to the initial application registrant, the application registrant should be responsible for the user account behavior;
				</p>
				<p>
					2. &nbsp;After the user registers successfully, will generate the user name and the password and so on account information which is set by the said household. Users can change passwords according to the merchant rules of the delivery platform. The user should carefully and reasonably save, use their username and password, and take full responsibility for all the actions, activities and events implemented by using User's username and password to complete the authentication of administrative authority. If users find any improper use of user accounts or other security vulnerabilities, such as the security of the user account, should immediately notify the delivery platform in an effective manner, request the delivery platform to suspend the relevant services, and in accordance with the requirements of the platform to assist the platform to report to the public security organs;
				</p>
				<p>
					3. &nbsp;The notice given by the user pursuant to the second paragraph of this article shall include at least the description of the situation, the relevant preliminary evidence, the handling measures of the delivery platform, the contact information of the notifying person, etc. The user understands the delivery platform to the user's notice request identification, takes the action to need the reasonable time, the delivery platform has the consequence which has already produced before the action (including but is not limited to the user's any loss) and does not undertake any responsibility for the consequence which the delivery platform causes;
				</p>
				<p>
					4. &nbsp;The user may not borrow/rent the account for others to use, otherwise the user should assume the entire responsibility which arises therefrom and bears the joint and several responsibility with the actual user. Once discovered, the delivery platform has the right to terminate the user account use function;
				</p>
				<p>
					5. &nbsp;Users understand and agree that the delivery platform has the right to use the user's registration information, login to enter the user's registered account, to carry out evidence preservation, including but not limited to notarization, witness, etc. at the same time, in order to better provide users with services, delivery platform and its related parties can be free, commercial analysis and use of user registration information and use of data;
				</p>
				<p>
					6. &nbsp;If the user registers the account number after long time does not sign in this account, the delivery platform reserves the right to reclaim, the cancellation this account or sets up the account function limit, lest causes the resource waste, thus causes any loss all by the user to undertake;
				</p>
				<p>
					7. &nbsp;Users understand and agree that the delivery platform by the user to register the address, telephone, mailbox and other means of sending information, or through the delivery platform to send information in the station, that is, the delivery platform to the user to fulfill the service, notification obligations; All violations of the Protocol Agreement or Loong-delivery platform rules, The platform has the right according to the violation plot and the nature carries on the corresponding processing, until the ban account (Rahe) processing, the violation plot and the nature by the platform according to the relevant law or the platform rule or the two parties beforehand agreed to finalize. It is not possible to enumerate all the irregularities and measures in advance, and to determine the principles of the Platform based on the principle of good faith or common order. All remaining assets in the banned (Rahe) account will be given to the platform or the platform to compensate the real injured party as liquidated damages or damages.
				</p>
				<h3>VI. &nbsp;Scope of responsibility and limitation of liability</h3>
				<p>
					1. &nbsp;The user understands and agrees that the contract of the delivery service provided by the user is the merchant, the defective guarantee and payment liability of the contract (including but not limited to the delivery fee, activity subsidy and red envelope payment) shall be borne by the merchant according to the agreed content, as the delivery platform of the trading information platform, and the merchant is the independent commercial subject, does not undertake any warranty or joint liability for the merchant;
				</p>
				<p>
					2. &nbsp;Before performing the delivery service, the user shall audit the authenticity and performance ability of the merchant and shall require the merchant to express the nature and category of the goods, as well as the information of the recipient of the goods, as the delivery platform of the trading information platform, and not undertake any guarantee or joint liability. The delivery platform, as a trading information platform, cannot control the quality, safety or legality of the items involved in each delivery waybill, as well as the authenticity or accuracy of the delivery transactions. If a user suffers personal injury or property damage or causes a third party's personal injury or property damage due to the completion of the delivery service, the liability subject shall be investigated by law and the delivery platform will not bear any responsibility;
				</p>
				<p>
					3. &nbsp;When the user collects the Express mail for the delivery of the service, it must inspect whether the articles in accordance with the laws, administrative regulations and the relevant departments of the State Council and the State Council on the prohibition of delivering or restricting delivering articles (specific reference to the State Post Office, the Ministry of Public Security, the Ministry of National Law issued To help buy the service user agreement related to the prohibition of the provisions to avoid the shipment of users or third party personnel and property damage cases (such as explosives, sulfuric acid, other toxic and harmful substances, etc.), otherwise, the resulting losses are the responsibility of the user. After the user receives the Express mail, should the service object entrust the delivery the express safekeeping, if the express shipment is lost, the breakage, the user should undertake the corresponding compensation responsibility according to the item declaration or the actual value.
				</p>
				<p>
					4. &nbsp;Users should comply with laws and regulations, including road traffic safety law, when distributing. If the user in the delivery process, because of their own or other reasons caused by personal and property losses, will be the user's personal commitment, the user confirmed and agreed that the delivery platform does not assume responsibility and compensation obligations. In addition, the public transport staff to use the transportation must comply with national laws and regulations, and must comply with the appropriate driving rules;
				</p>
				<p>
					5. &nbsp;The user and the merchant to reach the delivery Waybill information outside the offline transaction or the condition (for example collect money, the conditional delivery and so on), the user should retain the corresponding evidence, and undertakes the corresponding legal responsibility within the respective responsibility scope. Any time, the user prohibits forwarders to distribute the following goods;
				</p>
				<p>
					(1) National laws and regulations prohibit delivery;
				</p>
				<p>
					(2) National laws and regulations require special qualifications or conditions of delivery.
				</p>
				<p>
					Once the user found the above situation, the user should refuse forwarding and delivery to the delivery platform report, if the user still forwarders the delivery of goods, users bear all the legal liability, if the loss of delivery platform, users should compensate for the delivery platform of all losses.
				</p>
				<p>
					6. &nbsp;There is and only when the laws and regulations clearly required, or the following conditions, the delivery platform to the merchant and user registration information, delivery waybill information for prior or ex post review:
				</p>
				<p>
					(a) A merchant or user is required, and there are reasonable reasons to believe that a merchant, user or transaction may have significant violations or breaches of circumstances.
				</p>
				<p>
					(b) The merchant or the user requests, and has the reasonable reason to think the merchant, the user in the delivery platform behavior is suspected to be illegal or improper.
				</p>
				<p>
					Users understand and agree and actively cooperate with the delivery platform audit behavior, delivery platform can decide to review the end of time, before the end of the review, delivery platform can be according to the relevant rules of users, user accounts, data review, including but not limited to temporary deduction, frozen money, etc.
				</p>
				<p>
					7. &nbsp;The user understands and agrees that, in accordance with the law or this Agreement has a clear obligation of compensation, under the premise of the delivery platform's compensation limit is the single delivery Waybill's delivery fee, and does not accept the liability for any damage compensation, including but not limited to the profit, goodwill, use, data, etc. loss or other intangible loss damages
				</p>
				<p>
					(a) Services that use or fail to use the delivery platform
				</p>
				<p>
					(b) unauthorized use or alteration of the user's data by a third party;
				</p>
				<p>
					(c) to purchase or acquire any goods, samples, data, information and other acts or the costs and losses arising from the service of the delivery platform;
				</p>
				<p>
					(d) The user to the delivery platform service misunderstanding;
				</p>
				<p>
					(e) Any other loss related to the service of the delivery platform due to the fault of the delivery platform.
				</p>
				<p>
					8. &nbsp;If due to force majeure or other delivery platform cannot control the delivery platform system crashes or cannot be used normally, resulting in delivery transactions cannot be completed or lost information, records, etc., delivery platform is not responsible. The delivery platform assists in handling the aftermath as reasonably as possible, and strives to protect users from or reduce economic losses;
				</p>
				<p>
					9. &nbsp;The user agrees to notify the delivery platform in a timely manner if any content of the delivery platform is found to be inconsistent with the provisions of the law or does not conform to the provisions of this Agreement. If the user finds that the legal rights are violated, please inform the delivery platform and provide the following information and materials:
				</p>
				<p>
					(a) The URL of the information that infringes the user's rights, the number or other details that can be found;
				</p>
				<p>
					(b) The contact method of the user, including the contact name, address, telephone number and email;
				</p>
				<p>
					(c) The user's ID card copy, merchant license and other related information;
				</p>
				<p>
					(d) Other related materials required by the delivery platform. The delivery platform will promptly delete the relevant information, as confirmed by the review. The delivery platform only accepts written notice of infringement by mail, e-mail or facsimile, and takes corresponding measures as appropriate.
				</p>
				<p>
					10. &nbsp;Users should strictly abide by this agreement and the delivery platform issued by other agreements, rules of activity, because the user violates the agreement or rules of conduct to the third party or the delivery platform caused losses, the user should bear all the responsibility, delivery platform to bear the loss, the right to recover from the user;
				</p>
				<p>
					11. &nbsp;Users understand and agree that the delivery platform may cooperate with third parties to provide relevant services to users (including but not limited to advertising services, payment services, addressing positioning services, etc.), in which case, the delivery platform does not guarantee the availability, effectiveness and legality of the services provided by the third party;
				</p>
				<p>
					12. &nbsp;User and delivery platform is not labor, labor, employment relations. The user fulfills the delivery service to obtain the delivery expense and the merchant to provide the activity subsidy, the red envelope money and so on is provided by the merchant, the user understands and authorizes the delivery platform from the merchant place to collect the above money. At any time, the income received by the user from the delivery platform (if any), the service payment paid by the merchant to the user shall not be regarded as the salary, salary and service remuneration or similar income paid by the delivery platform to the user. The user should purchase the commercial insurance by oneself or through the delivery platform and bear the responsibility and loss of the accident or accident in the process of fulfilling the delivery obligation.
				</p>
				<p>
					13. &nbsp;Delivery platform in this agreement only for users and merchants to reach both sides of the delivery merchant intermediary services, in addition to the obligations stipulated in this Agreement by the delivery platform, the user and the merchant to achieve the specific delivery merchant and delivery process arising from the full rights and obligations, including but not limited to ensure product quality, timely delivery, and so on, by both sides to bear, Independent of the delivery platform. The delivery platform shall be entitled to recover from the responsible person if any damage is caused to the delivery platform due to the non-performance of the cooperation obligations of both parties;
				</p>
				<p>
					14. &nbsp;This platform will reserve the right of prosecution for the loss of merchant and user's interest due to user violating laws and regulations. At the same time, because users violate laws and regulations caused serious loss or bad social impact, the delivery platform caused losses, the delivery platform has the right to recover from the user.
				</p>
				<h3>VII. &nbsp;Intellectual property</h3>
				<p>
					1. &nbsp;Delivery platform Information services and their carriers, as well as transaction processing data ownership and operation of the right to the delivery platform, delivery platform according to their own obligations to take any commercial use or development;
				</p>
				<p>
					2. &nbsp;Delivery platform services include: text, software, sound, pictures, video, graphics, advertising all the content of the entire content of the e-mail, the delivery platform to provide users with additional information. All such content is protected by copyright, trademarks, labels and other laws of property rights. Therefore, users can only use these content under the authorization of delivery platform and advertiser, and cannot reproduce, recreate these contents, or create derivative products related to content. Delivery platform all the articles copyright belongs to the original author and delivery platform in common, anyone needs to reprint such articles or information, must obtain the original author or delivery platform authorization;
				</p>
				<p>
					3. &nbsp;The user accepts the terms of this agreement, that is, the copyright or other legal right of any form of information published by the user on the delivery platform, includes not limited to: reproduction rights, delivery rights, rental rights, exhibition rights, performance rights, screening rights, broadcasting rights, information network dissemination rights, filming rights, adaptation rights, translation rights, The right to assemble and other transferable rights that should be enjoyed by the copyright owner shall be transferred to the delivery platform free of charge, and the licensed delivery platform of the user is entitled to sue separately for any subject infringement and obtain full compensation. The validity of this agreement and the content of any works protected by copyright law issued by the user on the delivery platform, whether the content is formed before or after the signing of this agreement. At the same time, the delivery platform reserves the right to delete all kinds of information without informing the user.
				</p>
				<h3>VIII. &nbsp;Legal jurisdiction and application</h3>
				<p>
					1. &nbsp;The enactment, execution and interpretation of these articles and the settlement of disputes shall be governed by the laws of States;
				</p>
				<p>
					2. &nbsp;If there is any dispute between the parties in respect of the contents of this article or its execution, the Parties shall endeavor to resolve the issue amicably, and any party may bring a lawsuit to the Court;
				</p>
				<p>
					3. &nbsp;The title of all the terms of this agreement is only convenient for reading and has no actual meaning and cannot be used as the basis for interpreting the meaning of this Agreement;
				</p>
				<p>
					4. &nbsp;The terms of this Agreement shall be valid and binding on both parties for any reason partly void or enforceable.
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import { getCookie, setCookie } from '../utils/cookies.js'
export default {
  name: 'service_agreement',
  data() {
    return {
      isShow: false,
      lang: '',
      showHead: false
      // has_back: true,
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
        this.isShow = true
      } else {
        this.isShow = false
      }
    })
  },
  mounted() {
    let local = this.$route.query.local
    if (local == 0) {
      this.showHead = true
    } else {
      this.showHead = false
    }
    // if (history.length == 1) {
    //     this.has_back = false;
    // } else {
    //     this.has_back = true;
    // }
    // let lang = getCookie("lang");
    // if (lang == "en") {
    //   this.isShow = true;
    // } else {
    //   this.isShow = false;
    // }
    // window.scroll(0, 0);
  },
  methods: {
    goBack() {
      // this.$router.go(-1);
      window.history.back()
    }
  }
}
</script>
<style scoped lang="scss">
.logo {
  // position: relative;
  height: 100%;
  overflow-y: auto;
  .header {
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    background: #fff8ed;
    position: fixed;
    top: 0;
    .back {
      display: inline-block;
      position: absolute;
      top: 32%;
      left: 10px;
      img {
        width: 11px;
      }
    }
    .title {
      font-size: 20px;
      margin-left: 10px;
      display: inline-block;
    }
    .titles {
      font-size: 16px;
      margin-left: 10px;
      display: inline-block;
    }
  }
  .content_agree {
    background: #fff;
    // padding: 0.5rem;
    font-size: 14px;
    display: flex;
    .context {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      padding: 0.5rem;
      position: fixed;
      top: 0;
      height: 100%;
      width: 100%;
      background: #fff;
      overflow-y: auto;
      clear: both;
      font-size: 12px;
      flex: 1;
      .banben {
        width: 100%;
        color: #666;
        font-size: 14px;
        margin-bottom: 5px;
        text-align: center;
      }
      p {
        width: 100%;
        float: left;
        font-size: 12px;
      }
      span {
        font-size: 12px;
      }
    }
    .contexts {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      padding: 0.5rem;
      position: fixed;
      top: 7%;
      height: 93%;
      width: 100%;
      background: #fff;
      overflow-y: auto;
      clear: both;
      font-size: 12px;
      flex: 1;
      .banben {
        width: 100%;
        color: #666;
        font-size: 14px;
        margin-bottom: 5px;
        text-align: center;
      }
      p {
        width: 100%;
        float: left;
        font-size: 12px;
      }
      span {
        font-size: 12px;
      }
    }
    h3 {
      color: #d69d00;
    }
  }
  .footer {
    text-align: center;
    position: absolute;
    bottom: 1rem;
    left: 3.3rem;
    font-size: 14px;
    color: #717070;
  }
}
@media screen and (max-width: 329px) {
  .logo {
    .header {
      .titles {
        font-size: 14px;
      }
    }
  }
}
</style>
