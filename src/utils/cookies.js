
//设置cookie
export function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}

//获取cookie
// export function getCookie(name) {
//     var arr1 = document.cookie.split("; ");
//     for (var i = 0; i < arr1.length; i++) {
//         var arr2 = arr1[i].split("=");
//         if (arr2[0] == name) {
//             return arr2[1];
//         }
//     }
//     return "";
// }

export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookie
export function removeCookie(name) {
    setCookie(name, 1, -1);
}