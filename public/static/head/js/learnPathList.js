/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-22 18:04:12
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 21:18:30
 */
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

$(".content-info-main").css("min-height", (document.body.clientHeight-100));

// 总共多少页
var allPages;
// 当前分类id
var articleIDAll;

var articleUrl

var classifyData; //分类数据
// 获取分类栏信息

$(document).on('click', '.top-content-title ul li', function () {
  category_id = $(this).attr('data-id');
  page(category_id);
  $('.top-content-title ul li').each(function (index, item) {
    $(item).css('color', 'rgba(255, 255, 255, 0.7)');
    $(item).css('border-bottom', 'none');
  })
  $(this).css('color', 'rgba(255, 255, 255, 1)');
  $(this).css('border-bottom', '4px solid #fff');
})


$(document).on('click', '.course-box', function () {
  window.open($(this).attr('data-url'));
})

let category_id = 0;
page(category_id);

function page(category_id) {
  let url = "/head/get_all_learn_path?category_id=" + category_id;
  articleUrl = "/head/get_all_learn_path?category_id=" + category_id;
  articleIDAll = category_id;
  $(".content-info-main").empty();
  $(".pagenation").empty();
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        allPages = data.data.last_page;
        let html = "",
          page = "";
        data.data.data.forEach(element => {
          html += `<div class="course-box" data-url="/learn_path/${element.study_route_id}">
                    <div class="course-cover">
                      <div class="img-up"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-mid"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-down"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                    </div>
                    <div class="course-content">
                      <p class="course-content-p">${element.study_route_title}</p>
                      <span>${element.study_route_intro}</span>
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
      } else {
        layer.msg("没有内容！", {
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

function pages(url) {
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (data) {

      if (data.code == 200) {
        let html = '';
        data.data.data.forEach(element => {
          html += `<div class="course-box"  data-url="/learn_path/${element.study_route_id}">
                    <div class="course-cover">
                      <div class="img-up"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-mid"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                      <div class="img-down"
                        style="background-image: url('${element.cover_picture_url}'); background-size: 100% 100%"></div>
                    </div>
                    <div class="course-content">
                      <p class="course-content-p">${element.study_route_title}</p>
                      <span>${element.study_route_intro}</span>
                    </div>
                  </div>`
        });
        $('.content-info-main').html(html);
      }
    },
  });
}


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
  pages("/head/get_all_learn_path?category_id=0&page=1");

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
    pages("/head/get_all_learn_path?category_id=0&page=" + allPages);
    $(".num").each(function (index1, item) {
      $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + allPages - 6));
      $(item).text(parseInt(index1) + allPages - 6);
    });
  } else {
    $(".num").eq(allPages - 1).addClass("page-select");
    // 跳页
    pages("/head/get_all_learn_path?category_id=0&page=" + allPages);
    $(".num").each(function (index1, item) {
      $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + 1));
      $(item).text(parseInt(index1) + 1);
    });
  }



})