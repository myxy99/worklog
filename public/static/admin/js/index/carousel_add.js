/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 10:12:01
 */
$(function () {
    localStorage.setItem("isupdate", false);
    let carouselID = getPar('id');
    layui.use(['form', 'layer'], function () {
        var form = layui.form();
        layer = layui.layer;
        if (carouselID) {
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'get',
                url: "/admin/rotations/" + carouselID,
                dataType: "json",
                success: function (data) {
                    $('.carousel-image img').attr('src', '/' + data.data.rotation_picture_url);
                    $('input').eq(1).val(data.data.rotation_click_url);
                    form.render();
                },
            });
        }else{
            form.render();
        }
        form.on('submit(formDemo)', function(data) {
            if (carouselID) {
                update();
            } else {
                add();
            }
        })
        //添加操作
        function add() {
            var form = document.getElementById("uploadF");
            var formData = new FormData(form);
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                url: '/admin/rotations',
                type: 'post',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    
                    if (data.code === 200) {
                        localStorage.setItem("isupdate", true);
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 800
                        },function () {
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

        //修改操作
        function update() {
            var form = document.getElementById("uploadF");
            var formData = new FormData(form);
            $.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
            $.ajax({
                type: 'post',
                url: '/admin/rotations/update/' + carouselID,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.code === 200) {
                        localStorage.setItem("isupdate", true);
                        layer.msg(data.msg, {
                            icon: 1,
                            time: 800
                        },function () {
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index); //再执行关闭  
                        });
                    }
                    return;
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

    })
});

function selectImage(file) {
    $('#carouselcode').empty();
    if (!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var img = document.createElement('img');
        img.src = evt.target.result;
        $('#carouselcode').append(img);
    }
    reader.readAsDataURL(file.files[0]);
}

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