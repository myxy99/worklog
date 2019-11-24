<!DOCTYPE html>
<html  class="iframe-h">
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit">
		<meta name="csrf-token" content="{{ csrf_token() }}">
  		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>上传日志</title>
		<link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
		<link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
		<script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
		<script src="{{url('static/admin/js/uploadTime.js')}}" type="text/javascript" charset="utf-8"></script>
	</head>
	<body  class="iframe-h">
		<div class="layui-form email-list" id="table-list">
			<table class="layui-table" lay-even lay-skin="nob">
				<colgroup>
					<col width="300">
					<col>
					<col class="hidden-xs" width="300">
				</colgroup>
				<thead>
					<tr>
						<th class="hidden-xs">用户</th>
						<th>上传次数</th>
						<th class="hidden-xs">最后一次上传时间</th>
					</tr>
				</thead>
				<tbody id="uploadTime-tbody">
					
				</tbody>
			</table>
			<div id="email-page" style="text-align: center;"></div>
		</div>

</body>
</html>