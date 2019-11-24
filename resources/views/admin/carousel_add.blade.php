<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport"
		content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	<title>成员管理添加</title>
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
	<link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin1.css')}}" />
	<script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
	<script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
	<script src="{{url('static/admin/js/index/carousel_add.js')}}" type="text/javascript" charset="utf-8"></script>
</head>

<body>
	<div class="wrap-container">
		<form style="width: 90%;padding-top: 20px;" id="uploadF" class="layui-form" enctype="multipart/form-data"
			onsubmit="return false;">
			<div class="layui-form-item">
				<label class="layui-form-label url-label">设置图片：</label>
				<div class="layui-input-block url-input">
					<div id="carouselcode" class="carousel-image">
						<img class="carousel-img" src="{{url('img/admin/none.png')}}" />
					</div>
					<input name="rotation_picture_file" type="file" id="uploadFile" value=""
						onchange="selectImage(this);" />
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label url-label">设置点击后链接：</label>
				<div class="layui-input-block url-input">
					<input type="text" name="rotation_click_url" required lay-verify="required" placeholder="请输入点击后链接"
						autocomplete="off" class="layui-input" id="carousel-inp">
				</div>
			</div>
			<div class="layui-form-item">
				<div class="layui-input-block">
					<button class="layui-btn layui-btn-normal carousel-subBtn" lay-submit lay-filter="formDemo">提
						交</button>
				</div>
			</div>
		</form>
	</div>
</body>

</html>