<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class TopArticles extends Model
{
    protected $table = 'top_articles';
    protected $primaryKey = 'top_id';
    public $timestamps = false;
    public $guarded = ['top_id'];

    public function getAllRecommend(Request $request){
        return $this->select('articles.article_id','article_title','article_intro','cover_picture_url')
            ->leftjoin('articles','top_articles.article_id','articles.article_id')
            ->leftjoin('categorys','categorys.category_id','articles.article_category_id')
            ->leftjoin('cover_pictures','articles.cover_picture_id','cover_pictures.cover_picture_id')
            ->where('categorys.category_index',$request->input('category_id'))
            ->where('article_state',1)
            ->limit(9)
            ->latest('article_create_time')->get();
    }
}
