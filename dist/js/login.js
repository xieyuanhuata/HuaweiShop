"use strict";$(function(){$(".login_click").click(function(){$.ajax({url:"/lg",data:{username:$("input[name = 'username']").val(),password:$("input[name='password'] ").val()},type:"post",dataType:"json"}).then(function(n){console.log(n)})})});