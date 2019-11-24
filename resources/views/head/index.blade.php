<!DOCTYPE html>
<html>

<head>
	<title>臻学网首页</title>
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
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/swiper-3.4.2.min.css')}}">
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/common.css')}}">
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/index.css')}}">
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
			@foreach ($getNavigationBar as $item)
			<li class="item"><a class="item-hover" href="{{$item->navigation_jump_url}}">{{$item->navigation_columns_name}}</a></li>
			@endforeach
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
	<!-- banner -->
	<div class="banner">
		<div class="banner-wrap">
			<div class="banner-menu-prev">
				<div class="banner-menu-prev-button">
					<img src="{{url('img/head/prev.png')}}" alt="">
				</div>
			</div>
			<ul class="banner-menu">
				@foreach ($getClassifyBar as $item)
				<li class="banner-menu-item ">
					<a href="javascript:;">{{$item->category_name}}</a>
					<div class="banner-menu-item-detail hide">
						<div class="light">
							<div class="xian">
								<span>{{$item->category_name}}</span>
							</div>
							@foreach ($item->all_child as $items)
							<a data-id="{{$items->category_id}}">{{$items->category_name}}</a>
							@endforeach
						</div>
					</div>
				</li>
				@endforeach
			</ul>
			<div class="banner-menu-next">
				<div class="banner-menu-next-button">
					<img src="{{url('img/head/next.png')}}" alt="">
				</div>
			</div>
			<div class="banner-right">
				<div class="banner-img">
					<div class="swiper-wrapper">
						@foreach ($getSlideshow as $item)
						<div class="swiper-slide" data-url="{{$item->rotation_click_url}}" data-swiper-autoplay="3000" style="background:url('{{$item->rotation_picture_url}}') no-repeat ;background-size: 936px 444px;">
						</div>
						@endforeach
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination swiper-pagination-white"></div>
					<!-- Add Arrows -->
					<div class="swiper-button-next swiper-button-white"></div>
					<div class="swiper-button-prev swiper-button-white"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 学习推荐 -->
	<div class="shizhan">
		<div class="shizhan-wrap">
			<h3 class="shizhan-title">
				<span class="i-shizhan-l"></span>
				<em>学</em>/<em>习</em>/<em>推</em>/<em>荐</em>
				<span class="i-shizhan-r"></span>
			</h3>

			<div id="learnRecommend" class="shizhan-banner">
				<ul>
					@foreach ($getClassifyBar as $item)
					@if($loop->iteration==7)
					<span>...</span>
					@break
					@endif
					<li data-id="{{$item->category_id}}">{{$item->category_name}}</li>
					@endforeach
				</ul>
			</div>
			<div class="shizhan-content">
				<a href="#" class="content-item mr18">
					<div class="img">
						<img src="{{url('img/head/shizhan1.jpg')}}" alt="">
					</div>
					<div class="content-item-title">
						javascript入门
					</div>
					<p class="shizhan-desc">全网最热Python3入门+进阶 更快上手实际开发</p>
				</a>

			</div>

			<div class="article-intro">
				<div class="article-intro-control">
					<img src="{{url('img/head/lianjie.png')}}" alt="">
					<span>友情链接</span>
					<img src="{{url('img/head/huanyihuan.png')}}" alt="">
					<span>换一批</span>
				</div>

				<div class="article-intro-content">
				</div>
			</div>

		</div>
	</div>
	<!-- 学习路线 -->
	<div class="newcourse">
		<div class="newcourse-wrap">
			<h3 class="newcourse-title">
				<span class="i-newcourse-l"></span>
				<em>学</em>/<em>习</em>/<em>路</em>/<em>线</em>
				<span class="i-newcourse-r"></span>
			</h3>
			<div id="learnLink" class="shizhan-banner">
				<ul>
					@foreach ($getClassifyBar as $item)
					@if($loop->iteration==7)
					<span>...</span>
					@break
					@endif
					<li data-id="{{$item->category_id}}">{{$item->category_name}}</li>
					@endforeach
				</ul>
				<a href="{{url('learn_path_list')}}" class="lookMore">查看更多 ></a>
			</div>
			<div class="newcourse-content">
				<div id="learnRoad" class="line-content clearfix">
				</div>
			</div>
		</div>
	</div>
	<!-- 最新发布 -->
	<div class="rumen">
		<div class="rumen-wrap">
			<h3 class="rumen-title">
				<span class="i-rumen-l"></span>
				<em>最</em>/<em>新</em>/<em>发</em>/<em>布</em>
				<span class="i-rumen-r"></span>
			</h3>
			<div id="latestRelease" class="line-content clearfix">
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
		<a id="goTop" href="javascript:;" class="gotoTop-bar">
			<img src="{{url('img/head/circle-arrow-up.png')}}" alt="">
			<span>返回顶部</span>
		</a>
	</div>
	<script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/swiper-3.4.2.min.js')}}"></script>
	<script type="text/javascript" src="{{url('static/admin/layui/layui.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/index.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/common.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/logout.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/gototop.js')}}"></script>
	<script type="text/javascript" src="{{url('static/head/js/alterpassword.js')}}"></script>
</body>

</html>