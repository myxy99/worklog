<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Categorys extends Model
{
    protected $table = 'categorys';
    protected $primaryKey = 'category_id';
    public $timestamps = false;
    public $guarded = ['category_id'];


    public function child()
    {
        return $this->hasMany(get_class($this), 'category_index', 'category_id');
    }
    public function allChild()
    {
        return $this->child()->with('allChild');
    }
    public function getAll(Request $request){
        return $this->select('friendship_link_id','friendship_link_title','friendship_link_click_url')
            ->leftjoin('friendship_links','categorys.category_id','friendship_links.category_id')
            ->where('friendship_links.category_id',$request->input('category_id'))
            ->get();
    }

    public function getPath(Request $request){
        return $this->select('study_route_id','study_route_title','study_route_intro','cover_picture_url')
            ->leftjoin('study_routes','categorys.category_id','study_routes.category_id')
            ->leftjoin('cover_pictures','study_routes.study_route_cover_picture_id','cover_pictures.cover_picture_id')
            ->where('categorys.category_id',$request->input('category_id'))
            ->where('study_route_state',1)
            ->limit(4)
            ->latest('study_route_create_time')
            ->get();
    }

    public function getOwn(Request $request){
        return $this->select('articles.article_id','article_title','article_intro','cover_picture_url')
            ->leftjoin('articles','categorys.category_id','articles.article_category_id')
            ->leftjoin('cover_pictures','articles.cover_picture_id','cover_pictures.cover_picture_id')
            ->where('categorys.category_index',$request->input('category_id'))
            ->where('article_state',1)
            ->where('article_user_id',Auth::id())
            ->latest('article_create_time')->paginate(20);
    }

}
