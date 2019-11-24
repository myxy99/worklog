/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:20:19
 */
$(function () {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  layui.use(['form', 'laypage', 'jquery', 'layer', 'upload', 'dialog'], function () {
    var form = layui.form(),
      layer = layui.layer,
      laypage = layui.laypage,
      $ = layui.jquery;
    var dialog = layui.dialog;




    $('#uploadFile').change(function () {
      formData = new FormData(document.getElementById("uploadF"));
      // 上传图片
      $.ajax({
        type: "post",
        url: '/admin/cover_pictures',
        data: formData,
        datatype: 'json',
        cache: false,
        traditional: true,
        contentType: false,
        processData: false,
        success: function (res) {
          layer.msg('上传图片成功！', {
            icon: 1,
            time: 800
          }, function () {
            location.reload();
          });
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
    })

    // 页面初始化
    var objNumService
    var pageNumService
    $.ajax({
      type: 'get',
      url: "/admin/cover_pictures",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code === 200) {
          $('#cover-tbody').empty();
          let $trStr;
          $(data.data.data).each(function (index, item) {
            $trStr += `<tr>
                        <td class="hidden-xs">
                            < img class = "cover-img"
                            src = "/${item.cover_picture_url}"/>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <button type="button" data-coverID="${item.cover_picture_id}" class="layui-btn del-btn layui-btn-mini layui-btn-danger"><i
                                    class="layui-icon">&#xe640;</i>删除</button>
                                </div>
                            </div>
                        </td>
                    </tr>`
          })
          $('#cover-tbody').append($trStr);
          form.render();
          // 总页数
          objNumService = data.data.total;
          pageNumService = Math.ceil(objNumService / 10);

        }
      },
    });
    // 分页
    laypage({
      cont: 'email-page',
      pages: pageNumService,
      skin: '#1E9FFF',
      count: objNumService,
      limit: 10,
      jump: function (obj, first) {
        $.ajax({
          type: 'get',
          url: "/admin/cover_pictures",
          data: {
            page: obj.curr,
          },
          dataType: "json",
          success: function (data) {
            if (data.code === 200) {
              $('#cover-tbody').empty();
              let $trStr;
              $(data.data.data).each(function (index, item) {
                $trStr += `<tr>
                        <td class="hidden-xs">
                            <img class = "cover-img"
                            src="/${item.cover_picture_url}"/>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="layui-form" action="">
                                <div class="layui-form-item">
                                    <button type="button" data-coverID="${item.cover_picture_id}" class="del-btn layui-btn layui-btn-mini layui-btn-danger"><i
                                    class="layui-icon">&#xe640;</i>删除</button>
                                </div>
                            </div>
                        </td>
                    </tr>`
              })
              $('#cover-tbody').append($trStr);
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

    //列表删除
    $(document).on('click', '.del-btn', function () {
      let articleID = $(this).attr('data-coverID')
      var url = $(this).attr('data-url');
      var id = $(this).attr('data-id');
      dialog.confirm({
        message: '您确定要进行删除吗？',
        success: function () {
          $.ajax({
            type: 'Delete',
            async: false,
            url: "/admin/cover_pictures/" + articleID,
            dataType: "json",
            success: function (data) {
              if (data.code === 200) {
                layer.msg(data.msg, {
                  icon: 1,
                  time: 800
                }, function () {
                  location.reload();
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


    $('.uploadeImg').click(function () {
      $('#uploadFile').click();
    })

  })
})