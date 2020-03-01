$(function () {

  // 点击登录 前后端交互
  $(".login_click").click(function () {
    let user = $("input[name = 'username']").val();
    let pwd = $("input[name='password'] ").val();

    // 非空验证
    if (!user || !pwd) {
      $(".errorTip").text("请填写完整的表单!")
      return;
    }

    // 发送请求
    $.ajax({
      url: '/lg',
      data: {
        username: user,
        password: pwd
      },
      type: 'post',
      dataType: 'json'
    }).then(function (res) {

      // 返回结果处理函数
      if (res.code === 0) {
        $(".errorTip").text("密码或者用户名错误!")
        return
      }

      // 勾选七天免登录,设置cookie
      if ($(".lg_checkbox input").prop("checked") === true) {
        cookie.setCookie('userinfo', `${user}`, 60 * 60 * 24 * 7)
      }

      // 登录成功,跳转
      $(".errorTip").text("登录成功!")
      setTimeout(() => {
        window.location.href = '/pages/index.html'
      }, 3000);

    })
  })


})






