/*
 * @Description: 
 * @Autor: YangZeMiao
 * @Date: 2019-10-27 21:12:19
 * @LastEditors: YangZeMiao
 * @LastEditTime: 2019-10-27 21:59:58
 */
$(function(){

    $.ajax({
      type: "get",
      url: "/head/get_footer",
      dataType: "json",
      success: function (data) {
        console.log(data)
        $(".footer p").text(
          data.data.system_setting_other +' | '+
            data.data.system_setting_site_record_info
        );
        $(".gotoTop-gzh img").attr(
          "src",
           data.data.system_setting_wx_qrcode 
        );

      }
    });

    
})