<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>友情链接</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/linksetting_add.js')}}" type="text/javascript" charset="utf-8"></script>
    <style>
        .layui-form-label {
  float: left;
  display: block;
  padding: 10px 0px;
  width: 80px;
  font-weight: 400;
  text-align: right;
}
    </style>
</head>
<body>
    <div class="wrap-container">
        <form class="layui-form layui-form-linkAdd" style="width: 90%;padding-top: 20px;" onsubmit="return false;">
            <div class="layui-form-item">
                <label class="layui-form-label">名称：</label>
                <div class="layui-input-block">
                    <input type="text" id="linknameadd" name="linknameadd" required lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label link-select">分类：</label>
                <div class="layui-form layui-input-block" action="">
                    <div class="layui-form-item">
                        <select id="linkaddselect" name="type" lay-verify="required">
                            <option value="">请选择一个分类</option>
                            <option value="010">前端</option>
                            <option value="010">后端</option>
                          </select>    
                      </div>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">URL：</label>
                <div class="layui-input-block">
                    <input type="text" id="linkurladd" name="linkurladd" required lay-verify="required" placeholder="请输入URL" autocomplete="off" class="layui-input">
                </div>

            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button class="layui-btn layui-btn-normal linksetting-subBtn" lay-submit lay-filter="formDemo">提 交</button>
                </div>
            </div>
        </form>
    </div>
</body>

</html>