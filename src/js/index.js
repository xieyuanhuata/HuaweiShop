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
    allowTouchMove: false,


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
        mousemove: function () {
          $(this).finish().show()
        },
        mouseout: function () {
          $(this).finish().hide()
        }
      })
  })

  /* -------------------------------------------------------------- */

  // 热销单品页面渲染
  $.ajax({
    url: '../data/hot-sale-products.json',
    dataType: 'json'
  }).then(function (res) {
    let str = ''
    res.forEach(item => {

      str += `<li class="grid-item">
                <div class="p-img">
                  <img src="${item.img}" alt="">
                </div>
                <div class="p-name">${item.name}</div>
                <div class="p-desc">${item.desc}</div>
                <div class="p-price">${item.price}</div>
              </li>`
    });

    $('.hot-sale-products').html(str)

  })

  /*---------------------------------------------------------------------- */

  // 渲染精品推荐 区域
  $.ajax({
    url: '../data/recommendation.json',
    dataType: 'json'
  }).then(function (res) {
    let str = ''
    res.forEach(item => {
      str += `<li class="swiper-slide grid-item-recommen">
              <div class="grid-info">
                <div class="grid-img">
                  <img src="${item.img}"
                    alt="">
                </div>
                <div class="grid-desc">${item.desc}</div>
              </div>
              <div class="grid-title">${item.title}</div>
              <div class="grid-price">${item.price}</div>
            </li>`
    });

    $('#recommen-swiper > .grid-list').html(str)

    clickBanner()
  })

  /*-------------------------------------------------------- */

  $.ajax({
    url: '../data/mBanner.json',
    dataType: 'json',
  }).then(function (res) {
    let str = ''
    res.forEach(item => {
      str += `<li class="swiper-slide">
          <img src="${item.img}" alt="">
        </li>`
    });

    $("#m-banner > .swiper-wrapper").html(str)
    mouseMoveBanner()
  })



  function mouseMoveBanner() {
    // 分页器 移入轮播图
    var mBanner = new Swiper('#m-banner', {

      autoplay: true,
      loop: true,
      speed: 800,
      effect: 'fade',
      fade: {
        crossFade: false,
      },
      allowTouchMove: false,

      // 如果需要分页器
      pagination: {
        el: '.m-banner-pagination',
        clickable: true,
      },
    })
    //鼠标覆盖停止自动切换
    mBanner.el.onmouseover = function () {
      mBanner.autoplay.stop();
    }

    //鼠标离开开始自动切换
    mBanner.el.onmouseout = function () {
      mBanner.autoplay.start();
    }

    //开启了clickable，鼠标滑过相当于点击
    for (var i = 0; i < mBanner.pagination.bullets.length; i++) {
      mBanner.pagination.bullets[i].onmouseover = function () {
        this.click();
      };
    }

  }





  /* -----------------------------------------------------------------------*/



  // 点击 轮播图
  function clickBanner() {

    $('.recommen-prev').css('display', 'none');
    $('.recommen-next').css('display', 'block');

    var recommenSwiper = new Swiper('#recommen-swiper', {
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      slidesPerView: 5,
      slidesPerGroup: 5,
      on: {
        //滑到最后一个隐藏前进按钮
        slideChangeTransitionEnd: function () {
          if (this.isEnd) {
            this.navigation.$nextEl.css('display', 'none');
          } else {
            this.navigation.$nextEl.css('display', 'block');
          }
        },
        //滑到第一个隐藏后退按钮
        slideChangeTransitionStart: function () {
          if (this.isBeginning) {
            this.navigation.$prevEl.css('display', 'none');
          } else {
            this.navigation.$prevEl.css('display', 'block');
          }
        }
      }

    })

  }


  /*---------------------------------------------------------------------- */
  // 渲染 手机板块 区域
  $.ajax({
    url: '../data/conChannel.json',
    dataType: 'json'
  }).then(function (res) {

    $('.c-phone').text(res[0].htit)

    let nav = '';
    res[0].hnav.forEach(item => {
      nav += `<li>${item}</li>`
    });
    $('.c-phone-nav').html(nav)

    let list = `<li class="grid-item grid-item-md">
              <img src="${res[0].bMainImg}" alt="">
              </li>`
    res[0].blist.forEach(item => {
      list += `<li class="grid-item">
              <div class="p-img">
                <img
                  src="${item.img}"
                  alt="">
              </div>
              <div class="p-name">${item.name}</div>
              <div class="p-desc">${item.desc}</div>
              <div class="p-price">${item.price}</div>
            </li>`
    })
    $('.c-phone-list').html(list)






  })
















})