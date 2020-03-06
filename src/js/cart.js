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
  const cartList = JSON.parse(localStorage.getItem('cartList'))

  // 2. 判断有没有数据
  if (!cartList) {
    n('您的购物车是空的,快去选购吧')

    setTimeout(() => {

      window.location.href = '../pages/list.html'

    }, 3000);
  } else {
    // 3. 渲染页面
    bindHtml()

    // 4. 添加各种事件
    bindEvent()
  }


  function bindHtml() {
    // 整体渲染页面


    // 渲染全选按钮
    let selectAll = cartList.every(item => {
      return item.isSelected === true
    })

    let str = `
     <div class="cart-title clearfix">
          <div class="checkbox fl">
            <input type="checkbox" class="allcheck" ${selectAll ? 'checked' : ''}>
            全选
          </div>
          <ul class="clearfix fl">
            <li>商品</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
          </ul>
      </div>
      `
    // 渲染每一条数据

    cartList.forEach(item => {

      str += `<div class="cart-item clearfix">
        <div class="checkbox fl">
         <input type="checkbox" data-id="${item.productId}" ${item.isSelected ? 'checked' : ''} class="selectOne">
        </div>
         <div class="cart-area fl">
            <div class="cart-pro-main clearfix">
              <img src="https://res.vmallres.com/pimages/${item.photoPath}428_428_${item.photoName}" alt="">
              <ul class="fl">
                <li>${item.skuName}</li>
                <li>¥ ${item.promoPrice === undefined ? item.price : item.promoPrice}</li>
                <li>
                  <div class="shopNum">
                    <div class="shopNum-area">
                      <input type="text" value="${item.number}" readonly>
                      <div class="shopNum-btn">
                        <a href="javascipt:void(0)" class="fl sub" data-id=${item.productId}  >-</a>
                        <a href="javascipt:void(0)" class="fr add" data-id=${item.productId}>+</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="shop-total">¥ ${item.total}</li>
                <li>
                  <a href="javascript:void(0)" class="del-shop" data-id=${item.productId}>删 除</a>
                </li>
              </ul>
            </div>
         </div>
      </div>`
    });

    // 选中的数组需要渲染
    let selectArr = cartList.filter(item => item.isSelected)

    // 选中商品数量计算
    let selectNumber = 0

    // 选中商品总价
    let selectPrice = 0

    selectArr.forEach(item => {
      selectNumber += item.number
      selectPrice += item.total
    })

    str += `<div class="cart-account clearfix"> 
        <button class="clearAll">清空购物车</button>
        <div class="right-btn">
          <a href="javascript:void(0)" class="${selectArr.length ? '' : 'disabled'}">立即结算</a>
        </div>
        <div class="totle-price">
          <p><em>总计: </em><span>¥ ${selectPrice.toFixed(2)}</span></p>
          <div class="totle-choose">
            共 <em>${selectNumber}</em> 件商品, 优惠: <span>¥ 0.00</span>
          </div>
        </div>
       </div> 
    
    `

    $('.cartList').html(str)
  }

  function bindEvent() {
    // 全选按钮的事件

    $('.cartList').on('change', '.allcheck', function () {
      // console.log(this.checked);
      cartList.forEach(item => {
        item.isSelected = this.checked
      })
      // 状态改变,重新渲染页面
      bindHtml()

      // 重新存储
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })


    // 单选按钮的事件
    $('.cartList').on('change', '.selectOne', function () {
      // console.log($(this).data('id'));
      // 知道点击的是哪一个数据的单选按钮
      const id = $(this).data('id')

      // 找到数组中 id 一样的那一条数据改变一下 isSelect 属性
      cartList.forEach(item => {
        if (item.productId === id) {
          item.isSelected = !item.isSelected
        }
      })

      // 重新渲染页面
      bindHtml()
      // 重新存储
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 减少商品的数量
    $('.cartList').on('click', '.sub', function () {
      // 找到你点击的是哪一个数据的 减少 按钮
      const id = $(this).data('id')
      cartList.forEach(item => {
        if (item.productId === id) {
          item.number > 1 ? item.number-- : ''
          item.total = item.number * (item.promoPrice === undefined ? item.price : item.promoPrice)
        }
      })

      bindHtml()

      localStorage.setItem('cartList', JSON.stringify(cartList))

    })

    // 添加商品按钮的事件
    $('.cartList').on('click', '.add', function () {
      // 拿到自己身上的id
      const id = $(this).data('id')

      cartList.forEach(item => {
        if (item.productId === id) {
          item.number++
          item.total = item.number * (item.promoPrice === undefined ? item.price : item.promoPrice)
        }
      })

      bindHtml()

      localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 点击删除的事件
    $('.cartList').on('click', '.del-shop', function () {
      // 拿到自己身上的id     
      const id = $(this).data('id')

      cartList.forEach((item, index) => {
        if (item.productId === id) {
          cartList.splice(index, 1)
        }
      })

      bindHtml()

      localStorage.setItem('cartList', JSON.stringify(cartList))

      if (cartList.length === 0) {
        $('.cart-title').css('display', 'none')
        $('.cart-account').css('display', 'none')

        n('您的购物车是空的,快去选购吧')

        setTimeout(() => {
          window.location.href = '../pages/list.html'
        }, 3000);
      }



    })

    // 清空购物车
    $('.cartList').on('click', '.clearAll', function () {
      let confirmMsg = confirm("确定清空购物车?")
      if (confirmMsg) {
        cartList.splice(0, cartList.length)
      }
      bindHtml()
      localStorage.setItem('cartList', JSON.stringify(cartList))

      $('.cart-title').css('display', 'none')
      $('.cart-account').css('display', 'none')

      n('您的购物车是空的,快去选购吧')

      setTimeout(() => {
        window.location.href = '../pages/list.html'
      }, 3000);

    })



  }





















})