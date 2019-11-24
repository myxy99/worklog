/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 21:45:16
 */
$(function() {
    layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog'], function() {
        var form = layui.form(),
            $ = layui.jquery,
            dialog = layui.dialog;
        form.render();
        var laypage = layui.laypage

        // 分页初始化值
        var pageNum;
        var allData;


        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'get',
            async: false,
            url:  "/admin/navigaion_columns",
            dataType: "json",
            success: function(data) {
                $('#navigation-tbody').empty();
                if (data.code === 200) {

                    allData = data.data.total;
                    pageNum = Math.ceil(allData / 10);

                    var text = '';
                    $(data.data.data).each(function(index, item) {
                        text += `
                        <tr>
                            <td class="hidden-xs">${item.navigation_columns_name}</td>
                            <td><a href="javascript:;"></a>${item.navigation_jump_url}</td>
                            <td class="hidden-xs">
                                <button class="layui-btn layui-btn-mini layui-btn-normal navigation-edit-btn" data-id="${item.navigation_id}" data-url="navigation_add"><i class="layui-icon">&#xe642;</i>修改</button>
                                <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.navigation_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                            </td>
                        </tr>`
                    })
                    $('#navigation-tbody').append(text);
                }

            },
        });

        //删除操作
        $(document).on('click', '.del-btn', function() {
            let navigationID = $(this).attr('data-id')
            dialog.confirm({
                message: '您确定要进行删除吗？',
                success: function() {
                    $.ajax({
                        type: 'Delete',
                        async: false,
                        url:"/admin/navigaion_columns/" + navigationID,
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


        // 分页
        laypage({
            cont: 'demo3',
            pages: pageNum,
            skin: '#1E9FFF',
            count: allData,
            limit: 10,
            jump: function(obj, first) {
                $.ajax({
                    type: 'get',
                    url: '/admin/navigaion_columns',
                    dataType: "json",
                    data: {
                        page: obj.curr
                    },
                    success: function(data) {
                        $('#navigation-tbody').empty();
                        if (data.code === 200) {

                            allData = data.data.total;
                            pageNum = Math.ceil(allData / 10);

                            var text = '';
                            $(data.data.data).each(function(index, item) {
                                text += `
                                <tr>
                                    <td class="hidden-xs">${item.navigation_columns_name}</td>
                                    <td><a href="javascript:;"></a>${item.navigation_jump_url}</td>
                                    <td class="hidden-xs">
                                        <button class="layui-btn layui-btn-mini layui-btn-normal navigation-edit-btn" data-id="${item.navigation_id}" data-url="navigation_add"><i class="layui-icon">&#xe642;</i>修改</button>
                                        <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.navigation_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                                    </td>
                                </tr>`
                            })
                            $('#navigation-tbody').append(text);
                        }
                    },
                })
            }
        })

    });

})