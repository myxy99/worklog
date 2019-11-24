<!DOCTYPE html>
<html>

<head>
	<title>臻学网日志主页</title>
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
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/log.css')}}">
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/footer.css')}}">
	<link rel="stylesheet" href="{{url('static/head/css/alterpassword.css')}}">
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />

	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/goTop.css')}}">
</head>

<body>
	<!-- header菜单栏 -->
	<div class="header header-black">
		<ul class="menu" id="log-menu">
			<li class="item"><a class="item-hover" href="{{url('')}}">网站首页</a></li>
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
	</div>

	<!-- 标题头部 -->
	<div class="shizhan-title">
		<div class="shizhan-title-wrap">
			<div class="title-img">
				<a href=""><img src="{{url('img/head/logo.png')}}" alt=""></a>
			</div>
			<div class="title-search">
				<div class="search">
					<input type="text" placeholder="搜索感兴趣的实战课程内容">

					<div class="submit"><i class="iconfont icon-icon_sousuo"></i></div>

				</div>
			</div>
		</div>
	</div>

	<!--分类栏 -->
	<div class="shizhan-fenlei">
		<div class="shizhan-fenlei-wrap">
		</div>
	</div>

	<!-- 详细分类 -->
	<div class="shizhan-menu">
		<div class="shizhan-menu-wrap">
		</div>
	</div>

	<!--课程内容 -->
	<div class="shizhan-content">
		<div class="shizhan-content-wrap clearfix">
		</div>
		<!-- 分页 -->
		<div class="pagenation">
			{{-- page-select --}}

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
	<script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/common.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/logout.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/log.js')}}"></script>
	<script type="text/javascript" src="{{url('static/admin/layui/layui.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/gototop.js')}}"></script>

	<script type="text/javascript" src="{{url('static/head/js/alterpassword.js')}}"></script>

</body>

</html>