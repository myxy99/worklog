/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-21 18:46:24
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-28 08:51:00
 */
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

var swiper = new Swiper('.banner-img', {
	pagination: '.swiper-pagination',
	paginationClickable: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	effect: 'fade',
	loop: true,
	autoplay: true
});


$('.download').hover(function () {
	$(this).find('span').toggleClass('hover')
	$('.download-detail').toggleClass('hide');
})
$(".shop-cart").hover(function () {
	$('.shop-cart>i,.shop-cart>span').toggleClass('hover');
	$(this).toggleClass('shop-cart-hover');
	$('.shop-cart-detail').toggleClass('hide');
})

// table选项卡
$("body").on("mouseenter", ".banner-menu-item", function () {
	$(this).children('a').toggleClass('white');
	$(this).find('.banner-menu-item-detail').css('display', 'block');
});
$("body").on("mouseleave", ".banner-menu-item", function () {
	$(this).children('a').toggleClass('white');
	$(this).find('.banner-menu-item-detail').css('display', 'none');
});



window.onload = function () {
	// 导航栏标题
	//搜索框

	//判断是否存在上下图标
	if ($(".banner-menu li").length > 7) {
		$(".banner-menu-prev").css('display', 'block')
		$(".banner-menu-next").css("display", "block");
		$(".banner-menu-prev-button").css("display", "block");
		$(".banner-menu-next-button").css("display", "block");
	}
	// 获取分类栏信息

	var indexHeight = 0; //初始高度
	var indexStr;
	var num = 0; //计数：有几个li，是否到达最底部
	var topNum = 0;
	$(".banner-menu-prev-button").css("display", "none");
	// 点击向下
	$(document).on('click', '.banner-menu-next-button', function () {



		if (num < $('.banner-menu-item').length - 7) {
			indexHeight -= 53; //每次滑动的距离
			indexStr = indexHeight + 'px'; //换算单位
			$('.banner-menu-item').eq(0).animate({ //滑动函数
				'margin-top': indexStr
			}, 300);
			topNum++;
			num++;
		}
		if (num == $(".banner-menu-item").length - 7) {
			$(".banner-menu-next-button").css("display", "none");
		} else {
			$(".banner-menu-next-button").css("display", "block");
			$(".banner-menu-prev-button").css("display", "block");
		}
	})
	// 向上点击
	$(document).on('click', '.banner-menu-prev-button', function () {




		if (topNum != 0) {
			indexHeight += 53;
			indexStr = indexHeight + "px";
			$(".banner-menu-item")
				.eq(0)
				.animate({
						"margin-top": indexStr
					},
					300
				);
			topNum--;
			num--;
		}
		if (topNum == 0) {
			$(".banner-menu-prev-button").css("display", "none");
		} else {
			$(".banner-menu-prev-button").css("display", "block");
			$(".banner-menu-next-button").css("display", "block");
		}

	})

	// 点击分类跳转详情
	$(document).on("click", ".banner-menu-item-detail a", function () {
		window.open("log?category_id=" + $(this).attr("data-id"));
	});

	//轮播图 点击
	$(document).on("click", '.swiper-slide', function () {
		window.open($(this).attr('data-url'));
	})
	// 学/习/路/线 点击
	$(document).on("click", '.course-box', function () {
		window.open('learn_path/' + $(this).attr('data-id'));
	})
	//默认获取学习推荐信息
	$(document).on("click", '.article-intro-content a', function () {
		window.open($(this).attr('data-id'));
	})
	$(document).on("click", '.shizhan-content a', function () {
		window.open('/log_details/' + $(this).attr('data-id'));
	})
	$(document).on("click", '#latestRelease a', function () {
		window.open('/log_details/' + $(this).attr('data-id'));
	})
	// 获取学习推荐信息
	$(document).on('click', '#learnRecommend ul li', function () {
		$('.article-intro-content').empty();
		getLearnInfo($(this).attr('data-id'));
		get_blog_roll($(this).attr('data-id'));
		$('#learnRecommend ul li').each(function (index, item) {
			$(item).css('color', '#545C63');
			$(item).css('border-bottom', 'none');
		})
		$(this).css('color', '#F20D0D');
		$(this).css('border-bottom', '2px solid #F20D0D');
	})
	$('#learnRecommend ul li:first').click();
	// 获取学习推荐信息方法

	
	function getLearnInfo(categoryID) {
    $.ajax({
      type: "get",
      url: "/head/get_learn_recommend",
      data: {
        category_id: categoryID
      },
      dataType: "json",
      success: function(data) {
        if (data.code === 200) {
          $(".shizhan-content").empty();
          data.data.forEach(function(item) {
            let $aStr = `<a data-id=${item.article_id} href="javascript:;" class="content-item mr18">
					<div class="img">
						<img src="/${item.cover_picture_url}" alt="">
					</div>
					<div class="content-item-title">
						${item.article_title}
					</div>
					<p class="shizhan-desc">${item.article_intro}</p>
				</a>`;
            $(".shizhan-content").append($aStr);
          });
        }
      }
    });
  }

	var friendLinkNum;
	var pageNum = 0;
	var page = 8;


	get_blog_roll($("#learnRecommend li:nth-of-type(1").attr("data-id"));

	function get_blog_roll(categoryID) {
		friendLinkNum=0;
		lastpage = 0
		pageNum = 0;

		$.ajax({
			type: "get",
			url: "/head/get_blog_roll",
			async:false,
			data: {
				category_id: categoryID
			},
			dataType: "json",
			success: function (data) {
				if (data.code == 200) {
					friendLinkNum = data.data;
					let m;
					lastpage = data.data.length;
					if (page >= lastpage) {
						m = lastpage
					} else {
						m = page
					}
					for (let i = 0; i < m; i++) {
						let $str = `<a data-id='${friendLinkNum[i].friendship_link_click_url}' href="javascript:;">${friendLinkNum[i].friendship_link_title}</a>`
						$('.article-intro-content').append($str);
					}
					pageNum = 2;
				}
			}
		});
	}
	//换一批点击事件
	$(document).on('click', '.article-intro-control span:nth-of-type(2)', function () {
		if (friendLinkNum == 0)return;
		 var pageData = Math.ceil(friendLinkNum.length / page);
		if (pageData == 1) return;
		$('.article-intro-content').empty();
		if (pageNum >= pageData) {
			for (let i = (pageNum - 1) * page; i < friendLinkNum.length; i++) {
				let $str = `<a data-id='${friendLinkNum[i].friendship_link_click_url}' href="javascript:;">${friendLinkNum[i].friendship_link_title}</a>`
				$('.article-intro-content').append($str);
			}
			pageNum = 0;
		} else {
			for (let i = (pageNum - 1) * page; i < (pageNum) * page; i++) {
				let $str = `<a data-id='${friendLinkNum[i].friendship_link_click_url}' href="javascript:;">${friendLinkNum[i].friendship_link_title}</a>`
				$('.article-intro-content').append($str);
			}
		}
		pageNum++;
	})

	//默认获取学习路线信息(id为 1 )
	// 获取学习路线信息
	$(document).on('click', '#learnLink ul li', function () {
		getLearnLoad($(this).attr('data-id'));
		$('#learnLink ul li').each(function (index, item) {
			$(item).css('color', '#545C63');
			$(item).css('border-bottom', 'none');
		})
		$(this).css('color', '#F20D0D');
		$(this).css('border-bottom', '2px solid #F20D0D');
	})
	$('#learnLink ul li:first').click();
	//获取学习路线信息函数
	function getLearnLoad(categoryID) {
		$("#learnRoad").empty();
		$.ajax({
      type: "get",
      url: "/head/get_learn_path",
      data: {
        category_id: categoryID
      },
      dataType: "json",
      success: function(data) {
        if (data.code == 200) {
          data.data.forEach(function(item) {
            let $boxStr = `<div class="course-box" data-id=${item.study_route_id}>
						<div class="course-cover">
							<div class="img-up"
								style="background-image: url('${item.cover_picture_url}'); background-size: 100% 100%">
							</div>
							<div class="img-mid"
								style="background-image: url('${item.cover_picture_url}'); background-size: 100% 100%">
							</div>
							<div class="img-down"
								style="background-image: url('${item.cover_picture_url}'); background-size: 100% 100%">
							</div>
						</div>
						<div class="course-content">
							<p class="course-content-p">${item.study_route_title}</p>
							<span>${item.study_route_intro}</span>
						</div>
					</div>`;
            $("#learnRoad").append($boxStr);
          });
        } else {
          layer.msg("没有内容！", {
            icon: 0,
            time: 1000
          });
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
        layer.alert(text, {
          icon: 2
        });
      }
    });

	}

	// 最新发布
	$.ajax({
		type: "get",
		url: "/head/get_recent",
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				$('#latestRelease').empty();
				data.data.forEach(function (item) {
					let $boxStr = `<a href="javascript:;" class="content-item mr18" data-id="${item.article_id}">
					<div class="img">
						<img src="${item.cover_picture_url}" alt="">
					</div>
					<div class="content-item-title">
						${item.article_title}
					</div>
					<p class="shizhan-desc">${item.article_intro}</p>
					</a>`
					$('#latestRelease').append($boxStr);
				})
			}
		}
	});


}