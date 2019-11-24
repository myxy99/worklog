/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 12:30:01
 */
$(function() {
    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
    layui.use(['jquery', 'layer', 'form', 'dialog', 'laypage'], function() {
        var $ = layui.jquery;
        const layer = layui.layer;
        var form = layui.form();
        dialog = layui.dialog;
        var laypage = layui.laypage

        // 分页初始化值
        var pageNum;
        var allData;
        $.ajax({
            type: 'get',
            url: "/admin/users",
            dataType: "json",
            async: false,
            success: function(data) {
                $('#member-tbody').empty();
                if (data.code === 200) {
                    allData = data.data.total;
                    pageNum = Math.ceil(allData / 10);

                    var text = '';
                    for (let i = 0; i < data.data.data.length; i++) {
                        let str;
                        if (data.data.data[i].user_permissions == 1) {
                            str = `<td><button disabled style="cursor:default" class="layui-btn layui-btn-mini layui-btn-normal table-list-status" data-status='1'>可读</button></td>`
                        } else {
                            str = `<td><button disabled style="cursor:default" class="layui-btn layui-btn-mini table-list-status" data-status='2'>可读可写</button></td>`
                        }

                        text += `
                        <tr id='node-1' class="parent collapsed">
                            <td class="hidden-xs">${data.data.data[i].user_name}</td>
                            <td class="hidden-xs">${data.data.data[i].user_student_number}</td>
                            <td class="hidden-xs">${data.data.data[i].user_major}</td>
                            <td>${data.data.data[i].user_grade}</td>
                            ${str}
                            <td>
                                <div class="layui-inline">
                                    <button class="layui-btn layui-btn-mini layui-btn-normal member-edit-btn" data-url="member_add" data-id="${data.data.data[i].user_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                    <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${data.data.data[i].user_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                                    <button class="layui-btn layui-btn-mini layui-btn-warm member-reset-btn" data-id="${data.data.data[i].user_id}">重置密码</button>
                                </div>
                            </td>
                        </tr>`

                    }
                }
                $('#member-tbody').append(text);
                form.render();
            },
        });


        //列表删除
        $(document).on('click', '.del-btn', function() {
            let usersID = $(this).attr('data-id')
            dialog.confirm({
                message: '您确定要进行删除吗？',
                success: function() {
                    $.ajax({
                        type: 'Delete',
                        async: false,
                        url:"/admin/users/" + usersID,
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


        //重置按钮
        $('#table-list').on('click', '.member-reset-btn', function() {
            let userid = $(this).attr('data-id')
            $.ajax({
                type: 'put',
                url: "/admin/users/reset_password/" + userid,
                dataType: "json",
                success: function(data) {
                    if (data.code === 200) {
                        layer.msg('该用户密码已重置为初始密码：123456', {
                          icon: 1,
                          time: 800
                        }, function () {
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
            })
        })

        // 分页
        laypage({
            cont: 'demo1',
            pages: pageNum,
            skin: '#1E9FFF',
            count: allData,
            limit: 10,
            jump: function(obj, first) {
                $.ajax({
                    type: 'get',
                    url: '/admin/users',
                    dataType: "json",
                    data: {
                        page: obj.curr
                    },
                    success: function(data) {
                        $('#member-tbody').empty();
                        if (data.code === 200) {


                            allData = data.data.total;
                            pageNum = Math.ceil(allData / 10);

                            var text = '';
                            for (let i = 0; i < data.data.data.length; i++) {
                                let str;
                                if (data.data.data[i].user_permissions == 1) {
                                    str = `<td><button disabled style="cursor:default" class="layui-btn layui-btn-mini layui-btn-normal table-list-status" data-status='1'>可读</button></td>`
                                } else {
                                    str = `<td><button disabled style="cursor:default" class="layui-btn layui-btn-mini table-list-status" data-status='2'>可读可写</button></td>`
                                }

                                text += `
                        <tr id='node-1' class="parent collapsed">
                            <td class="hidden-xs">${data.data.data[i].user_name}</td>
                            <td class="hidden-xs">${data.data.data[i].user_student_number}</td>
                            <td class="hidden-xs">${data.data.data[i].user_major}</td>
                            <td>${data.data.data[i].user_grade}</td>
                            ${str}
                            <td>
                                <div class="layui-inline">
                                    <button class="layui-btn layui-btn-mini layui-btn-normal member-edit-btn" data-url="member_add" data-id="${data.data.data[i].user_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                    <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${data.data.data[i].user_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                                    <button class="layui-btn layui-btn-mini layui-btn-warm member-reset-btn" data-id="${data.data.data[i].user_id}">重置密码</button>
                                </div>
                            </td>
                        </tr>`

                            }
                        }
                        $('#member-tbody').append(text);
                        form.render();

                    },
                })
            }
        })
    });

});