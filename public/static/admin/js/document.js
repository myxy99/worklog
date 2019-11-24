/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:10:57
 */
//搜索文章id 文章名 作者 分类
$(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog'], function () {
    var form = layui.form(),
      layer = layui.layer,
      laypage = layui.laypage,
      $ = layui.jquery;
    var dialog = layui.dialog;
    //分页

    // 文章可见状态的监听事件
    form.on('switch(status)', function (data) {
      let status;
      if (data.elem.checked == false) {
        status = 0;
      } else {
        status = 1;
      }
      $.ajax({
        type: "put",
        url: "/admin/articles/update_ban_state/" + $(data.elem).attr('data-article'),
        data: {
          article_ban_sate: status
        },
        dataType: "dataType",
        success: function (data) {

        }
      });
      form.render('checkbox');
    });
    // 文章置顶监听事件
    form.on('switch(top)', function (data) {
      let status1;
      if (data.elem.checked == false) {
        status1 = 0;
      } else {
        status1 = 1;
      }
      $.ajax({
        type: "put",
        url: "/admin/articles/update_top_state/" + $(data.elem).attr('data-article'),
        data: {
          article_top_sate: status1
        },
        dataType: "dataType",
        success: function (data) {

        }
      });
      form.render('checkbox');
    });

    // 页面初始化
    var objNumService
    var pageNumService
    $.ajax({
      type: 'get',
      url: "/admin/articles",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code === 200) {
          $('#document-management-tbody').empty();
          let $trStr;
          $(data.data.data).each(function (index, item) {
            // 设置是否为可见状态
            var checkStatus;
            if (item.article_state == 1) {
              checkStatus = true;
            } else {
              checkStatus = false;
            }
            // 设置是否置顶
            var stick;
            if (item.top_state == null) {
              stick = false;
            } else {
              stick = true;
            }
            $trStr += `<tr id='node-1' class="parent collapsed">
                        <td class="hidden-xs">${item.article_title}</td>
                        <td class="hidden-xs">${item.article_category_name}</td>
                        <td class="hidden-xs">${item.article_create_time}</td>
                        <td>${item.article_user_name}</td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${checkStatus}" data-article="${item.article_id}"  lay-filter="status" type="checkbox" name="close" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${stick}" data-article="${item.article_id}" type="checkbox" lay-filter="top" name="switch" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-inline">
                                <button type="button" data-article="${item.article_id}" class="deleteArticle layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i
                                        class="layui-icon">&#xe640;</i>删除</button>
                            </div>
                        </td>
                    </tr>`
          })
          $('#document-management-tbody').append($trStr);
          $('.true').click();
          form.render();

          // 总页数
          objNumService = data.data.total;
          pageNumService = Math.ceil(objNumService / 10);
        }
      },
    });

    //初始化页面跳转
    skipPage("/admin/articles", '');
    // 跳转页面
    function skipPage(urlAddress, content) {
      laypage({
        cont: 'email-page',
        pages: pageNumService,
        skin: '#1E9FFF',
        count: objNumService,
        limit: 10,
        jump: function (obj, first) {
          $.ajax({
            type: 'get',
            url: urlAddress,
            data: {
              page: obj.curr,
              search_content: content
            },
            dataType: "json",
            success: function (data) {
              if (data.code === 200) {
                $('#document-management-tbody').empty();
                let $trStr;
                $(data.data.data).each(function (index, item) {
                  // 设置是否为可见状态
                  var checkStatus;
                  if (item.article_state == 1) {
                    checkStatus = true;
                  } else {
                    checkStatus = false;
                  }
                  // 设置是否置顶
                  var stick;
                  if (item.top_state == null) {
                    stick = false;
                  } else {
                    stick = true;
                  }
                  $trStr += `<tr id='node-1' class="parent collapsed">
                        <td class="hidden-xs">${item.article_title}</td>
                        <td class="hidden-xs">${item.article_category_name}</td>
                        <td class="hidden-xs">${item.article_create_time}</td>
                        <td>${item.article_user_name}</td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${checkStatus}" data-article="${item.article_id}"  lay-filter="status" type="checkbox" name="close" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${stick}" data-article="${item.article_id}" type="checkbox" lay-filter="top" name="switch" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-inline">
                                <button type="button"  data-article="${item.article_id}"  class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i
                                        class="layui-icon">&#xe640;</i>删除</button>
                            </div>
                        </td>
                    </tr>`
                })
                $('#document-management-tbody').append($trStr);
                $('.true').click();
                form.render();
                // 总页数
                objNumService = data.data.total;
                pageNumService = Math.ceil(objNumService / 10);
              }
            },
          });
          if (!first) {
            //do something
          }
        }
      });
    }


    // 搜索文章
    $(document).on("click", '#search-article', function () {
      let inputStr = $('#search-input').val();
       
      if ($("#search-input").val()==''){
        layer.msg("请输入搜索内容！", {
                  icon: 0,
                  time: 800
            }, function () {
                 
          });
          return;
      }
        $.ajax({
          type: "get",
          async: false,
          url: "/admin/articles/search",
          dataType: "json",
          data: {
            search_content: inputStr
          },
          success: function(data) {
            $("#document-management-tbody").empty();
            if (data.code === 200) {
              if(data.data.data != ''){
                let $trStr;
                $(data.data.data).each(function(index, item) {
                  // 设置是否为可见状态
                  var checkStatus;
                  if (item.article_state == 1) {
                    checkStatus = true;
                  } else {
                    checkStatus = false;
                  }
                  // 设置是否置顶
                  var stick;
                  if (item.top_state == null) {
                    stick = false;
                  } else {
                    stick = true;
                  }
                  $trStr += `<tr id='node-1' class="parent collapsed">
                        <td class="hidden-xs">${item.article_title}</td>
                        <td class="hidden-xs">${item.article_category_name}</td>
                        <td class="hidden-xs">${item.article_create_time}</td>
                        <td>${item.article_user_name}</td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${checkStatus}" data-article="${item.article_id}"  lay-filter="status" type="checkbox" name="close" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <input class="${stick}" data-article="${item.article_id}" type="checkbox" lay-filter="top" name="switch" lay-skin="switch">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="layui-inline">
                                <button type="button"  data-article="${item.article_id}" class="deleteArticle layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i
                                class="layui-icon">&#xe640;</i>删除</button>
                            </div>
                        </td>
                    </tr>`;
                });
                $("#document-management-tbody").append($trStr);
                $(".true").click();
                // 总页数
                objNumService = data.data.total;
                pageNumService = Math.ceil(objNumService / 10);
                // 跳转页面
                skipPage("/admin/articles/search", inputStr);
              }else{
                $("#email-page").css("display", "none");
                layer.msg(
                  "没有搜索内容！",
                  {
                    icon: 0,
                    time: 800
                  },
                  function() {
                    
                  }
                );
                return;
              }
            }
          }
        });
    })

    //列表删除
    $(document).on('click', '.del-btn', function () {
      let articleID = $(this).attr('data-article')
      var url = $(this).attr('data-url');
      var id = $(this).attr('data-id');
      dialog.confirm({
        message: '您确定要进行删除吗？',
        success: function () {
          console.log($(this))
          $.ajax({
            type: 'Delete',
            async: false,
            url: "/admin/articles/" + articleID,
            dataType: "json",
            success: function (data) {
              if (data.code === 200) {
                layer.msg(data.msg, {
                  icon: 1,
                  time: 800
                }, function () {
                  location.reload(true)
                });
              }
            },
            error: function (error) {
              let text = '服务器错误！';
              if (error.status === 422) {
                text = ''
                error.responseJSON.data.forEach(function (a) {
                  text += a + '<br>';
                });
              } else if (error.status === 403) {
                text = error.responseJSON.msg;
              }
              layer.alert(text, {
                icon: 2
              });
            }
          });
        },
      })
      return false;
    })

    $(document).on("click", "#shuaxin",function () {  
          //初始化页面跳转
    skipPage("/admin/articles", '');
    });

  });
})