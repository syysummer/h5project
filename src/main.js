import GoogleMap from './utils/map'
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/css/common.css';
import VueI18n from 'vue-i18n';
import {
	setCookie,
	getCookie,
	removeCookie
} from './utils/cookies';
import './utils';
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import Vuelazyload from 'vue-lazyload';
import './assets/css/element.css';
import {
	Alert,
	Confirm,
	Toast
} from 'wc-messagebox'
import 'wc-messagebox/style.css'
import FastClick from 'fastclick'


// FastClick.attach(document.body);

// import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */

// Vue.prototype.$dialog = {
//     confirm: Confirm,
//     alert: Alert,
//     toast: Toast,
//     notify: Notify,
//     loading: Loading,
// };
Vue.use(GoogleMap);
const VueTouch = require('vue-touch')

Vue.use(Vuelazyload, {
	error: require('./assets/images/lazy_default.jpg'),
	loading: require('./assets/images/lazy_default.jpg'),
	preLoad: 3
})
Vue.use(VueTouch, {
	name: 'v-touch'
})
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.use(VueI18n);
Vue.use(require("vue-wechat-title"));

Vue.use(Confirm, {})

Vue.config.productionTip = false

let lang = '';
let messages = '';
let language = '';
if (getCookie("lang") == null) {

	if (navigator.appName == 'Netscape') {
		language = navigator.language;
	} else {
		language = navigator.browserLanguage;
	}
	if (language.indexOf('en') > -1) {
		setCookie('lang', 'en', 365);
	} else if (language.indexOf('zh') > -1) {
		setCookie('lang', 'zh', 365);
	} else {
		setCookie('lang', 'en', 365);
	}

	lang = getCookie("lang");
} else {
	lang = getCookie("lang");
}

switch (lang) {
	case 'zh':
		messages = require('@/assets/language/zh.json')
		break;
	case 'en':
		messages = require('@/assets/language/en.json')
		break;
}

const i18n = new VueI18n({
	locale: lang,
	messages
});

new Vue({
	el: '#app',
	i18n,
	router,
	template: '<App/>',
	components: {
		App
	}
})
