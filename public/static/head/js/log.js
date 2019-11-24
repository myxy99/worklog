/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-21 18:46:24
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 10:51:52
 */
window.onload = function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  layui.use(["layer"], function () {
    var layer = layui.layer;

    // 总共多少页
    var allPages;
    // 当前分类id
    var articleIDAll;

    var articleUrl

    var classifyData; //分类数据
    // 获取分类栏信息

    var classifyFirst = 0

    function classify() {
      $.ajax({
        type: "get",
        async: false,
        url: "/head/get_classify_bar",
        dataType: "json",
        success: function (data) {
          if (data.code == 200) {
            // 存入数据
            classifyData = data.data;
            $('.shizhan-fenlei-wrap').empty();
            $('.shizhan-menu-wrap').empty();
            let $liStr = ''
            let $childStr = ''
            $liStr += `<span data-id="0">全部</span>`;
            $childStr += `<span data-id="0">不限</span>`;
            $(data.data).each(function (index, item) {
              $liStr += `<span data-id="${item.category_id}">${item.category_name}</span>`;
              item.all_child.forEach(function (item1) {
                $childStr += `<span data-id="${item1.category_id}">${item1.category_name}</span>`;
              })
            })
            $(".shizhan-fenlei-wrap").append($liStr);
            $(".shizhan-menu-wrap").append($childStr);
          }
        }
      });
    }

    // 点击一级不同分类的事件
    $(document).on('click', '.shizhan-fenlei-wrap span', function () {
      classifyFirst = $(this).attr("data-id");
      changeClassify($(this).attr('data-id'));
      getArticle($(this).attr("data-id"));


    })

    // 点击不同二级分类的事件
    $(document).on('click', '.shizhan-menu-wrap span', function () {
      classifyFirst = $(this).attr("data-id");
      changeClassify($(this).attr("data-id"));
      getArticle($(this).attr("data-id"));

    })


    // 搜索内容
    if (getQueryString("search") != null && getQueryString("search") != "") {
      searchContent(decodeURI(getUrlVar("search")));
    } else if (getQueryString("category_id") != null && getQueryString("category_id") != "") {
      classify();
      changeClassify(getQueryString("category_id"));
      getArticle(getQueryString("category_id"));
    } else {
      classify();
      getArticle(classifyFirst);
    }



    //点击不同分类的事件函数
    function changeClassify(categoryID) {
      // 点击全部
      if (categoryID == 0) {
        getArticle(0);
        $(".shizhan-fenlei-wrap").empty();
        $(".shizhan-menu-wrap").empty();
        let $liStr = "";
        let $childStr = "";
        $liStr += `<span data-id="0">全部</span>`;
        $childStr += `<span data-id="0">不限</span>`;
        $(classifyData).each(function (index, item) {
          $liStr += `<span data-id="${item.category_id}">${item.category_name}</span>`;
          item.all_child.forEach(function (item1) {
            $childStr += `<span data-id="${item1.category_id}">${item1.category_name}</span>`;
          });
        });
        $(".shizhan-fenlei-wrap").append($liStr);
        $(".shizhan-menu-wrap").append($childStr);
        return;
      }

      classifyData.forEach(function (item) {
        if (item.category_id == categoryID) {
          changeParentClassify(item.category_id);
          return;
        }
        item.all_child.forEach(function (item1) {
          if (item1.category_id == categoryID) {
            changeChildrenClassify(item.category_id, item1.category_id);
            return;
          }
        });
      });
    }

    function changeParentClassify(parentCategoryID) {
      // 渲染颜色
      $(".shizhan-fenlei-wrap span").each(function (index, item) {
        $(item).css("color", "#000");
        $(item).css("border-bottom", "none");
        if ($(item).attr("data-id") == parentCategoryID) {
          $(item).css("color", "#f01414");
          $(item).css("border-bottom", "3px solid #f01414");
        }
      });


      $(".shizhan-menu-wrap").empty();
      classifyData.forEach(function (item) {
        if (item.category_id == parentCategoryID) {
          let $childStr = "";
          $childStr += `<span data-id="${parentCategoryID}">不限</span>`;
          item.all_child.forEach(function (item1) {
            $childStr += `<span data-id="${item1.category_id}">${item1.category_name}</span>`;
          });
          $(".shizhan-menu-wrap").append($childStr);
        }
      });

    }

    function changeChildrenClassify(parentCategoryID, childrenCategoryID) {
      // 二级标题渲染
      $(".shizhan-menu-wrap").empty();
      let $childStr = "";
      $childStr += `<span data-id="${parentCategoryID}">不限</span>`;
      $(classifyData).each(function (index, item) {
        if (item.category_id == parentCategoryID) {
          item.all_child.forEach(function (item1) {
            $childStr += `<span data-id="${item1.category_id}">${item1.category_name}</span>`;
          });
          $(".shizhan-menu-wrap").append($childStr);
        }
      });
      // 一级标题渲染颜色
      $(".shizhan-fenlei-wrap span").each(function (index, item) {
        $(item).css("color", "#000");
        $(item).css("border-bottom", "none");
        if ($(item).attr("data-id") == parentCategoryID) {
          $(item).css("color", "#f01414");
          $(item).css("border-bottom", "3px solid #f01414");
        }
      });
      // 二级标题渲染颜色
      $('.shizhan-menu-wrap span').each(function (index, item) {
        $(item).css('color', '#4d555d');
        $(item).css('background', 'none');
        if ($(item).attr("data-id") == childrenCategoryID) {
          $(item).css('color', '#fff');
          $(item).css('background', '#2b333b');
        }
      })


    }


    // 获取所有的文章函数
    function getArticle(articleID) {
      let url = "/articles?category_id=" + articleID;
      articleUrl = "/articles?category_id=" + articleID;
      articleIDAll = articleID;
      $(".pagenation").empty();
      $(".shizhan-content-wrap").empty();
      $.ajax({
        type: "get",
        url: url,
        async: false,
        dataType: "json",
        success: function (data) {
          let page;
          if (data.code == 200) {
            allPages = data.data.last_page;
            data.data.data.forEach(function (item) {
              let $liStr = `<div data-articleID="${item.article_id}" class="course-card mr24">
                          <div class="course-img">
                            <img src="/${item.cover_picture_url}" alt="">
                          </div>
                          <p class="course-name">${item.article_title}</p>
                          <p class="course-desc">${item.article_intro}</p>
			                  </div>`;
              $(".shizhan-content-wrap").append($liStr);
            });

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

    function getArticlepage(articleID) {
      $.ajax({
        type: "get",
        url: articleID,
        dataType: "json",
        success: function (data) {
          $(".shizhan-content-wrap").empty();
          if (data.code == 200) {
            data.data.data.forEach(function (item) {
              let $liStr = `<div data-articleID="${item.article_id}" class="course-card mr24">
                          <div class="course-img">
                            <img src="/${item.cover_picture_url}" alt="">
                          </div>
                          <p class="course-name">${item.article_title}</p>
                          <p class="course-desc">${item.article_intro}</p>
			                  </div>`;
              $(".shizhan-content-wrap").append($liStr);
            });
          }
        }
      });
    }
    // // 点击文章查看
    // $(document).on('click', '.course-card', function () {
    //   window.open('')
    // })


    // 获取url参数的方法
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    function getUrlVars() {
      var vars = [],
        hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }

    function getUrlVar(name) {
      return getUrlVars()[name];
    }

    // 搜索方法
    function searchContent(searchContent) {
      let url = "/head/search?search_content=" + searchContent;
      articleUrl = "/head/search?search_content=" + searchContent;
      $(".shizhan-menu").empty();
      $(".shizhan-content-wrap").empty();
      $(".shizhan-fenlei-wrap").empty();
      $(".pagenation").empty();
      $.ajax({
        type: "get",
        url: "/head/search",
        data: {
          search_content: searchContent
        },
        dataType: "json",
        success: function (data) {
          if (data.code == 200) {
            allPages = data.data.last_page;
            $(".shizhan-fenlei-wrap").append(
              `<span data-id="0">全部内容</span>`
            );
            $(".shizhan-content-wrap").empty();
            $(".shizhan-content-wrap").css("min-height", "550px");
            data.data.data.forEach(function (item) {
              let $liStr = `<div data-articleID="${item.article_id}" class="course-card mr24">
                          <div class="course-img">
                            <img src="/${item.cover_picture_url}" alt="">
                          </div>
                          <p class="course-name">${item.article_title}</p>
                          <p class="course-desc">${item.article_intro}</p>
			                  </div>`;
              $(".shizhan-content-wrap").append($liStr);
            });
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
            layer.msg('没有搜索内容！', {
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

    // 点击搜索
    $(".submit").click(function () {
      searchContent($(".search input").val());
      // $(".search input").val('');
    });

    $(document).on("click", '.course-card', function () {
      window.open('/log_details/' + $(this).attr('data-articleid'));
    })


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
            getArticlepage($(this).attr("data-id"));

          } else {
            if (parseInt($(this).text()) > (allPages - 3)) {
              $(".num").each(function (index, item) {
                $(item).attr("class", "num");
              });
              $(".num").eq(6 - (allPages - parseInt($(this).text()))).addClass("page-select");
              // 跳页
              getArticlepage($(this).attr("data-id"));
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
              getArticlepage($(this).attr("data-id"));
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
            getArticlepage($(this).attr("data-id"));
          } else {

            if ($(this).text() <= 3) {

              if ($(this).attr("class") == "num page-select") return;
              $(".num").each(function (index, item) {
                $(item).attr("class", "num");
              });
              $(".num").eq(parseInt($(this).text()) - 1).addClass("page-select");
              // 跳页
              getArticlepage($(this).attr("data-id"));

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
              getArticlepage($(this).attr("data-id"));

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
        getArticlepage($(this).attr("data-id"));
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
      getArticlepage(articleUrl + "&page=1");

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
        // if ($(".num").eq(6).text() == allPages) return;
        $(".num").eq(6).addClass("page-select");
        // 跳页
        getArticlepage(articleUrl + "&page=" + allPages);
        $(".num").each(function (index1, item) {
          $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + allPages - 6));
          $(item).text(parseInt(index1) + allPages - 6);
        });
      } else {
        $(".num").eq(allPages - 1).addClass("page-select");
        // 跳页
        getArticlepage(articleUrl + "&page=1" + allPages);
        $(".num").each(function (index1, item) {
          $(item).attr("data-id", articleUrl + "&page=" + (parseInt(index1) + 1));
          $(item).text(parseInt(index1) + 1);
        });
      }



    })



    // 监听搜索按钮事件
    $(".search input").keydown(function (e) {
      if (e.keyCode == 13) {
        if ($(".search input").val() != "") {
          searchContent($(".search input").val());
        } else {
          return;
        }
      }
    });


  })

  // content高度
  $(".shizhan-content-wrap").css(
    "min-height",
    document.body.clientHeight - 1400
  );
}