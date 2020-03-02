
$(function () {


  // banner 轮播图
  var mySwiper1 = new Swiper('#banner-swiper', {

    autoplay: true,
    loop: true,
    delay: 800,
    effect: 'fade',
    fade: {
      crossFade: false,
    },
    // allowTouchMove: false,

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //鼠标覆盖停止自动切换
  mySwiper1.el.onmouseover = function () {
    mySwiper1.autoplay.stop();
  }

  //鼠标离开开始自动切换
  mySwiper1.el.onmouseout = function () {
    mySwiper1.autoplay.start();
  }

  //开启了clickable，鼠标滑过相当于点击
  for (var i = 0; i < mySwiper1.pagination.bullets.length; i++) {
    mySwiper1.pagination.bullets[i].onmouseover = function () {
      this.click();
    };
  }

  /* ------------------------------------------------ */

  // banner导航渲染
  $.ajax({
    url: '../data/banner-nav.json',
    dataType: 'json',
  }).then(function (res) {
    let str = '';

    res.forEach(item => {

      str +=
        `
        <li>
          <span>${item.tit}</span>
          <i></i>
        </li>
      `
    });
    $('.b-nav')
      .html(str)
      .on({
        mouseenter: () => $('.banner-con').stop().show(),
        mouseleave: () => $('.banner-con').stop().hide()
      })
      .children('li')
      .on('mouseenter', function () {
        const index = $(this).index()

        // 找到要渲染的数组
        const list = res[index].list
        // 渲染数据

        let str = ''
        list.forEach(item => {
          if (list.length > 5) {
            $('.banner-con').width(550)
          } else {
            $('.banner-con').width(270)
          }
          str += ` 
          <li>
            <img src="${item.img}" alt="">
            <span>${item.txt}</span>
          </li>
          `
        })
        // 填充到页面
        $('.b-con').html(str)

      })

    $('.banner-con')
      .on({
        mousemove: function () { $(this).finish().show() },
        mouseout: function () { $(this).finish().hide() }
      })
  })





})







