<!DOCTYPE html>
<html class="iframe-h">

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="username" content="{{\Auth::user()->user_name}}">
    <meta name="id" content="{{\Route::input('id')}}">
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>学习路线添加</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin.css')}}" />
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />

</head>

<body class="iframe-h">

    <div class="return">
        <button id="pathAdd-return" class="layui-btn layui-btn-mini layui-btn-normal returnButton"><i
                class="layui-icon">&#xe603;</i>
            返回</button>
    </div>
    <form class="layui-form system-content pathAddContent-left" style="width: 90%;padding-top: 20px;">
        <div class="layui-form-item pathadd-title">
            <label class="layui-form-label system-label ">标题：</label>
            <div class="layui-input-block pathadd-input">
                <input id="pathAdd-title" type="text" name="title" required lay-verify="required" placeholder="请输入标题"
                    autocomplete="off" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item pathadd-title">
            <label class="layui-form-label system-label ">分类：</label>
            <div class="layui-input-block pathadd-input">
                <select id="pathAdd-select" name="city" lay-verify="required">
                    <option value=""></option>
                </select>
            </div>
        </div>


        <div class="layui-form-item pathadd-title">
            <label class="layui-form-label system-label pathadd-introduction">简介：</label>
            <div class="layui-input-block pathadd-input">
                <textarea id="pathAdd-textarea" class="pathadd-text"></textarea>
            </div>
        </div>

        <div class="layui-form-item pathadd-context">
            <label class="layui-form-label system-label">正文：</label>
            <div class="layui-input-block pathadd-input">
                <script id="editor" type="text/plain" style="width:1350px;height:500px;"></script>
            </div>
        </div>
    </form>
    <div class="pathAddContent-right">
        <div class="pathAddContent-right-img">
            <div class="layui-form-item pathadd-pic">
                <label class="layui-form-label system-label">封面图片：</label>
                <div class="layui-input-block system-input" id="uploadImgDiv">
                    <div>
                        <img id="addImgModel" class="pathaddImg" src="{{url('img/head/shizhan1.jpg')}}" />
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label system-label pathadd-label">上传视频：</label>
        <div class="pathadd-video">
            <img id="pathadd-video" src="{{url('img/head/video.png')}}" />
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn layui-btn-normal path-sub-btn" lay-submit lay-filter="formDemo">提 交</button>
        </div>
    </div>

    <!-- 图片弹框 -->
    <div id="myModalImg" class="modal">

        <!-- 弹窗内容 -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>弹窗头部</h2>
            </div>
            <div class="modal-body">
                <ul class="flow-default" id="LAY_demo1">
                </ul>
            </div>
        </div>

    </div>

    <!-- 视频弹框 -->
    <div id="myModalVideo" class="modal">

        <!-- 弹窗内容 -->
        <div class="modal-content modal-content-left">
            <div class="modal-header">
                <span class="close">&times;</span>
                <label class="pathAdd-addVideo-label" for="pathAdd-addVideo">
                    <h2>添加视频</h2>
                </label>
                <span class="pathAdd-time">0%</span>
                <input type="file" id='pathAdd-addVideo' style="display:none;">
            </div>
            <div class="modal-body">
                <ul class="flow-default" id="J_prismPlayer">
                </ul>
            </div>
        </div>
    </div>
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/pathAdd.js')}}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/ueditor.config.js')}}"></script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/ueditor.all.min.js')}}"> </script>
    <script type="text/javascript" charset="utf-8" src="{{url('packages/ueditor/lang/zh-cn/zh-cn.js')}}"></script>
    <script type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"></script>
    <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/aliyun-upload-sdk-1.5.0.min.js')}}"></script>
    <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/lib/es6-promise.min.js')}}"></script>
    <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/lib/aliyun-oss-sdk-5.3.1.min.js')}}"></script>
</body>

</html>