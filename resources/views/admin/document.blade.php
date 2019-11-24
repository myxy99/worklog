<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>文档管理</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/document.js')}}" type="text/javascript" charset="utf-8"></script>
</head>

<body>
    <div class="page-content-wrap">
        <form class="layui-form" action="" lay-filter="example">
            <div class="layui-form-item">
                <div id="document-layui-inline" class="layui-inline">
                    <input type="text" id="search-input" name="title" placeholder="请输入标题" autocomplete="off"
                        class="layui-input input-title">
                </div>
                <button type="button" lay-filter="search-article" id="search-article" class="layui-btn layui-btn-normal"
                    lay-submit="search">搜索</button>
              <button id="shuaxin" type="button" class="layui-btn">
  <i class="layui-icon">&#x1002;</i>   
</button> 
            </div>
            <div class="layui-form" id="table-list">
                <table class="layui-table" lay-skin="line">
                    <colgroup>
                        <col width="220">
                        <col width="220">
                        <col width="220">
                        <col width="220">
                        <col width="220">
                        <col width="220">
                        <col width="300">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>文档名称</th>
                            <th>类别</th>
                            <th>提交时间</th>
                            <th>作者</th>
                            <th>文章可见(状态)</th>
                            <th>置顶</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="document-management-tbody">
                    </tbody>
                </table>
            </div>
            <div id="email-page" style="text-align: center;"></div>
        </form>
    </div>
</body>

</html>