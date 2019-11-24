<!DOCTYPE html>
<html class="iframe-h">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>封面图片库管理</title>
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />

</head>

<body class="iframe-h">
        <form  style="display:none" action="" method="post" id="uploadF" enctype="multipart/form-data">
            <input name="picture_file" type="file" id="uploadFile" value="" />
        </form>
    <form class="layui-form" action="" lay-filter="example">
        <div class="layui-form email-list" id="table-list">
            <table class="layui-table" lay-even lay-skin="line">
                <colgroup>
                    <col width="300">
                    <col>
                    <col width="80">
                    <col class="hidden-xs" width="250">
                </colgroup>
                <thead>
                    <tr>
                        <th class="hidden-xs">缩略图</th>
                        <th></th>
                        <th>
                                <span class="uploadeImg layui-btn layui-btn-small">
                                        <i class="layui-icon">&#xe654;</i>上传图片
                                </span>
                        </th>
                        <th class="hidden-xs">操作</th>
                    </tr>
                </thead>
                <tbody id="cover-tbody">
                </tbody>
            </table>
        </div>
        <div id="email-page" style="text-align: center;"></div>
    </form>

    <script src="{{url('static/admin/js/cover.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>

</body>

</html>