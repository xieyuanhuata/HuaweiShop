<?php


$username = $_POST['username'];

$pwd = $_POST['password'];

$link = mysqli_connect("localhost", "root", "root", "huaweishop");

$sql = "SELECT * FROM `login` WHERE `username`='$username' AND `password`='$pwd'";

// 执行 sql 语句
$res = mysqli_query($link, $sql);

// 解析结果
$row = mysqli_fetch_assoc($res);

// 断开数据库
mysqli_close($link);

// 判断结果
if ($row) {
  $arr = array("msg" => "登录成功", "code" => 1);
} else {
  $arr = array("msg" => "登录失败", "code" => 0);
}

// 输出结果
print_r(json_encode($arr));
