/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 12:29:26
 */
$(function () {
    $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
    layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog'], function () {
        var form = layui.form(),
            layer = layui.layer,
            laypage = layui.laypage,
            $ = layui.jquery,
            dialog = layui.dialog;

        // 分页初始化值
        var pageNum;
        var allData;

        form.on('checkbox(emailAllChoose)', function (data) {
            var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
            child.each(function (index, item) {
                item.checked = data.elem.checked;
            });
            form.render('checkbox');
        });

        form.render();


        $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
        $.ajax({
            type: 'get',
            url: "/admin/rotations",
            dataType: "json",
            async: false,
            success: function (data) {
                $('#carousel-tbody').empty();
                if (data.code === 200) {
                    allData = data.data.total;
                    pageNum = Math.ceil(allData / 10);

                    var text = '';
                    $(data.data.data).each(function (index, item) {
                        text += `
                        <tr>
                            <td class="hidden-xs url">
                                <img class="cover-img" src="/${item.rotation_picture_url}" />
                            </td>
                            <td><a href="javascript:;">${item.rotation_click_url}</a></td>
                            <td class="hidden-xs">
                                <button class="layui-btn layui-btn-mini layui-btn-normal carousel-edit-btn" data-url="carousel_add" data-id="${item.rotation_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.rotation_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                            </td>
                        </tr>`
                    })
                    $('#carousel-tbody').append(text);
                }

            },
        });

        //列表删除
        $(document).on('click', '.del-btn', function () {
            let rotationID = $(this).attr('data-id')
            dialog.confirm({
                message: '您确定要进行删除吗？',
                success: function () {
                    $.ajax({
                        type: 'delete',
                        async: false,
                        url:"/admin/rotations/" + rotationID,
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



        // 分页
        laypage({
            cont: 'email-page1',
            pages: pageNum,
            skin: '#1E9FFF',
            count: allData,
            limit: 10,
            jump: function (obj, first) {
                $.ajax({
                    type: 'get',
                    url:"/admin/rotations",
                    dataType: "json",
                    data: {
                        page: obj.curr
                    },
                    success: function (data) {
                        $('#carousel-tbody').empty();
                        if (data.code === 200) {
                            allData = data.data.total;
                            pageNum = Math.ceil(allData / 10);
                            var text = '';
                            $(data.data.data).each(function (index, item) {
                                text += `
                                <tr>
                                    <td class="hidden-xs url">
                                        <img class="cover-img" src="/${item.rotation_picture_url}" />
                                    </td>
                                    <td><a href="javascript:;">${item.rotation_click_url}</a></td>
                                    <td class="hidden-xs">
                                        <button class="layui-btn layui-btn-mini layui-btn-normal carousel-edit-btn" data-url="carousel_add" data-id="${item.rotation_id}"><i class="layui-icon">&#xe642;</i>修改</button>
                                        <button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="${item.rotation_id}"><i class="layui-icon">&#xe640;</i>删除</button>
                                    </td>
                                </tr>`
                            })
                            $('#carousel-tbody').append(text);
                        }
                    },
                });
            }
        })
    });
})