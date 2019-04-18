import Vue from 'vue';
import Toast from './toast'

Vue.use(Toast);

Vue.mixin({
  data() {
    return {
      baseUrl: 'https://img.hzxindakeji.com/'
    }
  },
  methods: {
    $formatDateTime(inputTime, type = '') {
      let date = new Date(inputTime);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      if (type == 'ymd') {
        return y + '-' + m + '-' + d;
      } else if (type == '_ymd') {
        return y + '.' + m + '.' + d;
      } else if (type == 'ymdhm') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
      } else {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      }
    },
    saveSession(key, value) {
      sessionStorage.setItem(key, value)
    },
    getSesstion(key) {
      sessionStorage.getItem(key)
    }
  }
})

// 全局指令
// Vue.directive('focus', {
//     inserted: function (el) {
//         el.focus()
//     }
// })
