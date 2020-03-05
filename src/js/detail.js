$(function () {
  // 放大镜
  var obj = new mag('.show', '.bigshow', '.smallshow', '.mask', '.bigitem');
  obj.init()


  // 1.获取 localStrorage 里面的数据
  const info = JSON.parse(localStorage.getItem('product_info'))


  // 2.判断数据是否存在
  if (!info) {
    // 不存在
    alert('您要查看的数据不存在')

    // 跳转回列表页面
    window.location.href = './list.html'

  }

  // 3.渲染页面
  bindHtml()

  function bindHtml() {
    $('.lable-tit').text(info.skuName)
    $('.product-meta > h1').text(info.skuName)
    $('.product-meta > a').text((info.promotionInfo).split('>')[0]+'>')

    let str = ''  
    info.promoPrice === undefined ?
      str += `<span class="pro-price fl"><em> ¥ </em>${info.price}</span>`
      :str += `<span class="price-lable fl">抢购价</span>
              <span class="pro-price fl"><em> ¥ </em>${info.promoPrice}</span>
              <span class="old-price fl"> ¥ ${info.price}</span>`
    $('.price').html(str)

    $('.leftImg > img').attr('src', `https://res.vmallres.com/pimages/${info.photoPath}428_428_${info.photoName}`)

    $('.bigitem > img').attr('src', `https://res.vmallres.com/pimages/${info.photoPath}428_428_${info.photoName}`)
  }


  // 4.添加购物车
  // 4-1 添加点击事件
  $('.addCart').click(() => {
    
    // 4-2 判断是否登录
    let isLogin = document.cookie
    if (isLogin === '') {
      alert('请登录 !')
      window.location.href = './login.html'
    }
    
    // 4-3 加入到购物车数组里面
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []

    // 向数组里面添加本条数据
    // 4-4 判断有没有这条数据
    // some 找到了返回 true 找不到返回 false
    let exits = cartList.some(item => {
      return item.productId === info.productId
    })

    
    if (exits) {
      console.log('有');
      
      // 表示有这个信息
      let data = null
      for (let i = 0; i < cartList.length; i++){
        if (cartList[i].productId === info.productId) {
          data = cartList[i]
          break
        }
      }

      data.number++

      // 4-5 数量添加的时候,小计价格要改变
      data.total = data.number * (data.promoPrice === undefined ? data.price : data.promoPrice)
      
      // alert(`加入购物车成功,当前商品数量: ${data.number}`)
      n(`加入购物车成功,当前商品数量: ${data.number}`)
    } else {
      // 表示没有这个信息,直接 push
      // push 之前 向里面添加一个 number 信息为 1
      info.number = 1

      info.total = (info.promoPrice === undefined ? info.price : info.promoPrice)

      info.isSelected = false //默认不选中

      cartList.push(info)
      // alert('加入购物车成功了,快去购物车看看吧!')
      n('加入购物车成功,快去看看吧!')
    }

    // 存储到 localStorage 里面
    localStorage.setItem('cartList',JSON.stringify(cartList))

  })




  function n(text) {
      naranja().success({
        title: 'message', // <- required
        text: text, // <- required
        icon: true, // <- unrequired, default true,
        timeout: 10000, // <- unrequired, default 5000 miliseconds
        buttons: [
          // {
          //   text: 'OK',
          //   click: function (e) {
          //     // click event close notifiaction
          //     // unless you use preventClose method
          //     e.preventClose()
          //     // if you want close notifiaction
          //     // manually, use closeNotification
          //     e.closeNotification()
          //   }
          // },
          {
            text: '去购物车',
            click: function () {
              // make something here...
              window.location.href='../pages/cart.html'
              // you can (but you should not)
              // add infinity buttons
            }
          }
        ]
      })
  }































})