/*
 * @Description:
 * @Autor: YangZeMiao
 * @Date: 2019-10-21 12:54:02
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 14:28:41
 */
layui
  .config({
    base: "../../static/admin/js/module/"
  })
  .extend({
    dialog: "dialog"
  });

layui.use(
  ["form", "jquery", "laydate", "layer", "laypage", "dialog", "element"],
  function() {
    var form = layui.form(),
      layer = layui.layer,
      $ = layui.jquery,
      dialog = layui.dialog;
    var iframeObj = $(window.frameElement).attr("name");
    //渲染表单
    form.render();
    //列表添加
    //成员添加
    $("#table-list").on("click", ".member-add-btn", function() {
      var url = $(this).attr("data-url");
      layer.open({
        type: 2,
        title: "成员添加",
        area: ["400px", "400px"],
        fixed: false,
        maxmin: false,
        content: url,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //分类添加
    $("#table-list").on("click", ".classification-add-btn", function() {
      var url = $(this).attr("data-url");
      layer.open({
        type: 2,
        title: "分类添加",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //友联添加
    $("#table-list").on("click", ".linksetting-add-btn", function() {
      var url = $(this).attr("data-url");
      layer.open({
        type: 2,
        title: "友联添加",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //轮播图添加
    $("#table-list").on("click", ".carousel-add-btn", function() {
      var url = $(this).attr("data-url");
      layer.open({
        type: 2,
        title: "轮播图添加",
        area: ["500px", "510px"],
        fixed: false,
        maxmin: false,
        content: url,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //导航栏添加
    $("#table-list").on("click", ".navigation-add-btn", function() {
      var url = $(this).attr("data-url");
      layer.open({
        type: 2,
        title: "导航栏添加",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    // $("#table-list").on("click", ".path-add-btn", function() {
    //   //location.href = "path_add";
    // });

    // 下拉框选中
    var linkval;
    var linkvalID;
    linkval = $(".layui-select-title input").val();
    form.on("select(classify)", function(data) {
      form.render("select");
      linkval = $(".layui-select-title input").val();
    });

    //编辑栏目
    //成员编辑
    $("#table-list").on("click", ".member-edit-btn", function() {
      var That = $(this);
      var id = That.attr("data-id");
      var url = That.attr("data-url");
      layer.open({
        type: 2,
        title: "成员编辑",
        area: ["400px", "400px"],
        fixed: false,
        maxmin: false,
        content: url + "?id=" + id,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //分类编辑
    $("#table-list").on("click", ".classification-edit-btn", function() {
      var That = $(this);
      var id = That.attr("data-id");
      var url = That.attr("data-url");
      var bName = That.parent()
        .siblings("#bName")
        .html();
      var sName = That.parent()
        .siblings("#sName")
        .html();
      var json = '{"bName":"' + bName + '","sName":"' + sName + '"}';
      localStorage.setItem("json", json);
      layer.open({
        type: 2,
        title: "分类编辑",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url + "?id=" + id,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //友联编辑
    $("#table-list").on("click", ".linksetting-edit-btn", function() {
      var That = $(this);
      var id = That.attr("data-id");
      var url = That.attr("data-url");
      var linkname = That.parent()
        .siblings("#linkname")
        .text();
      var linkurl = That.parent()
        .siblings("#linkurl")
        .text();
      var json =
        '{"linkname":"' +
        linkname +
        '","linkval":"' +
        linkval +
        '","linkurl":"' +
        linkurl +
        '"}';
      localStorage.setItem("json", json);
      layer.open({
        type: 2,
        title: "分类编辑",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url + "?id=" + id,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //导航栏编辑
    $("#table-list").on("click", ".navigation-edit-btn", function() {
      var That = $(this);
      var id = That.attr("data-id");
      var url = That.attr("data-url");
      layer.open({
        type: 2,
        title: "导航栏编辑",
        area: ["300px", "300px"],
        fixed: false,
        maxmin: false,
        content: url + "?id=" + id,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    //轮播图编辑
    $("#table-list").on("click", ".carousel-edit-btn", function() {
      var That = $(this);
      var id = That.attr("data-id");
      var url = That.attr("data-url");
      layer.open({
        type: 2,
        title: "轮播图编辑",
        area: ["500px", "510px"],
        fixed: false,
        maxmin: false,
        content: url + "?id=" + id,
        end: function() {
          if (localStorage.getItem("isupdate") != "false") {
            location.reload();
          }
          localStorage.removeItem("isupdate");
        }
      });
      return false;
    });
    // $("#table-list").on("click", ".path-edit-btn", function() {
    //   location.href = "path_add";
    // });
  }
);

/**
 * 控制iframe窗口的刷新操作
 */
var iframeObjName;

//父级弹出页面
function page(title, url, obj, w, h) {
  if (title == null || title == "") {
    title = false;
  }
  if (url == null || url == "") {
    url = "404.html";
  }
  if (w == null || w == "") {
    w = "700px";
  }
  if (h == null || h == "") {
    h = "350px";
  }
  iframeObjName = obj;
  //如果手机端，全屏显示
  if (window.innerWidth <= 768) {
    var index = layer.open({
      type: 2,
      title: title,
      area: [320, h],
      fixed: false, //不固定
      content: url
    });
    layer.full(index);
  } else {
    var index = layer.open({
      type: 2,
      title: title,
      area: [w, h],
      fixed: false, //不固定
      content: url
    });
  }
}

/**
 * 刷新子页,关闭弹窗
 */
function refresh() {
  //根据传递的name值，获取子iframe窗口，执行刷新
  if (window.frames[iframeObjName]) {
    window.frames[iframeObjName].location.reload();
  } else {
    window.location.reload();
  }

  layer.closeAll();
}

function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}
