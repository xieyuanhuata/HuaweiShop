const cookie = (function () {


  // 设置cookie
  function setCookie(name, value, expires) {
    var strCookie = '';
    if (name) {
      strCookie += name + "=" + value + ";"
    }

    if (typeof (expires) == 'number') {
      var date = new Date()
      date.setTime(date.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
      strCookie += "expires=" + date + ";"
    }

    document.cookie = strCookie
  }

  // 获取所有的cookie
  function getCookieAll() {
    var obj = {};
    var strCookie = document.cookie
    var arr = setCookie.split("; ")
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split("=")
      obj[tempArr[0]] = tempArr[1]
    }
  }

  // 获取指定cookie
  function getCookie(name) {
    var obj = getCookieAll()
    return obj[name]
  }

  return {
    setCookie,
    getCookieAll,
    getCookie
  }





})()