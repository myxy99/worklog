<!DOCTYPE html>
<html>

<head>
  <title>臻学网个人日志编辑页</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- 兼容移动设备 -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="id" content="{{\Route::input('id')}}">
  <meta name="username" content="{{\Auth::user()->user_name}}">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <!-- 让IE的文档渲染模式永远都是最新的 -->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
  <meta http-equiv="Expires" content="0" />
  <link rel="icon" href="{{url('img/head/logo2.ico')}}" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/common.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/logEdit.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/footer.css')}}">
  <link rel="stylesheet" type="text/css" href="{{url('static/admin/layui/css/layui.css')}}" />
  <link rel="stylesheet" type="text/css" href="{{url('static/head/css/goTop.css')}}">
  <link rel="stylesheet" href="{{url('static/head/css/alterpassword.css')}}">

  <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />
</head>

<body>
  <!-- header菜单栏 -->
  <div id="header" class="header header-white">
    <a class="home" href="{{url('/')}}" title="慕课网">
      <img src="{{url('img/head/logo.png')}}" alt="">
    </a>
    <ul class="menu">
      <li class="item"><a class="item-hover" href="{{url('/')}}">网站首页</a></li>
      <li class="item "><a class="item-hover" href="{{url('learn_path_list')}}">学习路线</a></li>
      <li class="item "><a class="item-hover" href="{{url('log')}}">日志主页</a></li>
    </ul>
    @if(\Illuminate\Support\Facades\Auth::check())
    <img class="menu-list" src="{{url('img/head/icon_threeline_fill.png')}}" alt="">
    <div class="menu-list-content dropdown-menu dropdown-menu-sw">
      <div class="menu-list-content-user">{{\Illuminate\Support\Facades\Auth::guard('web')->user()->user_name}}</div>
      @if(\Illuminate\Support\Facades\Auth::guard('web')->user()->user_permissions==0)
      <div class="menu-list-content-item" onclick="window.open('/admin')">后台管理</div>
      @else
      <div class="menu-list-content-item" onclick="window.open('/personal_log')">个人文章</div>
      @endif
      <div class="menu-list-content-item">修改密码</div>
      <div class="menu-list-content-item" onclick='logout()'>退出登陆</div>
    </div>
    @else
    <ul class="header-unlogin clearfix">
      <li class="login">
        <img class="login-img" src="{{url('img/head/VIP.png')}}" alt="登录">
        <a href="{{url('login')}}">登陆</a>
      </li>
    </ul>
    @endif
    <div class="search-area">
      <input placeholder="请输入想要的搜索内容..." class="search-input" type="text">
      <div class="search-btn"><i class="iconfont icon-icon_sousuo"></i></div>
    </div>

  </div>
  <!-- 标题栏 -->
  <div class="top-title">
    <div class="top-content">
      <div class="top-content-name">
        <img src="{{url('img/head/logContent.png')}}" alt="">
        <span>添加日志！</span>
        <span>留下你的足迹！</span>
      </div>
      <div class="top-content-title">
        <div id="top-content-title1" contenteditable="true">请填写你的标题..</div>
        <div id="top-content-title2" contenteditable="true">请填写你的简介....</div>
      </div>

    </div>
  </div>
  <!-- 详情框 -->
  <div class="content">
    <div class="content-info">

      <div class="content-info-changeImg">
        <span>选择封面:</span>
        <div><img id="UpImg" src="{{url('img/head/shizhan1.jpg')}}" alt=""></div>
      </div>
      <div class="content-info-uploadVideo">
        <span>相关视频:</span>
        <div>
          <img id="videoUpload" src="{{url('img/head/video.png')}}" alt="">
        </div>
      </div>

      <p>请选择日志分类：</p>
      <select name="select" id="select" class="content-info-select">
        @foreach ($data as $item)
        @foreach ($item->all_child as $items)
        <option value="{{$items->category_id}}">{{$items->category_name}}</option>
        @endforeach
        @endforeach
      </select>
      <script id="editor" type="text/plain" style="width:1200px;height:500px;"></script>
      <div class="content-info-video">
        <div class="content-info-video-submit">
          <input type="button" id='sub' value="提交">
        </div>
      </div>
    </div>
  </div>

  <!-- 预览视频弹窗 -->
  <div id="myModal-video" class="modal">

    <!-- 弹窗内容 -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>播放视频</h2>
        <input type="file" id="fileUpload" style="display:none">
        <label class="uploadVideo" for="fileUpload">
          <h2>视频上传</h2>
        </label>
        <span class="updateTime">0%</span>
      </div>
      <div class="modal-body-video">
        <div class="" id="player" style="background:#ccc; height:500px; width:100%;">
        </div>
        <div class="prism-player player" id="J_prismPlayer"></div>
        <div>
        </div>
      </div>
    </div>

  </div>

  <!-- 选择封面弹窗 -->
  <div id="myModal-img" class="modal">
    <!-- 弹窗内容 -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>选择封面</h2>
      </div>
      <div class="modal-body-img">
        <div class="modal-body-img-list">
          <ul class="flow-default" id="LAY_demo1">
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- footer -->
  <div class="footer">
    <p>© 2019 成都东软学院项目组 版权所有 网络文化经营许可证：川网文[2019]0000-000号</p>
  </div>

  <!-- GotoTop -->
  <div class="gotoTop">
    <a href="{{url('log_edit')}}" class="gotoTop-bar">
      <img src="{{url('img/head/circle-add.png')}}" alt="">
      <span>添加日志</span>
    </a>
    <a href="{{url('personal_log')}}" class="gotoTop-bar">
      <img src="{{url('img/head/circle-location.png')}}" alt="">
      <span>个人主页</span>
    </a>
    <a href="javascript:;" class="gotoTop-name">
      <img src="{{url('img/head/circle-message.png')}}" alt="">
      <span>公众号</span>
      <div class="gotoTop-gzh"><img src="" alt=""></div>
    </a>
    <a id="goTop" href="javascript:;" class="gotoTop-bar">
      <img src="{{url('img/head/circle-arrow-up.png')}}" alt="">
      <span>返回顶部</span>
    </a>
  </div>
  <script type="text/javascript" src="{{url('static/head/js/jquery-3.2.0.min.js')}}"></script>
  <script type="text/javascript" src="{{url('packages/ueditor/ueditor.config.js')}}"></script>
  <script type="text/javascript" src="{{url('packages/ueditor/ueditor.all.min.js')}}"> </script>
  <script type="text/javascript" src="{{url('packages/ueditor/lang/zh-cn/zh-cn.js')}}"></script>
  <script type="text/javascript" src="{{url('static/admin/layui/layui.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/common.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/logout.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/logedit.js')}}"></script>
  <script type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"></script>
  <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/aliyun-upload-sdk-1.5.0.min.js')}}"></script>
  <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/lib/es6-promise.min.js')}}"></script>
  <script type="text/javascript" src="{{url('packages/aliyun-upload-sdk/lib/aliyun-oss-sdk-5.3.1.min.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/alterpassword.js')}}"></script>
  <script type="text/javascript" src="{{url('static/head/js/gototop.js')}}"></script>
</body>

</html>