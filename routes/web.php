<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * 杨泽淼
 */

Route::group(['middleware' => ['auth.login.check']], function () {
    Route::post('/auth/logout', 'Auth\AuthController@logout');                                                      //退出登陆
    Route::post('/auth/modify_password', 'Auth\AuthController@modifyPassword');                                     //修改密码
    //Aliyun/VideoController
    Route::post('/video/create_upload_video', 'Aliyun\VideoController@createUploadVideo');                          //获取上传凭证
    Route::post('/video/refresh_upload_video', 'Aliyun\VideoController@refreshUploadVideo');                        //刷新上传凭证
    Route::post('/video/get_video_play_auth', 'Aliyun\VideoController@getVideoPlayAuth');                           //获取播放凭证
    Route::post('/video/delete_video', 'Aliyun\VideoController@deleteVideo');                                       //删除视频
    Route::post('/video/get_video_info', 'Aliyun\VideoController@getVideoInfo');                                    //获取视频信息

});
//Auth/AuthController
Route::post('/auth/login', 'Auth\AuthController@login');                                                        //用户登陆


/**
 * 杜宇博
 */
Route::resource('articles', 'Head\ArticleManagementController');
Route::get('/head/get_navigation_bar', 'Head\IndexController@getNavigationBar');                                //导航栏
Route::get('/head/get_classify_bar', 'Head\IndexController@getClassifyBar');                                    //分类栏
Route::get('/head/get_learn_recommend', 'Head\IndexController@getLearnRecommend');                              //学习推荐
Route::get('/head/get_blog_roll', 'Head\IndexController@getBlogRoll');                                          //友情链接
Route::get('/head/get_learn_path', 'Head\IndexController@getLearnPath');                                        //学习路线
Route::get('/head/get_recent', 'Head\IndexController@getRecent');                                               //近期发布
Route::get('/head/get_slideshow', 'Head\IndexController@getSlideshow');                                         //轮播图
Route::get('/head/get_assign_learn_path/{id}', 'Head\IndexController@getAssignLearnPath')
    ->where('id', '[0-9]+');                                                                                    //获取指定学习路线
Route::get('/head/get_all_learn_path', 'Head\IndexController@getAllLearnPath');                                 //获取所有的学习路线
Route::get('/head/search', 'Head\IndexController@search')->middleware('auth.login.check');                       //搜索
Route::post('/head/upload_pic', 'Head\IndexController@uploadPic');                                              //上传图片
Route::get('/head/get_own', 'Head\IndexController@getOwnArticles');                                              //获取自己的文章
Route::get('/head/get_footer', 'Head\IndexController@getFooter');  //获取备案===

//李承坤

//get传参验证 只能为数字
Route::group(['middleware' => ['resource.id.check', 'auth.admin.check']], function () {
    //文章  
    Route::get('admin/articles/search', 'Admin\AdminArticles@searchArticles');
    Route::put('admin/articles/update_ban_state/{article_id}', 'Admin\AdminArticles@updateBanState');
    Route::put('admin/articles/update_top_state/{article_id}', 'Admin\AdminArticles@updateTopState');
    Route::apiResource('admin/articles', 'Admin\AdminArticles', ['only' => [
        'index', 'destroy'
    ]]);
    //上导航栏
    Route::apiResource('admin/navigaion_columns', 'Admin\AdminNavigationColumns');
    //用户 
    Route::put('admin/users/reset_password/{user_id}', 'Admin\AdminUsers@resetPassword');
    Route::put('admin/admin_users', 'Admin\AdminUsers@updateAdmin');
    Route::apiResource('admin/users', 'Admin\AdminUsers');
    //封面图片
    Route::apiResource('admin/cover_pictures', 'Admin\AdminCoverPictures', ['only' => [
        'index', 'destroy', 'store'
    ]]);
    //学习路线
    Route::get('admin/study_routes/categorys/{category_id}', 'Admin\AdminStudyRoutes@indexByCategory');
    Route::apiResource('admin/study_routes', 'Admin\AdminStudyRoutes');
    //轮播图
    Route::post('admin/rotations/update/{rotation_id}', 'Admin\AdminRotations@update');
    Route::apiResource('admin/rotations', 'Admin\AdminRotations', ['only' => [
        'index', 'destroy', 'store', 'show'
    ]]);
    //系统设置
    Route::apiResource('admin/system_setting', 'Admin\AdminSystemSettings', ['only' => [
        'index', 'update'
    ]]);
    //友情链接
    Route::get('admin/friend_ship_link/category/{id}', 'Admin\AdminFriendShipLink@indexByCategory');
    Route::apiResource('admin/friend_ship_link', 'Admin\AdminFriendShipLink', ['only' => [
        'index', 'update', 'store', 'destroy'
    ]]);
    //分类目录
    Route::apiResource('admin/categorys', 'Admin\AdminCategorys', ['only' => [
        'index', 'update', 'store', 'destroy'
    ]]);
    //上交情况
    Route::get('admin/upload_situation', 'Admin\AdminUploadSituation@viewUploadSituation');
});



/**
 * 
 * 后台视图
 */
Route::group(['middleware' => ['auth.admin.check']], function () {
    Route::get('/admin', 'View\AdminController@index');
    Route::get('/admin/carousel_add', 'View\AdminController@carousel_add');
    Route::get('/admin/carousel', 'View\AdminController@carousel');
    Route::get('/admin/classification_add', 'View\AdminController@classification_add');
    Route::get('/admin/classification', 'View\AdminController@classification');
    Route::get('/admin/cover', 'View\AdminController@cover');
    Route::get('/admin/document', 'View\AdminController@document');
    Route::get('/admin/linksetting_add', 'View\AdminController@linksetting_add');
    Route::get('/admin/linksetting', 'View\AdminController@linksetting');
    Route::get('/admin/member_add', 'View\AdminController@member_add');
    Route::get('/admin/member', 'View\AdminController@member');
    Route::get('/admin/navigation_add', 'View\AdminController@navigation_add');
    Route::get('/admin/navigation', 'View\AdminController@navigation');
    Route::get('/admin/system', 'View\AdminController@system');
    Route::get('/admin/uploadtime', 'View\AdminController@uploadtime');
    Route::get('/admin/path', 'View\AdminController@path');
    Route::get('/admin/path_add', 'View\AdminController@path_add');
});
/**
 * 
 * 前台视图
 */
Route::get('/', 'View\HeadController@index');
Route::get('/login', 'View\HeadController@login');
Route::group(['middleware' => ['auth.login.check']], function () {
    Route::get('/learn_path/{id}', 'View\HeadController@learnPath')->where('id', '[0-9]+')->middleware('learn.check');
    Route::get('/learn_path_list', 'View\HeadController@learnPathList');
    Route::get('/log', 'View\HeadController@log');
    Route::get('/log_details/{id}', 'View\HeadController@logDetails')->where('id', '[0-9]+')->middleware('log.check');
    Route::get('/log_edit/{id?}', 'View\HeadController@logEdit')->where('id', '[0-9]+')->middleware('is.log.check', 'power.check');
    Route::get('/personal_log', 'View\HeadController@personalLog');
});
