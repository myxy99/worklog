<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>成员管理</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin1.css')}}" />
    
</head>

<body>
    <div class="page-content-wrap">
        <div class="layui-form" id="table-list">
            <button type="button" class="layui-btn member-add-btn" data-id="1" data-url="{{url('admin/member_add')}}">增 加</button>
            <table class="layui-table" lay-skin="line">
                <colgroup>
                    <col width="220">
                    <col width="220">
                    <col width="220">
                    <col width="220">
                    <col width="220">
                    <col width="300">
                </colgroup>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>账号</th>
                        <th>专业</th>
                        <th>年级</th>
                        <th>权限</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="member-tbody">
                </tbody>
            </table>

            <div id="demo1" style=" text-align: center;"></div>
        </div>
    </div>


    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/index/member.js')}}" type="text/javascript" charset="utf-8"></script>
</body>

</html>