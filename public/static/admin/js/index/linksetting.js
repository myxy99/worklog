/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 12:29:45
 */
$(function() {
    layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog'], function() {
        var form = layui.form(),
            layer = layui.layer,
            laypage = layui.laypage,
            $ = layui.jquery,
            dialog = layui.dialog;
        //分页
        laypage({
            cont: 'email-page',
            pages: 10,
            skin: '#1E9FFF'
        });
        form.on('checkbox(emailAllChoose)', function(data) {
            var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
            child.each(function(index, item) {
                item.checked = data.elem.checked;
            });
            form.render('checkbox');
        });
        form.render();

        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'get',
            url:"/admin/friend_ship_link/category",
            dataType: "json",
            success: function(data) {
                $('#linksetting-tbody').empty();
                if (data.code === 200) {
                    var text = '';
                    $(data.data.data).each(function(index, item) {
                        text += `
                        <tr>
                            <td class="hidden-xs">${item.friendship_link_title}</td>
                            <td><a href="javascript:;">${item.category_name}</a></td>
                            <td><a href="javascript:;">${item.friendship_link_click_url}</a></td>
                            <td class="hidden-xs">
                                <button class="layui-btn layui-btn-mini layui-btn-normal linksetting-edit-btn" data-id="1" data-url="linksetting_add"><i class="layui-icon">&#xe642;</i>修改</button>
                                <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.friendship_link_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                            </td>
                        </tr>`
                    })
                    $('#linksetting-tbody').append(text);
                }

            },
        });

        //列表删除
        $(document).on('click', '.del-btn', function() {
            let linksettingID = $(this).attr('data-id')
            dialog.confirm({
                message: '您确定要进行删除吗？',
                success: function() {
                    $.ajax({
                        type: 'Delete',
                        async: false,
                        url:"/admin/friend_ship_link/" + linksettingID,
                        dataType: "json",
                        success: function(data) {
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

    });
})