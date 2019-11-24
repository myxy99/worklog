/*
 * @Description:
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:31:56
 */
//搜索文章id 文章名 作者 分类
$(function() {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });
  layui.use(["form", "laypage", "jquery", "layer", "dialog"], function() {
    var form = layui.form(),
      layer = layui.layer,
      laypage = layui.laypage,
      $ = layui.jquery;
    var dialog = layui.dialog;
    var objNumService; //全局的变量
    var pageNumService;
    $.ajax({
      type: "get",
      url: "/admin/study_routes",
      dataType: "json",
      async: false,
      success: function(data) {
        if (data.code === 200) {
          $("#path-tbody").empty();
          let $trStr;
          $(data.data.data).each(function(index, item) {
            $trStr += `<tr>
                        <td class="hidden-xs">${item.study_route_title}</td>
                        <td><a href="javascript:;">${item.category_name}</a></td>
                        <td><a href="javascript:;">${item.study_route_create_time}</a></td>
                        <td class="hidden-xs">
                        <button data-routeId="${item.study_route_id}"  class="alertRoute layui-btn layui-btn-mini layui-btn-normal path-edit-btn" data-id="1" data-url="{{url('admin/path_add')}}"><i class="layui-icon">&#xe642;</i>修改</button>
                            <button data-routeId="${item.study_route_id}" class="deleteRoute layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i class="layui-icon">&#xe640;</i>删除</button>
                        </td>
                    </tr>`;
          });
          $("#path-tbody").append($trStr);
          form.render();
          objNumService = data.data.total; //得到总的数量
          pageNumService = Math.ceil(objNumService / 10);
        }
      }
    });

    //初始化页面跳转
    skipPage("/admin/study_routes", "");
    // 跳转页面
    function skipPage(urlAddress, content) {
      laypage({
        cont: "email-page",
        pages: pageNumService,
        skin: "#1E9FFF",
        count: objNumService,
        limit: 10,
        jump: function(obj, first) {
          //分页的回调函数
          $.ajax({
            type: "get",
            url: urlAddress,
            data: {
              page: obj.curr
            },
            dataType: "json",
            async: false,
            success: function(data) {
              if (data.code === 200) {
                $("#path-tbody").empty();
                let $trStr;
                $(data.data.data).each(function(index, item) {
                  $trStr += `<tr>
                        <td class="hidden-xs">${item.study_route_title}</td>
                        <td><a href="javascript:;">${item.category_name}</a></td>
                        <td><a href="javascript:;">${item.study_route_create_time}</a></td>
                        <td class="hidden-xs">
                        <button data-routeId="${item.study_route_id}"  class="alertRoute layui-btn layui-btn-mini layui-btn-normal path-edit-btn" data-id="1" data-url="{{url('admin/path_add')}}"><i class="layui-icon">&#xe642;</i>修改</button>
                            <button data-routeId="${item.study_route_id}" class="deleteRoute layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i class="layui-icon">&#xe640;</i>删除</button>
                        </td>
                    </tr>`;
                });
                $("#path-tbody").append($trStr);
                form.render();

                // 总页数
                objNumService = data.data.total;
                pageNumService = Math.ceil(objNumService / 10);
              }
            }
          });
          if (!first) {
            //do something
          }
        }
      });
    }

    //点击修改
    $(document).on("click", ".alertRoute", function() {
      window.location.href = "path_add?routeId=" + $(this).attr("data-routeId");
    });

    //增加学习路线
    $(document).on("click", "#addRoute", function() {
      window.location.href = "path_add";
    });

    // 点击删除
    $(document).on("click", ".deleteRoute", function() {
      let learnPathId = $(this).attr("data-routeId");
      dialog.confirm({
        message: "您确定要进行删除吗？",
        success: function() {
          $.ajax({
            type: "delete",
            url: "/admin/study_routes/" + learnPathId,
            dataType: "json",
            async: false,
            success: function(data) {
              console.log(data);
              if (data.code === 200) {
                layer.msg(
                  data.msg,
                  {
                    icon: 1,
                    time: 800
                  },
                  function() {
                    history.go(0);
                  }
                );
              }
            },
            error: function(error) {
              let text = "服务器错误！";
              if (error.status === 422) {
                text = "";
                error.responseJSON.data.forEach(function(a) {
                  text += a + "<br>";
                });
              } else if (error.status === 403) {
                text = error.responseJSON.msg;
              }
              layer.alert(text, {
                icon: 2
              });
            }
          });
        }
      });
      return false;
    });

    // 学习路线分类
    // 获取分类信息
    $.ajax({
      type: "get",
      url: "/head/get_classify_bar",
      dataType: "json",
      async: false,
      success: function(data) {
        if (data.code === 200) {
          $("#pathChangeClass").empty();
          let $optionStr;
          $optionStr += `<option value="">请选择一个分类...</option>`;
          $(data.data).each(function(index, item) {
            $optionStr += `<option value="${item.category_id}">${item.category_name}</option>`;
          });
          $("#pathChangeClass").append($optionStr);
          form.render("select");
        }
        form.render("select");
      }
    });

    form.on("select(changeClassify)", function(data) {
      let classifyName = data.value;
      $.ajax({
        type: "get",
        url: "/admin/study_routes/categorys/" + data.value,
        dataType: "json",
        async: false,
        success: function(data) {
          if (data.code === 200) {
            $("#path-tbody").empty();
            let $trStr;
            $(data.data.data).each(function(index, item) {
              $trStr += `<tr>
                           <td class="hidden-xs">${item.study_route_title}</td>
                           <td><a href="javascript:;">${item.category_name}</a></td>
                           <td><a href="javascript:;">${item.study_route_create_time}</a></td>
                           <td class="hidden-xs">
                           <button data-routeId="${item.study_route_id}"  class="alertRoute layui-btn layui-btn-mini layui-btn-normal path-edit-btn" data-id="1" data-url="{{url('admin/path_add')}}"><i class="layui-icon">&#xe642;</i>修改</button>
                               <button data-routeId="${item.study_route_id}" class="deleteRoute layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i class="layui-icon">&#xe640;</i>删除</button>
                           </td>
                       </tr>`;
            });
            $("#path-tbody").append($trStr);
            form.render();
            // 总页数
            objNumService = data.data.total;
            pageNumService = Math.ceil(objNumService / 10);
            $("#path-tbody").empty();
            laypage({
              cont: "email-page",
              pages: pageNumService,
              skin: "#1E9FFF",
              count: objNumService,
              limit: 10,
              jump: function(obj, first) {
                //分页的回调函数
                $.ajax({
                  type: "get",
                  url: "/admin/study_routes/categorys/" + classifyName,
                  data: {
                    page: obj.curr
                  },
                  dataType: "json",
                  async: false,
                  success: function(data) {
                    if (data.code === 200) {
                      if (data.data.data == "") {
                        layer.msg(
                          "没有分类内容",
                          {
                            icon: 0,
                            time: 800
                          },
                          function() {}
                        );
                        return;
                      }

                      let $trStr;
                      $(data.data.data).each(function(index, item) {
                        $trStr += `<tr>
                        <td class="hidden-xs">${item.study_route_title}</td>
                        <td><a href="javascript:;">${item.category_name}</a></td>
                        <td><a href="javascript:;">${item.study_route_create_time}</a></td>
                        <td class="hidden-xs">
                        <button data-routeId="${item.study_route_id}"  class="alertRoute layui-btn layui-btn-mini layui-btn-normal path-edit-btn" data-id="1" data-url="{{url('admin/path_add')}}"><i class="layui-icon">&#xe642;</i>修改</button>
                            <button data-routeId="${item.study_route_id}" class="deleteRoute layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i class="layui-icon">&#xe640;</i>删除</button>
                        </td>
                    </tr>`;
                      });
                      $("#path-tbody").append($trStr);
                      form.render();

                      // 总页数
                      objNumService = data.data.total;
                      pageNumService = Math.ceil(objNumService / 10);
                    }
                  }
                });
                if (!first) {
                  //do something
                }
              }
            });
          } else {
            layer.msg(
              "没有分类内容",
              {
                icon: 0,
                time: 800
              },
              function() {}
            );
          }
        },
        error: function(error) {
          let text = "服务器错误！";
          if (error.status === 422) {
            text = "";
            error.responseJSON.data.forEach(function(a) {
              text += a + "<br>";
            });
          } else if (error.status === 403) {
            text = error.responseJSON.msg;
          }
          layer.alert(text, {
            icon: 2
          });
        }
      });
    });
  });
});
