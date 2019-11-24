/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:32:50
 */
$(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog', 'upload'], function () {
    var form = layui.form(),
      layer = layui.layer,
      laypage = layui.laypage,
      $ = layui.jquery;
    var dialog = layui.dialog;

    // 页面初始化页码数
    var objNumService
    var pageNumService
    $.ajax({
      type: 'get',
      url: "/admin/upload_situation",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code === 200) {
          $('#uploadTime-tbody').empty()
          data.data.data.forEach(function (item) {
            let $uploadStr = `<tr>
									<td class="hidden-xs">${item.user_name}</td>
									<td><a href="javascript:;">${item.upload_times}</a></td>
									<td><a href="javascript:;">${item.last_upload_time}</a></td>
                </tr>`
            $('#uploadTime-tbody').append($uploadStr);
          })
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
          url: "/admin/upload_situation",
          dataType: "json",
          data: {
            page: obj.curr,
          },
          success: function (data) {
            if (data.code === 200) {
              $('#uploadTime-tbody').empty()
              data.data.data.forEach(function (item) {
                let $uploadStr = `<tr>
									<td class="hidden-xs">${item.user_name}</td>
									<td><a href="javascript:;">${item.upload_times}</a></td>
									<td><a href="javascript:;">${item.last_upload_time}</a></td>
                </tr>`
                $('#uploadTime-tbody').append($uploadStr);
              })
              // 总页数
              objNumService = data.data.total;
              pageNumService = Math.ceil(objNumService / 10);
            }
          },
        });
        if (!first) {
        }
      }
    });
  })
})