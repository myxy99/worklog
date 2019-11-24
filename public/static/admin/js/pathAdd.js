/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-25 17:11:57
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 09:39:38
 */
$(function () {

  if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
      var binary = "";
      var pt = this;
      var reader = new FileReader();
      reader.onload = function (e) {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        pt.content = binary;
        pt.onload()
      }
      reader.readAsArrayBuffer(fileData);
    }
  }


  var play = null;
  var article_video_id = null;
  var cover_picture_id = null;
  var old_video_id = null;
  var ue = UE.getEditor('editor');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  layui.use(['form', 'laypage', 'jquery', 'layer', 'dialog', 'upload', 'flow'], function () {
    var flow = layui.flow;
    var form = layui.form();
    layer = layui.layer,
      laypage = layui.laypage,
      $ = layui.jquery;
    var dialog = layui.dialog;
    form.render();
    // 图片流加载
    flow.load({
      elem: '#LAY_demo1',
      scrollElem: '#LAY_demo1',
      done: function (page, next) {
        setTimeout(function () {
          var lis = [];
          // 页码初始化
          let objNumService;
          let pageNumService;
          $.ajax({
            type: 'get',
            url: "/admin/cover_pictures",
            dataType: "json",
            async: false,
            success: function (data) {
              if (data.code === 200) {
                objNumService = data.data.total;
                pageNumService = Math.ceil(objNumService / 10);
                data.data.data.forEach(function (item) {
                  lis.push(`<li><img data-id="${item.cover_picture_id}" class="pathadd-img" src="/${item.cover_picture_url}" /></li>`)
                })
              }
              form.render('select');
            },
          });
          next(lis.join(''), page < pageNumService); //假设总页数为 10
        }, 500);
      }
    });

    //点击图片库图片
    $(document).on('click', '.pathadd-img', function () {
      $('#addImgModel').attr('src', $(this).attr('src'));
      cover_picture_id = $(this).attr('data-id');
      layer.msg('修改图片成功！', {
        icon: 1,
        time: 800
      }, function () {
        $('.close').click();
      });
    })
    // 获取url参数的方法
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    // 学习路线id
    var routeID = getQueryString('routeId');
    // 学习路线的分类
    var classify;
    // 富文本编辑器方法
    if (routeID != null) {
      $.ajax({
        type: 'get',
        url: "/admin/study_routes/" + routeID,
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code === 200) {
            $('#pathAdd-select').empty();
            let pathData = data.data;
            classify = pathData.category_name;
            $('#pathAdd-title').val(pathData.study_route_title);
            $('#pathAdd-textarea').text(pathData.study_route_intro);
            $('#addImgModel').attr('src', '/' + pathData.study_route_cover_picture_url);
            cover_picture_id = pathData.study_route_cover_picture_id;
            article_video_id = pathData.study_route_video_id;
            ue.ready(function () {
              ue.setContent(pathData.study_route_content);
            });
            if (article_video_id === null) return;
            $.ajax({
              type: "post",
              url: '/video/get_video_info',
              data: {
                video_id: article_video_id,
              },
              dataType: "json",
              success: function (data) {
                if (data.code === 200) {
                  $('#pathadd-video').attr('src', data.data.CoverURL);
                }
              }
            })
          }
        },
      });
    }

    // 返回主页
    $('#pathAdd-return').click(function () {
      window.location.href = 'path';
    })

    // 获取分类信息
    $.ajax({
      type: 'get',
      url: "/head/get_classify_bar",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code === 200) {
          $('#pathAdd-select').empty();
          let $optionStr;
          $optionStr += `<option value="">请选择一个分类...</option>`
          $(data.data).each(function (index, item) {
            if (item.category_name === classify) {
              $optionStr += `<option selected value="${item.category_id}">${item.category_name}</option>`
            } else {
              $optionStr += `<option value="${item.category_id}">${item.category_name}</option>`
            }
          })
          $('#pathAdd-select').append($optionStr);
          form.render('select');
        }
        form.render('select');
      },
    });

    //上传视频监听
    $('#pathAdd-addVideo').on('change', function (e) {

       var file = $(this).val();
       var pos = file.lastIndexOf("\\");
       var filename = file.substring(pos + 1);
       var fileextname = filename.substring(
         filename.lastIndexOf("."),
         filename.length
       );

       if (fileextname != ".mp4" && fileextname != "") {
         layer.msg("上传视频必须为 MP4 格式", {
           icon: 0,
           time: 1500
         });
         return;
       }

      var file = e.target.files[0]
      var userData = '{"Vod":{}}'
      uploader = createUploader()
      uploader.addFile(file, null, null, null, userData)
      uploader.startUpload()
    })

    form.on('submit(formDemo)', function (data) {
      if (routeID != null) {
        update();

      } else {
        add();
      }

    })

    //上传视频
    function createUploader() {
      var uploader = new AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '123',
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
          console.log("添加文件成功: " + uploadInfo.file.name)
        },
        // 开始上传
        onUploadstarted: function (uploadInfo) {
          if (!uploadInfo.videoId) {
            $.ajax({
              type: "post",
              url: '/video/create_upload_video',
              data: {
                video_title: $('meta[name="username"]').attr('content'),
                video_file_name: uploadInfo.file.name
              },
              dataType: "json",
              success: function (data) {
                if (data.code === 200) {
                  uploader.setUploadAuthAndAddress(uploadInfo, data.data.UploadAuth, data.data.UploadAddress, data.data.VideoId);
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
            console.log('视频开始上传', uploadInfo)
          } else {
            $.post('/video/refresh_upload_video', {
              video_id: uploadInfo.videoId
            }, function (data) {
              if (data.code != 200) return;
              uploader.setUploadAuthAndAddress(uploadInfo, data.data.UploadAuth, data.data.UploadAddress, data.data.VideoId)
            }, 'json')
          }
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          layer.msg('视频上传成功', {
            icon: 1,
            time: 800
          });
          console.log("文件上传成功: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          article_video_id = uploadInfo.videoId;
          $.post('/video/get_video_play_auth', {
            video_id: article_video_id
          }, function (data) {
            if (data.code != 200) return;
            if (play != null) {
              play.dispose();
            }
            isupdate = true;
            play = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              height: '500px',
              autoplay: true,
              vid: article_video_id,
              playauth: data.data.PlayAuth,
            }, function (player) {
              console.log('播放器创建好了。', player)
            });
          })
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          layer.msg('文件上传失败,请重试！', {
            icon: 2,
            time: 800
          });
          console.log("文件上传失败: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
        },
        // 文件上传已暂停
        onUploadCanceled: function (uploadInfo, code, message) {
          console.log("文件上传已暂停 file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (uploadInfo, totalSize, progress) {
          console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
          var progressPercent = Math.ceil(progress * 100)
          $(".pathAdd-addVideo-label h2").css("cursor", "no-drop");
          $(".pathAdd-addVideo-label h2").css(
            "background",
            "rgb(219, 219, 219)"
          );
          $("#pathAdd-addVideo").attr("disabled", true);
          $(".pathAdd-time").css("display", "inline-block");
          $(".pathAdd-time").text("上传进度：" + progressPercent + "%");
          if (progressPercent == 100) {
            $(".pathAdd-time").css("display", "none");
            $(".pathAdd-addVideo-label h2").css("cursor", "pointer");
            $(".pathAdd-addVideo-label h2").css("background", "#fff");
            $("#pathAdd-addVideo").attr("disabled", false);
          }

        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          layer.msg('上传凭证超时,请重试！', {
            icon: 2,
            time: 800
          });
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {}
      })
      return uploader
    }



    function update() {
      $.ajax({
        type: "PUT",
        url: '/admin/study_routes/' + routeID,
        data: {
          'study_route_title': $('#pathAdd-title').val(),
          'study_route_intro': $('#pathAdd-textarea').val(),
          'study_route_content': ue.getContent(),
          'category_id': $('#pathAdd-select').val(),
          'study_route_state': 1,
          'study_route_cover_picture_id': cover_picture_id,
          'study_route_video_id': article_video_id
        },
        dataType: "json",
        success: function (data) {
          if (data.code === 200) {
            if (old_video_id != null && isupdate) {
              $.post('/video/delete_video', {
                video_id: old_video_id
              }, function () {})
            }
            layer.msg(data.msg, {
                icon: 1,
                time: 800
              },
              function () {
                window.location.href = "path";
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

    function add() {
      if (cover_picture_id == null) {
        layer.msg('请选择封面图！', {
          time: 800,
          icon: 0
        });
        return;
      }
      if ($('#pathAdd-title').val() == '') {
        layer.msg('请填写标题！', {
          time: 800,
          icon: 0
        });
        return;
      }
      if ($('#pathAdd-textarea').val() == '') {
        layer.msg('请填写简介！', {
          time: 800,
          icon: 0
        });
        return;
      }
      if (ue.getContent() == '') {
        layer.msg('请填写正文！', {
          time: 800,
          icon: 0
        });
        return;
      }
      if ($('#pathAdd-select').val() == '') {
        layer.msg('请选择分类！', {
          time: 800,
          icon: 0
        });
        return;
      }
      $.ajax({
        type: "post",
        url: '/admin/study_routes',
        data: {
          'study_route_title': $('#pathAdd-title').val(),
          'study_route_intro': $('#pathAdd-textarea').val(),
          'study_route_content': ue.getContent(),
          'category_id': $('#pathAdd-select').val(),
          'study_route_state': 1,
          'study_route_cover_picture_id': cover_picture_id,
          'study_route_video_id': article_video_id
        },
        dataType: "json",
        success: function (data) {
          if (data.code === 200) {
            layer.msg(data.msg, {
              icon: 1,
              time: 800
            }, function () {
              window.location.href = "path";
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

  })

  // 图片弹窗
  uploadFile('addImgModel', 'myModalImg', 0)
  uploadFile('pathadd-video', 'myModalVideo', 1)

  function uploadFile(buttonE, myModal, i) {
    // 获取弹窗
    var modal = document.getElementById(myModal);

    // 打开弹窗的按钮对象
    var btn = document.getElementById(buttonE);

    // 获取 <span> 元素，用于关闭弹窗 that closes the modal
    var span = document.getElementsByClassName("close")[i];

    // 点击按钮打开弹窗
    btn.onclick = function () {
      modal.style.display = "block";
      if (isnull(article_video_id) && myModal == 'myModalVideo') {
        $.ajax({
          type: "POST",
          url: "/video/get_video_play_auth",
          data: {
            video_id: article_video_id,
          },
          dataType: "json",
          success: function (data) {
            if (data.code === 200) {
              $('#player').remove();
              if (play != null) {
                play.dispose();
              }
              play = new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                height: '500px',
                autoplay: true,
                vid: article_video_id,
                playauth: data.data.PlayAuth,
                cover: data.data.VideoMeta.CoverURL,
              }, function (player) {
                console.log('播放器创建好了。', player)
              });
            }
          },
        });
      }
    }

    // 点击 <span> (x), 关闭弹窗
    span.onclick = function () {
      modal.style.display = "none";
      if (myModal == 'myModalVideo' && play != null) {
        play.pause();
        setTimeout(() => {
          $.ajax({
            type: "post",
            url: '/video/get_video_info',
            data: {
              video_id: article_video_id,
            },
            dataType: "json",
            success: function (data) {
              if (data.code === 200) {
                $('#pathadd-video').attr('src', data.data.CoverURL);
              }
            }
          })
        }, 2000);
      }
    }

    // 在用户点击其他地方时，关闭弹窗
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  function isnull(vid) {
    if (vid === null) return false;
    return true;
  }
})