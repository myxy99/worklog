<!DOCTYPE html>
<html class="iframe-h">

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>系统设置</title>
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
    <link rel="stylesheet" type="text/css" href="{{url('static/admin/css/admin1.css')}}" />
    <script src="{{url('static/admin/layui/layui.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/common.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/head/js/jquery-3.2.0.min.js')}}" type="text/javascript" charset="utf-8"></script>
    <script src="{{url('static/admin/js/index/system.js')}}" type="text/javascript" charset="utf-8"></script>
</head>

<body class="iframe-h">
    <div class="wrap-container email-wrap clearfix">
        <div class="row system-row">
            <div class="col-lg-10">
                <div class="email-content">
                    <form class="layui-form system-content" style="width: 90%;padding-top: 20px;" onsubmit="return false;">
                        <div class="layui-form-item">
                            <label class="layui-form-label system-label">备案：</label>
                            <div class="layui-input-block system-input">
                                <input type="text" id="filing" name="filing" required lay-verify="required" placeholder="请输入备案" autocomplete="off" class="layui-input">
                            </div>

                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label system-label">KeyId：</label>
                            <div class="layui-input-block system-input">
                                <input type="text" id="keyid" name="keyid" required lay-verify="required" placeholder="请输入AccessKeyId" autocomplete="off" class="layui-input">
                            </div>
       
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label system-label">KeySecret：</label>
                            <div class="layui-input-block system-input">
                                <input type="text" id="keysecret" name="keysecret" required lay-verify="required" placeholder="请输入AccessKeySecret" autocomplete="off" class="layui-input">
                            </div>

                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label system-label">微信二维码：</label>
                            <div class="layui-input-block system-input">
                                <div id="systemcode">
                                    <img id="systemimg" class="system-img" />
                                </div>
                                <input type="file" class="system-upload" id="systemimage" onchange="selectImage(this);"/>
                            </div>

                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label system-label">页脚：</label>
                            <div class="layui-input-block system-input">
                                <input type="text" id="footer" name="footer" required lay-verify="required" placeholder="请输入页脚" autocomplete="off" class="layui-input">
                            </div>

                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn layui-btn-normal system-sub-btn" lay-submit lay-filter="formDemo">提 交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>