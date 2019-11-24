/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-23 12:59:21
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 16:13:32
 */
$(function () {

  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });
 
  // 禁止粘贴
    var test1 = document.getElementById("top-content-title1");
    var test2 = document.getElementById("top-content-title2");
  //禁止粘贴
  test1.onpaste = function () {
    return false;
  };
    //禁止拖拽文字进入文本框
  test1.ondrop = function () {
    return false;
  };
    //禁止粘贴
  test2.onpaste = function () {
    return false;
  };
    //禁止拖拽文字进入文本框
  test2.ondrop = function () {
    return false;
  };

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
        pt.onload();
      };
      reader.readAsArrayBuffer(fileData);
    };
  }

  layui.use("layer", function () {
    let cover_picture_id = null;
    let article_video_id = null;
    let old_video_id = null;
    var play = null;
    var isupdate = false;
    let ue = UE.getEditor("editor");
    let id = $('meta[name="id"]').attr("content");
    if (id != "") {
      $(".top-content-name span")
        .eq(0)
        .html("个人日志修改");
      $(".top-content-name span")
        .eq(1)
        .html("修改个人日志...");
      $.ajax({
        type: "get",
        url: "/articles/" + id,
        dataType: "json",
        success: function (data) {
          if (data.code === 200) {
            ue.ready(function () {
              ue.setContent(data.data.article_content);
            });
            article_video_id = data.data.article_video_id;
            old_video_id = data.data.article_video_id;
            cover_picture_id = data.data.cover_picture_id;
            article_category_id = data.data.article_category_id;
            $("#UpImg").attr("src", '/'+data.data.cover_picture_url);
            $("#select").val(article_category_id);
            $(".top-content-title div")
              .eq(0)
              .html(data.data.article_title);
            $(".top-content-title div")
              .eq(1)
              .html(data.data.article_intro);
            if (article_video_id === null) return;
            $.ajax({
              type: "post",
              url: "/video/get_video_info",
              data: {
                video_id: article_video_id
              },
              dataType: "json",
              success: function (data) {
                if (data.code === 200) {
                  $("#videoUpload").attr(
                    "src",
                    data.data.CoverURL
                  );
                }
              }
            });
          }
        }
      });
    } else {
      $(".top-content-name span")
        .eq(0)
        .html("个人日志添加");
      $(".top-content-name span")
        .eq(1)
        .html("添加个人日志...");
    }
    open("myModal-video", "videoUpload", 0);
    open("myModal-img", "UpImg", 1);
    // 获取弹窗
    function open(id1, id2, i) {
      var modal = document.getElementById(id1);

      // 打开弹窗的按钮对象
      var btn = document.getElementById(id2);

      // 获取 <span> 元素，用于关闭弹窗 that closes the modal
      var span = document.getElementsByClassName("close")[i];
      // 点击按钮打开弹窗
      btn.onclick = function () {
        modal.style.display = "block";
        if (isnull(article_video_id) && id1 == "myModal-video") {
          $.ajax({
            type: "POST",
            url: "/video/get_video_play_auth",
            data: {
              video_id: article_video_id
            },
            dataType: "json",
            success: function (data) {
              if (data.code === 200) {
                $("#player").remove();
                if (play != null) {
                  play.dispose();
                }
                play = new Aliplayer({
                    id: "J_prismPlayer",
                    width: "100%",
                    height: "500px",
                    autoplay: true,
                    vid: article_video_id,
                    playauth: data.data.PlayAuth,
                    cover: data.data.VideoMeta.CoverURL
                  },
                  function (player) {
                    console.log("播放器创建好了。", player);
                  }
                );
              }
            }
          });
        }
      };

      // 点击 <span> (x), 关闭弹窗
      span.onclick = function () {
        modal.style.display = "none";
        if (id1 == "myModal-video" && play != null) {
          play.pause();
          setTimeout(() => {
            $.ajax({
              type: "post",
              url: "/video/get_video_info",
              data: {
                video_id: article_video_id
              },
              dataType: "json",
              success: function (data) {
                if (data.code === 200) {
                  $("#videoUpload").attr(
                    "src",
                    data.data.CoverURL
                  );
                }
              }
            });
          }, 2000);
        }
      };

      // 在用户点击其他地方时，关闭弹窗
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }

    $("#sub").on("click", function () {
      if (id) {
        update();
      } else {
        add();
      }
    });

    function add() {
      if (cover_picture_id === null) {
        layer.msg("请选择封面", {
          icon: 0,
          time: 800
        });
        return;
      }
      if (ue.getContent() === "") {
        layer.msg("日志详情不为空", {
          icon: 0,
          time: 800
        });
        return;
      }
      $.ajax({
        type: "post",
        url: "/articles",
        data: {
          title: $(".top-content-title div")
            .eq(0)
            .html(),
          intro: $(".top-content-title div")
            .eq(1)
            .html(),
          content: ue.getContent(),
          category_id: $("#select").val(),
          picture_id: cover_picture_id,
          video: article_video_id
        },
        dataType: "json",
        success: function (data) {
          if (data.code === 200) {
            layer.msg(data.msg, {
              icon: 1,
              time: 800
            });
          }
          window.location.href = "/personal_log";
        },
        error: function (error) {
          let text = "服务器错误！";
          if (error.status === 422) {
            text = "";
            error.responseJSON.data.forEach(function (a) {
              text += a + "<br>";
            });
          } else if (error.status === 403) {
            text = error.responseJSON.msg;
          }
          layer.alert(text, {
            title: error.responseJSON.msg,
            icon: 2
          });
        }
      });
    }

    function update() {
      $.ajax({
        type: "PUT",
        url: "/articles/" + id,
        data: {
          title: $(".top-content-title div")
            .eq(0)
            .html(),
          intro: $(".top-content-title div")
            .eq(1)
            .html(),
          content: ue.getContent(),
          category_id: $("#select").val(),
          picture_id: cover_picture_id,
          video: article_video_id
        },
        dataType: "json",
        success: function (data) {
          if (data.code === 200) {
            if (old_video_id != null && isupdate) {
              $.post(
                "/video/delete_video", {
                  video_id: old_video_id
                },
                function () {}
              );
            }
            layer.msg(data.msg, {
              icon: 1,
              time: 800
            });
                    window.location.href = "/personal_log";

          }
        },
        error: function (error) {
          let text = "服务器错误！";
          if (error.status === 422) {
            text = "";
            error.responseJSON.data.forEach(function (a) {
              text += a + "<br>";
            });
          } else if (error.status === 403) {
            text = error.responseJSON.msg;
          }
          layer.alert(text, {
            title: error.responseJSON.msg,
            icon: 2
          });
        }
      });
    }

    $(document).on("click", "#LAY_demo1 img", function () {
      var layer = layui.layer;
      layer.msg("选择成功", {
        icon: 1,
        time: 800
      }, function () {
        $(".close").click();
      });
      cover_picture_id = this.getAttribute("data-id");
      $("#UpImg").attr("src", this.src);
    });

    // 上传视频的方法
    function createUploader() {
      
      var uploader = new AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: "cn-shanghai",
        userId: "123",
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
          console.log("添加文件成功: " + uploadInfo.file.name);
        },
        // 开始上传
        onUploadstarted: function (uploadInfo) {
          if (!uploadInfo.videoId) {  
            $.ajax({
              type: "post",
              url: "/video/create_upload_video",
              data: {
                video_title: $('meta[name="username"]').attr(
                  "content"
                ),
                video_file_name: uploadInfo.file.name//文件名
              },
              dataType: "json",
              success: function (data) {
                if (data.code === 200) {
                  uploader.setUploadAuthAndAddress(//开始上传的配置，有服务器返回
                    uploadInfo,
                    data.data.UploadAuth,
                    data.data.UploadAddress,
                    data.data.VideoId
                  );
                }
              },
              error: function (error) {
                let text = "服务器错误！";
                if (error.status === 422) {
                  text = "";
                  error.responseJSON.data.forEach(function (a) {
                    text += a + "<br>";
                  });
                } else if (error.status === 403) {
                  text = error.responseJSON.msg;
                }
                layer.alert(text, {
                  title: error.responseJSON.msg,
                  icon: 2
                });
              }
            });

            console.log("视频开始上传", uploadInfo);
          } else {
            $.post(
              "/video/refresh_upload_video", {
                video_id: uploadInfo.videoId
              },
              function (data) {
                if (data.code != 200) return;
                uploader.setUploadAuthAndAddress(
                  uploadInfo,
                  data.data.UploadAuth,
                  data.data.UploadAddress,
                  data.data.VideoId
                );
              },
              "json"
            );
          }
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          layer.msg("视频上传成功", {
            icon: 1,
            time: 800
          });
          console.log(
            "文件上传成功: " +
            uploadInfo.file.name +
            ", endpoint:" +
            uploadInfo.endpoint +
            ", bucket:" +
            uploadInfo.bucket +
            ", object:" +
            uploadInfo.object
          );
          article_video_id = uploadInfo.videoId;
          $.post(
            "/video/get_video_play_auth", {
              video_id: article_video_id
            },
            function (data) {
              if (data.code != 200) return;
              if (play != null) {
                play.dispose();
              }
              $("#player").remove();
              isupdate = true;
              play = new Aliplayer({
                  id: "J_prismPlayer",
                  width: "100%",
                  height: "500px",
                  autoplay: true,
                  vid: article_video_id,
                  playauth: data.data.PlayAuth
                },
                function (player) {
                  console.log("播放器创建好了。", player);
                }
              );
            }
          );
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log(
            "文件上传失败: file:" +
            uploadInfo.file.name +
            ",code:" +
            code +
            ", message:" +
            message
          );
        },
        // 文件上传已暂停
        onUploadCanceled: function (uploadInfo, code, message) {
          console.log(
            "文件上传已暂停 file: " +
            uploadInfo.file.name +
            ", code: " +
            code +
            ", message:" +
            message
          );
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (
          uploadInfo,
          totalSize,
          progress
        ) {
          console.log(
            "onUploadProgress:file:" +
            uploadInfo.file.name +
            ", fileSize:" +
            totalSize +
            ", percent:" +
            Math.ceil(progress * 100) +
            "%"
          );
          var progressPercent = Math.ceil(progress * 100);
           $(".uploadVideo h2").css("cursor", 'no-drop');
           $(".uploadVideo h2").css("background", "rgb(219, 219, 219)");
           $("#fileUpload").attr("disabled", true);
          $(".updateTime").css("display", "inline-block");
          $(".updateTime").text('上传进度：'+ progressPercent +'%');
          if(progressPercent == 100){
             $(".updateTime").css("display", "none");
             $(".uploadVideo h2").css("cursor", 'pointer');
             $(".uploadVideo h2").css("background", "#fff");
             $("#fileUpload").attr("disabled", false);
          }
          
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {},
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {}
      });
      return uploader;
    }
// 点击上传视频
    $("#fileUpload").on("change", function (e) {

     var file = $(this).val();
     var pos = file.lastIndexOf("\\");
     var filename = file.substring(pos+1);
     var fileextname = filename.substring(filename.lastIndexOf("."), filename.length);

      if(fileextname!='.mp4'&&fileextname!=''){
          layer.msg("上传视频必须为 MP4 格式", {
            icon: 0,
            time: 1500
          });
        return;
      }

      var file = e.target.files[0];
      var userData = '{"Vod":{}}';
      uploader = createUploader();
      uploader.addFile(file, null, null, null, userData);
      uploader.startUpload();
    });
  });

  // 图片加载流
  layui.use("flow", function () {
    var flow = layui.flow;
    flow.load({
      elem: "#LAY_demo1", //流加载容器
      scrollElem: "#LAY_demo1", //滚动条所在元素，一般不用填，此处只是演示需要。
      done: function (page, next) {
        //执行下一页的回调
        let picture;
        $.get("/admin/cover_pictures?page=" + page, function (
          data
        ) {
          picture = data.data.data;
          last_page = data.data.last_page;
        });
        setTimeout(function () {
          var lis = [];
          picture.forEach(element => {
            lis.push(
              "<li><img data-id=" +
              element.cover_picture_id +
              ' src="/' +
              element.cover_picture_url +
              '" alt=""></li>'
            );
          });
          next(lis.join(""), page < last_page);
        }, 500);
      }
    });
  });

  function isnull(vid) {
    if (vid === null) return false;
    return true;
  }
  // var nowPercent = 0;
  // var oldPercent = 0;
  // var inputSecond = 0;
  // var interval = null;
  // function water_wave(water1) {
  //     var cnt = document.getElementById("count");
  //     var water = document.getElementById("water");
  //     var inputPercent = water1;
  //     interval = setInterval(function () {
  //         nowPercent++;
  //         if (nowPercent >= (inputPercent + oldPercent) || nowPercent >= 100) {
  //             nowPercent = inputPercent + oldPercent;
  //             clearInterval(interval);
  //         }
  //         cnt.innerHTML = nowPercent;
  //         water.style.transform = 'translate(0' + ',' + (100 - nowPercent) + '%)';
  //     }, (inputSecond * 1000) / inputPercent);
  // }
})