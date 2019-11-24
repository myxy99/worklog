$(function () {  
  layui.use(["layer"], function() {
    var layer = layui.layer;

    $(".menu-list-content-item:nth-of-type(3)").click(function() {
      // 修改密码
      layer.open({
        type: 1,
        closeBtn: 0, //不显示关闭按钮
        anim: 1,
        btn: ["确定", "取消"],
        content: `<div class="alter-password">
  <input id="alter-password1" type="password" placeholder="请输入密码..." maxlength="16">
  <input id="alter-password2" type="password" placeholder="请确认密码..." maxlength="16">
</div>`,
        btn1: function(index, layero) {
          let passwordStr = /^[a-z0-9]+$/i;
          if (!passwordStr.test($("#alter-password1").val())) {
            layer.msg("请正确输入密码！", { icon: 0 });
            return;
          }
          if ($("#alter-password1").val() != $("#alter-password2").val()) {
            layer.msg("两次密码不一致！", { icon: 0 });
            return;
          }
          $.ajax({
            type: "post",
            url: "/auth/modify_password",
            data: {
              new_password: $("#alter-password1").val(),
              new_password_confirmation: $("#alter-password2").val()
            },
            dataType: "json",
            success: function(data) {
              layer.msg(data.msg, { icon: 1, time: 1500 });
              layer.close(index);
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
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    });

    // 点击下拉列表
    $(".menu-list").click(function() {
      $(".menu-list-content").slideToggle("800");
    });
  });
})
