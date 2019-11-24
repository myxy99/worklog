$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });
	layui.use(["layer", "form", "element", "jquery", "dialog"], function () {
		var layer = layui.layer;
		var element = layui.element();
		var form = layui.form();
		var $ = layui.jquery;
		var dialog = layui.dialog;
		var hideBtn = $("#hideBtn");
		var mainLayout = $("#main-layout");
		var mainMask = $(".main-mask");
		//监听导航点击
		element.on("nav(leftNav)", function (elem) {
			var navA = $(elem).find("a");
			var id = navA.attr("data-id");
			var url = navA.attr("data-url");
			var text = navA.attr("data-text");
			if (!url) {
				return;
			}
			var isActive = $(".main-layout-tab .layui-tab-title").find(
				"li[lay-id=" + id + "]"
			);
			if (isActive.length > 0) {
				//切换到选项卡
				element.tabChange("tab", id);
			} else {
				element.tabAdd("tab", {
					title: text,
					content: '<iframe src="' +
						url +
						'" name="iframe' +
						id +
						'" class="iframe" framborder="0" data-id="' +
						id +
						'" scrolling="auto" width="100%"  height="100%"></iframe>',
					id: id
				});
				element.tabChange("tab", id);
			}
			mainLayout.removeClass("hide-side");
		});
		//监听导航点击
		element.on("nav(rightNav)", function (elem) {
			var navA = $(elem).find("a");
			var id = navA.attr("data-id");
			var url = navA.attr("data-url");
			var text = navA.attr("data-text");
			if (!url) {
				return;
			}
			var isActive = $(".main-layout-tab .layui-tab-title").find(
				"li[lay-id=" + id + "]"
			);
			if (isActive.length > 0) {
				//切换到选项卡
				element.tabChange("tab", id);
			} else {
				element.tabAdd("tab", {
					title: text,
					content: '<iframe src="' +
						url +
						'" name="iframe' +
						id +
						'" class="iframe" framborder="0" data-id="' +
						id +
						'" scrolling="auto" width="100%"  height="100%"></iframe>',
					id: id
				});
				element.tabChange("tab", id);
			}
			mainLayout.removeClass("hide-side");
		});
		//菜单隐藏显示
		hideBtn.on("click", function () {
			if (!mainLayout.hasClass("hide-side")) {
				mainLayout.addClass("hide-side");
			} else {
				mainLayout.removeClass("hide-side");
			}
		});
		//遮罩点击隐藏
		mainMask.on("click", function () {
			mainLayout.removeClass("hide-side");
		});

		
		$(".passwordAlert").click(function () {
					$("#alter-name").val();
			// 修改密码
			layer.open({
				type: 1,
				title:'修改个人信息',
        closeBtn: 0, //不显示关闭按钮
        anim: 1,
        btn: ["确定", "取消"],
        content: `<div class="alter-userNumber">
  <input  id="alter-name" type="text" value="${$(".layui-nav-item-name").text()}" placeholder="请输入用户名..." maxlength="16">
	<input  id="alter-num" value="${$('meta[name="user_number"]').attr('content')}" type="text" placeholder="请输入账号..." maxlength="11" >
	<input id="alter-password1" type="password" placeholder="请输入密码..." maxlength="16">
	<input id="alter-password2" type="password" placeholder="请确认密码..." maxlength="16">
</div>`,
        btn1: function(index, layero) {
					

					let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
          if (!userStr.test($("#alter-name").val())) {
            layer.msg("请正确输入用户名", {
              icon: 0
						});
						return;
					}
					
          let passwordStr = /^[a-z0-9]+$/i;
          if (!passwordStr.test($("#alter-password1").val())) {
            layer.msg("请正确输入密码！", {
              icon: 0
            });
            return;
          }
          if ($("#alter-password1").val() != $("#alter-password2").val()) {
            layer.msg("两次密码不一致！", {
              icon: 0
            });
            return;
					}
					
          $.ajax({
            type: "put",
            url: "/admin/admin_users",
            data: {
              user_name: $("#alter-name").val(),
              user_student_number: $("#alter-num").val(),
              user_password: $("#alter-password1").val(),
              new_password_confirmation: $("#alter-password2").val()
            },
            dataType: "json",
            success: function(data) {
							$(".layui-nav-item-name").text($("#alter-name").val());
							$('meta[name="user_number"]').attr("content",$("#alter-num").val());
              layer.msg(data.msg, {
                icon: 1,
                time: 1500
              });
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
              layer.alert(text, {
                icon: 2
              });
            }
          });
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
		});

		//示范一个公告层
		//	layer.open({
		//		  type: 1
		//		  ,title: false //不显示标题栏
		//		  ,closeBtn: false
		//		  ,area: '300px;'
		//		  ,shade: 0.8
		//		  ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
		//		  ,resize: false
		//		  ,btn: ['火速围观', '残忍拒绝']
		//		  ,btnAlign: 'c'
		//		  ,moveType: 1 //拖拽模式，0或者1
		//		  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">后台模版1.1版本今日更新：<br><br><br>数据列表页...<br><br>编辑删除弹出功能<br><br>失去焦点排序功能<br>数据列表页<br>数据列表页<br>数据列表页</div>'
		//		  ,success: function(layero){
		//		    var btn = layero.find('.layui-layer-btn');
		//		    btn.find('.layui-layer-btn0').attr({
		//		      href: 'http://www.layui.com/'
		//		      ,target: '_blank'
		//		    });
		//		  }
		//		});


	})

})