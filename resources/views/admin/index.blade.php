<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="user_number" content="{{ \Illuminate\Support\Facades\Auth::guard('web')->user()->user_student_number }}">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	<title>臻学网后台</title>
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
	<link rel="stylesheet" type="text/css" href="{{url('static/head/css/alterpassword.css')}}" />
	<script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
	<script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
	<script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
	<script src="{{url('static/admin/js/main.js')}}" type="text/javascript" charset="utf-8"></script>
	<script src="{{url('static/head/js/logout.js')}}" type="text/javascript" charset="utf-8"></script>
</head>

<body>
	<div class="main-layout" id='main-layout'>
		<!--侧边栏-->
		<div class="main-layout-side">
			<div class="m-logo">
			</div>
			<ul class="layui-nav layui-nav-tree" lay-filter="leftNav">
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/member')}}" data-id='1' data-text="成员管理"><i class="iconfont">&#xe604;</i>成员管理</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/document')}}" data-id='2' data-text="文档管理"><i class="iconfont">&#xe602;</i>文档管理</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/path')}}" data-id='3' data-text="学习路线管理"><i class="iconfont">&#xe608;</i>学习路线管理</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/classification')}}" data-id='4' data-text="学习分类管理"><i class="iconfont">&#xe607;</i>学习分类管理</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/cover')}}" data-id='5' data-text="封面图片库管理"><i class="iconfont">&#xe600;</i>封面图片库管理</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/linksetting')}}" data-id='8' data-text="友情链接设置"><i class="iconfont">&#xe60c;</i>友情链接设置</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/carousel')}}" data-id='9' data-text="轮播图设置"><i class="iconfont">&#xe60b;</i>轮播图设置</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/navigation')}}" data-id='10' data-text="导航栏设置"><i class="iconfont">&#xe60b;</i>导航栏设置</a>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;" data-url="{{url('admin/system')}}" data-id='7' data-text="系统设置"><i class="iconfont">&#xe606;</i>系统设置</a>
				</li>
			</ul>
		</div>
		<!--右侧内容-->
		<div class="main-layout-container">
			<!--头部-->
			<div class="main-layout-header">
				<div class="menu-btn" id="hideBtn">
					<a href="javascript:;">
						<span class="iconfont">&#xe60e;</span>
					</a>
				</div>
				<div class="menu-btn" id="hideBtn">
					<a href="{{url('/')}}">
						<span class="">网站首页</span>
					</a>
				</div>
				<ul class="layui-nav" lay-filter="rightNav">

					<li class="layui-nav-item">
						<a class="layui-nav-item-name" href="javascript:;" data-url="" data-id='5' data-text="个人信息">{{\Illuminate\Support\Facades\Auth::guard('web')->user()->user_name}}</a>
					</li>
					<li class="layui-nav-item passwordAlert"><a href="javascript:;"></a>修改个人信息</a></li>
					<li class="layui-nav-item" style="padding-left:10px" onclick="logout()"><a href="javascript:;"></a>退出登录</a></li>

				</ul>
			</div>
			<!--主体内容-->
			<div class="main-layout-body">
				<!--tab 切换-->
				<div class="layui-tab layui-tab-brief main-layout-tab" lay-filter="tab" lay-allowClose="true">
					<ul class="layui-tab-title">
						<li class="layui-this welcome">上传记录</li>
					</ul>
					<div class="layui-tab-content">
						<div class="layui-tab-item layui-show" style="background: #f5f5f5;">
							<!--1-->
							<iframe src="{{url('admin/uploadtime')}}" width="100%" height="100%" name="iframe" scrolling="auto" class="iframe" framborder="0"></iframe>
							<!--1end-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>

</html>