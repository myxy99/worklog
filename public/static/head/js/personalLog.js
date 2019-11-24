$.ajaxSetup({
  headers: {
    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
  }
});

layui.use(["layer"], function () {
  var layer = layui.layer;

  // content高度
  $(".content-info-main").css("min-height", document.body.clientHeight-100);

  // 总共多少页
  var allPages;
  // 当前分类id
  var articleIDAll;

  var articleUrl

  var classifyData; //分类数据
  // 获取分类栏信息
  // 点击一级标题
  $(document).on("click", ".top-content-title ul li", function () {
    category_id = $(this).attr("data-id");
    url = category_id;
    page(url);
    $(".top-content-title ul li").each(function (index, item) {
      $(item).css("color", "rgba(255, 255, 255, 0.7)");
      $(item).css("border-bottom", "none");
    });
    $(this).css("color", "rgba(255, 255, 255, 1)");
    $(this).css("border-bottom", "4px solid #fff");
  });

  $(document).on("click", ".num", function () {
    if ($(this).attr("class") == "num page-select") return;
    pages($(this).attr("data-id"));
    $(".num").each(function (index, item) {
      $(item).attr("class", "num");
    });
    $(this).addClass("page-select");
  });


  let category_id = 0;

  page(category_id);

  function page(category_id) {
    let url = "/head/get_own?category_id=" + category_id;
    articleUrl = "/head/get_own?category_id=" + category_id;
    articleIDAll = category_id;
    $(".content-info-main").empty();
    $(".pagenation").empty();
    $.ajax({
      type: "get",
      url: url,
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.code == 200) {
           allPages = data.data.last_page;
          let html = "",
            page = "";
          data.data.data.forEach(element => {
            html += `<div class="course-box" >
                    <div class="course-cover">
                      <div class="course-cover-div">
                        <img data-id="${element.article_id}" class="course-cover-replay" src="img/head/reply.png" alt="">
                        <img data-id="${element.article_id}" class="course-cover-close" src="img/head/close-circle-fill.png" alt="">
                      </div>
                      <div class="img-up"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-mid"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-down"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                    </div>
                    <div class="course-content" data-url="/log_details/${element.article_id}">
                      <p class="course-content-p">${element.article_title}</p>
                      <span>${element.article_intro}</span>
                    </div>
                  </div>`;
          });
          $(".content-info-main").html(html);

          if (allPages == 1) return;
          if (allPages > 7) {
            page = `<span class='first'>首页</span><span class="num page-select" data-id="${url}&page=1">1</span>`;
            for (let i = 2; i <= 7; i++) {
              page += `<span class="num" data-id='${url}&page=${i}'>${i}</span>`;
            }
            page += `<span class='end'>尾页</span>`;
            $(".pagenation").html(page);
          } else {
            page = `<span class='first'>首页</span><span class="num page-select" data-id="${url}&page=1">1</span>`;
            for (let i = 2; i <= allPages; i++) {
              page += `<span class="num" data-id='${url}&page=${i}'>${i}</span>`;
            }
            page += `<span class='end'>尾页</span>`;
            $(".pagenation").html(page);
          }
        } else if (data.code == 100) {
          layer.msg('没有内容！', {
            icon: 0,
            time: 1000
          });
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
          icon: 2
        });
      }
    });
  }

  // 跳页函数
  function pages(url) {
    $.ajax({
      type: "get",
      url: url,
      dataType: "json",
      success: function (data) {
        $(".content-info-main").empty();
        if (data.code == 200) {
          let html = "";
          data.data.data.forEach(element => {
            html += `<div class="course-box" >
                    <div class="course-cover">
                      <div class="course-cover-div">
                        <img data-id="${element.article_id}" class="course-cover-replay" src="img/head/reply.png" alt="">
                        <img data-id="${element.article_id}" class="course-cover-close" src="img/head/close-circle-fill.png" alt="">
                      </div>
                      <div class="img-up"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-mid"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-down"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                    </div>
                    <div class="course-content" data-url="/log_details/${element.article_id}">
                      <p class="course-content-p">${element.article_title}</p>
                      <span>${element.article_intro}</span>
                    </div>
                  </div>`;
          });
          $(".content-info-main").html(html);
        } else if (data.code == 100) {
            layer.msg("没有内容！", {
              icon: 0,
              time: 1000
            });
        }
      },
      error: function (error) {
        layer.msg("获取数据失败！", {
          icon: 2,
          time: 1000
        });
      }
    });
  }





  $(document).on("click", ".course-content", function() {
     window.location.href = $(this).attr("data-url");
  });

  // 搜索事件
  $(document).on("click", ".search-btn", function () {
    window.open("/log?search=" + $(".search-input").val());
  });

  // 弹窗
  $(document).on("click", ".course-cover-close", function () {
    let dataID = $(this).attr("data-id");
    layer.open({
      title: "操作",
      content: "确认删除日志！",
      btn: ["确定", "取消"],
      btn1: function (index, layero) {
        layer.close(index);
        // 删除操作，
        $.ajax({
          type: "delete",
          url: "/articles/" + dataID,
          dataType: "json",
          success: function (data) {
            if (data.code === 200) {
              layer.msg(data.msg, {
                icon: 1,
                time: 1000
              });
              page("/head/get_own?category_id=" + 0);
            }
          },
          error: function () {
            layer.msg(data.msg, {
              icon: 2,
              time: 1000
            });
          }
        });
      },
      anim: 1
    });
  });

  // 点击编辑
  $(document).on("click", ".course-cover-replay", function () {
    window.open("/log_edit/" + $(this).attr("data-id"));
  });



  // 页码点击事件
  $(document).on("click", '.pagenation .num', function () {

    // 第一个页码
    let firstPage = parseInt($('.num').eq(0).text())
    if (allPages > 7) {

      // 点击的右边
      if ($(this).text() > firstPage + 3) {

        let chazhi = parseInt($(this).text()) - 3;
        //到达最后页面
        if (((parseInt($(this).text()) + 3) > allPages) && (parseInt($(".num").eq(3).text()) == (allPages - 3))) {

          if ($(this).attr("class") == "num page-select") return;
          $(".num").each(function (index, item) {
            $(item).attr("class", "num");
          });
          $(this).addClass("page-select");
          // 跳页
          pages($(this).attr("data-id"));

        } else {
          if (parseInt($(this).text()) > (allPages - 3)) {
            $(".num").each(function (index, item) {
              $(item).attr("class", "num");
            });
            $(".num").eq(6 - (allPages - parseInt($(this).text()))).addClass("page-select");
            // 跳页
            pages($(this).attr("data-id"));
            $(".num").each(function (index, item) {
              $(item).attr(
                "data-id",
                articleUrl + "&page=" + (parseInt(index) + allPages - 6)
              );
              $(item).text(parseInt(index) + allPages - 6);
            });
          } else {
            $(".num").each(function (index, item) {
              $(item).attr("class", "num");
            });
            $(".num")
              .eq(3)
              .addClass("page-select");
            // 跳页
            pages($(this).attr("data-id"));
            $(".num").each(function (index, item) {
              $(item).attr(
                "data-id",
                articleUrl + "&page=" + (parseInt(index) + chazhi)
              );
              $(item).text(index + chazhi);
              if ($(this).attr("class") == "num page-select") return;
            });
          }
        }
      } else { //点击左边
        let chazhi = parseInt($(this).text()) - 4;
        let chazhi2 = firstPage - (firstPage + 3 - parseInt($(this).text()));
        //到达最前页面
        if (parseInt($(this).text()) <= 4 && $(".num").eq(3).text() == 4) {
          if ($(this).attr("class") == "num page-select") return;

          $(".num").each(function (index, item) {
            $(item).attr("class", "num");
          });
          $(this).addClass("page-select");
          // 跳页
          pages($(this).attr("data-id"));
        } else {

          if ($(this).text() <= 3) {

            if ($(this).attr("class") == "num page-select") return;
            $(".num").each(function (index, item) {
              $(item).attr("class", "num");
            });
            $(".num").eq(parseInt($(this).text()) - 1).addClass("page-select");
            // 跳页
            pages($(this).attr("data-id"));

            $(".num").each(function (index1, item) {
              $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + 1));
              $(item).text(parseInt(index1 + 1));
            });
          } else {
            if ($(this).attr("class") == "num page-select") return;
            $(".num").each(function (index, item) {
              $(item).attr("class", "num");
            });
            $(".num")
              .eq(3)
              .addClass("page-select");
            // 跳页
            pages($(this).attr("data-id"));

            $(".num").each(function (index1, item) {
              $(item).attr(
                "data-id",
                articleUrl + "&page=" + (parseInt(index1) + chazhi2)
              );
              $(item).text(parseInt(index1 + chazhi2));
            });
          }

        }
      }

    } else {
      if ($(this).attr("class") == "num page-select") return;
      $(".num").each(function (index, item) {
        $(item).attr("class", "num");
      });
      $(this).addClass("page-select");
      pages($(this).attr("data-id"));

    }

  })



  // 首页
  $(document).on("click", '.pagenation .first', function () {
    // if ($(".num").eq(0).text() == 1)return;
    $(".num").each(function (index, item) {
      $(item).attr("class", "num");
    });
    $(".num").eq(0).addClass("page-select");
    // 跳页
    pages(articleUrl + "&page=1");

    $(".num").each(function (index1, item) {
      $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + 1));
      $(item).text(parseInt(index1 + 1));
    });
  })


  // 尾页
  $(document).on("click", '.pagenation .end', function () {
    $(".num").each(function (index, item) {
      $(item).attr("class", "num");
    });
    if (allPages >= 7) {
      $(".num").eq(6).addClass("page-select");
      // 跳页
      pages(articleUrl + "&page=" + allPages);
      $(".num").each(function (index1, item) {
        $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + allPages - 6));
        $(item).text(parseInt(index1) + allPages - 6);
      });
    } else {
      $(".num").eq(allPages - 1).addClass("page-select");
      // 跳页
      pages(articleUrl + "&page=" + allPages);
      $(".num").each(function (index1, item) {
        $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + 1));
        $(item).text(parseInt(index1) + 1);
      });
    }



  })
});