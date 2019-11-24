<!DOCTYPE html>
<html>

<head>
  <title>臻学网个人日志主页</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- 兼容移动设备 -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <!-- 让IE的文档渲染模式永远都是最新的 -->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
  <meta http-equiv="Expires" content="0" />
  <link rel="icon" href="{{url('img/head/logo2.ico')}}" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/common.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/personalLog.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
  <link rel="stylesheet" href="{{url('static/head/css/footer.css')}}">
  <link rel="stylesheet" href="{{url('static/head/css/goTop.css')}}">
  <link rel="stylesheet" href="{{url('static/head/css/alterpassword.css')}}">
</head>

<body>
  <!-- header菜单栏 -->
  <div id="header" class="header header-white">
    <a class="home" href="{{url('/')}}" title="慕课网">
      <img src="{{url('img/head/logo.png')}}" alt="">
    </a>
    <ul class="menu">
      <li class="item"><a class="item-hover" href="{{url('/')}}">网站首页</a></li>
      <li class="item "><a class="item-hover" href="{{url('learn_path_list')}}">学习路线</a></li>
      <li class="item "><a class="item-hover" href="{{url('log')}}">日志主页</a></li>
    </ul>

    @if(\Illuminate\Support\Facades\Auth::check())
    <img class="menu-list" src="{{url('img/head/icon_threeline_fill.png')}}" alt="">
    <div class="menu-list-content dropdown-menu dropdown-menu-sw">
      <div class="menu-list-content-user">{{\Illuminate\Support\Facades\Auth::guard('web')->user()->user_name}}</div>
      @if(\Illuminate\Support\Facades\Auth::guard('web')->user()->user_permissions==0)
      <div class="menu-list-content-item" onclick="window.open('/admin')">后台管理</div>
      @else
      <div class="menu-list-content-item" onclick="window.open('/personal_log')">个人文章</div>
      @endif
      <div class="menu-list-content-item">修改密码</div>
      <div class="menu-list-content-item" onclick='logout()'>退出登陆</div>
    </div>
    @else
    <ul class="header-unlogin clearfix">
      <li class="login">
        <img class="login-img" src="{{url('img/head/VIP.png')}}" alt="登录">
        <a href="{{url('login')}}">登陆</a>
      </li>
    </ul>
    @endif

    <div class="search-area">
      <input placeholder="请输入想要的搜索内容..." class="search-input" type="text">
      <div class="search-btn"><i class="iconfont icon-icon_sousuo"></i></div>
    </div>
  </div>


  </div>
  <!-- 标题栏 -->
  <div class="top-title">
    <div class="top-content">
      <div class="top-content-name">
        <img src="{{url('img/head/logContent.png')}}" alt="">
        <span>个人日志</span>
        <span>系统管理个人日志</span>
      </div>

      <div class="top-content-title">
        <ul>
          <li data-id="0">全部</li>
          @foreach ($data as $item)
          <li data-id="{{$item->category_id}}">{{$item->category_name}}</li>
          @endforeach
        </ul>
      </div>
    </div>
  </div>
  <!-- 详情框 -->
  <div class="content">
    <div class="content-info">
      <div class="content-info-main">

      </div>

      <!-- 分页 -->
      <div class="pagenation">
      </div>
    </div>
  </div>

  <!-- footer -->
  <div class="footer">
    <p>© 2019 成都东软学院项目组 版权所有 网络文化经营许可证：川网文[2019]0000-000号</p>
  </div>

  <!-- GotoTop -->
  <div class="gotoTop">
    <a href="{{url('log_edit')}}" class="gotoTop-bar">
      <img src="{{url('img/head/circle-add.png')}}" alt="">
      <span>添加日志</span>
    </a>
    <a href="{{url('personal_log')}}" class="gotoTop-bar">
      <img src="{{url('img/head/circle-location.png')}}" alt="">
      <span>个人主页</span>
    </a>
    <a href="javascript:;" class="gotoTop-name">
      <img src="{{url('img/head/circle-message.png')}}" alt="">
      <span>公众号</span>
      <div class="gotoTop-gzh"><img src="" alt=""></div>
    </a>
    <a id="goTop" href="#header" class="gotoTop-bar">
      <img src="{{url('img/head/circle-arrow-up.png')}}" alt="">
      <span>返回顶部</span>
    </a>
  </div>



  </div>


  <script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/common.js')}}"></script>
  <script type="text/javascript" src="{{url('static/admin/layui/layui.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/logout.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/personalLog.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/alterpassword.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/gototop.js')}}"></script>

</body>

</html>