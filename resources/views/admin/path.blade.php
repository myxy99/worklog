<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>学习路线管理</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/path.js')}}" type="text/javascript" charset="utf-8"></script>
    <style>
        .layui-anim-upbit {
            left: 0 !important;
        }
    </style>


</head>

<body>
    <div class="page-content-wrap">
        <form class="layui-form" action="">
            <div class="layui-form-item path-select">
                <label class="layui-form-label link-select">分类：</label>
                <div class="layui-form layui-input-block" action="">
                    <div class="layui-form-item">
                        <select id="pathChangeClass" name="type" lay-filter="changeClassify" lay-verify="required">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <div class="layui-form" id="table-list">
            <button type="button" id="addRoute" class="layui-btn path-add-btn" data-id="1">增 加</button>
            <table class="layui-table" lay-skin="line">
                <colgroup>
                    <col width="300">
                    <col width="300">
                    <col>
                    <col class="hidden-xs" width="200">
                </colgroup>
                <thead>
                    <tr>
                        <th class="hidden-xs">名称</th>
                        <th>分类</th>
                        <th>时间</th>
                        <th class="hidden-xs">操作</th>
                    </tr>
                </thead>
                <tbody id="path-tbody">

                </tbody>
            </table>
            <div id="email-page" style="text-align: center;"></div>
        </div>
    </div>
    <script>
        layui.use(['form', 'laypage', 'jquery', 'layer'], function () {
            var form = layui.form(),
                layer = layui.layer,
                laypage = layui.laypage,
                $ = layui.jquery;
            //分页
            laypage({
                cont: 'email-page',
                pages: 10,
                skin: '#1E9FFF'
            });
            form.on('checkbox(emailAllChoose)', function (data) {
                var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
                child.each(function (index, item) {
                    item.checked = data.elem.checked;
                });
                form.render('checkbox');
            });

            form.render();
        });
    </script>
</body>

</html>