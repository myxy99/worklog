/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-21 04:08:38
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-25 12:32:42
 */
//用户登录

// 鼠标放上去提示信息

$(function () {
  layui.use(['layer'], function () {
    var layer = layui.layer;
    $('#user').hover(function () {
      $('.login-input-userInfo').fadeIn(100)
    }, function () {
      $('.login-input-userInfo').fadeOut(100)

    })
    $('#password').hover(function () {
      $('.login-input-passwordInfo').fadeIn(50)
    }, function () {
      $('.login-input-passwordInfo').fadeOut(50)
    })
    //错误提示

    $('#login-button').click(function () {
      loginButton();



    })

    function loginButton() {  

      

      let passwordStr = /^[a-z0-9]+$/i;
      if (!passwordStr.test($("#password").val())) {
        layer.msg("请正确输入密码！", { icon: 0, title: "提示" });
        return;
      }
      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
      });
      $.ajax({
        type: "post",
        url: "/auth/login",
        data: {
          user_number: $("#user").val(),
          user_password: $("#password").val()
        },
        dataType: "json",
        success: function(data) {
          if (data.code === 200) {
            layer.msg(data.msg, { icon: 1, time: 800 }, function() {
              if (getQueryString("url") != null && getQueryString("url") != "")
                window.location.href = getQueryString("url");
              else window.location.href = data.data.url;
            });
          } else {
            layer.msg(data.msg, { icon: 2, time: 800 });
          }
        },
        error: function(error) {
          let text = "服务器错误！";
          if (error.status === 422) {
            text = "";
            error.responseJSON.data.forEach(function(a) {
              text += a + "<br>";
            });
          } else if (error.status === 403) {
            text = error.responseJSON.msg;
          }
          layer.alert(text, { icon: 2 });
        }
      });
    }

        // 监听搜索按钮事件
    $(document).keydown(function(e) {
      if (e.keyCode == 13) {
        loginButton()
      }
    });

  })


  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    console.log(r);
    return null;
  }
})


