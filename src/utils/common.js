export function mobileType() {
  const u = navigator.userAgent;
  let system = {
    isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
    isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  }
  let type = 'android'
  if (system.isAndroid) {
    type = 'android'
  } else if (system.isiOS) {
    type = 'iOS'
  } else {
    type = 'android'
  }
  return type
}
