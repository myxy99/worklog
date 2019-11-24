/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-23 11:06:42
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 16:10:51
 */
let vid = null;
$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
$.ajax({
    type: "get",
    url: "/head/get_assign_learn_path/" + $('meta[name="id"]').attr('content'),
    dataType: "json",
    success: function (data) {
        if (data.code === 200) {
            $('.content-info-main').html(data.data.study_route_content);
            vid = data.data.study_route_video_id;
            $('.top-content-title p:first').html(data.data.study_route_title)
            $('.top-content-title p').last().html(data.data.study_route_intro)
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
                            $('.content-info-video').html('<span>相关视频</span>');
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
                
            }
        }
    },
});


function isnull(vid) {
    if(vid=='') return false;
    return true;
}