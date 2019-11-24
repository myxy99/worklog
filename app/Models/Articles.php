<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Articles extends Model
{
    protected $table = 'articles';
    protected $primaryKey = 'article_id';
    public $timestamps = false;
    public $guarded = ['article_id'];

    public function post()
    {
        return $this->belongsTo('App\Models\Users', 'article_user_id');
    }

    public function getBase()
    {
        return $this->select('article_id', 'article_title', 'article_intro', 'cover_picture_url')
            ->leftjoin('cover_pictures', 'articles.cover_picture_id', 'cover_pictures.cover_picture_id')
            ->where('article_state', 1)
            ->latest('article_create_time');
    }
    public function getAllArticles($id)
    {
        return $this->select('article_category_id', 'article_title', 'article_intro', 'article_content', 'article_create_time', 'article_update_time', 'cover_picture_url','articles.cover_picture_id', 'article_video_id')
            ->leftjoin('cover_pictures', 'articles.cover_picture_id', 'cover_pictures.cover_picture_id')
            ->where('article_id', $id)
            ->where('article_state', 1)
            ->first();
    }

    public function getRecent()
    {
        return $this->select('article_id', 'article_title', 'article_intro', 'cover_picture_url')
            ->leftjoin('cover_pictures', 'articles.cover_picture_id', 'cover_pictures.cover_picture_id')
            ->where('article_state', 1)
            ->limit(8)
            ->latest('article_create_time')
            ->get();
    }

    public function getSearchResult(Request $request)
    {
        return $this->select('article_id', 'article_title', 'article_intro', 'cover_picture_url')
            ->leftjoin('cover_pictures', 'articles.cover_picture_id', 'cover_pictures.cover_picture_id')
            ->whereRaw("concat(`article_title`,`article_intro`) like '%" . $request->input('search_content') . "%'")
            ->paginate(20);
    }

    public function create(Request $request, Articles $articles)
    {
        $articles->article_title = $request->title;
        $articles->article_intro = $request->intro;
        $articles->article_content = $request->input('content');
        $articles->article_user_id = Auth::id();
        $articles->article_category_id = $request->category_id;
        $articles->article_state = 1;
        $articles->article_create_time = date('Y-m-d H:i:s');
        $articles->article_update_time = date('Y-m-d H:i:s');
        $articles->cover_picture_id = $request->picture_id;
        $articles->article_video_id = $request->video;
        $result = $articles->save();
        return $result;
    }

    public function renewal(Request $request, $id)
    {
        return $this->where('article_id', '=', $id)
            ->update([
                'article_title' => $request->title,
                'article_intro' => $request->intro,
                'article_content' => $request->input('content'),
                'article_category_id' => $request->category_id,
                'article_update_time' => date('Y-m-d H:i:s'),
                'cover_picture_id' => $request->picture_id,
                'article_video_id' => $request->video
            ]);
    }

    public function remove($id)
    {
        return $this->where('article_id', '=', $id)->delete();
    }

    public function getRecommend(Array $s,$j){
        return $this->select('articles.article_id','article_title','article_intro','cover_picture_url')
            ->leftjoin('cover_pictures','articles.cover_picture_id','cover_pictures.cover_picture_id')
            ->where('article_state',1)
            ->whereNotIn('articles.article_id',$s)
            ->limit(9-$j)
            ->latest('article_create_time')->get();
    }
}
