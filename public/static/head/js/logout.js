/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-23 12:18:41
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 12:20:10
 */
function logout() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	layui.use(['layer'], function () {
		var layer = layui.layer;
		$.ajax({
			type: "post",
			url: "/auth/logout",
			dataType: "json",
			success: function (data) {
				if (data.code == 200) {
					layer.msg(data.msg, { icon: 1, time: 800 }, function () {
						window.location.href = '/';
					});
				} else {
					layer.msg(data.msg, { icon: 2, time: 800 });
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
				layer.alert(text, { icon: 2 });
			}
		});
	})
}

