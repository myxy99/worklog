<!DOCTYPE html>
<html  class="iframe-h">
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>轮播图设置</title>
		<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}"/>
		<link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin1.css')}}"/>
		
	</head>
	<body  class="iframe-h">
	<div class="layui-form email-list" id="table-list">
		<button type="button" class="layui-btn carousel-add-btn" data-id="1" data-url="{{url('admin/carousel_add')}}">增 加</button>
		<table class="layui-table" lay-even lay-skin="line">
			<colgroup>
				<col width="200">
				<col>
				<col class="hidden-xs" width="300">
			</colgroup>
			<thead>
				<tr>
					<th class="hidden-xs">图片</th>
					<th>链接URL</th>
					<th class="hidden-xs">操作</th>
				</tr>
			</thead>
			<tbody id="carousel-tbody">
			</tbody>
		</table>
		<div id="email-page1" style="text-align: center;"></div>
	</div>
	<script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/admin/js/index/carousel.js')}}" type="text/javascript" charset="utf-8"></script>
</body>
</html>