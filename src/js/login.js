$(function () {

  // 点击登录 前后端交互
  $(".login_click").click(function () {
    $.ajax({
      url: '/lg',
      data: {
        username: $("input[name = 'username']").val(),
        password: $("input[name='password'] ").val()
      },
      type: 'post',
      dataType: 'json'
    }).then(function (res) {
      // 返回结果处理函数
      console.log(res);
    })
  })

})