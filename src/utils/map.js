import {
  load,
  loaded
} from './manager.js';
import {
  getCookie
} from './cookies'
export {
  load,
  loaded
}
let GoogleMap = {};
let lang = getCookie('lang')
let language = ''
if (lang === 'zh') {
  // language = 'zh-cn'
  language = 'en-us'
} else if (lang === 'en') {
  language = 'en-us'
}
GoogleMap.install = (Vue, options) => {
  load({
    version: '',
    language: language,
    apiKey: 'AIzaSyBvAsx_SoeYJ5kIUBDaMpyj92B8bvGt4Zw',
  })
}

export default GoogleMap;
