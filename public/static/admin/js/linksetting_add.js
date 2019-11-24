/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 09:38:02
 */
$(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  localStorage.setItem("isupdate", false);
  let linksettingID = getPar("id");
  layui.use(["form", "layer"], function () {
    var form = layui.form(),
      layer = layui.layer;

    var linkvalue;
    if (linksettingID) {
      // 获取分类信息
      $.ajax({
        type: 'get',
        url: "/head/get_classify_bar",
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code === 200) {
            $("#linkaddselect").empty();
            let $optionStr;
            $(data.data).each(function (index, item) {
              if (item.category_name == linkvalue) {
                $optionStr += `<option selected  value="${item.category_id}">${item.category_name}</option>`;
              } else {
                $optionStr += `<option  value="${item.category_id}">${item.category_name}</option>`;
              }
            })
            $("#linkaddselect").append($optionStr);
            form.render('select');
          }
          form.render('select');
        },
      });
      var json = JSON.parse(localStorage.getItem("json"));
      $('#linknameadd').val(json.linkname);
      linkvalue = json.linkval;
      $('#linkurladd').val(json.linkurl);
      localStorage.removeItem("json");
      form.render();
    } else {
      // 获取分类信息
      $.ajax({
        type: "get",
        url: "/head/get_classify_bar",
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code === 200) {
            $("#linkaddselect").empty();
            let $optionStr;
            $optionStr += `<option value="">请选择分类...</option>`;
            $(data.data).each(function (index, item) {
              $optionStr += `<option  value="${item.category_id}">${item.category_name}</option>`;
            });
            $("#linkaddselect").append($optionStr);
            form.render("select");
          }
          form.render("select");
        },
      });
    };

    form.on('submit(formDemo)', function (data) {
      if (linksettingID) {
        update();
      } else {
        add();
      }
    });

    //添加操作
    function add() {
      friendship_link_title = $("#linknameadd").val();
      friendship_link_click_url = $("#linkurladd").val();
      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
      });
      $.ajax({
        type: "post",
        url: "/admin/friend_ship_link",
        async: false,
        data: {
          friendship_link_title: friendship_link_title,
          friendship_link_click_url: friendship_link_click_url,
          category_id: $("#linkaddselect").next().find("dl .layui-this").attr('lay-value'),
        },
        dataType: "json",
        success: function (data) {
          localStorage.setItem("isupdate", true);
          layer.msg(
            data.msg, {
              icon: 1,
              time: 800
            },
            function () {
              var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
              parent.layer.close(index); //再执行关闭
            }
          );
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
      friendship_link_title = $("#linknameadd").val();
      friendship_link_click_url = $("#linkurladd").val();
      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
      });
      $.ajax({
        type: "put",
        url: "/admin/friend_ship_link/" + linksettingID,
        data: {
          friendship_link_title: friendship_link_title,
          friendship_link_click_url: friendship_link_click_url,
          category_id: $("#linkaddselect").next().find("dl .layui-this").attr('lay-value'),
        },
        dataType: "json",
        success: function (data) {
          localStorage.setItem("isupdate", true);
          layer.msg(data.msg, {
            icon: 1,
            time: 800
          }, function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭  
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
});