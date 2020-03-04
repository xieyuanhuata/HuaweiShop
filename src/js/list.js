/*

华为手机 列表页 api

https://openapi.vmall.com/mcp/queryPrd?
lang=zh-CN&
country=CN&
portal=1&
keyword=36&
pageSize=20&
pageNum=1&
searchSortField=0&
searchSortType=desc&
searchFlag=1&
brandType=0&
tid=2d82eff5edd04828bf1285b0a5be625b&
screenParams=%7B%7D&searchId=72c8b001d80e9f28cc6dbc24066de5eef10128cf2b926329

*/
$(function () {

  // 记录分页器切换到多少页了
  let pageNum = 1;

  // 准备一个变量当做开关
  let flag = true;

  // 排序识别码
  let sortNum = 0

  // 准备一个接受变量的数组
  let listArr=[]


  // 1.获取列表数据
  getList()


  function getList() {
    //发送请求
    $.ajax({
      url: '/dm' + '/mcp/queryPrd',
      data: {
        lang: "zh-CN",
        country: "CN",
        portal: "1",
        keyword: "36",
        pageSize: "20",
        pageNum: pageNum,
        searchSortField: sortNum,
        searchSortType: "desc",
        searchFlag: 1,
        brandType: "0",
        tid: "2d82eff5edd04828bf1285b0a5be625b",
        screenParams: {},
      },
      dataType: 'json',
    }).then(function (res) {

      // 渲染 list 头部
      bindListHtml(res.labelList[0].labelContentList)

      // 渲染 item 
      bindListItem(res.resultList)


      // 渲染分页器
      // 短路表达式 flag 为 false 就不会往后执行了
      flag && bindPagination(res.totalCount, res.pageSize)

      listArr = res.resultList
    })
  }

  // 渲染 list 头部
  function bindListHtml(list) {
    // 价格区间
    let list1 = list[0].itemEntryList
    let str1 = ''
    list1.forEach(item => {
      str1 += `<li>
                <a href="">${item.value}</a>
              </li>`
    });
    $('.price-range_ul').html(str1)

    // 屏幕尺寸
    let list2 = list[1].itemEntryList
    let str2 = ''
    list2.forEach(item => {
      str2 += `<li>
                <a href="">${item.value}</a>
              </li>`
    });
    $('.screen-size_ul').html(str2)
  }

  // 渲染 item list
  function bindListItem(list) {

    let str = ''
    list.forEach(item => {
      str += ` <li data-id = ${item.productId}>
            <div class="list-grid-item">
              <a href="javascript:void(0)">
                <div class="p-img">
                  <img
                    src="https://res.vmallres.com/pimages/${item.photoPath}428_428_${item.photoName}"
                    alt="">
                </div>
                <div class="p-name">${item.briefName}</div>
                <div class="p-price clearfix">`
      item.promoPrice === undefined ? str += `<b>${item.price}</b>` : str += `<b>${item.promoPrice}</b>`
      if (item.skuCount > 1) {
        str += `<span>多款可选</span>`
      }
      str += `</div>`

      if (item.promoLabels.length !== 0) {
        str += `<div class="p-label clearfix">`
        let listArr = item.promoLabels
        listArr.forEach(item => {
          str += `<span>${item}</span>`
        });
        str += `</div>`
      }
      str += `<div class="p-comment">`
      item.rateCount === 0
        ? str += `<em>
                    <span>暂无评价</span>
                  </em>`
        : str += `<em>
                    <span>${item.rateCount}</span>人评价
                  </em>
                  <em>
                    <span>${item.goodRate}%</span>好评
                  </em>`
      str += ` </div>`
      if (item.displayTags !== '' && item.displayTags !== undefined) {
        str += `<div class="p-tag">
                  <span>${item.displayTags}</span>
                </div>`
      }
      str += `
              </a>
            </div>
          </li>`
    });

    $('#list-item').html(str);


  }

  // 渲染分页器
  function bindPagination(totalCount, pageSize) {

  // 加载一次就不需要重新加载 , 关闭开关
    flag = false;

    $('.pagination').pagination({
      totalData: totalCount, //数据总条数
      current: 1, //当前第几页
      showData: pageSize, //每一页数据的条数
      // homePage: '首页',
      // endPage: '末页',
      prevContent: '|<',
      nextContent: '>|',
      mode: 'fixed',
      callback: function (api) {

        pageNum = api.getCurrent();

        // 切换页面 执行 getList
        getList()
      }
    })
  }

  // 排序
  $('.classify_ul>li').on('click', function () {
    sortNum = $(this).data('sort')
    flag = true
    pageNum = 1
    getList()
    $('.classify_ul a').css('color','#333')
    $(this).find('a').css('color','#cb242b')
  })

  // 获取点击条目的 数据  并存储在 localStorage
  $('#list-item').on('click', 'li', function () {
    
    const productId = $(this).data('id')
    
    let data = {}

    for (let i = 0; i < listArr.length; i++){
      if (listArr[i].productId === productId) {
        data = listArr[i]
        break;
      }
    }   
    // 把数据存储到 localStorage
    localStorage.setItem('product_info', JSON.stringify(data))

    // 存储好跳转页面
    window.location.href = '../pages/detail.html'
  })














})

