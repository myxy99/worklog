<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>臻学网登录页面</title>
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/login.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/common.css')}}">
</head>

<body>
  <div class="main">
    <div class="login">
      <img src="{{url('img/head/logo.png')}}" alt="logo">
      <div class="login-input">
        <!-- <input class="login-input-userInfo" type="text" value="输入账号...">
        <input class="login-input-passwordInfo" type="text" value="输入密码..."> -->
        <img src="{{url('img/head/user.png')}}" alt="">
        <input type="text" placeholder="请输入账号..." name="" id="user" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')">
        <img src="{{url('img/head/password.png')}}" alt="">
        <input type="password" placeholder="请输入密码..." name="" id="password" maxlength="16">
      </div>
      <input type="button" value="登录" name="" id="login-button">
    </div>
  </div>
  <script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/login.js')}}"></script>
  <script type="text/javascript" src="{{url('static/admin/layui/layui.js')}}"></script>
</body>

</html>