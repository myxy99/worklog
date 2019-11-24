/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:33:46
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

    // 页面初始化
    var objNumService
    var pageNumService
    // 跳转页面
    laypage({
      cont: 'email-page',
      pages: pageNumService,
      skin: '#1E9FFF',
      count: objNumService,
      limit: 10,
      jump: function (obj, first) {
        $.ajax({
          type: 'get',
          url: '/admin/friend_ship_link/category/10',
          dataType: "json",
          data: {
            page: obj.curr
          },
          async: false,
          success: function (data) {
            if (data.code === 200) {
              $('#linkSetting-tbody').empty();
              let $trStr;
              $(data.data.data).each(function (index, item) {
                $trStr += `	
                <tr>
                  <td class="hidden-xs">${item.friendship_link_title}</td>
                  <td><a href="javascript:;">${item.friendship_link_click_url}</a></td>
                  <td class="hidden-xs">
                    <button class="layui-btn layui-btn-mini layui-btn-normal linksetting-edit-btn" data-id="1"
                      data-url="{{url('admin/linksetting_add')}}"><i class="layui-icon">&#xe642;</i>修改</button>
                    <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1"><i
                    class="layui-icon">&#xe640;</i>删除</button>
                  </td>
                </tr>`
              })
              $('#linkSetting-tbody').append($trStr);
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

    linkInit(1);

    function linkInit(pageNum) {
      $.ajax({
        type: 'get',
        url: '/admin/friend_ship_link/category/' + pageNum,
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code === 200) {
            $('#linkSetting-tbody').empty();
            let $trStr;
            $(data.data.data).each(function (index, item) {
              $trStr += `	
               <tr>
                <td class="hidden-xs" id="linkname">${item.friendship_link_title}</td>
                <td id="linkurl">${item.friendship_link_click_url}</td>
                <td class="hidden-xs">
                  <button class="layui-btn layui-btn-mini layui-btn-normal linksetting-edit-btn" data-id="${item.friendship_link_id}" data-url="linksetting_add"><i class="layui-icon">&#xe642;</i>修改</button>
                  <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.friendship_link_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                </td>
              </tr>`;
            })
            $('#linkSetting-tbody').append($trStr);
            form.render();
            // 总页数
            objNumService = data.data.total;
            pageNumService = Math.ceil(objNumService / 10);
          }
        },
      });
    }

    //列表删除
    $(document).on('click', '.del-btn', function () {
      let linksettingID = $(this).attr('data-id')
      dialog.confirm({
        message: '您确定要进行删除吗？',
        success: function () {
          $.ajax({
            type: 'Delete',
            async: false,
            url: "/admin/friend_ship_link/" + linksettingID,
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

    // 学习路线分类
    // 获取分类信息
    $.ajax({
      type: 'get',
      url: "/head/get_classify_bar",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code === 200) {
          $('#linkSetting-select').empty();
          let $optionStr;
          $(data.data).each(function (index, item) {
            $optionStr += `<option  value="${item.category_id}">${item.category_name}</option>`;
          })
          $('#linkSetting-select').append($optionStr);
          form.render('select');
        }
        form.render('select');
      },
    });


    //select分类点击
    form.on("select(changeClassify)", function (data) {
      $.ajax({
        type: "get",
        url: "/admin/friend_ship_link/category/" + data.value,
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code === 200) {
            $("#linkSetting-tbody").empty();
            let $trStr;
            $(data.data.data).each(function (index, item) {
              $trStr += `	
              <tr>
               <td class="hidden-xs" id="linkname">${item.friendship_link_title}</td>
               <td id="linkurl">${item.friendship_link_click_url}</td>
               <td class="hidden-xs">
                 <button class="layui-btn layui-btn-mini layui-btn-normal linksetting-edit-btn" data-id="${item.friendship_link_id}" data-url="linksetting_add"><i class="layui-icon">&#xe642;</i>修改</button>
                 <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.friendship_link_id}"><i class="layui-icon">&#xe640;</i>删除</button>
               </td>
             </tr>`;
            });
            $("#linkSetting-tbody").append($trStr);
            form.render();
            // 总页数
            objNumService = data.data.total;
            pageNumService = Math.ceil(objNumService / 10);
          }
        },
      });
    });
  });
})