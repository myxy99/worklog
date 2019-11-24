/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-21 04:08:38
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 21:30:46
 */

let vid = null;
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

$.ajax({
    type: "get",
    url: "/articles/" + $('meta[name="id"]').attr('content'),
    dataType: "json",
    success: function (data) {
        if (data.code === 200) {
            $('.content-info-main').html(data.data.article_content);
            vid = data.data.article_video_id;
            $('.top-content-title p:first').html(data.data.article_title)
            $('.top-content-title p').last().html(data.data.article_intro)
            if (isnull(vid)) {
                $.ajax({
                    type: "POST",
                    url: "/video/get_video_play_auth",
                    data: {
                        video_id: vid,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.code === 200) {
                            $('.content-info-video img').css('display', 'none');
                            new Aliplayer({
                                id: 'J_prismPlayer',
                                width: '100%',
                                height: '500px',
                                autoplay: true,
                                vid: vid,
                                playauth: data.data.PlayAuth,
                                cover: data.data.VideoMeta.CoverURL,
                            }, function (player) {
                                console.log('播放器创建好了。', player)

                            });
                        }
                    },
                });
            }else{
                $('.content-info-video').remove();
            }
        }
    },
});







function isnull(vid) {
    if (vid == null) return false;
    return true;
}