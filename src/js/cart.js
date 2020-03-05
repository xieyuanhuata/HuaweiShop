$(function () {

  // 弹出对话框
  function n(text) {
    naranja().warn({ // 默认(log)、成功(success)、警告(warn)、危险 (error)
      title: 'message', 
      text: text, // <- required
      icon: true, // <- unrequired, default true,
      timeout: 3000, // <- unrequired, default 5000 miliseconds
      // buttons: [
      //   // {
      //   //   text: 'OK',
      //   //   click: function (e) {
      //   //     // click event close notifiaction
      //   //     // unless you use preventClose method
      //   //     e.preventClose()
      //   //     // if you want close notifiaction
      //   //     // manually, use closeNotification
      //   //     e.closeNotification()
      //   //   }
      //   // },
      //   // {
      //   //   text: '去购物车',
      //   //   click: function () {
      //   //     // make something here...
      //   //     window.location.href = '../pages/cart.html'
      //   //     // you can (but you should not)
      //   //     // add infinity buttons
      //   //   }
      //   // }
      // ]
    })
  }
  // 1. 获取数据
  const cartList = JSON.parse(localStorage.getItem('cartlist'))


  // 2. 判断有没有数据
  if (!cartList) {
    n('您的购物车是空的,快去选购吧')

    setTimeout(() => {

      window.location.href='../pages/list.html'
      
    }, 3000);


  } else {
    // 3. 渲染页面
    bindHtml()

    // 4. 添加各种事件
    bindEvent()
  }


  function bindHtml() {
    // 整体渲染页面




  }
























})