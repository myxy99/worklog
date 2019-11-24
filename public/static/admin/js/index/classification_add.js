/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 09:36:50
 */
$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    layui.use(['form', 'layer'], function () {
        var form = layui.form();
        layer = layui.layer;
        localStorage.setItem("isupdate", false);
        let categorysID = getPar('id');
        if (categorysID) {

            var json = JSON.parse(localStorage.getItem("json"));
            $('input').eq(0).val(json.bName);
            $('input').eq(1).val(json.sName);

            localStorage.removeItem("json");
            form.render();

        }
        //用form.on()方法可以组织，当layui验证不通过时的请求
        form.on('submit(formDemo)', function (data) {
            if (categorysID) {
                update();
            } else {
                add();
            }
        })

        //添加操作
        function add() {
            category_big_name = $('input').eq(0).val();
            category_name = $('input').eq(1).val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'post',
                url: '/admin/categorys',
                data: {
                    'category_big_name': category_big_name,
                    'category_name': category_name
                },
                dataType: 'json',
                success: function (data) {
                    localStorage.setItem("isupdate", true);
                    if (data.code === 200) {
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 800
                        }, function () {
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index); //再执行关闭  
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

        }

        //修改操作
        function update() {
            category_big_name = $('input').eq(0).val();
            category_name = $('input').eq(1).val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'put',
                url: '/admin/categorys/' + categorysID,
                data: {
                    'category_big_name': category_big_name,
                    'category_name': category_name
                },
                dataType: 'json',
                success: function (data) {
                    localStorage.setItem("isupdate", true);
                    if (data.code === 200) {
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 800
                        }, function () {
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

                            parent.layer.close(index); //再执行关闭  
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

        }
    });

    function getPar(par) {
        //获取当前URL
        var local_url = document.location.href;
        //获取要取得的get参数位置
        var get = local_url.indexOf(par + "=");
        if (get == -1) {
            return false;
        }
        //截取字符串
        var get_par = local_url.slice(par.length + get + 1);
        //判断截取后的字符串是否还有其他get参数
        var nextPar = get_par.indexOf("&");
        if (nextPar != -1) {
            get_par = get_par.slice(0, nextPar);
        }
        return get_par;
    }

})